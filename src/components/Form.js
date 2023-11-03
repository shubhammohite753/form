
import React, { useState } from "react";
import '../App.css'

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "Select Country", 
    customDropdown: "",
    address: "",
    agreement: false,
    file: null,
    phoneNumber: ""
  });

  const [errors, setErrors] = useState({});
  const [formConfig] = useState(formData);
  const [countryOptions, setCountryOptions] = useState([
    "India",
    "USA",
    "Canada",
    "UK",
    "Australia"
  ]);

  const [showConfigPopup, setShowConfigPopup] = useState(false);
  const [loadedFormConfig, setLoadedFormConfig] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({
      ...formData,
      file: selectedFile
    });
  };

  const removeCountryOption = (selectedCountry) => {
    if (selectedCountry) {
      setCountryOptions(
        countryOptions.filter((option) => option !== selectedCountry)
      );
      setFormData({
        ...formData,
        country: ""
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement validation logic
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.country && !formData.customCountry) {
      newErrors.country = "Country is required";
    }
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.file) {
      newErrors.file = "File is required";
    }
    if (formData.file) {
      if (
        !["image/jpeg", "image/png", "image/gif"].includes(formData.file.type)
      ) {
        newErrors.file = "Invalid file type. Allowed: JPEG, PNG, GIF";
      }
      if (formData.file.size > 1024 * 1024) {
        newErrors.file = "File size exceeds 1MB limit";
      }
    }
    if (!formData.agreement) {
      newErrors.agreement = "You must agree to the terms";
    }

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with submission
      alert("Form submitted successfully!");
    } else {
      setErrors(newErrors);
    }
  };

  const loadFormConfig = () => {
    if (loadedFormConfig) {
      // If form data is already loaded, show the popup with the loaded data
      setShowConfigPopup(true);
    } else {
      // If no form data is loaded, load it and show the popup
      setLoadedFormConfig({ ...formData });
      setShowConfigPopup(true);
    }
  };

  const closeConfigPopup = () => {
    setShowConfigPopup(false);
  };

  const addCustomCountry = () => {
    const { customCountry } = formData;
    if (customCountry && !countryOptions.includes(customCountry)) {
      setCountryOptions([...countryOptions, customCountry]);
      setFormData({
        ...formData,
        country: customCountry,
        customCountry: ""
      });
    }
  };

  const formConfigAsJSON = JSON.stringify(
    loadedFormConfig || formConfig, // Use loadedFormConfig if available, else use current formConfig
    null,
    2
  );
  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="radio-button-container">
          <label>Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleInputChange}
              />
              Male
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="">Select Country</option>
            {countryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        <div>
          <div>
            <input
              type="text"
              name="customCountry"
              placeholder="Add a custom country"
              value={formData.customCountry}
              onChange={handleInputChange}
            />
            <button className="button" type="button" onClick={addCustomCountry}>
              Add
            </button>
          </div>
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </div>

        <div>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div>
          <label>File</label>
          <input
            type="file"
            name="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleFileChange}
          />
          {errors.file && <span className="error">{errors.file}</span>}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleInputChange}
            />
            I agree to the terms and conditions
          </label>
          {errors.agreement && (
            <span className="error">{errors.agreement}</span>
          )}
        </div>

        <button className="button" type="submit">
          Submit
        </button>

        <button
          className="button"
          type="button"
          onClick={() => removeCountryOption(formData.country)}
        >
          Remove
        </button>

        <div>
          <button className="button" type="button" onClick={loadFormConfig}>
            Load Form Config
          </button>
        </div>
      </form>

      {showConfigPopup && (
        <div className="config-popup">
          <div className="config-popup-content">
            <span className="close" onClick={closeConfigPopup}>
              &times;
            </span>
            <pre>{formConfigAsJSON}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
