
import "../App.css";
import { useState } from "react";
function Analysesbar() {
    const [count, setCount] = useState(0)

    return (
        <>
            <section className='py-12 bg-white border-y border-gray-100'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-8'>


                        <div className='text-center'>
                            <h1 className='text-blue-700 text-3xl font-bold'>10,000+</h1>
                            <p>analysis perform </p>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-blue-700 text-3xl font-bold'>97.7 %</h1>
                            <p>Accuracy Rate </p>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-blue-700 text-3xl font-bold '>20+</h1>
                            <p>Healthcare Partner </p>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-blue-700 text-3xl font-bold '>24/7</h1>
                            <p>Support Available </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Analysesbar
