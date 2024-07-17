function Furniture({handleInputChange, height, length, width, heightError, lengthError, widthError}) {
    return (
        <div id="furniture">
            <div>
            <label className="form-label" htmlFor="height">Height (CM)</label>
            <input type="text" id="height" onChange={(event) => handleInputChange(event)} name="height" value={height}/>
            <p className="validation-error">{heightError}</p>
            </div>
            <div>
            <label className="form-label" htmlFor="width">Width (CM)</label>
            <input type="text" id="width" onChange={(event) => handleInputChange(event)} name="width" value={width}/>
            <p className="validation-error">{widthError}</p>
            </div>
            <div>
            <label className="form-label" htmlFor="length">Length (CM)</label>
            <input type="text" id="length" onChange={(event) => handleInputChange(event)} name="length" value={length}/>
            <p className="validation-error">{lengthError}</p>
            </div>
        </div>
    );
  }
  
  export default Furniture;