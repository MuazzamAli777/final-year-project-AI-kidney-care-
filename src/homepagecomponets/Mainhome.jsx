import { useState } from "react";
import "../App.css";

function Mainhome() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold shadow-sm mb-7">
                💙 Smart AI Healthcare
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                AI Kidney Healthcare <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Made Simple & Fast
                </span>
              </h1>
              <p className="mt-7 text-lg text-gray-600 leading-relaxed max-w-2xl">
                Upload your CT scan or ultrasound image and let our AI system
                help detect kidney stones, tumors, or cysts quickly and easily.
                Get fast reports, emergency help, and connect with doctors —
                all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                {/* Main Button */}
                <a href="/newanalysis">
                  <button
                    className="
                    group
                    px-8 py-4
                    rounded-2xl
                    bg-gradient-to-r from-blue-600 to-cyan-500
                    text-white
                    font-semibold
                    shadow-lg shadow-blue-200
                    hover:shadow-2xl hover:shadow-cyan-200
                    hover:scale-105
                    transition-all duration-300
                    flex items-center justify-center gap-3
                    w-full sm:w-auto
                  "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:-translate-y-1 transition-transform duration-300"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>

                    Start Analysis
                  </button>
                </a>

                {/* Secondary Button */}
                <a href="#about">
                  <button
                    className="
                  px-8 py-4
                  rounded-2xl
                  border border-blue-200
                  bg-white/70 backdrop-blur-lg
                  text-blue-700
                  font-semibold
                  hover:bg-blue-50
                  hover:shadow-lg
                  transition-all duration-300"


                  >

                    Learn More
                  </button>
                </a>
              </div>

              <div className="flex flex-wrap gap-6 mt-10">

                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-lg px-4 py-3 rounded-2xl shadow-sm border border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    ✅
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      Safe & Secure
                    </h4>

                    <p className="text-gray-500 text-xs">
                      Protected patient data
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-lg px-4 py-3 rounded-2xl shadow-sm border border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    ⚡
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      Fast Results
                    </h4>

                    <p className="text-gray-500 text-xs">
                      AI-powered analysis
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <div className="relative flex justify-center">

              {/* Glow */}
              <div className="absolute w-[420px] h-[420px] bg-gradient-to-r from-blue-300 to-cyan-300 opacity-20 blur-3xl rounded-full"></div>

              {/* Main Image Card */}
              <div
                className="
                relative
                bg-white/70
                backdrop-blur-xl
                p-4
                rounded-[35px]*/
                border border-white/50
                shadow-[0_20px_60px_rgba(59,130,246,0.15)]
              "
              >
                <img
                  className="
                  w-full max-w-md
                  rounded-[28px]
                  object-cover
                "
                  src="https://www.imec-int.com/_next/image?url=https%3A%2F%2Fdrupal.imec-int.com%2Fsites%2Fdefault%2Ffiles%2Fimported%2Frenal.jpg&w=3840&q=75"
                  alt="Kidney Healthcare"
                />

                {/* Floating Card */}
                <div
                  className="
                  absolute
                  -bottom-6
                  -left-6
                  bg-white
                  px-5 py-4
                  rounded-2xl
                  shadow-xl
                  border border-blue-100
                "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                      🩺
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        AI Detection
                      </h4>

                      <p className="text-xs text-gray-500">
                        Quick & Accurate Results
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Mainhome;