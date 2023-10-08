import React, { useState, useEffect } from "react";
import axios from "axios";
import "./view.css"

const View = () => {

    const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your Spring Boot backend when the component mounts
    axios.get("http://localhost:8080/api/sat-results/view")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
    <table className="styled-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Sat</th>
            <th>Result</th>
            
        </tr>
    </thead>
    <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
              <td>{item.pincode}</td>
              <td>{item.satScore}</td>
              <td>{item.passed ? "Pass" : "Fail"}</td>
            </tr>
          ))}
</tbody>
</table>
</div>
  );
};

export default View;
