# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# import numpy as np
# from PIL import Image
# import io, os
# import tensorflow as tf

# # Base directory
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# tflite_model_path = os.path.join(BASE_DIR, "VGG_model.tflite")

# # Load TFLite interpreter
# interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
# interpreter.allocate_tensors()

# # Get input/output details
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

# # FastAPI app
# app = FastAPI()

# # Allow React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # React dev server
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Class labels
# class_labels = ["Cyst","normal", "Stone", "Tumor"]

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     # Read image
#     image_data = await file.read()
#     image = Image.open(io.BytesIO(image_data)).convert("RGB")
#     image = image.resize((224, 224))  # Resize according to your model

#     # Preprocess
#     input_array = np.array(image, dtype=np.float32) / 255.0
#     input_array = np.expand_dims(input_array, axis=0)  # batch dimension

#     # Set input tensor
#     interpreter.set_tensor(input_details[0]['index'], input_array)

#     # Run inference
#     interpreter.invoke()

#     # Get output
#     prediction = interpreter.get_tensor(output_details[0]['index'])
#     pred_index = int(np.argmax(prediction[0]))
#     confidence = float(np.max(prediction[0]))

#     result = class_labels[pred_index]

#     return {"result": result, "confidence": confidence}

    
# cd src/ml
# python -m uvicorn model_api:app --reload

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
import timm
from PIL import Image
import numpy as np
import io
import cv2
import base64

# -----------------------------
# CONFIG
# -----------------------------
DEVICE = torch.device("cpu")
NUM_CLASSES = 5
MODEL_PATH = "kidney_classifier_best.pth"
MODEL_NAME = "tf_efficientnetv2_s.in21k_ft_in1k"

class_labels = ["Cyst", "Normal", "Stone", "Tumor", "Other"]

# -----------------------------
# MODEL
# -----------------------------
class KidneyClassifier(nn.Module):
    def __init__(self, model_name, num_classes):
        super().__init__()

        self.backbone = timm.create_model(
            model_name,
            pretrained=False,
            num_classes=0
        )

        in_features = self.backbone.num_features

        self.head = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(in_features, 512),
            nn.ReLU(inplace=True),
            nn.BatchNorm1d(512),
            nn.Dropout(0.2),
            nn.Linear(512, num_classes),
        )

    def forward(self, x):
        x = self.backbone(x)
        return self.head(x)

# -----------------------------
# LOAD MODEL
# -----------------------------
model = KidneyClassifier(MODEL_NAME, NUM_CLASSES)

checkpoint = torch.load(MODEL_PATH, map_location=DEVICE)

if "model_state_dict" in checkpoint:
    model.load_state_dict(checkpoint["model_state_dict"])
else:
    model.load_state_dict(checkpoint)

model.to(DEVICE)
model.eval()

# -----------------------------
# FASTAPI
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# PREPROCESS
# -----------------------------
def preprocess(image: Image.Image):

    image = image.resize((224, 224))

    img = np.array(image).astype(np.float32) / 255.0

    mean = np.array([0.485, 0.456, 0.406])
    std = np.array([0.229, 0.224, 0.225])

    img = (img - mean) / std

    img = np.transpose(img, (2, 0, 1))
    img = np.expand_dims(img, axis=0)

    return torch.tensor(img, dtype=torch.float32).to(DEVICE)

# -----------------------------
# GRADCAM
# -----------------------------
def generate_gradcam(input_tensor, model, class_idx):

    gradients = []
    activations = []

    def backward_hook(module, grad_in, grad_out):
        gradients.append(grad_out[0])

    def forward_hook(module, inp, out):
        activations.append(out)

    target_layer = model.backbone.conv_head

    forward_handle = target_layer.register_forward_hook(forward_hook)
    backward_handle = target_layer.register_backward_hook(backward_hook)

    output = model(input_tensor)
    model.zero_grad()

    loss = output[:, class_idx]
    loss.backward()

    grads = gradients[0]
    acts = activations[0]

    weights = torch.mean(grads, dim=(2,3), keepdim=True)
    cam = torch.sum(weights * acts, dim=1).squeeze()

    cam = torch.relu(cam)
    cam = cam.detach().cpu().numpy()

    cam = cv2.resize(cam, (224,224))
    cam = cam - cam.min()
    cam = cam / cam.max()

    forward_handle.remove()
    backward_handle.remove()

    return cam

# -----------------------------
# OVERLAY HEATMAP
# -----------------------------
def create_overlay(image, cam):

    image = image.resize((224,224))
    img_np = np.array(image)

    heatmap = cv2.applyColorMap(np.uint8(255*cam), cv2.COLORMAP_JET)

    overlay = heatmap * 0.4 + img_np

    return np.uint8(overlay)

# -----------------------------
# STONE SIZE ESTIMATION
# -----------------------------
def estimate_stone_size(cam):

    threshold = 0.6
    mask = cam > threshold

    area = np.sum(mask)

    ratio = area / (224*224)

    if ratio < 0.01:
        category = "Small"
    elif ratio < 0.03:
        category = "Medium"
    else:
        category = "Large"

    return category
# -----------------------------
# STONE SIZE EXACT (MM)
# -----------------------------
def calculate_mm_size(cam):
    threshold = 0.5
    active_pixels = np.sum(cam >= threshold)

    CALIBRATION_FACTOR = 1.15

    if active_pixels > 0:
        diameter_px = 2 * np.sqrt(active_pixels / np.pi)
        return round(diameter_px * CALIBRATION_FACTOR, 2)

    return 0.0
# -----------------------------
# BASE64 CONVERT
# -----------------------------
def cam_to_base64(image):

    _, buffer = cv2.imencode(".png", image)

    base64_img = base64.b64encode(buffer).decode("utf-8")

    return base64_img

# -----------------------------
# PREDICT API
# -----------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image_bytes = await file.read()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    input_tensor = preprocess(image)

    with torch.no_grad():

        outputs = model(input_tensor)

        probs = torch.softmax(outputs, dim=1)

        confidence, pred = torch.max(probs, 1)

    pred_class = class_labels[pred.item()]
    confidence_val = float(confidence.item())

    # GradCAM
    cam = generate_gradcam(input_tensor, model, pred.item())

    overlay = create_overlay(image, cam)

    gradcam_base64 = cam_to_base64(overlay)

   # Stone size
    stone_size = None
    stone_size_mm = None

    if pred_class == "Stone":
        stone_size = estimate_stone_size(cam)
        stone_size_mm = calculate_mm_size(cam)

    # ✅ ALWAYS return (if ke bahar)
    return {
        "result": pred_class,
        "confidence": confidence_val,
        "stone_size": stone_size,
        "stone_size_mm": stone_size_mm,
        "gradcam_image_base64": gradcam_base64
    }