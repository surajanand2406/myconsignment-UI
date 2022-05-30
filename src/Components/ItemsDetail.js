import React, { Component } from 'react'
import { Icon as Iconn} from '@ant-design/compatible';
import {Button,Divider,Form,Select, Card,List,Skeleton,Slider,Radio,message,Avatar} from 'antd'
import {Link} from 'react-router-dom'
import './CSS/ItemDetails.css'
import Navbar from './Navbar'
import image1 from './images/mobile1.jpg'
import { url } from '../Constants';
import Slide from 'react-reveal/Slide';
import Icon from 'react-web-vector-icons';
import Buy from './buy.png'
import Truncate from 'react-truncate';
import { connect } from 'react-redux';
import { renderItemAction,setFavoriteAction } from "../store/actions/actions";

const width = window.screen.width;
class ItemsDetail extends Component {
    constructor(props){
        super(props)
        this.initialState = {
            priceMin:0,
            priceMax:2000,
            last:1,
            pickupOnly:'No',
            shippingCheckboxValue:'International',
            windowWidth:width,
            categories:[],
            index:0,
            page:1,
            query:null,
            loadingListings:true,
            fakeData:[
                { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1,price:"120" },
                { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1,price:"120" },
                { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1,price:"120" },
                { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1,price:"120" },
                { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1 ,price:"120"},
                { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1,price:"120" },
                { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1,price:"120" },
                { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1,price:"120" }
            ],
            data:[],
            selectedIndex:-1
              
        }
        this.state={
            ...this.initialState
        }
        this.fetchListings=this.fetchListings.bind(this)
        this.fetchFilteredListings=this.fetchFilteredListings.bind(this)
    }

    componentDidMount(){
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width});
        })  
        const index=this.props.match.params.index
        const data = localStorage.getItem('categories')
        let categories = JSON.parse(data)
        this.setState({
            categories,
            index
        })
        let category = categories[index].name
        let query = {
            Category:category
        }
        this.setState({
            query
        })
        setTimeout(()=>{
            this.fetchListings()
        },1000)
        
    }
    priceChange=(value)=>{
        this.setState({priceMin:value[0],priceMax:value[1]})
    }

    pickupOnlyChange=(e)=>{
        if(e.target.value==="No")
        {   
            this.setState({pickupOnly:e.target.value,isShipping:true})
        }
        else
        {
            this.setState({pickupOnly:e.target.value,isShipping:false})
        }
        
    }

    shippingCheckboxValueChange=(e)=>{
        this.setState({shippingCheckboxValue:e.target.value})
    }
    fetchListings() {
        const { page } = this.state;;
        this.setState({
            loadingListings:true
        })
        if (this.state.query === null) {
          fetch(url + '/api/getListings' + page,{method:'POST',headers: { 'Content-Type': 'application/json' }}).then((res)=>res.json()).then((data)=>{
              if (page === 1) {
                if  (data.data.length === 0 || page === data.pages - 1) {
                  this.setState({
                    endOfData: true,
                    loadingMore: false,
                  });;
                  return;;
                }
                // console.log(data)
                
                let listings = data.data
                
                
                // this.props.addtListings({
                //   page: this.state.page,
                //   listings: listings
                // });
                let updatedListings = listings.map((listing)=>{
                    let data = listing
                    data.favorite = false
                    return data
                })
                this.setState({
                  loadingMore: false,
                  refreshing: false,
                  totalPages: data.pages,
                  data:updatedListings,
                  loadingListings:false
                });;
              } else  {
                if  (data.data.length === 0 || page === data.pages) {
                  this.setState({
                    endOfData: true,
                    loadingMore: false,
                  });;
                }
                else{
                  let lists = [...data.data,...this.state.data]
                  console.log('lsdihs => ',lists)
                  this.setState({
                    data:lists
                  })

                // this.props.addtListings({
                //   page: this.state.page,
                //   listings: lists
                // });
                }
    
                this.setState({
                  loadingMore: false
                });;
              }
            });;
        } 

     
        else if (this.state.query !== null) {
          fetch(url + '/api/getListings' + this.state.page,{body:JSON.stringify(this.state.query),method:'POST',headers: { 'Content-Type': 'application/json' }}).then((res)=>res.json()).then((data)=>{
              if (page === 1) {
                if  (data.data.length === 0 || this.state.page === data.pages - 1) {
                  this.setState({
                    endOfData: true,
                    loadingMore: false,
                    loadingListings:false
                  });;
                  return;;
                }
                // this.props.addtListings({
                //   page: this.state.page,
                //   listings: data.data,
                // });;
                this.setState({
                  loadingMore: false,
                  refreshing: false,
                  totalPages: data.pages,
                  data:data.data,
                  loadingListings:false
                });
              } else  {
                if  (data.data.length === 0 || this.state.page === data.pages) {
                  this.setState({
                    endOfData: true,
                    loadingMore: false,
                  });;
                }
                // this.props.addtListings({
                //   page: this.state.page,
                //   listings,
                // });;
                // console.log(listings)
                

                this.setState({
                  loadingMore: false,
                  loadingListings:false

                });;
              }
            });;
        }
      }
    fetchFilteredListings(){
        let data = this.state
        let query={
            last:data.last,
            minPrice:data.priceMin,
            maxPrice:data.priceMax,
            deliverable:data.pickupOnly==="Yes"?false:true,
            trade:false
        }
        console.log(query)
        this.setState({
            query
        })
        this.fetchListings()
    }
    render() {
        return (    
            <div className="item-detail-container" >
                        <Navbar  />

                        <div style={{width:'100vw',display:'flex',justifyContent:'center',marginTop:'50px'}}>
                            <div className="item-detail-tags" >
                                <div className="item-detail-tags-body subCat">
                                    {
                                       this.state.categories.length>0 && this.state.categories[this.state.index].subCategories.map((item,ind)=>{
                                            if(this.state.selectedIndex===ind){
                                                return(
                                                    <h4 onClick={e=>{
                                                        console.log(e.target.innerText)
                                                        this.setState({
                                                            selectedIndex:ind
                                                        })
                                                    }} style={{padding:'2px',paddingRight:'10px',paddingLeft:'10px',marginRight:'10px',backgroundColor:'darkred',color:'white'}}>{item.name}</h4>
                                            )
                                            }
                                            else{
                                                return(
                                                    <h4 onClick={e=>{
                                                        console.log(e.target.innerText)
                                                        let query = {
                                                            ...this.state.query,
                                                            subCategory:e.target.innerText
                                                        }
                                                        this.setState({
                                                            selectedIndex:ind,
                                                            loadingListings:true,
                                                            query
                                                        })
                                                        setTimeout(()=>{
                                                            this.fetchListings()
                                                        },1000)
                                                    }} style={{padding:'2px',paddingRight:'10px',paddingLeft:'10px',marginRight:'10px',backgroundColor:'#B17E4E',color:'white'}}>{item.name}</h4>
                                            )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="item-detail-products-container" >
                            <div className="item-detail-products-body" >
                                <div className="item-detail-products-filter">
                                    <Form>
                                        <h2>Categories</h2>
                                        {this.state.categories.length>0 &&<Select onChange={(e)=>{
                                            this.setState({
                                                index:e
                                            })
                                            let category = this.state.categories[e].name
                                            let query={
                                                Category:category
                                            }
                                            this.setState({
                                                query
                                            })
                                            setTimeout(()=>{
                                                this.fetchListings()
                                            },1000)
                                        }} showSearch placeholder="Select a Catergory" defaultValue={this.state.categories[this.state.index].name}>
                                            {
                                                this.state.categories.map((item,i)=>{
                                                    return(
                                                        <Select.Option value={i}>{item.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>}
                                        <Divider><h1>...</h1></Divider> 

                                        <h2>Filter</h2>  
                                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                            <h4>Last</h4>
                                            <h4>{this.state.last} Days</h4>
                                        </div>
                                        <Slider step={5} min={1} max={180} onChange={(value)=>this.setState({last:value})} />
                                        
                                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'30px'}}>
                                            <h4>Price</h4>
                                            <h4>${this.state.priceMin} - ${this.state.priceMax}</h4>
                                        </div>
                                        <Slider range max={20000} value={[this.state.priceMin,this.state.priceMax]} defaultValue={[0,20000]} onChange={this.priceChange}  />  
                                        
                                        <div style={{display:'flex',justifyContent:"flex-start",alignItems:'center',marginBottom:'10px',marginTop:'30px'}}>
                                            <h4 style={{marginRight:'10px',marginTop:'5px'}}>Pickup Only</h4>
                                            <Radio.Group value={this.state.pickupOnly} onChange={this.pickupOnlyChange}>
                                                    <Radio value="Yes">Yes</Radio>
                                                    <Radio value="No">No</Radio>
                                            </Radio.Group>
                                        </div>
                                        {
                                            this.state.isShipping===true ? 
                                            <div style={{marginBottom:'10px'}}>
                                                <h4>Shipping</h4>
                                                <Radio.Group value={this.state.shippingCheckboxValue} onChange={this.shippingCheckboxValueChange}>
                                                    <Radio value="National">Domestic</Radio>
                                                    <Radio value="International">International</Radio>
                                                </Radio.Group>
                                            </div>
                                    
                                            : null
                                        }
                                        <div style={{display:'flex',justifyContent:"flex-start",alignItems:'center',marginTop:'30px'}}>
                                            <Button onClick={this.fetchFilteredListings} style={{backgroundColor:'#B17E4E',width:'50%',color:'white'}} size="large" >Apply Filter</Button>
                                            <Button onClick={()=>{
                                                this.setState({
                                                    ...this.initialState
                                                })
                                            }} style={{backgroundColor:'#B17E4E',width:'50%',color:'white'}} size="large" >Reset</Button>
                                        </div>
                                    </Form>
                                </div>
                                <div className="item-detail-products-list" >
                                        {/* <List 
                                            grid={{gutter:16,xxl:4,xl:3,lg:3,md:2,sm:2}}
                                            dataSource={this.state.data}
                                            renderItem={(item,index)=>(
                                                <List.Item>
                                                    <Card
                                                        style={{ width: (this.state.windowWidth<=460) ? 200 : (this.state.windowWidth<=575) ? 300 : 220,borderTopLeftRadius:'10px',borderTopRightRadius:'10px' }}
                                                        cover={<img src={item.imageLinks[0]} alt='no listing img' style={{height: 250, width: (this.state.windowWidth<=460) ? 200 : (this.state.windowWidth<=575) ? 300 : 220 , borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}} />}
                                                        actions={[
                                                            <Icon type="share-alt" key="share-alt" />,
                                                            <div onClick={()=>{
                                                                fetch(url+'/api/getListing'+item._id).then(res=>res.json()).then(data=>{
                                                                    this.props.renderItem(data.result)})
                                                                    this.props.history.push('/itemdescription/'+item.listingID)
                                                            }}>
                                                     <Link><FontAwesomeIcon icon={faEye} /></Link>
                                                            </div>,
                                                            item.favorite===true?<Icon type="heart" onClick={()=>{
                                                                let listings = this.state.data.filter((list,i)=>{
                                                                    if(i!==index){
                                                                        return list
                                                                    }
                                                                    else{
                                                                        let obj = list
                                                                        list.favorite = false
                                                                        return obj
                                                                    }
                                                                })
                                                                console.log(listings)
                                                                this.setState({
                                                                    data:listings
                                                                })
                                                            }}  style={{color:"darkred"}} theme='filled' key="heart" />:<Icon onClick={()=>{
                                                                let listings = this.state.data.filter((list,i)=>{
                                                                    if(i!==index){
                                                                        return list
                                                                    }
                                                                    else{
                                                                        let obj = list
                                                                        list.favorite = true
                                                                        return obj
                                                                    }
                                                                })
                                                                this.setState({
                                                                    data:listings
                                                                })
                                                            }} type="heart" key="heart" />,
                                                            ]}
                                                        >
                                                            <Card.Meta
                                                                title={<h2>{item.title}</h2>}
                                                                description={<p>{item.description.substring(0,100)}</p>}
                                                            />
                                                        </Card>
                                                </List.Item>
                                            )}
                                        /> */}
                                        
                                        {this.state.loadingListings===false &&this.state.data.length>0 &&
                          
                          <List
                              grid={{ gutter:30,xxl:4,xl:3,lg:3,md:2,sm:2}}
                              dataSource={this.state.data}
                              renderItem={(item, index) => (
                                  <List.Item>
                                    <Slide bottom>
                                      <Card
                                        hoverable={true}
                                          className="Cards"
                                          bodyStyle={{padding:5}}
                                          style={{width: (this.state.windowWidth <= 360) ? 200 : (this.state.windowWidth <= 576) ? 300 : 260, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                                          cover={<Link to={`/itemdescription/${item.listingID}`}>
<img onClick={()=>{
                                            if(item.isFavorited===true){
                                              this.props.setFavorite(true)
                                            }
                                            else{
                                              this.props.setFavorite(false)

                                            }
                                          }} alt='icon error' src={item.imageLinks[0]} style={{ height: 250,width:(this.state.windowWidth <= 360) ? 200 : (this.state.windowWidth <= 576) ? 300 : 260, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                                          </Link>}
                                          actions={[
                                              <Iconn onClick={()=>{

                                                this.setState({
                                                  selectedItem:item,
                                                  showShareModal:true})
                                              }} type="share-alt" key="share-alt" />,
                                              <div onClick={()=>{
                                                  this.setState({
                                                    showBuyModal:true,
                                                    selectedListing:item
                                                  })
                                              }}>
                                                {/* <Link><FontAwesomeIcon icon={faEye} /></Link> */}
                                                <img src={Buy} alt='Buy now'/>
                                              </div>,
                                              <Iconn onClick={()=>{
                                                if(this.props.UID!==''){
                                                  let data = {
                                                    id:item._id,
                                                    firebaseUID:this.props.UID
                                                  }
                                                  fetch(url+'/api/addFavorite',{method:'PUT',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(data)})
                                                  .then(res => res.json())
                                                  .then(response=>{
                                                    if(response.message !== 'Success'){
                                                      message.error('Failed to Favorite Item')
                                                    }
                                                  })
                                                }
                                                this.props.favoriteItem(item._id)
                                              }} type="heart" theme={item.isFavorited===true?"filled":"outlined"}  key="heart" />,
                                          ]}
                                      >
                                          <Card.Meta
                                              title={ 
                                                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                                        <Truncate style={{ margin: 0,fontWeight:'bold',fontSize:18 }}>
                                                          <h3>{item.title}</h3> 
                                                        </Truncate>
                                                        {
                                                          item.isPRO===true ?
                                                          <p style={{padding:2,backgroundColor:'#8b0000',color:'white',fontSize:14,marginBottom:0}}>PRO</p>
                                                          :
                                                          <p style={{padding:13,marginBottom:0}}></p>
                                                        }
                                                      </div>
                                                    }
                                              description={<div style={{flex:1,flexDirection:"row"}}>
                                                  <Truncate lines="3" style={{ margin: 0 }}>{item.description}</Truncate>
                                                  <h3 style={{margin:0,flexBasis:"30%"}}>${item.price}</h3>
                                              </div>
                                          
                                          }
                                          />
                                      </Card>
                                      </Slide>
                                  </List.Item>
                              )}
                          />
                          }
                      {this.state.loadingListings && <List
                          grid={{ gutter: 35,xxl:4,xl:4,lg:3,md:2,sm:2}}
                          dataSource={this.state.fakeData}
                          renderItem={(item, index) => (
                              <List.Item>
                                      <Card
                              style={{ width: (this.state.windowWidth <= 498) ? 180 : (this.state.windowWidth <= 598) ? 200 : 220, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                                                                  
                              actions={[
                                  <Icon type="setting" key="setting" />,
                                  <Icon type="edit" key="edit" />,
                                  <Icon type="ellipsis" key="ellipsis" />,
                              ]}
                              >
                              <Skeleton loading={this.state.loadingListings} avatar active>
                                  <Card.Meta
                                  avatar={
                                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                  }
                                  title="Card title"
                                  description="This is the description"
                                  />
                              </Skeleton>
                              </Card>
                              </List.Item>
                          )}
                      />}
                                </div>


                            </div>
                        </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return ({
        UID:state.rootReducer.UID,
        userInfo:state.rootReducer.userInfo,
        categories:state.rootReducer.categories,
        listingCategories:state.rootReducer.listingCategories,
        item:state.rootReducer.item,
        query:state.rootReducer.query,
        data:state.rootReducer.data,
    })
}
function mapActionsToProps(dispatch) {
    return ({
        renderItem:(item)=>{
            dispatch(renderItemAction(item))
        },
        setFavorite:(type)=>{
            dispatch(setFavoriteAction(type))
        }
    })
}

export default connect(mapStateToProps,mapActionsToProps)(ItemsDetail)