import React, { Component } from "react";
import ViewFrame from "./viewframe";
export default class VED extends Component{
  constructor(props){
    super(props)
    this.state = {
      isview : 0,
      isedit : 1,
      isdeleted : 0
    }
    this.clickView = this.clickView.bind(this);
  }
  clickView(){
    this.setState({isview : 1})
  }
  isviewframe(){
    return(<div><ViewFrame/></div>)
  }
  view(){
    return (alert('Goal!'))
  }
  edit(){
    return(alert('Goal!'))
  }
  deleted(){
    return(alert('Delete This Order!'))
  }

  render(){
    const {checkisview, params2} = this.props
    return (
      <div>
        <div>
          <button onClick={this.clickView}>View</button>
          <button onClick={this.state.isedit === 1 ? this.edit : null}>Edit</button>
          <button onClick={this.state.isdeleted === 0 ? this.deleted : null}>Delete</button>
        </div>
      </div>
  );
  }
}