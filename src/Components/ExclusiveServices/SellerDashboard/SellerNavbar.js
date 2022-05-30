import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/SellerNavbar.css'
import {Link,Redirect} from 'react-router-dom'
import Truncate from 'react-truncate'
import {Drawer,Input,Form,Button,Divider,Avatar} from 'antd'
import { Icon } from '@ant-design/compatible';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope,faSignOutAlt,faTachometerAlt,faPlusSquare,faList,faNetworkWired,faMoneyBill,faUserCog} from '@fortawesome/free-solid-svg-icons'

var width = window.screen.width;
class SellerNavbar extends Component {

    state={
        isSideBar:false,
        windowWidth:width,
    }

    componentDidMount(){
    
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width})
        }) 
    }

    handleLogout=()=>{
        localStorage.removeItem('ExclusiveUser')
    }


    render() {

        var userData = localStorage.getItem('ExclusiveUser');

        if(!userData)
        {
            return <Redirect to="/exclusive-services"  />
        }
        else
        {
            return (
                <div className="SellerNav-Container">
                    <div className="SellerNav-Nav">
                        <div className="nav-menu">
                            <Icon type="menu" style={{fontSize:'25px',color:"white"}} onClick={()=>{this.setState({isSideBar:true})}} />
                        </div>
                        <div className="title">
                            <Link to={`/exclusive-services/${this.props.Id}/seller-dashboard`}><h1 style={{color:'white',margin:0,marginLeft:'5px'}}>Seller Dashboard</h1></Link>    
                        </div>
                        <div className="SellerNav-Nav-menu">
                            <Link className="link" to={`/exclusive-services/${this.props.Id}/seller-messeges`}  style={{marginRight:'15px',color:'white'}}><FontAwesomeIcon icon={faEnvelope} /> Messages </Link>
                            <Link className="link" onClick={this.handleLogout}   style={{marginRight:'15px',color:'white'}}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</Link>
                        </div>
                    </div>
                    <div className="SellerNav-body-Container">
                    </div>

                    {/*Side bar for small device*/}
                    <Drawer placement="left" onClose={()=>this.setState({isSideBar:!this.state.isSideBar})}  visible={this.state.isSideBar} width={this.state.windowWidth <= 576 ? "80%" : "60%"} closable={true} bodyStyle={{padding:0}} >
                        <div className="Seller-sidebar-Body" >
                            <div style={{display:'flex',alignItems:'center',backgroundColor:'#eeeeee',borderBottom: 'solid 1px lightgray',padding:15,paddingTop: 40,paddingBottom: 40}}>
                                <div style={this.state.windowWidth <= 576 ? {width:'35%'} : {width:'20%'}}>
                                    <Avatar size={80} src="" />
                                </div>
                                <div style={{width:'65%'}}>
                                    <h3 style={{margin:0,fontWeight:'bold'}}>Smith</h3>
                                    <Truncate>abc@gmail.com sadfasdfsdafsdf</Truncate>
                                </div>
                            </div>
                            <div style={{width:'100%'}}>
                                <Link to="/exclusive-services/seller-dashboard" >
                                    <div style={{  display: 'flex',alignItems: 'center',padding:20,borderBottom: 'solid 1px lightgray',color:'black'}}>
                                        <div style={this.state.windowWidth <= 360 ? {width:'15%'} : {width:'10%'}}><FontAwesomeIcon size="lg" icon={faTachometerAlt} /></div>
                                        <div style={this.state.windowWidth <= 360 ? {width:'85%',fontSize: 17,margin: 0} : { width:'90%',fontSize: 17,margin: 0}}>DashBoard</div>
                                    </div>
                                </Link>
                                <Link to="/exclusive-services/seller-dashboard-add-services">
                                    <div style={{  display: 'flex',alignItems: 'center',padding:20,borderBottom: 'solid 1px lightgray',color:'black'}}>
                                        <div style={this.state.windowWidth <= 360 ? {width:'15%'} : {width:'10%'}}><FontAwesomeIcon size="lg" icon={faPlusSquare} /></div>
                                        <div style={this.state.windowWidth <= 360 ? {width:'85%',fontSize: 17,margin: 0} : { width:'90%',fontSize: 17,margin: 0}}>Add Service</div>
                                    </div>
                                </Link>
                                <Link to="/exclusive-services/seller-dashboard-my-services">
                                    <div style={{  display: 'flex',alignItems: 'center',padding:20,borderBottom: 'solid 1px lightgray',color:'black'}}>
                                        <div style={this.state.windowWidth <= 360 ? {width:'15%'} : {width:'10%'}}><FontAwesomeIcon size="lg" icon={faList} /></div>
                                        <div style={this.state.windowWidth <= 360 ? {width:'85%',fontSize: 17,margin: 0} : { width:'90%',fontSize: 17,margin: 0}}>My Services</div>
                                    </div>
                                </Link>
                                <Link to="/exclusive-services/seller-dashboard-seller-jobs">
                                    <div style={{  display: 'flex',alignItems: 'center',padding:20,borderBottom: 'solid 1px lightgray',color:'black'}}>
                                        <div style={this.state.windowWidth <= 360 ? {width:'15%'} : {width:'10%'}}><FontAwesomeIcon size="lg" icon={faNetworkWired} /></div>
                                        <div style={this.state.windowWidth <= 360 ? {width:'85%',fontSize: 17,margin: 0} : { width:'90%',fontSize: 17,margin: 0}}>My Jobs</div>
                                    </div>
                                </Link>
                                <Link to="/exclusive-services/seller-dashboard-my-earnings">
                                    <div style={{  display: 'flex',alignItems: 'center',padding:20,borderBottom: 'solid 1px lightgray',color:'black'}}>
                                        <div style={this.state.windowWidth <= 360 ? {width:'15%'} : {width:'10%'}}><FontAwesomeIcon size="lg" icon={faMoneyBill} /></div>
                                        <div style={this.state.windowWidth <= 360 ? {width:'85%',fontSize: 17,margin: 0} : { width:'90%',fontSize: 17,margin: 0}}>My Earnings</div>
                                    </div>
                                </Link>
                                <Link to="/exclusive-services/seller-dashboard-seller-profile">
                                    <div style={{  display: 'flex',alignItems: 'center',padding:20,borderBottom: 'solid 1px lightgray',color:'black'}}>
                                        <div style={this.state.windowWidth <= 360 ? {width:'15%'} : {width:'10%'}}><FontAwesomeIcon size="lg" icon={faUserCog} /></div>
                                        <div style={this.state.windowWidth <= 360 ? {width:'85%',fontSize: 17,margin: 0} : { width:'90%',fontSize: 17,margin: 0}}>Profile Setting</div>
                                    </div>
                                </Link>
                            </div>
                        </div>  
                    </Drawer>

                </div> 
            )
        }
    }
}


export default  SellerNavbar;
