import './App.scss';
import Home from "./Home";
import {Switch, Route, BrowserRouter } from "react-router-dom";
import AddProduct from "./add-product"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route path="/home"><Home /></Route>
        <Route path="/add-product"><AddProduct /></Route>
        <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
