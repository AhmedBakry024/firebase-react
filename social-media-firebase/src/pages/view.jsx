import React, { useState } from "react";
import { getFormData } from "../repo";
import Navbar from "./navbar";

function View() {
  const [formData, setFormData] = useState([]);

  const fetchData = async () => {
    const data = await getFormData();
    setFormData(data);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-screen justify-center items-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-white mb-6">View Data</h2>
         <div className="flex justify-center">
             <button
               onClick={fetchData}
               className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500 mb-6"
             >
               Fetch Data
             </button>
         </div>
          <div className="space-y-4">
            {formData.map((data, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md shadow">
                <p className="text-white"><span className="font-bold">Group Name:</span> {data.groupName}</p>
                <p className="text-white"><span className="font-bold">Group Type:</span> {data.groupType}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
