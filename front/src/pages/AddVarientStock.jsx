import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addStockToVariant } from "../api";
import { toast } from "sonner";

const AddVarientStock = () => {
  const { variantId } = useParams();
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await addStockToVariant(variantId, stock);
      toast.success(response.data.message);
    } catch (err) {
      // setError("Failed to add stock");
      //toast.error("Failed to add stock");
    } finally {
      setLoading(false);
      toast.success("success");
      setStock(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add Varient Stock
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-gray-700 font-medium mb-2"
          >
            Stock Amount
          </label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter stock amount"
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding Stock..." : "Add Stock"}
        </button>
      </form>
    </div>
  );
};

export default AddVarientStock;
