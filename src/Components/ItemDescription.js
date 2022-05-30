import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import mobile1 from './images/mobile1.jpg'
import googleplaystore from './images/googlplaystore.png'
import { Divider,Avatar,Button,Modal,Input,Tooltip,message} from 'antd'
import { Icon } from '@ant-design/compatible';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './CSS/ItemDescription.css'
import "video-react/dist/video-react.css"; // import css
import { Facebook,Tumblr,Twitter,Linkedin,Pinterest,Reddit,Xing,Mail } from 'react-social-sharing';
import { setUIDAction, setUserInfoAction,pushListingAction,renderItemAction,favoriteItemAction,setFavoriteAction } from "../store/actions/actions";
import { connect } from "react-redux";
import { Player } from 'video-react';
import { url,headers } from '../Constants'
import ReactSelect from 'react-select'
import StripeCheckout from 'react-stripe-checkout';
import Map from './Maps'

import PaypalBtn from 'react-paypal-checkout';

const width = window.screen.width;
class ItemDescription extends Component {
    constructor(props){
        super(props)
        this.initialState={
            windowWidth:width,
            selectedItem:null,
            copyText:"Click to Copy",
            showReportModal:false,
            reasons:[
                {
                label:"Scam or Fraud",
                value:1
                },
                
                {
                label:"Inappropriate item or content (such as images, sentences etc.).",
                value:2
                },
                {
                label:"Violence",
                value:3
                },
                {
                label:"I own this product",
                value:4
                },
                {
                label:"Other",
                value:4
                }
    
        ],
        loading:false,
        reason:"",
        email:"",
        description:'',
        showBuyModal:false,
        userData:null,
        final:0
        }
        this.state={
            ...this.initialState
        }
        this.handleReport=this.handleReport.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount(){
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width});
        })  
        let listingID = this.props.match.params.index
        if(listingID!==null||listingID!==undefined){
            fetch(url+'/api/listingByListingID'+listingID)
            .then(res=>res.json())
            .then(response=>{
                if(response.message==='Success'){
                    this.props.renderItem(response.result)
                    this.setState({
                        selectedItem:response.result.doc
                    })
                    let listing = response.result.doc
                    let price = listing.price
                    if(listing.shippingID!==undefined){
                        if(listing.shippingID.type==='Domestic'){
                            price+=listing.shippingID.domCost
                            this.setState({
                                final:price
                            })
                        }
                        else if(listing.shippingID.type==='International' || listing.shippingID.type==='both'){
                            price+=listing.shippingID.intCost
                            this.setState({
                                final:price
                            })
                        }
                    }
                    this.setState({
                        final:price
                    })
                }
            })
        }
        let userData = localStorage.getItem('userData')
        if(userData!==null){
            let data = JSON.parse(userData)
            this.setState({
                userData:data
            })
        }

    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleReport(){
        let {reason,email,description} = this.state
        if(email.length<5){
            message.error('Email is required')
        }
        else if(reason.length<3){
            message.error('Reason is required')

        }else if(description.length<50){
            message.error('Minimum 50 characters required for description')
        }
        else{
            this.setState({
                loading:true
            })
            setTimeout(()=>{
                message.success("Your report has been successfully submitted, we'll get back to you soon!")
                this.setState({
                    ...this.initialState
                })
            },2000)
        }
    }
    onToken = (token, addresses) => {
        if(this.state.firebaseUID.length>0){
            let body={
                sellerDetails:this.props.item.userData._id,
                buyerDetails:this.state.userData!==null?this.state.userData._id:"",
                shippingProfile:this.props.item.doc.shippingID
            }
            

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
                console.log(payment)
                    let body={
                        sellerDetails:this.props.item.userData._id,
                        buyerDetails:this.state.userData!==null?this.state.userData._id:"",
                        shippingProfile:this.props.item.doc.shippingID._id,
                        listingDetail:this.props.item.doc._id,
                        shippingAddress:payment.address,
                        firebaseUID:this.state.userData!==null?this.state.userData.firebaseUID:"",
                        sellerfirebaseID:this.props.item.userData.firebaseUID,
                        amount:this.state.final
                    }
                    fetch(url+'/api/createOrder',{body:JSON.stringify(body),method:"POST",headers:headers})
                    .then(res=>res.json())
                    .then(response=>{
                        if(response.message==='Success'){
                            this.props.history.push('/')
                            message.success("Congratulations! Your order has been succesfully created")
                        }
                    })
    
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
        const images =[
            { poster:mobile1,
            src:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4"},
            { image:mobile1},
            { image:mobile1},
            { image:mobile1},
            {image:googleplaystore}
        ]
        return (
            <div className="item-description-container">
                        <Navbar />

                        <div className="item-description-inner-container">  
                            <div className="item-description-body">    
                                    <Carousel autoPlay={false} showThumbs={false} showStatus={false} width={(this.state.windowWidth<=460) ? 300 :(this.state.windowWidth<=575) ? 400 :(this.state.windowWidth<=768) ? 500 :(this.state.windowWidth<=940) ? 600 : (this.state.windowWidth<=1024) ? 500 : 600} infiniteLoop>
                                            {this.props.item!==null && (this.props.item.doc.video!==undefined && <Player
                                            playsInline
                                            fluid={false}
                                            src={this.props.item.doc.video}
                                            width={(this.state.windowWidth<=460) ? 290 :(this.state.windowWidth<=575) ? 390 :(this.state.windowWidth<=768) ? 490 :(this.state.windowWidth<=940) ? 590 : (this.state.windowWidth<=1024) ? 490 : 590}
                                            height={400}
                                            poster={this.props.item.doc.imageLinks[0]}
                                            />)}
                                            {
                                                this.props.item!==null?this.props.item.doc.imageLinks.map(item=>{
                                                    return <img src={item} alt='item not found' style={{height:'400px'}} />
                                                }):images.map(item=>{
                                                    if(item.src){
                                                        return <Player
                                                        playsInline
                                                        fluid={false}
                                                        height={400}
                                                        poster={item.poster}
                                                        src={item.src}
                                                        />
                                                    }
                                                    else{
                                                        return <img src={item.image} alt='item not found' style={{height:"400px"}}/>
                                                    }
                                                })
                                            }
                                    </Carousel>
                                    <div className="item-description-item-detail" style={{marginLeft:'20px'}}>
                                        <div className="item-description-price-section">
                                                <h2>${this.props.item!==null?this.props.item.doc.price:0}</h2>
                                            <div style={{display:'flex',alignItems:'center'}}>
                                                <Link to="/chat"><Icon type="wechat" style={{fontSize:'25px',marginRight:'20px'}} key="heart" /></Link>
                                                <Icon onClick={()=>{
                                                  if(this.props.UID!==''){
                                                   if(this.props.isFavorited===true){
                                                       
                                                   }
                                                  }
                                                if(this.props.isFavorited===true){
                                                    this.props.setFavorite(false)
                                                    
                                                }else{
                                                    this.props.setFavorite(true)

                                                }

                                                }} type="heart" theme={this.props.isFavorited===true?"filled":"outlined"} style={{fontSize:'20px',marginRight:'20px'}}  key="heart" />
                                                <Icon onClick={()=>{
                                                    this.setState({
                                                        showShareModal:true
                                                    })
                                                }} type="share-alt" style={{fontSize:'20px',marginRight:'20px'}} key="share-al" />
                                                <Button type='primary' onClick={()=>{
                                                    this.setState({
                                                        showReportModal:true
                                                    })
                                                }} danger={true} shape='round' style={{backgroundColor:"darkgreen",borderColor:"darkgreen"}}>Report</Button>

                                            </div>
                                        </div>
                                                
                                                <h1 style={{fontSize:'30px'}}>{this.props.item!==null && this.props.item.doc.title}</h1>
                                        <div style={{width:'100%',height:"300px",overflowY:'auto'}}>
                                                <p style={{fontSize:'16px'}} >
                                                    {this.props.item!==null?this.props.item.doc.description:
                                                    `As Cicero would put it, “Um, not so fast.”
                                                    The placeholder text, beginning with the line 
                                                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit”, 
                                                    looks like Latin because in its youth, centuries ago, it was Latin.
                                                    Richard McClintock, a Latin scholar from Hampden-Sydney College, 
                                                    is credited with discovering the source behind the ubiquitous filler text. 
                                                    In seeing a sample of lorem ipsum, his interest was piqued by 
                                                    consectetur—a genuine, albeit rare, Latin word. Consulting a Latin 
                                                    dictionary led McClintock to a passage from De Finibus Bonorum et Malorum 
                                                    (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman
                                                    philosopher Cicero.`}
                                                </p>
                                        </div>
                                    </div>
                            </div>                           
                        </div>
                        <hr style={{width:'80%',marginTop:'20px'}} /> 

                        <div  style={{display:'flex',justifyContent:'center'}}>
                            <div style={(this.state.windowWidth<=768) ? {width:'80%',display:'flex',flexDirection:'column'} : {width:'80%',display:'flex',justifyContent:'space-evenly'}}>
                                <div style={(this.state.windowWidth<=768) ? {display:'flex',flexDirection:'column',alignItems:'center'} : null }>
                                    <h1 style={{color:'darkcyan'}}>Seller detail</h1>
                                    <h4 style={{fontWeight:'bold'}}>Name:{this.props.item!==null&&this.props.item.userData.fName}</h4>
                                    <Avatar className="avatar" shape={'square'} size={150} src={this.props.userInfo!==null?this.props.userInfo.profilePic:"https://firebasestorage.googleapis.com/v0/b/pureartisann.appspot.com/o/artisan%2Fimage1576146196579?alt=media&token=ad528ce7-a843-4548-8737-39337d71cb35"} style={{ alignSelf:"center" }} />
                                </div>
                                {this.props.item!==null && <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <h1 style={{color:'darkcyan'}}>Shipping Details</h1>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        {this.props.item.doc!==undefined ? (this.props.item.doc.shippingID!==undefined && (this.props.item.doc.shippingID.type==='Domestic' || this.props.item.doc.shippingID.type==='both')?<div style={{marginRight:'30px'}}>
                                            <h2 style={{textDecoration:'underline'}}>Domestic</h2>
                                                    <h4 ><b>Delivery Service: {this.props.item!==null && this.props.item.doc.shippingID.domesticService}</b></h4>
                                            <h4><b>Delivery Time: {this.props.item!==null && this.props.item.doc.shippingID.domDelivery.from} to {this.props.item!==null && this.props.item.doc.shippingID.domDelivery.to} days</b></h4>
                                                    <h4><b>Delivery Charges: ${this.props.item!==null && this.props.item.doc.shippingID.domCost}</b></h4>
                                        </div>:""):"" }
                                        {this.props.item.doc!==undefined ? (this.props.item.doc.shippingID!==undefined &&(this.props.item.doc.shippingID.type==='International' || this.props.item.doc.shippingID.type==='both')?<div>
                                            <h2 style={{textDecoration:'underline'}}>International</h2>
                                                    <h4 ><b>Delivery Service: {this.props.item!==null && this.props.item.doc.shippingID.internationalService}</b></h4>
                                            <h4><b>Delivery Time: {this.props.item!==null && this.props.item.doc.shippingID.intDelivery.from} to {this.props.item!==null && this.props.item.doc.shippingID.intDelivery.to} days</b></h4>
                                                    <h4><b>Delivery Charges: ${this.props.item!==null && this.props.item.doc.shippingID.intCost}</b></h4>
                                        </div>:""):"" }
                                    </div>
                                    {this.props.item.doc.shippingID===undefined && <h3><b>*This item is for Pickup only.</b></h3>}                                    
                              </div>}
                            </div>
                        </div>

                        <div style={{width:"100%",display:'flex',flexDirection:"column",alignItems:"center",marginTop:'50px',marginBottom:'20px'}}>
                            <StripeCheckout
                                style={{width:250,borderRadius:30,marginBottom:10}}
                                amount={this.props.item!==null?(this.props.item.doc.price*100).toString():"495"}
                                description="Pay now for the listing"
                                image="https://d33wubrfki0l68.cloudfront.net/ca0061c3c33c88b2b124e64ad341e15e2a17af49/c8765/images/alligator-logo3.svg"
                                locale="auto"
                                name="Buy item"
                                label='Pay with Stripe'
                                stripeKey="pk_live_CcUK62qR7iD5ObbtumrdKI1U000PBiKFcJ"
                                token={this.onToken}
                                zipCode
                                shippingAddress
                            />


                            <PaypalBtn 
                                env={env} 
                                client={client} 
                                currency={currency} 
                                total={this.props.item!==null?this.state.final:total} 
                                locale={locale} 
                                style={style}
                                onError={onError} 
                                onSuccess={onSuccess} 
                            />
                        </div> 

                        <hr style={{width:'80%',marginTop:'20px'}} /> 
                        
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <div style={{width:'80%'}}>
                                <h1 style={{color:'darkcyan'}}>Seller location</h1>
                                <br/>
                                <div style={{height:550}}>
                                    <Map markerLocation={this.props.currentLocation}/>
                                </div>
                            </div>
                        </div>
                        <div style={{width:'100%',display:'flex',justifyContent:'center',marginBottom:20}}>
                            <div style={{width:'80%'}}>
                                <Divider><p>Share listings with your friends</p></Divider>
                                {
                                    
                                    this.state.windowWidth <=425 ?
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'cemter'}}> 
                                            <Facebook solidcircle large link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Twitter solidcircle large link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Linkedin solidcircle large link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Tumblr solidcircle large link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Pinterest solidcircle large link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Reddit solidcircle large link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Xing solidcircle large link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Mail solidcircle large link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>                         
                                        </div>
                                    :
                                    this.state.windowWidth <= 768 ?
                                        <div style={{display:"flex",justifyContent:'center'}}>
                                        
                                            <Facebook solidcircle small link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Twitter solidcircle small link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Linkedin solidcircle small link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Tumblr solidcircle small link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Pinterest solidcircle small link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Reddit solidcircle small link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Xing solidcircle small link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Mail solidcircle small link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>                         
                                        </div>
                                    :
                                        <div style={{display:"flex",justifyContent:'center'}}> 
                                            <Facebook solidcircle medium link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Twitter solidcircle medium link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Linkedin solidcircle medium link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Tumblr solidcircle medium link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Pinterest solidcircle medium link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Reddit solidcircle medium link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Xing solidcircle medium link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>
                                            <Mail solidcircle medium link={`https://pureartisan.com/itemdescription/${this.props.item!==null?this.props.item.doc.listingID:"sad"}`}/>                         
                                        </div>
                                }
                            </div>
                        </div>
                        <Modal  visible={this.state.showShareModal}  onCancel={()=>{this.setState({showShareModal:false})}}>
                           <img
                           src={this.state.selectedItem!==null ? this.state.selectedItem.imageLinks[0]:""}
                            alt='nothing'
                            style={{ width:'100%',height:300}}                            
                           />
                          <br/>
                          <br/>
                          <br/>
                          <div>
                          <Tooltip title={this.state.copyText} placement='topLeft' arrowPointAtCenter>
                          <Input
                          onClick={()=>{
                            console.log('shdfoaisdhf')
                            this.listingURL.select();
                            document.execCommand('copy');
                            this.setState({
                              copyText:"Copied"
                            })
                            setTimeout(()=>{
                              this.setState({ 
                                copyText:"Click to Copy"
                              })
                            },2000)
                          }}
                                      ref={(listingURL) => this.listingURL = listingURL}
                          value={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}

                          />
                          </Tooltip>
                          </div>
                          <br/>
                          <br/>

                          <div style={{display:'flex',justifyContent: 'center',flexWrap:'wrap'}}>
                            
                                               <Facebook solidcircle medium  link={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}/>
                                                <Twitter solidcircle medium  link={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}/>
                                                <Linkedin solidcircle medium  link={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}/>
                                                <Tumblr solidcircle medium  link={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}/>
                                                <Pinterest solidcircle medium  link={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}/>
                                                <Reddit solidcircle medium  link={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}/>
                                                <Xing solidcircle medium  link={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}/>
                                                <Mail solidcircle medium  link={`https://pureartisan.com/itemdescription/${this.state.selectedItem!==null?this.state.selectedItem.listingID:"sad"}`}/>
                                           
                          </div>    
                          <br/>
                          
                            </Modal>
                        <Modal footer={null}  visible={this.state.showReportModal}  onCancel={()=>{this.setState({showReportModal:false})}}>
                           <div style={{display:"flex",justifyContent:'center',flexDirection:"row",padding:10}}>
                               <h2 style={{textDecoration:'underline',textAlign:"center"}}>Report Listing</h2>
                               <br/>
                           </div>
                          <div style={{width:'90%',padding:10}}>
                              <p>Your identity will be kept confidential under our <Link to='privacy-policy'>Privacy Policy.</Link></p>
                              <Input
                              placeholder='Enter your email'
                              type='email'
                              autoComplete='off'
                              name='email'
                              onChange={this.handleChange}
                              />
                              <br/>
                              <br/>
                              <ReactSelect   placeholder="Select Reason" options={this.state.reasons} onChange={(val) => {
                                  this.setState({
                                      reason:val.label
                                  })
                            }} />
                            <br/>
                            <Input.TextArea
                            rows={3}
                            onChange={this.handleChange}
                            style={{resize:"none"}}
                            placeholder='Describe your report in few sectences'
                            minlength={100}
                            name='description'
                            ></Input.TextArea>
                          </div>
                          <div style={{display:'flex',justifyContent:'center',flexDirection:"row"}}>

                          <Button onClick={this.handleReport} loading={this.state.loading} disabled={this.state.loading} type='danger' danger size='large' shape='round'>Report</Button>
                          </div>
                            </Modal>
                     <Modal footer={null}  visible={this.state.showBuyModal}  onCancel={()=>{this.setState({showBuyModal:false})}}>
                            <br/>
                            <br/>
                            <h2 style={{textDecoration:'underline',textAlign:"center"}}>Enter Order Details</h2>
                            <br/>
                            <h3>Shipping Address</h3>
                            <label for='addr1'>*Address Line 1</label>
                            <Input
                              placeholder='Address Line 1'
                              autoComplete='off'
                              name='addr1'
                              maxLength={50}
                              onChange={this.handleChange}
                              />
                              <br/>
                            <label for='addr2'>Address Line 2</label>
                            <Input
                              placeholder='Address Line 2'
                              autoComplete='off'
                              name='addr2'
                              onChange={this.handleChange}
                              />
                              <br/>

                            
                    </Modal>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return ({
        UID:state.rootReducer.UID,
        userInfo:state.rootReducer.userInfo,
        categories:state.rootReducer.categories,
        listingCategories:state.rootReducer.listingCategories,
        item:state.rootReducer.item,
        currentLocation:state.rootReducer.currentLocation,
        isFavorited:state.rootReducer.isFavorited
    })
}
function mapActionsToProps(dispatch) {
    return ({
        setUID: (UID) => {
            dispatch(setUIDAction(UID))
        },
        setUserInfo: (info) => {
            dispatch(setUserInfoAction(info))
        },
        pushListing:(listing)=>{
            dispatch(pushListingAction(listing))
        },
        renderItem:(item)=>{
            dispatch(renderItemAction(item))
        },
        setFavorite:(type)=>{
            dispatch(setFavoriteAction(type))
        },
        favoriteItem:(id)=>{
            dispatch(favoriteItemAction(id))
        }
    })
}
export default connect(mapStateToProps, mapActionsToProps)(ItemDescription)