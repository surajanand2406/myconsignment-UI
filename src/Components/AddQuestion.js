import React, { Component } from 'react'
import firebase from "firebase";
import {connect} from 'react-redux'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {Input, Button,Divider,Select,message} from 'antd'
import {AddTopic,ReadQuestions,AddNewQuestion} from '../store/actions/AddQuestionAction';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './CSS/AddQuestion.css'


function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            console.log('Uploading image...');
            var storageRef = firebase.storage().ref();
                        var mountainImagesRef = storageRef.child(`HelpCenterImages/${file.name}`);
                
                        mountainImagesRef.put(file).then(()=> {
                            mountainImagesRef.getDownloadURL().then((url)=>{
                                console.log(url)
                                resolve({data:{url}})
                            })
                        })
                .catch(error => {
                    reject(error);
                })
        }
    );
}



class AddQuestion extends Component {
    
    constructor(props){
        super(props);
        this.state={
            editorState:EditorState.createEmpty(),
            uploadImages: [],
            file:null,

            topic:'',
            questions:[],
            SelectedtopicId:'',
            quesInput:''
        }
    }

    componentDidMount(){
        this.props.readQuestions();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({questions:nextProps.questions})
   }


    onEditorStateChange=(editorState)=>{
       this.setState({editorState})
    };

    handleInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    addNewTopic=()=>{
        if(this.state.topic.trim() !=='')
        {
            this.props.addTopic({topic:this.state.topic})
            this.setState({topic:''})
        }
        else
        {
            message.error("Please Add Topic")
        }
    }

    handleSelectQuestion=(Id)=>{
        this.setState({SelectedtopicId:Id})
    }

    handleAddQuestion=()=>{

        var des = convertToRaw(this.state.editorState.getCurrentContent())

        if(this.state.SelectedtopicId.trim() !== '' || this.state.quesInput.trim() !== '' )
        {
                var data={
                    topicId:this.state.SelectedtopicId,
                    Questions:{
                        question:this.state.quesInput,
                        description:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                    }
                    
                }

       
                this.props.addQuestion(data)
                this.setState({
                    SelectedtopicId:'',
                    quesInput:'',
                    editorState:EditorState.createEmpty()
                })
            }
        else
            {
                message.error("Please Fill All Boxes...")
            }

    }


    render() {

        return (
            <div className="AddQuestion-Container">
                <div className="AddQuestion-body">
                        <div style={{display:'flex',alignItems:'center'}}>
                            <Input value={this.state.topic} name="topic" placeholder="Add New Topic..." size="large" onChange={this.handleInputValue} /> 
                            <Button onClick={this.addNewTopic} size="large" style={{width:'150px',backgroundColor:'#b17e4e',color:'white'}}>Add</Button>
                        </div>
                        <Divider><h1>...</h1></Divider>

                        <Select readonly value={this.state.SelectedtopicId} placeholder="Select topic" size="large" style={{width:'100%',marginBottom:20}} onChange={(Id)=>this.handleSelectQuestion(Id)}>
                            {
                                this.state.questions.length !==0 ?
                                    this.state.questions.map(question=>{
                                    return <Select.Option value={question._id}>{question.Topic}</Select.Option>
                                    })
                                :
                                null
                            }
                        </Select>
                        <Input style={{marginBottom:20}} value={this.state.quesInput} onChange={(e)=>this.setState({quesInput:e.target.value})} placeholder="Write Question..." size="large" /> 
                        <div style={{overflowY:'auto',height:400,border:'solid 1px #eeeeee',padding:5}}>
                            <Editor                               
                                toolbar={{
                                    image: {
                                    uploadCallback: uploadImageCallBack,
                                    previewImage: true,
                                    alt: { present: true, mandatory: false },
                                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                    },
                                    blockType: {
                                        inDropdown: true,
                                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                                    },
                                    textAlign: {
                                        visible: true,
                                        left: { visible: true },
                                        center: { visible: true },
                                        right: { visible: true },
                                        justify: { visible: true }
                                      },
                                    inline: {
                                        options: ['bold', 'italic','underline'],
                                    },
                                    list: {
                                        visible: true,
                                        unordered: { visible: true },
                                        ordered: { visible: true },
                                        indent: { visible: true },
                                        outdent: { visible: true }
                                      },
                                    fontSize: {
                                        className: 'bordered-option-classname',
                                    },
                                    fontFamily: {
                                        className: 'bordered-option-classname',
                                    },
                                    options: ['blockType','fontSize', 'fontFamily', 'inline', 'list','textAlign','image'],
                                }}
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                        <Button size="large" style={{width:'150px',backgroundColor:'#8b0000',color:'white',marginTop:'20px'}} onClick={this.handleAddQuestion}>Add Question</Button>

                        {/* <textarea
                            disabled
                            value={this.state.editorState && draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
                        /> */}

                </div>
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        questions:state.HelpCenterReducer.HelpCenterData
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        readQuestions:()=>{dispatch(ReadQuestions())},
        addTopic:(topic)=>{dispatch(AddTopic(topic))},
        addQuestion:(Question)=>{dispatch(AddNewQuestion(Question))},
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AddQuestion);
