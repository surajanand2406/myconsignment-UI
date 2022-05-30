import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button,Divider,Select,List,Slider,Input} from 'antd'
import {Link} from 'react-router-dom'
import './CSS/Jobs.css'
import Truncate from 'react-truncate';
import CustomMadeNavbar from './CustomMadeNavbar'
import {ReadJob,Filter,ResetFilter} from '../../store/actions/JobBoardActions'
import {ReadCategory} from '../../store/actions/JobCategoryAction'
import {countries} from './countries'

class Jobs extends Component {
    state={
        priceMin:0,
        priceMax:150000,
        defaultPrice:[0,20000],
        searchValue:'',
        listData:[],
        newList:[],
        filteredData:[],
        categoryForFilter:'All Categories',
        countryForFilter:'All Countries',
    }

    componentDidMount(){

        this.props.readJob();
        this.props.readCategory();
    }

    priceChange=(value)=>{
        this.setState({priceMin:value[0],priceMax:value[1],defaultPrice:value})
    }

    handleSearch=(e)=>{

        
        let list = [];
        
        if(e.target.value.trim() !=="")
        {
                list = this.state.listData;

               let  updatedList = list.filter(data=>{
                    const item = data.JobTitle.toLowerCase();
                    const value = e.target.value.toLowerCase();

                    return item.includes(value);
                })

                this.setState({newList:updatedList})
        }
        else
        {
            let updatedList= this.props.jobsData;
            this.setState({newList:updatedList}) 
        }

    }


    handleFilterJobs=()=>{

        const obj = {
            category:this.state.categoryForFilter,
            country:this.state.countryForFilter,
            minPrice: this.state.priceMin,
            maxPrice: this.state.priceMax
        }

        this.props.filter(obj)
    }

    handleResetFilterJobs=()=>{
        this.setState({
            categoryForFilter:'All Categories',
            countryForFilter:'All Countries',
            defaultPrice:[0,20000],
            priceMin:0,
            priceMax:20000
        })



       this.props.reset();
    }

    
    render() {

        if(this.props.filteredData)
        {
            this.state.filteredData = this.props.filteredData;
        }
        else
        {
            this.state.filteredData = [];
        }

        this.state.listData = this.props.jobsData;

        const categories = this.props.categories;

        return (
            <div className="Jobs-Container">
                <CustomMadeNavbar />
                <div className="Jobs-body-container">
                    <div className="Jobs-body">
                        <div className="Jobs-body-head">
                            <h1 style={{fontSize:"35px"}}>Job Board</h1>
                            <Input.Search className="search-box" placeholder="Search by Job Title" onChange={this.handleSearch} />
                        </div>
                        <div className="Jobs-body-filter">
                            <Select showSearch className="select-box" value={this.state.categoryForFilter} placeholder="Select a category" onChange={(value)=>this.setState({categoryForFilter:value})}>
                                {
                                    categories.map((item,i)=>{
                                        return(
                                            <Select.Option value={item.Name}>{item.Name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>  

                            <Select showSearch className="country-select-box" value={this.state.countryForFilter} placeholder="Select Country" onChange={(value)=>this.setState({countryForFilter:value})} >
                                    {
                                        countries.map(country=>{
                                            return <Select.Option key={country.code} value={country.name} >{country.name}</Select.Option>
                                        })
                                    }
                                    
                            </Select>

                            <div className="price-filter">
                                <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                                    <h4 style={{margin:'0px',color:'darkgreen'}}>Price</h4>
                                    <h4 style={{margin:'0px',color:'darkgreen'}}>${this.state.priceMin} - ${this.state.priceMax}</h4>
                                </div>
                                <Slider step="1" range min={0} max={150000} value={this.state.defaultPrice}  onChange={this.priceChange} />
                            </div>
                            <div style={{display:'flex',justifyContent:'space-between',marginLeft:'5%'}}>
                                <Button size="large" className="btn" style={{backgroundColor:'darkcyan'}} onClick={this.handleFilterJobs}>Filter</Button>
                                <Button size="large" className="btn" style={{backgroundColor:'darkgreen'}} onClick={this.handleResetFilterJobs}>Reset</Button>
                            </div>
                        </div>
                        <Divider><h1>...</h1></Divider>
                        <div className="Jobs-body-request">       
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                pageSize:8,
                            }}
                            dataSource={this.state.newList.length !== 0 ? this.state.newList : this.state.filteredData.length !==0  ? this.state.filteredData : this.state.listData}

                            renderItem={(item,index) => (
                            <List.Item
                                key={item._id}
                                actions={[
        
                                    <Link to={`/custom-made-jobs/${item._id}/job-description`}><Button style={{background:'darkgreen',color:'white'}}>View</Button></Link>
                                ]}
                                extra={
                                <img
                                    width={272}
                                    style={{height:200}}
                                    alt="logo"
                                    src={item.Image}
                                />
                                }
                            >
                                <List.Item.Meta
                                title={<h2 style={{margin:0}}>{item.JobTitle}</h2>}
                                description={<div>
                                                <h5 style={{margin:0,color:'gray'}}>Budget: ${item.Budget}</h5>
                                                <h5 style={{margin:0,color:'gray'}}>Buyer: {item.BuyerName}</h5>
                                                <h5 style={{margin:0,color:'gray'}}>Posted: {item.PostedDate}</h5>
                                            </div>}
                                />
                                   <h3 style={{fontWeight:'bold'}}>Detail Info:{' '} 
                                        <Truncate lines='2' style={{fontSize:'15px',color:'black',fontWeight:'normal'}}>
                                          {item.JobDetail}
                                        </Truncate>
                                    </h3>
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
        filteredData:state.JobBoardReducer.filteredState,
        jobsData:state.JobBoardReducer.JobBoardData,
        categories:state.JobCategoryReducer.CategoriesData
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        readJob:()=>{dispatch(ReadJob())},
        readCategory:()=>{dispatch(ReadCategory())},
        filter:(filterData)=>{dispatch(Filter(filterData))},
        reset:()=>{dispatch(ResetFilter())}
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Jobs);