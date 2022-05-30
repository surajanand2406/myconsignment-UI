import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from 'firebase'
import Gallery from 'react-grid-gallery';
import './CSS/AdminSponsor.css'
import { Button,Divider,Input,Modal,message,Spin} from 'antd'
import { Icon } from '@ant-design/compatible';
import {StartEvent,UpdateEvent,DeleteComment,AddComment, ReadEvent} from '../../store/actions/SponsorAction'
import {Line } from 'react-chartjs-2'

class AdminSponsor extends Component {

    state={

        textareaValue:'',
        updateTitleValue:'',
        updateAmountValue:'',


        newEventModal:false,
        eventTitle:'',
        eventAmount:'',

        imageWdith:70,
        imageHeight:70,


        previewVisible: false,
        previewImage: '',
        imagesList: [],
        imagesUrl:[],
        isEdit:false,

        imageIndex:0,
        isLoading:false
    }

/////Commponent Did Mount

componentDidMount(){

  this.props.readEvent();

}


//For Generate Event

handleGenerateEventInput=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}

handleGenerateEvent=()=>{

    this.setState({eventTitle:'',eventAmount:'',newEventModal:false})

    const date = new Date();

    const newEvent = {
            Title:this.state.eventTitle,
            targetedAmount:parseInt(this.state.eventAmount),
            Donation:0,
            RequireAmount:0,
            GraphData:[0],
            Comments:[],
            Date:date.toLocaleDateString(),
            
    }

    this.props.startEvent(newEvent)
}



/// handling Upadation

handleUpdateValue=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
}

handleUpdation=(Id)=>{

    var amount = parseInt(this.state.updateAmountValue)

    const newValue = {
        Id:Id,
        Title:this.state.updateTitleValue,
        TargetedAmount:amount
    }

    this.setState({isEdit:false})
    this.props.updateEvent(newValue);

}




///Delete images from List
deleteImageFromList=()=>{


    var imagePath = this.state.imagesUrl[this.state.imageIndex]

    var desertRef = firebase.storage().refFromURL(imagePath)

    desertRef.delete().then(()=> {

        var image = this.state.imagesUrl.filter(data=>{
            return data !== this.state.imagesUrl[this.state.imageIndex]
        })
        this.setState({imagesUrl:image,previewVisible:false})
    }).catch(function(error) {
        console.log(error)
    });
    
}




//handle Comment
handleComment=(Id)=>{

    const textValue = this.state.textareaValue;

    const text = this.state.textareaValue.trim();

    if(text===''){
        message.error("Please Enter Text")
    }
    else if(this.state.imagesUrl.length===0){
        message.error("Please Select Image")
    }
    else{
            const newCom = this.state.imagesUrl.map(URL=>{
                return {
                    src:URL,
                    thumbnail:URL,
                    thumbnailWidth:this.state.imageWdith,
                    thumbnailHeight:this.state.imageHeight
                }  
            })

            this.setState({imagesUrl:[],textareaValue:'',imagesList:[],imagesURL:[]})

            this.props.addComment({Id:Id,Comment:{Images:newCom,Text:textValue}})
            
    }

    
}


handleDeleteComment=(data)=>{
    this.props.deleteComment(data)
}


///Handling Text area value

handleTextArea=(e)=>{
    this.setState({textareaValue:e.target.value})
}


///Getting Images
getImages=(e)=>{

        var storageRef = firebase.storage().ref();             

        var ImagesRef = storageRef.child(`UploadImages/${e.target.files[0].name}`);

        ImagesRef.put(e.target.files[0]).then(()=> {
            ImagesRef.getDownloadURL().then((url)=>{
                this.setState({imagesUrl:this.state.imagesUrl.concat(url)})
            })
            
        })
            
}


//Handle image preview Modal
handleCancel = () => this.setState({ imageIndex:0,previewVisible: false });

handlePreview = (i) => {
    
    this.setState({previewVisible:true,previewImage:this.state.imagesUrl[i],imageIndex:i})
};



///For edit Event
handleIsEdit=()=>{ 
    this.props.sponsorData.map(data=>{

        this.setState({
            updateTitleValue:data.Title,
            updateAmountValue:data.TargetedAmount
        })
    })

    this.setState({isEdit:true})
} 





render() {

    var Data={
        Id:'',
        Title:'',
        TargetedAmount:0,
        Donation:0,
        GraphData:[],
        Comments:[],


        event:'',
        
    };

    this.props.sponsorData.map(data=>{
        
        Data.Id = data._id;
        Data.Title = data.Title;
        Data.TargetedAmount = data.TargetedAmount;
        Data.Donation = data.Donation;
        Data.GraphData = data.GraphData;
        Data.Comments = data.Comments;


        Data.event = data.event


    })

        
    const lineData = {
        labels: [
            'Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7','Day 8','Day 9','Day 10',
            'Day 11','Day 12','Day 13','Day 14','Day 15','Day 16','Day 17','Day 18','Day 19','Day 20',
            'Day 21','Day 22','Day 23','Day 24','Day 25','Day 26','Day 27','Day 28','Day 29','Day 30',
        ],
        datasets: [
            {
            fill: false,
            lineTension: 0.1,
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'red',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'red',
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            data: Data.GraphData
            }
        ]
        };


        var chartOptions = {
        showScale: true,
        pointDot: true,
        showLines: true,
        legend:{
                display:false
        },

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    min: 0,
                    max: Data.TargetedAmount,
                    callback: function(label) {
                        return '$'+ label;}
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Amount'
                }
                }]
            }
    }

    
        return (
            <div className="AdminSponsor-container">
                <div className="AdminSponsor-body-container">
                {
                    Data.event === "No Event Started" ? 

                        <div style={{dispplay:'flex',flexDirection:'column',width:'70%'}}>
                            <div style={{display:'flex',justifyContent:"space-between",marginTop:'50px',width:'100%',padding:'10px',backgroundColor:'#eeeeee'}}> 
                                <h1 style={{margin:0,color:'gray'}}>{Data.event}</h1>
                                <Button size="large" style={{backgroundColor:'#8b0000',color:'white',width:'150px',borderRadius:'5px'}} onClick={()=>{this.setState({newEventModal:true})}} >Start Event</Button>
                            </div>

                            <Modal title="Event Info" visible={this.state.newEventModal} footer={null} onCancel={()=>this.setState({newEventModal:false})} >
                                <div>
                                    <Input placeholder="Enter Title...." name="eventTitle" value={this.state.eventTitle} size="large" onChange={this.handleGenerateEventInput} />
                                    <Input placeholder="Amount Required...." name="eventAmount" value={this.state.eventAmount} style={{marginTop:'10px',marginBottom:'10px'}} size="large" onChange={this.handleGenerateEventInput} />
                                    <Button size="large" style={{backgroundColor:'#B17E4E',color:'white'}} onClick={this.handleGenerateEvent}>Generate Event</Button>
                                </div>
                            </Modal>

                            <Divider><h1>...</h1></Divider>
                        </div>

                    : 
    
                    <div className="AdminSponsor-body">
                    
                        <div className="AdminSponsor-title">
                            <div>                               
                                {
                                    this.state.isEdit===true ?
                                        <>
                                            <Input className="input" value={this.state.updateTitleValue} name="updateTitleValue" style={{border:'none',borderBottom:'solid 1px gray'}} onChange={this.handleUpdateValue}  />
                                            <Input className="input" value={this.state.updateAmountValue} name="updateAmountValue" style={{border:'none',borderBottom:'solid 1px gray'}} onChange={this.handleUpdateValue}  />
                                        </>
                                    :
                                        <>
                                            <h1 style={{margin:0}}>{Data.Title}</h1>
                                            <h3 style={{margin:0}}>Targeted Amount: ${Data.TargetedAmount}</h3>
                                            <h4>Require Amount: ${Data.TargetedAmount - Data.Donation}</h4>
                                        </>
                                }
                            </div>
                            <div>
                            {
                                this.state.isEdit===true ?
                                    <Button size="large" style={{backgroundColor:'#B17E4E',color:'white',width:'120px',marginRight:"10px",borderRadius:'5px'}} onClick={()=>this.handleUpdation(Data.Id)} >Update</Button>
                                :
                                    <Button size="large" style={{backgroundColor:'#B17E4E',color:'white',width:'120px',marginRight:"10px",borderRadius:'5px'}} onClick={this.handleIsEdit} >Edit</Button>
                            }
                                <Button size="large" style={{backgroundColor:'#8b0000',color:'white',width:'150px',borderRadius:'5px'}} onClick={()=>{this.setState({newEventModal:true})}} >Start New Event</Button>
                                <Modal title="Event Info" visible={this.state.newEventModal} footer={null} onCancel={()=>this.setState({newEventModal:false})} >
                                    <div>
                                        <Input placeholder="Enter Title...." name="eventTitle" value={this.state.eventTitle} size="large" onChange={this.handleGenerateEventInput} />
                                        <Input placeholder="Amount Required...." name="eventAmount" value={this.state.eventAmount} style={{marginTop:'10px',marginBottom:'10px'}} size="large" onChange={this.handleGenerateEventInput} />
                                        <Button size="large" style={{backgroundColor:'#B17E4E',color:'white'}} onClick={this.handleGenerateEvent}>Generate Event</Button>
                                    </div>
                                </Modal>
                            
                            </div>
                            
                        
                        </div>
                        <Divider><h1>...</h1></Divider>
                        <div className="AdminSponsor-graph-area">
                            <Line data={lineData} options={chartOptions} width="100%" height="40%" />
                        </div>
                        <Divider><h1>...</h1></Divider>
                        <div className="AdminSponsor-latest-update-section">
                            <h1 style={{fontSize:'30px',textAlign:'center'}}>Latest Update</h1>
                                {
                                    Data.Comments === [] ? ""
                                    :
                                    Data.Comments.map((cData,i)=>{
                                        return(
                                            <div className="AdminSponsor-latest-update-News-section">
                                                <div style={{display:'flex',justifyContent:'flex-end'}}>
                                                    <h4 style={{color:'#8b0000'}} onClick={()=>this.handleDeleteComment({Id:Data.Id,Index:i})} ><Icon type='delete' style={{fontSize:'15px'}} /> Delete</h4>
                                                </div>
                                                
                                                <div className="news">
                                                    <div className="gallery">
                                                        <Gallery images={cData.Images} />
                                                    </div>
                                                    <div className="text">
                                                        <h5 style={{fontFamily:'Times New Roman',fontSize:'20px'}}>{cData.Text}</h5>
                                                    </div>
                                                </div>      
                                            </div>
                                        )
                                    })   
                                }
                            <Divider><h1>...</h1></Divider>

                            <div style={{display:'flex',flexDirection:'column'}}>
                                <Input.TextArea rows="10" size="large" placeholder="Enter Text Here...." style={{marginBottom:'20px'}} value={this.state.textareaValue} onChange={this.handleTextArea} />
                                <div style={{display:'flex'}}> 
                                    {
                                        this.state.fileList === [] ? ""
                                        :
                                        this.state.imagesUrl.map((images,index)=>{
                                            
                                            return (
                                                <>
                                                    <div style={{width:'150px',height:'150px',backgroundColor:'lightgray',marginRight:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                        <img style={{width:'130px',height:'130px'}} src={images} onClick={()=>{this.handlePreview(index)}} />
                                                    </div>
                                                    {
                                                            this.state.imagesUrl.length -1 === index && <>
                                                            <input type="file" id="file" onChange={this.getImages} style={{display:'none'}} />
                                                            <label for="file" style={{backgroundColor:'#eeeeee',width:'150px',height:'150px',borderRadius:5,padding:5,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                                <Icon style={{fontSize:'20px'}} type="plus" />Add More
                                                            </label>
                                                        </>
                                                    }
                                                
                                                    <Modal visible={this.state.previewVisible} footer={null} title={<Icon type='delete' style={{fontSize:'15px'}} onClick={this.deleteImageFromList} />} onCancel={this.handleCancel}>
                                                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                                    </Modal>  
                                                </>             

                                            );
                                                
                                        })
                                    }
                                </div>

                                {
                                    this.state.imagesUrl.length > 0 || this.state.isLoading===true ? null 
                                    : 
                                    <>
                                        <input type="file" id="file" onChange={this.getImages} style={{display:'none'}} />
                                        <label for="file" style={{backgroundColor:'#eeeeee',width:'150px',height:'150px',marginTop:5,borderRadius:5,padding:5,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                            <Icon type="upload" style={{fontSize:'20px'}} />Upload Image
                                        </label>
                                    </>

                                }      
                                <Button size="large" style={{backgroundColor:"#B17E4E",color:'white',marginTop:'20px',width:'200px',borderRadius:'5px'}} onClick={()=>this.handleComment(Data.Id)}>Add Comment</Button>
                            </div>
                        </div>
                    </div>
                }
                </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        sponsorData:state.SponsorReducer.SponsorData
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        readEvent:()=>{dispatch(ReadEvent())},
        deleteComment:(commentIndex)=>{dispatch(DeleteComment(commentIndex))},
        updateEvent:(value)=>{dispatch(UpdateEvent(value))},
        addComment:(comment)=>{dispatch(AddComment(comment))},
        startEvent:(newEvent)=>{dispatch(StartEvent(newEvent))}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AdminSponsor);

