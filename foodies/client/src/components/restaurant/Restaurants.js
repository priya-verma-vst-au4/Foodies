import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Loader } from "../Loader";
import { RestaurantCard } from "./RestaurantCard";

class Restaurants extends Component {
  state = {userInfo: {}, restaurants: [], loading: false, resto_found: false };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const response = await axios("/api/restaurants");
      this.setState({ restaurants: response.data, loading: false });
      const respo = await axios("/api/users");
    this.setState({ userInfo: respo.data, loading: false });
    //console.log("re-",response)
    //console.log("Use-",respo)
    if(this.state.userInfo.role === "manager") {
      for(var i = 0; i<response.data.length; i++ ) {
        if(response.data[i].created_by === respo.data._id){
          this.setState({ resto_found: true, loading: false });
          console.log("in for loop - ",this.state.userInfo.role)
          break;
        }
      }
    } else if(this.state.userInfo.role === "user") {
      this.setState({ resto_found: true, loading: false });
    }
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, restaurants, resto_found } = this.state;
    //console.log(restaurants)
    //console.log("UsrR-",this.state.userInfo.role)
    if (restaurants.length === 0 || resto_found === false && !loading)
      return <div className="center dmsg">No Restaurants Found.</div>;

    if(this.state.userInfo.role === "manager") {
      return ( 
        <div className="container" style={{ width: "100%" }}>
          <div className="row">
            <div className="landing-copy col s12 center-align">
              {loading ? (
                <Loader />
              ) : ( 
                <div className="row">
                   {restaurants.map(rest => ( 
                      rest.created_by === this.state.userInfo._id ?
                    <RestaurantCard key={rest._id} rest={rest} user_id={this.state.userInfo._id} user_role={this.state.userInfo.role} />
                     : ""
                  ))}
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
                   {restaurants.map(rest => ( 
                      
                    <RestaurantCard key={rest._id} rest={rest} user_id={this.state.userInfo._id} />
                     
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
   
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Restaurants);

//export default Restaurants;