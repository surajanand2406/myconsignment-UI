import React, { Component } from 'react'
import Navbar from './Navbar'
import {Avatar,Form ,Input,Tooltip,Button,Upload} from 'antd'
import { Icon } from '@ant-design/compatible';
import './CSS/ProfileSetting.css'
import ProfileSidebar from './ProfileSidebar'
import { setLocationAction } from "../store/actions/actions.js";
import { connect } from 'react-redux';

import Firebase from 'firebase'
import PlacesAutocomplete, {
    geocodeByAddress,
  } from 'react-places-autocomplete';

import { url,headers} from '../Constants'
class Profile extends Component {
    constructor(props)
    {
        super(props)
        this.initialState = {
            isProfile:true,
            isPass:false,
            userData:null,
            imageURL:"https://p7.hiclipart.com/preview/340/956/944/computer-icons-user-profile-head-ico-download.jpg",
            fName:"",
            username:"",
            email:"",
            uploading:false,
            renderSuccess:true,
            oldPassword:"",
            newPassword:"",
            confirmPassword:"",
            changingPassword:false,
            address:""
        }
        this.state={
            ...this.initialState
        }
        this.handleImage=this.handleImage.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handlePasswordUpdate=this.handlePasswordUpdate.bind(this)
    }   
    componentDidMount(){
        let data = localStorage.getItem('userData')
        if(data!==null){
            let userData = JSON.parse(data)
            this.setState({
                userData,
                email:userData.email,
                fName:userData.fName,
                profilePic:userData.profilePic,
                username:userData.username
            })
        }
    }
    handleIsProfile=()=>{
        this.setState({
            isProfile:true,
            isPass:false
        })
    }
    hanleIsPass=()=>{
        this.setState({
            isPass:true,
            isProfile:false
        })
    }
    handleImage(file){
        // console.log(file.file.originFileObj)
        let storage = Firebase.storage()
        let storageRef = storage.ref(`artisan/djiosjo290jcjew9cjw3d/image`+Date.now())
        let task = storageRef.put(file.file.originFileObj)
        task.on('state_changed', function (snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   console.log('Upload is ' + progress.toFixed(2) + '% done');
          switch (snapshot.state) {
            case Firebase.storage.TaskState.PAUSED: // or 'paused'
              //   console.log('Upload is paused');
              break;
            case Firebase.storage.TaskState.RUNNING: // or 'running'
                console.log(progress);
              break;
              default:
              return
          }
        }, function (error) {
          alert(error.message)
        }, () => {
          storageRef.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL)
            let data = {
                firebaseUID:this.state.userData.firebaseUID,
                profilePic:downloadURL
            }
            fetch(url+'/api/addImage',{method:"PUT",body:JSON.stringify(data),headers: { "Content-Type": "application/json" }})
            .then(res=>res.json())
            .then(data=>{
                if(data.message==='Success'){
                    this.setState({
                        imageURL:downloadURL
                    })
                }
                else{
                    alert('Error uploading image')
                }
            })
          });
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit(){
         let data = {
             firebaseUID:this.state.userData.firebaseUID,
             email:this.state.email,
             fName:this.state.fName,
             username:this.state.username
         }
         this.setState({
             uploading:true
         })
         fetch(url+'/api/updateUser',{method:"PUT",body:JSON.stringify(data),headers:headers}).then(res=>res.json())
         .then(data=>{
            this.setState({
                uploading:false
            })
            console.log(data)
            if(data.message==='Success'){
                this.setState({
                    renderSuccess:true
                })  
                setTimeout(()=>{
                    this.setState({
                        renderSuccess:false
                    })
                },2000)
             }
             else{
                 alert("Failed updating user data")
             }
         })
    }
    handleAddressChange = address => {
        this.setState({ address });
      };
    handleSelect = address => {
        console.log(address)
        this.setState({
          address
        })
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDRBIi3meFD4Vj6Okb-hmvK6wKN2Wy9v5s`)
        .then(response=>response.json())
        .then(data=>{
          if(data.results){
            let location={
              lat:data.results[0].geometry.location.lat,
              lng:data.results[0].geometry.location.lng,
            }
            console.log(location)
            this.props.setLocation(location)
          }
        })
        geocodeByAddress(address)
          .then(results => console.log(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
      };
    handlePasswordUpdate(){
        if(this.state.oldPassword.length<6 || this.state.newPassword.length<6 || this.state.confirmPassword.length<6){
            alert('Password must be 6 or characters')
        }
        else{
            if(this.state.newPassword===this.state.confirmPassword){
                this.setState({
                    changingPassword:true
                })
                let data = {
                    firebaseUID:this.state.userData.firebaseUID,
                    newPassword:this.state.newPassword
                }
                fetch(url+'/api/updatePassword',{method:"PUT",body:JSON.stringify(data),headers:headers})
                .then(res=>res.json())
                .then(response=>{
                    this.setState({
                        changingPassword:false
                    })
                    if(response.message==='Success'){
                        alert("Password Updated Successfully!")
                    }
                    else{
                        console.log(response)
                        alert("Failed to update user password")
                    }
                })
            }
            else{
                alert('Passwords do not match')
            }
        }
    }
    render() {

        const styles = {
            width:'50%',
            textAlign:'center',
            fontSize:'15px',
            borderBottom:'solid 1px lightgray',
            padding:'5px'
        }
        const styles1 = {
            width:'50%',
            textAlign:'center',
            fontSize:'15px',
            color:'darkcyan',
            borderBottom:'solid 2px darkcyan',
            padding:'5px',
            fontWeight:'bold'
        }

        return (
            <div className="ProfileSetting-container">
                <Navbar />
                <div className="profileSetting-body-container">
                    <ProfileSidebar />
                    <div className="profileSetting-body">
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <div style={{display:"flex",flexDirection:'column',alignItems:"center"}}>
                                <Upload onChange={this.handleImage}   accept='image/*' showUploadList={false}><Avatar src={this.state.imageURL} size={120} /></Upload>
                                <h3 style={{margin:'0px',marginTop:'5px'}}>Click To Change Image</h3>
                            </div>
                        </div>
                        
                    

                        <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                            <div className="profileSetting-body-menu" >
                                <div className="menu" style={this.state.isProfile===true ? styles1 : styles} onClick={this.handleIsProfile}>Profile</div>
                                <div className="menu" style={this.state.isPass===true ? styles1 : styles} onClick={this.hanleIsPass}>Password</div>
                            </div>
                        </div>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            {
                                this.state.isProfile===true ?
                                    <div style={{marginTop:'30px'}}>
                                        <Form>
                                            <Input value={this.state.fName} onChange={this.handleChange} name='fName' style={{height:'40px',marginBottom:'10px'}} placeholder="Name" prefix={<Icon type="user" style={{color:'gray',fontSize:'15px'}} />} />
                                            <Input value={this.state.username} onChange={this.handleChange} name='username' style={{height:'40px',marginBottom:'10px'}} placeholder="Username" prefix={<Icon type="user" style={{color:'gray',fontSize:'15px'}} />} />
                                            <Input value={this.state.email} onChange={this.handleChange} name='email' style={{height:'40px',marginBottom:'10px'}} placeholder="Email" prefix={<Icon type="mail" style={{color:'gray',fontSize:'15px'}} />} />
                                            {/* <Input onChange={this.handleChange} name='location' style={{height:'40px',marginBottom:'10px'}} placeholder="Location" prefix={<Icon type="environment" style={{color:'gray',fontSize:'15px'}} />} /> */}
                                            <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleAddressChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input


              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <br/>
                                            <Button onClick={this.handleSubmit} disabled={this.state.uploading} loading={this.state.uploading} style={{backgroundColor:'darkgreen',color:'white',width:'150px'}} shape="round" size="large">Save</Button>
                                        </Form>
                                    </div>
                                : 
                                    <div style={{marginTop:'30px'}}>
                                        <Form>
                                            <Tooltip
                                                trigger={['focus']}
                                                title="Old Password"
                                                placement="topLeft"
                                            >
                                                <Input.Password value={this.state.oldPassword} name='oldPassword' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Enter Old Password...." prefix={<Icon type="lock" style={{color:'gray',fontSize:'15px'}} />} />
                                            </Tooltip> 
                                            <Tooltip
                                                trigger={['focus']}
                                                title="New Password"
                                                placement="topLeft"
                                            >
                                                <Input.Password value={this.state.newPassword} name='newPassword' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Enter New Password...." prefix={<Icon type="lock" style={{color:'gray',fontSize:'15px'}} />} />
                                            </Tooltip>
                                            <Tooltip
                                                trigger={['focus']}
                                                title="Confirm New Password"
                                                placement="topLeft"
                                            >
                                                <Input.Password value={this.state.confirmPassword} name='confirmPassword' onChange={this.handleChange} style={{height:'40px',marginBottom:'10px'}} placeholder="Confirm New Password...." prefix={<Icon type="lock" style={{color:'gray',fontSize:'15px'}} />} />
                                            </Tooltip>

                                                <Button disabled={this.state.changingPassword} loading={this.state.changingPassword} onClick={this.handlePasswordUpdate} style={{backgroundColor:'darkgreen',color:'white',width:'150px'}} shape="round" size="large" >Save</Button>
                                        </Form>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                {/* {this.state.renderSuccess===true && 
                <Modal
                visible={this.state.renderSuccess}
                maskClosable={true}
                style={{backgroundColor:"none",opacity:0.8}}
                >
                    <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  />
                    </Modal>} */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        categories:state.rootReducer.categories,
        UID:state.rootReducer.UID,
        query:state.rootReducer.query,
        data:state.rootReducer.data,
        currentLocation:state.rootReducer.currentLocation,
        serviceData:state.ExclusiveServicesReducer.ExclusiveServicesData
    })
}
function mapActionsToProps(dispatch) {
    return ({
        setLocation:(location)=>{
          dispatch(setLocationAction(location))
        }
    })
}

export default connect(mapStateToProps,mapActionsToProps)(Profile)