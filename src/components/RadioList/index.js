import React from "react";

function RadioList({ name, list, value, updateValue }) {
  return list.map((el, i) => {
    return (
      <p key={i}>
        <label>
          <input
            type="radio"
            className="with-gap"
            name={name}
            value={el.prop}
            checked={value === el.prop}
            onChange={updateValue}
          />
          <span className="white-text">{el.text}</span>
        </label>
      </p>
    );
  });
}

export default RadioList;
