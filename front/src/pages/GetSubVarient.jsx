import React, { useState, useEffect } from "react";
import { getSubvariants } from "../api";
import { NavLink } from "react-router-dom";


const GetSUbVarient = () => {
 
  const [subvariants, setSubvariants] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 

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

  const filteredSubvariants = subvariants.filter((subvariant) =>
    subvariant.option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className="text-2xl text-center m-5 text-gray-800">Sub Variants</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by subvariant option..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-700  p-2 rounded-md w-1/3"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        {filteredSubvariants.length > 0 ? (
          filteredSubvariants.map((subvariant) => (
            <span
              key={subvariant.id}
              className="bg-black text-white p-3 m-5 rounded-xl w-3/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
            
            >
              <NavLink
                to={`/subvariant/${subvariant.id}/addstock`}
                className={({ isActive }) =>
                  `mx-4 ${isActive ? "underline" : ""}`
                }
              >
                Add Stock for Sub Variant {subvariant.option}
              </NavLink>
            </span>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No subvariants matching the search criteria
          </p>
        )}
      </div>
    </>
  );
};

export default GetSUbVarient;
