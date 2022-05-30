import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import './CSS/SellerProfile.css'
import {Divider,Input, Button,Avatar,Upload,Spin, message} from 'antd'
import { Icon } from '@ant-design/compatible';

import SellerNavbar from './SellerNavbar'
import SellerSideBar from './SellerSideBar'
import {ReadExclusiveUserData,UpdateExclusiveUserData,ChnageExclusiveProfileImage} from '../../../store/actions/ExclusiveUserAction'

class SellerProfile extends Component {

    state={
        Id:'',
        Name:'',
        Email:'',
        Image:'',
        Contact:'',
        Password:'',
        Detail:'',
        isLoading:false
    }

    componentDidMount(){
        this.props.readUserData()
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        nextProps.userData.map(user=>{
            if(user._id === this.props.match.params.id)
            {
                this.setState({
                    Name:user.BusinessName,
                    Password:user.Password,
                    Contact:user.Contact,
                    Detail:user.BusinessDetail,
                    Image:user.Image,
                    Id:user._id
                })
            }
        })
    }

    handleChangeImage=(file)=>{

        this.setState({isLoading:true})

        var storageRef = firebase.storage().ref();
        var mountainImagesRef = storageRef.child(`ExclusiveUserImages/${file.file.originFileObj.name}`);

        mountainImagesRef.put(file.file.originFileObj).then(()=> {
            mountainImagesRef.getDownloadURL().then((url)=>{
                this.props.changeImage({Id:this.state.Id,Image:url})
                this.setState({isLoading:false})
            })

        })   
    }

    handleUpdate=()=>{

        var nameReg = /^[a-zA-Z ]*$/;
        var numReg = /^[0-9\b]+$/;

        if(this.state.Name.trim() !== '' && this.state.Password.trim !== '' && this.state.Contact !==0 && this.state.Detail.trim() !=='')
        {
            if(!nameReg.test(this.state.Name))
            {
                message.error("Name Must Contain Only Alphabets...")
            }
            else if(!numReg.test(this.state.Contact))
            {
                message.error("Contact Must Contain Only Digits...")
            }
            else
            {
                const data={
                    Id:this.state.Id,
                    Name:this.state.Name,
                    Password:this.state.Password,
                    Contact:this.state.Contact,
                    Detail:this.state.Detail
                }

                this.props.updateUserData(data)
            }
        }
        else
        {
            message.error("Please fill all Fields....");
        }
    }

    render() {
        return (
            <div className="seller-profile-Container">
                <SellerNavbar Id={this.props.match.params.id} />
                <div className="seller-profile-Body-Container">
                    <SellerSideBar Id={this.props.match.params.id} />
                    <div className="seller-profile-Body">
                        <div className="Header">
                            <h1 style={{fontWeight:'bold',margin:0,fontSize:'35px'}}>Profile Setting</h1>
                        </div>
                        <Divider></Divider>
                        <div className="seller-profile-setting">
                            <div className="seller-profile-image">
                                <Spin spinning={this.state.isLoading}>
                                    <Upload showUploadList={false} onChange={this.handleChangeImage}>
                                        <Avatar src={this.state.Image} size={150} />
                                    </Upload>
                                </Spin>
                                <h2>Click To Change Image.... </h2>
                            </div>
                            <div className="form">
                                <Input value={this.state.Name}  size="large" prefix={<Icon type="user" />} onChange={(e)=>this.setState({Name:e.target.value})} />
                                <Input.Password value={this.state.Password} style={{marginTop:15}} size="large" onChange={(e)=>this.setState({Password:e.target.value})} prefix={<Icon type="lock" />} />
                                <Input value={this.state.Contact} style={{marginTop:15}} size="large" onChange={(e)=>this.setState({Contact:e.target.value})} prefix={<Icon type="phone" />} />
                                <Input.TextArea value={this.state.Detail} style={{marginTop:15}} onChange={(e)=>this.setState({Detail:e.target.value})} rows="15"></Input.TextArea>
                                <Button size="large" style={{backgroundColor:'darkgreen',color:'white',width:'150px',marginTop:15}} onClick={this.handleUpdate}>Update</Button>
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
        updateUserData:(updatedData)=>{dispatch(UpdateExclusiveUserData(updatedData))},
        changeImage:(Image)=>{dispatch(ChnageExclusiveProfileImage(Image))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SellerProfile);
