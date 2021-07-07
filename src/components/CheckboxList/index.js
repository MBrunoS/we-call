import React, { useContext } from "react";
import { CreateRoomContext } from "../../context/CreateRoomContext";

function CheckboxList({ list, values, updateValues }) {
  return list.map((el, i) => {
    return (
      <p key={i}>
        <label>
          <input
            type="checkbox"
            className="filled-in"
            value={el.prop}
            checked={values[el.prop]}
            onChange={updateValues}
          />
          <span className="white-text">{el.text}</span>
        </label>
      </p>
    );
  });
}

export default CheckboxList;
