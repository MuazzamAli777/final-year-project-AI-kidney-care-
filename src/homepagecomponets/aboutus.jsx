import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Aboutus() {
    const [count, setCount] = useState(0)
 const navigate = useNavigate();
    return (
        <>

            <section id='about' className='py-20 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' >
                    <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-8'>
                        <div className=''>
                            <img className='rounded-2xl shadow-xl ' src="https://images.unsplash.com/photo-1691935152546-3a9e05f4010b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRuZXklMjB1bHRyYXNvdW5kJTIwbWVkaWNhbCUyMGltYWdpbmd8ZW58MXx8fHwxNzcyMzQ5MjU3fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="" />
                        </div>
                        <div className='mx-2'>
                            <div className='inline-block p-2 bg-blue-300 text-blue-700 rounded-full text-sm font-medium mb-5'>
                                About us
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Revolutionizing Kidney Disease Detection with <span className="text-blue-600">AI Technology</span></h2>


                            <p className="text-gray-600 mb-6 leading-relaxed text-justify">Kidney diseases are among the most prevalent and rapidly growing health challenges worldwide, significantly impacting patient health and increasing the burden on healthcare systems. Medical conditions such as kidney stones, tumors, and cysts require early and accurate diagnosis to prevent serious complications, including chronic kidney failure.</p>

                            <p className="text-gray-600 mb-6 leading-relaxed text-justify">Our advanced AI system leverages state-of-the-art deep learning architectures including MobileNetV2, InceptionV3, NasNetMobile, InceptionResNetV2, and Xception combined with transfer learning approaches. These proven models achieve high performance even with limited datasets, ensuring reliable and accurate disease classification.</p>

                            <div className='grid grid-cols-2 gap-4 mb-6'>

                                <div className='flex  gap-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-5 h-5 text-green-600 flex-shrink-0 mt-1"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>

                                    <div>
                                        <div className="font-semibold text-gray-900">Early Detection</div>
                                        <div className="text-sm text-gray-600">Identify diseases at early stages</div>
                                    </div>

                                </div>

                                <div className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-5 h-5 text-green-600 flex-shrink-0 mt-1"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                                    <div>
                                        <div className="font-semibold text-gray-900">High Accuracy</div>
                                        <div className="text-sm text-gray-600">97.5% diagnostic accuracy</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-5 h-5 text-green-600 flex-shrink-0 mt-1"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                                    <div>
                                        <div className="font-semibold text-gray-900">Fast Processing</div>
                                        <div className="text-sm text-gray-600">Results in seconds</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-5 h-5 text-green-600 flex-shrink-0 mt-1"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                                    <div>
                                        <div className="font-semibold text-gray-900">Cost Effective</div>
                                        <div className="text-sm text-gray-600">Reduce diagnostic costs</div>
                                    </div>
                                </div>
                            </div>
                            

                            <button data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground h-10 rounded-md px-6 has-[&gt;svg]:px-4 bg-blue-600 hover:bg-blue-700"
                             onClick={() => navigate("/newanalysis")}>
                            Start Free Analysis<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-5 h-5 ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </button>

                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Aboutus
