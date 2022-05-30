import React, { Component } from 'react'
import Navbar from './Navbar'
import {List,Card} from 'antd'
import { Icon } from '@ant-design/compatible';
import Truncate from 'react-truncate'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/free-solid-svg-icons'
import './CSS/Profile.css' 
import ProfileSidebar from './ProfileSidebar'  
import { url } from "../Constants";


const width = window.screen.width;
export default class Profile extends Component {

    constructor(props){
        super(props)
        this.initialState = {
            isSelling:true,
            isSold:false,
            isFav:false,
            windowWidth:width,
            userData:null,
            onSale:[],
            Favorites:[],
            Orders:[]
        }
        this.state={
            ...this.initialState
        }
    }

    componentDidMount(){
        window.addEventListener('resize',()=>{
            this.setState({windowWidth:window.screen.width});
        })  
        let data = localStorage.getItem('userData')
        if(data!==null){
            let userData = JSON.parse(data)
            this.setState({
                userData
            })
            fetch(url+'/api/getActivity'+userData.firebaseUID)
            .then(res=>res.json())
            .then(response=>{
                if(response.message==='Success'){
                    let {onSale,Orders,Favorites} = response.doc
                    this.setState({
                        onSale,
                        Orders,
                        Favorites
                    })
                }
                else{
                    alert("Failed to fetch user data")
                }
            })
        }
    }

    handleIsFav=()=>{
        this.setState({
            isFav:true,
            isSold:false,
            isSelling:false
        })
    }
    handleIsSelling=()=>{
        this.setState({
            isSelling:true,
            isSold:false,
            isFav:false
        })
    }
    hanleIsSold=()=>{
        this.setState({
            isSold:true,
            isFav:false,
            isSelling:false
        })
    }

    render() {

        const styles = {
            width:'33%',
            textAlign:'center',
            fontSize:'15px',
            borderBottom:'solid 1px lightgray',
            padding:'5px'
        }
        const styles1 = {
            width:'33%',
            textAlign:'center',
            fontSize:'15px',
            color:'darkcyan',
            borderBottom:'solid 2px darkcyan',
            padding:'5px',
            fontWeight:'bold'
        }

        return (
            <div className="Profile-container">
                <Navbar history={this.props.history} />
                <div className="profile-body-container">
                    <ProfileSidebar />
                    <div className="profile-body">
                        <div style={{display:'flex',marginTop:'10px',justifyContent:'center'}}>
                            <div style={{display:'flex',width:'95%'}}>
                                <div className="menu" style={this.state.isSelling===true ? styles1 : styles} onClick={this.handleIsSelling}>Selling</div>
                                <div className="menu" style={this.state.isSold===true ? styles1 : styles} onClick={this.hanleIsSold}>Sold</div>
                                <div className="menu" style={this.state.isFav===true ? styles1 : styles} onClick={this.handleIsFav}>Favorites</div>
                            </div>
                        </div>
                        <div style={{display:'flex',marginTop:'10px',justifyContent:'center'}}>
                            {
                                this.state.isSelling===true ?

                                    <div style={{marginTop:'20px',width:'95%'}}>
                                        <List 
                                                grid={{gutter:16,xxl:4,xl:4,lg:3,md:2,sm:2,xs:1 }}
                                                dataSource={this.state.onSale}
                                                renderItem={(item)=>(
                                                    <List.Item>
                                                        <Card
                                                            style={{ width:(this.state.windowWidth <= 320) ? 200 : (this.state.windowWidth <= 360) ? 220 : (this.state.windowWidth <= 576) ? 300 :220 ,borderTopLeftRadius:'10px',borderTopRightRadius:'10px' }}
                                                            cover={<img src={item.imageLinks[0]} alt='listing not found' style={{height: 150,width:(this.state.windowWidth <= 320) ? 200 :(this.state.windowWidth <= 360) ? 220 : (this.state.windowWidth <= 576) ? 250 :220,borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}} />}
                                                            actions={[
                                                                <Icon type="share-alt" key="share-alt" />,
                                                                <Link to={`/itemdescription/${item.listingID}`}><FontAwesomeIcon icon={faEye} /></Link>,
                                                                <Icon type="heart" key="heart" />,
                                                                ]}
                                                            >
                                                                <Card.Meta
                                                                    title={<h2 style={{margin:'0px'}}>{item.title}</h2>}
                                                                    description={<Truncate lines='3' style={{margin:'0px'}}>{item.description.substring(0,50)}</Truncate>}
                                                                />
                                                            </Card>
                                                    </List.Item>
                                                )}
                                            />
                                    </div>

                                : this.state.isSold===true ?

                                <div style={{marginTop:'20px',width:'95%'}}>
                                        <List 
                                            grid={{gutter:16,xxl:4,xl:4,lg:3,md:2,sm:2,xs:1}}
                                            dataSource={this.state.Orders}
                                            renderItem={(item,index)=>(
                                                <List.Item>
                                                    <Card
                                                        style={{ width: (this.state.windowWidth <= 320) ? 200 :(this.state.windowWidth <= 360) ? 220 : (this.state.windowWidth <= 576) ? 300 :220,borderTopLeftRadius:'10px',borderTopRightRadius:'10px' }}
                                                        cover={<img src={item.imageLinks[0]} alt='add data' style={{height: 150,width:(this.state.windowWidth <= 320) ? 200 :(this.state.windowWidth <= 360) ? 220 : (this.state.windowWidth <= 576) ? 250 :220,borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}} />}
                                                        actions={[
                                                            <Icon type="share-alt" key="share-alt" />,
                                                            <Link to={`/itemdescription/${index}`}><FontAwesomeIcon icon={faEye} /></Link>,
                                                            <Icon type="heart" key="heart" />,
                                                            ]}
                                                        >
                                                            <Card.Meta
                                                                title={<h2 style={{margin:'0px'}}>{item.title}</h2>}
                                                                description={<p style={{margin:'0px'}}>{item.description.substring(0.50)}</p>}
                                                            />
                                                        </Card>
                                                </List.Item>
                                            )}
                                        />
                                </div>
                                :
                                    <div style={{marginTop:'20px',width:'95%'}}>
                                        <List 
                                                grid={{gutter:16,xxl:4,xl:4,lg:3,md:2,sm:2,xs:1}}
                                                dataSource={this.state.Favorites}
                                                renderItem={(item,index)=>(
                                                    <List.Item>
                                                        <Card
                                                            style={{ width: (this.state.windowWidth <= 320) ? 200 :(this.state.windowWidth <= 360) ? 220 : (this.state.windowWidth <= 576) ? 300 :220,borderTopLeftRadius:'10px',borderTopRightRadius:'10px',marginLeft:'30px' }}
                                                            cover={<img src={item.imageLinks[0]} alt='not found' style={{height: 150,width:(this.state.windowWidth <= 320) ? 200 :(this.state.windowWidth <= 360) ? 220 : (this.state.windowWidth <= 576) ? 250 :220,borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}} />}
                                                            actions={[
                                                                <Icon type="share-alt" key="share-alt" />,
                                                                <Link to={`/itemdescription/${index}`}><FontAwesomeIcon icon={faEye} /></Link>,
                                                                <Icon type="heart" theme='filled' key="heart" />,
                                                                ]}
                                                            >
                                                                <Card.Meta
                                                                    title={<h2 style={{margin:'0px'}}>{item.title}</h2>}
                                                                    description={<p style={{margin:'0px'}}>{item.description.substring(0,50)}</p>}
                                                                />
                                                            </Card>
                                                    </List.Item>
                                                )}
                                        />
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
