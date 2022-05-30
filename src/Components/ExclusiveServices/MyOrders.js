import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ExlusiveNavbar from './ExlusiveNavbar'
import {Divider,Table} from 'antd'
import { Icon } from '@ant-design/compatible';

import './CSS/MyOrders.css'
import {ReadExclusiveOrders} from '../../store/actions/ExclusiveOrderAction'



class MyOrders extends Component {

    componentWillMount(){
        this.props.readOrders();
    }

    render() {

      var data = this.props.ordersData.filter(orders=>{
            return orders.buyerID === 'buy111' && orders.isComplete === false
      })

        const columns = [
            {
              title: 'Seller Name',
              dataIndex: 'sellerName',
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
                    <Link to={`/exclusive-services-my-order-description/${jobData._id}`} ><h4 style={{color:'#8b0000',fontWeight:'bold'}}><Icon type="eye"/> View</h4></Link>
                  </span>
                ),
            }

          ];
          


        return (
            <div className="MyOrders-Container">
                <ExlusiveNavbar />
                <div className="MyOrders-Body-Container">
                    <div className="MyOrders-Body">
                        <h1 style={{fontWeight:'bold',margin:0,fontSize:'35px'}}>My Orders</h1>
                        <Divider style={{margin:0,marginTop:15,marginBottom:15}}></Divider>
                        <Table columns={columns} dataSource={data} pagination={false} scroll={{ x:900, y: 450}} />
                    </div>
                </div>
            </div>
        )
    }
}

const maStateToProps=(state)=>{
  return{
    ordersData:state.ExclusiveOrderReducer.ExclusiveOrderData,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      readOrders:(orderData)=>{dispatch(ReadExclusiveOrders(orderData))}
  }
}


export default connect(maStateToProps,mapDispatchToProps)(MyOrders);
