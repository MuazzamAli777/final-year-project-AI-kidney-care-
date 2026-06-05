import { useState } from "react";
import "../App.css";
function Trust() {
    const [count, setCount] = useState(0)
const testimonials = [
  {
    name: "Dr. James Wilson",
    role: "Nephrologist, Mayo Clinic",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    review:
      "KidneyAI has improved our diagnosis process and helps identify kidney issues faster.",
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Radiologist, Johns Hopkins Hospital",
    image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    review:
      "The AI system provides quick and reliable analysis, helping us make decisions faster.",
  },
  {
    name: "Dr. Michael Brown",
    role: "Kidney Specialist, Cleveland Clinic",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    review:
      "An excellent tool for early detection. It supports doctors with accurate insights.",
  },
];
    return (
        <>
            <section class='py-20 bg-slate-100'>
                <div class='max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 mx-auto '>
                    <div class='text-center mb-10'>
                        <h2 class='text-2xl font-bold  sm:text-4xl mb-5'>
                            What Healthcare Professionals Say
                        </h2>
                        <p class='mb-15'>
                            Trusted by leading hospitals and medical professionals worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {testimonials.map((item, index) => (
    <div key={index} className="bg-white rounded-lg p-4 shadow">

      <div className="flex items-center">
        <img
          className="rounded-full h-20 w-20"
          src={item.image}
          alt={item.name}
        />

        <div className="ml-4">
          <h5 className="font-medium">{item.name}</h5>
          <p>{item.role}</p>
        </div>
      </div>

      <p className="text-gray-600 italic mt-4">
        "{item.review}"
      </p>

      <div className="flex gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>

    </div>
  ))}
</div>
                </div>


            </section>

        </>
    )
}

export default Trust
