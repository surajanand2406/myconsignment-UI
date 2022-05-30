import React, { Component } from 'react'
import {connect} from 'react-redux'
import ExlusiveNavbar from './ExlusiveNavbar'
import {countries} from './countries'
import {Link} from 'react-router-dom'
import './CSS/Services.css'
import {Input, Divider, Button,List,Card,Avatar,Select,Dropdown,Menu,Rate} from 'antd'
import { Icon } from '@ant-design/compatible';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faFilter,faTrashRestore} from '@fortawesome/free-solid-svg-icons'
import Truncate from 'react-truncate'
import {ReadExclusiveServices} from '../../store/actions/ExclusiveServicesAction'

var width = window.screen.width;
class Services extends Component {

    state={
        windowWidth:width,
        isVisibleBudgetFilter:false,
        serviceData:[],
        Country:'Select Country',
        Category:'Select Category',
        Ratings:"Select Ratings",
        RatingsInt:0,
        lowestPrice:0,
        highestPrice:20000
    }

    componentDidMount(){

        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width})
        }) 

        this.props.readServices();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({serviceData:nextProps.serviceData})
    }


    handleSearch=(e)=>{

        
        if(e.target.value.trim() !=="")
        {
               let list = this.state.serviceData;

                let updatedList = list.filter(data=>{
                    const item = data.ServiceTitle.toLowerCase();
                    const value = e.target.value.toLowerCase();

                    return item.includes(value);
                })

                this.setState({serviceData:updatedList})
        }
        else
        {
           let updatedList= this.props.serviceData;
            this.setState({serviceData:updatedList}) 
        }
    }

    handleRatings=(value)=>{
        if(value==='Highest')
        {
            this.setState({Ratings:value,RatingsInt:4.5})
        }
        else if(value==='Average')
        {
            this.setState({Ratings:value,RatingsInt:2.5})
        }
        else
        {
            this.setState({Ratings:value,RatingsInt:1})
        }
    }

    handleFilter=()=>{

        var data=[];
        
        if(this.state.Category !== 'Select Category' && this.state.Country !== 'Select Country' && this.state.RatingsInt !== 0)
        {
            if(this.state.RatingsInt === 4.5)
            {
                data  = this.state.serviceData.filter(services=>{
                    return services.Category === this.state.Category && services.userCountry === this.state.Country && services.totalRatings >= this.state.RatingsInt   && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
            else if(this.state.RatingsInt === 2.5)
            {
                data = this.state.serviceData.filter(services=>{
                    return services.Category === this.state.Category && services.userCountry === this.state.Country && services.totalRatings > this.state.RatingsInt  && services.totalRatings < 4.5  && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
            else
            {
                data = this.state.serviceData.filter(services=>{
                    return services.Category === this.state.Category && services.userCountry === this.state.Country && services.totalRatings <= this.state.RatingsInt  && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })  
            }
        }
        else if(this.state.Category === 'Select Category' && this.state.Country !== 'Select Country' && this.state.RatingsInt !== 0)
        {
            if(this.state.RatingsInt === 4.5)
            {
                data = this.state.serviceData.filter(services=>{
                    return services.userCountry === this.state.Country && services.totalRatings >= this.state.RatingsInt   && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
            else if(this.state.RatingsInt === 2.5)
            {
                data = this.state.serviceData.filter(services=>{
                    return services.userCountry === this.state.Country && services.totalRatings > this.state.RatingsInt  && services.totalRatings < 4.5  && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
            else
            {
                data = this.state.serviceData.filter(services=>{
                    return services.userCountry === this.state.Country && services.totalRatings <= this.state.RatingsInt   && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }

        }
        else if(this.state.Category !== 'Select Category' && this.state.Country === 'Select Country' && this.state.RatingsInt !== 0)
        {
            if(this.state.RatingsInt === 4.5)
            {
                data = this.state.serviceData.filter(services=>{
                    return services.Category === this.state.Category && services.totalRatings >= this.state.RatingsInt   && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
            else if(this.state.RatingsInt === 2.5)
            {
                data = this.state.serviceData.filter(services=>{
                    return services.Category === this.state.Category && services.totalRatings > this.state.RatingsInt  && services.totalRatings < 4.5  && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
            else
            {
                data = this.state.serviceData.filter(services=>{
                    return services.Category === this.state.Category && services.totalRatings <= this.state.RatingsInt   && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
        }
        else if(this.state.Category !== 'Select Category' && this.state.Country !== 'Select Country' && this.state.RatingsInt === 0)
        {
            data = this.state.serviceData.filter(services=>{
                return services.Category === this.state.Category && services.userCountry === this.state.Country && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
            })

        }
        else if(this.state.Category === 'Select Category' && this.state.Country === 'Select Country' && this.state.RatingsInt !== 0)
        {
            if(this.state.RatingsInt === 4.5)
            {
                data = this.state.serviceData.filter(services=>{
                    return services.totalRatings >= this.state.RatingsInt   && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
            else if(this.state.RatingsInt === 2.5)
            {
                data = this.state.serviceData.filter(services=>{
                    return services.totalRatings > this.state.RatingsInt  && services.totalRatings < 4.5  && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }
            else
            {
                data = this.state.serviceData.filter(services=>{
                    return services.totalRatings <= this.state.RatingsInt   && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
                })
            }

        }
        else if(this.state.Category === 'Select Category' && this.state.Country !== 'Select Country' && this.state.RatingsInt === 0)
        {
            data = this.state.serviceData.filter(services=>{
                return services.userCountry === this.state.Country && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
            })

        }
        else if(this.state.Category !== 'Select Category' && this.state.Country === 'Select Country' && this.state.RatingsInt === 0)
        {
            data = this.state.serviceData.filter(services=>{
                return services.Category === this.state.Category && services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
            })
        }
        else
        {
            data = this.state.serviceData.filter(services=>{
                return  services.Price >= this.state.lowestPrice && services.Price <= this.state.highestPrice                                                                   
            })
        }

        this.setState({serviceData:data})
    }

    handleResetFilter=()=>{
        this.setState({
            Category:'Select Category',
            Country:'Select Country',
            Ratings:'Select Ratings',
            RatingsInt:0,
            lowestPrice:0,
            highestPrice:20000,
            serviceData:this.props.serviceData
        })
    }



    render() {

          const menu = (
            <Menu>
              <Menu.Item key="1">
                    <div>
                        <h4>Enter Price</h4>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <Input type="number" pattern="[0-9]" inputMode="numeric" defaultValue={this.state.lowestPrice} min={0} max={20000} onChange={(value)=>this.setState({lowestPrice:value})} />
                            <h3 style={{marginLeft:5,marginRight:5}}> -- </h3>
                            <Input type="number" defaultValue={this.state.highestPrice}  min={0} max={20000} onChange={(value)=>this.setState({highestPrice:value})} />
                        </div>
                    </div>
                       
              </Menu.Item>
            </Menu>
          );


        return (
            <div className="Services-Container">
                <ExlusiveNavbar />
                <div className="Services-Body-Container">
                    <div className="Services-Body">
                        <div className="Services-Header">
                            <h1 style={{fontWeight:'bold',margin:0,fontSize:'35px'}}>Exclusive Services</h1>
                            <Input.Search placeholder="Search Services" style={this.state.windowWidth <= 360 ? { width: 280,border:"solid 1px lightgray",borderRadius:5 } : this.state.windowWidth < 576 ? { width: 330,border:"solid 1px lightgray",borderRadius:5 } : {width:500,border:"solid 1px lightgray",borderRadius:5}} size="large" onChange={this.handleSearch}/>
                        </div>
                        <Divider style={{margin:0,marginTop:15,marginBottom:15}}></Divider>
                        <div className="filter">
                            <div className="filter-columns">
                                <Select showSearch={true} size="large" style={{width:'95%',border:'solid 1px lightgray',borderRadius:"5px"}} value={this.state.Category} onChange={value=>this.setState({Category:value})}>
                                    <Select.Option value="Web Design">Web Design</Select.Option>
                                    <Select.Option value="Graphic Design">Graphic Design</Select.Option>
                                    <Select.Option value="Digital Marketing">Digital Marketing</Select.Option>
                                </Select>
                            </div>
                            <div className="filter-columns">
                                <Select showSearch={true} size="large" style={{width:'95%',border:'solid 1px lightgray',borderRadius:"5px"}} value={this.state.Country} onChange={value=>this.setState({Country:value})}>
                                    {
                                        countries.map(country=>{
                                            return <Select.Option value={country.name}>{country.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="filter-columns">
                                <Select size="large" style={{width:'95%',border:'solid 1px lightgray',borderRadius:"5px"}} value={this.state.Ratings} onChange={this.handleRatings}>
                                    <Select.Option value="Highest">Highest</Select.Option>
                                    <Select.Option value="Average">Average</Select.Option>
                                    <Select.Option value="Lowest">Lowest</Select.Option>
                                </Select>
                            </div>
                            <div className="filter-columns">
                                <Dropdown overlay={menu} visible={this.state.isVisibleBudgetFilter} trigger={['click']} onVisibleChange={(value)=>this.setState({isVisibleBudgetFilter:value})}>
                                    <div style={{width:'95%',backgroundColor:"white",padding:"9px",display:'flex',justifyContent:'space-between',alignItems:'center',border:'solid 2px lightgray',borderRadius:'5px'}} className="ant-dropdown-link">
                                        <p style={{margin:0,color:'lightgray'}}>Budget</p>
                                        <Icon type="down" />
                                    </div>
                                </Dropdown>
                            </div>
                            <div className="filter-buttons" >
                                <Button size="large" style={{width:'45%',backgroundColor:'darkcyan',color:'white'}} onClick={this.handleFilter}>
                                    <FontAwesomeIcon size="1x" icon={faFilter} style={{marginRight:5}} /> Filter
                                </Button>
                                <Button size="large" style={{width:'45%',backgroundColor:'darkgreen',color:'white'}} onClick={this.handleResetFilter}>
                                    <FontAwesomeIcon size="1x" icon={faTrashRestore} style={{marginRight:5}} /> Reset
                                </Button>
                            </div>
                        </div>
                        <Divider style={{margin:0,marginTop:15,marginBottom:15}}></Divider>
                        <List 
                            grid={{gutter:16,xl:4,xs:1,sm:2,md:2,lg:3,xxl:4}}
                            dataSource={this.state.serviceData} 
                            pagination={{pageSize:16}}
                            renderItem={(item,index)=>(
                                <List.Item>
                                        <Card
                                            style={this.state.windowWidth < 360 ? {width:280} : this.state.windowWidth < 576 ? {width:330} : this.state.windowWidth < 768 ? {width:280} : this.state.windowWidth <= 992 ? {width:330} : this.state.windowWidth <= 1400 ? {width:280} : { width: 330 }}
                                            bodyStyle={{padding:0}}
                                            cover={<img style={ this.state.windowWidth < 360 ? {width:280,height:250} : this.state.windowWidth < 576 ? {width:330,height:250} :this.state.windowWidth < 768 ? {width:280,height:250} :this.state.windowWidth <= 992 ? {width:330,height:250} : this.state.windowWidth <= 1400 ? {width:280,height:250} : {width:330 ,height:250}} src={item.Images[0]}/>}
                                        >
                                            <div >
                                                <div style={{padding:10}}>
                                                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                                        <div style={{display:'flex',alignItems:'center'}}>
                                                            <Avatar size="default" src={item.userImage} />
                                                            <h4 style={{margin:0,fontWeight:'bold',marginLeft:10}}>{item.userName}</h4>
                                                        </div>
                                                        <div style={{display:'flex',alignItems:'center'}}>
                                                            <Rate count={1} value={item.totalRatings} disabled={true} style={{fontSize:'15',marginBottom:5}} autoFocus={true} />
                                                            <h3 style={{margin:0,color:"#fadb14",fontWeight:'bold',marginLeft:5}}>{item.totalRatings}</h3>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div>
                                                        <Truncate style={{fontWeight:'bold',margin:0}}>{item.ServiceTitle}</Truncate>
                                                        <br />
                                                        <Truncate lines="3">{item.ServiceDescription}</Truncate>
                                                    </div>
                                                </div>
                                                <div style={{padding:10,backgroundColor:"#eeeeee",display:"flex",justifyContent:'space-between',alignItems:'center'}}>
                                                    <p style={{margin:0,display:'flex'}}>Starting At : <h4 style={{margin:0,fontWeight:'bold'}}>${item.Price}</h4></p>
                                                    <Link to={`/exclusive-services/${item._id}/service-description`}>
                                                        <Button style={{backgroundColor:'darkgreen',color:'white'}} >
                                                            <FontAwesomeIcon icon={faEye} style={{marginRight:5}} /> View
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                </List.Item>
                           )}
                        
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        serviceData:state.ExclusiveServicesReducer.ExclusiveServicesData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        readServices:()=>{dispatch(ReadExclusiveServices())}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Services);
