import React from "react";

const Petition = ({ petition }) => {
  return (
    <div className="w-full h-fit text-xl px-6 py-4 border bg-white">
      <div className="w-full h-full flex flex-col gap-5">
        <div className="w-full flex justify-between">
          <h2 className="font-bold">
            Subject: <span className="text-black font-normal">{petition.subject || "No Data"}</span>
          </h2>
          <h2 className="font-bold">
            Id: <span className="text-black font-normal">{petition.id || "No Data"}</span>
          </h2>
        </div>

        <div>
          <h2 className="font-bold">Description</h2>
          <h2 className="text-black font-normal px-2 py-1 container border">{petition.description || "No Data"}</h2>
        </div>

        <div className="flex justify-between">
          <div>
            <h2 className="font-bold">Petitioner: <span className="text-black font-normal">{petition.name || "No Data"}</span></h2>
            <h2 className="font-bold">Gender: <span className="text-black font-normal">{petition.gender || "No Data"}</span></h2>
            <h2 className="font-bold">Adhar Number: <span className="text-black font-normal">{petition.adhar || "No Data"}</span></h2>
          </div>
          <div>
            <h2 className="font-bold">Priority: <span className="text-black font-normal">{petition.priority || "No Data"}</span></h2>
            <h2 className="font-bold">Category: <span className="text-black font-normal">{petition.department || "No Data"}</span></h2>
            <h2 className="font-bold">Address: <span className="text-black font-normal">{petition.address || "No Data"}</span></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petition;
