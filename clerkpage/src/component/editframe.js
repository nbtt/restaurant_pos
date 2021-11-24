import React, { Component } from "react";
import '../style/editframe.css'

export default class EditFrame extends Component {
   constructor(props) {
      super(props)
      this.state = {
         dataListfoods: props.order.listDish,
         status: props.order.status,
         total: props.total,
      }
      this.handleChange = this.handleChange.bind(this)
   }

   // Update state: value
   handleChange(event) {
      this.setState({status: event.target.value});
   }

   renderTableHeader() {
      return(
         <tr>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>UNITPRICE</th>
            <th>AMOUNT</th>
         </tr>
      )
   }

   renderTableData() {
      return this.state.dataListfoods.map((food) => {
         const Name = food.name
         const Quantity = food.quantity
         const Price = food.price
         return (
            <tr>
               <td>{Name}</td>
               <td>
                     <span class="qty">{Quantity}</span>
               </td>
               <td>{Price}</td>
               <td>{Quantity * Price}</td>
            </tr>
         )
      })
   }

   render() {
      const {setedit, order, changeStatusOrder} = this.props
      return (
      <div>
         <div>
            <form>
               <fieldset>
                  <legend>Đơn Hàng - EDIT</legend>
                  <div className="close-icon" onClick={() => setedit(0)}>X</div>
                  <h1>ĐƠN HÀNG</h1>
                  <h2>ID: {order.id}</h2>
                  <h2>PHONE: {order.phoneNumber}</h2>
                  <div>
                     <table id='table'>
                        <thead>{this.renderTableHeader()}</thead>
                        <tbody>{this.renderTableData()}
                           <tr class="tongtien">
                              <td colspan="3">TOTAL</td>
                              <td>{this.state.total} (VND)</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <br/>
                  <div>
                     <form class="choosestatus">
                        <label class="trangthai">
                           Trạng Thái:
                        </label>
                        <select class="choosestate" value={this.state.status} onChange={this.handleChange}>
                           <option value="0">Chưa Thanh Toán</option>
                           <option value="1">Đã Thanh Toán</option>
                           <option value="2">Đã Giao</option>
                        </select>
                     </form>
                  </div>
                  <br/>
                  <div class="OK">
                        <button type="button" onClick={() => {
                           changeStatusOrder(order.id, this.state.status)
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