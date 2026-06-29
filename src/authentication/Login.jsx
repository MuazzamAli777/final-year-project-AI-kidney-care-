import React, { useState } from "react";
import services from "../appwrite/Database";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function AuthCard({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let user;

      if (isLogin) {
        const session = await services.login({email, password});
        if (session) {
          user = await services.getCurrentUser();
        }
      } else {
        user = await services.createAccount({ email, password, name });
      }

      if (user) {
        const formattedUser = {
          id: user.$id,
          name: user.name,
          email: user.email,
        };
        dispatch(login(formattedUser)); // 🔥 Redux update
        if (onClose) {
          onClose();
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setMessage("Error occurred");
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // 🔥 outside click close
    >
      <div
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // prevent close on inside click
      >
        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ✖
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* MESSAGE */}
        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">
            {message}
          </p>
        )}

        {/* SWITCH */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthCard;