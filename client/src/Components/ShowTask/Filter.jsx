import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";

const Filter = (props) => {
  const [state, setState] = useState({
    loading: false,
    search: props.search,
    filter: props.value
  });
  var handleOnFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setState({[fieldName]:fieldValue})
    props.onChange(fieldName, fieldValue);
  };
  return (
    <div className='ft'>
      <Input
        loading={state.loading}
        name="search"
        placeholder="Filter Search..."
        onChange={handleOnFieldChange}
      />
      <select
        className="form-select"
        name="filter"
        onChange={handleOnFieldChange}
        style={{ width: "100px", display: 'inline', margin: '10px 10px 10px 10px' }}
        placeholder="Filter By"
      >
        <option value="title">Title</option>
        <option value="suburb">Suburb</option>
        <option value="date">Date</option>
      </select>
      <Button onClick={props.onClick}>Show Tasks</Button>
    </div>
  );
};

export default Filter;
