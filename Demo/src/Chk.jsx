import { useState } from "react";

function Chk() {
  // 0 = unchecked, 1 = checked
  const [checkValue, setCheckValue] = useState(0);

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setCheckValue(1);
    } else {
      setCheckValue(0);
    }
  };

  const handleSubmit = () => {
    alert("Checkbox Value: " + checkValue);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Checkbox Example (1 or 0)</h3>

      <label>
        <input
          type="checkbox"
          onChange={handleCheckbox}
        />
        Accept Terms
      </label>

      <p>Checkbox Value: <b>{checkValue}</b></p>

      <button onClick={handleSubmit}>
        Get Value
      </button>
    </div>
  );
}

export default Chk;