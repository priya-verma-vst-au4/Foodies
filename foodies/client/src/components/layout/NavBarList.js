import { Link } from "react-router-dom";
import * as PropTypes from "prop-types";
import React from "react";

export function NavBarList(props) {
  console.log(props.user)
  return (
    <>
      { props.user.role === "manager" ?
      <li>
        <Link to="/restaurants/create"> Create Restaurants And Meals  </Link>
      </li>
      : <li></li>  }
      <li>
        <Link to="/restaurants">All Restaurants</Link>
      </li>
      { props.user.role === "manager" ?
      <li>        
        <Link to="/orders">Orders for Me</Link>
      </li> :
       <li>        
      <Link to="/orders">Your Orders</Link>
      </li> }
      <li>
        <b>Hi,</b> {(props.user.name ) }
        {/*(props.user.name || "").split(" ")[0]*/}
      </li>
      <li>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={props.onClick}>Logout</a>
      </li>
    </>
  );
}

NavBarList.propTypes = {
  user: PropTypes.any,
  onClick: PropTypes.func
};
