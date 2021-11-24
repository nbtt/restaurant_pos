import React, { Component} from "react";
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
            foodData: null,
            foodSelected: false
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
        this.disableAddNew = this.disableAddNew.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.disableFoodSelected = this.disableFoodSelected.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    // Set customized list template
    listTemplate(food) {
        return (
            <div className="e-list-wrapper e-list-multi-line e-list-avatar" style={{display: 'flex', alignItems: 'center'}}>
                <div style={{width: '95vw'}}>
                    <img className="e-avatar e-avatar-circle" src={food.image} alt=""/>
                    <span className="e-list-item-header">{food.name}</span>
                    <span className="e-list-content">{food.price}</span>
                </div>
                <div>
                    <span>
                        <BsFillTrashFill onClick={() => this.deleteItem(food)}/>
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
                <span className="count"> {food.items.length} Item(s)</span>
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

    // Select
    onSelect(args) {
        this.setState({
            foodData: args.data,
            foodSelected: true
        })
    }
    disableFoodSelected() {
        this.setState({
            foodSelected: false
        })
    }

    // Add function
    addItem(food) {
        // Add to Front-end
        let data = {
            categoryImage: food.categoryImage,
            image: food.image,
            sku: food.sku,
            category: food.category,
            name: food.name,
            price: parseInt(food.price, 10),
            quantity: food.qty,
            protein: parseInt(food.protein, 10),
            additives: parseInt(food.additives, 10),
            bakingMaterial: parseInt(food.bakingMaterial, 10),
            foodDecoration: parseInt(food.foodDecoration, 10),
        };
        this.state.originalData.push(data)
        this.setState({
            originalData: this.state.originalData,
            listData: this.state.originalData
        })
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
    }

    // Delete function
    deleteItem(food) {
        console.log(food)
        console.log(this.state.originalData)
        // Remove from Front-end
        let index = this.state.originalData.find((e => food.id === e.id))
        this.state.originalData.splice(index, 1)
        this.setState({
            originalData: this.state.originalData,
            listData: this.state.originalData
        })
        // let data = {
        //     id: food.id,
        //     category: 'Cupcake'
        // }
        // // Remove from Back-end
        // fetch('/api/menu_management/data/delete', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // }).then(
        //     (u) => console.log(u)
        // );
    }

    updateItem(oldFood, newFood) {
        this.deleteItem(oldFood);
        this.addItem(newFood);
    }

    render() {
        return (
            <div>
                <div className='list-food-management'>
                    <label>
                        Sắp xếp theo:
                        <button className="sort-by-name" onClick={this.clickButtonName} style={{backgroundColor: this.state.isChose ? 'rgba(16, 3, 75, 0.89)' : 'white', color: this.state.isChose ? 'white' : 'black'}}>Tên</button>
                    </label>
                    <input type='text' className='input-search' placeholder="Lọc" onKeyUp={this.onKeyUp} title="Type in a name"/>
                    <button className='button-add' onClick={this.clickButtonAdd}>Thêm món mới</button>
                </div>
                <ListViewComponent 
                    id="sample-list"
                    cssClass='e-list-template'
                    dataSource={this.state.listData.slice(0, this.state.numElement)}
                    template={this.listTemplate.bind(this)}
                    groupTemplate={this.groupTemplate.bind(this)}
                    fields={this.fields} 
                    sortOrder={this.state.isSorted ? "Ascending" : null} 
                    select={this.onSelect}
                />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button className="button-load" onClick={this.clickButtonLoad}>
                        Load More
                    </button>
                </div>
                <div>
                    {this.foodSelected ? <FoodDescription food={this.foodData} disableFoodSelected={this.disableFoodSelected} updateItem={this.updateItem}/> : <div/>}  
                </div>
                <div>
                    {this.state.new ? <NewFood disableAddNew={this.disableAddNew} updateList={this.addItem}/> : <div/>}
                </div>
            </div>
        );
    }
}