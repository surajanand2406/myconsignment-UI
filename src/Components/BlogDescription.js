import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import './CSS/BlogDescription.css'
import {Divider,List, Avatar,Card, Input,Comment,Button} from 'antd'
import {ReadBlogs,AddComment} from '../store/actions/BlogAction'
import ReactHtmlParser from 'react-html-parser'

class BlogDescription extends Component {

    state={
        blogs:[],
        myBlog:[],
        commentValue:'',
        userData:null
    }

    componentDidMount(){
        const data = localStorage.getItem('userData')
        window.scrollTo(0, 0)

        if(data)
        {
            this.setState({userData:JSON.parse(data)})
            
        }

        this.props.readBlogs();
    }

    
    UNSAFE_componentWillReceiveProps(nextProps){
        var myBlog=[];

        this.state.blogs=[];
        nextProps.blogs.map(blogs=>{
            blogs.Blog.filter(blog=>
                {
                    if(blog!==null){
                        if(blog._id === nextProps.match.params.Id)
                    {
                        myBlog = myBlog.concat(blog)
                    }
                    }
                })
                Array.prototype.push.apply(this.state.blogs,blogs.Blog)
        })

        this.setState({myBlog})
   }

   handleAddComment=()=>{
       
        if(this.state.commentValue.trim() !== '')
        {

            var arr =[];
            this.props.blogs.map(data=>{
                data.Blog.map(blog=>{
                    if(blog._id === this.props.match.params.Id)
                    {
                        arr=data;
                    }
                })
            })


            var comment={
                userName:this.state.userData.username,
                userImage:this.state.userData.profilePic,
                comment:this.state.commentValue
            }

            this.props.addComment({CateId:arr._id,blogId:this.props.match.params.Id,comment})
            this.setState({commentValue:''})
        }
   }

    render() {

        return (
            <div className="Blog-Description-Container">
                <Navbar />
                <div className="Blog-Description-Body-Container">
                    <div className="Blog-Description-Body">
                        {/* <div className="carousel-container" style={{backgroundColor:'black',maxWidth:"100%",maxHeight:"100%",position:'relative'}}>
                            <Carousel autoPlay showIndicators={false}  showThumbs={false} showStatus={false} infiniteLoop>
                                        {
                                            this.state.blogs.slice(0,3).map(item=>{
                                            return (
                                                <div className="carousel-body">
                                                    <img src={item.Image}  />
                                                    <div className="carousel" >
                                                            <h1 style={{color:'white'}}>{item.Title}</h1>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                            </Carousel> 
                        </div> */}
                        <div className="Blog-Description-section">
                            {/* <div>
                                <h2 style={{fontWeight:'bold',marginBottom:30}}>Recent Blogs</h2>
                                <List
                                    itemLayout="horizontal"
                                    grid={{xxl:4,xl:3,lg:2,md:2,sm:1}}
                                    dataSource={this.state.blogs.slice(0,4)}
                                    renderItem={item => (
                                    <List.Item>
                                        <Link to={`/blog-description/${item._id}`}>
                                            <List.Item.Meta
                                                avatar={<Avatar shape="square" size={64} src={item.Image} />}
                                                title={<Truncate lines="2">{item.Title}</Truncate>}
                                                description={<Truncate>{item.createdAt}</Truncate>}
                                            />
                                        </Link>
                                    </List.Item>
                                    )}
                                />
                            </div>
                            <Divider><h1>...</h1></Divider> */}

                            <div  className="blog-container" style={{border:'solid 1px #eeeeee',padding:10}}>
                                <div style={{maxWidth:'100%',maxHeight:'100%'}}>
                                    <img src={this.state.myBlog.length !==0?this.state.myBlog[0].Image : null} style={{width:'100%',height:500}}  />
                               </div>
                               <div>
                                    <h1>{this.state.myBlog.length !==0?this.state.myBlog[0].Title : null}</h1>
                               </div>
                                    <div className="blog">{this.state.myBlog.length !==0? ReactHtmlParser(this.state.myBlog[0].description) : null}</div>
                               <Divider></Divider>
                               {
                                   this.state.myBlog.length !==0?
                                   this.state.myBlog[0].comments.length !== 0 ?

                                   this.state.myBlog[0].comments.map(com=>{
                                       return(

                                        <Comment
                                            author={<a>{com.userName}</a>}
                                            avatar={
                                            <Avatar
                                                src={com.userImage}
                                            />
                                            }
                                            content={
                                            <p>
                                               {com.comment}
                                            </p>
                                            }
                                        >
                                        </Comment>

                                       )
                                   })
                                   :
                                   null

                                   :
                                   null
                               }
                               
                             {this.state.userData !== null && <div style={{backgroundColor:'#eeeeee',padding:10,marginTop:20}}>
                                    <h2>Leave a Comment</h2>
                                    <Input.TextArea rows="10" value={this.state.commentValue} placeholder="Comment..." style={{resize:'none'}} onChange={(e)=>this.setState({commentValue:e.target.value})}></Input.TextArea>
                                    <Button size="large" style={{width:150,backgroundColor:'darkgreen',color:'white',marginTop:10}} onClick={this.handleAddComment} >Comment</Button>
                               </div>}
                            </div>
                            <Divider><h1>...</h1></Divider>
                            <h2 style={{fontWeight:'bold',marginBottom:30}}>Related Blogs</h2>
                            <div>
                                <List
                                    itemLayout="horizontal"
                                    grid={{xxl:6,xl:4,lg:4,md:2,sm:1}}
                                    dataSource={this.state.blogs.slice(0,6)}
                                    renderItem={item => (
                                    <List.Item>
                                        <Link to={`/blog-description/${item._id}`}>
                                            <Card
                                                hoverable
                                                style={{ width: 180 }}
                                                cover={<img style={{height:200}} src={item.Image} />}
                                            >
                                                <Card.Meta title={item.Title} description={<p>Posted: {
                                                    item.date
                                                }</p>}/>
                                            </Card>
                                        </Link>
                                    </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
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
        addComment:(Comment)=>{dispatch(AddComment(Comment))}
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(BlogDescription);
