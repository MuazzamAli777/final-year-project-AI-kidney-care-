import "../App.css";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"; // ✅ import Link
import { useNavigate, useLocation } from "react-router-dom";
import services from "../appwrite/Database";
import AuthCard from "../authentication/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { login } from "../store/authSlice";
import { showToast } from "../store/toastSlice";
import NearHospital from "../nearhospital/Nearhospital";
import logo from "../homepagecomponets/logo icon .jpeg";
function Header() {
  const [count, setCount] = useState(0);
  let [bar1, setbar1] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState("true")
  useEffect(() => {
    const checkUser = async () => {
      const user = await services.getCurrentUser();
      // console.log("user ", user)

      const formatUser = (user) => ({
        id: user.$id,
        name: user.name,
        email: user.email,
      });
      if (user) {
        dispatch(login(formatUser(user)));
      }else{
        dispatch(logout());
      }
      dispatch(setLoading(false));
    };
    checkUser();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const confirmLogout = async () => {
    await services.logout();
    dispatch(logout());
    dispatch(showToast("Logged out successfully ✅"));
    setShowLogoutModal(false);
    navigate("/homepage");
  };


  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  // console.log(isAuthenticated)


  const logout1 = async () => {
    await services.logout();
    dispatch(logout()); // 🔥 Redux reset
  };

  const adder = () => {
    if (bar1) {
      setbar1(false)
    }
    else {
      setbar1(true)
    }
  }


  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link className="flex items-center gap-2" to="/" data-discover="true">
              <div className="w-10 h-10 bg-blue-600 rounded-3xl flex items-center justify-center">
             <img src={logo} alt="logo" className="object-fill w-10 h-10 rounded-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">AI-Kidney Care</span>
                <span className="text-xs text-gray-500">Detection System</span>
              </div>
            </Link>



            <div className="hidden md:flex items-center gap-8">
              <ul className="">
                <li className="">
                  <button
                    onClick={() => navigate("/homepage")}
                    className={`text-sm font-medium mx-3  px-3 p-2 transition-all duration-200
    hover:bg-blue-100 hover:text-blue-600 hover:rounded-full
    ${location.pathname === "/homepage"
                        ? "text-blue-500"  // ❌ active style hata diya
                        : "text-gray-500"
                      }`}
                  >
                    Home
                  </button>

                  <button
                    onClick={() => navigate("/doctors")}
                    className={`text-sm font-medium p-2 mx-3 transition-all duration-200
    hover:bg-blue-100 hover:text-blue-600 hover:rounded-full
    ${location.pathname === "/newanalysis"
                        ? "text-blue-500"  // ❌ active style hata diya
                        : "text-gray-500"
                      }`}
                  >
                    New Analysis
                  </button>

                  <button
                    onClick={() => navigate("/doctors")}
                    className={`text-sm font-medium px-2 py-2   mx-3 transition-all duration-200
    hover:bg-blue-100 hover:text-blue-600 hover:rounded-full
    ${location.pathname === "/doctors"
                        ? "text-blue-500"  // ❌ active style hata diya
                        : "text-gray-500"
                      }`}
                  >
                    Doctors
                  </button>

                  <button
                    onClick={() => navigate("/nearhospitals")}
                    className={`text-sm font-medium p-2 mx-3 transition-all duration-200
    hover:bg-blue-100 hover:text-blue-600 hover:rounded-full
    ${location.pathname === "/nearhospitals"
                        ? "text-blue-500"  // ❌ active style hata diya
                        : "text-gray-500"
                      }`}
                  >
                    Hospitals
                  </button>

                  <button
                    onClick={() => navigate("/chatbot")}
                    className={`text-sm font-medium p-2 mx-3 transition-all duration-200
    hover:bg-blue-100 hover:text-blue-600 hover:rounded-full
    ${location.pathname === "/chatbot"
                        ? "text-blue-500"  // ❌ active style hata diya
                        : "text-gray-500"
                      }`}
                  >
                    Chatbot
                  </button>


                  {isAuthenticated && (<button
                    onClick={() => navigate("/patients")}
                    className={`text-sm font-medium p-2 mx-3 transition-all duration-200
    hover:bg-blue-100 hover:text-blue-600 hover:rounded-full
    ${location.pathname === "/patients"
                        ? "text-blue-500"   // ❌ active style hata diya
                        : "text-gray-500"
                      }`}
                  >
                    Patient Record
                  </button>)}



                  {isAuthenticated && (
                    <button onClick={() => setShowLogoutModal(true)} className="text-red-600 ml-20">
                      Logout
                    </button>
                  )}
                  {!isAuthenticated && (
                    <button onClick={() => navigate("/AuthPage")} className="text-red-600 ml-20 text-">
                      login/signup
                    </button>
                  )}
                </li>
              </ul>


            </div>

            <button onClick={adder} className="md:hidden p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu w-6 h-6 text-gray-600"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />

              </svg>
            </button>
          </div>
          {bar1 &&
            (
              <div class="md:hidden py-4 border-t border-gray-200">
                <button
                  onClick={() => navigate("/homepage")}
                  className="block w-full text-left py-2 px-4 text-sm font-medium text-gray-600 
               transition-all duration-200
               hover:bg-blue-50 hover:text-blue-600 hover:rounded-lg"
                >
                  Home
                </button>

                <button
                  onClick={() => navigate("/newanalysis")}
                  className="block w-full text-left py-2 px-4 text-sm font-medium text-gray-600 
               transition-all duration-200
               hover:bg-blue-50 hover:text-blue-600 hover:rounded-lg"
                >
                   New Analysis
                </button>

                <button
                  onClick={() => navigate("/Doctors")}
                  className="block w-full text-left py-2 px-4 text-sm font-medium text-gray-600 
               transition-all duration-200
               hover:bg-blue-50 hover:text-blue-600 hover:rounded-lg"
                >
                  Doctors
                </button>

                
                 <button
                  onClick={() => navigate("/nearhospitals")}
                  className="block w-full text-left py-2 px-4 text-sm font-medium text-gray-600 
               transition-all duration-200
               hover:bg-blue-50 hover:text-blue-600 hover:rounded-lg"
                >
                  Hospitals
                </button>
                 <button
                  onClick={() => navigate("/chatbot")}
                  className="block w-full text-left py-2 px-4 text-sm font-medium text-gray-600 
               transition-all duration-200
               hover:bg-blue-50 hover:text-blue-600 hover:rounded-lg"
                >
                  chatbot
                </button>
                {isAuthenticated && (<button
                  onClick={() => navigate("/patients")}
                  className="block w-full text-left py-2 px-4 text-sm font-medium text-gray-600 
               transition-all duration-200
               hover:bg-blue-50 hover:text-blue-600 hover:rounded-lg"
                >
                  Patient Records
                </button>)}
                 {isAuthenticated && (
                    <button onClick={() => setShowLogoutModal(true)} className="text-red-600 ml-4">
                      Logout
                    </button>
                  )}
                  {!isAuthenticated && (
                    <button onClick={() => navigate("/AuthPage")} className="text-red-600 ml-4 ">
                      login/signup
                    </button>
                  )}
              </div>
            )
          }
          {showLogoutModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">

                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Confirm Logout
                </h2>

                <p className="text-gray-600 text-sm mb-6">
                  Are you sure you want to logout?
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmLogout}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Yes, Logout
                  </button>
                </div>

              </div>
            </div>
          )}



        </nav>
      </header>
    </>
  );
}

export default Header;