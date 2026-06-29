import "../App.css";
import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../homepagecomponets/logo icon .jpeg";
function Footer() {
  const [count, setCount] = useState(0);

const navigate = useNavigate();

const { isAuthenticated } = useSelector(
  (state) => state.auth
);

  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
               <div>
                <img src={logo} alt="logo" className="object-fill w-10 h-10 rounded-2xl" />
               </div>
                <span className="text-xl font-bold">AI-Kidney Care</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advanced AI-powered kidney disease detection system for early
                diagnosis and better patient outcomes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-colors"
                    to="/homepage#home"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-colors"
                    to="/homepage#about"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-colors"
                    to="/homepage#services"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-colors"
                    to="/Doctors"
                  >
                    Our Team
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-colors"
                    to="/newanalysis"
                  >
                    AI Disease Detection
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-colors"
                    to="/doctors"
                  >
                    Doctors
                  </Link>
                </li>
                <li>
  <button
    onClick={() =>
      navigate(isAuthenticated ? "/patients" : "/AuthPage")
    }
    className="text-gray-400 hover:text-white transition-colors text-sm"
  >
    Patient Records
  </button>
</li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-white transition-colors"
                    to="/homepage#contact"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+1 (555) 123-4567</li>
                <li>support@kidneyai.com</li>
                <li>Boston, MA 02115, USA</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              © 2026 KidneyAI. All rights reserved. Powered by Deep Learning
              Technology.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;