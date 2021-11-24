import React, { Component } from "react";
import '../style/sortstate.css'

export default class SortState extends Component {
    constructor(props) {
        super(props);
        this.setisstate = this.props.setisstate
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setisstate(parseInt(event.target.value));
    }

    render() {
        return (
        <form class="sortstate">
            <label class="st">
                Trạng Thái:
            </label>
            <select class="choose" onChange={this.handleChange}>
                <option value="3">Tất Cả</option>
                <option value="0">Chưa Thanh Toán</option>
                <option value="1">Đã Thanh Toán</option>
                <option value="2">Đã Giao</option>
            </select>
        </form>
        );
    }
}
