export const skuValidator = sku => {
    if (!sku) {
      return "Please, submit required data";
    } else if (!new RegExp(/^[a-zA-Z0-9]+$/).test(sku)) {
      return "olny numbers and letters allowed (no spaces)";
    }
    return "";
  };
  
  export const nameValidator = name => {
    if (!name) {
      return "Please, submit required data";
    }  else if (!new RegExp(/^[a-z A-Z0-9]+$/).test(name)) {
        return "olny numbers and letters allowed";
      }
        else if (name.length > 32) {
        return "MAX lenght 32";
    }
    return "";
  };
  
  export const priceValidator = price => {
    if (!price) {
      return "Please, submit required data";
    }  else if (!new RegExp(/^[0-9]+[.]{0,1}[0-9]{0,2}$/).test(price)) {
        return "please provide valid price";
      }
    return "";
  };

  export const attributeValidator = attribute => {
    if (!attribute) {
      return "Please, submit required data";
    }  else if (!new RegExp(/^[0-9]*$/).test(attribute)) {
        return "Olny numbers allowed ";
      }
    return "";
  };
  