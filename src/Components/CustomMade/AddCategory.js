import React, { Component } from 'react';
import {connect} from 'react-redux'
import firebase from 'firebase'
import CustomMadeNavbar from './CustomMadeNavbar'
import './CSS/AddCategory.css'
import {Input,Divider,Button,List,Card,message} from 'antd'
import { Icon } from '@ant-design/compatible';
import {ReadCategory,NewCategory,DeleteCategory} from '../../store/actions/JobCategoryAction'



const width = window.innerWidth;
class AddCategory extends Component {
    state={
        windowWidth:width,
        categoryValue:'',
        Image:'',
        imageName:'No Image Selected',
        ImageUrl:'',
        listData:[],
        searchValue:''
    }

    componentDidMount(){
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.innerWidth});
        })  

        this.props.readCategory();
    }


    handleInput=(e)=>{
        this.setState({categoryValue:e.target.value})
    }

    handleImage=(e)=>{
        this.setState({Image:e.target.files[0],imageName:e.target.files[0].name})
    }

    handleAddCategory=()=>{

            if(this.state.categoryValue.trim()==="" || this.state.Image === "")
            {
                message.error("Please Enter Name OR Select Image");
            }
            else
            {
                var storageRef = firebase.storage().ref();
                var mountainImagesRef = storageRef.child(`JobCategoryImages/${this.state.Image.name}`);
        
                mountainImagesRef.put(this.state.Image).then(()=> {
                    mountainImagesRef.getDownloadURL().then((url)=>{
                        this.setState({ImageUrl:url})
                    }).then(()=>{
    
                        const data = {
                            Name:this.state.categoryValue,
                            Image:this.state.ImageUrl
                        }
    
                        this.setState({categoryValue:'',imageName:'No Image Selected'})
    
                        this.props.newCategory(data);        
                    }) 
    
                })   

            }
    }

    handleDelete=(Id)=>{
        this.props.deleteCategory({Id:Id})
    }

    handleSearch=(value)=>{
        this.setState({searchValue:value})
    }



    render() {

        if(this.state.searchValue.trim() !== '')
        {
            this.state.listData=[];
            var  newData = this.props.categories.filter(values=>{
                return values.Name.toLowerCase() === this.state.searchValue.toLowerCase()
            })

            newData.map(data=>{
                this.state.listData.push(data)
            })
        }
        else
        {

            this.state.listData=[];
            this.props.categories.map(data=>{
                this.state.listData.push(data)
            })
        }


        return (
            <div className="add-category-container">
                <CustomMadeNavbar />
                <div className="add-category-body-container">
                    <div className="add-category-body">
                        <div className="add-category-header" >
                            <h1 style={{margin:0}}>Categories</h1>
                            <Input.Search
                                    placeholder="Search Job Categories"
                                    onSearch={this.handleSearch}
                                    style={{ width: 400 }}
                                    size="large"
                                />
                        </div>

                        <Divider><h1>...</h1></Divider>
                        <div>
                            <h2>Add New Category</h2>
                            <div className="add-category">
                                <Input size="large" value={this.state.categoryValue} onChange={this.handleInput} placeholder="Enter Category" style={{width:'50%'}}  />
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <input type="file" style={{display:'none'}} id="file" onChange={this.handleImage} />
                                    <label for="file" style={{backgroundColor:'darkcyan',borderRadius:'5px',color:'white',padding:'10px',width:'120px',display:'flex',justifyContent:'center'}}>Select Image</label>
                                    <p style={{margin:0,marginLeft:'5px'}}>{this.state.imageName}</p>  
                                </div>
                                
                                <Button size="large" onClick={this.handleAddCategory} style={{backgroundColor:'darkgreen',color:'white',width:'150px',borderRadius:'5px'}}>Add</Button>
                            </div>
                        </div>

                        <Divider><h1>...</h1></Divider>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <div style={{width:'95%'}}>
                            <List 
                                grid={{gutter:5,column:(this.state.windowWidth<=478) ? 1 :(this.state.windowWidth<=540) ? 1 : (this.state.windowWidth<=878) ? 2 :(this.state.windowWidth <= 1080) ? 3 : 4}}
                                dataSource={this.state.listData}
                                renderItem={(item,index)=>(
                                        <List.Item>
                                            <Card
                                                hoverable
                                                style={{ width: 200,border:'solid 1px gray' }}
                                                cover={<img style={{height:'150px'}} alt="Image" src={item.Image} />}
                                                actions={[<h4 style={{margin:0,color:'darkgreen'}} onClick={()=>this.handleDelete(item._id)}><Icon type="delete" /> Delete</h4>]}
                                            >
                                                <Card.Meta title={item.Name} />
                                            </Card>
                                        </List.Item>
                                )}
                            />
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
        categories:state.JobCategoryReducer.CategoriesData
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        newCategory:(data)=>{dispatch(NewCategory(data))},
        readCategory:()=>{dispatch(ReadCategory())},
        deleteCategory:(Id)=>{dispatch(DeleteCategory(Id))}
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AddCategory);
