import React, { Component, forwardRef } from "react";
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { DataManager, Query } from "@syncfusion/ej2-data";
import Select from 'react-select';
import { BsFillTrashFill } from "react-icons/bs";
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-lists/styles/material.css";
import "../style/ListFoodManagement.css"
import FoodDescription from "./FoodDescription";
import NewFood from "./NewFood";

export default class ListFoodManagement extends Component {
    constructor(props) {
        super(props);
        // Define an array of JSON data
        this.listViewInstance = null;
        this.fields = { text: 'name', groupBy: 'category', iconCss: 'icon' };
        this.state = {
            originalData: [],
            listData: [], 
            isSorted: false, 
            isChose: false,
            new: false,
            numElement: 7,
            typeID: 0,
            foodID: -2,
        };
        
        fetch('/api/menu_management/data/all').then(
            (u) => u.json()
        ).then(
            (data) => data.map(item => {item["icon"] = "delete-icon"; return item})
        ).then(
            (data) => this.setState({originalData: data, listData: data})
        );

        this.clickButtonName = this.clickButtonName.bind(this);
        this.clickButtonLoad = this.clickButtonLoad.bind(this);
        this.clickButtonAdd = this.clickButtonAdd.bind(this);
        this.setFoodID = this.setFoodID.bind(this);
        this.setData = this.setData.bind(this);
    }

    setData() {
        fetch('/api/menu_management/data/all').then(
            (u) => u.json()
        ).then(
            (data) => data.map(item => {item["icon"] = "delete-icon"; return item})
        ).then(
            (data) => this.setState({originalData: data, listData: data})
        );
    }

    // Set customized list template
    listTemplate(data) {
        return (
            <div className="e-list-wrapper e-list-multi-line e-list-avatar" style={{display: 'flex', alignItems: 'center'}}>
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
        this.setState({
            new: true
        })
    }
    disableAddNew() {
        this.setState({
            new: false
        });
    }

    // Filter
    onKeyUp(event) {
        let value = event.target.value;
        let data = new DataManager(this.state.listData).executeLocal(new Query().where("name", "startswith", value, true));
        if (!value) {
            this.setState({
                listData: this.state.originalData
            });
        }
        else {
            this.setState({
                listData: data
            });
        }
    }

    // Add function
    addItem(food) {
        // Add to Front-end
        let type = {
            categoryImage: food.categoryImage
        }
        let data = {
            image: food.image,
            name: food.name,
            price: parseInt(food.price, 10),
            category: food.category
        };
        this.listViewInstance.addItem([data]);
        // Add to Back-end
        fetch('/api/menu_management/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            (u) => console.log(u)
        );
        // Set Data
        this.setData()
    }

    // Delete function
    deleteItem(args) {
        // Remove from Front-end
        args.stopPropagation();
        let liItem = args.target.closest('li');
        let data = {
            id: args.target.getAttribute('id'),
            category: args.target.getAttribute('category')
        }
        this.listViewInstance.removeItem(liItem);
        // Remove from Back-end
        fetch('/api/menu_management/data/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            (u) => console.log(u)
        );
        // Set Data
        this.setData()
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
                <div className='list-food-management'>
                    <label>
                        Sắp xếp theo:
                        <button className="sort-by-name" onClick={this.clickButtonName} style={{backgroundColor: this.state.isChose ? 'rgba(16, 3, 75, 0.89)' : 'white', color: this.state.isChose ? 'white' : 'black'}}>Tên</button>
                    </label>
                    <Select options={options} className="price" placeholder="Giá" isSearchable/>
                    <input type='text' className='input-search' placeholder="Lọc" onKeyUp={this.onKeyUp.bind(this)} title="Type in a name"/>
                    <button className='button-add' onClick={this.clickButtonAdd}>Thêm món mới</button>
                </div>
                <ListViewComponent id="sample-list" dataSource={this.state.listData.slice(0, this.state.numElement)} fields={this.fields} template={this.listTemplate.bind(this)} sortOrder={this.state.isSorted ? "Ascending" : null} groupTemplate={this.groupTemplate.bind(this)} cssClass='e-list-template' ref={listView => {
                    this.listViewInstance = listView;
                }}/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button className="button-load" onClick={this.clickButtonLoad}>
                        Load More
                    </button>
                </div>
                <div>
                    {this.state.new ? <NewFood disableAddNew={this.disableAddNew.bind(this)} updateList={this.addItem.bind(this)}/> : <div/>}
                </div>
            </div>
        );
    }
}