function DVD({handleInputChange, size, sizeError}) {
    return (
        <div id="DVD">
            <label className="form-label" htmlFor="size">Size (MB)</label>
            <input  type="text" id="size" onChange={(event) => handleInputChange(event)} name="size" value={size}/>
            <p className="validation-error">{sizeError}</p>
        </div>
    );
  }
  
  export default DVD;