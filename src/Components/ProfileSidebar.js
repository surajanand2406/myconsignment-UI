import React, { Component } from 'react'
import './CSS/ProfileSidebar.css'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {Drawer} from 'antd'
import { Icon } from '@ant-design/compatible';
import Truncate from 'react-truncate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog, faCertificate, faStore, faShippingFast,faSave } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { becomePROAction } from "../store/actions/actions";



var width = window.screen.width;
class ProfileSidebar extends Component {
    constructor(props) {
        super(props)
        this.initialState = {
            userData:null
        }
        this.state={
            ...this.initialState,
            isSideBar:false,
            windowWidth:width
        }
    }
    componentDidMount(){
        window.addEventListener('resize', () => {
            this.setState({ windowWidth: window.screen.width });
        })


        let data = localStorage.getItem('userData')
        if(data!==null){
            let userData = JSON.parse(data)
            if(userData.isPRO===true){
                this.props.becomePRO()
            }
            this.setState({
                userData,
            })
        }
    }
    render() {
        return (
            <>
            <div className="Profile-sidebar">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="user-detail" >
                        <div style={{width:'25%'}}>
                            {this.state.userData===null && <Avatar size={60} />}
                            {this.state.userData!==null && <Avatar src={this.state.userData.profilePic} size={60} />}
                        </div>
                        <div style={{ marginLeft: '10px',width:'75%' }}>
                            <h4 style={{ margin: 0, color: 'white',fontWeight:'bold' }}> {this.state.userData!==null?this.state.userData.fName:"No Name"}</h4>
                            <Truncate style={{ color: 'white', margin: 0 }}>{this.state.userData!==null?this.state.userData.email:"No Email"}</Truncate>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        <Link className="Menu"  to="/user-profile" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                            <div style={{ width: '10%' }}>
                                <FontAwesomeIcon icon={faUser} color="gray" size="1x" />
                            </div>
                            <div style={{ width: '90%' }}>
                                <h3 style={{ color: 'black', marginTop: '5px' }}>Profile</h3>
                            </div>
                        </Link>
                        <Link className="Menu" to="/myorders" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                            <div style={{ width: '10%' }}>
                                <FontAwesomeIcon icon={faShippingFast} color="gray" size="1x" />
                            </div>
                            <div style={{ width: '90%' }}>
                                <h3 style={{ color: 'black', marginTop: '5px' }}>My Orders</h3>
                            </div>
                        </Link>
                        <Link className="Menu" to="/shipping-profile" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                            <div style={{ width: '10%' }}>
                                <FontAwesomeIcon icon={faShippingFast} color="gray" size="1x" />
                            </div>
                            <div style={{ width: '90%' }}>
                                <h3 style={{ color: 'black', marginTop: '5px' }}>Shipping Profiles</h3>
                            </div>
                        </Link>
                        <Link className="Menu" to="/user-profile-setting" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                            <div style={{ width: '10%' }}>
                                <FontAwesomeIcon icon={faCog} color="gray" size="1x" />
                            </div>
                            <div style={{ width: '90%' }}>
                                <h3 style={{ color: 'black', marginTop: '5px' }}>Settings</h3>
                            </div>
                        </Link>
                        <Link className="Menu" to="/inactiveListings" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                            <div style={{ width: '10%' }}>
                                <FontAwesomeIcon icon={faCertificate} color="gray" size="1x" />
                            </div>
                            <div style={{ width: '90%' }}>
                                <h3 style={{ color: 'black', marginTop: '5px' }}>Inactive Listings</h3>
                            </div>
                        </Link>

                        <Link className="Menu" to="/drafts" style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:'solid 1px lightgray'}}>
                            <div style={{width:'10%'}}>
                                <FontAwesomeIcon icon={faSave} color="gray" size="1x" /> 
                            </div>
                            <div style={{width:'90%'}}>
                                <h3 style={{color:'black',marginTop:'5px'}}>Drafts</h3>
                            </div>
                        </Link>
                        { this.props.isPRO===false &&<Link className="Menu" to="/become-pro" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                            <div style={{ width: '10%' }}>
                                <FontAwesomeIcon icon={faCertificate} color="gray" size="1x" />
                            </div>
                            <div style={{ width: '90%' }}>
                                <h3 style={{ color: 'black', marginTop: '5px' }}>Become Pro</h3>
                            </div>
                        </Link>}
                        
                        { this.props.isPRO===true &&<Link className="Menu" to="/pro-subscription" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                            <div style={{ width: '10%' }}>
                                <FontAwesomeIcon icon={faCertificate} color="gray" size="1x" />
                            </div>
                            <div style={{ width: '90%' }}>
                                <h3 style={{ color: 'black', marginTop: '5px' }}>Pro Subscription</h3>
                            </div>
                        </Link>}

                        {this.props.isPRO===true && <Link className="Menu" to="/connect-to-external-store" style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:'solid 1px lightgray'}}>
                            <div style={{width:'10%'}}>
                                <FontAwesomeIcon icon={faStore} color="gray" size="1x" /> 
                            </div>
                            <div style={{width:'90%'}}>
                                <h3 style={{color:'black',marginTop:'5px'}}>Connect External Stores</h3>
                            </div>
                        </Link>}
                        
                    </div>
                </div>

                {/* For small Device */}

                <Drawer placement="left" onClose = {()=>this.setState({isSideBar:!this.state.isSideBar})} className="drawer" visible={this.state.isSideBar} width="80%" closable={false} bodyStyle={{ padding: 0 }} >

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{display:'flex',alignItems:'center',backgroundColor:'#8b0000',padding:20}} >
                            <div style={{width:'25%'}}>
                                {this.state.userData===null && <Avatar size={60} />}
                                {this.state.userData!==null && <Avatar src={this.state.userData.profilePic} size={60} />}
                            </div>
                            <div style={{ marginLeft: '10px',width:'75%' }}>
                                <h4 style={{ margin: 0, color: 'white',fontWeight:'bold' }}>Name: {this.state.userData!==null?this.state.userData.fName:"No Name"}</h4>
                                <Truncate style={{ color: 'white', margin: 0 }}>Email: {this.state.userData!==null?this.state.userData.email:"No Email"}</Truncate>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                            <Link className="Menu"  to="/user-profile" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                                <div style={{ width: '10%' }}>
                                    <FontAwesomeIcon icon={faUser} color="gray" size="1x" />
                                </div>
                                <div style={{ width: '90%' }}>
                                    <h3 style={{ color: 'black', marginTop: '5px' }}>Profile</h3>
                                </div>
                            </Link>
                            <Link className="Menu" to="/shipping-profile" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                                <div style={{ width: '10%' }}>
                                    <FontAwesomeIcon icon={faShippingFast} color="gray" size="1x" />
                                </div>
                                <div style={{ width: '90%' }}>
                                    <h3 style={{ color: 'black', marginTop: '5px' }}>Shipping Profiles</h3>
                                </div>
                            </Link>
                            <Link className="Menu" to="/user-profile-setting" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                                <div style={{ width: '10%' }}>
                                    <FontAwesomeIcon icon={faCog} color="gray" size="1x" />
                                </div>
                                <div style={{ width: '90%' }}>
                                    <h3 style={{ color: 'black', marginTop: '5px' }}>Setting</h3>
                                </div>
                            </Link>
                            <Link className="Menu" to="/become-pro" style={{ display: 'flex', alignItems: 'center', padding: '5px', borderBottom: 'solid 1px lightgray' }}>
                                <div style={{ width: '10%' }}>
                                    <FontAwesomeIcon icon={faCertificate} color="gray" size="1x" />
                                </div>
                                <div style={{ width: '90%' }}>
                                    <h3 style={{ color: 'black', marginTop: '5px' }}>Become Pro</h3>
                                </div>
                            </Link>
                            <Link className="Menu" to="/connect-to-external-store" style={{display:'flex',alignItems:'center',padding:'5px',borderBottom:'solid 1px lightgray'}}>
                                <div style={{width:'10%'}}>
                                    <FontAwesomeIcon icon={faStore} color="gray" size="1x" /> 
                                </div>
                                <div style={{width:'90%'}}>
                                    <h3 style={{color:'black',marginTop:'5px'}}>Connect external Stores</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Drawer>
            </div>
            <div style={this.state.windowWidth <= 768 ? {position:'sticky',top:'2%',left:0,padding:"5px",backgroundColor:'#b17e4e',height:30} : {display:'none'}}>
                <Icon type="menu" style={{ fontSize: '20px',color:"white" }} onClick={()=>this.setState({isSideBar:true})} />
            </div>
            </>
        )
    }
}
function mapStateToProps(state) {
    return ({
        UID:state.rootReducer.UID,
        isPRO:state.rootReducer.isPRO,
    })
}
function mapActionsToProps(dispatch) {
    return ({
        becomePRO:()=>{
            dispatch(becomePROAction())
        }
    })
}

export default connect(mapStateToProps,mapActionsToProps)(ProfileSidebar)