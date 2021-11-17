import React, { Component } from "react";
import '../style/board.css'
import '../style/viewframe.css'

export default class ViewFrame extends Component {
   constructor(props) {
      super(props)
      this.state = {
         dataListfoods: [
            {No: 1, Name: 'Gà quay', Quantity: 1, UnitPrice: '5$', Amount: '5$'},
            {No: 2, Name: 'Nước Cocacola', Quantity: 10, UnitPrice: '1$', Amount: '20$'},
            {No: 3, Name: 'Xoài', Quantity: 4, UnitPrice: '0.5$', Amount: '2$'}
         ],
         state: 1,
         total: 0
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
         const { No, Name, Quantity, UnitPrice, Amount } = listfood //destructuring
         return (
            <tr>
               <td>{No}</td>
               <td>{Name}</td>
               <td>{Quantity}</td>
               <td>{UnitPrice}</td>
               <td>{Amount}</td>
            </tr>
         )
      })
   }

   render() {
      const {setview} = this.props
      return (
         <div class="viewframe">
            <div>
               <form>
                  <fieldset>
                     <legend>Đơn Hàng - VIEW</legend>
                     <div className="close-icon" onClick={() => setview(0)}>X</div>
                     <h1>ĐƠN HÀNG</h1>
                     <h2>ID: DH01</h2><br/>
                     <div>
                        <table id='students'>
                           <thead>{this.renderTableHeader()}</thead>
                           <tbody>
                              {this.renderTableData()}
                              <tr class="tongtien">
                                 <td colspan="4">TOTAL</td>
                                 <td>{this.state.total}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                     <div class = "status">
                        <p class="tt">
                           Trạng thái:   
                        </p>
                        <div>
                           <p class="chitiet">
                              {this.state.state === 0 ? "CHƯA THANH TOÁN" : null}
                              {this.state.state === 1 ? "ĐÃ THANH TOÁN" : null}
                              {this.state.state === 2 ? "ĐÃ GIAO" : null}
                           </p>
                        </div>
                     </div>
                     <div class="OK">
                        <button type="button" class="btn btn-warning" onClick={() => setview(0)}>OK</button>
                     </div>
                  </fieldset>
               </form>
            </div>
         </div>
      )
   }
}