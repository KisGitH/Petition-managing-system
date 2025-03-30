import React, { useState, useEffect } from 'react';
import Petitions from './Petitions';

const QuickAccess = () => {
    const [petitions, setPetitions] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState("High");

    // Fetch petitions from the backend
    useEffect(() => {
        fetch("/api/") // Replace with your backend URL
            .then((response) => response.json())
            .then((data) => setPetitions(data))
            .catch((error) => console.error("Error fetching petitions:", error));
    }, []);

    // Filter petitions based on selected priority
    const filteredPetitions = petitions.filter((petition) => petition.priority === selectedPriority);

    return (
        <div className='pt-28'>
            {/* Navigation Bar */}
            <nav className='fixed top-14 right-0 left-0 z-10 bg-amber-100 py-4 px-10'>
                <ul className='flex gap-5'>
                    <li 
                        onClick={() => setSelectedPriority("High")} 
                        className={`cursor-pointer ${selectedPriority === "High" ? "font-bold underline" : ""}`}
                    >
                        <a href="#">High</a>
                    </li>
                    <li 
                        onClick={() => setSelectedPriority("Moderate")} 
                        className={`cursor-pointer ${selectedPriority === "Moderate" ? "font-bold underline" : ""}`}
                    >
                        <a href="#">Moderate</a>
                    </li>
                    <li 
                        onClick={() => setSelectedPriority("Low")} 
                        className={`cursor-pointer ${selectedPriority === "Low" ? "font-bold underline" : ""}`}
                    >
                        <a href="#">Low</a>
                    </li>
                </ul>
            </nav>

            {/* Petition List */}
            <div className="h-svh col-span-3">
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

export default QuickAccess;
