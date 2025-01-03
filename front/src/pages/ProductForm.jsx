import React, { useState, useEffect } from "react";
import { createProduct } from "../api";
import {toast} from "sonner"
import AOS from 'aos';
import 'aos/dist/aos.css';


const ProductForm = () => {

  useEffect(() => {
    AOS.init({
      duration: 2000, 
      easing: "ease-in-out",
      once: true, 
    });
  }, []);

  const [productData, setProductData] = useState({
    name: "",
    variants: [{ name: "", options: [""] }],
  });

  // Handle changes in product name
  const handleProductNameChange = (e) => {
    setProductData({
      ...productData,
      name: e.target.value,
    });
  };

  // Handle changes in variant name
  const handleVariantNameChange = (e, index) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[index].name = e.target.value;
    setProductData({
      ...productData,
      variants: updatedVariants,
    });
  };

  // Handle changes in variant options
  const handleOptionChange = (e, variantIndex, optionIndex) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[variantIndex].options[optionIndex] = e.target.value;
    setProductData({
      ...productData,
      variants: updatedVariants,
    });
  };

  // Add a new variant to the product
  const handleAddVariant = () => {
    setProductData({
      ...productData,
      variants: [
        ...productData.variants,
        { name: "", options: [""] },
      ],
    });
  };

  // Remove a variant from the product
  const handleRemoveVariant = (index) => {
    const updatedVariants = productData.variants.filter((_, i) => i !== index);
    setProductData({
      ...productData,
      variants: updatedVariants,
    });
  };

  // Add a new option to a specific variant
  const handleAddOption = (variantIndex) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[variantIndex].options.push("");
    setProductData({
      ...productData,
      variants: updatedVariants,
    });
  };

  // Remove an option from a specific variant
  const handleRemoveOption = (variantIndex, optionIndex) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[variantIndex].options = updatedVariants[variantIndex].options.filter((_, i) => i !== optionIndex);
    setProductData({
      ...productData,
      variants: updatedVariants,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      toast.error("You must be logged in.");
      return;
    }
      await createProduct(productData, accessToken);
      toast.success("Product created successfully!");
      setProductData({ name: "", variants: [{ name: "", options: [""] }] });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100 space-y-6 p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg" data-aos="fade-up">
    <div className="space-y-3">
      <label className="block text-lg font-semibold">Product Name:</label>
      <input
        type="text"
        value={productData.name}
        onChange={handleProductNameChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {productData.variants.map((variant, variantIndex) => (
      <div key={variantIndex} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold">Variant Name:</label>
          <input
            type="text"
            value={variant.name}
            onChange={(e) => handleVariantNameChange(e, variantIndex)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {variant.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center space-x-3">
            <div className="w-full">
              <label className="block text-lg font-semibold">Option {optionIndex + 1}:</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, variantIndex, optionIndex)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveOption(variantIndex, optionIndex)}
              className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Remove Option
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => handleAddOption(variantIndex)}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Add Option
        </button>

        <button
          type="button"
          onClick={() => handleRemoveVariant(variantIndex)}
          className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Remove Variant
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={handleAddVariant}
      className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600"
    >
      Add Variant
    </button>

    <button
      type="submit"
      className="w-full px-6 py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
    >
      Create Product
    </button>
  </form>
  );
};

export default ProductForm;
