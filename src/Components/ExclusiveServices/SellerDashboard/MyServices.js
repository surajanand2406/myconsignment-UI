import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import './CSS/MyServices.css'
import {Link} from 'react-router-dom'
import {Input,Button,Divider,List,Card,Avatar,Rate,Modal,Upload} from 'antd'
import { Icon } from '@ant-design/compatible';

import Truncate from 'react-truncate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faTrash,faPen} from '@fortawesome/free-solid-svg-icons'
import SellerNavbar from './SellerNavbar'
import SellerSideBar from './SellerSideBar'
import {ReadExclusiveServices,DeleteExclusiveServices,UpdateExclusiveService} from '../../../store/actions/ExclusiveServicesAction'


var width = window.screen.width;
class MyServices extends Component {

    state={
        windowWidth:width,
        isEditModal:false,
        Id:'',
        Title:'',
        Price:'',
        Des:'',
        Images:[],
        data:[]

    }

    componentDidMount(){
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width})
        }) 

        this.props.readServices();
    }


    UNSAFE_componentWillReceiveProps(nextProps){

        let data = nextProps.serviceData.filter(service=>{
            return service.userID === this.props.match.params.id
        })
        this.setState({
            data
        })

    }

    handleSearch=(e)=>{
        let list = [];

        
        if(e.target.value.trim() !=="")
        {
                list = this.state.data;

              let  updatedList = list.filter(data=>{
                    const item = data.ServiceTitle.toLowerCase();
                    const value = e.target.value.toLowerCase();

                    return item.includes(value);
                })

                this.setState({data:updatedList})
        }
        else
        {
          let  updatedList = this.props.serviceData.filter(service=>{
                return service.userID === this.props.match.params.id
            })

            this.setState({data:updatedList})
        }
    }

    handleEditServiceModal=(Id)=>{
        this.setState({isEditModal:true})

        this.props.serviceData.map(service=>{
            if(service._id === Id)
            {
                this.setState({
                    Id:service._id,
                    Title:service.ServiceTitle,
                    Price:service.Price,
                    Des:service.ServiceDescription,
                    Images:service.Images
                })   
            }
        })
    }

    changeImage=({i,file})=>{

        var storageRef = firebase.storage().ref();
        var mountainImagesRef = storageRef.child(`ExclusiveServicesImages/${this.props.match.params.id}`+`_`+`${file.file.originFileObj.name}`);

        mountainImagesRef.put(file.file.originFileObj).then(()=> {
            mountainImagesRef.getDownloadURL().then((url)=>{  
                const newArray = Object.assign([], this.state.Images, {[i]: url});
                this.setState({Images:newArray})
            })
        })
    }

    handleDeleteImage=(link)=>{

      const newArr =  this.state.Images.filter(links=>{
            return links !== link
        })

        this.setState({Images:newArr})
    }

    handleDeleteService=(Id)=>{
        this.props.deleteServices({Id})
    }


    handleEditService=()=>{
        if(this.state.Title.trim() !== '' && this.state.Price.trim !== '' && this.state.Des.trim() !== '' && this.state.Images.length !== 0)
        {
            const obj ={
                Id:this.state.Id,
                Title:this.state.Title,
                Price:this.state.Price,
                Description:this.state.Des,
                Images:this.state.Images
            }

            this.setState({
                isEditModal:false
            })

            this.props.updateServices(obj)
        }
    }


    render() {

        return (
            <div className="my-services-Container">
                <SellerNavbar Id={this.props.match.params.id} />
                <div className="my-services-Body-Container">
                    <SellerSideBar Id={this.props.match.params.id} />
                    <div className="my-services-Body">
                        <div className="Header">
                            <h1 style={{fontWeight:'bold',margin:0,fontSize:'35px'}}>My Services</h1>
                            <Input.Search placeholder="Search Services" style={this.state.windowWidth <= 360 ? { width: 280 } : this.state.windowWidth < 576 ? { width: 330 } : {width:500}} prefix={<Icon type="search" />} size="large" onChange={this.handleSearch}/>
                        </div>
                        <Divider></Divider>
                        <List 
                            grid={{gutter:16,xxl:3,xl:3,lg:2,md:2,sm:2}}
                            dataSource={this.state.data} 
                            pagination={{pageSize:16}}
                            renderItem={(item)=>(
                                <List.Item>
                                        <Card
                                            style={this.state.windowWidth <= 360 ? { width: 280 } : this.state.windowWidth < 576 ? { width: 330 } :this.state.windowWidth < 768 ? { width: 250 } : { width: 330 }}
                                            bodyStyle={{padding:0}}
                                            cover={<img alt='service cover' style={this.state.windowWidth <= 360 ? { width: 280 } : this.state.windowWidth < 576 ? { width: 330 } : this.state.windowWidth < 768 ? { width: 250 } : {width:330 ,height:250}} src={item.Images[0]}/>}
                                        >
                                            <div >
                                                <div style={{padding:10}}>
                                                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                                        <div style={{display:'flex',alignItems:'center'}}>
                                                            <Avatar src={item.userImage} size="default" />
                                                            <h4 style={{margin:0,fontWeight:'bold',marginLeft:10}}>{item.userName}</h4>
                                                        </div>
                                                        <div style={{display:'flex',alignItems:'center'}}>
                                                            <Rate count={1} value={item.totalRatings} disabled={true} style={{fontSize:'15',marginBottom:5}} autoFocus={true} />
                                                            <h3 style={{margin:0,color:"#fadb14",fontWeight:'bold',marginLeft:5}}>{item.totalRatings}</h3>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div>
                                                        <h3 style={{fontWeight:'bold',margin:0}}>{item.ServiceTitle}</h3>
                                                        <Truncate lines="3">{item.ServiceDescription}</Truncate>
                                                    </div>
                                                </div>
                                                <div style={{padding:10,backgroundColor:"#eeeeee",display:"flex",justifyContent:'space-between',alignItems:'center'}}>
                                                    <Link to={`/exclusive-services/${this.props.match.params.id}/seller-my-service-description/${item._id}`} style={{color:'darkgreen'}}>
                                                            <FontAwesomeIcon icon={faEye} /> View
                                                    </Link>
                                                    <Link style={{color:'darkgreen'}} onClick={()=>this.handleEditServiceModal(item._id)}>
                                                            <FontAwesomeIcon icon={faPen} /> Edit
                                                    </Link>
                                                    <Link style={{color:'darkgreen'}} onClick={()=>this.handleDeleteService(item._id)}>
                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                </List.Item>
                           )}
                        
                        />

                        <Modal visible={this.state.isEditModal} title="Edit Service" onCancel={()=>this.setState({isEditModal:!this.state.isEditModal})} footer={null} bodyStyle={{padding:0}}>
                            <div style={{padding:10}}>
                                <Input size="large" value={this.state.Title} onChange={(e)=>this.setState({Title:e.target.value})} />
                                <Input size="large" style={{marginTop:5}} value={this.state.Price}onChange={(e)=>this.setState({Price:e.target.value})}   />
                                <Input.TextArea size="large" rows="10" style={{marginTop:5}} value={this.state.Des} onChange={(e)=>this.setState({Des:e.target.value})}  ></Input.TextArea>
                                <div style={{display:'flex',alignItems:'center',marginTop:5}}>
                                    {
                                        this.state.Images.map((link,i)=>{
                                            return  (
                                                
                                                <div style={{width:80,height:80,border:'solid 1px gray',marginRight:5}}>
                                                    <Upload showUploadList={false} onChange={(file)=>this.changeImage({i,file})}>
                                                        <img src={link} style={{width:80,height:80}} />
                                                    </Upload>
                                                    <Icon type="delete" className="cursor" style={{position:'relative',top:'0%',color:'#8b0000'}} title="Delete"  onClick={()=>this.handleDeleteImage(link)} /> Delete
                                                </div>
                                                
                                                )
                                        })
                                    }
                                </div>
                                <Button size="large" style={{marginTop:35,backgroundColor:'#b17e4e',color:'white'}} onClick={this.handleEditService}>Update</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        serviceData:state.ExclusiveServicesReducer.ExclusiveServicesData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readServices:()=>{dispatch(ReadExclusiveServices())},
        deleteServices:(deleteService)=>{dispatch(DeleteExclusiveServices(deleteService))},
        updateServices:(updatedService)=>{dispatch(UpdateExclusiveService(updatedService))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyServices);
