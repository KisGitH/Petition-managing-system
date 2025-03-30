import React, { useEffect, useState } from "react";
import Petitions from "./Petitions";

// Department list (can be extended if needed)
const departments = [
  "All Department",
  "Agriculture",
  "Education",
  "Environment",
  "Health",
  "Public",
  "Transport",
  "Water Resource",
];

const Department = () => {
  const [petitions, setPetitions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All Department");

  // Fetch petitions from the backend
  useEffect(() => {
    fetch("/api") // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => setPetitions(data))
      .catch((error) => console.error("Error fetching petitions:", error));
  }, []);

  // Filter petitions based on selected department
  const filteredPetitions =
    selectedDepartment === "All Department"
      ? petitions
      : petitions.filter((petition) => petition.department === selectedDepartment);

  return (
    <div className="w-full h-svh grid grid-cols-4">
      {/* Sidebar with Department List */}
      <div className="h-svh pt-15">
        <ul className="flex flex-col mt-5 gap-8 font-medium">
          {departments.map((dept) => (
            <li
              key={dept}
              className={`py-2 px-10 transition hover:scale-105 hover:text-[#1f72ee] text-2xl cursor-pointer ${
                selectedDepartment === dept ? "text-[#1f72ee] font-bold" : ""
              }`}
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept}
            </li>
          ))}
        </ul>
      </div>

      {/* Petitions List */}
      <div className="h-svh col-span-3 pt-13.5">
        <div className="h-full bg-[#5c8ae7] overflow-auto">
          {filteredPetitions.length > 0 ? (
            filteredPetitions.map((petition, index) => (
              <Petitions key={petition.id} petition={petition} x={index + 1} />
            ))
          ) : (
            <p className="text-center m-10">No petitions available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Department;
