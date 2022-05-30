import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/ExclusiveNavbar.css'
import {Link,Redirect} from 'react-router-dom'
import {countries} from './countries'
import {Modal,Drawer,Input,Form,Button,Divider,Select,Checkbox,message} from 'antd'
import { Icon } from '@ant-design/compatible';
import {RequestForRegisteration,ReadExclusiveUserData} from '../../store/actions/ExclusiveUserAction'
import Artisan from '../footerImage.png'


var width = window.screen.width;
class ExclusiveNavbar extends Component {

    state={
        windowWidth:width,
        isSideBar:false,
        isLogin:false,
        isRegister:false,
        isOther:false,
        Name:'',
        EmailForReg:'',
        Contact:'',
        Category:'',
        otherCategory:'',
        Country:'',
        Detail:'',
        isLogedin:false,
        userId:'',
        firebaseUID:'',
        exclusiveUserData:null,

        EmailForLogin:'',
        Password:''

    }

    componentDidMount(){


        var userData = localStorage.getItem('userData')

        if(userData)
        {
            var data = JSON.parse(userData)
            this.setState({firebaseUID:data.firebaseUID})
        }
        
        var Edata = localStorage.getItem('ExclusiveUser');
        if(Edata)
        {
            this.setState({exclusiveUserData:JSON.parse(Edata)})
        }
        else
        {
            this.setState({exclusiveUserData:null})
        }

        //this.setState({firebaseUID:JSON.parse(userData.firebaseUID)})


        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width})
        }) 

        this.props.readUserData();
        
    }


    handleRegisterationFormValue=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleRegister=()=>{

        var emailReg =/\S+@\S+\.\S+/;
        var numReg = /^[0-9\b]+$/;
        var nameReg = /^[a-zA-Z ]*$/;

        if(!emailReg.test(this.state.EmailForReg))
        {
            message.error("wrong email Pattern...")
        }
        else if(!numReg.test(this.state.Contact))
        {
            message.error("Contact Contain Only numbers..")
        }
        else if(!nameReg.test(this.state.Name))
        {
            message.error("Name must containe only alphabets..")
        }
        else
        {

            if(this.state.isOther===true)
            {
                if(this.state.Name.trim() !== '' && this.state.EmailForReg.trim() !== '' && this.state.Contact.trim() !== '' && this.state.otherCategory.trim() !== '' && this.state.Country.trim() !== '' && this.state.Detail.trim() !== '')
                {
                    var isDuplicate = false

                    this.props.userData.map(data=>{
                        if(data.Email === this.state.EmailForReg)
                        {
                            isDuplicate = true
                        }
                    })


                    if(isDuplicate === true)
                    {
                        message.error("Email Already Exist...")
                    }
                    else
                    {
                        const valuesObj={
                            CompanyName:this.state.Name,
                            Email:this.state.EmailForReg,
                            Contact:this.state.Contact,
                            Category:this.state.otherCategory,
                            Country:this.state.Country,
                            Detail:this.state.Detail,
                            Image:'https://images.pexels.com/photos/3563888/pexels-photo-3563888.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
                            Password:'',
                            isRegister:false,
                            firebaseUID:this.state.firebaseUID
        
                        }
                        

                        this.setState({
                            CompanyName:'',
                            Email:"",
                            Contact:'',
                            Category:"",
                            OtherCatergory:'',
                            Country:"",
                            Detail:'',
                            isRegister:''
                        })
                        this.props.requestForRegistration(valuesObj);
                    }
                }
                else
                {
                    message.error("Please Fill All Fields Or If You Checked Other Category Than please fill")
                }
            }
            else
            {
                if(this.state.Name.trim() !== '' && this.state.EmailForReg.trim() !== '' && this.state.Contact.trim() !== '' && this.state.Category.trim() !== '' && this.state.Country.trim() !== '' && this.state.Detail.trim() !== '')
                {

                    var isDuplicate = false

                    this.props.userData.map(data=>{
                        if(data.Email === this.state.EmailForReg)
                        {
                            isDuplicate = true
                        }
                    })

                    if(isDuplicate === true)
                    {
                        message.error("Email Alread Exist..")
                    }
                    else
                    {
                        const valuesObj={
                            CompanyName:this.state.Name,
                            Email:this.state.EmailForReg,
                            Contact:this.state.Contact,
                            Category:this.state.Category,
                            Country:this.state.Country,
                            Detail:this.state.Detail,
                            Image:'https://images.pexels.com/photos/3563888/pexels-photo-3563888.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
                            Password:'',
                            isRegister:false,
                            firebaseUID:this.state.firebaseUID
                        }

                        console.log(valuesObj)

                        this.setState({
                            Name:'',
                            EmailForReg:"",
                            Contact:'',
                            Category:"",
                            OtherCatergory:'',
                            Country:"",
                            Detail:'',
                            isRegister:false
                        })

                        this.props.requestForRegistration(valuesObj);
                    }
                    
                }
                else
                {
                    message.error("Please Fill All Fields")
                }
            }  
        }   
    }

    handleLogIn=()=>{

        const RegisteredUser = this.props.userData.filter(data=>{
            return data.isRegistered === true
        })

        if(this.state.EmailForLogin.trim() !== '' && this.state.Password.trim() !== '')
        {
            var matched=false;
                
            RegisteredUser.map(user=>{
                if(user.Email === this.state.EmailForLogin && user.Password === this.state.Password)
                {   
                    matched = true
                    localStorage.setItem('ExclusiveUser',JSON.stringify(user))
                    this.setState({userId:user._id})
                }   
            })

            if(matched === true)
            {
                this.setState({isLogedin:true})
            }
            else
            {
                message.error("Wrong Email Or Password");
            }
        }
        else
        {
            message.error("Please Fill All Fields")
        }
    }

    render() {
        console.log(this.state.exclusiveUserData)
        if(this.state.isLogedin === true)
        {
           return <Redirect to={`/exclusive-services/${this.state.userId}/seller-dashboard`} /> 
        }
        else
        {

            return (
                <div className="ExclusiveServices-Container">
                    <div className="ExclusiveServices-Nav">
                        <div>
                            {/* <h2 style={{color:'white',margin:0,marginLeft:'5px'}}>Exclusive Services</h2>        */}
                            <img
                                    src={Artisan}
                                    alt='logo'
                                    width='200'
                                    className='exlusiveLogon'
                                    style={{color:'white',width:200,filter:'white'}}
                                    />
                        </div>
                        <div className="nav-menu">
                            <Icon type="menu" style={{fontSize:'25px',color:"white"}} onClick={()=>{this.setState({isSideBar:true})}} />
                        </div>
                        <div className="ExclusiveServices-Nav-menu">
                            <Link className="link" to="/exclusive-services"  style={{marginRight:'15px',color:"white",fontSize:16}}>Services</Link>
                          {this.state.exclusiveUserData ===null &&<Link className="link" to="/exclusive-services-my-orders" style={{marginRight:'15px',color:'white',fontSize:16}}>My Orders</Link>}
                          {this.state.exclusiveUserData===null &&<Link className="link" to="/exclusive-services-messeges"  style={{marginRight:'15px',color:'white',fontSize:16}}>Messages </Link>}
                          {this.state.exclusiveUserData ===null && <Link className="link" onClick={()=>this.setState({isLogin:true})}   style={{marginRight:'15px',color:'white',fontSize:16}}>Seller Login</Link>}
                          {this.state.exclusiveUserData !== null&& <Link className="link" to={`/exclusive-services/${this.state.exclusiveUserData._id}/seller-dashboard`}   style={{marginRight:'15px',color:'white',fontSize:16}}>Dashboard</Link>} 
                            <Link className="link"  to="/" style={{color:'white',fontSize:16}}>Return to Marketplace</Link>
                        </div>
                    </div>
                    <div className="ExclusiveServices-body-Container">
                    </div>

                    {/*Side bar for small device*/}
                    <Drawer onClose={()=>this.setState({isSideBar:!this.state.isSideBar})} visible={this.state.isSideBar} width={this.state.windowWidth <= 576 ? "80%" : "60%"} closable={false} bodyStyle={{padding:0}} >
                            <div style={{height:'100px',width:"100%",backgroundColor:'darkcyan',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px',width:"100%"}}>
                                    {/* <h1 style={{color:'white',margin:0}}>Exclusive Services</h1> */}
                                    <img
                                    src={Artisan}
                                    alt='logo'
                                    />
                                    <Icon type="close" style={{fontSize:'20px',color:'white'}} onClick={()=>{this.setState({isSideBar:false})}} />
                                </div>
                            </div>
                            <div className="side-menu-link" style={{marginLeft:0}}>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                    <Link to="/exclusive-services" style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'18px',color:'black',borderBottom:'solid 1px lightgray'}}>Services</Link>
                                    <Link to="/exclusive-services-my-orders" style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'18px',color:'black',borderBottom:'solid 1px lightgray'}}>My Jobs</Link>
                                    <Link to="/exclusive-services-messeges"  style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'18px',color:'black',borderBottom:'solid 1px lightgray'}}>Messages</Link>
                                    <Link onClick={()=>this.setState({isLogin:true})}  style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'18px',color:'black',borderBottom:'solid 1px lightgray',display:'flex',alignItems:'center'}}>Seller Login</Link>
                                    <Link to="/" style={{padding:'15px',paddingLeft:10,width:'100%',fontSize:'18px',color:'black',borderBottom:'solid 1px lightgray'}} >Return to Marketplace</Link>
                                </div>

                            </div>
                    </Drawer>

                    {/*Login Modal*/}
                    <Modal bodyStyle={{padding:0}} visible={this.state.isLogin} onCancel={()=>this.setState({isLogin:!this.state.isLogin})} footer={null} closable={false}>
                        <div>
                            <div style={{display:"flex",justifyContent:'space-between',alignItems:'center',width:'100%',backgroundColor:'#eeeeee',padding:'10px'}}>
                                <h2 style={{margin:0,fontWeight:'bold'}}>Seller Login</h2>
                                <Icon type="close" style={{fontSize:'20px'}} onClick={()=>this.setState({isLogin:false})} />       
                            </div>
                            <Divider><h3 style={{margin:0,color:'gray'}}>Login</h3></Divider>
                            <div style={{padding:'10px'}}>
                                <Form>
                                    <Input type="email" placeholder="Enter Your Email" size="large" prefix={<Icon type="user" />} style={{marginBottom:'10px'}} onChange={(e)=>this.setState({EmailForLogin:e.target.value})} />
                                    <Input.Password placeholder="Enter Password" size="large" prefix={<Icon type="lock" />} style={{marginBottom:'10px'}} onChange={(e)=>this.setState({Password:e.target.value})} />
                                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:"row"}}>
                                    <Link><Button size="large" style={{backgroundColor:'darkgreen',color:'white'}} onClick={this.handleLogIn}>Login</Button></Link>
                                    </div>
                                </Form>
                            </div>
                            <Divider><h3 style={{margin:0,color:'gray'}}>Not Registered</h3></Divider>
                            <div style={{padding:'10px',display:'flex',justifyContent:'center'}}>
                                <h4>Click here for <Link onClick={()=>this.setState({isLogin:false,isRegister:true})} style={{fontWeight:'bold'}}>Registration</Link></h4>
                            </div>
                        </div>
                    </Modal>

                    {/*Registeration Modal*/}
                    <Modal bodyStyle={{padding:0}} style={{top:20}} visible={this.state.isRegister} onCancel={()=>this.setState({isRegister:!this.state.isRegister})} footer={null} closable={false}>
                        <div>
                            <div style={{display:"flex",justifyContent:'space-between',alignItems:'center',width:'100%',backgroundColor:'#eeeeee',padding:'10px'}}>
                                <h2 style={{margin:0,fontWeight:'bold'}}>Register as a Seller</h2>
                                <Icon type="close" style={{fontSize:'20px'}} onClick={()=>this.setState({isRegister:false})} />       
                            </div>
                            <Divider><h3 style={{margin:0,color:'gray'}}>Registration</h3></Divider>
                            <div style={{padding:'10px'}}>
                                <Form>
                                    <Input placeholder="Enter Your Company Name" name="Name" value={this.state.Name} size="large" prefix={<Icon type="user" />} style={{marginBottom:'10px'}} onChange={this.handleRegisterationFormValue} />
                                    <Input type="email" placeholder="Enter Email" name="EmailForReg" size="large" value={this.state.EmailForReg} prefix={<Icon type="mail" />} style={{marginBottom:'10px'}} onChange={this.handleRegisterationFormValue} />
                                    <Input placeholder="Enter Contact" name="Contact" size="large" value={this.state.Contact} prefix={<Icon type="phone" />} style={{marginBottom:'10px'}} onChange={this.handleRegisterationFormValue} />
                                    <Select size="large" name="Category" placeholder="Select Category" value={this.state.Category} onChange={value=>this.setState({Category:value})} style={{marginBottom:'10px'}}>
                                        <Select.Option value="Web Developer">Web Developer</Select.Option>
                                        <Select.Option value="Graphic Design">Graphic Design</Select.Option>
                                        <Select.Option value="Digital Marketing">Digital Marketing</Select.Option>
                                    </Select>
                                    <Checkbox style={{marginBottom:'10px',display:'block'}} onChange={(e)=>this.setState({isOther:e.target.checked})}>Other Category</Checkbox>
                                    <Input placeholder="Enter Category" name="otherCategory" value={this.state.otherCategory} size="large" style={this.state.isOther===true ? {marginBottom:'10px'} : {display:'none'} } onChange={this.handleRegisterationFormValue} />
                                    <Select showSearch={true} size="large" value={this.state.Country} onChange={value=>this.setState({Country:value})} placeholder="Select Country" name="Country" style={{marginBottom:'10px'}}>
                                        {
                                            countries.map(country=>{
                                                return(
                                                    <Select.Option value={country.name}>{country.name}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                    <Input.TextArea rows="8" name="Detail" value={this.state.Detail} style={{resize:'none'}} placeholder="Describe your business" onChange={this.handleRegisterationFormValue} ></Input.TextArea>
                                    <Button size="large" style={{backgroundColor:'darkgreen',color:'white'}} onClick={this.handleRegister}>Register</Button>
                                </Form>
                            </div>
                            <Divider><h3 style={{margin:0,color:'gray'}}>Already Registered?</h3></Divider>
                            <div style={{padding:'10px',display:'flex',justifyContent:'center'}}>
                                <h4>Click here for <Link onClick={()=>this.setState({isLogin:true,isRegister:false})} style={{fontWeight:'bold'}}>Login</Link></h4>
                            </div>
                        </div>
                    </Modal>



                </div> 
            )
        }
    }
}

const mapStateToProps=(state)=>{
    return{
        userData:state.ExclusiveUserReducer.ExclusiveUserData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        requestForRegistration:(userData)=>{dispatch(RequestForRegisteration(userData))},
        readUserData:()=>{dispatch(ReadExclusiveUserData())}
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(ExclusiveNavbar);
