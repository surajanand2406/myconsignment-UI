import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import {Divider,List,Input,Modal,Button,message} from 'antd'
import { Icon } from '@ant-design/compatible';
import {Link} from 'react-router-dom'
import './CSS/MyProfile.css'
import Truncate from 'react-truncate';
import CustomMadeNavbar from './CustomMadeNavbar'
import {ReadJob,DeleteJob,UpdateJob,Etsy} from '../../store/actions/JobBoardActions'
import {ReadOrders} from '../../store/actions/OrderActions'

class MyProfile extends Component {
    state={

        Id:'',      
        Title:'',
        Budget:'',
        Material:'',
        Size:'',
        Shipping:'',
        jobDetail:'',
        Category:'',
        imageUrl:'',

        Image:'',
        imageURL:'',


        searchValue:'',
        listData:[],
        newList:[],
        isEdit:false,
        imageName:'',
        userData:{},


        orders:0,
        jobs:0
    }

    componentDidMount(){
        const data = localStorage.getItem('userData')
        
        if(data)
        {
            this.setState({userData:JSON.parse(data)})
        }


        this.props.readJob();
        this.props.readOrders();
    }

    handleSearch=(e)=>{

                
        let list = [];

        
        if(e.target.value.trim() !=="")
        {
                list = this.state.listData;

                let updatedList = list.filter(data=>{
                    const item = data.JobTitle.toLowerCase();
                    const value = e.target.value.toLowerCase();

                    return item.includes(value);
                })

                this.setState({newList:updatedList})
        }
        else
        {
          let  updatedList= this.props.jobsData;
            this.setState({newList:updatedList}) 
        }

        
    }

    handleImage=(path)=>{
        this.setState({imageName:path.target.files[0].name,Image:path.target.files[0]})
    }

    handleInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleEditModal=(Id)=>{

        var newData= this.props.jobsData.filter(data=>{
            return data._id === Id
        })

        var budget = newData[0].Budget.toString();

        this.setState({

            Id:Id,
            Title:newData[0].JobTitle,
            Budget:budget,
            Material:newData[0].MaterialDes,
            Size:newData[0].Size,
            Shipping:newData[0].Shipping,
            jobDetail:newData[0].JobDetail,
            Category:newData[0].JobCategory,
            imageURL:newData[0].Image

        })


        this.setState({isEdit:true})
    }


    handleUpdateJob=()=>{

        if(this.state.Title.trim()==="" || this.state.Budget.trim()==="" || this.state.Material.trim()==="" || this.state.Size.trim()==="" || this.state.Shipping.trim()==="" || this.state.jobDetail.trim()==="")
        {
            message.error("Please Fill all Fields")
        }
        else if(this.state.Image==='')
        {

            const date = new Date()

            const budget = parseInt(this.state.Budget);

            const userData = this.state.userData;

            const data = {
                Id:this.state.Id,
                Title:this.state.Title,
                Budget:budget,
                Material:this.state.Material,
                Size:this.state.Size,
                Shipping:this.state.Shipping,
                Image:this.state.imageURL,
                JobDetail:this.state.jobDetail,
                Category:this.state.Category,
                PostedDate: date.toLocaleDateString(),
                BuyerEmail:userData.email,
                BuyerName:userData.fName,
                firebaseUID:userData.firebaseUID
            }

            this.setState({isEdit:false})

            this.props.updateJob(data);
        }
        else
        {

            const date = new Date()

            const budget = parseInt(this.state.Budget);


            var storageRef = firebase.storage().ref();
                    var mountainImagesRef = storageRef.child(`JobsImages/${this.state.Image.name}`);
            
                    mountainImagesRef.put(this.state.Image).then(()=> {
                        mountainImagesRef.getDownloadURL().then((url)=>{
                            this.setState({imageUrl:url})
                        }).then(()=>{

                            const userData = this.state.userData;

                            const data = {
                                Id:this.state.Id,
                                Title:this.state.Title,
                                Budget:budget,
                                Material:this.state.Material,
                                Size:this.state.Size,
                                Shipping:this.state.Shipping,
                                Image:this.state.imageUrl,
                                JobDetail:this.state.jobDetail,
                                Category:this.state.Category,
                                PostedDate: date.toLocaleDateString(),
                                BuyerEmail:userData.email,
                                BuyerName:userData.fName,
                                firebaseUID:userData.firebaseUID,
                                Country:userData.Country
                            }

                            this.setState({isEdit:false})

                            this.props.updateJob(data);
                                
                    }) 

                    })   
        }
    }



    render() {

        console.log(this.props.jobsData)

       this.state.listData = this.props.jobsData.filter(data=>{
            if(data.firebaseUID === this.state.userData.firebaseUID)
            {
                return data
            }
        })


        return (
            <div className="Profile-Container">
                <CustomMadeNavbar />
                <div className="Profile-body-container">
                    <div className="Profile-body">
                        <div className="Profile-body-head">
                            <h1 style={{fontSize:"35px"}}>My Profile</h1>
                            <Input.Search className="search-box" placeholder="Search By Title...." onChange={this.handleSearch} />
                        </div>
                        <Divider><h1>...</h1></Divider>
                        <div className="Profile-body-request">       
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                pageSize:8,
                            }}
                            dataSource={this.state.newList.length !== 0 ? this.state.newList : this.state.listData}

                            renderItem={(item) => (
                            <List.Item
                                key={item._id}
                                actions={[
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <Link to={`/custom-made-profile/${item._id}/custom-made-view-job`}>
                                            <p style={{color:'darkgreen'}}><Icon type="eye" /> View</p>
                                        </Link>
                                        <p style={{marginRight:'10px',marginLeft:'10px'}}>|</p>
                                        <p style={{color:'darkgreen'}} onClick={()=>this.handleEditModal(item._id)}><Icon type="edit" /> Edit</p>
                                        <p style={{marginRight:'10px',marginLeft:'10px'}}>|</p>
                                        <p style={{color:'darkgreen'}} onClick={()=>this.props.deleteJob({Id:item._id})}><Icon type="delete" /> Delete</p>
                                    </div>
                                ]}
                                extra={
                                <img
                                    width={272}
                                    style={{height:200}}
                                    alt="logo"
                                    src={item.Image}
                                />
                                }
                            >
                                <List.Item.Meta
                                title={<h2 style={{margin:0}}>{item.JobTitle}</h2>}
                                description={<div>
                                                <h5 style={{margin:0,color:'gray'}}>Budget: ${item.Budget}</h5>
                                                <h5 style={{margin:0,color:'gray'}}>Buyer: {item.BuyerName}</h5>
                                                <h5 style={{margin:0,color:'gray'}}>Posted: {item.PostedDate}</h5>
                                            </div>}
                                />
                                   <h3 style={{fontWeight:'bold'}}>Detail Info:{' '} 
                                        <Truncate lines='2' style={{fontSize:'15px',color:'black',fontWeight:'normal'}}>
                                          {item.JobDetail}
                                        </Truncate>
                                    </h3>
                            </List.Item>
                            )}

                        />


                        <Modal visible={this.state.isEdit} title="Edit Job" footer={null} onCancel={()=>this.setState({isEdit:false})}>
                                <div style={{width:'100%'}} >
                                    <div>  
                                        <Input size="large" value={this.state.Category} readOnly style={{border:'solid 1px gray'}} />
                                    </div>
                                    <Divider><h1>...</h1></Divider>
                                    <div>
                                        <h3>Job Title:</h3>
                                        <Input size="large" name="Title" value={this.state.Title} onChange={this.handleInputValue} placeholder="Enter Your Job Title..." style={{border:'solid 1px gray'}} />
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <h3>Your Budget:</h3>
                                        <Input size="large" name="Budget" value={this.state.Budget} onChange={this.handleInputValue} placeholder="Enter Your Budget..." style={{border:'solid 1px gray'}} />
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <h3>Describe Material:</h3>
                                        <Input size="large" name="Material" value={this.state.Material} onChange={this.handleInputValue} placeholder="Hardwood, platinum etc..." style={{border:'solid 1px gray'}} />
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <h3>Tell us about the size of material:</h3>
                                        <Input size="large" name="Size" value={this.state.Size} onChange={this.handleInputValue} placeholder="Size...." style={{border:'solid 1px gray'}} />
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <h3>Shipping:</h3>
                                        <Input size="large" name="Shipping" value={this.state.Shipping} onChange={this.handleInputValue} placeholder="Shipping...." style={{border:'solid 1px gray'}} />
                                    </div>
                                    <div style={{marginTop:"10px",display:'flex',alignItems:'center'}}>

                                        <input type="file" id="file" onChange={this.handleImage} style={{display: 'none'}} />
                                        <label for="file" style={{padding: 10,color: 'white',backgroundColor: 'darkcyan', borderRadius: 5}}><Icon type="upload" /> Choose a Image</label>
                                        <p style={{margin:0,marginLeft:'5px',fontSize:'15px'}}>{this.state.imageName}</p>
                    
                                    </div>                     
                                    <div style={{marginTop:'10px'}}>
                                        <h3>Tell us more about material:</h3>
                                        <Input.TextArea size="large" value={this.state.jobDetail} onChange={this.handleInputValue} name="jobDetail" style={{border:'solid 1px gray'}} autoSize={{minRows:10}}></Input.TextArea>
                                    </div>
                                    <Button size="large" style={{width:'150px',marginTop:'50px',color:'white',backgroundColor:'darkgreen'}} onClick={this.handleUpdateJob}>Update Job</Button>
                                </div> 
                        </Modal>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        jobsData:state.JobBoardReducer.JobBoardData,
        orders:state.OrderReducer.OrderData
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        readJob:()=>{dispatch(ReadJob())},
        deleteJob:(Id)=>{dispatch(DeleteJob(Id))},
        updateJob:(data)=>{dispatch(UpdateJob(data))},

        readOrders:()=>{dispatch(ReadOrders())}
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(MyProfile);