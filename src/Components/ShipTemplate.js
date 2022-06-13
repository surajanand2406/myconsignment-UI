import React, { Component } from 'react'
import { Button, Input,  Select, message } from 'antd'
import Navbar from './Navbar'
import './CSS/ShipTemplate.css'
import ProfileSidebar from './ProfileSidebar'
import { url, headers } from "../Constants";
import { connect } from 'react-redux';
import { confirmmessage } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const { Option } = Select
class ShipTemplate extends Component {
    constructor(props) {
        super(props)
        this.initialState = {
            isAddShippment: false,
            listData: [],
            loading: false,
            type: 'Both',
            title: '',
            description: '',
            show: true,
            shippingProfile: null,
            showUpdateModal: false,
            processingTime: "--Select Processing Time--",
            cost:0,
            shippingService:"--Select Shipping Service--",
            otherDomService:"",
            domDelivery:{
                from:0,
                to:1
            },
            domCost:0,
            domAdditional:0,
            uploading:false
        }
        this.state = {
            ...this.initialState
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.showUpdateModalFunc = this.showUpdateModalFunc.bind(this)
        this.addShipping= this.addShipping.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleOpenModal = () => {
        this.setState({ isAddShippment: true })
    }
    handleCloseModal = () => {
        this.setState({ isAddShippment: false })
    }
    handleCloseUpdateModal = () => {
        this.setState({ showUpdateModal: false })
    }
    handleChangeShipping = (e) => {
        this.setState({ shippingCheckBoxValue: e.target.value })
    }
    componentDidMount() {
        let userData = localStorage.getItem('userData')
        let user = JSON.parse(userData)
        let UID = user.firebaseUID
        if (UID !== "") {
            fetch(url + '/api/getShippings' + UID)
                .then(res => res.json())
                .then(response => {
                    if (response.message === 'Success') {
                        console.log(response.doc)
                        this.setState({
                            listData: response.doc
                        })
                    }
                    else {
                        message.error("Failed to fetch shipping profiles")
                    }
                })
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        this.setState({
            uploading:true
        })
        let { cost, shippingService, domDelivery, title, description, otherDomService } = this.state
        if (this.state.type === 'Domestic') {
            let data = {
                domCost:cost,
                domesticService: shippingService === 'Other' ? otherDomService : shippingService,
                title,
                description,
                domDelivery,
                type: this.state.type,
                firebaseUID: this.props.UID
            }
            if (title.length < 4) {
                message.error('Title must be minimum 4 characters')
                return
            }
            if (description.length < 4) {
                message.error('Description must be minimum 4 characters')
                return
            }
            if (shippingService.length < 4) {
                message.error('User must select shipping profile')
                return
            }
            if (domDelivery.from.length < 1 || domDelivery.to.length < 1) {
                message.error('Delivery time can not be less than 1 day')
                return
            }
            this.addShipping(data)


        }
        else if (this.state.type === 'International') {
            let data = {
                intCost:cost,
                internationalService: shippingService === 'Other' ? otherDomService : shippingService,
                title,
                description,
                intDelivery:domDelivery,
                type: this.state.type,
                firebaseUID: this.props.UID
            }
            if (title.length < 4) {
                message.error('Title must be minimum 4 characters')
                return
            }
            if (description.length < 4) {
                message.error('Description must be minimum 4 characters')
                return
            }
            if (shippingService.length < 4) {
                message.error('User must select shipping profile')
                return
            }
            if (domDelivery.from< 1 || domDelivery.to < 1) {
                message.error('Delivery time can not be less than 1 day')
                return
            }
            this.addShipping(data)

        }
        else {
            let data = {
                domCost:cost,
                domesticService: shippingService === 'Other' ? otherDomService : shippingService,
                title,
                description,
                domDelivery,
                type: this.state.shippingCheckBoxValue,
                firebaseUID: this.props.UID,
                intCost:cost,
                internationalService: shippingService === 'Other' ? otherDomService : shippingService,
                intDelivery:domDelivery
            }
            if (title.length < 4) {
                message.error('Title must be minimum 4 characters')
                return
            }
            if (description.length < 4) {
                message.error('Description must be minimum 4 characters')
                return
            }
            if (shippingService.length < 4) {
                message.error('User must select shipping profile')
                return
            }
            if (domDelivery.from < 1 || domDelivery.to < 1) {
                message.error('Delivery time can not be less than 1 day')
                return
            }
            this.addShipping(data)
        }
    }
    addShipping(data){
        fetch(url + '/api/addShipping', { method: "POST", body: JSON.stringify(data), headers: headers })
        .then(res => res.json())
        .then(response => {
            if (response.message === 'Success') {
                let obj = this.initialState
                delete obj.listData
                this.setState({
                    ...obj
                })
                let updatedShipping = this.state.listData
                updatedShipping.push(response.doc)
                this.setState({
                    listData: updatedShipping
                })
            } else {
                message.error("Adding Shipping Profile failed")
            }
        }).catch(err => console.log(err))
    }
    showUpdateModalFunc(index) {

    }
    handleDelete(id) {
        if (id) {
            confirmmessage.error({
                title: 'Confirm Delete?',
                message: 'Are you sure to delete shipping profile?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            fetch(url + '/api/deleteShipping' + id, { method: "DELETE", headers: headers })
                                .then(res => res.json())
                                .then(response => {
                                    if (response.message === 'Success') {
                                        let updatedShipping = this.state.listData.filter(list => list._id !== id)
                                        this.setState({
                                            listData: updatedShipping
                                        })
                                    } else {
                                        message.error('Failed to delete shipping profile')
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
            <div className="Shipping-temp-container">
                <Navbar />

                <div className="Shipping-temp-body">
                    <ProfileSidebar />
                    <div className="Shipping-temp-body-lists">
                        <h2 style={{ textAlign: "center" }}> Add a Shipping Profile</h2>
                        <label for='title'><b>Name:</b></label>
                        <Input
                            name='title'
                            autoFocus={true}
                            placeholder='Shipping Profile Name'
                            autoComplete='off'
                            maxLength={100}
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                        <br />
                        <label for='description'><b>Description:</b></label>
                        <Input.TextArea
                            name='description'
                            placeholder='Shipping Profile Description'
                            autoComplete='off'
                            maxLength={100}
                            value={this.state.description}
                            onChange={this.handleChange}
                        ></Input.TextArea>
                        <br />

                        <label for='type'><b>Ships to:</b></label>
                        <Select value={this.state.type} name='type' onChange={val => {
                            this.setState({
                                type: val
                            })
                        }} placeholder='Shipping to'>
                            <Option value='Domestic'>Domestic</Option>
                            <Option value='International'>International</Option>
                            <Option value='Both'>Everywhere</Option>
                        </Select>
                        <br />
                        <label for='shippungService'><b>Shipping Service:</b></label>
                        <Select value={this.state.shippingService} onChange={val => {
                            this.setState({
                                shippingService: val
                            })
                        }} placeholder='Shipping service' name='shippungService'>
                            <Option value='DHL'>DHL</Option>
                            <Option value='TNT Express'>TNT Express</Option>
                            <Option value='UPS'>UPS</Option>
                            <Option value='USPS'>USPS</Option>
                            <Option value='FeDex'>FeD ex</Option>
                            <Option value='Other'>--ADD--</Option>
                        </Select>
                        {this.state.shippingService === 'Other' &&
                            <Input name='otherDomService' className='form-control' onChange={this.handleChange} style={{ height: '40px', marginBottom: '10px' }} placeholder="Shipping Service Name" />
                        }
                        <br />
                        <div style={{ display: 'flex', justifyContent: "space-around", flexDirection: "row" }}>

                            <span>
                                <label for='cost'>Shipping Cost</label>
                                <br />
                                <Input
                                    name='cost'
                                    autoComplete='off'
                                    type='number'
                                    min={0}
                                    value={this.state.cost}
                                    style={{ minWidth: 100, maxWidth: 500,width:410 }}
                                    className='form-control'
                                    placeholder='Shipping Cost'
                                    prefix='$'
                                   onChange={this.handleChange}
                                />
                            </span>
                            <span>
                                <label for='domAdditional'>*Additional Cost</label>
                                <br />

                                <Input
                                    name='domAdditional'
                                    type='number'
                                    min={0}
                                    autoComplete='false'
                                    placeholder='Additional Cost'
                                    prefix='$'
                                    value={this.state.domAdditional}
                                    style={{ marginLeft: 5, minWidth: 100, maxWidth: 500,width:410 }}
                                    onChange={this.handleChange}
                                />
                            </span>
                        </div>
                        <br />
                        <label for='processingTime'><b>Processing time:</b></label>
                        <Select value={this.state.processingTime} onChange={val => {
                            if(val==='one'){
                                this.setState({
                                    domDelivery:{
                                        from:1,
                                        to:3
                                    }
                                })
                            }
                            else if(val==='two'){
                                this.setState({
                                    domDelivery:{
                                        from:2,
                                        to:5
                                    }
                                })
                            }
                            else if(val==='five'){
                                this.setState({
                                    domDelivery:{
                                        from:5,
                                        to:7
                                    }
                                })
                            }
                            else if(val==='seven'){
                                this.setState({
                                    domDelivery:{
                                        from:7,
                                        to:15
                                    }
                                })
                            }
                            this.setState({
                                processingTime:val
                            })
                        }} placeholder='Processing Time' name='processingTime'>
                            <Option value='one'>1 to 3 business days</Option>
                            <Option value='two'>2 to 5 business days</Option>
                            <Option value='five'>5 to 7 business days</Option>
                            <Option value='seven'>7 to 15 business days</Option>
                            <Option value='Other'>--Custom--</Option>
                        </Select>
                        <br />
                        {this.state.processingTime === 'Other' &&
                            <div style={{ display: 'flex', justifyContent: "space-around", flexDirection: "row" }}>

                                <span>
                                    <label for='from'>Minimum Time</label>
                                    <br />
                                    <Input
                                        name='from'
                                        autoComplete='off'
                                        type='number'
                                        min={0}
                                        value={this.state.domDelivery.from}
                                        style={{ width: 200 }}
                                        className='form-control'
                                        placeholder='from'
                                        onChange={e => {
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.from = e.target.value
                                            domDelivery.to = parseInt(e.target.value)+1
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                    />
                                    {"  "} Business Days
                                        </span>
                                <span>
                                    <label for='to'>Maximum Time</label>
                                    <br />

                                    <Input
                                        name='to'
                                        type='number'
                                        min={parseInt(this.state.domDelivery.from)+1}
                                        autoComplete='off'
                                        placeholder='to'
                                        value={this.state.domDelivery.to}
                                        style={{ marginLeft: 5, width: 200 }}
                                        onChange={e => {
                                            let domDelivery = this.state.domDelivery
                                            domDelivery.to = e.target.value
                                            this.setState({
                                                domDelivery
                                            })
                                        }}
                                    />
                                    {"  "} Business Days
                                        </span>
                            </div>
                        }


                        <br />
                        <div style={{ display: 'flex', justifyContent: "center", flexDirection: "row" }}>
                            <Button loading={this.state.uploading} disabled={this.state.uploading} type="primary" id='shipSub' onClick={this.handleSubmit} shape='round' size='large'>
                                Submit
                               </Button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        categories: state.rootReducer.categories,
        UID: state.rootReducer.UID,
        query: state.rootReducer.query,
        data: state.rootReducer.data
    })
}
function mapActionsToProps(dispatch) {
    return ({

    })
}
export default connect(mapStateToProps, mapActionsToProps)(ShipTemplate)