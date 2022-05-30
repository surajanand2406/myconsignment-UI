import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/AddService.css'
import firebase from 'firebase'
import {Divider,Input,Button,Upload,Modal,Spin,message} from 'antd'
import { Icon } from '@ant-design/compatible';

import SellerNavbar from './SellerNavbar'
import SellerSideBar from './SellerSideBar'
import {ReadExclusiveUserData} from '../../../store/actions/ExclusiveUserAction'
import {AddExclusiveService} from '../../../store/actions/ExclusiveServicesAction'

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

class AddService extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        isLoading:false,
        Id:'',
        asignedCategory:'',
        Title:'',
        Price:"",
        Description:'',
        Name:'',
        BusinessDes:'',
        userCountry:"",
        userImage:"",
        ImagesUrl:[]
    }

    
    ///Image Code
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        });
    };


    handleChange = ({fileList}) => {  
      
          this.setState({ fileList });    
    }
    //// End Of Image Code


    UNSAFE_componentWillReceiveProps(nextProps){
        nextProps.userData.map(user=>{
            if(user._id === this.props.match.params.id)
            {
                this.setState({
                    Id:user._id,
                    asignedCategory:user.Category,
                    Name:user.BusinessName,
                    userCountry:user.Country,
                    BusinessDes:user.BusinessDetail,
                    userImage:user.Image
                })
            }
        })
    }

    handleCreateService=()=>{

        if(this.state.Title.trim() === '' || this.state.Price.trim() === '' || this.state.Description.trim() === '' || this.state.fileList.length === 0)
        {
            message.error("Please fill all Fields Or Upload atleast 1 Image.......")
        }
        else if(this.state.Description.length < 120)
        {
            message.error("Description must be more than 120 characters...")
        }
        else
        {
            var nameReg = /^[a-zA-Z ]*$/;

            if(!nameReg.test(this.state.Title))
            {
                message.error("Title must contain only Alphabets...")
            }
            else
            {

                this.setState({isLoading:true})

                this.state.fileList.forEach(data=>{

                    var storageRef = firebase.storage().ref();
                    var mountainImagesRef = storageRef.child(`ExclusiveServicesImages/${this.state.Id}`+`_`+`${data.originFileObj.name}`);
            
                    mountainImagesRef.put(data.originFileObj).then(()=> {
                        mountainImagesRef.getDownloadURL().then((url)=>{  
                            console.log(url)
                            this.setState({ImagesUrl:this.state.ImagesUrl.concat(url)})
                        }).then(()=>{
                            if(this.state.ImagesUrl.length === this.state.fileList.length)
                            {
                                const obj = {
                                    Title:this.state.Title,
                                    Category:this.state.asignedCategory,
                                    Price:this.state.Price,
                                    Description:this.state.Description,
                                    Images:this.state.ImagesUrl,
                                    totalRatings:0,
                                    Reviews:[],
                                    userName:this.state.Name,
                                    userID:this.state.Id,
                                    userCountry:this.state.userCountry,
                                    userDetail:this.state.BusinessDes,
                                    userImage:this.state.userImage,
                                    postedDate:new Date().toDateString()
                                }
                        
                            this.props.addNewService(obj);

                            this.setState({
                                    Title:'',
                                    Price:"",
                                    Description:'',
                                    fileList:[],
                                    isLoading:false
                                })
                            }
                        })
                    })

                })
            }

        }
         
    }


    render() {

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = ( 
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        return (
            <div className="Add-Service-Container">
                <SellerNavbar Id={this.props.match.params.id} />
                <div className="Add-Service-Body-Container">
                    <SellerSideBar Id={this.props.match.params.id} />
                    <div className="Add-Service-Body">
                        <div className="Header">
                            <h1 style={{fontWeight:'bold',margin:0,fontSize:'35px'}}>Create New Service</h1>
                        </div>
                        <Divider></Divider>
                        <div className="Add-Service">
                            
                                <div className="Add-Service-Form">
                                <Spin spinning={this.state.isLoading}>
                                    <Input placeholder="Category..." size="large" value={this.state.asignedCategory} readOnly />
                                    <Input placeholder="Service Title" value={this.state.Title} style={{marginTop:15}} size="large" onChange={(e)=>this.setState({Title:e.target.value})} />
                                    <Input type="number" placeholder="Starting Price..." pattern="[0-9]" inputMode="numeric" value={this.state.Price} style={{marginTop:15}} size="large" onChange={(e)=>this.setState({Price:e.target.value})} />
                                    <Input.TextArea placeholder="Service Description...." value={this.state.Description} style={{marginTop:15}} rows="8" onChange={(e)=>this.setState({Description:e.target.value})}></Input.TextArea>
                                    <div style={{marginTop:15}}>
                                        <Upload
                                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={this.handlePreview}
                                            onChange={this.handleChange}
                                        >
                                        {fileList.length >= 5 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={previewVisible} bodyStyle={{padding:0}} footer={null} onCancel={this.handleCancel}>
                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                        </Modal>
                                    </div>
                                    <Button size="large" style={{backgroundColor:'darkgreen',color:'white',width:'150px',marginTop:15}} onClick={this.handleCreateService}>Create</Button>
                                    </Spin>
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
        userData:state.ExclusiveUserReducer.ExclusiveUserData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readUserData:()=>{dispatch(ReadExclusiveUserData())},
        addNewService:(serviceData)=>{dispatch(AddExclusiveService(serviceData))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddService);
