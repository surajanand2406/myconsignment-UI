import React, { Component } from 'react'
import {Button,Divider,Modal,Form,Input,Radio,Select} from 'antd'
import Navbar from './Navbar'
import './CSS/ShippingProfile.css'
import ProfileSidebar from './ProfileSidebar'
import { url,headers } from "../Constants";
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
class Drafts extends Component {
    constructor(props){
        super(props)
        this.initialState={
            showDetailModal:false,
            listData:[],
      
       show:true,
       shippingProfile:null,
       selectedDraft:null,
       isAddListing:undefined
        }
        this.state={
            ...this.initialState
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleOpenModal=()=>{
        this.setState({showDetailModal:true})
    }
    handleCloseModal=()=>{
        this.setState({showDetailModal:false})
    }
    componentDidMount(){
        let userData = localStorage.getItem('userData')
        let user = JSON.parse(userData)
        let UID = user.firebaseUID
        if(UID!==""){
            fetch(url+'/api/getUserDrafts'+UID)
            .then(res=>res.json())
            .then(response=>{
                if(response.message==='Success'){
                    console.log(response.doc)
                    this.setState({
                        listData:response.doc
                    })
                }
                else{
                    alert("Failed to fetch shipping profiles")
                }
            })
        }
    }
    handleDelete(id){
        if(id){
            confirmAlert({
                title: 'Confirm Delete?',
                message: 'Are you sure to delete draft?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {
            fetch(url+'/api/deleteDraft'+id,{method:"DELETE",headers:headers})
            .then(res=>res.json())
            .then(response=>{
                if(response.message==='Success'){
                    let updatedShipping = this.state.listData.filter(list=>list._id!==id)
                    this.setState({
                        listData:updatedShipping
                    })
                }else{
                    alert('Failed to delete draft')
                }
            })
                    }
                  },
                  {
                    label: 'No',
                    onClick: () => {

                    }
                  }
                ]
              });
        }
    }
    render() {
        return (
            <div className="Shipping-container">
                <Navbar isAddListing={this.state.isAddListing}/>

                <div className="Shipping-body">
                    <ProfileSidebar />
                   <div className="Shipping-body-lists">
                    <h2 style={{textAlign:"center"}}> Drafts</h2>
                       {
                          this.state.listData.length>0 && this.state.listData.map((item)=>{
                               return(
                                <div className="Shipping-list">
                                    <div style={{display:'flex',flexDirection:"column"}}>
                                        <h3 style={{padding:0,margin:0}}>{item.title}</h3>
                                        <p lines='2' style={{color:'gray'}}>{item.description.substring(0,100)}</p>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        {/* <FontAwesomeIcon icon={faEdit} size="lg" /> */}
                                        <Button size='small' onClick={()=>{
                                            console.log('item => ',item)
                                            this.setState({
                                                selectedDraft:item
                                            })
                                            this.handleOpenModal()
                                        }} type='primary'>View</Button>
                                        <p style={{marginLeft:'5px',marginRight:'5px'}}>|</p>
                                        {/* <FontAwesomeIcon onClick={()=>this.handleDelete(item._id)} icon={faTrash} size="lg" /> */}
                                        <Button onClick={()=>this.handleDelete(item._id)} size='small' danger type='danger'>Delete</Button>
                                    </div>
                                </div>
                               )
                           })  
                        }
                        {this.state.listData.length===0 && <h3 style={{textAlign:"center"}}>No saved drafts to show</h3>}
                   </div>
                </div>
                <Modal footer={null} closable={true}  visible={this.state.showDetailModal}  onCancel={()=>{this.setState({showDetailModal:false})}}>
                    <div style={{display:'flex',flexDirection:"row",justifyContent:"center",padding:10}}>
                        <h1 style={{textAlign:"center",fontWeight:"bolder",textDecoration:"underline"}}>Draft</h1>
                    </div>
                    <div style={{marginTop:10,paddingLeft:10,paddingRight:10}}>
                    {this.state.selectedDraft!==null && <span><b>Title</b>: {" "} {this.state.selectedDraft.title}</span>}
                    <br/>
                    {this.state.selectedDraft!==null && <span><b>Description</b>: {" "} {this.state.selectedDraft.description}</span>}
                    <br/>
                    {this.state.selectedDraft!==null && <span><b>Price</b>: {" "} ${this.state.selectedDraft.price}</span>}
                    <br/>
                    {this.state.selectedDraft!==null && <span><b>Category</b>: {" "} {this.state.selectedDraft.Category}</span>}
                    <br/>
                    {this.state.selectedDraft!==null && <span><b>Subcategory</b>: {" "} {this.state.selectedDraft.subCategory}</span>}
                    <br/>
                    {this.state.selectedDraft!==null && <span><b>Domestic Shipping</b>: {" "} {this.state.selectedDraft.shippingNational===true?"Yes":"No"}</span>}
                    <br/>
                    {this.state.selectedDraft!==null && <span><b>International Shipping</b>: {" "} {this.state.selectedDraft.shippingInternational===true?"Yes":"No"}</span>}
                    <br/>
                    {this.state.selectedDraft!==null && <span><b>Sponsorship</b>: {" "} {this.state.selectedDraft.sponsor===true?"Yes":"No"}</span>}
                    <br/>
                    {this.state.selectedDraft!==null &&this.state.sponsor===true && <span><b>Sponsorship Percentage</b>: {" "} {this.state.selectedDraft.sponsorRate}%</span>}
                    <br/>
                    {this.state.selectedDraft!==null && <span><b>Tags</b>: {" "} {this.state.selectedDraft.tags.length>0&&this.state.selectedDraft.tags.map(tag=><span>{" "+tag+','}</span>)}</span>}
                    </div>

                    <h3 style={{textAlign:"center",marginTop:10}}>In order to complete the listing, select this draft from <br/> "Add Listing" -><Button type='link' onClick={()=>{
                        this.setState({
                            isAddListing:true,
                            showDetailModal:false
                        })
                    }}>Select from drafts</Button>  </h3>
                </Modal>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        categories:state.rootReducer.categories,
        UID:state.rootReducer.UID,
        query:state.rootReducer.query,
        data:state.rootReducer.data
    })
}
function mapActionsToProps(dispatch) {
    return ({
        
    })
}
export default connect(mapStateToProps,mapActionsToProps)(Drafts)