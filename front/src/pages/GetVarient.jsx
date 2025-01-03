import React, { useState, useEffect } from "react";
import { getSubvariants } from "../api";
import { NavLink } from "react-router-dom";

const GetVarient = () => {
  useEffect(() => {
    const fetchSubvariants = async () => {
      try {
        const response = await getSubvariants();
        setSubvariants(response.data);
      } catch (err) {
        console.error("Failed to fetch subvariants:", err);
      }
    };
    fetchSubvariants();
  }, []);

  const [subvariants, setSubvariants] = useState([]);

  return (
    <div className="flex flex-col justify-center items-center  ">
      {" "}
      {subvariants.map((subvariant) => (
         <span className="bg-black text-white p-3 m-5 rounded-xl w-1/4">
        <NavLink
          key={subvariant.id}
          to={`/subvariant/${subvariant.id}/addstock`}
          className={({ isActive }) => `mx-4  ${isActive ? "underline" : ""}`}
        >
         
            Add Stock for Sub Varient {subvariant.option}
          
        </NavLink>
        </span>
      ))}
    </div>
  );
};

export default GetVarient;
