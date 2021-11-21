import React, { Component } from "react";
import '../style/board.css'
import '../style/editframe.css'

export default class EditFrame extends Component {
   constructor(props) {
      super(props)
      this.state = {
         dataListfoods: [
            {No: 1, Name: 'Gà quay', 
            Quantity: 1, UnitPrice: 5, Amount: '', isDelete: ''},
            {No: 2, Name: 'Nước Cocacola', 
            Quantity: 2, UnitPrice: 10, Amount: '', isDelete: ''},
            {No: 3, Name: 'Xoài', 
            Quantity: 1, UnitPrice: 20, Amount: '', isDelete: ''}
         ],
         total: 0,
         status: 1,
         value: 'Chưa Thanh Toán'
      }
      this.addFood = this.addFood.bind(this)
      this.deleteFood = this.deleteFood.bind(this)
      this.editQuantity = this.editQuantity.bind(this)
      this.updateTotal = this.updateTotal.bind(this)
      this.handleChange = this.handleChange.bind(this);
   }

   clickConfirm(){
      if(this.state.value === "Chưa Thanh Toán")   this.setState({status: 1})
      else if(this.state.value === "Đã Thanh Toán")   this.setState({status: 2})
      else this.setState({status: 3})
      this.setState({
         dataListfoods: this.state.dataListfoods
      })
      this.updateTotal()

   }
   handleChange(event) {
      this.setState({value: event.target.value});
   }

   addFood(food, qty) {
      var exist = this.state.dataListfoods.find((e => food === e.Name))
      if (exist) {
         exist.Quantity += 1
         this.setState({
            dataListfoods: this.state.dataListfoods
         })
      } else {
         var dataListfoods = {
            food: food,
            qty: qty
         }
         this.state.dataListfoods.push(dataListfoods)
         this.setState({
            dataListfoods: this.state.dataListfoods
         })
      }
      this.updateTotal()
      }
   editQuantity(food, qty) {
      var dataListfoods = this.state.dataListfoods.find((e => food === e.Name))
      // if(this.dataListfoods === undefined) {return}
      if (dataListfoods.Quantity + qty === 0) {
         this.deleteFood(food)
      } else {
         dataListfoods.Quantity += qty
         this.setState({
            dataListfoods: this.state.dataListfoods
         })
      }
      this.updateTotal()
   }
   
   deleteFood(food) {
      alert('Delete This Food!')
      var index = this.state.dataListfoods.findIndex((e => food === e.Name))
      this.state.dataListfoods.splice(index, 1)
      this.setState({
         dataListfoods: this.state.dataListfoods
      })
      this.updateTotal()
   }

   updateTotal() {
      var total = 0
      this.state.dataListfoods.forEach(dataListfoods => {
          total += dataListfoods.UnitPrice * dataListfoods.Quantity
      });
      this.setState({
         total: total
      })
   }

   renderTableHeader() {
      let header = Object.keys(this.state.dataListfoods[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      return this.state.dataListfoods.map((listfood, index) => {
         const { No, Name, Quantity, UnitPrice, isDelete } = listfood //destructuring
         //var x = this.updateTotal()
         return (
            <tr>
               <td>{No}</td>
               <td>{Name}</td>
               <td>
                  <div class="quantity">
                     <button type="button" onClick={() => this.editQuantity(Name, -1)}>-</button>
                     <span class="qty">{Quantity}</span>
                     <button type="button" onClick={() => this.editQuantity(Name, 1)}>+</button>
                  </div>
               </td>
               <td>{UnitPrice}$</td>
               <td>{Quantity * UnitPrice}$</td>
               <td>{isDelete}<button class="delete-btn" type="button" onClick={() => this.deleteFood(Name)}>X</button></td>
            </tr>
         )
      })
   }

   render() {
      const {setedit} = this.props
      return (
      <div>
         <div>
            <form>
               <fieldset>
                  <legend>Đơn Hàng - EDIT</legend>
                  <div className="close-icon" onClick={() => setedit(0)}>X</div>
                  <h1>ĐƠN HÀNG</h1>
                  <h2>ID: DH01</h2><br/>
                  <div>
                     <button type="button" class="btn-addfood">Thêm Món</button>
                  </div>
                  <div>
                     <table id='students'>
                        <thead>{this.renderTableHeader()}</thead>
                        <tbody>{this.renderTableData()}
                           <tr class="tongtien">
                              <td colspan="4">TOTAL</td>
                              <td>{this.state.total}$</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  {/* <div class = "search">
                     <p class="add">
                           Thêm món:   
                     </p>
                     <select>
                           <option>Cơm</option>
                           <option>Nước Giải Khát</option>
                           <option>Trái Cây</option>
                     </select>
                  </div> */}
                  <br/>
                  <div>
                     <form class="choosestatus">
                        <label class="trangthai">
                           Trạng Thái:
                        </label>
                        <select class="choosestate" value={this.state.value} onChange={this.handleChange}>
                           <option value="Chưa Thanh Toán">Chưa Thanh Toán</option>
                           <option value="Đã Thanh Toán">Đã Thanh Toán</option>
                           <option value="Đã Giao">Đã Giao</option>
                        </select>
                     </form>
                  </div>
                  <br/>
                  <div class="OK">
                        <button type="button" onClick={() => {
                           this.clickConfirm()
                           setedit(0)
                        }}>XÁC NHẬN</button>
                  </div>
                  </fieldset>
               </form>
            </div>
         </div>
      )
   }
}
