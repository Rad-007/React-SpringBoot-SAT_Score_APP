import React, { useState } from "react";
import axios from "axios";

const Delete = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual endpoint for deleting a record
      const response = await axios.delete('http://localhost:8080/api/sat-results/delete/' + name);

      if (response.status === 200) {
        setMessage(`Successfully deleted record for ${name}`);
        window.location.reload();
      } else {
        setMessage(`Failed to delete the record for ${name}`);
      }
    } catch (error) {
      setMessage("An error occurred while deleting the record.");
    }
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Delete</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span></span>
            <label>Name</label>
          </div>
          <input name="submit" type="submit" value="Delete" />
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Delete;
