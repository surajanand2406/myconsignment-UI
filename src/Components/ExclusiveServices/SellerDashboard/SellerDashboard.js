import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/SellerDashboard.css'
import {Link} from 'react-router-dom'
import SellerNavbar from './SellerNavbar'
import SellerSideBar from './SellerSideBar'
import { Button, Divider,Table} from 'antd'
import { Icon } from '@ant-design/compatible';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faList,faNetworkWired,faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import {ReadExclusiveServices} from '../../../store/actions/ExclusiveServicesAction'
import {ReadExclusiveOrders} from '../../../store/actions/ExclusiveOrderAction'


class SellerDashboard extends Component {

    state={
        totalEarnings:0,
        completeOrders:[],
        data:[],
        myServices:[]
    }

    componentDidMount(){

        var userData = localStorage.getItem('ExclusiveUser')
        console.log(JSON.parse(userData))

        this.props.readServices();
        this.props.readOrders();

        this.state.completeOrders = this.props.ordersData.filter(orders=>{
            return orders.sellerID === this.props.match.params.id && orders.isComplete === true
        })
        
        this.state.completeOrders.map(order=>{
            this.state.totalEarnings = this.state.totalEarnings + order.Price;
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps){

         this.state.data = nextProps.ordersData.filter(orders=>{
            return orders.sellerID === nextProps.match.params.id && orders.isComplete === false
          })

        this.state.myServices = nextProps.serviceData.filter(service=>{
            return service.userID === nextProps.match.params.id
        })
    }

    render() {


        const columns = [
            {
              title: 'Buyer Name',
              dataIndex: 'buyerName',
              key: 'Seller Name',
            },
            {
              title: 'Start Date',
              dataIndex: 'startTime',
              key: 'Start Date',
            },
            {
              title: 'Finish Date',
              dataIndex: 'endTime',
              key: 'Finish Date',
            },
            {
              title: 'Price',
              dataIndex: 'Price',
              key: 'Price',
            },
            {
                title: 'Action',
                key: 'action',
                render: (jobData) => (
                  <span style={{display:'flex'}}>
                    <Link to={`/exclusive-services/${this.props.match.params.id}/seller-my-job-description/${jobData._id}`} ><h4 style={{color:'darkgreen',fontWeight:'bold'}}><Icon type="eye"/> View</h4></Link>
                  </span>
                ),
            }
    
          ];



        return (
            <div className="seller-dashboard-Container">
                <SellerNavbar  Id={this.props.match.params.id}  />
                <div className="seller-dashboard-Body-Container">
                    <SellerSideBar Id={this.props.match.params.id} />
                    <div className="seller-dashboard-Body">
                        <div className="seller-dashboard-Body-content">
                            <div className="header">
                                <div className="box">
                                    <div className="box-header" style={{backgroundColor:'cornflowerblue'}}>
                                        <h1 style={{margin:0,fontWeight:'bold',fontSize:40}}> 
                                            <FontAwesomeIcon size="1x" icon={faList} /> {this.state.myServices.length}
                                        </h1>
                                    </div>
                                    <div className="box-footer" >
                                        <h3 style={{margin:0,fontWeight:'bold'}}>Services</h3>
                                        <Link to={`/exclusive-services/${this.props.match.params.id}/seller-my-services`}>
                                            <Button style={{backgroundColor:'darkgreen',color:'white'}}>View</Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="box-header" style={{backgroundColor:'darkseagreen'}}>
                                        <h1 style={{margin:0,fontWeight:'bold',fontSize:40}}><FontAwesomeIcon size="1x" icon={faNetworkWired} /> {this.state.data.length}</h1>
                                    </div>
                                    <div className="box-footer" >
                                        <h3 style={{margin:0,fontWeight:'bold'}}>Jobs</h3>
                                        <Link to={`/exclusive-services/${this.props.match.params.id}/seller-my-jobs`}>
                                            <Button style={{backgroundColor:'darkgreen',color:'white'}}>View</Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="box-header" style={{backgroundColor:'palevioletred'}}>
                                    <h1 style={{margin:0,fontWeight:'bold',fontSize:40}}><FontAwesomeIcon size="1x" icon={faMoneyBill} /> ${this.state.totalEarnings}</h1>
                                    </div>
                                    <div className="box-footer" >
                                        <h3 style={{margin:0,fontWeight:'bold'}}>Earnings</h3>
                                        <Link to={`/exclusive-services/${this.props.match.params.id}/seller-my-earnings`}>
                                            <Button style={{backgroundColor:'darkgreen',color:'white'}}>View</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Divider></Divider>
                            <div className="body">
                                <h1 style={{margin:0,fontWeight:'bold'}}>Latest Jobs</h1>
                                <Table columns={columns} dataSource={this.state.data.length > 5 ? this.state.data.slice(Math.max(this.state.data.length - 5, 0)) : this.state.data} pagination={false} scroll={{x:900}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        serviceData:state.ExclusiveServicesReducer.ExclusiveServicesData,
        ordersData:state.ExclusiveOrderReducer.ExclusiveOrderData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readServices:()=>{dispatch(ReadExclusiveServices())},
        readOrders:(orderData)=>{dispatch(ReadExclusiveOrders(orderData))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SellerDashboard);
