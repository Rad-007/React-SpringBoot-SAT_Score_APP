import React, { useState } from "react";
import axios from "axios";

const Update = () => {
  const [formData, setFormData] = useState({
    name: "",
    newScore: "", // Rename the field to match the backend
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "newScore" ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data with Updated SAT Score:", formData);

    // Send a PUT request to your Spring Boot backend
    axios.put(`http://localhost:8080/api/sat-results/update/${formData.name}`,null, {
        
    params: {
      newScore: parseFloat(formData.newScore), // Pass 'newScore' as a query parameter
    },
    
      })
      .then((response) => {
        console.log("SAT Score updated successfully:", response.data);
        alert("SAT Score updated successfully");
        window.location.reload();
        // You can reset the form or show a success message here
      })
      .catch((error) => {
        console.error("Error updating SAT Score:", error);
      });
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Update</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <span></span>
            <label>Name</label>
          </div>
          <div className="txt_field">
            <input
              type="number"
              name="newScore" // Change to newScore
              value={formData.newScore} // Change to newScore
              onChange={handleChange} // Change to newScore
              required
              max="1600"
            />
            <span></span>
            <label>New SAT Score</label> {/* Update the label as needed */}
          </div>
          <input name="submit" type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

export default Update;
