import React, { Component } from 'react'
import CustomMadeNavbar from './CustomMadeNavbar'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Divider,List,Input,Card} from 'antd'
import './CSS/JobCategories.css'
import {ReadCategory} from '../../store/actions/JobCategoryAction'


const width = window.innerWidth;
class JobCategories extends Component {
    
    state={
        windowWidth:width,
        listData:[],
        newList:[],
        searchValue:''
    }

    componentDidMount(){
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.innerWidth});
        })  

        this.props.readCategory();
    }

   handleSearch=(e)=>{

        
        if(e.target.value.trim() !=="")
        {
               let list = this.state.listData;

              let  updatedList = list.filter(data=>{
                    const item = data.Name.toLowerCase();
                    const value = e.target.value.toLowerCase();

                    return item.includes(value);
                })

                this.setState({newList:updatedList})
        }
        else
        {
            let updatedList= this.props.categories;
            this.setState({newList:updatedList}) 
        }
   }

    render() {

        this.state.listData=this.props.categories;

        return (
            <div className="job-categories-container">
                <CustomMadeNavbar />
                <div className="job-categories-body-container">
                    <div className="job-categories-body">
                            <div className="job-categories-body-head">
                                <h1 style={{margin:0}}>Tell Us What You Want To Make</h1>
                                <Input.Search
                                    placeholder="Search Job Category"
                                    onChange={this.handleSearch}
                                    style={{ width: (this.state.windowWidth<=478) ? 300 : 400 }}
                                    size="large"
                                />
                            </div>
                            <Link to="/add-category" >Add Category</Link>
                            <Divider><h1>...</h1></Divider>
                            <div>
                                <List 
                                    grid={{gutter:5,column:(this.state.windowWidth<=478) ? 1 :(this.state.windowWidth<=767) ? 2 : (this.state.windowWidth<=991) ? 3 :(this.state.windowWidth <= 1280) ? 4 : 6}}
                                    dataSource={this.state.newList.length !== 0 ? this.state.newList : this.state.listData}
                                    renderItem={(item,index)=>(
                                            <List.Item>
                                                <Link to={`/custom-made-post-job-detail/${item.Name}`}>
                                                    <Card
                                                        hoverable
                                                        style={{ width: (this.state.windowWidth<=478) ? 250 : 200,border:'solid 1px gray' }}
                                                        cover={<img style={{height:'150px'}}  alt="example" src={item.Image} />}
                                                    >
                                                        <Card.Meta title={item.Name} />
                                                    </Card>
                                                </Link>
                                            </List.Item>
                                    )}
                                />
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
        readCategory:()=>{dispatch(ReadCategory())},
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(JobCategories)
