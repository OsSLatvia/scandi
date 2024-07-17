import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import DropDownMenu from "./components/productDropDownMenu"; // Adjust the path as necessary
import { skuValidator, nameValidator, priceValidator, attributeValidator } from "./validator/validator.js";
import Footer from "./components/Footer";
// import axios from "axios";
import $ from 'jquery';
import config from './config'; 

function AddProduct() {
  const [redirectToHome, setRedirectToHome] = useState(false); // State to handle redirection

  const [formValid, setFormValid] = useState(false);
  const [formInputData, setFormInputData] = useState({
    sku: '',
    name: '',
    price: '',
    productType: 'DVD', // Default product type
    size: '',
    weight: '',
    height: '',
    width: '',
    length: ''
  });

  const [validationError, setValidationError] = useState({
    sku: 'Please, submit required data',
    name: 'Please, submit required data',
    price: 'Please, submit required data',
    size: 'Please, submit required data',
    weight: 'Please, submit required data',
    height: 'Please, submit required data',
    width: 'Please, submit required data',
    length: 'Please, submit required data',
    skuValid: false,
    nameValid: false,
    priceValid: false,
    sizeValid: false,
    weightValid: false,
    heightValid: false,
    widthValid: false,
    lengthValid: false
  });
  const validators = {
    sku: skuValidator,
    name: nameValidator,
    price: priceValidator,
    weight: attributeValidator,
    height: attributeValidator,
    width: attributeValidator,
    length: attributeValidator,
    size: attributeValidator
  }; // map field names to their respective validator functions
  const validateField = (fieldName, value) => {
    const validator = validators[fieldName];
    if (validator) {
      const errorValue = validator(value);
      const isValid = errorValue.length === 0;
      setValidationError(prev => ({
        ...prev,
        [fieldName]: errorValue,
        [fieldName + "Valid"]: isValid
      }));
    }
  };


  const ValidateForm = () => {   
      return (
        validationError.skuValid &&
        validationError.nameValid &&
        validationError.priceValid &&
        (validationError.sizeValid ||
          validationError.weightValid ||
          (validationError.heightValid &&
            validationError.widthValid &&
            validationError.lengthValid))
      );};

  const handleInputChange = (evnt) => {
    const inputFieldValue = evnt.target.value;
    const inputFieldName = evnt.target.name;
    setFormInputData(prev => ({ ...prev, [inputFieldName]: inputFieldValue }));
    validateField(inputFieldName, inputFieldValue);
  };

  const resetValidation = () => {
    setValidationError(prev => ({
      ...prev,
      size: '',
      weight: '',
      height: '',
      width: '',
      length: '',
      sizeValid: false,
      weightValid: false,
      heightValid: false,
      widthValid: false,
      lengthValid: false
    }));
  };

  useEffect(() => {
    setFormValid(ValidateForm());
  }, [validationError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInputData);
    if (formValid) {
      // Form is valid, send the data to the server
      const serverLocation = config.serverLocation;
      // const url = serverLocation + "/API/addProduct.php";
      // const APILocation = config.APILocation;
      const APIAddUrl = config.APIAddLocation;
      const url = serverLocation + APIAddUrl;
      
      $.ajax({
        type: 'POST',
        url: url,
        data: formInputData,
        success: function(response) {
          // console.log("result:", response);
          // const jsonResponse = JSON.parse(response); 
          if (response.includes("added successfully")) {
            console.log(response);
            setRedirectToHome(true);
            //redirect
            // Handle the SKU uniqueness error (e.g., display an error message to the user)
          } else {
            if (response === "SKU must be unique") {
              setValidationError(prev => ({
                ...prev,
                sku: "SKU must be unique"
              }));
            } else {
              console.log(response);
              // Handle other success cases if needed
            }
          }
          // Optionally, handle successful form submission (e.g., redirect to another page)
        },
        error: function(error) {
          console.error("There was an error adding the product:", error);
          // Optionally, handle the error (e.g., display an error message to the user)
        }
      });
    } else {
      console.log("Form is invalid");
    }
  };

  return (
    <React.Fragment>
      {redirectToHome && <Redirect to="/" />}
      <header className="App-header">
        <span className="Header-text">Add Product</span>
        <div className="Header-buttons">
          <button type="submit" form="product_form" value="Save">Save</button>
          <Link to="/"><button>Cancel</button></Link>
        </div>
      </header>
      <hr />
      <div>
        <form
          id="product_form"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="form-label" htmlFor="sku">SKU</label>
            <input onChange={handleInputChange} type="text" id="sku" name="sku" value={formInputData.sku} />
            <p className="validation-error">{validationError.sku}</p>
          </div>
          <div>
            <label className="form-label" htmlFor="name">Name:</label>
            <input onChange={handleInputChange} type="text" id="name" name="name" value={formInputData.name} />
            <p className="validation-error">{validationError.name}</p>
          </div>
          <div>
            <label className="form-label" htmlFor="price">Price ($)</label>
            <input onChange={handleInputChange} type="text" id="price" name="price" value={formInputData.price} />
            <p className="validation-error">{validationError.price}</p>
          </div>
          <DropDownMenu 
            formInputData={formInputData} 
            handleInputChange={handleInputChange} 
            validationError={validationError} 
            resetValidation={resetValidation} 
            validateField={validateField}/>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default AddProduct;
