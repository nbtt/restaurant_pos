import React, { Component} from "react";
import '../style/board.css'
import EditOrder from "./EditOrder";
import SortState from "./sortstate";
import {serversocket} from "../App"
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default class OrderManagement extends Component {
   constructor(props) {
      super(props)
      this.setIsview = this.setIsview.bind(this)
      this.setIsEdit = this.setIsEdit.bind(this)
      this.setSortstate = this.setSortstate.bind(this)
      
      this.state = {
         dataorders: [],   
         isview : 0,       // if isview != 0 then display VIEW
         isedit: 0,        // if isedit != 0 then display VIEW
         isstate: 3,       // Filter by State
      }

      // get data from backend
      fetch('/api/order_management/getList').then(
         (response) => response.json()
      ).then(
         (data) => {this.setState({dataorders: data});}
      );

      this.clickDeleteButton = this.clickDeleteButton.bind(this)
      this.changeStatusOrder = this.changeStatusOrder.bind(this)
   }

   componentDidMount() {
      serversocket.on('addOrder', data => {
         this.state.dataorders.push(data)
         this.setState({dataorders: this.state.dataorders})
      })
    }

   orderTotal(id) {
      var index = this.state.dataorders.findIndex((e => id === e.id))
      var total = 0
      this.state.dataorders[index].listDish.forEach(listDish => {
         total += listDish.price * listDish.quantity
      });
      return total
   }

   changeStatusOrder(id, status) {
      var order = this.state.dataorders.find((e => e.id === id))
      order.status = status
      this.setState({dataorders: this.state.dataorders})

      fetch('/api/order_management/updateStatus?id='+id+'&status='+status  )
   }

   setSortstate(id){
      this.setState({isstate : id})
   }

   setIsview(id){
      this.setState({isview : id})
   }

   setIsEdit(id){
      this.setState({isedit : id})
   }
   
   clickDeleteButton(id){
      alert('Delete This Order!')
      var index = this.state.dataorders.findIndex((e => id === e.id))
      this.state.dataorders.splice(index, 1)
      this.setState({
         dataorders: this.state.dataorders
      })
      const requestOptions = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({id: id})
      };
      fetch('/api/order_management/remove', requestOptions)
   }

   renderTableHeader(){
      return(
         <tr>
            <th>ID</th>
            <th>PHONENUMBER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>STATUS</th>
            <th>ACTIVE</th>
         </tr>
      )
   }

   renderTableData(isstate) {
      return this.state.dataorders.filter(e => (isstate === 3 || e.status === isstate)).map((order) => {
         const id = order.id
         const date = order.date
         const status = order.status
         const phone = order.phoneNumber

         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{phone}</td>
               <td>{date}</td>
               <td>{this.orderTotal(id)}</td>
               <td>{(status === 0 || status === '0') ? "Chưa Thanh Toán"
                     : (status === 1 || status === '1') ? "Đã Thanh Toán"
                     : "Đã Giao"}</td>
               <td>{}
               <div>
                  <button class="edit-btn" onClick={() => this.setState({isedit : id})}>Edit</button>
                  <button class="delete-btn" onClick={() => this.clickDeleteButton(id)}>Delete</button>
               </div>
               </td>
            </tr>
         )
      })
   }

   listOrder() {
      return (
         <div>
            <div>
               <SortState statesort={this.state.isstate} setisstate={this.setSortstate}/>
            </div>
            <br/>
            <table id='table'>
               <thead>{this.renderTableHeader()}</thead>
               <tbody>{this.renderTableData(this.state.isstate)}</tbody>
            </table>
         </div>
      )
   }

   render() {
      return (
         <div class="board">
            <div className="header">
               <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{ mr: 2 }}
               component={Link} to={'/foodManagement'}
               >
               <ArrowBackIcon/>
               </IconButton>
               <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to={'/foodManagement'} style={{textDecoration: 'none '}}>
                  Đi đến TRANG QUẢN LÝ DANH SÁCH MÓN ĂN
               </Typography>
            </div>
            <div>
               <h1 id='title'>DANH SÁCH ĐƠN HÀNG</h1>
               {this.listOrder()}
            </div>
            <div>
               {this.state.isedit !== 0 ? <EditOrder order={this.state.dataorders.find((e => e.id === this.state.isedit))} total={this.orderTotal(this.state.isedit)} setedit={this.setIsEdit} changeStatusOrder={this.changeStatusOrder}/> : null}
            </div>
         </div>
      )
   }
}