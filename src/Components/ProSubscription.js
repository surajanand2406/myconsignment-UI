import React, { Component } from 'react'
import Navbar from './Navbar'
import './CSS/ShippingProfile.css'
import ProfileSidebar from './ProfileSidebar'
import { connect } from "react-redux";
import { becomePROAction } from "../store/actions/actions";
import { Button,message } from 'antd';
import { url,headers } from "../Constants";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
class ProSubscription extends Component {
    constructor(props){
        super(props)
        this.state={
       firebaseUID:'',
       userData:null
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ windowWidth: window.screen.width });
        })

        let data = localStorage.getItem('userData')
        if(data!==null){
            let userData = JSON.parse(data)
            if(userData.isPRO===false)
            this.props.history.push('/user-profile')
          this.setState({ 
              firebaseUID:userData.firebaseUID,
              userData
          })
        }
    }
    handleSubmit(){
        confirmAlert({
            title: 'Cancel subscription',
            message: <div>Are you sure want to cancel your pro subscription and lose access to the following features: 

                        <ul className="diamond">
                            <li>PRO tagged</li>
                            <li>Live auctions</li>
                            <li>Connecting to external stores</li>
                            <li>More detailed listings</li>
                            <li>Video listings</li>
                            </ul>
            </div>,
            buttons: [
              {
                label: 'Yes',
                onClick: () => { 
                    let firebaseUID = this.state.userData.firebaseUID
                    if(firebaseUID!==null && firebaseUID!==undefined){
                        let body = {
                            firebaseUID
                        }
                        fetch(url+'/api/cancelPro',{method:"PUT",body:JSON.stringify(body),headers:headers})
                        .then(res => res.json())
                        .then(response=>{
                            if(response.message==='Success'){
                                let user = {
                                    ...this.state.userData
                                }
                                user.isPRO = false
                                localStorage.setItem('userData',JSON.stringify(user))
                            }   
                            else{
                                message.error('Canceling subscription failed')
                            }
                        })
                    }
                }
              },
              {
                label: 'No',
                onClick: () => { 
                    this.setState({
                        isAddListing: true
                    })
                }
              }
            ]
          });
    }
    
    render() {
      	
        return (
            <div className="Shipping-container">
                <Navbar />

                <div className="Shipping-body">
                    <ProfileSidebar />
                    <div style={{width:'100%',padding:'10px'}}>
                        <h2 style={{textAlign:"center",fontWeight:"bolder"}}>My Subscription</h2>
                        <div style={{paddingLeft:20}}>
                            <h4>Under your PRO subscription, you've access to the following exclusive feautres:</h4>
                            <ol className="diamond">
                            <li>PRO tagged</li>
                            <li>Live auctions</li>
                            <li>Connecting to external stores</li>
                            <li>More detailed listings</li>
                            <li>Video listings</li>
                            </ol>
                        </div>
                        <br/>
                    <div style={{display:'flex',flexDirection:"row",alignItems:"center",paddingLeft:20}}>
                    <h2 style={{fontWeight:"bolder"}}>Subscription date: {"  "}</h2>
                    <h3 style={{marginLeft:10}}>02 - 27 - 2020</h3>
                    </div>
                    <div style={{display:'flex',flexDirection:"row",alignItems:"center",paddingLeft:20}}>
        <h2 style={{fontWeight:"bolder"}}>Subscription expires on: {"  "}</h2>
                    <h3 style={{marginLeft:10}}>02 - 27 - 2021</h3>
                    </div>
                    </div>
                </div>
                    <div style={{display:'flex',marginBottom:20,justifyContent:"center",flexDirection:"row",width:'100%'}}>
                    <Button  onClick={this.handleSubmit} className='cancelBtn' type="default"  danger={true} size='large' >
                            Cancel Subscription
                   </Button>
                    </div>


           
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        UID:state.rootReducer.UID,
        userInfo:state.rootReducer.userInfo,
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

export default connect(mapStateToProps, mapActionsToProps)(ProSubscription)
