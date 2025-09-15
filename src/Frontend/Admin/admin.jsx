import { useState } from "react";

export default function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Cakes");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    const response = await fetch("http://localhost:5000/admin/add-product", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setName("");
      setCategory("Cakes");
      setPrice("");
      setDescription("");
      setImage(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Panel - Add Product</h1>

      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block font-medium">Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Cakes">Cakes</option>
            <option value="Puffs">Puffs</option>
            <option value="Sweets">Sweets</option>
            <option value="Cookies">Cookies</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Price (₹):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded"
        >
          Add Product
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
}
