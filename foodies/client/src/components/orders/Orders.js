import React, { Component } from "react";
import axios from "axios";

import { connect } from "react-redux";
import { Loader } from "../Loader";
import { OrderCard } from "./OrderCard";
import { cloneDeep } from "lodash";

class Orders extends Component {
  state = { userInfo: {}, orders: [], order_found: false, loading: false };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const respo = await axios("/api/users");
      this.setState({ userInfo: respo.data, loading: false });
      const response = await axios("/api/orders");
      this.setState({ orders: response.data, loading: false });
      console.log("or-",response)
      console.log("Use-",respo)
       if(this.state.userInfo.role === "manager") {
         for(var i = 0; i<response.data.length; i++ ) {
           if(response.data[i]._restaurant.created_by === respo.data._id){//rest._restaurant.created_by === this.state.userInfo._id
             this.setState({ order_found: true, loading: false });
             //console.log("in for loop - ",this.state.userInfo.role)
             break;
           }
         }
       } else if(this.state.userInfo.role === "user") { //rest._user._id === this.state.userInfo._id
            //this.setState({ order_found: true, loading: false });
            for(var i = 0; i<response.data.length; i++ ) {
              if(response.data[i]._user._id === respo.data._id){
                this.setState({ order_found: true, loading: false });
                //console.log("in for loop - ",this.state.userInfo.role)
                break;
              }
            }
       }

    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  onOrderStatusChange = async (orderId, status, index) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status });
      const orders = cloneDeep(this.state.orders);
      orders[index].status = status;
      this.setState({ orders });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { loading, orders,order_found } = this.state;
    const msg = false;
    console.log("A ords-",this.state.orders);
    if (orders.length === 0 || order_found === false && !loading)
      return <div className="center dmsg">No Orders Found.</div>;

    console.log("UI-",this.state.userInfo);

    if (this.state.userInfo.role === "manager") {              
    return (
      <div className="container" style={{ width: "100%" }}>
        <div className="row">
          <div className="landing-copy col s12 center-align">
            {loading ? (
              <Loader />
            ) : (
              <div className="row">
                {orders.map((rest, index) => ( 
                  rest._restaurant.created_by === this.state.userInfo._id ?
                  <OrderCard
                    key={rest._id, console.log(rest._id)}                    
                    order={rest}
                    onStatusChange={status =>
                      this.onOrderStatusChange(rest._id, status, index)
                    }
                  /> : " "
                )) }
              </div>
            )}
          </div>
          
        </div>  
      </div>
    ); 
  } else if(this.state.userInfo.role === "user") {              
       return (
         <div className="container" style={{ width: "100%" }}>
           <div className="row">
             <div className="landing-copy col s12 center-align">
               {loading ? (
                 <Loader />
               ) : (
                 <div className="row">
                   {orders.map((rest, index) => (    
                     rest._user._id === this.state.userInfo._id ?
                     <OrderCard
                       key={rest._id, console.log(rest._id)}                    
                       order={rest}
                       onStatusChange={status =>
                         this.onOrderStatusChange(rest._id, status, index)
                       }
                     /> : ""
                   )) }
                 </div>
               )}
             </div>
           </div>
         </div>
       );
       } else {
    return (
      <div>Blank</div>
    )
  }
    // } else if(this.state.userInfo.role === "user") {              
    //   return (
    //     <div className="container" style={{ width: "100%" }}>
    //       <div className="row">
    //         <div className="landing-copy col s12 center-align">
    //           {loading ? (
    //             <Loader />
    //           ) : (
    //             <div className="row">
    //               {orders.map((rest, index) => (    
    //                 //rest._restaurant.created_by === this.state.userInfo._id ?
    //                 <OrderCard
    //                   key={rest._id, console.log(rest._id)}                    
    //                   order={rest}
    //                   onStatusChange={status =>
    //                     this.onOrderStatusChange(rest._id, status, index)
    //                   }
    //                 /> //: " "
    //               )) }
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   );
    //   }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Orders);
//export default Orders;