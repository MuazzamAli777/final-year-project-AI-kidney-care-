import "../App.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
        return setError("Please fill all required fields");
    }

    if (!validateEmail(form.email)) {
        return setError("Invalid email format");
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
        await emailjs.send(
            "service_q1x5c26",
            "template_9u2ei19",
            {
                from_name: form.name,
                from_email: form.email,
                from_Number: form.phone,
                message: form.message,
                to_email: "mozabhali521@gmail.com",
            },
            "iuZmKzCg80kxjXnOV"
        );

      setSuccess("✅ Message sent successfully!");

setTimeout(() => {
    setSuccess("");
}, 3000); // 5 seconds

        setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
        });

    } catch (err) {
      setError("❌ Failed to send message. Please try again.");

setTimeout(() => {
    setError("");
}, 3000); // 5 seconds
    } finally {
        setLoading(false);
    }
};
    return (
        <>
            <section id="contact" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">Contact Us</div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get in Touch with Our <span className="text-blue-600">Support Team</span></h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">Have questions about our AI-powered kidney disease detection system? Our expert team is here to help you get started and answer any questions you may have.</p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-6 h-6 text-blue-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1">Phone</div>
                                        <div className="text-gray-600">+92 342 0315743</div>
                                        <div className="text-sm text-gray-500">Mon-Fri 9am-6pm EST</div>

                                    </div>

                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-6 h-6 text-blue-600"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1">Email</div>
                                        <div className="text-gray-600">support@kidneyai.com</div>
                                        <div className="text-sm text-gray-500">We'll respond within 24 hours</div>
                                    </div>

                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-6 h-6 text-blue-600"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>

                                    </div>
                                    <div><div className="font-semibold text-gray-900 mb-1">Address</div><div className="text-gray-600">Office No. 12, Main Circular Road
Near DHQ Hospital
Narowal, Punjab 51600, Pakistan</div>
                                    </div>

                                </div>

                            </div>

                        </div>

                       <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
  <div className="p-8">

    {/* Header */}
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
      Send us a Message
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md">
          {error}
        </p>
      )}

      {/* Name */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Email */}
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Phone */}
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Message */}
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Message..."
        rows="4"
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      {/* Button */}
      <button
    type="submit"
    disabled={loading}
    className={`w-full py-3 rounded-xl font-medium transition duration-200
        ${
            loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
>
    {loading ? (
        <div className="flex items-center justify-center gap-2">
            <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>

            Sending...
        </div>
    ) : (
        "Send Message"
    )}
</button>
    </form>
    {error && (
    <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
        {error}
    </p>
)}

{success && (
    <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
        {success}
    </p>
)}

  </div>
</div>





                    </div>
                </div>

            </section >


        </>
    );
}


export default Contact
