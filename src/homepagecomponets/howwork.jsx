import "../App.css";
import { useState } from "react";
function Howwork() {
    const [count, setCount] = useState(0)

    return (
        <>
            <section class='py-20 bg-gradient-to-br from-blue-50 to-cyan-50'>
                <div class='max-w-7xl px-4 lg:px-6 mx-auto'>
                    <div class='text-center mb-10  '>

                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How <span class="text-blue-600">KidneyAI</span>

                            Works</h2>
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto">Simple three-step process to get accurate kidney disease diagnosis</p>

                    </div>

                    <div class='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        <div class='relative'>
                            <div class='p-8 bg-white hover:shadow-xl rounded-2xl h-full'>
                                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>

                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload w-6 h-6 text-blue-600">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>

                                </div>

                                <h3 class="text-xl font-semibold text-gray-900 mb-3">Upload Medical Image</h3>
                                <p class="text-gray-600">Upload CT scan, MRI, or ultrasound image of the kidney along with patient information for analysis.</p>
                            </div>
                        </div>

                        <div class="relative">
                            <div class="bg-white rounded-2xl p-8 hover:shadow-xl h-full">
                                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain w-6 h-6 text-blue-600"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M19.938 10.5a4 4 0 0 1 .585.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M19.967 17.484A4 4 0 0 1 18 18"></path></svg></div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-3">AI Analysis</h3>
                                <p class="text-gray-600">Our deep learning models analyze the image to detect kidney stones, tumors, cysts, or abnormalities with high accuracy.</p>
                            </div>

                        </div>

                        <div class="relative">
                            <div class="bg-white rounded-2xl p-8 hover:shadow-xl h-full">
                                <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-6 h-6 text-blue-600"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                                </div><h3 class="text-xl font-semibold text-gray-900 mb-3">Get Report</h3>
                                <p class="text-gray-600">Receive detailed diagnostic report with findings, confidence levels, and treatment recommendations instantly.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Howwork
