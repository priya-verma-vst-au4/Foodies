import * as PropTypes from "prop-types";
import React from "react";
//import { createIndexes } from "../../../../routes/api/user/user.model";

export function OrderCard(props) {
  const { description, _restaurant, status, total_amount, _meals, mcount } = props.order;
  let ods =[];
  let n, p, c, mer;
  for(let i=0; i<mcount.length;i++){
    n= _meals[i].name;
    p= _meals[i].price;
    c= mcount[i];
    mer= n.concat(" (Rs.", p, ") :-  ", c);
    ods.push(mer);
  }
  return (
    <div className="col s4 m4">
      <div className="card cbtn">
        <div className="card-content white-text">
          <span className="card-title">{_restaurant.name}</span>
          <p>{description}</p>
        </div>
        <div className="card-panel ">
          {/* {[
            "placed",
            "cancelled",
            "processing",
            "in_route",
            "delivered",
            "received"
          ].map(stat => (
            <div
              style={{
                cursor: "pointer",
                color: status === stat ? "green" : "unset",
                fontWeight: status === stat ? 800 : "unset"
              }}
              className="chip"
              onClick={() => props.onStatusChange(stat)}
            >
              {stat}
            </div>
          ))} */}
          {
          ods.map((od) => (    
                  <p>  {od} </p>
           )) } 
           
          </div> 
          
          <div style={{ color: "#FFF", fontWeight: 700, marginBottom: "15px" }}>Total amt: {total_amount}</div>
        </div>
      </div>
  );
}
OrderCard.propTypes = { order: PropTypes.any };
