import React, { Component } from "react";
import '../style/sortstate.css'

export default class SortState extends Component {
    constructor(props) {
        super(props);
        this.state = {value: "Tất Cả"};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        alert('State Now: ' + this.state.value);
        // event.preventDefault();
        // event.preventDefault();
        if(this.state.value === "Chưa Thanh Toán")  return 1
        else if(this.state.value === "Đã Thanh Toán")  return 2
        else if(this.state.value === "Đã Giao") return 3
        else return 4
    }

    render() {
        const {setisstate} = this.props
        return (
        <form class="sortstate">
            <label class="st">
                Trạng Thái:
            </label>
            <select class="choose" value={this.state.value} onChange={this.handleChange}>
                <option value="Tất Cả">Tất Cả</option>
                <option value="Chưa Thanh Toán">Chưa Thanh Toán</option>
                <option value="Đã Thanh Toán">Đã Thanh Toán</option>
                <option value="Đã Giao">Đã Giao</option>
            </select>
            <button class="statesort-btn" type="button" onClick={() => {
                if(this.state.value === "Chưa Thanh Toán")  setisstate(1)
                else if(this.state.value === "Đã Thanh Toán")  setisstate(2)
                else if(this.state.value === "Đã Giao")  setisstate(3)
                else setisstate(4)
            }}>Confirm
            </button>
        </form>
        
        );
    }
}
