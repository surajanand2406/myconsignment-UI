import React, { Component } from 'react'
import {connect} from 'react-redux'
import Navbar from './Navbar'
import Gallery from 'react-grid-gallery';
import './CSS/Sponsor.css'
import { Button,Divider,Modal,Input} from 'antd'
import {Line} from 'react-chartjs-2'
import {Link} from 'react-router-dom'
import {ReadEvent,AddDonation} from '../store/actions/SponsorAction'
import StripeCheckout from 'react-stripe-checkout';

import PaypalBtn from 'react-paypal-checkout';

class Sponsor extends Component {

    state={

        imageWdith:70,
        imageHeight:70,


        isModal:false,
        input:'',                        
        donation:81,
        donationValue:10
    }


/////Commponent Did Mount

componentDidMount(){

    this.props.readEvent();
  
}

onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
  };

handleDonationInput=(e)=>{
    this.setState({input:e.target.value})
}

handleDonation=(Id)=>{

   var amount = parseInt(this.state.input);

   this.setState({input:'',isModal:false})

   this.props.addDonation({Id:Id,Donation:amount});
}

    
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
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
        sandbox:    'AebZVgTaxE1-E1ACZ-q5lAqMWoNyM7oIdrqswPk8QVR52TdnfqpZ21xHmkxYnMnrFjvDNiKKgD05OPgB',
        production: 'YOUR-PRODUCTION-APP-ID',
        }

        var Data={
            Id:'',
            Title:'',
            TargetedAmount:0,
            Donation:0,
            GraphData:[],
            Comments:[],

            event:''
        };
    
        this.props.sponsorData.map(data=>{
            
            Data.Id = data._id;
            Data.Title = data.Title;
            Data.TargetedAmount = data.TargetedAmount;
            Data.Donation = data.Donation;
            Data.GraphData = data.GraphData;
            Data.Comments = data.Comments;


            Data.event = data.event;
    
    
        })
        

        const lineData = {
            labels: [
                'Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7','Day 8','Day 9','Day 10',
                'Day 11','Day 12','Day 13','Day 14','Day 15','Day 16','Day 17','Day 18','Day 19','Day 20',
                'Day 21','Day 22','Day 23','Day 24','Day 25','Day 26','Day 27','Day 28','Day 29','Day 30',
            ],
            datasets: [
              {
                fill: false,
                lineTension: 0.1,
                borderColor: 'rgba(75,192,192,1)',
                pointBorderColor: 'red',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'red',
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                data: Data.GraphData
              }
            ]
          };


          var chartOptions = {
            showScale: true,
            pointDot: true,
            showLines: true,
            legend:{
                    display:false
            },

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        min: 0,
                        max: Data.TargetedAmount,
                        callback: function(label) {
                            return '$'+ label;}
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Amount'
                    }
                    }]
             }
        }

    
        return (
            <div className="sponsor-container">
                <Navbar />
                {
                        Data.event === 'No Event Started' ?
                        
                        <>
                            <h1 style={{textAlign:'center',color:'lightgray',marginTop:'50px'}}>No Event Started</h1>
                        </>
                    :

                        <div className="sponsor-body-container">
                            <div className="sponsor-body">
                                
                                <div className="sponsor-title">
                                    <div >
                                        <h1 style={{margin:0}}>{Data.Title}</h1>
                                        <h3 style={{margin:0}}>Targeted Amount: ${Data.TargetedAmount}</h3>
                                        <h4>Remaining Amount: ${Data.TargetedAmount - Data.Donation}</h4>
                                    </div>


                                    <Button size="large" shape="round" style={{backgroundColor:'darkgreen',color:'white',width:'130px'}} onClick={()=>this.setState({isModal:true})}>Donate Now</Button>

                                    <Modal visible={this.state.isModal} footer={null} onCancel={()=>this.setState({isModal:false})}>
                                   <div >
                                       <h2 style={{textAlign:'center'}}>You can easily sponsor our projects via</h2>
                                       <h2 style={{textAlign:'center'}}>PayPal or Stripe.</h2>
                                    <br/>
                                    <br/>
                                    <p style={{textAlign:'left !important'}}>Enter your name</p>
                                    <Input
                                    type='text'
                                    placeholder='Name'
                                    />
                                    <br/>
                                    <p>Enter your email</p>
                                    <Input
                                    type='email'
                                    placeholder='Email'
                                    />
                                    <br/>
                                    <p>Enter amount:</p>
                                    <Input
                                    type='number'
                                    min={10}
                                    step={5}
                                    value={this.state.donationValue}
                                    />
                                    <br/>
                                    <br/>
                                   <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                                   <StripeCheckout
                                    style={{width:250,borderRadius:30,marginBottom:10}}
                                    amount={this.state.donationValue*100}
                                    description="Pay now to sponsor our project"
                                    image="https://d33wubrfki0l68.cloudfront.net/ca0061c3c33c88b2b124e64ad341e15e2a17af49/c8765/images/alligator-logo3.svg"
                                    locale="auto"
                                    name="Sponsor Project"
                                    label='Pay with Stripe'
                                    stripeKey="pk_test_1CMaItiiBzBcG04N2X5l8WSU001Sc0miox"
                                    token={this.onToken}
                                    zipCode
                                />

                                    <PaypalBtn 
                                    env={env} 
                                    client={client} 
                                    currency={currency} 
                                    total={this.state.donationValue} 
                                    locale={locale} 
                                    style={style}
                                    onError={onError} 
                                    onSuccess={onSuccess} />
                                  </div>
                                  
                                   </div>
                                    </Modal>
                                
                                </div>
                                <Divider><h1>...</h1></Divider>
                                <div className="sponsor-graph-area">
                                    <Line data={lineData} options={chartOptions} width="100%" height="40%" />
                                </div>
                                <Divider><h1>...</h1></Divider>
                                <div className="sponsor-latest-update-section">
                                    <h1 style={{fontSize:'30px',textAlign:'center'}}>Latest Update</h1>
                                    {

                                        Data.Comments == null ? ""
                                        :
                                        Data.Comments.map(cData=>{
                                            return(
                                                <div className="sponsor-latest-update-News-section">
                                                    <div className="news">
                                                        <div className="gallery">
                                                            <Gallery images={cData.Images} />
                                                        </div>
                                                        <div className="text">
                                                            <h5 style={{fontFamily:'Times New Roman',fontSize:'20px'}}>{cData.Text}</h5>
                                                        </div>
                                                    </div>
                                                        
                                                </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    console.log(state.SponsorReducer.SponsorData)
    return{
        sponsorData:state.SponsorReducer.SponsorData
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        readEvent:()=>{dispatch(ReadEvent())},
        addDonation:(donatedAmount)=>{dispatch(AddDonation(donatedAmount))}
}
}



export default connect(mapStateToProps,mapDispatchToProps)(Sponsor);

