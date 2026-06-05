import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import services from "../appwrite/Database";
import { showToast } from "../store/toastSlice";
import { useDispatch } from "react-redux";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = params.get("userId");
  const secret = params.get("secret");

  const handleReset = async () => {
    setLoading(true);

    try {
      await services.resetPassword(userId, secret, password);

      dispatch(showToast("Password reset successful ✅"));

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      dispatch(showToast("Reset failed"));
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl mb-4 font-semibold">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;