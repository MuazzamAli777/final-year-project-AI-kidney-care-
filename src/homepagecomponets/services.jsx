import "../App.css";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
const services = [
  {
    title: "AI Scanner",
    description:
      "Upload your CT scan or ultrasound image to check for kidney stones, tumors, or cysts using smart AI technology.",
    icon: "🧠",
  },
  {
    title: "Scan History",
    description:
      "Get simple and clear medical reports quickly with helpful health information and suggestions.",
    icon: "📄",
  },
  {
    title: "AI Chat Bot",
    description:
      "Chat with our AI assistant anytime to ask questions about kidney health, symptoms, and care tips.",
    icon: "🤖",
  },
  {
    title: "Nearby Hospital",
    description:
      "Find nearby hospitals easily and make emergency calls quickly during urgent situations.",
    icon: "🚑",
  },
  {
    title: "Doctors",
    description:
      "Contact doctors directly through WhatsApp for medical advice and support from home.",
    icon: "👨‍⚕️",
  },
];

function Services() {
  const navigate = useNavigate();
  

const { isAuthenticated } = useSelector(
  (state) => state.auth
);


const navigatekro = (serviceName) => {
  switch (serviceName) {
    case "AI Scanner":
      navigate("/newanalysis");
      break;

    case "Scan History":
      if (isAuthenticated) {
        navigate("/patients");
      } else {
        navigate("/AuthPage");
      }
      break;

    case "AI Chat Bot":
      navigate("/chatbot");
      break;

    case "Nearby Hospital":
      navigate("/nearhospitals");
      break;

    case "Doctors":
      navigate("/doctors");
      break;

    default:
      break;
  }
};

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top <span className="text-blue-600">Services</span> We Offer
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI-powered solutions for kidney disease detection and
            management
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 place-items-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                group relative
                w-full max-w-[320px]
                bg-white/80
                border border-white/40
                rounded-[28px]
                p-6
                overflow-hidden
                shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]
                transition-all duration-500
                hover:-translate-y-2
              "
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 opacity-10 blur-xl rounded-full"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="
                    w-16 h-16 rounded-2xl
                    bg-gradient-to-br from-blue-500 to-cyan-400
                    flex items-center justify-center
                    text-3xl
                    shadow-lg shadow-blue-200/60
                    mb-6
                    group-hover:scale-110
                    group-hover:rotate-3
                    transition-all duration-500
                  "
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom */}
                <div className="mt-7 flex items-center justify-between">
                  <span className="text-blue-600 font-semibold text-sm">
                    Explore Service
                  </span>

                  <button
                    onClick={() => navigatekro(service.title)}
                    className="
                      w-10 h-10 rounded-full
                      bg-blue-50
                      flex items-center justify-center
                      text-blue-600
                      group-hover:bg-gradient-to-r
                      group-hover:from-blue-500
                      group-hover:to-cyan-400
                      group-hover:text-white
                      transition-all duration-300
                      cursor-pointer
                    "
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-[28px] border border-transparent group-hover:border-blue-200 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;