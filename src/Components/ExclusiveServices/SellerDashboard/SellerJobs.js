import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './CSS/SellerJobs.css'
import {Divider,Table} from 'antd'
import { Icon } from '@ant-design/compatible';

import SellerNavbar from './SellerNavbar'
import SellerSideBar from './SellerSideBar'
import {ReadExclusiveOrders} from '../../../store/actions/ExclusiveOrderAction'

class MyJobs extends Component {

  componentWillMount(){
    this.props.readOrders();
  }

    render() {

      var data = this.props.ordersData.filter(orders=>{
        return orders.sellerID === this.props.match.params.id && orders.isComplete === false
      })

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
                <Link to={`/exclusive-services/${this.props.match.params.id}/seller-my-job-description/${jobData._id}`} ><h4 style={{color:'dargreen',fontWeight:'bold'}}><Icon type="eye"/> View</h4></Link>
              </span>
            ),
        }

      ];

        return (
            <div className="seller-jobs-Container">
                <SellerNavbar Id={this.props.match.params.id} />
                <div className="seller-jobs-Body-Container">
                    <SellerSideBar Id={this.props.match.params.id} />
                    <div className="seller-jobs-Body">
                        <div className="Header">
                            <h1 style={{fontWeight:'bold',margin:0,fontSize:'35px'}}>My Jobs</h1>
                        </div>
                        <Divider></Divider>
                        <Table columns={columns} dataSource={data} pagination={false} scroll={{x:900}} />
                    </div>
                </div>
            </div>
        )
    }
}

const maStateToProps=(state)=>{
  return{
    ordersData:state.ExclusiveOrderReducer.ExclusiveOrderData
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
      readOrders:(orderData)=>{dispatch(ReadExclusiveOrders(orderData))}
  }
}


export default connect(maStateToProps,mapDispatchToProps)(MyJobs);
