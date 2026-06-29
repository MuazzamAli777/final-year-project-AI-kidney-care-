import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import services from '../appwrite/Database';
import Header from '../homepagecomponets/header'
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
function Report() {
    const printRef = useRef();
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const [patient, setPatient] = useState(location.state?.patient || null);
    const { patientId } = useParams();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(!location.state?.patient);
    const [heatmapUrl, setHeatmapUrl] = useState(null);





    useEffect(() => {
        // ONLY show message if coming from FORM
        if (location.state?.isNew) {
            setSuccessMessage("Patient Record Saved Successfully");
            window.history.replaceState({}, document.title);
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        // 1️⃣ SUCCESS MESSAGE ONLY ONCE (when coming from form)


        // 2️⃣ set patient from navigation state
        if (location.state?.patient) {
            setPatient(location.state.patient);

            if (location.state.patient.heatmapimage) {
                setHeatmapUrl(
                    services.getFilePreview1(location.state.patient.heatmapimage)
                );
            }

            setLoading(false);
            return;
        }

        // 3️⃣ fallback: fetch from database
        const fetchPatient = async () => {
            try {
                const response = await services.getPost(patientId);

                setPatient(response);

                if (response.heatmapimage) {
                    setHeatmapUrl(
                        services.getFilePreview1(response.heatmapimage)
                    );
                }

            } catch (error) {
                console.error("Error fetching patient:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();

    }, [patientId]);

    if (loading) return <p>Loading report...</p>;
    if (!patient) return <p>Patient not found!</p>;

    const getDescription = () => {

        if (patient.result === "Stone") {
            return "A solid mineral deposit has been detected in the kidney. Kidney stones form when minerals and salts crystallize in the kidneys and can cause pain, urinary discomfort, and possible blockage in the urinary tract. Medical evaluation is recommended to determine the size and appropriate treatment.";
        }

        if (patient.result === "Tumor") {
            return "An abnormal mass has been detected in the kidney tissue. Kidney tumors can be benign or malignant and require further medical examination such as imaging tests or biopsy. Early diagnosis is important for proper treatment and monitoring.";
        }

        if (patient.result === "Cyst") {
            return "A fluid-filled sac has been detected in the kidney. Kidney cysts are round pouches of fluid that can develop on or inside the kidneys. Most simple cysts are harmless and may not cause symptoms, but larger or complex cysts may require medical monitoring and evaluation to prevent complications.";
        }

        if (patient.result === "Normal") {
            return "No abnormal structures have been detected in the kidney. The kidney appears normal with no visible signs of stones, cysts, or tumors. Routine health monitoring and a healthy lifestyle are recommended to maintain kidney health.";
        }

    };
    const getRecommendations = () => {

        if (patient.result === "Stone") {
            return [
                "Consult a urologist or nephrologist",
                "Increase water intake",
                "Follow dietary modifications",
                "Pain management if needed",
                "Imaging tests may be required",
                "Seek help if severe pain occurs"
            ];
        }

        if (patient.result === "Cyst") {
            return [
                "Consult a nephrologist",
                "Monitor cyst size with imaging",
                "Most cysts require no treatment",
                "Complex cysts need investigation",
                "Report symptoms like pain or fever",
                "Monitor kidney function"
            ];
        }

        if (patient.result === "Tumor") {
            return [
                "Immediate specialist consultation",
                "Further CT or MRI imaging",
                "Biopsy may be required",
                "Regular monitoring",
                "Possible surgical treatment",
                "Early intervention recommended"
            ];
        }

        if (patient.result === "Normal") {
            return [
                "Kidneys appear normal",
                "Maintain healthy diet",
                "Drink sufficient water",
                "Routine health checkups",
                "Monitor blood pressure",
                "Healthy lifestyle recommended"
            ];
        }
        if (patient.result === "Reject") {
            return (
                <div className="flex items-center justify-center h-screen text-center">
                    <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">
                            Invalid Image Uploaded
                        </h2>
                        <p>
                            The uploaded file is not a valid kidney CT scan or ultrasound image.
                            Please upload a relevant medical image.
                        </p>
                    </div>
                </div>
            );
        }

        return []; // 🔴 important
    };
    const handlePrint = () => {
        // Open print dialog for the div content only

        window.print();
        // Reload to restore event listeners and react state
    };


    const getimage = (fileid) => {
        //  console.log("FILE ID:", fileid);
        const url = services.getFilePreview1(fileid)
        //    console.log("IMAGE URL:", url);
        return url
    }


    const handleDownload = async () => {
        const element = printRef.current;

        // temporarily show
        element.classList.remove("hidden");

        const opt = {
            margin: 0.5,
            filename: `Kidney_Report_${patient.name}.pdf`,
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
        };

        await html2pdf().set(opt).from(element).save();

        // hide again
        element.classList.add("hidden");
    };
    return (


        <div>
            {successMessage && (
                <div className="fixed top-20 right-10  ">

                    <div className="bg-green-500 text-white p-2 rounded-xl shadow-2xl 
    text-sm font-semibold transform transition-all duration-500 scale-100 animate-pulse ">

                        ✔ Patient Record Saved Successfully

                    </div>

                </div>
            )}
            <section className="print:hidden" >
                <Header />
                <div className='max-w-3xl mx-auto px-4 sm:px-4 lg:px-8 mt-5'>
                    <div className="space-y-6">

                        <div className="flex items-center justify-between print:hidden">


                            {/* <!-- Back Button --> */}
                            <button className="flex items-center gap-2 px-4 py-2 h-9 text-sm font-medium rounded-md transition hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                onClick={() => navigate("/patients")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="m12 19-7-7 7-7"></path>
                                    <path d="M19 12H5"></path>
                                </svg>
                                Back to Records
                            </button>
                            {/* 
                    <!-- Action Buttons --> */}
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 h-9 text-sm font-medium rounded-md border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    onClick={handlePrint}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                        <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"></path>
                                        <rect x="6" y="14" width="12" height="8" rx="1"></rect>
                                    </svg>
                                    Print
                                </button>

                                {/* <button className="flex items-center gap-2 px-4 py-2 h-9 text-sm font-medium rounded-md border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"

                                    onClick={handleDownload}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" x2="12" y1="15" y2="3"></line>
                                    </svg>
                                    Download
                                </button> */}
                            </div>
                        </div>


                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 
p-4 sm:p-6 lg:p-8 
print:shadow-none print:border-0">

                            <div className="mb-8">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity w-10 h-10 text-blue-600"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
                                            </svg>

                                            <div>
                                                <h1 className="text-3xl font-semibold text-gray-900">KidneyAI</h1>

                                                <p className="text-sm text-gray-600">Medical Imaging Diagnostic Report</p>

                                            </div>

                                        </div>

                                    </div>
                                    <div className=" px-4 text-right">
                                        <p className="text-sm text-gray-600">Report Date</p>
                                        <p className="font-medium text-gray-900">      {new Date(patient.$createdAt).toISOString().split("T")[0]}</p>
                                    </div>
                                </div>
                                <div data-orientation="horizontal" role="none" data-slot="separator-root" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px">
                                </div>
                            </div>

                            {/* {patient information} */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user w-5 h-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2">
                                    </path>
                                        <circle cx="12" cy="7" r="4"></circle></svg>

                                    Patient Information</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">

                                    <div><p className="text-sm text-gray-600">Patient Name</p>

                                        <p className="font-medium text-gray-900">{patient.name}</p>

                                    </div><div><p className="text-sm text-gray-600">Patient ID</p>

                                        <p className="font-medium text-gray-900">{patient.$id}</p>

                                    </div>
                                    <div className='lg:text-right lg:pr-3'>
                                        <p className="text-sm text-gray-600">Age</p>
                                        <p className="font-medium text-gray-900">{patient.age}</p>
                                    </div>
                                    <div className='lg:text-center'>
                                        <p className="text-sm text-gray-600">Gender</p>
                                        <p className="font-medium text-gray-900 capitalize">{patient.gender}</p>

                                    </div>
                                </div>

                            </div>
                            {/* {image k lia } */}

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Image</h2>
                                <img src={getimage(patient.featuredimage)} alt="Kidney scan" className="max-w-80 max-h-80 object-cover mx-auto rounded-lg border border-gray-200" />

                                <p className="text-sm text-gray-600 text-center mt-3">Kidney imaging scan analyzed on {new Date(patient.$createdAt).toISOString().split("T")[0]}</p>
                            </div>
                            {/* Heatmap Image */}
                            {heatmapUrl && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        AI Heatmap Analysis
                                    </h2>

                                    <img
                                        src={heatmapUrl}
                                        alt="Kidney Heatmap"
                                        className="max-w-80 max-h-80 object-cover mx-auto rounded-lg border border-gray-200"
                                    />

                                    <p className="text-sm text-gray-600 text-center mt-3">
                                        AI generated heatmap highlighting detected region
                                    </p>
                                </div>
                            )}


                            {/* {ai powered analysis } */}

                            <div className="mb-8">

                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Diagnosis</h2>


                                <div
                                    className={`border-2 rounded-lg p-6 
                                           ${patient.result === "Normal"
                                            ? "text-green-700 bg-green-50 border-green-300"
                                            : patient.result === "Stone"
                                                ? "text-orange-700 bg-orange-50 border-orange-300"
                                                : patient.result === "Cyst"
                                                    ? "text-yellow-700 bg-yellow-50 border-yellow-300"
                                                    : patient.result === "Tumor"
                                                        ? "text-red-700 bg-red-50 border-red-300"
                                                        : "text-gray-700 bg-gray-50 border-gray-300"
                                        }`}
                                >


                                    <div className="flex items-center gap-3 mb-4">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert w-8 h-8"><circle cx="12" cy="12" r="10">

                                        </circle>
                                            <line x1="12" x2="12" y1="8" y2="12">
                                            </line>
                                            <line x1="12" x2="12.01" y1="16" y2="16"></line></svg>

                                        <div>
                                            <h3 className="text-2xl font-semibold">
                                                {patient.result}
                                            </h3>

                                            {/* Confidence with tooltip */}
                                            <div className="relative inline-block group mt-1">
                                                <p className="text-sm cursor-pointer">
                                                    Confidence Level: {patient.confidence}
                                                </p>

                                                {/* Tooltip */}
                                                <div className="absolute left-full -translate-x-1/2 bottom-full mb-2 
                        hidden group-hover:block 
                        bg-black text-white text-xs 
                        px-3 py-2 rounded-md whitespace-nowrap">
                                                    AI sure level
                                                </div>
                                            </div>

                                            {patient.stonesize && (
                                                <p className="text-sm mt-1">
                                                  Stone Size: {Number((patient.stone_size_mm / 100).toFixed(3))} mm
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-justify">{getDescription()}</p>
                                </div>

                            </div>

                            {/* {clinical recomendation} */}

                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Clinical Recommendations
                                </h2>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <ul className="space-y-3">

                                        {getRecommendations().map((rec, index) => (
                                            <li key={index} className="flex items-start gap-3">

                                                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                                                    {index + 1}
                                                </span>

                                                <span className="text-gray-700 leading-relaxed">
                                                    {rec}
                                                </span>

                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            </div>

                            {/* 
                    {last portion} */}

                            <div className="border-t border-gray-200 pt-6 mt-8"><div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"><p className="text-xs text-yellow-900 leading-relaxed"><span className="font-semibold">Medical Disclaimer:</span> This report is generated by an AI-powered diagnostic assistance system and should not be considered as a final diagnosis. The results are intended to support clinical decision-making and should be reviewed by a qualified healthcare professional. Always consult with a licensed physician for proper medical diagnosis and treatment planning.</p></div><div className="mt-4 text-center text-xs text-gray-500"><p>KidneyAI - Deep Learning Based Kidney Disease Detection System</p><p className="mt-1">Powered by Transfer Learning with CNN Architectures</p></div></div>

                        </div>


                    </div>
                </div>
            </section>
            {/* 

    {/* Header */}
            <div ref={printRef} className="hidden print:block">
                <section className="flex justify-center print:block">
                    <div className="w-[800px] bg-white p-8 border border-gray-300 shadow-md print:shadow-none print:border-none">
                        <div className="flex justify-between items-center bg-blue-800 text-white px-4 py-4 m-2 print:bg-blue-800">
                            <h1 className="text-lg font-semibold">Kidney Detector AI Report</h1>
                            <span className="text-sm">
                                Date: {new Date(patient.$createdAt).toISOString().split("T")[0]}
                            </span>
                        </div>

                        {/* Patient Info */}
                        <div className="mb-6">
                            <h2 className="font-semibold text-gray-800 border-b pb-3 mb-2">
                                Patient Information
                            </h2>
                            <p><span className="font-semibold">Name:</span> {patient.name}</p>
                            <p><span className="font-semibold">Age:</span> {patient.age}</p>
                            <p><span className="font-semibold">Sex:</span> {patient.gender}</p>
                        </div>

                        {/* Scan Info */}
                        <div className="mb-6">
                            <h2 className="font-semibold text-gray-800 border-b pb-3 mb-2">
                                Scan Information
                            </h2>
                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {new Date(patient.$createdAt).toISOString().split("T")[0]}
                            </p>
                            <p><span className="font-semibold">Scan Type:</span> CT-Scan</p>
                        </div>

                        {/* Analysis */}
                        <div className="mb-6">
                            <h2 className="font-semibold text-gray-800 border-b pb-3 mb-2">
                                Analysis
                            </h2>

                            <p className="text-red-600 font-semibold">
                                Result: {patient.result}
                            </p>

                            <p className="text-green-600">
                                Confidence: {patient.confidence}
                            </p>
                            {patient.stonesize && (
                                <p className="text-sm mt-1">
                                    Stone Size: {patient.stone_size_mm / 100} mm
                                </p>
                            )}
                        </div>


                        {/* Image */}
                        <div className="mb-6">
                            <h2 className="font-semibold text-gray-800 border-b pb-3 mb-2">
                                Scan Image:
                            </h2>

                            <img
                                src={services.getFilePreview1(patient.heatmapimage)}

                                alt="Kidney scan"
                                className="max-w-80 max-h-80 object-cover mx-auto rounded-lg border border-gray-200"
                            />
                        </div>

                        {/* Doctor */}
                        <div className="text-right mt-10">
                            <p className="font-semibold">Dr. Ahmed Khan</p>
                            <span className="text-sm text-gray-600">Nephrologist</span>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-6 pt-3 border-t text-xs text-gray-600">
                            <span className="font-semibold">Disclaimer:</span> This report is generated by Kidney Detector AI as an automated analysis tool. It is intended for informational purposes only and should not be considered a final medical diagnosis. Please consult a certified healthcare professional.
                        </div>

                    </div>
                </section>
            </div>


        </div>


    )
}

export default Report
