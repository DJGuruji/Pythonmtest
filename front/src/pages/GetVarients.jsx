import React, { useState, useEffect } from "react";
import { getVariants } from "../api";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";


const GetVarients = () => {
  

  const [variants, setVariants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const data = await getVariants();
        setVariants(data);
      } catch (err) {
        toast.error("Failed to fetch variants");
        console.error("Failed to fetch variants:", err);
      }
    };
    fetchVariants();
  }, []);

  const filteredVariants = variants.filter((variant) =>
    variant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className="text-2xl text-center m-5 text-gray-800">Variants</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by variant name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-700 p-2 rounded-md w-1/3"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        {filteredVariants.length > 0 ? (
          filteredVariants.map((variant) => (
            <span
              key={variant.id}
              className="bg-black text-white p-3 m-5 rounded-xl w-3/4 md:w-1/4 lg:w-1/4 xl:w-1/4"
         
            >
              <NavLink
                to={`/variant/${variant.id}/addstock`}
                className={({ isActive }) =>
                  `mx-4 ${isActive ? "underline" : ""}`
                }
              >
                Add Stock for Variant {variant.name}
              </NavLink>
            </span>
          ))
        ) : (
          <p>No variants matching the search criteria</p>
        )}
      </div>
    </>
  );
};

export default GetVarients;
