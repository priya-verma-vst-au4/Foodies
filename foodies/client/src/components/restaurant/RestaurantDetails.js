import * as PropTypes from "prop-types";
import React from "react";

export function RestaurantDetails(props) {
  return (
    <>
      <div className="input-field col s12">
        <input
          onChange={props.onChange}
          onFocus={props.onFocus}
          value={props.name}
          id="name"
          type="text"
          placeholder="Restaurant Name"
        />
        {/* <label htmlFor="name">Restaurant Name</label> */}
      </div>
      <div className="input-field col s12">
        <input
          onChange={props.onChange}          
          value={props.type}
          id="type"
          type="text"
          placeholder="Restaurant Type"
        />
        {/* <label htmlFor="type">Restaurant Type</label> */}
      </div>
      <div className="input-field col s12">
        <input
          onChange={props.onChange}
          value={props.description}
          id="description"
          type="text"
          placeholder="Restaurant Description"
        />
        {/* <label htmlFor="description">Restaurant Description</label> */}

      </div>
    </>
  );
}

RestaurantDetails.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.any,
  type: PropTypes.any,
  description: PropTypes.any,
  created_by: PropTypes.any,
};
