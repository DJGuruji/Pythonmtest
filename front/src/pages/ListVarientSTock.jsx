import React, { useState, useEffect } from "react";
import { getVariants, removeStockFromVariant } from "../api";
import { toast } from "sonner";

const ListVarientSTock = () => {
  const [variants, setVariants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [removeStockValue, setRemoveStockValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

  const handleRemoveStock = async () => {
    if (!removeStockValue || isNaN(removeStockValue) || removeStockValue <= 0) {
      toast.error("Please enter a valid stock value to remove");
      return;
    }
    try {
      await removeStockFromVariant(selectedVariant.id, removeStockValue);
      toast.success("Stock removed successfully");
      setVariants((prev) =>
        prev.map((variant) =>
          variant.id === selectedVariant.id
            ? { ...variant, stocks: variant.stocks - removeStockValue }
            : variant
        )
      );
      setShowPopup(false);
      setRemoveStockValue("");
    } catch (err) {
      toast.error("Failed to remove stock");
      console.error("Error removing stock from variant:", err);
    }
  };

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
      <div className="flex justify-center">
        <table className="w-3/4 table-auto text-sm border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left border border-gray-300">
                Name
              </th>
              <th className="py-2 px-4 text-left border border-gray-300">
                Stock
              </th>
              <th className="py-2 px-4 text-left border border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVariants.length > 0 ? (
              filteredVariants.map((variant) => (
                <tr key={variant.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 border border-gray-300">
                    {variant.name}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {parseFloat(variant.stocks).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button
                      onClick={() => {
                        setSelectedVariant(variant);
                        setShowPopup(true);
                      }}
                      className="bg-red-600 text-white hover:bg-red-700 hover:rounded-xl rounded-lg p-2"
                    >
                      Delete Stock
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No variants matching the search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Remove Stock</h2>
            <p className="mb-2">
              Removing stock from <strong>{selectedVariant.name}</strong>
            </p>
            <input
              type="number"
              placeholder="Enter stock to remove"
              value={removeStockValue}
              onChange={(e) => setRemoveStockValue(e.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-400 text-white rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveStock}
                className="bg-red-600 text-white rounded-lg px-4 py-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListVarientSTock;
