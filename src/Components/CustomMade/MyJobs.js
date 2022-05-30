import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Table, Divider, Button} from 'antd'
import CustomMadeNavbar from './CustomMadeNavbar'
import {ReadOrders,CancelJob,CancelOrder} from '../../store/actions/OrderActions'
import './CSS/MyJobs.css'

class MyJobs extends Component {

    state={
        myJobs:true,
        myOrders:false,
        userData:{}
    }

    componentDidMount(){

      const data = localStorage.getItem('userData')
        
        if(data)
        {
            this.setState({userData:JSON.parse(data)})
        }

      this.props.readOrders();
    }


    handleMyJobs=()=>{this.setState({myJobs:true,myOrders:false})}
    handleMyOrders=()=>{this.setState({myJobs:false,myOrders:true})}


    handleCancelJob=(jobData)=>{
      const Id = jobData.Id;
      
      this.props.cancelJob({Id})

    }

    handleCancelOrder=(data)=>{
      const Id = data.Id;

      this.props.cancelOrder({Id})
      
    }


    render() {


        const styles={
            width:'50%',
            borderBottom:'solid 1px lightgray',
            display:'flex',
            justifyContent:'center',
            padding:'5px'
        }
        const styles1={
            width:'50%',
            borderBottom:'solid 2px #8b0000',
            color:'#8b0000',
            fontWeight:'bold',
            display:'flex',
            justifyContent:'center',
            padding:'5px'
        }



       const ordersData = [];
       const jobsData =[];
       
       this.props.Orders.map((data,i)=>{
            if(data.BuyerID===this.state.userData.firebaseUID)
            {
              var  orders = {
                    key:i,
                    Sname:data.SellerName,
                    Sdate:data.StartDate,
                    Edate:data.EndDate,
                    Amount:data.Amount,
                    Id:data._id,
                    jobId:data.JobID
              }

              ordersData.push(orders)
            }
            else if(data.SellerID===this.state.userData.firebaseUID)
            {
                var jobs = {
                    key:i,
                    Cname:data.BuyerName,
                    Sdate:data.StartDate,
                    Edate:data.EndDate,
                    Amount:data.Amount,
                    Id:data._id,
                    jobId:data.JobID
                }

                jobsData.push(jobs)
            }
          
        })


        const jobsColumns = [
            {
              title: 'Client Name',
              dataIndex: 'Cname',
              key: 'Cname',
            },
            {
              title: 'Start Date',
              dataIndex: 'Sdate',
              key: 'Sdate',
            },
            {
              title: 'End Date',
              dataIndex: 'Edate',
              key: 'Edate',
            },
            {
                title: 'Amount',
                dataIndex: 'Amount',
                key: 'Amount',
              },
            {
              title: 'Action',
              key: 'action',
              render: (jobData) => (
                <span style={{display:'flex'}}>
                  <Link to={`/custom-made-my-jobs/${jobData.jobId}/custom-made-view-job-detail`}><h4 style={{color:'#8b0000',fontWeight:'bold'}}>View</h4></Link>
                  <Divider type="vertical" />
                  <Link ><h4 style={{color:'#8b0000',fontWeight:'bold'}} onClick={()=>this.handleCancelJob(jobData)}  >Cancel</h4></Link>
                </span>
              ),
            },
          ];
          
         



          {/*Orders Table*/}

          const ordersColumns = [
            {
              title: 'Seller Name',
              dataIndex: 'Sname',
              key: 'Sname',
            },
            {
              title: 'Start Date',
              dataIndex: 'Sdate',
              key: 'Sdate',
            },
            {
              title: 'End Date',
              dataIndex: 'Edate',
              key: 'Edate',
            },
            {
                title: 'Amount',
                dataIndex: 'Amount',
                key: 'Amount',
              },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                <span style={{display:'flex'}}>
                  <Link to={`/custom-made-my-jobs/${data.jobId}/custom-made-view-job-detail`}><h4 style={{color:'#8b0000',fontWeight:'bold'}}>View</h4></Link>
                  <Divider type="vertical" />
                  <Link><h4 style={{color:'#8b0000',fontWeight:'bold'}} onClick={()=>this.handleCancelOrder(data)} >Cancel</h4></Link>
                  <Divider type="vertical" />
                  <Link onClick={()=>this.handleCompleteOrder(data)}><h4 style={{color:'#8b0000',fontWeight:'bold'}} >Compelete</h4></Link>
                </span>
              ),
            },
          ];
          


        return (
            <div className="my-jobs-container">
                <CustomMadeNavbar />
                <div className="my-jobs-body-container">
                    <div className="my-jobs-body">
                        <div style={{display:'flex',alignItems:'center'}}>
                            <div style={this.state.myJobs===true ? styles1 : styles} onClick={this.handleMyJobs}>  
                                Jobs
                            </div>
                            <div style={this.state.myOrders===true ? styles1 : styles} onClick={this.handleMyOrders}>
                                Orders
                            </div>
                        </div>
                        {
                            this.state.myJobs===true ?
                            <Table columns={jobsColumns} dataSource={jobsData} pagination={false} scroll={{ x:900, y: 450}} style={{marginTop:'50px'}} />
                            :
                            <Table columns={ordersColumns} dataSource={ordersData} pagination={false} scroll={{x:950, y: 450}} style={{marginTop:'50px'}} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
  return{
    Orders:state.OrderReducer.OrderData
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    readOrders:()=>{dispatch(ReadOrders())},
    cancelJob:(Id)=>{dispatch(CancelJob(Id))},
    cancelOrder:(Id)=>{dispatch(CancelOrder(Id))}
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(MyJobs);
