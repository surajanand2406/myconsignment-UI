import React, { Component } from 'react'
import CustomMadeNavbar from './CustomMadeNavbar'
import {connect} from 'react-redux'
import {ReadJob} from '../../store/actions/JobBoardActions'
import {ReadOrders} from '../../store/actions/OrderActions'
import './CSS/ViewJobDetail.css'


class ViewJobDetail extends Component {

    componentDidMount(){ 
        this.props.readJob(); 
    }

    render() {

        var newData ={
            JobTitle:'',
            Budget:'',
            BuyerName:'',
            PostedDate:'',
            JobDetail:'',
            Material:'',
            Size:'',
            Shipping:'',
            Image:''
        }

        var id =this.props.match.params.id;
        this.props.jobsData.map((data,i)=>{
                if(id===data._id)
                {
                    newData.JobTitle = data.JobTitle;
                    newData.Budget = data.Budget;
                    newData.BuyerName = data.BuyerName;
                    newData.PostedDate = data.PostedDate;
                    newData.JobDetail = data.JobDetail;
                    newData.Material = data.MaterialDes;
                    newData.Size = data.Size;
                    newData.Shipping = data.Shipping
                    newData.Image = data.Image

                }
        })


        return (
            <div className="ViewJob-Detail-container">
                        <CustomMadeNavbar />

                        <div className="ViewJob-Detail-inner-container">  
                            <div className="ViewJob-Detail-body">                                 
                                <img src={newData.Image} />
                                <div className="ViewJob-Detail-item-detail" style={{marginLeft:'20px'}}>
                                    <h1 style={{fontSize:'30px'}}>{newData.JobTitle}</h1>

                                    <hr />
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <h3 className="h3">Price: </h3>
                                        <h3>${newData.Budget}</h3>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <h3 className="h3" >Size: </h3>
                                        <h3>{newData.Size}</h3>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <h3 className="h3">Material: </h3>
                                        <h3>{newData.Material}</h3>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <h3 className="h3">Shipping: </h3>
                                        <h3>{newData.Shipping}</h3>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <h3 className="h3">PostedDate: </h3>
                                        <h3>{newData.PostedDate}</h3>
                                    </div>

                                    <hr />
                                    <h2 style={{fontWeight:'bold'}}>Detail</h2>
                                    <div style={{margin:0,width:'100%',height:"300px",overflowY:'auto'}}>
                                        <p style={{fontSize:'16px'}} >{newData.JobDetail}</p>
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
        jobsData:state.JobBoardReducer.JobBoardData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readJob:()=>{dispatch(ReadJob())},
        readOrders:()=>{dispatch(ReadOrders())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewJobDetail);
