import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/MyEarnings.css'
import SellerNavbar from './SellerNavbar'
import SellerSideBar from './SellerSideBar'
import {Divider,Table} from 'antd'
import {ReadExclusiveOrders} from '../../../store/actions/ExclusiveOrderAction'

class MyEarnings extends Component {

    state={
        totalEarnings:0,
        completeOrders:[]
    }

    componentDidMount(){
        this.props.readOrders();

        this.state.completeOrders = this.props.ordersData.filter(orders=>{
            return orders.sellerID === this.props.match.params.id && orders.isComplete === true
        })
        
        this.state.completeOrders.map(order=>{
            this.state.totalEarnings = this.state.totalEarnings + order.Price;
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
                render: () => (
                  <span style={{display:'flex'}}>
                    <h3>Marked as Completed</h3>
                  </span>
                ),
            }
    
          ];

        return (
            <div className="my-earnings-Container">
                <SellerNavbar Id={this.props.match.params.id} />
                <div className="my-earnings-Body-Container">
                    <SellerSideBar Id={this.props.match.params.id} />
                    <div className="my-earnings-Body">
                        <div className="Header">
                            <h1 style={{fontWeight:'bold',margin:0,fontSize:'35px'}}>My Earnings</h1>
                            <h1 style={{fontWeight:'bold',margin:0,fontSize:'35px'}}>Total: ${this.state.totalEarnings}</h1>
                        </div>
                        <Divider></Divider>
                        <h2 style={{fontWeight:'bold',margin:0,marginBottom:20}}>Completed Orders</h2>
                        <Table columns={columns} dataSource={this.state.completeOrders} pagination={false} scroll={{x:900}} />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        ordersData:state.ExclusiveOrderReducer.ExclusiveOrderData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readOrders:(orderData)=>{dispatch(ReadExclusiveOrders(orderData))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyEarnings);
