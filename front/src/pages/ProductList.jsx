import React, { useState, useEffect } from "react";
import { listProducts } from "../api";
import { getSubvariants } from "../api"; // Make sure your API function is imported
import { toast } from "sonner"; // Assuming you're using sonner for toast notifications

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subvariants, setSubvariants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch products on component mount
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await listProducts();
        console.log(response.data.results);
        setProducts(response.data.results); // Assuming the data structure is an array of products
      } catch (err) {
        setError("Failed to fetch products");
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <>
    
    <h2 className="text-2xl font-semibold text-center mb-4 ">Product List</h2>
    <div className="container mx-auto p-6 flex justify-center">
      
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex justify-center w-3/4 shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Product Name</th>
                <th className="py-2 px-4 text-left">Product Code</th>

                <th className="py-2 px-4 text-left">Variants</th>
               
              </tr>
            </thead>
            <tbody>
              <>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{product.ProductName}</td>
                    <td className="py-2 px-4">{product.ProductCode}</td>
                    {/* <td className="py-2 px-4">{product.TotalStock}</td> */}
                    <td className="py-2 px-4">
                      {product.variants.length > 0 ? (
                        <ul className="list-disc pl-4">
                          {product.variants.map((variant, index) => (
                            <li key={index}>{variant.name}</li> // Replace with actual field
                          ))}
                        </ul>
                      ) : (
                        <p>No variants available</p>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
          <table className="min-w-1/2 table-auto text-sm">
            <thead className="bg-blue-500 text-white">
              <tr className="border-b">
                <th className="pt-2 pb-3 px-4 text-left"> Stocks</th>
              </tr>
            </thead>
            <tbody>
              {subvariants.map((subvariant) => (
                <tr key={subvariant.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{subvariant.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};


export default ProductList;
