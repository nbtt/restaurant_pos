import React, { Component } from "react";
import '../style/board.css'
import '../style/editframe.css'
import Checkbox from './checkbox'

export default class EditFrame extends Component {
   constructor(props) {
      super(props)
      this.state = {
         dataListfoods: [
            {No: 1, Name: 'Gà quay', 
            Quantity: 
            <div>
               <button type="button" class="btn btn-outline-danger">-</button>
               1
               <button type="button" class="btn btn-outline-danger">+</button>
            </div>, UnitPrice: '5$', Amount: '5$', isDelete: <Checkbox/>},
            {No: 2, Name: 'Nước Cocacola', 
            Quantity: 
            <div>
               <button type="button" class="btn btn-outline-danger">-</button>
               1
               <button type="button" class="btn btn-outline-danger">+</button>
            </div>, UnitPrice: '1$', Amount: '20$', isDelete: <Checkbox/>},
            {No: 3, Name: 'Xoài', 
            Quantity: 
            <div>
               <button type="button" class="btn btn-outline-danger">-</button>
               1
               <button type="button" class="btn btn-outline-danger">+</button>
            </div>, UnitPrice: '1$', Amount: '20$', isDelete: <Checkbox/>}
            
         ]
      }
   }

   renderTableHeader() {
      let header = Object.keys(this.state.dataListfoods[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      return this.state.dataListfoods.map((listfood, index) => {
         const { No, Name, Quantity, UnitPrice, Amount, isDelete } = listfood //destructuring
         return (
            <tr>
               <td>{No}</td>
               <td>{Name}</td>
               <td>{Quantity}</td>
               <td>{UnitPrice}</td>
               <td>{Amount}</td>
               <td>{isDelete}</td>
            </tr>
         )
      })
   }

   render() {
      return (
      <div>
         <div>
            <form>
               <fieldset>
                  <legend>Đơn Hàng - EDIT</legend>
                  <h1>ĐƠN HÀNG</h1>
                  <h2>ID: DH01</h2><br/>
                  <div>
                     <button type="button" class="btn btn-primary">Thêm Món</button>
                     <button type="button" class="btn btn-danger">Xóa Món</button>
                  </div>
                  <div>
                     <table id='students'>
                        <thead>{this.renderTableHeader()}</thead>
                        <tbody>{this.renderTableData()}
                           <tr class="tongtien">
                              <td colspan="4">TOTAL</td>
                              <td>27$</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <br/>
                  <div class = "search">
                     <p class="add">
                           Thêm món:   
                     </p>
                     <select>
                           <option>Cơm</option>
                           <option>Nước Giải Khát</option>
                           <option>Trái Cây</option>
                     </select>
                  </div>
                  <div class = "status">
                        <p class="tt">
                        Trạng thái:   
                        </p>
                        <select>
                           <option>Chưa Thanh Toán</option>
                           <option>Đã Thanh Toán</option>
                           <option>Đã Giao</option>
                        </select>
                  </div>
                  <div class="OK">
                        <button type="button" class="btn btn-warning">XÁC NHẬN</button>
                  </div>
                  </fieldset>
               </form>
            </div>
         </div>
      )
   }
}
