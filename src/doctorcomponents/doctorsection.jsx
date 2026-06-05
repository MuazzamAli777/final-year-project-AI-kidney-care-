import { useState } from "react";

const doctorsData = [
  {
    id: 1,
    name: "Dr.Ahmed Ali",
    hospital: "City Hospital Lahore",
    specialization: "Nephrology",
    timing: "Mon–Sat, 5 PM – 9 PM",
    phone: "923001234567",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Dr.Fatima Khan",
    hospital: "Shaukat Khanum Hospital",
    specialization: "Nephrology",
    timing: "Mon–Fri, 9 AM – 1 PM",
    phone: "923009876543",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Dr.Hassan Raza",
    hospital: "Agha Khan Hospital",
    specialization: "Nephrology",
    timing: "Tue–Sun, 3 PM – 7 PM",
    phone: "923115556677",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Dr.Ayesha Malik",
    hospital: "Jinnah Hospital",
    specialization: "Nephrology",
    timing: "Mon–Wed, 10 AM – 2 PM",
    phone: "923221234567",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Dr.Bilal Shah",
    hospital: "Services Hospital",
    specialization: "Nephrology",
    timing: "Mon–Sat, 6 PM – 10 PM",
    phone: "923334445566",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Dr.Sana Iqbal",
    hospital: "Mayo Hospital",
    specialization: "Urology",
    timing: "Mon–Fri, 8 AM – 12 PM",
    phone: "923447778899",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Dr.Usman Tariq",
    hospital: "Hameed Latif Hospital",
    specialization: "Urology",
    timing: "Tue–Sat, 4 PM – 8 PM",
    phone: "923556667788",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Dr.Zainab Abbas",
    hospital: "National Hospital",
    specialization: "Urology",
    timing: "Mon–Thu, 2 PM – 6 PM",
    phone: "923667778899",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop",
  },
];

const categories = ["All", "Urology", "Nephrology"];

function Doctorsection()

{  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || doctor.specialization === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBookAppointment = (phone) => {
    const message = "Hello Doctor, I would like to book an appointment.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

   return (
//    <section id="home" class="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">…</section>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-gradient-to-br from-blue-100 via-white to-cyan-50 text-blue-700  py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <svg
              className="size-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <div>
              <h1 className="text-3xl font-bold">Find Your Doctor</h1>
              <p className="text-blue-700 text-sm">Book appointments instantly via WhatsApp</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by doctor name, specialization, or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
                <div className="flex flex-col items-center">
                  <div className="size-24 rounded-full bg-gray-200 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-16">
                <svg
                  className="size-20 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl text-gray-600 mb-2">No doctors found</h3>
                <p className="text-gray-400">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="size-24 rounded-full object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition"
                        />
                        <div className="absolute bottom-0 right-0 size-6 bg-green-500 rounded-full ring-4 ring-white"></div>
                      </div>

                      <h3 className="text-xl text-gray-900 mb-1 text-center">
                        {doctor.name}
                      </h3>

                      <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-3">
                        {doctor.specialization}
                      </div>

                      <div className="w-full space-y-2 mb-4">
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <svg
                            className="size-5 shrink-0 text-blue-500 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          <span>{doctor.hospital}</span>
                        </div>

                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <svg
                            className="size-5 shrink-0 text-blue-500 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{doctor.timing}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookAppointment(doctor.phone)}
                        className="w-full bg-green-500  hover:bg-green-600 text-white py-3 rounded-xl transition-all duration-300 shadow-lg  hover:shadow-gray-500/50 flex items-center justify-center gap-2 group/btn"
                      >
                        <svg
                          className="size-5 group-hover/btn:scale-110 transition"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Doctorsection