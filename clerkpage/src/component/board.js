import React, { Component } from "react";
import '../style/board.css'
import VED from './buttonmain.js'
import ViewFrame from "./viewframe";
import EditFrame from "./editframe";
import { SettingsInputSvideoTwoTone } from "@material-ui/icons";

export default class Table extends Component {
   constructor(props) {
      super(props)
      this.state = {
         students: [
            {No: 1, ID: 'DH01', Name: 'Trịnh Văn A', Date: '22-12-2020', Total: '300$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 2, ID: 'DH54', Name: 'Trần Văn E', Date: '22-12-2020', Total: '240$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 3, ID: 'DH05', Name: 'Vũ Văn R', Date: '22-12-2020', Total: '350$', Status: 'Đã Thanh Toán', Active: <div><VED/></div>},
            {No: 4, ID: 'DH22', Name: 'Lê Văn S', Date: '22-12-2020', Total: '250$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 5, ID: 'DH45', Name: 'Hoàng Văn U', Date: '22-12-2020', Total: '900$', Status: 'Đã Giao', Active: <div><VED/></div>},
            {No: 6, ID: 'DH67', Name: 'Trịnh Văn B', Date: '22-12-2020', Total: '300$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 7, ID: 'DH08', Name: 'Trần Văn V', Date: '22-12-2020', Total: '240$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 8, ID: 'DH72', Name: 'Vũ Văn N', Date: '22-12-2020', Total: '350$', Status: 'Đã Thanh Toán', Active: <div><VED/></div>},
            {No: 9, ID: 'DH66', Name: 'Lê Văn M', Date: '22-12-2020', Total: '250$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 10, ID: 'DH09', Name: 'Hoàng Văn K', Date: '22-12-2020', Total: '900$', Status: 'Đã Giao', Active: <div><VED/></div>},
            {No: 11, ID: 'DH10', Name: 'Trịnh Văn L', Date: '22-12-2020', Total: '300$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 12, ID: 'DH21', Name: 'Trần Văn T', Date: '22-12-2020', Total: '240$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 13, ID: 'DH43', Name: 'Vũ Văn F', Date: '22-12-2020', Total: '350$', Status: 'Đã Thanh Toán', Active: <div><VED/></div>},
            {No: 14, ID: 'DH78', Name: 'Lê Văn Q', Date: '22-12-2020', Total: '250$', Status: 'Chưa Thanh Toán', Active: <div><VED/></div>},
            {No: 15, ID: 'DH82', Name: 'Hoàng Văn W', Date: '22-12-2020', Total: '900$', Status: 'Đã Giao', Active: <div><VED/></div>}
         ],  
         isview : 1       
      }
   }
   setIsview(id){
      this.setState({isview : id})
   }

   renderTableHeader() {
      let header = Object.keys(this.state.students[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      return this.state.students.map((student, index) => {
          const { No, ID, Name, Date, Total, Status, Active } = student //destructuring
         return (
            <tr key={ID}>
               <td>{No}</td>
               <td>{ID}</td>
               <td>{Name}</td>
               <td>{Date}</td>
               <td>{Total}</td>
               <td>{Status}</td>
               <td>{Active}</td>
            </tr>
         )
      })
   }

   render() {
      return (
         <div class="board">
            <div>
            <h1 id='title'>DANH SÁCH ĐƠN HÀNG</h1>
            <table id='students'>
               <thead>{this.renderTableHeader()}</thead>
               <tbody>{this.renderTableData()}</tbody>
            </table>
            </div>
            <div>
               {this.state.isview === 0 ? <EditFrame setIsview={this.setIsview} /> : null}
            </div>
         </div>
      )
   }
}
