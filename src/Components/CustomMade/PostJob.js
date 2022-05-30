import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import {Input,Divider,Button,message} from 'antd'
import { Icon } from '@ant-design/compatible';
import './CSS/PostJob.css'
import CustomMadeNavbar from './CustomMadeNavbar'
import {PostNewJob} from '../../store/actions/JobBoardActions'


class PostJob extends Component {

    state={
    
        Title:'',
        Budget:'',
        Material:'',
        Size:'',
        Shipping:'',
        Image:'',
        jobDetail:'',
        Category:this.props.match.params.category,
        imageUrl:'',

        imageName:'No Image Choosen',
        userData:{}

    }

    componentDidMount(){
        const data = localStorage.getItem('userData')
        
        if(data)
        {
            this.setState({userData:JSON.parse(data)})
        }
    }

    handleImage=(path)=>{
        this.setState({imageName:path.target.files[0].name,Image:path.target.files[0]})
    }

    handleInputValue=(e)=>{
            this.setState({[e.target.name]:e.target.value})
    }

    handlePostJob=()=>{

        if(this.state.Title.trim()==="" || this.state.Budget.trim()==="" || this.state.Material.trim()==="" || this.state.Size.trim()==="" || this.state.Shipping.trim()==="" || this.state.Image=="" || this.state.jobDetail.trim()==="")
        {
            message.error("Please Fill all Fields")
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
                                ProfilePic:userData.profilePic
                            }
                            console.log(data)

                            this.props.postJob(data);

                            this.setState({
                                Title:'',
                                Budget:'',
                                Material:'',
                                Size:'',
                                Shipping:'',
                                Image:'',
                                jobDetail:'',
                                imageName:'No Image Choosen'
                            })
                                
                    }) 

                    })   
        }
    }

    render() {


        return (
            <div className="post-a-job-container">
                <CustomMadeNavbar />
                <div className="post-a-job-body-container">
                    <div className="post-a-job-form">
                        <div style={{width:'100%'}}>
                            <div>  
                                <Input size="large" value={this.state.Category} readOnly style={{border:'solid 1px gray'}} />
                            </div>
                            <Divider><h1>...</h1></Divider>
                            <div>
                                <h3>Job Title:</h3>
                                <Input size="large" name="Title" value={this.state.Title} onChange={this.handleInputValue} placeholder="Enter Your Job Title..." style={{border:'solid 1px gray'}} />
                            </div>
                            <div style={{marginTop:'30px'}}>
                                <h3>Your Budget:</h3>
                                <Input type='number' min='0' prefix='$' size="large" name="Budget" value={this.state.Budget} onChange={this.handleInputValue} placeholder="Enter Your Budget..." style={{border:'solid 1px gray'}} />
                            </div>
                            <div style={{marginTop:'30px'}}>
                                <h3>Describe Material:</h3>
                                <Input size="large" name="Material" value={this.state.Material} onChange={this.handleInputValue} placeholder="Hardwood, platinum etc..." style={{border:'solid 1px gray'}} />
                            </div>
                            <div style={{marginTop:'30px'}}>
                                <h3>Tell us about the size of material:</h3>
                                <Input size="large" name="Size" value={this.state.Size} onChange={this.handleInputValue} placeholder="Size...." style={{border:'solid 1px gray'}} />
                            </div>
                            <div style={{marginTop:'30px'}}>
                                <h3>Shipping:</h3>
                                <Input size="large" name="Shipping" value={this.state.Shipping} onChange={this.handleInputValue} placeholder="Shipping...." style={{border:'solid 1px gray'}} />
                            </div>
                            <div style={{marginTop:"30px",display:'flex',alignItems:'center'}}>

                                <input type="file" id="file" onChange={this.handleImage} />
                                <label for="file"><Icon type="upload" /> Choose a Image</label>
                                <p style={{margin:0,marginLeft:'5px',fontSize:'15px'}}>{this.state.imageName}</p>
            
                            </div>                     
                            <div style={{marginTop:'30px'}}>
                                <h3>Tell us more about material:</h3>
                                <Input.TextArea size="large" value={this.state.jobDetail} onChange={this.handleInputValue} name="jobDetail" style={{border:'solid 1px gray'}} autoSize={{minRows:10}}></Input.TextArea>
                            </div>
                            <Button size="large" style={{width:'150px',marginTop:'50px',color:'white',backgroundColor:'darkgreen'}} onClick={this.handlePostJob}>Post Job</Button>
                        </div> 
                    </div>
                    <div className="form-description">
                        <div style={{width:'80%'}}>
                            <p style={{backgroundColor:'#eeeeee',padding:'20px'}}>
                        Describe what you are willing to get designed and made. Buyer must describe what is exactly required as much as possible so Artisan can design and deliver your special Custom made piece.
                        <br/>
                        <br/>
                        <b>Steps to get your job done easily:</b>

                            <ol>
                                <li>
                               1.  Describe what you are looking for your special piece and Post your Job.
                                </li>
                                <li>
                               2.  Receive proposals for your job from worldwide Artisans.
                                </li>
                                <li>
                               3.  Describe what you are looking for youre special piece
                                </li>
                                <li>
                               4.  Communicate with Artisan and finalize the job details and cost.
                                </li>
                                <li>
                               5. Get your job done and complete order once satisfied.
                                </li>
                            </ol>

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        postJob:(data)=>{dispatch(PostNewJob(data))}
    }
}

export default connect(null,mapDispatchToProps)(PostJob);