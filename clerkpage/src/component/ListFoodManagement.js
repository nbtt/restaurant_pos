import React, { Component } from "react";
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { DataManager, Query } from "@syncfusion/ej2-data";
import { BsFillTrashFill } from "react-icons/bs";
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-lists/styles/material.css";
import "../style/ListFoodManagement.css"
import FoodDescription from "./FoodDescription";
import NewFood from "./NewFood";

export default class ListFoodManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalData: [],
            listData: [], 
            isSorted: false,
            isChose: false,
            new: false,
            numElement: 7,
            foodData: null,
            foodSelected: false
        };
        this.fields = { 
            text: 'name', 
            groupBy: 'category'
        };
        
        fetch('/api/menu_management/data/all').then(
            (u) => u.json()
        ).then(
            (data) => this.setState({originalData: data, listData: data})
        );
        
        this.listTemplate = this.listTemplate.bind(this);
        this.groupTemplate = this.groupTemplate.bind(this);
        this.clickButtonName = this.clickButtonName.bind(this);
        this.clickButtonLoad = this.clickButtonLoad.bind(this);
        this.clickButtonAdd = this.clickButtonAdd.bind(this);
        this.disableAddNew = this.disableAddNew.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.disableFoodSelected = this.disableFoodSelected.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    // Set Data
    setData() {
        fetch('/api/menu_management/data/all').then(
            (u) => u.json()
        ).then(
            (data) => this.setState({originalData: data, listData: data})
        );
    }

    // Set customized list template
    listTemplate(food) {
        return (
            <div className="e-list-wrapper e-list-multi-line e-list-avatar" style={{display: 'flex', alignItems: 'center'}} onClick={() => this.onSelect(food)}>
                <div style={{width: '95vw'}}>
                    <img className="e-avatar e-avatar-circle" src={food.image}/>
                    <span className="e-list-item-header">{food.name}</span>
                    <span className="e-list-content">{food.price} VNĐ</span>
                </div>
                <div>
                    <span>
                        <BsFillTrashFill onClick={(event) => this.confirmFunction(food, event)}/>
                    </span>
                </div>
            </div>
        );
    }

    // Set customized group-header template
    groupTemplate(food) {
        return (
            <div className="group-name">
                <span className="category">{food.items[0].category}</span>
                <span className="categoryid"> (ID: {food.items[0].idcategory})</span>
                <span className="count"> {food.items.length} Item(s)</span>
            </div>
        );
    }

    // Handle click
    clickButtonName() {
        this.setState(prevState => ({
            isSorted: !prevState.isSorted,
            isChose: !prevState.isChose
        }));
    }
    clickButtonLoad() {
        this.setState(prevState => ({
            numElement: prevState.numElement + 10
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

    // Select
    onSelect(food) {
        this.setState({
            foodData: food,
            foodSelected: true
        })
    }
    disableFoodSelected() {
        this.setState({
            foodSelected: false
        })
    }

    // Confirm function
    confirmFunction(food, event) {
        if (window.confirm("This dish will be deleted! Are you sure?")) {
            this.deleteItem(food)
        }
        event.stopPropagation()
    }

    // Add function
    async addItem(food) {
        let data = {
            idcategory: food.idcategory,
            categoryImage: food.categoryImage,
            category: food.category,
            image: food.image,
            name: food.name,
            price: parseInt(food.price, 10),
            Description: {
                "Protein": parseInt(food.protein, 10),
                "Additives": parseInt(food.additives, 10),
                "Baking materials": parseInt(food.bakingMaterial, 10),
                "Food decoration": parseInt(food.foodDecoration, 10),
            }
        };
        // Add to Back-end
        await fetch('/api/menu_management/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            (u) => u.text()
        ).then(
            (msg) => console.log(msg)
        );
        // Set originalData and listData after adding
        this.setData()
    }

    // Delete function
    async deleteItem(food) {
        let data = {
            idcategory: food.idcategory,
            id: food.id
        }
        // Remove from Back-end
        await fetch('/api/menu_management/data/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            (u) => u.text()
        ).then(
            (msg) => console.log(msg)
        );
        // Set originalData and listData after deleting
        this.setData()
    }

    // Update function
    async updateItem(oldFood, newFood) {
        await this.deleteItem(oldFood);
        await this.addItem(newFood);
    }

    render() {
        return (
            <div>
                <div className="list-food-management">
                    <label>
                        Sắp xếp theo:
                        <button className="sort-by-name" onClick={this.clickButtonName} style={{backgroundColor: this.state.isChose ? 'rgba(16, 3, 75, 0.89)' : 'white', color: this.state.isChose ? 'white' : 'black'}}>Tên</button>
                    </label>
                    <input type="text" className="input-search" placeholder="Lọc" title="Type in a name" onKeyUp={this.onKeyUp} />
                    <button className="button-add" onClick={this.clickButtonAdd}>Thêm món mới</button>
                </div>
                <ListViewComponent 
                    id="sample-list"
                    cssClass="e-list-template"
                    fields={this.fields}
                    dataSource={this.state.listData.slice(0, this.state.numElement)}
                    template={this.listTemplate}
                    groupTemplate={this.groupTemplate}
                    select={this.onSelect}
                    sortOrder={this.state.isSorted ? "Ascending" : null}
                />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button className="button-load" onClick={this.clickButtonLoad}>
                        Load More
                    </button>
                </div>
                <div>
                    {this.state.foodSelected ? <FoodDescription food={this.state.foodData} disableFoodSelected={this.disableFoodSelected} updateItem={this.updateItem}/> : <div/>}  
                </div>
                <div>
                    {this.state.new ? <NewFood disableAddNew={this.disableAddNew} updateList={this.addItem}/> : <div/>}
                </div>
            </div>
        );
    }
}