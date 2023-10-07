package dev.sat_score.SAT.model;

public class SATResult {
    private String name;
    private String address;
    private String city;
    private String country;
    private String pincode;
    private float satScore;
    private boolean passed;

    // Constructors, getters, and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public void setSatScore(float satScore) { // Add setSatScore method
        this.satScore = satScore;
    }

    public float getSatScore() {
        return satScore;
    }

    

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public boolean isPassed() {
        return passed;
    }
    
    
}
