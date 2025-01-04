import React, { useState, useEffect } from "react";
import { listProducts } from "../api";
import { getSubvariants } from "../api";
import { toast } from "sonner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subvariants, setSubvariants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await listProducts();
        console.log(response.data.results);
        setProducts(response.data.results);
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
      <h2 className="text-2xl font-semibold text-center m-4 ">Product List</h2>
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
                  <th className="py-2 px-4 text-left">Variants - </th>
                  <th className="py-2 px-4 text-left">Variants Stock</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{product.ProductName}</td>
                      <td className="py-2 px-4">{product.ProductCode}</td>

                      <td className="py-2 px-4">
                        {product.variants.length > 0 ? (
                          <ul className="list-disc pl-4">
                            {product.variants.map((variant, index) => (
                              <li key={index}>{variant.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No variants available</p>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {product.variants.length > 0 ? (
                          <ul className="list-disc pl-4">
                            {product.variants.map((variant, index) => (
                              <li key={index}>
                                {parseFloat(variant.stocks).toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No variants stocks available</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
