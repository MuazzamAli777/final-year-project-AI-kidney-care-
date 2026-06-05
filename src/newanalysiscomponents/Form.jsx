import React, { useState } from "react";
import services from "../appwrite/Database";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthCard from "../authentication/Login";
function Form({send}) {
const [loading, setLoading] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [file12, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");
  const [result, setresult] = useState('pending');
  const [confidence, setconfidence] = useState('pending');
const [stonesize,setstonesize]=useState("")
const[heatmapimage,setheatmapimage]=useState("")
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [contactno, setcontactno] = useState("");
  const [email, setemail] = useState("");
  const [symptoms, setsymptoms] = useState("");
  const [medicalhistory, setmedicalhistory] = useState("");
  const[loginkro,setloginkro]=useState(false)
const navigate = useNavigate();

const base64ToFile = (base64, filename) => {

  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];

  const bstr = atob(arr[1]);
  let n = bstr.length;

  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

useEffect(() => {
  const check = async () => {
    const user = await services.getCurrentUser();
    setIsLoggedIn(!!user);
  };

  check();
}, []);

const handleImageChange = async (e) => {
  const user = await services.getCurrentUser();

  if (!user) {
    navigate("/AuthPage")
    e.target.value = null;   // 🔥 IMPORTANT FIX
    return;
  }

  const file1 = e.target.files[0];

  if (file1) {
    setImageFile(file1);
    setImagePreview(URL.createObjectURL(file1));
  }

  e.target.value = null; // 🔥 allow re-upload same file again
};

  const handleChangeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();


  setLoading(true);
    try {

  const formData = new FormData();
      formData.append("file", file12);

      const response = await fetch("https://muazzambhali-fast-api.hf.space/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error: " + response.statusText);
      }



// Jab response aaye
const data = await response.json();
// console.log(data )
setresult(data.result);
setconfidence(data.confidence);

// convert base64 to file
const heatmapBase64 = "data:image/png;base64," + data.gradcam_image_base64;
const heatmapFile = base64ToFile(heatmapBase64, "gradcam.png");

// upload original image
const uploadedFile = await services.uploadImage(file12);

if (!uploadedFile) {
  alert("Image upload failed");
  return;
}

// upload gradcam image
const heatmapimage1 = await services.uploadImage(heatmapFile);

if (!heatmapimage1) {
  alert("Heatmap upload failed");
  return;
}
    const confidenceValue = data.confidence * 100;
let stonesize=data.stone_size

let stone_size_mm=data.stone_size_mm

let finalResult = data.result;

if (confidenceValue < 70) {
  finalResult = "Other";
  stonesize=null
}


if (confidenceValue < 70 || finalResult === "Other") {
  setLoading(false);

  setPopupMessage("invalid picture. Please try again with a kidney image.");
  setShowPopup(true);

  setImageFile(null);
  setImagePreview(null);
    setImageFile(null);
      setImagePreview(null);
      setname("");
      setage("");
      setgender("");
      setcontactno("");
      setemail("");
      setsymptoms("");
      setmedicalhistory("");
      setheatmapimage("");
      setstonesize("")


  return;
}

    
      // 2️⃣ save patient data
const patient = await services.createPatient({
  name,
  age: Number(age),
  gender,
  featuredimage: uploadedFile.$id,
  heatmapimage: heatmapimage1.$id,
  contactno,
  email,
  symptoms,
  medicalhistory,
  result: finalResult,
  confidence: (data.confidence * 100).toFixed(2) + "%",
  stonesize:stonesize,
 stone_size_mm: stone_size_mm ? parseFloat(stone_size_mm) : null

});

const patientData = {
  $id: patient.$id,
  name,
  age,
  gender,
  featuredimage: uploadedFile.$id,
    heatmapimage: heatmapimage1.$id,
  result: finalResult,
  confidence: (data.confidence * 100).toFixed(2) + "%",
  $createdAt: patient.$createdAt,
    stonesize:stonesize,
     stone_size_mm: stone_size_mm ? parseFloat(stone_size_mm) : null
};

navigate(`/report/${patient.$id}`, {
  state: { patient: patientData,
    isNew: true
   }
});



      // reset form 
      
      setImageFile(null);
      setImagePreview(null);
      setname("");
      setage("");
      setgender("");
      setcontactno("");
      setemail("");
      setsymptoms("");
      setmedicalhistory("");
      setheatmapimage("");
      setstonesize("")


    } catch (error) {
      console.log("Submit Error:", error);
    }
  
      setLoading(false); 
  };

  return (
    <section className="flex-1">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">

          <h1 className="text-3xl  font-bold mb-6">New Kidney Analysis</h1>
{showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
      
      <h2 className="text-lg font-bold text-red-600 mb-2">
        Analysis Failed
      </h2>

      <p className="text-gray-700 mb-4">
        {popupMessage}
      </p>

      <button
        onClick={() => setShowPopup(false)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Try Again
      </button>

    </div>
  </div>
)}

{loginkro &&(
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
  <AuthCard onClose={() => setloginkro(false)} />
  
   </div>
  </div>
)}
          {/* Image Upload */}
          {!imagePreview && (
            <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">

              <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">

                <h4 data-slot="card-title" className="leading-none">Upload Medical Image</h4>

              </div>

              <div data-slot="card-content" className="px-6 [&amp;:last-child]:pb-6">

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">

                  <input type="file" id="imageUpload" accept="image/*" className="hidden"
  disabled={loginkro} 
                    onChange={handleImageChange} />

                  <label htmlFor="imageUpload" className="cursor-pointer">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-16 h-16 text-gray-400 mx-auto mb-4">

                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4">

                      </path><polyline points="17 8 12 3 7 8"></polyline>

                      <line x1="12" x2="12" y1="3" y2="15"></line>

                    </svg>

                    <h3 className="text-lg font-medium text-gray-900 mb-2">Click to upload medical image</h3>

                    <p className="text-sm text-gray-500">Supports: Ultrasound or CT Scan (PNG, JPG, JPEG)</p>

                  </label>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">

                  <h4 className="font-medium text-blue-900 mb-2">Image Requirements:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">

                    <li>• Clear kidney imaging (Ultrasound,or CT)</li>
                    <li>• High resolution for better accuracy</li>
                    <li>• Proper patient positioning</li>
                    <li>• DICOM or standard image formats</li>
                  </ul>
                </div>
              </div>
            </div>


          )}

          {/* Form after image upload */}
          {imagePreview && (

            <form onSubmit={handlesubmit} className="max-w-3xl mx-auto space-y-6 mt-8">

  <div className="bg-white shadow-lg border rounded-2xl p-8">

    <h2 className="text-2xl font-bold mb-6 text-gray-700">
      Patient Information
    </h2>

    {/* Image Preview */}
    <div className="flex flex-col items-center mb-6">
      <img
        src={imagePreview}
        alt="preview"
        className="max-h-56 rounded-xl border shadow"
      />

      <button
        type="button"
        onClick={handleChangeImage}
        className="mt-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
      >
        Change Image
      </button>
    </div>

    <div className="grid md:grid-cols-2 gap-5">

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Patient Name
        </label>
        <input
          type="text"
          placeholder="Enter patient name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
          className="w-full bg-slate-50 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Age
        </label>
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setage(e.target.value)}
          required
          className="w-full  bg-slate-50 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Gender
        </label>
        <select
          value={gender}
          onChange={(e) => setgender(e.target.value)}
          required
          className="w-full  bg-slate-50 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Contact Number
        </label>
        <input
          type="tel"
          placeholder="03XXXXXXXXX"
          value={contactno}
          onChange={(e) => setcontactno(e.target.value)}
          required
          className="w-full border  bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Email */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="w-full border  bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Symptoms */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Symptoms
        </label>
        <textarea
          placeholder="Describe patient symptoms..."
          value={symptoms}
          onChange={(e) => setsymptoms(e.target.value)}
          className="w-full border  bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Medical History */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Medical History
        </label>
        <textarea
          placeholder="Previous diseases, medicines, etc..."
          value={medicalhistory}
          onChange={(e) => setmedicalhistory(e.target.value)}
          className="w-full border  bg-slate-50 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

    </div>

    {/* Submit Button */}
    <button
      type="submit"
  
      className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
    >
      Start AI Analysis
    </button>

  </div>
 
</form>


          )}

           {loading && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>

      <p className="font-medium text-gray-700">
        AI Analysis Working...
      </p>

    </div>

  </div>
)}


{/* {result !== null && (
  <div className="mt-4 p-2 border rounded bg-gray-100 text-center">
    <p><strong>Result:</strong> {result}</p>
    <p><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>
  </div>
)} */}

        </div>
      </div>
    </section>
  );
}

export default Form;

