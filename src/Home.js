import $ from "jquery";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Size from "./components/Size";
import Weight from "./components/Weight";
import Dimensions from "./components/Dimensions";

import NoProductsFound from "./components/NoProductsFound";
import LoadingProduct from "./components/LoadingProduct";
import config from './config';

function Home() {
  const [checkBoxState, setCheckBox] = useState(false);
  const [prductsData, setPrductsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleChangeChk = (e) => {
    setCheckBox(e.value);
  };

  const getData = () => {
    const serverLocation = config.serverLocation;
    const APIGetUrl = config.APIGetLocation;
    const url = serverLocation + APIGetUrl;
    console.log("Attempting to fetch:", url);
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text(); // Change from res.json() to res.text() to log the raw response
      })
      .then(text => {
        console.log('Response text:', text); // Log the raw response
        const converted = JSON.parse(text); // Parse the JSON manually
        setPrductsData(converted);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    const serverLocation = config.serverLocation;
    const APIDeleteurl = config.APIDeleteLocation;
    const url = serverLocation + APIDeleteurl;
    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(),
      success: function () {
        getData(); // Fetch new data after delete
      },
    });
  };
  const productComponents = (record) =>{
    const productMap = {
    DVD: <Size record={record} />,
    Furniture: <Dimensions record={record}/>,
    Book: <Weight record={record}/>
  }
  return productMap[record.type];
};
  return (
    <React.Fragment>
      <header className="App-header">
        <span className="Header-text">Product List</span>
        <div className="Header-buttons">
          <Link to="/add-product"><button>ADD</button></Link>
          <button type="submit" id="delete-product-btn" form="products">MASS DELETE</button>
        </div>
      </header>
      <hr />
      <form id="products" onSubmit={(event) => handleSubmit(event)}>
        {loading ? (
          <LoadingProduct/>
        ) : prductsData.length ? (
          prductsData.map(record => (
            <div key={"Fragment-" + record.SKU} className="productContainer">
              <input
                key={record.sku}
                name="deleteCheckbox[]"
                type="checkbox"
                className="delete-checkbox"
                value={record.SKU}
                defaultChecked={checkBoxState}
                onChange={(event) => handleChangeChk(event)}
              ></input>
              <p key={"SKU-" + record.SKU}>{record.SKU}</p>
              <p key={"name-" + record.SKU}>{record.name}</p>
              <p key={"price-" + record.SKU}>{record.price} $</p>
              {productComponents(record)}

            </div>
          ))
        ) : (
          <NoProductsFound/>
        )}
      </form>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
