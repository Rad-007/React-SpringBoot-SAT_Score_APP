import React ,{ useState } from "react";
import axios from "axios"; // Import Axios
import "./insert.css"
const Insert = () => {

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        pincode: "",
        sat: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "satScore" ? parseFloat(value) : value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        

        console.log("Form Data with Parsed SAT Score:", formData);
        alert("Data Inserted Successfully");
        window.location.reload();
        // Send a POST request to your Spring Boot backend
        axios.post("http://localhost:8080/api/sat-results/", formData)
          .then((response) => {
            console.log("Data inserted successfully:", response.data);
            // You can reset the form or show a success message here
          })
          .catch((error) => {
            console.error("Error inserting data:", error);
          });
      };





      return (
        <div className="container">
          <div className="center">
            <h1>Insert</h1>
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
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <span></span>
                <label>Address</label>
              </div>
              <div className="txt_field">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <span></span>
                <label>City</label>
              </div>
              <div className="txt_field">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  maxLength="6"
                />
                <span></span>
                <label>Pincode</label>
              </div>
    
              <div className="txt_field">
                <input
                  type="number"
                  name="satScore"
                  value={formData.satScore}
                  onChange={handleChange}
                  required
                  max="1600"
                />
                <span></span>
                <label>SAT Score</label>
              </div>
              <input name="submit" type="submit" value="Insert" />
            </form>
          </div>
        </div>
      );
    };

export default Insert;
