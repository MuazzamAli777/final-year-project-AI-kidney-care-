
import { useEffect, useState } from "react";
import services from "../appwrite/Database";
import '../App.css'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Patient_record() {

  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {

    const fetchPatients = async () => {

      setLoading(true);

      const response = await services.getPatients(filter, page, 10);
      console.log(response)
      if (response) {
        setPatients(response.rows);

        setTotalPages(Math.ceil(response.total / 10));
      }
      setLoading(false);
    };

    fetchPatients();

  }, [filter, page]);

  console.log(patients)

  const filteredPatients = patients.filter((patient) => {
    // Name starts with searchTerm (case-insensitive)
    const matchName =
      searchTerm === "" || patient.name.toLowerCase().startsWith(searchTerm.toLowerCase());

    // Diagnosis filter
    const matchDiagnosis = filter === "All" || patient.result === filter;

    return matchName && matchDiagnosis;
  });

  // CSV export function
  const exportCSV = () => {
    if (filteredPatients.length === 0) return;

    const headers = ["Patient ID", "Name", "Age", "Gender", "Date", "Diagnosis", "Confidence"];
    const rows = filteredPatients.map(p => [
      p.$id,
      p.name,
      p.age,
      p.gender,
      p.$createdAt,
      p.result,
      p.confidence
    ]);

    // CSV string create
    let csvContent = "";
    csvContent += headers.join(",") + "\n"; // Add headers
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "patients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const deletepost = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    const ans = await services.deletePost(id);

    if (ans) {
      setPatients(patients.filter((p) => p.$id !== id));
    }

  };

  const openReport = (patientid_li) => {
    console.log(patientid_li)
    navigate(`/report/${patientid_li}`); // $id is Appwrite document ID
  };

  const getimage = (fileid) => {
    //  console.log("FILE ID:", fileid);
    const url = services.getFilePreview1(fileid)
    //  console.log("IMAGE URL:", url);
    return url
  }


  return (
    <>
      <section className='flex-1'>
        <div class="min-h-screen bg-gray-50 py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

              <div>
                <h1 class="text-3xl font-bold text-gray-900">Patient Records</h1>
                <p class="text-gray-600 mt-1">Manage and view all patient analyses</p>
              </div>

              <div class="flex gap-3">

                <button class="flex items-center gap-2 border px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                  onClick={exportCSV}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Export CSV
                </button>

                <button
                  onClick={() => navigate("/newanalysis")}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>

                  New Analysis
                </button>

              </div>

            </div>

            <div class="bg-white border rounded-xl p-6">


              <div class="flex flex-col sm:flex-row gap-4 mb-6">

                <div class="flex-1 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full border rounded-md pl-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
                  </svg>

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded-md px-3 py-2"
                  >

                    <option value="All">All Diagnoses</option>
                    <option value="Normal">Normal</option>
                    <option value="Stone">Kidney Stone</option>
                    <option value="Tumor">Tumor</option>
                    <option value="Cyst">Cyst</option>

                  </select>
                </div>

              </div>
              {loading ?
                (

                  <div className="text-center py-10 text-gray-500">Loading patient records...</div>
                )

                :


                (

                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">

                      <thead class="border-b  bg-gray-50">
                        <tr>
                          <th class="text-center px-2 py-3">Patient ID</th>
                          <th class="text-center px-2 py-3">Name</th>
                          <th class="text-center px-2 py-3">Age</th>
                          <th class="text-center px-2 py-3">Gender</th>
                          <th class="text-center px-2 py-3">Date</th>
                          <th class="text-center px-2 py-3">Diagnosis</th>
                          <th class="text-center px-2 py-3">Confidence</th>
                          <th class="text-center px-2 py-3">Actions</th>
                          <th class="text-right px-2 py-3">
                            image
                          </th>
                          <th class="text-right px-2 py-3">Delete</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredPatients.map((patient) => (
                          <tr key={patient.$id} className="border-b hover:bg-gray-50">
                            <td className="px-2 py-2 text-center font-mono">{patient.$id}</td>
                            <td className="px-2 py-2 text-center font-medium">{patient.name}</td>
                            <td className="px-2 py-2 text-center">{patient.age}</td>
                            <td className="px-2 py-2 text-center">{patient.gender}</td>
                       <td className="px-2 py-2 text-center">
  {new Date(patient.$createdAt).toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</td>
                            <td className="px-2 py-2 text-center">
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      patient.result === "Normal"
        ? "bg-green-100 text-green-700"
       
        : "bg-red-100 text-red-700"
    }`}
  >
    {patient.result}
  </span>
</td>
                            <td className="px-2 py-2 text-center">{patient.confidence}%</td>
                            <td className="px-2 py-2 text-center">
                              <Link
                                to={`/report/${patient.$id}`}
                                state={{ patient }}
                                className="p-1  hover:bg-gray-300 rounded"
                              >
                                View Report
                              </Link>
                            </td>
                            <td className="px-2 py-2 text-right flex justify-end ">
                              <img className='w-8 object-cover' src={getimage(patient.featuredimage)} alt="scan" />
                            </td>
                            <td className="px-2 py-2 text-right">
                              <button className="text-red-600" onClick={() => deletepost(patient.$id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              <div class="mt-4 text-sm text-gray-500 text-center">
                Showing {filteredPatients.length} of  {filteredPatients.length} records
              </div>
              <div className="flex justify-center gap-2 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setPage(i + 1)}
      className={`px-3 py-1 border rounded ${
        page === i + 1 ? "bg-blue-600 text-white" : ""
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
              {!loading && filteredPatients.length === 0 && (
                <div className="text-center py-10 text-gray-500">No patient records found. </div>
              )}
            </div>

          </div>


        </div>


      </section>

    </>
  )
}

export default Patient_record
