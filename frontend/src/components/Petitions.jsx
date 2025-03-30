import React, { useEffect, useState } from "react";
import Petition from "./Petition";

const Petitions = ({ petition, x }) => {
  const [selectedPetition, setSelectedPetition] = useState(null);
  const [status, setStatus] = useState(petition.status || "Pending");
  const [statusColor, setStatusColor] = useState("bg-gray-200");

  // Update status color based on the current status
  useEffect(() => {
    if (status === "ReportedToAuthority") {
      setStatusColor("bg-green-300");
    } else if (status === "Rejected") {
      setStatusColor("bg-red-400");
    } else if(status === "HoldForReview"){
      setStatusColor("bg-yellow-200");
    }
  }, [status]); // <-- Updated dependency

  const updateStatus = async (newStatus) => {
    setStatus(newStatus); // Update UI instantly

    try {
      const response = await fetch(`/api${petition.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...petition, status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Status updated:", data.message);
      } else {
        console.error("Error updating status:", data.detail);
      }
    } catch (error) {
      console.error("Failed to update petition status:", error);
    }
  };

  return (
    <div className="w-full">
      {selectedPetition ? (
        <div onClick={() => status === "Pending" ? updateStatus("HoldForReview"): status}>
          <div className="px-4 py-2 flex items-center justify-between">
            <button
              onClick={() => setSelectedPetition(null)}
              className="text-lg font-medium"
            >
              {"<- "}Back
            </button>
            <select
              className="border-1 font-medium text-lg bg-[#5cafe7] py-2 rounded outline-none flex"
              value={status}
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="HoldForReview">Choose</option>
              <option value="ReportedToAuthority" className="bg-[#30da57]">
                Reported To Authority
              </option>
              <option value="Rejected" className="bg-[#e45a5a]">
                Rejected
              </option>
            </select>
          </div>
          <Petition petition={selectedPetition} />
        </div>
      ) : (
        <div
          onClick={() => setSelectedPetition(petition)}
          className="relative flex justify-between items-center bg-[#5cafe7] border-1 px-4 py-2 transform-content hover:bg-transparent transition ease-in-out duration-500 cursor-pointer"
        >
          <div className="flex items-center text-xl">
            <div className="px-2">
              <h1>{x}</h1>
            </div>
            <div className="px-5 flex flex-col">
              <h1>{petition.subject || "No Subject"}</h1>
              <p className="text-sm">{petition.name || "Anonymous"}</p>
            </div>
          </div>
          <div
            className={`absolute top-0 bottom-0 right-0 w-50 px-4 ${statusColor} flex items-center justify-center
            transform-content hover:opacity-90 transition ease-in-out duration-500 cursor-pointer`}
          >
            <h1>{status}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Petitions;
