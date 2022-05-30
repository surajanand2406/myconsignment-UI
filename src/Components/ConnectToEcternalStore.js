import React, { Component } from 'react'
import {url} from '../Constants'
import Navbar from './Navbar'
import qs from 'querystring'
import {Divider,Button,Modal,List,Checkbox,Select,Radio,Spin,message} from 'antd'
import ProfileSidebar from './ProfileSidebar'
import Truncate from 'react-truncate';
import XLSX from 'xlsx';
import './CSS/ConnectToExternalStore.css'
import { Icon } from '@ant-design/compatible';

class ConnectToEcternalStore extends Component {

    state={
        listingsData:[],
        isCategoryModal:false,
        isShippmentModal:false,
        shippingValue:'Both',
        isLoading:false,
        shippings:[],
        categories:[],
        subCategories:[],
        confirmModal:false,
        subCategoriesValueForAll:'',
        CategoriesValueForAll:"",
        pageNumber:1,
        userData:{},

        idforUpdatingCategoryAndShipping:'',
        CategoryValue:'',
        subCategoryValue:'',
        ShipmentId:''
    }

    componentDidMount(){

        
        const data = localStorage.getItem('userData');
        
        if(data)
        {

            var userData = JSON.parse(data);
            this.setState({userData})
      
            fetch(url+`/api/getShippings${userData.firebaseUID}`)
            .then(res=>res.json())
            .then(res2=>this.state.shippings = res2.doc)

            ////// end of get shippings


            ///Get Categories

            fetch(url+`/api/getCategories`)
            .then(res=>res.json())
            .then(res2=>this.state.categories = res2.docs)
        }

        ////// end of get Categories


        const obj = qs.parse(window.location.search)

        const code = obj[Object.keys(obj)[0]]

        //this.props.history.pushState({},"",'https://localhost:3000/connect-to-external-store')
        
        if(code)
        {

            this.setState({isLoading:true})

            fetch(url+'/gettoken',{
                method:'post',
                body:JSON.stringify({code}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(data=>data.json())
            .then(data1=>{

                data1.map(items=>{

                    var div = document.createElement("div");
                    div.innerHTML = items.Description;
                    var Description=div.innerText;

                    const obj ={

                        Id: '_' + Math.random().toString(36).substr(2, 9),
                        TITLE: items.Title,
                        DESCRIPTION: Description,
                        PRICE:items.StartPrice.$t,
                        Images: items.PictureDetails.PictureURL,
                        Category:this.state.categories[0].name,
                        subCategory:this.state.categories[0].subCategories[0].name,
                        Shipping:this.state.shippingValue,
                        ShippmentId:this.state.shippings[0]._id,
                        isCheck:false,
                        firebaseUID:''

                    }

                    this.setState({isLoading:false,listingsData:this.state.listingsData.concat(obj)})
                })
            })
        }
    }



//Handle Open URL to connect with Ebay Store 
    handleOpenURL=()=>{
        fetch(url+'/openurl')
        .then(res=>res.text())
        .then(res2=>{window.location.href=res2})
    }


///handle Conver XLS File Into Json
    handleXLSFile=(e)=>{

        this.setState({isLoading:true})


        const reader = new FileReader();
        reader.onload = (evt) => { // evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type:'binary'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            console.log(ws)
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {header:2});

            var newData = data.map(listings=>{
                    console.log(listings)
                            return {

                                Id: '_' + Math.random().toString(36).substr(2, 9),
                                TITLE: listings.TITLE,
                                DESCRIPTION: listings.DESCRIPTION,
                                PRICE:listings.PRICE,
                                Images: [listings.IMAGE1, listings.IMAGE2, listings.IMAGE3, listings.IMAGE4, listings.IMAGE5],
                                Category:this.state.categories[0].name,
                                subCategory:this.state.categories[0].subCategories[0].name,
                                Shipping:this.state.shippingValue,
                                ShippmentId:this.state.shippings[0]._id,
                                isCheck:false,
                                firebaseUID:''
                            }
                })

            /* Update state */
                this.setState({isLoading:false,listingsData:newData})
        };
        reader.readAsBinaryString(e.target.files[0]);
    }


////handle Select Category Code
handleSelectCategoryModal=()=>{
    this.setState({
        isCategoryModal:false,
        CategoryValue:'',
        subCategoryValue:'',
        shippingValue:'Both',
        ShipmentId:''
    })
}


handleSelectCategory=(value,key)=>{

    this.setState({CategoryValue:value})

    var subCate = this.state.categories.filter(category=>{
        return category._id === key.key
    })

    this.setState({subCategories:subCate[0].subCategories})
    
}

handleSubCategory=(value)=>{
    this.setState({subCategoryValue:value})
}


/// Handle Select Categories Values
handleCategoies=()=>{

    if(this.state.CategoryValue==='' || this.state.subCategoryValue === '')
    {
        message.error("Please Select Category And Sub-Category");
    }
    else
    {
        var newListings =  this.state.listingsData.filter(list=>{
            if(list.Id === this.state.idforUpdatingCategoryAndShipping)
            {
                list.Category = this.state.CategoryValue;
                list.subCategory = this.state.subCategoryValue;
            }

            return list
        })

        this.setState({
            listingsData:newListings,
            CategoryValue:'',
            subCategoryValue:'',
            isCategoryModal:false
        })
    }
}

//////End of Handle Select Category Code////////

/////Handle Select Category for all listings
handleSelectCategoryForAll=(value,key)=>{

    var newListings = this.state.listingsData.map(data=>{
        data.Category = value;
        return data
    })

    var subCate = this.state.categories.filter(category=>{
        return category._id === key.key
    })


    this.setState({subCategories:subCate[0].subCategories,listingsData:newListings}) 
}


handleSelectSubCategoryForAll=(value)=>{

    var newListings = this.state.listingsData.map(data=>{
            data.subCategory = value;
            return data
        })
  
    this.setState({listingsData:newListings})
}
/////End of Handle Select Category for all listings////////


///Handle Shippment 
handleShippment=(index)=>{

    var newListings =  this.state.listingsData.filter(list=>{
        if(list.Id === this.state.idforUpdatingCategoryAndShipping)
        {
            list.Shipping = this.state.shippingValue;
            list.ShippmentId = this.state.shippings[index]._id
        }

        return list
    })

    this.setState({
        listingsData:newListings,
        shippingValue:'Both',
        ShippmentId:'',
        isShippmentModal:false
    })
    
}


/// Handle One by One Select Listings
handleCheckListing=(Id,e)=>{


    if(e===true)
    {
        var list= this.state.listingsData.map(listing=>{
            if(listing.Id === Id)
            {
                listing.isCheck = true;

                return listing
            }
            else
            {
                return listing;
            }
        })
            message.info("If you not select Category and Shipping Criteria before checked,it will set by default");
            this.setState({listingsData:list});
    }
    else if(e===false)
    {
        var list= this.state.listingsData.map(listing=>{
            if(listing.Id === Id)
            {
                listing.isCheck = false;

                return listing
            }
            else
            {
                return listing;
            }
        })
            this.setState({listingsData:list});
    }
    
}



//// Handle Select All or Only this page Listings
handleSelectListings=(value)=>{
    if(value==='All')
    {
        var newListings = this.state.listingsData.filter(data=>{
            return data.isCheck=true
        })
        this.setState({listingsData:newListings})
    }
    else if(value === 'UAll')
    {
        var unCheckListings = this.state.listingsData.map(lists=>{
             lists.isCheck = false
             return lists
        })
        this.setState({listingsData:unCheckListings})
    }
    else
    {
        
        var counter = (this.state.pageNumber * 10) - 9;
        const updatedArr = this.state.listingsData.map((listings,index)=>{
           if(counter <= this.state.pageNumber*10)
           {
               if(index+1 === counter)
               {
                    listings.isCheck = true;
                    counter ++;
                    return listings
               } 
               else
               {
                   return listings
               }
           }
           else
           {
               return listings
           }
       })

       this.setState({listingsData:updatedArr})
  
    }
}




///Add linstings
    handleAddListings=()=>{

        var checkedListing = this.state.listingsData.filter(data=>{
            return data.isCheck === true
        })
        console.log(checkedListing)
       var data = checkedListing.map(listing=>{
            return{

                title:listing.TITLE,
                description:listing.DESCRIPTION,
                price:listing.PRICE,
                shippingNational:listing.Shipping === 'Domestic' ? true : listing.Shipping === 'International' ? false : true,
                shippingInternational: listing.Shipping === 'Domestic' ? false : listing.Shipping === 'International' ? true : true,
                imageLinks:listing.Images,
                firebaseUID:this.state.userData.firebaseUID,
                createdDate:new Date(),
                Category:listing.Category,
                subCategory:listing.subCategory,
                shippingID:listing.ShippmentId,
            }
        })
      
        fetch(url+'/api/addInativeListings',{
            method:'post',
            body:JSON.stringify(data),
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
            }
        })
        
    }




    render() {

        return (
            <div className="external-store-container">
                <Navbar/>
                <div className="external-store-body-container">
                    <ProfileSidebar />
                    <div className="external-store-body">
                        <Divider><h2 style={{fontWeight:'bold'}}>Connect with Ebay</h2></Divider>
                        <div>
                            <ul>
                                <li>Click on connect Button bellow</li>
                                <li>Login In with your ebay account</li>
                                <li>Click on I agree</li>
                            </ul>
                        </div>
                        <Button size="large" style={{width:'200px',backgroundColor:"darkgreen",color:'white'}} onClick={this.handleOpenURL}>Connect</Button>


                        <Divider><h2 style={{fontWeight:'bold'}}>Connect with Etsy</h2></Divider>
                        <div>
                            <ul>
                                <li>Import Your XLS or CSV file exported from etsy store</li>
                                <li>Mark down your listings</li>
                                <li>Add category and shipping profiles</li>
                                <li>Add them to inactive listings</li>

                            </ul>
                        </div>

                        <div style={{display:'flex',}}>
                            <form>
                                <input type="file" id="file" style={{display:'none'}} accept=".xls,.xlsx,.csv"  name='excel' onChange={this.handleXLSFile} />
                                <label for="file" style={{padding:'2px',marginRight:"5px",backgroundColor:"darkgreen",height:'40px',color:'white',width:'200px',display:'flex',justifyContent:"center",alignItems:'center',borderRadius:"3px"}}>Import File</label>
                            </form>
                        </div>
                     
                        <Divider><h1>...</h1></Divider>
                        {
                            
                            this.state.isLoading===true ? <Spin style={{fontSize:'20px',fontWeight:'bold',color:'lightgray'}} size="large" tip="Please Wait For Loading....." spinning={this.state.isLoading} delay={500}></Spin>
                            :
                                this.state.listingsData.length === 0 ? null 
                            :
                            <div>

                                <div className="listings-filter" >
                                    <div className="filter">
                                        <Select placeholder="Select Listings" size="large" style={{width:'100%'}} onChange={(value)=>this.handleSelectListings(value)}>
                                                <Select.Option value="UAll">UnSelect All</Select.Option>
                                                <Select.Option value="All">Select All {this.state.listingsData.length}</Select.Option>
                                                <Select.Option value="This Page">Select Only this Page</Select.Option>
                                        </Select>
                                    </div>
                                    <div className="filter">
                                        <Select placeholder="Select Category" size="large" style={{width:'100%'}} onChange={(value,key)=>this.handleSelectCategoryForAll(value,key)} >
                                            {
                                                this.state.categories.map(Category=>{
                                                    return <Select.Option key={Category._id} value={Category.name}>{Category.name}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                    <div className="filter">
                                        <Select placeholder="Select Sub Category" size="large" style={{width:'100%'}} onChange={(value)=>this.handleSelectSubCategoryForAll(value)} >
                                            {
                                                this.state.subCategories.map(subCategory=>{
                                                    return <Select.Option value={subCategory.name}>{subCategory.name}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </div>

                                </div>


                                <List
                                    itemLayout="horizontal"
                                    pagination={{
                                        onChange:(page)=>this.setState({pageNumber:page}),
                                        pageSize:10,
                                    }}
                                    dataSource={this.state.listingsData}
                                    renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <Button style={{backgroundColor:'#B17E4E',color:'white'}} onClick={()=>this.setState({isCategoryModal:true,idforUpdatingCategoryAndShipping:item.Id})}>Select Category</Button>,
                                            <Button style={{backgroundColor:'#8b0000',color:'white'}} onClick={()=>this.setState({isShippmentModal:true,idforUpdatingCategoryAndShipping:item.Id})}>Add Shipment</Button>]}
                                    >

                                        <List.Item.Meta
                                            avatar={                   
                                                    <img style={{width:100,height:100}} src={item.Images[0]} />
                                            }
                                            title={<h2>{item.TITLE}</h2>}
                                            description={<div style={{display:'flex',flexDirection:'column'}}>
                                                            <Truncate lines="2">{item.DESCRIPTION}</Truncate>
                                                            <Checkbox style={{fontWeight:'bold'}} checked={item.isCheck}  onChange={(e)=>{this.handleCheckListing(item.Id,e.target.checked)}}>Check To Add</Checkbox>
                                                        </div>}
                                        />
                                    </List.Item>
                                    )}
                                />
                                <Button size="large" style={{width:'200px',backgroundColor:"#B17E4E",color:'white',marginTop:'10px'}} onClick={()=>this.setState({confirmModal:true})}>Add to Inactive Listings</Button>
                            </div>
                            
                        }
                     
                    
                                                                        {/* Category Modal*/}        
                            <Modal title="Select Category"  visible={this.state.isCategoryModal} footer={null} onCancel={this.handleSelectCategoryModal}>
                                <div>
                                    <Select placeholder="Select Category" size="large" defaultValue={this.state.CategoryValue} style={{width:'100%'}} onChange={(value,key)=>this.handleSelectCategory(value,key)}>
                                        {
                                            this.state.categories.map(Category=>{
                                                return <Select.Option key={Category._id} value={Category.name}>{Category.name}</Select.Option>
                                            })
                                        }
                                    </Select>
                                </div>
                                <div>
                                    <Select placeholder="Select Sub Category" size="large" defaultValue={this.state.subCategoryValue} style={{width:'100%',marginTop:'20px'}} onChange={(value)=>this.handleSubCategory(value)}>
                                        {
                                            this.state.subCategories.map(subCategory=>{
                                                return <Select.Option value={subCategory.name}>{subCategory.name}</Select.Option>
                                            })
                                        }
                                    </Select>
                                </div>
                                <div>
                                    <Button size="large" style={{backgroundColor:'#B17E4E',color:'white',marginTop:'20px'}} onClick={this.handleCategoies} >Select</Button>
                                </div>
                            </Modal>



                                        {/* Shipping Modal*/}
                            <Modal title="Add Shippment" visible={this.state.isShippmentModal} footer={null} onCancel={()=>this.setState({isShippmentModal:false})}>
                                    <div>
                                        <h3 style={{fontWeight:'bold'}}>Select Shipping</h3>
                                        <Radio.Group onChange={(e)=>{this.setState({shippingValue:e.target.value})}} value={this.state.shippingValue}>
                                            <Radio value="Domestic">Domestic</Radio>
                                            <Radio value="International">International</Radio>
                                            <Radio value="Both">Both</Radio>
                                        </Radio.Group>
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <h3 style={{fontWeight:'bold'}}>Select Shippment</h3>
                                        {
                                            this.state.shippings.map((items,index)=>{
                                                return(

                                                    <div className="shippment" onClick={()=>this.handleShippment(index)} style={{backgroundColor:'#eeeeee',padding:5,borderRadius:'5px',marginBottom:'5px'}}>
                                                        <h4 style={{margin:0,fontWeight:'bold'}}>{items.title}</h4>
                                                        <Truncate lines="1" style={{margin:0}}>{items.description}</Truncate>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                            </Modal>
                                    
                                        
                            {/* Confirm Modal */}
                            <Modal title={<h3><Icon type="warning" style={{color:'#8b0000'}} /> Confirmation</h3>} afterClose={this.handleAddListings} visible={this.state.confirmModal} okText="Confirm" onCancel={()=>this.setState({confirmModal:false})} onOk={()=>this.setState({confirmModal:false})} closable={false}>
                                    <p style={{fontSize:'15px'}}>Please make sure that the listings should be custom made....</p>
                            </Modal>
                    
                    </div>

                

                </div>

                
                
            </div>
        )
    }
}


export default ConnectToEcternalStore;