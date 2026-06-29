import { useState } from "react";

import { Provider } from "react-redux";

import { useDispatch, useSelector } from "react-redux";
import services from "../appwrite/Database";
import { login } from "../store/authSlice";
import Header from "../homepagecomponets/header";
import { useNavigate } from "react-router-dom";
import { showToast } from "../store/toastSlice";
function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState("");


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateName = (value) => {
        // only letters + space allowed, min 3 chars
        const nameRegex = /^[A-Za-z\s]{3,}$/;

        if (!nameRegex.test(value)) {
            return "Name must contain only letters and at least 3 characters";
        }

        // prevent random garbage like "kdjbhv"
        const repeated = /(.)\1{3,}/; // e.g. aaa, xxxx
        if (repeated.test(value)) {
            return "Invalid name format";
        }

        return "";
    };

    

    const resetFields = () => {
        setName("");
        
        setPassword("");
        setNameError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            let user;

            if (!isLogin && nameError) {
                setError("Please fix name field");
                setLoading(false);
                return;
            }
            if (isLogin) {
                // 🔥 LOGIN
                user = await services.login({ email, password });

                if (user) {
                    const currentUser = await services.getCurrentUser();
                    dispatch(login(currentUser));

                    dispatch(showToast("Login Successful ✅"));

                    // 🔥 IMPORTANT: clear password after login attempt
                    setPassword("");

                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }

            } else {
                // 🔥 SIGNUP
                user = await services.createAccount({ email, password, name });

                if (user) {
                    dispatch(showToast("Account created successfully ✅"));

                    setIsLogin(true);

                    // 🔥 IMPORTANT: clear everything
                    resetFields();

                    // optional message clear
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 2000);
                }
            }

        } catch (err) {
            setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex">

                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/5"></div>

                    <div className="absolute top-0 left-0 w-96 h-9 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

                    <div className="relative z-10  p-10 flex flex-col justify-between w-full">
                        <div className="inline-block px-4 py-2 max-w-48 bg-blue-100 text-blue-700 rounded-full text-sm font-medium  mt-10">
                            Advanced AI Technology
                        </div>

                        <div className="mb-28 -translate-y-8">


                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">Your Trusted Partner in <span className="text-blue-600">Kidney Healthcare</span>
                            </h1>

                            <p className="text-black text-base mb-8 max-w-lg leading-relaxed text-justify">
                                Revolutionary AI-powered kidney disease detection system utilizing deep learning to provide accurate, rapid, and reliable diagnosis. Empowering healthcare professionals with cutting-edge technology for early detection of kidney stones, tumors, cysts, and abnormalities.
                            </p>

                            <div className="space-y-3 text-black">
                                <div className="flex items-start gap-3">
                                    <div className="size-2 bg-cyan-600 rounded-full mt-2 shrink-0"></div>
                                    <p>Deep learning algorithms for accurate diagnosis</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="size-2 bg-cyan-600 rounded-full mt-2 shrink-0"></div>
                                    <p>Early detection of kidney stones, tumors & cysts</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="size-2 bg-cyan-600 rounded-full mt-2 shrink-0"></div>
                                    <p>Rapid and reliable medical imaging analysis</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="size-2 bg-cyan-600 rounded-full mt-2 shrink-0"></div>
                                    <p>Empowering healthcare professionals worldwide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <h2 className="text-4xl text-gray-900 mb-2">
                                {isLogin ? "Sign In" : "Create Account"}
                            </h2>
                            <p className="text-gray-600">
                                {isLogin ? "New user? " : "Already have an account? "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    {isLogin ? "Create an account" : "Sign in"}
                                </button>
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">
                                        FULL NAME
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg
                                                className="size-5 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setName(value);
                                                setNameError(validateName(value));
                                            }}
                                            placeholder="Enter your full name"
                                            required={!isLogin}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />

                                        {nameError && (
                                            <p className="text-red-500 text-xs mt-1">{nameError}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    EMAIL ADDRESS
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg
                                            className="size-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                       
                                        placeholder="you@example.com"
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    PASSWORD
                                </label>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg
                                            className="size-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                       
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />

                                    {/* SHOW/HIDE BUTTON */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {isLogin && (
                                <div className="flex items-center justify-between">

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            try {
                                                if (!email) {
                                                    dispatch(showToast("Please enter your email first"));
                                                    return;
                                                }

                                                await services.forgotPassword(email);

                                                dispatch(showToast("Reset link sent to your email 📩"));
                                            } catch (error) {
                                                dispatch(showToast("Failed to send reset email"));
                                            }
                                        }}
                                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}
                            {successMessage && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm text-center">
                                    {successMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">
                                        or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3"
                                onClick={() => services.loginWithGoogle()}>
                                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                                    <svg className="size-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-700">Google</span>
                                </button>

                                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                                    <svg className="size-5" fill="#0A66C2" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <span className="text-sm text-gray-700">LinkedIn</span>
                                </button>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-xs text-gray-500">
                            By signing in you agree to our{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Terms
                            </a>{" "}
                            &{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>


        </>
    );
}
export default AuthPage