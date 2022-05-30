import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import {Divider,List, Avatar,Card,Input,Select} from 'antd'
import { Carousel } from 'react-responsive-carousel'
import {ReadBlogs} from '../store/actions/BlogAction'
import Truncate from 'react-truncate'
import './CSS/Blog.css'

class Blog extends Component {

    state={
        blogs:[],
        filteredBlog:[],
        searchedList:[],
        filter:'All'
    }

    componentDidMount(){
        this.props.readBlogs();
        window.scrollTo(0, 0)
    }

    
    UNSAFE_componentWillReceiveProps(nextProps){
        nextProps.blogs.map(blog=>{
            Array.prototype.push.apply(this.state.blogs,blog.Blog)
        })
        console.log(nextProps)
   }

   handleFilter=(value)=>{
       if(value === 'All')
       {
        this.setState({filteredBlog:[],filter:value})
       }
       else
       {
            var newBlogs = this.props.blogs.filter(data=>{
                    return data.Category === value
                })
                this.setState({filteredBlog:newBlogs[0].Blog,filter:value})
        }
   }

   handleSearch=(e)=>{
       if(this.state.filteredBlog.length !== 0)
       {
                let list = [];
                
                if(e.target.value.trim() !=="")
                {
                        list = this.state.filteredBlog;

                       let updatedList = list.filter(data=>{
                            const item = data.Title.toLowerCase();
                            const value = e.target.value.toLowerCase();

                            return item.includes(value);
                        })

                        this.setState({searchedList:updatedList})
                }
                else
                {
                    this.setState({searchedList:[]}) 
                }
       }
       else
       {
                let list = [];
                let updatedList = [];
                
                if(e.target.value.trim() !=="")
                {
                        list = this.state.blogs;

                        updatedList = list.filter(data=>{
                            const item = data.Title.toLowerCase();
                            const value = e.target.value.toLowerCase();

                            return item.includes(value);
                        })

                        this.setState({searchedList:updatedList})
                }
                else
                {
                    this.setState({searchedList:[]}) 
                }
       }

   }

    render() {

        return (
            <div className="Blog-Container">
                <Navbar />
                <div className="Blog-Body-Container">
                    <div className="Blog-Body">
                        <div style={{backgroundColor:'black',maxWidth:"100%",maxHeight:'100%',position:'relative'}}>
                            {this.state.blogs.length>0 && <Carousel autoPlay showIndicators={false} showThumbs={false} showStatus={false} infiniteLoop>
                                        {
                                            this.state.blogs.slice(0,3).map(item=>{
                                            return (
                                                <div className="carousel-container">
                                                    <img alt='item not found' src={item.Image} />
                                                    <div className="carousel">
                                                            <h1 style={{color:'white'}}>{item.Title}</h1>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                            </Carousel> }
                        </div>
                        <div className="blogs-section">
                            <div>
                                <h2 style={{fontWeight:'bold',marginBottom:30}}>Recent Blogs</h2>
                                {this.state.blogs.length>0 && <List
                                    itemLayout="horizontal"
                                    grid={{xxl:4,xl:3,lg:2,md:2,sm:1}}
                                    dataSource={this.state.blogs.slice(0,4)}
                                    renderItem={(item,index) => (
                                    <List.Item>
                                        <Link to={`/blog-description/${item._id}`}>
                                                <List.Item.Meta
                                                avatar={<Avatar shape="square" size={64} src={item.Image} />}
                                                title={<Truncate lines="2">{item.Title}</Truncate>}
                                                description={<Truncate>Posted: {item.date}</Truncate>}
                                                />
                                        </Link>
                                    </List.Item>
                                    )}
                                />}
                            </div>
                            <Divider ><h1>...</h1></Divider>
                            <div style={{backgroundColor:'#eeeeee',padding:10,marginBottom:50,display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                                <div style={{width:'45%'}}>
                                    <Input.Search size="large" placeholder="Input Search...." onChange={this.handleSearch} />
                                </div>
                                <div style={{width:'45%'}}>
                                   {this.state.blogs.length>0 &&  <Select value={this.state.filter} style={{width:'100%'}} size="large" onChange={(value)=>this.handleFilter(value)}>
                                        <Select.OptGroup>
                                            <Select.Option value="All">All</Select.Option>
                                            {
                                                this.props.blogs.map(blog=>{
                                                    return <Select.Option value={blog.Category}>{blog.Category}</Select.Option>
                                                })
                                            }
                                        </Select.OptGroup>
                                    </Select>}
                                </div>
                            </div>
                            <div>
                                {this.state.filteredBlog.length>0 && <List
                                    itemLayout="horizontal"
                                    grid={{xxl:3,xl:3,lg:2,md:2,sm:1}}
                                    dataSource={this.state.filteredBlog.length !== 0 && this.state.searchedList.length === 0 ? this.state.filteredBlog : this.state.searchedList.length !== 0 && this.state.filteredBlog.length !== 0 ? this.state.searchedList : this.state.filteredBlog.length === 0 && this.state.searchedList.length !== 0 ? this.state.searchedList  : this.state.blogs}
                                    pagination={{pageSize:9}}
                                    renderItem={(item,index) => (
                                    <List.Item>
                                        <Link to={`/blog-description/${item._id}`}>
                                            <Card
                                                hoverable
                                                style={{ width: 340 }}
                                                cover={<img style={{height:350}} src={item.Image} />}
                                            >
                                                <Card.Meta title={item.Title} description={<p><b>Posted Data:</b> {item.date}</p>}/>
                                            </Card>
                                        </Link>
                                    </List.Item>
                                    )}
                                />}
                            </div>
                            <Divider><h1>...</h1></Divider>
                            <h2 style={{fontWeight:'bold',marginBottom:30}}>Related Blogs</h2>
                            <div>
                               {this.state.blogs.length>0 &&  <List
                                    itemLayout="horizontal"
                                    grid={{xxl:6,xl:4,lg:4,md:2,sm:1}}
                                    dataSource={this.state.blogs.slice(0,6)}
                                    renderItem={(item,index) => (
                                    <List.Item>
                                        <Link to={`/blog-description/${item._id}`}>
                                            <Card
                                                hoverable
                                                style={{ width: 180 }}
                                                cover={<img style={{height:200}} src={item.Image} />}
                                            >
                                                <Card.Meta title={item.Title} description={<p>Posted: {item.date}</p>}/>
                                            </Card>
                                        </Link>
                                    </List.Item>
                                    )}
                                />}
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
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Blog);
