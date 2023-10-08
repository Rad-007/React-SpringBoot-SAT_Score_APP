import React, { useState } from "react";

const Rank = () => {
  const [name, setName] = useState("");
  const [rank, setRank] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name:", name);
    try {
      const response = await fetch('http://localhost:8080/api/sat-results/rank/'+name);
       // Log the response

      console.log("Response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        if (data.rank !== undefined) {
          setRank(data.rank);
          setError(null);
          
        } else {
          setError("Candidate not found");
          setRank(null);
        }
      } else {
        setError("Candidate not found");
        setRank(null);
      }
    } catch (error) {
      console.error("Error fetching rank:", error);
      setError("An error occurred while fetching the rank.");
      setRank(null);
    }
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Rank</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span></span>
            <label>Name</label>
          </div>
          <input type="submit" value="Show Rank" />
        </form>
        {rank !== null && <p>Rank for {name} is {rank}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Rank;
