import React, { Component } from "react";
import HomeIcon from '@material-ui/icons/Home';
import '../style/board.css'
import ViewFrame from "./viewframe";
import EditFrame from "./editframe";
import SortState from "./sortstate";

export default class Table extends Component {
   constructor(props) {
      super(props)
         this.setIsview = this.setIsview.bind(this)
         this.setIsEdit = this.setIsEdit.bind(this)
         this.setSortstate = this.setSortstate.bind(this)
      this.state = {
         dataorders: [
            {No: 1, ID: 'DH01', Name: 'Trịnh Văn A', Date: '22-12-2020', Total: '300$', Status: 1, Active: ''},
            {No: 2, ID: 'DH54', Name: 'Trần Văn E', Date: '22-12-2020', Total: '240$', Status: 1, Active: ''},
            {No: 3, ID: 'DH05', Name: 'Vũ Văn R', Date: '22-12-2020', Total: '350$', Status: 2, Active: ''},
            {No: 4, ID: 'DH22', Name: 'Lê Văn S', Date: '22-12-2020', Total: '250$', Status: 1, Active: ''},
            {No: 5, ID: 'DH45', Name: 'Hoàng Văn U', Date: '22-12-2020', Total: '900$', Status: 3, Active: ''},
            {No: 6, ID: 'DH67', Name: 'Trịnh Văn B', Date: '22-12-2020', Total: '300$', Status: 1, Active: ''},
            {No: 7, ID: 'DH08', Name: 'Trần Văn V', Date: '22-12-2020', Total: '240$', Status: 1, Active: ''},
            {No: 8, ID: 'DH72', Name: 'Vũ Văn N', Date: '22-12-2020', Total: '350$', Status: 3, Active: ''},
            {No: 9, ID: 'DH66', Name: 'Lê Văn M', Date: '22-12-2020', Total: '250$', Status: 1, Active: ''},
            {No: 10, ID: 'DH09', Name: 'Hoàng Văn K', Date: '22-12-2020', Total: '900$', Status: 3, Active: ''},
            {No: 11, ID: 'DH10', Name: 'Trịnh Văn L', Date: '22-12-2020', Total: '300$', Status: 1, Active: ''},
            {No: 12, ID: 'DH21', Name: 'Trần Văn T', Date: '22-12-2020', Total: '240$', Status: 1, Active: ''},
            {No: 13, ID: 'DH43', Name: 'Vũ Văn F', Date: '22-12-2020', Total: '350$', Status: 2, Active: ''},
            {No: 14, ID: 'DH78', Name: 'Lê Văn Q', Date: '22-12-2020', Total: '250$', Status: 1, Active: ''},
            {No: 15, ID: 'DH82', Name: 'Hoàng Văn W', Date: '22-12-2020', Total: '900$', Status: 3, Active: ''}
         ],  
         isview : 0,
         isedit: 0,
         isstate: 4
      }
      this.clickDeleteButton = this.clickDeleteButton.bind(this)
   }
   changeStatus(e){
      if(e === 1) return "Chưa Thanh Toán"
      else if(e === 2) return "Đã Thanh Toán"
      else if(e === 3) return "Đã Giao"
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
   clickViewButton(){
      this.setState({isview : 1})
   }
   clickEditButton(){
      this.setState({isedit : 1})
   }
   clickDeleteButton(id){
      alert('Delete This Order!')
      var index = this.state.dataorders.findIndex((e => id === e.ID))
      this.state.dataorders.splice(index, 1)
      this.setState({
         dataorders: this.state.dataorders
      })
   }

   renderTableHeader() {
      let header = Object.keys(this.state.dataorders[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      // this.changeStatus()
      // this.changeState()
      return this.state.dataorders.map((student, index) => {
         //const {choosestate} = issort
         var { No, ID, Name, Date, Total, Status, Active } = student //destructuring
         if(Status === this.state.isstate)
         {
            return (
               <tr key={ID}>
                  <td>{No}</td>
                  <td>{ID}</td>
                  <td>{Name}</td>
                  <td>{Date}</td>
                  <td>{Total}</td>
                  <td>{this.changeStatus(Status)}</td>
                  <td>{Active}
                  <div>
                     <button class="view-btn" onClick={() => this.clickViewButton()}>View</button>
                     <button class="edit-btn" onClick={() => this.clickEditButton()}>Edit</button>
                     <button class="delete-btn" onClick={() => this.clickDeleteButton(ID)}>Delete</button>
                  </div>
                  </td>
               </tr>
            )
         }
         else if(this.state.isstate === 4){
            return (
               <tr key={ID}>
                  <td>{No}</td>
                  <td>{ID}</td>
                  <td>{Name}</td>
                  <td>{Date}</td>
                  <td>{Total}</td>
                  <td>{this.changeStatus(Status)}</td>
                  <td>{Active}
                  <div>
                     <button class="view-btn" onClick={() => this.clickViewButton()}>View</button>
                     <button class="edit-btn" onClick={() => this.clickEditButton()}>Edit</button>
                     <button class="delete-btn" onClick={() => this.clickDeleteButton(ID)}>Delete</button>
                  </div>
                  </td>
               </tr>
            )
         }
         else{
            return(
               null
            )
         }
      })
   }

   render() {
      return (
         <div class="board">
            <div>
            <h1 id='title'>DANH SÁCH ĐƠN HÀNG</h1>
            <div>
               <SortState statesort={this.state.isstate} setisstate={this.setSortstate}/>
               <span className="next">
                  <HomeIcon className="homeicon"/>
                  <span>Go To ManageFood</span>
               </span>
            </div>
            <br/>
            <table id='students'>
               <thead>{this.renderTableHeader()}</thead>
               <tbody>{this.renderTableData()}</tbody>
            </table>
            </div>
            <div>
               {this.state.isview !== 0 ? <ViewFrame view={this.state.isview} setview={this.setIsview}/> : null}
               {this.state.isedit !== 0 ? <EditFrame view={this.state.isedit} setedit={this.setIsEdit}/> : null}
            </div>
         </div>
      )
   }
}
