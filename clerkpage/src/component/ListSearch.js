import React, { Component } from "react";
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { DataManager, Query } from "@syncfusion/ej2-data";
import Select from 'react-select';
import { BsFillTrashFill } from "react-icons/bs";
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-lists/styles/material.css";
import "../style/ListSearch.css"
import FoodDescription from "./FoodDescription.js";
import NewFood from "./NewFood";
import data from '../data/data'

export default class ListSearch extends Component {
    constructor(props) {
        super(props);
        // Define an array of JSON data
        this.listViewInstance = null;
        this.data = [
            { name: 'Coca', price: '10.000 VNĐ', id: '1', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Nước giải khát', icon: 'delete-icon' },
            { name: 'Pepsi', price: '10.000 VNĐ', id: '2', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Nước giải khát', icon: 'delete-icon' },
            { name: 'Nuoc loc', price: '5.000 VNĐ', id: '3', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Nước giải khát', icon: 'delete-icon' },
            { name: 'Bun bo ', price: '25.000 VNĐ', id: '4', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Món ăn', icon: 'delete-icon' },
            { name: 'Bun cha ca', price: '25.000 VNĐ', id: '5', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Món ăn', icon: 'delete-icon' },
            { name: 'Com tam', price: '25.000 VNĐ', id: '6', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Món ăn', icon: "delete-icon" },
            { name: 'Lau bo', price: '200.000 VNĐ', id: '7', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Lẩu', icon: 'delete-icon' },
            { name: 'Lau hai san', price: '150.000 VNĐ', id: '8', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Lẩu', icon: 'delete-icon' },
            { name: 'Kem', price: '20.000 VNĐ', id: '9', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Đồ ngọt', icon: 'delete-icon' },
            { name: 'Banh ngot', price: '30.000 VNĐ', id: '10', image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png', category: 'Đồ ngọt', icon: 'delete-icon' },
        ];
        this.fields = { text: 'name', groupBy: 'category', iconCss: 'icon' };
        this.state = { 
            listData: this.data, 
            isSorted: false, 
            isChose: false, 
            numElement: 7,
            typeID: 0,
            foodID: -2,
        };
        this.clickButtonName = this.clickButtonName.bind(this)
        this.clickButtonLoad = this.clickButtonLoad.bind(this)
        this.clickButtonAdd = this.clickButtonAdd.bind(this)
        this.setFoodID = this.setFoodID.bind(this)
    }

    // Set customized list template
    listTemplate(data) {
        return (
            <div className="e-list-wrapper e-list-multi-line e-list-avatar" style={{alignItems: 'center', display: 'flex'}}>
                <div style={{width: '95vw'}}>
                    <img className="e-avatar e-avatar-circle" src={data.image}/>
                    <span className="e-list-item-header">{data.name}</span>
                    <span className="e-list-content">{data.price}</span>
                </div>
                <div>
                    <BsFillTrashFill onClick={this.deleteItem.bind(this)}/>
                </div>
            </div>
        );
    }
    // Set customized group-header template
    groupTemplate(data) {
        return (
            <div className="group-name">
                <span className="category">{data.items[0].category}</span>
                <span className="count"> {data.items.length} Item(s)</span>
            </div>
        );
    }
    addItem() {
        // Add new data
        let data = {
            name: "Dish -- " + (Math.random() * 1000).toFixed(0),
            price: "20.000 VNĐ -- " + (Math.random() * 1000).toFixed(0),
            id: (Math.random() * 1000).toFixed(0).toString(),
            image: 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-bò.png',
            category: "New",
            icon: "delete-icon"
        };
        this.listViewInstance.addItem([data]);
    }
    deleteItem(args) {
        // Remove data
        args.stopPropagation();
        let liItem = args.target.closest('li');
        this.listViewInstance.removeItem(liItem);
    }
    onKeyUp(e) {
        let value = e.target.value;
        let data = new DataManager(this.state.listData).executeLocal(new Query().where("name", "startswith", value, true));
        if (!value) {
            this.setState({
                listData: this.data
            });
        }
        else {
            this.setState({
                listData: data
            });
        }
    }
    clickButtonName() {
        this.setState(prevState => ({
            isSorted: !prevState.isSorted,
            isChose: !prevState.isChose
        }));
    }
    clickButtonLoad() {
        this.setState(prevState => ({
            numElement: prevState.numElement + 5
        }));
    }
    clickButtonAdd() {
        this.setState({foodID: -1})
    }
    setFoodID(id) {
        this.setState({foodID: id})
    }
    render() {
        const options = [
            { value: 'lowToHigh', label: 'Thấp đến Cao' },
            { value: 'highToLow', label: 'Cao đến Thấp' }
        ]
        return (
            <div>
                <div className='search'>
                    <label>
                        Sắp xếp theo:
                        <button className="sort-by-name" onClick={this.clickButtonName} style={{backgroundColor: this.state.isChose ? 'rgba(16, 3, 75, 0.89)' : 'white', color: this.state.isChose ? 'white' : 'black'}}>Tên</button>
                    </label>
                    <Select options={options} className="price" placeholder="Giá" isSearchable/>
                    <input type='text' className='inputSearch' placeholder="Filter" onKeyUp={this.onKeyUp.bind(this)} title="Type in a name"/>
                    <button className='buttonAdd' onClick={this.clickButtonAdd}>Thêm món mới</button>
                </div>
                <ListViewComponent id="sample-list" dataSource={this.state.listData.slice(0, this.state.numElement)} fields={this.fields} template={this.listTemplate.bind(this)} sortOrder={this.state.isSorted ? "Ascending" : null} groupTemplate={this.groupTemplate.bind(this)} cssClass='e-list-template' ref={listView => {
                    this.listViewInstance = listView;
                }}/>
                <div style={{justifyContent: 'center', display: 'flex'}}>
                    <button className="loadButton" onClick={this.clickButtonLoad}>
                        Load More
                    </button>
                </div>
                <div>
                    {this.state.foodID === -1 ? <NewFood setFoodID={this.setFoodID} updateList={this.addItem.bind(this)}/> : <div/>}
                </div>
            </div>
        );
    }
}