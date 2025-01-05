import React, { useState, useEffect } from "react";
import { getSubvariants, removeStock, addStock } from "../api";
import { toast } from "sonner";

const ListStock = () => {
  const [subvariants, setSubvariants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubvariant, setSelectedSubvariant] = useState(null);
  const [stockToRemove, setStockToRemove] = useState("");
  const [stockToAdd, setStockToAdd] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubvariants = async () => {
      try {
        const response = await getSubvariants();
        setSubvariants(response.data);
      } catch (err) {
        console.error("Failed to fetch subvariants:", err);
        toast.error("Failed to fetch subvariants");
      }
    };
    fetchSubvariants();
  }, []);

  const filteredSubvariants = subvariants.filter((subvariant) =>
    subvariant.option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenRemoveModal = (subvariant) => {
    setSelectedSubvariant(subvariant);
    setStockToRemove("");
    setIsModalOpen(true);
  };

  const handleOpenAddModal = (subvariant) => {
    setSelectedSubvariant(subvariant);
    setStockToAdd("");
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedSubvariant(null);
  };

  const handleRemoveStock = async () => {
    if (!selectedSubvariant || !stockToRemove) return;

    try {
      await removeStock(selectedSubvariant.id, parseFloat(stockToRemove));
      toast.success("Stock removed successfully!");
      setSubvariants((prev) =>
        prev.map((sub) =>
          sub.id === selectedSubvariant.id
            ? { ...sub, stock: sub.stock - parseFloat(stockToRemove) }
            : sub
        )
      );
      handleCloseModal();
    } catch (err) {
      console.error("Failed to remove stock:", err);
      toast.error(err.response?.data?.error || "Failed to remove stock");
    }
  };

  const handleAddStock = async () => {
    if (!selectedSubvariant || !stockToAdd) return;

    try {
      await addStock(selectedSubvariant.id, parseFloat(stockToAdd));
      toast.success("Stock added successfully!");
      setSubvariants((prev) =>
        prev.map((sub) =>
          sub.id === selectedSubvariant.id
            ? { ...sub, stock: sub.stock + parseFloat(stockToAdd) }
            : sub
        )
      );
      handleCloseModal();
    } catch (err) {
      console.error("Failed to add stock:", err);
      toast.error(err.response?.data?.error || "Failed to add stock");
    }
  };

  return (
    <>
      <h1 className="text-2xl text-center m-5 text-gray-800">Sub Variants</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by option..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-700 p-2 rounded-md w-1/3"
        />
      </div>
      <div className="flex justify-center">
        <table className="w-3/4 table-auto text-sm border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 text-center border border-gray-300">Option</th>
              <th className="py-2 px-4 text-center border border-gray-300">Stock</th>
              <th className="py-2 px-4 text-center border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubvariants.length > 0 ? (
              filteredSubvariants.map((subvariant) => (
                <tr key={subvariant.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center border-gray-300">{subvariant.option}</td>
                  <td className="py-2 px-4 border text-center border-gray-300">
                    {parseFloat(subvariant.stock).toFixed(2)}
                  </td>
                  <td className="py-2 flex justify-center px-4 border border-gray-300">
                    <button
                      className="bg-red-600 text-white hover:bg-red-700 rounded-lg p-2 mr-2"
                      onClick={() => handleOpenRemoveModal(subvariant)}
                    >
                      Delete Stock
                    </button>
                    <button
                      className="bg-green-600 text-white hover:bg-green-700 rounded-lg p-2"
                      onClick={() => handleOpenAddModal(subvariant)}
                    >
                      Add Stock
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No matching subvariants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Remove Stock</h2>
            <p className="mb-2">
              Subvariant: <strong>{selectedSubvariant.option}</strong>
            </p>
            <p className="mb-4">Current Stock: {parseFloat(selectedSubvariant.stock).toFixed(2)}</p>
            <input
              type="number"
              value={stockToRemove}
              onChange={(e) => setStockToRemove(e.target.value)}
              placeholder="Enter stock to remove"
              className="border border-gray-700 p-2 rounded-md w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={handleRemoveStock}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Stock</h2>
            <p className="mb-2">
              Subvariant: <strong>{selectedSubvariant.option}</strong>
            </p>
            <p className="mb-4">Current Stock: {parseFloat(selectedSubvariant.stock).toFixed(2)}</p>
            <input
              type="number"
              value={stockToAdd}
              onChange={(e) => setStockToAdd(e.target.value)}
              placeholder="Enter stock to add"
              className="border border-gray-700 p-2 rounded-md w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={handleAddStock}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListStock;
