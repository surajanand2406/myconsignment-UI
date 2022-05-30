import React, { Component } from 'react'
import Navbar from './Navbar'
import './CSS/ShippingProfile.css'
import StripeCheckout from 'react-stripe-checkout';
import imageSource from './ejomFc.jpg'
import ProfileSidebar from './ProfileSidebar'
import PaypalBtn from 'react-paypal-checkout';
import { connect } from "react-redux";
import { becomePROAction } from "../store/actions/actions";
import { message } from 'antd';
import { url,headers } from "../Constants";
class ProUser extends Component {
    constructor(props){
        super(props)
        this.state={
            isAddShippment:false,
            shippingCheckBoxValue:'Domestic',
            listData:[
                {title:'hello',Description:'adsdfdfasdghasdgasdfs;dfa'},
                {title:'hello',Description:'adsdfdfasdghasdgasdfs'},
            ],
            domCost:'0',
       domDelivery:{
         from:'0',
         to:'0'
       },
       domesticService:"",
       intCost:'0',
       intDelivery:{
         from:'0',
         to:'0'
       },
       internationalService:"",
       domAdditional:'0',
       intAddtional:'0',
       loading:false,
       type:'both',
       showDomestic:false,
       showInternational:false,
       showBoth:true,
       title:'',
       description:'',
       showDomOther:false,
       otherDomService:'',
       showIntService:false,
       otherIntSevice:'',
       firebaseUID:'',
       userData:null
        }
    }
    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ windowWidth: window.screen.width });
        })

        let data = localStorage.getItem('userData')
        if(data!==null){
            let userData = JSON.parse(data)
            if(userData.isPRO===true)
            this.props.history.push('/user-profile')
          this.setState({ 
              firebaseUID:userData.firebaseUID,
              userData
          })
        }
    }
    onToken = (token, addresses) => {
        if(this.state.firebaseUID.length>0){
            let body={
                firebaseUID:this.state.firebaseUID
            }
            fetch(url+'/api/becomePRO',{body:JSON.stringify(body),method:"PUT",headers:headers})
            .then(res=>res.json())
            .then(response=>{
                if(response.message==='Success'){
                    this.props.becomePRO()
                    let user={
                        ...this.state.userData
                    }
                    user.isPRO=true
                    localStorage.setItem('userData',JSON.stringify(user))
                    this.props.history.push('/user-profile')
                    message.success("Congratulations! You've become a PRO user")
                }
            })

        }
        // TODO: Send the token information and any other
        // relevant information to your payment process
        // server, wait for the response, and update the UI
        // accordingly. How this is done is up to you. Using
        // XHR, fetch, or a GraphQL mutation is typical.
      };
    
    
    render() {
                const onSuccess = (payment) => {
          // Congratulation, it came here means everything's fine!
        if(payment.paid===true){
            if(this.state.firebaseUID.length>0){
                let body={
                    firebaseUID:this.state.firebaseUID
                }
                fetch(url+'/api/becomePRO',{body:JSON.stringify(body),method:"PUT",headers:headers})
                .then(res=>res.json())
                .then(response=>{
                    if(response.message==='Success'){
                        this.props.becomePRO()
                        let user={
                            ...this.state.userData
                        }
                        user.isPRO=true
                        localStorage.setItem('userData',JSON.stringify(user))
                        this.props.history.push('/user-profile')
                        message.success("Congratulations! You've become a PRO user")
                    }
                })

            }
        }
      }		

      const onCancel = (data) => {
          // User pressed "cancel" or close Paypal's popup!
          console.log('The payment was cancelled!', data);
      }	

      const onError = (err) => {
          // The main Paypal's script cannot be loaded or somethings block the loading of that script!
          console.log("Error!", err);		
      }			

      let env = 'sandbox'; // you can set here to 'production' for production
      let currency = 'USD'; // or you can set this value from your props or state  
      let total = 4.95;  // same as above, this is the total amount (based on currency) to be 
      let locale = 'en_US'; 
      // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
      let style = {
          'label':'pay', 
          'tagline': false, 
          'size':'medium', 
          'shape':'pill', 
          'color':'gold'
      };

      const client = {
      sandbox:    'Ac3fi9IJihHJK__iAls2ZfFq7t7X327iR_KSBf75479hK9lcHHYuDsIDAStk7kin8_nFFkSpKmRW5qYn',
      production: 'AVsPdvCNZ5I0OB13_4fe2zE1feaqD_lL9b2jZbmhwuCCOyiL72ZhJfgp0WsNap_6ZcRaUr10pXRA_FLx',
      }
        return (
            <div className="Shipping-container">
                <Navbar />

                <div className="Shipping-body">
                    <ProfileSidebar />
                    <div style={{width:'100%',padding:'10px'}}>
                        <img alt='insert plan' style={{width:600}} src={imageSource}/>
                    <div style={{width:"70%",display:"flex",justifyContent:"space-around"}}>
                       
                    <StripeCheckout
        amount="495"
        description="Pay now and avail lifetime subscription for PRO user features"
        image="https://d33wubrfki0l68.cloudfront.net/ca0061c3c33c88b2b124e64ad341e15e2a17af49/c8765/images/alligator-logo3.svg"
        locale="auto"
        name="Become PRO"
        label='Pay with Stripe'
        stripeKey="pk_live_CcUK62qR7iD5ObbtumrdKI1U000PBiKFcJ"
        token={this.onToken}
        zipCode
      />


                <PaypalBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                locale={locale} 
                style={style}
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} />

                    </div>

                    </div>
                    
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

export default connect(mapStateToProps, mapActionsToProps)(ProUser)
