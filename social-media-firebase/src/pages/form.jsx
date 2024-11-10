// this will be the form page where the user can submit their data and send it to the function in the repo file

import React, { useState } from "react";
// import './form.css'
import { addFormData } from "../repo";
import Navbar from "./navbar";

function Form() {
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addFormData({ groupName, groupType });
    setGroupName("");
    setGroupType("");
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-screen justify-center items-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Submit Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Group Name:
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Group Type:
              </label>
              <input
                type="text"
                value={groupType}
                onChange={(e) => setGroupType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
