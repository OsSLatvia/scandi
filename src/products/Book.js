
function Book({handleInputChange, weight, weightError}) {
    return (
        <div id="book">
            <label className="form-label" htmlFor="weight">Weight (KG)</label>
            <input type="text" id="weight" onChange={(event) => handleInputChange(event)} name="weight" value={weight}/>
            <p className="validation-error">{weightError}</p>
        </div>
    );
  }
  
  export default Book;