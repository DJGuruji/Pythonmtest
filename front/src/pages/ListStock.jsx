import React, { useState, useEffect } from "react";
import { getSubvariants } from "../api";
import { NavLink } from "react-router-dom";

const ListStock = () => {
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
    <div className="w-full h-[100vh] flex justify-center items-center ">

    <table className="w-3/4 table-auto text-sm border-collapse border border-gray-300">
    <thead className="bg-blue-500 text-white">
      <tr>
        <th className="py-2 px-4 text-left border border-gray-300">Option</th>
        <th className="py-2 px-4 text-left border border-gray-300">Stock</th>
        <th className="py-2 px-4 text-left border border-gray-300">Action</th>
      </tr>
    </thead>
    <tbody>
      {subvariants.map((subvariant) => (
        <tr key={subvariant.id} className="border-b hover:bg-gray-50">
          <td className="py-2 px-4 border border-gray-300">{subvariant.option}</td>
          <td className="py-2 px-4 border border-gray-300">{subvariant.stock}</td>
          <td className="py-2 px-4 border border-gray-300">
        <button className="bg-red-600 text-white hover:bg-red-700 hover:rounded-xl rounded-lg p-2">
          Delete Stock
        </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
  );
};

export default ListStock;
