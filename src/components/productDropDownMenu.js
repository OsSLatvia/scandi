import React, { useState } from "react";
import DVD from "../products/DVD";
import Furniture from "../products/Furniture";
import Book from "../products/Book";

function DropDownMenu({ handleInputChange, formInputData, validationError, resetValidation, validateField }) {
  const [selectedOption, setSelectedOption] = useState("DVD");

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
    handleInputChange({ target: { name: 'productType', value: selectedOption } });
    resetValidation();

    // Object containing handlers for each product type
    const optionHandlers = {
      DVD: () => validateField("size", formInputData.size),
      Book: () => validateField("weight", formInputData.weight),
      Furniture: () => {
        validateField("height", formInputData.height);
        validateField("width", formInputData.width);
        validateField("length", formInputData.length);
      },
    };

    // Call the appropriate handler for the selected product type
    const handler = optionHandlers[selectedOption];
    if (handler) {
      handler();
    }
  };

  const productComponents = {
    DVD: <DVD handleInputChange={handleInputChange} size={formInputData.size} sizeError={validationError.size} />,
    Book: <Book handleInputChange={handleInputChange} weight={formInputData.weight} weightError={validationError.weight} />,
    Furniture: (
      <Furniture
        handleInputChange={handleInputChange}
        height={formInputData.height}
        length={formInputData.length}
        width={formInputData.width}
        widthError={validationError.width}
        lengthError={validationError.length}
        heightError={validationError.height}
      />
    ),
  };

  return (
    <React.Fragment>
      <select id="productType" onChange={(event) => handleDropdownChange(event)} value={selectedOption}>
        <option value="DVD">DVD</option>
        <option value="Furniture">Furniture</option>
        <option value="Book">Book</option>
      </select>
      {productComponents[selectedOption]}
    </React.Fragment>
  );
}

export default DropDownMenu;
