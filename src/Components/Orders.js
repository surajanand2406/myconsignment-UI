import React, { Component } from 'react'
import {Button,Divider,Modal,Form,Input,Radio,Select} from 'antd'
import Navbar from './Navbar'
import './CSS/ShippingProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons'
import ProfileSidebar from './ProfileSidebar'
import { url,headers } from "../Constants";
import { connect } from 'react-redux';
import { Button as Btn } from '@zendeskgarden/react-buttons';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const {Option} = Select
class Order extends Component {
    constructor(props){
        super(props)
        this.initialState={
            isAddShippment:false,
            shippingCheckBoxValue:'Domestic',
            listData:[],
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
       show:true,
       shippingProfile:null,
       showUpdateModal:false
        }
        this.state={
            ...this.initialState
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.showUpdateModalFunc=this.showUpdateModalFunc.bind(this)
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleOpenModal=()=>{
        this.setState({isAddShippment:true})
    }
    handleCloseModal=()=>{
        this.setState({isAddShippment:false})
    }
    handleCloseUpdateModal=()=>{
        this.setState({showUpdateModal:false})
    }
    handleChangeShipping=(e)=>{
        this.setState({shippingCheckBoxValue:e.target.value})
    }
    componentDidMount(){
        let userData = localStorage.getItem('userData')
        let user = JSON.parse(userData)
        let UID = user.firebaseUID
        if(UID!==""){
            fetch(url+'/api/getShippings'+UID)
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
    handleSubmit(e){
        e.preventDefault()
        if(this.state.shippingCheckBoxValue==='Domestic'){
                let {domCost,domesticService,domDelivery,title,description,otherDomService} = this.state
                let data = {
                    domCost,
                    domesticService:domesticService==='Other'?otherDomService:domesticService,
                    title,
                    description,
                    domDelivery,
                    type:this.state.shippingCheckBoxValue,
                    firebaseUID:this.props.UID
                }
                console.log(data)
                if(title.length<4){
                    alert('Title must be minimum 4 characters')
                    return
                }
                if(description.length<4){
                    alert('Description must be minimum 4 characters')
                    return
                }
                if(domesticService.length<4){
                    alert('User must select shipping profile')
                    return
                }
                if(domDelivery.from.length<1 || domDelivery.to.length<1){
                    alert('Delivery time can not be less than 1 day')
                    return
                }
                fetch(url+'/api/addShipping',{method:"POST",body:JSON.stringify(data),headers:headers})
                .then(res=>res.json())
                .then(response=>{
                    if(response.message==='Success'){
                        let obj= this.initialState
                        delete obj.listData
                        this.setState({
                            ...obj
                        })
                        let updatedShipping = this.state.listData
                        updatedShipping.push(response.doc)
                        this.setState({
                            listData:updatedShipping
                        })
                    }else{
                        alert("Adding Profile failed")
                    }
                }).catch(err=>console.log(err))

        }
        else if(this.state.shippingCheckBoxValue==='International'){
            let {intCost,internationalService,intDelivery,title,description,otherIntSevice} = this.state
            let data = {
                intCost,
                internationalService:internationalService==='Other'?otherIntSevice:internationalService,
                title,
                description,
                intDelivery,
                type:this.state.shippingCheckBoxValue,
                firebaseUID:this.props.UID
            }
            console.log(data)
            if(title.length<4){
                alert('Title must be minimum 4 characters')
                return
            }
            if(description.length<4){
                alert('Description must be minimum 4 characters')
                return
            }
            if(internationalService.length<4){
                alert('User must select shipping profile')
                return
            }
            if(intDelivery.from.length<1 || intDelivery.to.length<1){
                alert('Delivery time can not be less than 1 day')
                return
            }
            fetch(url+'/api/addShipping',{method:"POST",body:JSON.stringify(data),headers:headers})
            .then(res=>res.json())
            .then(response=>{
                if(response.message==='Success'){
                    let obj= this.initialState
                    delete obj.listData
                    this.setState({
                        ...obj
                    })
                    let updatedShipping = this.state.listData
                    updatedShipping.push(response.doc)
                    this.setState({
                        listData:updatedShipping
                    })
                }else{
                    alert("Adding Profile failed")
                }
            }).catch(err=>console.log(err))
        }
        else{
            let {domCost,domesticService,domDelivery,title,description,otherDomService,intCost,internationalService,intDelivery,otherIntSevice} = this.state
            let data = {
                domCost,
                domesticService:domesticService==='Other'?otherDomService:domesticService,
                title,
                description,
                domDelivery,
                type:this.state.shippingCheckBoxValue,
                firebaseUID:this.props.UID,
                intCost,
                internationalService:internationalService==='Other'?otherIntSevice:internationalService,
                intDelivery
            }
            console.log(data)
            if(title.length<4){
                alert('Title must be minimum 4 characters')
                return
            }
            if(description.length<4){
                alert('Description must be minimum 4 characters')
                return
            }
            if(domesticService.length<4){
                alert('User must select shipping profile')
                return
            }
            if(domDelivery.from.length<1 || domDelivery.to.length<1){
                alert('Delivery time can not be less than 1 day')
                return
            }
            fetch(url+'/api/addShipping',{method:"POST",body:JSON.stringify(data),headers:headers})
            .then(res=>res.json())
            .then(response=>{
                if(response.message==='Success'){
                    let obj= this.initialState
                    delete obj.listData
                    this.setState({
                        ...obj
                    })
                    let updatedShipping = this.state.listData
                    updatedShipping.push(response.doc)
                    this.setState({
                        listData:updatedShipping
                    })
                }else{
                    alert("Adding Profile failed")
                }
            }).catch(err=>console.log(err))
        }
    }
    showUpdateModalFunc(index){

    }
    handleDelete(id){
        if(id){
            confirmAlert({
                title: 'Confirm Delete?',
                message: 'Are you sure to delete shipping profile?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {
            fetch(url+'/api/deleteShipping'+id,{method:"DELETE",headers:headers})
            .then(res=>res.json())
            .then(response=>{
                if(response.message==='Success'){
                    let updatedShipping = this.state.listData.filter(list=>list._id!==id)
                    this.setState({
                        listData:updatedShipping
                    })
                }else{
                    alert('Failed to delete shipping profile')
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
                <Navbar />

                <Button shape="circle" style={{backgroundColor:'darkcyan',color:'white',width:'85px',height:'85px',fontSize:'30px',position:'absolute',bottom:30,right:30}} onClick={()=>{
                    this.props.history.push('/shipping-profile-form')
                }} >+</Button>
                <div className="Shipping-body">
                    <ProfileSidebar />
                   <div className="Shipping-body-lists">
                    <h2 style={{textAlign:"center"}}> My Orders</h2>
                    <div className="Card">
                            <div className="card-image">
                                <img src={'https://images.pexels.com/photos/3209168/pexels-photo-3209168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'} alt='no cover' style={{maxWidth:'100%',maxHeight:'100%'}} />
                            </div>
                            <div className="card-data">
                                <div className="card-data-header">
                                <h2>My Order</h2>
                                <FontAwesomeIcon  icon={faTrash} size="lg" />

                                </div>
                                <p>sfosjfosdjfp ojapfojspodjfposjdpfo pojpoejrgpojrpogjdpfv dgperjgdfg</p>
                                <Btn className='itemBtn' style={{alignSelf:"flex-end"}}>Add Items</Btn>
                            </div>
                        </div>
                   </div>
                </div>


                <Modal
                    visible={this.state.isAddShippment}
                    closable={false}
                    footer={null}
                    style={{padding:0}}
                    bodyStyle={{padding:0}}
                    onCancel={()=>this.setState({isAddShippment:!this.state.isAddShippment})}
                >
                    <div style={{display:'flex',width:'100%',padding:'15px',justifyContent:'space-between',alignItems:'center',backgroundColor:"lightgray",margin:0}}>
                        <h1>Add Shippment</h1>
                        <FontAwesomeIcon icon={faTimes} size="2x" onClick={this.handleCloseModal} />
                    </div>
                    <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                        <Radio.Group value={this.state.shippingCheckBoxValue} onChange={this.handleChangeShipping} >
                            <Radio value="Domestic">Domestic</Radio>
                            <Radio value="International">International</Radio>
                            <Radio value="Both">Both</Radio>
                        </Radio.Group>
                    </div>
                    {
                        this.state.shippingCheckBoxValue==="Domestic" ?

                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',marginTop:'20px'}}>
                            <h2>Domestic</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Input onChange={this.handleChange}  name='title' className='form-control' style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />
                                <Input.TextArea size="large" onChange={e=>this.setState({description:e.target.value})} name='description' style={{ backgroundColor: '#fafafa', marginBottom: '10px',resize:"none" }} placeholder="Enter Description" autoSize={{ minRows: 5 }}></Input.TextArea>
                                <p>Domestic Cost:</p>
                                <Input onChange={this.handleChange} type='number' min='0' defaultValue='0'
                                placeholder='Domestic Cost'
                                name='domCost'
                                />
                                <br/>
                                <Select onChange={val=>{
                                    this.setState({
                                        domesticService:val
                                    })
                                }} placeholder='Shipping service' name='domesticService'>
                                    <Option value='DHL'>DHL</Option>
                                    <Option value='TNT Express'>TNT Express</Option>
                                    <Option value='UPS'>UPS</Option>
                                    <Option value='USPS'>USPS</Option>
                                    <Option value='FeDex'>FeD ex</Option>
                                    <Option value='Other'>--ADD--</Option>
                                </Select>
                                {this.state.domesticService==='Other' && 
                                <Input name='otherDomService' className='form-control' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />}
                               <p>Delivery Time:</p>
                                        <input
                                        name='from'
                                        autoComplete='off'
                                        type='number'
                                        min={0}
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e=>{
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.from=e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                    <input
                                        name='to'
                                        type='number'
                                        min={0}
                                        autoComplete='false'
                                        placeholder='to'
                                        style={{marginLeft:5}}
                                        onChange={e=>{
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.to=e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>

                                <Button onClick={this.handleSubmit} shape="round" style={{backgroundColor:'#B17E4E',color:'white',height:'40px',width:'150px',fontSize:'18px'}}>Add</Button>
                            </Form>
                        </div>
                        : (this.state.shippingCheckBoxValue==="International") ?

                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',marginTop:'20px'}}>
                            <h2>International</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Input onChange={this.handleChange} name='title' className='form-control' style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />
                                <Input.TextArea size="large" onChange={e=>console.log(e.target.value)} name='description' style={{ backgroundColor: '#fafafa', marginBottom: '10px',resize:"none" }} placeholder="Enter Description" autoSize={{ minRows: 5 }}></Input.TextArea>

                                <Input onChange={this.handleChange} type='number' min='0'
                                placeholder='International Cost'
                                name='intCost'
                                />
                                <br/>
                                <Select onChange={val=>{
                                    this.setState({
                                        internationalService:val
                                    })
                                }} placeholder='Shipping service' name='domesticService'>
                                    <Option value='DHL'>DHL</Option>
                                    <Option value='TNTExpress'>TNTExpress</Option>
                                    <Option value='FeDex'>FeDex</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                                {this.state.internationalService==='Other' && 
                                <Input name='otherIntSevice' className='form-control' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />}
                               <p>Delivery Time:</p>
                                        <input
                                        name='from'
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e=>{
                                            let intDelivery = this.state.intDelivery
                                            intDelivery.from=e.target.value
                                            this.setState({
                                                intDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                    <input
                                        name='to'
                                        type='number'
                                        placeholder='to'
                                        style={{marginLeft:5}}
                                        onChange={e=>{
                                            let intDelivery = this.state.intDelivery
                                            intDelivery.to=e.target.value
                                            this.setState({
                                                intDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>

                                <Button onClick={this.handleSubmit} shape="round" style={{backgroundColor:'#B17E4E',color:'white',height:'40px',width:'150px',fontSize:'18px'}}>Add</Button>
                            </Form>
                        </div>

                        : 
                        <div>

                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',marginTop:'20px'}}>
                                <h2>Domestic</h2>
                                <Form onSubmit={this.handleSubmit}>
                                <Input onChange={this.handleChange}  name='title' className='form-control' style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />
                                <Input.TextArea size="large" onChange={e=>this.setState({description:e.target.value})} name='description' style={{ backgroundColor: '#fafafa', marginBottom: '10px',resize:"none" }} placeholder="Enter Description" autoSize={{ minRows: 5 }}></Input.TextArea>
                                <p>Domestic Cost:</p>
                                <Input onChange={this.handleChange} type='number' min='0' defaultValue='0'
                                placeholder='Domestic Cost'
                                name='domCost'
                                />
                                <br/>
                                <Select onChange={val=>{
                                    this.setState({
                                        domesticService:val
                                    })
                                }} placeholder='Shipping service' name='domesticService'>
                                    <Option value='DHL'>DHL</Option>
                                    <Option value='TNTExpress'>TNTExpress</Option>
                                    <Option value='FeDex'>FeDex</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                                {this.state.domesticService==='Other' && 
                                <Input name='otherDomService' className='form-control' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />}
                               <p>Delivery Time:</p>
                                        <input
                                        name='from'
                                        autoComplete='off'
                                        type='number'
                                        min={0}
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e=>{
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.from=e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                    <input
                                        name='to'
                                        type='number'
                                        min={0}
                                        autoComplete='false'
                                        placeholder='to'
                                        style={{marginLeft:5}}
                                        onChange={e=>{
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.to=e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                        <br/>
                                <Input onChange={this.handleChange} type='number' min='0'
                                placeholder='International Cost'
                                name='intCost'
                                />
                                                                <br/>
                                <Select onChange={val=>{
                                    this.setState({
                                        internationalService:val
                                    })
                                }} placeholder='Shipping service' name='domesticService'>
                                    <Option value='DHL'>DHL</Option>
                                    <Option value='TNTExpress'>TNTExpress</Option>
                                    <Option value='FeDex'>FeDex</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                                {this.state.internationalService==='Other' && 
                                <Input name='otherIntSevice' className='form-control' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />}
                               <br/>
                               <p>Delivery Time:</p>
                                        <input
                                        name='from'
                                        type='number'
                                        autoComplete='off'
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e=>{
                                            let intDelivery = this.state.intDelivery
                                            intDelivery.from=e.target.value
                                            this.setState({
                                                intDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                    <input
                                        name='to'
                                        type='number'
                                        autoComplete='off'
                                        placeholder='to'
                                        style={{marginLeft:5}}
                                        onChange={e=>{
                                            let intDelivery = this.state.intDelivery
                                            intDelivery.to=e.target.value
                                            this.setState({
                                                intDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
   <Button onClick={this.handleSubmit} shape="round" style={{backgroundColor:'#B17E4E',color:'white',height:'40px',width:'150px',fontSize:'18px'}}>Add</Button>
                                </Form>
                            </div>
                        </div>
                    }
                </Modal>
                <Modal
                    visible={this.state.showUpdateModal}
                    closable={false}
                    footer={null}
                    style={{padding:0}}
                    bodyStyle={{padding:0}}
                >
                    <div style={{display:'flex',width:'100%',padding:'15px',justifyContent:'space-between',alignItems:'center',backgroundColor:"lightgray",margin:0}}>
                        <h1>Add Shippment</h1>
                        <FontAwesomeIcon icon={faTimes} size="2x" onClick={this.handleCloseUpdateModal} />
                    </div>
                    <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                        <Radio.Group value={this.state.shippingCheckBoxValue} onChange={this.handleChangeShipping} >
                            <Radio value="Domestic">Domestic</Radio>
                            <Radio value="International">International</Radio>
                            <Radio value="Both">Both</Radio>
                        </Radio.Group>
                    </div>
                    {
                        this.state.shippingCheckBoxValue==="Domestic" ?

                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',marginTop:'20px'}}>
                            <h2>Domestic</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Input onChange={this.handleChange}  name='title' className='form-control' style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />
                                <Input.TextArea size="large" onChange={e=>this.setState({description:e.target.value})} name='description' style={{ backgroundColor: '#fafafa', marginBottom: '10px',resize:"none" }} placeholder="Enter Description" autoSize={{ minRows: 5 }}></Input.TextArea>
                                <p>Domestic Cost:</p>
                                <Input onChange={this.handleChange} type='number' min='0' defaultValue='0'
                                placeholder='Domestic Cost'
                                name='domCost'
                                />
                                <br/>
                                <Select onChange={val=>{
                                    this.setState({
                                        domesticService:val
                                    })
                                }} placeholder='Shipping service' name='domesticService'>
                                    <Option value='DHL'>DHL</Option>
                                    <Option value='TNTExpress'>TNTExpress</Option>
                                    <Option value='FeDex'>FeDex</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                                {this.state.domesticService==='Other' && 
                                <Input name='otherDomService' className='form-control' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />}
                               <p>Delivery Time:</p>
                                        <input
                                        name='from'
                                        autoComplete='off'
                                        type='number'
                                        min={0}
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e=>{
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.from=e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                    <input
                                        name='to'
                                        type='number'
                                        min={0}
                                        autoComplete='false'
                                        placeholder='to'
                                        style={{marginLeft:5}}
                                        onChange={e=>{
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.to=e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>

                                <Button onClick={this.handleSubmit} shape="round" style={{backgroundColor:'#B17E4E',color:'white',height:'40px',width:'150px',fontSize:'18px'}}>Add</Button>
                            </Form>
                        </div>
                        : (this.state.shippingCheckBoxValue==="International") ?

                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',marginTop:'20px'}}>
                            <h2>International</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Input onChange={this.handleChange} name='title' className='form-control' style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />
                                <Input.TextArea size="large" onChange={e=>console.log(e.target.value)} name='description' style={{ backgroundColor: '#fafafa', marginBottom: '10px',resize:"none" }} placeholder="Enter Description" autoSize={{ minRows: 5 }}></Input.TextArea>

                                <Input onChange={this.handleChange} type='number' min='0'
                                placeholder='International Cost'
                                name='intCost'
                                />
                                <br/>
                                <Select onChange={val=>{
                                    this.setState({
                                        internationalService:val
                                    })
                                }} placeholder='Shipping service' name='domesticService'>
                                    <Option value='DHL'>DHL</Option>
                                    <Option value='TNTExpress'>TNTExpress</Option>
                                    <Option value='FeDex'>FeDex</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                                {this.state.internationalService==='Other' && 
                                <Input name='otherIntSevice' className='form-control' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />}
                               <p>Delivery Time:</p>
                                        <input
                                        name='from'
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e=>{
                                            let intDelivery = this.state.intDelivery
                                            intDelivery.from=e.target.value
                                            this.setState({
                                                intDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                    <input
                                        name='to'
                                        type='number'
                                        placeholder='to'
                                        style={{marginLeft:5}}
                                        onChange={e=>{
                                            let intDelivery = this.state.intDelivery
                                            intDelivery.to=e.target.value
                                            this.setState({
                                                intDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>

                                <Button onClick={this.handleSubmit} shape="round" style={{backgroundColor:'#B17E4E',color:'white',height:'40px',width:'150px',fontSize:'18px'}}>Add</Button>
                            </Form>
                        </div>

                        : 
                        <div>

                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',marginTop:'20px'}}>
                                <h2>Domestic</h2>
                                <Form onSubmit={this.handleSubmit}>
                                <Input onChange={this.handleChange}  name='title' className='form-control' style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />
                                <Input.TextArea size="large" onChange={e=>this.setState({description:e.target.value})} name='description' style={{ backgroundColor: '#fafafa', marginBottom: '10px',resize:"none" }} placeholder="Enter Description" autoSize={{ minRows: 5 }}></Input.TextArea>
                                <p>Domestic Cost:</p>
                                <Input onChange={this.handleChange} type='number' min='0' defaultValue='0'
                                placeholder='Domestic Cost'
                                name='domCost'
                                />
                                <br/>
                                <Select onChange={val=>{
                                    this.setState({
                                        domesticService:val
                                    })
                                }} placeholder='Shipping service' name='domesticService'>
                                    <Option value='DHL'>DHL</Option>
                                    <Option value='TNTExpress'>TNTExpress</Option>
                                    <Option value='FeDex'>FeDex</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                                {this.state.domesticService==='Other' && 
                                <Input name='otherDomService' className='form-control' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />}
                               <p>Delivery Time:</p>
                                        <input
                                        name='from'
                                        autoComplete='off'
                                        type='number'
                                        min={0}
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e=>{
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.from=e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                    <input
                                        name='to'
                                        type='number'
                                        min={0}
                                        autoComplete='false'
                                        placeholder='to'
                                        style={{marginLeft:5}}
                                        onChange={e=>{
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.to=e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                        <br/>
                                <Input onChange={this.handleChange} type='number' min='0'
                                placeholder='International Cost'
                                name='intCost'
                                />
                                                                <br/>
                                <Select onChange={val=>{
                                    this.setState({
                                        internationalService:val
                                    })
                                }} placeholder='Shipping service' name='domesticService'>
                                    <Option value='DHL'>DHL</Option>
                                    <Option value='TNTExpress'>TNTExpress</Option>
                                    <Option value='FeDex'>FeDex</Option>
                                    <Option value='Other'>Other</Option>
                                </Select>
                                {this.state.internationalService==='Other' && 
                                <Input name='otherIntSevice' className='form-control' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Title"  />}
                               <br/>
                               <p>Delivery Time:</p>
                                        <input
                                        name='from'
                                        type='number'
                                        autoComplete='off'
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e=>{
                                            let intDelivery = this.state.intDelivery
                                            intDelivery.from=e.target.value
                                            this.setState({
                                                intDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
                                    <input
                                        name='to'
                                        type='number'
                                        autoComplete='off'
                                        placeholder='to'
                                        style={{marginLeft:5}}
                                        onChange={e=>{
                                            let intDelivery = this.state.intDelivery
                                            intDelivery.to=e.target.value
                                            this.setState({
                                                intDelivery
                                            })
                                        }}
                                        />
                                        <span style={{marginLeft:5}}>Days</span>
   <Button onClick={this.handleSubmit} shape="round" style={{backgroundColor:'#B17E4E',color:'white',height:'40px',width:'150px',fontSize:'18px'}}>Add</Button>
                                </Form>
                            </div>
                        </div>
                    }
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
export default connect(mapStateToProps,mapActionsToProps)(Order)