import React from "react";

const Selector = (props) => {
  const optionsArray = [];
  props.options.map((option, index) => {
    optionsArray.push(
      <option key={index} value={option.value}>
        {option.label}
      </option>
    );
  });
  return (
    <div>
      <label>
        {props.label}
        <select
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        >
          {optionsArray}
        </select>
      </label>
    </div>
  );
};

export default Selector;
