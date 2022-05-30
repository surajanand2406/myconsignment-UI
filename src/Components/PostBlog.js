import React, { Component } from 'react'
import ProfileSidebar from './ProfileSidebar'
import firebase from 'firebase'
import {connect} from 'react-redux'
import Navbar from './Navbar'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {Input, Button,Divider,Select,message, Upload} from 'antd'
import {ReadBlogs,AddCategory,AddNewBlog} from '../store/actions/BlogAction'
import './CSS/PostBlog.css'

function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            console.log('Uploading image...');
            var storageRef = firebase.storage().ref();
                        var mountainImagesRef = storageRef.child(`BlogImages/${file.name}`);
                
                        mountainImagesRef.put(file).then(()=> {
                            mountainImagesRef.getDownloadURL().then((url)=>{
                                resolve({data:{url}})
                            })
                        })
                .catch(error => {
                    reject(error);
                })
        }
    );
}


class PostBlog extends Component {

    constructor(props){
        super(props);
        this.state={
            editorState:EditorState.createEmpty(),
            uploadImages: [],
            file:null,

            Category:'',
            blogs:[],
            SelectedCategoryId:'Select Category...',
            blogInput:'',
            Id:'',
            imageName:'No Image Selected',
            titleFile:null
        }
    }

    componentDidMount(){
        this.props.readBlogs();
    }

    
    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({blogs:nextProps.blogs})
   }

    onEditorStateChange=(editorState)=>{
       this.setState({editorState})
    };

    handleInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    addNewCategory=()=>{
        if(this.state.Category.trim() !== '')
        {
            this.props.addNewCategory({Category:this.state.Category});
            this.setState({Category:''})
        }
        else
        {
            message.error("Please Write Category")
        }
    }

    handleSelectCategory=(Id)=>{
        this.setState({SelectedCategoryId:Id})
    }

    handleAddImage=(file)=>{
        this.setState({titleFile:file.file.originFileObj,imageName:file.file.originFileObj.name})
    }

    handleAddBlog=()=>{
        if(this.state.SelectedCategoryId !== 'Select Category...' && this.state.blogInput.trim() !== '' &&  this.state.titleFile !== null)
        {
            var storageRef = firebase.storage().ref();
            var mountainImagesRef = storageRef.child(`BlogImages/${this.state.titleFile.name}`);
    
            mountainImagesRef.put(this.state.titleFile).then(()=> {
                mountainImagesRef.getDownloadURL().then((url)=>{

                    var blog={
                        Title:this.state.blogInput,
                        Image:url,
                        description:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                        comments:[]
                    }

                    this.props.addNewBlog({Id:this.state.SelectedCategoryId,blog})
                    this.setState({
                        blogInput:'',
                        SelectedCategoryId:'Select Category...',
                        imageName:'No Image Selected',
                    })
                   
                })
            })       
        }
        else
        {
            message.error("please fill all boxes..")
        }
    }

    render() {
        return (
            <div className="post-blog-container">
                <Navbar />
                <div className="post-blog-body-container">
                    <ProfileSidebar />
                    <div className="post-blog-body">
                        <div style={{display:'flex',alignItems:'center'}}>
                            <Input value={this.state.Category} name="topic" placeholder="Add New Category..." size="large" onChange={(e)=>this.setState({Category:e.target.value})} /> 
                            <Button onClick={this.addNewCategory} size="large" style={{width:'150px',backgroundColor:'#b17e4e',color:'white'}}>Add</Button>
                        </div>
                        <Divider><h1>...</h1></Divider>

                        <Select readonly value={this.state.SelectedCategoryId} placeholder="Select Category..." size="large" style={{width:'100%',marginBottom:20}} onChange={(Id)=>this.handleSelectCategory(Id)}>
                            {
                                this.state.blogs.length !==0 ?
                                    this.state.blogs.map(blog=>{
                                        return <Select.Option value={blog._id}>{blog.Category}</Select.Option>
                                    })
                                :
                                null
                            }
                        </Select>
                        <Input style={{marginBottom:20}} value={this.state.blogInput} onChange={(e)=>this.setState({blogInput:e.target.value})} placeholder="Blog Title..." size="large" /> 
                        <div style={{display:'flex',alignItems:'center'}}>
                            <Upload showUploadList={false} onChange={this.handleAddImage}>
                                <Button style={{backgroundColor:'#8b0000',color:'white'}}>
                                    Select Title Image
                                </Button>
                            </Upload>

                            <p style={{margin:0,marginLeft:10}}>{this.state.imageName}</p> 
                        </div>
                        <div style={{overflowY:'auto',height:500,border:'solid 1px #eeeeee',padding:5,marginTop:20}}>
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
                        <Button size="large" style={{width:'150px',backgroundColor:'#8b0000',color:'white',marginTop:'20px'}} onClick={this.handleAddBlog}>Post Blog</Button>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        blogs:state.BlogReducer.BlogData
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        readBlogs:()=>{dispatch(ReadBlogs())},
        addNewCategory:(Category)=>{dispatch(AddCategory(Category))},
        addNewBlog:(Blog)=>{dispatch(AddNewBlog(Blog))}
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(PostBlog);
