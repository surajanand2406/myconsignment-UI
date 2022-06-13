import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './CSS/NavbarCss.css';
import { Icon } from '@ant-design/compatible';
import { Button, Divider, Modal, Form, Input, Select, Avatar, Drawer, Radio, Upload, Tooltip, message } from 'antd'
import ReactSelect from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { url } from "../Constants";
import firebase from 'firebase'
import { setUIDAction, setUserInfoAction, pushListingAction, setShippingsAction } from "../store/actions/actions";
import { connect } from "react-redux";
import Logo from './my1.png'
import Firebase from 'firebase'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { countries } from './CustomMade/countries'
import Login from './View/LoginSignup/Login';
import SignUp from './View/LoginSignup/Signup';


const { Option } = Select

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

//My Code
const myCurr = [{
    label: 'USD',
    value: 'usd'
}, {
    label: 'INR',
    value: 'inr'
}, {
    label: 'TAKA',
    value: 'taka'
}, {
    label: 'PESO',
    value: 'peso'
}];

const myLang = [{
    label: 'ENG',
    value: 'usd'
}, {
    label: 'Spanish',
    value: 'inr'
}, {
    label: 'French',
    value: 'taka'
}, {
    label: 'Germany',
    value: 'peso'
}];

var width = window.screen.width;
class Navbar extends Component {
    constructor(props) {
        super(props)
        this.initialState = {

            isLoginModal: false,
            isSignUpModal: false,
            isSideBar: false,
            isProfileSideBar: false,

            windowWidth: width,

            isAddListing: this.props.isAddListing !== undefined ? this.props.isAddListing : false,
            isShowForm: false,
            isShipping: false,
            tradeCheckboxValue: 'No',
            shippingCheckboxValue: 'Pickup',
            previewVisible: false,
            previewImage: '',
            fileList: [],
            addonAfter: "",
            usernameIcon: "",
            downlaodUrls: [],
            subCategories: [],
            title: "",
            description: "",
            price: "",
            Category: "",
            subCategory: "",
            shippingProfiles: [{
                label: "Precious items",
                value: 1
            },
            {
                label: "Wooden Items",
                value: 2
            },
            {
                label: "General Iterms",
                value: 3
            }
            ],
            uploading: false,
            listingTitle: "",
            isPro: true,
            filename: "",
            sponsor: "No",
            replicate: "No",
            sku: '',
            tags: [],
            tagsData: [],
            saved: false,
            sponsorRate: 1,
            id: '',
            drafts: [],
            changed: false,
            showDraftModal: false,
            draftValue: 1,
            shippingID: "",
            videoFile: null,
            videoURL: ""
        }
        this.state = {
            ...this.initialState
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleDataUpload = this.handleDataUpload.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleShowSearchBar = this.handleShowSearchBar.bind(this)
        this.handleSKU = this.handleSKU.bind(this)
        this.saveDraft = this.saveDraft.bind(this)
        this.handleVideoFileUpload = this.handleVideoFileUpload.bind(this)

    }

    handleSubmit() {
        if (this.state.fileList.length > 0) {
            this.setState({
                isAddListing: false
            })
            confirmAlert({
                title: 'Accept our fee policy',
                message: <div>Do you agree to our fee structure for this listing defined in <a target='_blank' href='/aboutus'>About us</a> section?</div>,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            if (this.state.videoFile !== null) {
                                this.handleVideoFileUpload()
                            }
                            else {
                                this.handleFileUpload()
                            }
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            this.setState({
                                isAddListing: true
                            })
                        }
                    }
                ],
                afterClose: () => {
                    this.setState({
                        isAddListing: true
                    })
                }
            });
        }
        else {
            alert('Listing must have at least one image')
        }
    }
    handleSKU() {
        const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'z', 'x', 'v', 'n', 'm', 'q', 'w', 'r', 't', 'y', 'u', 'o', 'p']

        let { title, Category, subCategory } = this.state

        let sku = ''
        let name = this.props.userInfo !== null ? this.props.userInfo.fName.substring(0, 3) : "user" + Math.round(Math.random() * 100000)
        sku += name
        if (title.length > 0) {
            sku += title.substring(0, 3)
        } else sku += 'item'
        sku += Category.substring(0, 3)
        sku += subCategory.substring(0, 3)
        sku += chars[Math.round(Math.random() * 14)] + chars[Math.round(Math.random() * 13)]
        sku += '' + Math.round(Math.random() * 10000)
        console.log(sku)
        this.setState({ sku })

    }
    handleDataUpload() {
        if (this.state.downlaodUrls.length > 0) {
            let trade = true
            const data = {
                title: this.state.title,
                description: this.state.description,
                price: parseInt(this.state.price),
                trade,
                shippingNational: this.state.shippingCheckboxValue === 'National' ? true : false,
                shippingInternational: this.state.shippingCheckboxValue === 'International' ? true : false,
                imageLinks: this.state.downlaodUrls,
                firebaseUID: this.props.UID,
                Category: this.state.Category,
                subCategory: this.state.subCategory,
                location: {
                    longitude: this.props.currentLocation !== null ? this.props.currentLocation.lng : "67.054371",
                    latitude: this.props.currentLocation !== null ? this.props.currentLocation.lat : "24.886230"
                },
                currency: "USD",
                accountID: this.props.paymentInfo !== null ? this.props.paymentInfo.accountID : '',
                shippingID: this.state.shippingCheckboxValue !== 'Pickup' ? this.state.shippingID : ""
            }
            if (this.state.shippingCheckboxValue === 'Pickup') {
                delete data.shippingID
            }
            if (this.state.shippingCheckboxValue !== 'Pickup' && data.shippingID == null) {
                message.error('You must select shipping profile')
                return
            }
            if (this.state.videoURL !== '') {
                data.video = this.state.videoURL
            }
            console.log('listing=>', data)
            fetch(url + '/api/addListing', { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).then(res => res.json()).then(resData => {
                this.setState({ loading: false, showLogo: false })
                if (resData.error)
                    alert(resData.message)
                else {
                    if (resData.message === 'Success') {

                        this.props.pushListing(resData.data)

                        //   this.props.navigation.navigate('HomeScreen')
                        this.setState({
                            ...this.initialState
                        })
                        this.handleCloseDrawer()
                    }
                    else {
                        console.log(resData)
                        message.error(resData.err._message)
                    }
                }
            }).catch(err => alert(err))
        }
        else {
            alert("Listing must have at least one image")
        }
    }
    handleVideoFileUpload() {
        if (this.state.videoFile !== null) {
            let storage = Firebase.storage()
            let storageRef = storage.ref(`artisan/djiosjo290jcjew9cjw3d/video` + Date.now())
            let task = storageRef.put(this.state.videoFile)
            task.on('state_changed', (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //   console.log('Upload is ' + progress.toFixed(2) + '% done');
                switch (snapshot.state) {
                    case Firebase.storage.TaskState.PAUSED: // or 'paused'
                        //   console.log('Upload is paused');
                        break;
                    case Firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log(progress);
                        break;
                    default:
                        return
                }
            }, (error) => {
                message.error(error.message)
            }, () => {
                storageRef.getDownloadURL().then((downloadURL) => {
                    this.setState({
                        videoURL: downloadURL
                    })
                    this.handleFileUpload()
                });

            })
        }
    }
    handleFileUpload() {
        this.setState({
            uploading: true
        })
        let images = this.state.fileList
        if (images.length > 0) {
            images.map((image) => {
                let storage = Firebase.storage()
                let storageRef = storage.ref(`artisan/djiosjo290jcjew9cjw3d/image` + Date.now())
                let task = storageRef.put(image.originFileObj)
                task.on('state_changed', function (snapshot) {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //   console.log('Upload is ' + progress.toFixed(2) + '% done');
                    switch (snapshot.state) {
                        case Firebase.storage.TaskState.PAUSED: // or 'paused'
                            //   console.log('Upload is paused');
                            break;
                        case Firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log(progress);
                            break;
                        default:
                            return
                    }
                }, function (error) {
                    alert(error.message)
                }, () => {
                    storageRef.getDownloadURL().then((downloadURL) => {
                        let oldUrls = this.state.downlaodUrls
                        oldUrls.push(downloadURL)
                        this.setState({
                            downlaodUrls: oldUrls
                        })
                        if (this.state.downlaodUrls.length === this.state.fileList.length) {
                            this.handleDataUpload()
                        }
                    });
                })
            })
        }
        else {
            message.error('At least 1 image is required')
        }
    }
    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ windowWidth: window.screen.width });
        })

        let data = localStorage.getItem('userData')
        if (data !== null) {
            let userData = JSON.parse(data)
            this.props.setUserInfo(userData)
            this.props.setUID(userData.firebaseUID)
            fetch(url + '/api/getShippings' + userData.firebaseUID)
                .then(res => res.json())
                .then(response => {
                    if (response.message === 'Success') {
                        if (response.doc.length > 0) {
                            let shippings = response.doc.map((ship) => {
                                return {
                                    label: ship.title,
                                    value: ship._id
                                }
                            })
                            this.props.setShippings(shippings)
                        }
                    }
                    else {
                        alert('Error loading shipping profiles')
                    }
                })
            setInterval(() => {
                if (this.state.isAddListing === true && this.state.changed === true) {
                    this.saveDraft()
                }
            }, 10 * 1000)
            fetch(url + '/api/getUserDrafts' + userData.firebaseUID)
                .then(res => res.json())
                .then(response => {
                    if (response.message === 'Success') {
                        let data = response.doc
                        if (data.length > 0) {
                            this.setState({
                                drafts: data
                            })
                        }
                    } else {
                        message.error('Failed to fetch drafts')
                    }
                })
        }
    }
    saveDraft() {
        this.setState({
            loading: true
        })
        let data = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            trade: this.state.tradeCheckboxValue === 'No' ? false : true,
            shippingNational: this.state.shippingCheckboxValue === 'National' ? true : false,
            shippingInternational: this.state.shippingCheckboxValue === 'International' ? true : false,
            firebaseUID: this.props.UID,
            Category: this.state.Category,
            subCategory: this.state.subCategory,
            isPRO: this.state.isPRO,
        }
        if (this.state.isPro === true) {
            data.tags = this.state.tags
            data.sponsor = this.state.sponsor === 'Yes' ? true : false
            data.sku = this.state.sku
            if (this.state.sponsor === 'Yes') {
                data.sponsorRate = this.state.sponsorRate
            }
        }
        if (this.state.saved === false) {
            //create draft
            fetch(url + '/api/createDraft', { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
                .then(res => res.json())
                .then(response => {
                    if (response.message === 'Success') {
                        this.setState({
                            saved: true,
                            id: response.doc._id,
                            loading: false
                        })
                        message.success('Draft Saved!')
                    }
                    else {
                        message.success('Draft couldn\'t be saved!')
                        this.setState({
                            loading: false
                        })
                    }
                })


        } else if (this.state.saved === true) {
            //update
            data.id = this.state.id
            fetch(url + '/api/updateDraft', { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
                .then(res => res.json())
                .then(response => {
                    if (response.message === 'Success') {
                        message.success('Draft Saved!')
                    }
                    else {
                        message.success('Draft couldn\'t be saved!')
                        this.setState({
                            loading: false
                        })
                    }
                })
        }
    }
    handleAddListing = () => {
        this.setState({ isAddListing: true });
    }

    handleLogIn = (value) => {
        // this.setState({ isLoginModal: value, isSignUpModal: false })
        return (<Login />)
    }
    handleLogInModalCancel = (value) => {
        this.setState({ isLoginModal: value })
    }

    handleSignUpModal = (value = true) => {
        // this.setState({ isSignUpModal: value, isLoginModal: false })
        return(<SignUp />)
    }
    handleSignUpModalCancel = (value) => {
        this.setState({ isSignUpModal: value })
    }

    handleSidebar = () => {
        this.setState({ isSideBar: true })
    }

    handleProfileSideBar = () => {
        this.setState({ isProfileSideBar: true })
    }

    handleAddonStatus = (val) => {
        if (val === true) {
            this.setState({
                addonAfter: "Username is taken"
            })
        } else {
            this.setState({
                addonAfter: "Username is valid"
            })
        }
    }


    //Addlisting Drawer
    handleCloseDrawer = () => {
        this.setState({ isAddListing: false })
    }

    tradeCheckboxValueChange = (e) => {
        if (e.target.value === "No") {
            this.setState({ tradeCheckboxValue: e.target.value, isShipping: true })
        }
        else {
            this.setState({ tradeCheckboxValue: e.target.value, isShipping: false })
        }

    }

    shippingCheckboxValueChange = (e) => {
        this.setState({ shippingCheckboxValue: e.target.value })
    }

    //Image code Start
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleLogout() {
        firebase.auth().signOut().then(() => {
            let data = {
                firebaseUID: this.props.UID
            }
            localStorage.removeItem('userData')
            fetch(url + '/api/logout', { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
                .then(res => res.json())
                .then(response => {
                    if (response.message === 'Success') {
                        //    this.props.navigation.navigate('ProviderLogin')
                        this.props.setUID('')
                        this.setState({
                            isProfileSideBar: false
                        })
                        this.props.setUserInfo(null)
                        this.props.history.push('/')

                    }
                })
        }).catch((error) => {
            // An error happened.
            alert('Logout failed...')
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList });

    //Image Code End
    handleValueChange(e) {
        if (e.target.name === 'title') {
            this.setState({
                changed: true
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSearch() {
        let title = this.state.listingTitle
        if (title.length > 3) {
            let data = {
                title
            }
            console.log(data)
            fetch(url + '/api/searchListing', { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Success') {
                        console.log(data.doc)
                    }
                    else {
                        alert("Listing fetch failed")
                    }
                })
        }
        else {
            alert('Must be minimum 3 characters')
        }
    }


    handleShowSearchBar = () => {
        this.props.showSearch('yes')
    }

    render() {
        const radioStyle = {
            display: 'block',
            height: '35px',
            lineHeight: '35px',
            backgroundColor: "#ebebeb",
            marginTop: 8,
            width: '90%',
            color: 'black',
            padding: 5,
            fontSize: 18
        };


        //Image Code Start
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className="navbar-container">
                <Select defaultValue={'ENG'} options={myLang} style={{ width: this.state.windowWidth <= 576 ? '100px' : '70px', height: '30px' }} />
                <Select defaultValue={'USD'} options={myCurr} style={{ width: this.state.windowWidth <= 576 ? '10px' : '70px', height: '30px' }} />
                {/* <Link to="/" className="logo">
                    <img src={Logo} alt='logo not found' style={{ width: this.state.windowWidth <= 576 ? '100%' : '80%', height: '100%' }} />
                </Link> */}
                {/* <div className="search-box" style={{...searchStyle,opacity:this.state.searchBarOpacity}}>
                    <FontAwesomeIcon icon={faSearch} color="gray" size="lg" style={{ marginLeft: '20px' }} />
                    <Input className="Input" size="large" onChange={e=>{
                        this.setState({
                            listingTitle:e.target.value
                        })
                    }} name='listingTitle' value={this.state.listingTitle} onKeyPress={(event)=>{
                        if (event.which === 13 || event.keyCode === 13) {
                            this.handleSearch()
                        }
                    }} placeholder="Search..." />
                </div> */}

                <ul className="nav">
                    {/* <Link to='/auction'><li className="l1 l2">Live Auctions</li></Link>
                    <Link to="/custom-made"><li className="l1 l2">Custom Made</li></Link>
                    <Link to='/exclusive-services'><li className="l1 l2">Exclusive Services</li></Link>
                    <Link to='/sponsor'><li className="l1 l2">Sponsorship</li></Link> */}
                    {this.props.UID !== '' && <li ><Button className="AddListingsFloatButton" size={this.state.windowWidth <= 576 ? 'small' : 'large'} icon="plus" shape="square" onClick={this.handleAddListing}></Button></li>}
                    {this.props.UID !== '' && <li ><Button className="AddListings" shape="round" size="large" onClick={this.handleAddListing}>Add Listing</Button></li>}
                    <Link to='/loginSignup'>{this.props.UID === '' && <li><Button shape="round" className='button1' size={this.state.windowWidth <= 576 ? 'small' : '20px'} onClick={this.handleLogIn}>Login</Button></li>}</Link>
                    <Link to='/Signup'>{this.props.UID === '' && <li className="l1 button2"><Button shape="round" size="20px" onClick={this.handleSignUpModal}>Signup</Button></li>}</Link>

                    <li className="side-menu"><Icon type="menu" style={{ fontSize: this.state.windowWidth <= 576 ? '20px' : '25px' }} onClick={this.handleSidebar} /></li>
                </ul>
                {this.props.UID !== '' &&
                    <div className="user-login-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '10%', marginBottom: 15 }} onClick={this.handleProfileSideBar} >
                        <Avatar className="avatar" size={40} src={this.props.userInfo !== null ? this.props.userInfo.profilePic : "https://firebasestorage.googleapis.com/v0/b/pureartisann.appspot.com/o/artisan%2Fimage1576146196579?alt=media&token=ad528ce7-a843-4548-8737-39337d71cb35"} style={{ marginRight: '5px' }} />
                        <h5>{this.props.userInfo !== null ? this.props.userInfo.fName : "Test"}</h5>
                    </div>}




                {/*Profile Side Bar*/}
                {this.props.UID === '' && <Drawer onClose={() => this.setState({ isProfileSideBar: !this.state.isProfileSideBar })} className="drawer" visible={this.state.isProfileSideBar} width='25%' closable={false} bodyStyle={{ padding: 0 }} >
                    <div style={{ height: '200px', backgroundColor: 'darkcyan' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
                            <Icon type="arrow-right" style={{ fontSize: '20px', color: 'white' }} onClick={() => { this.setState({ isProfileSideBar: false }) }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <Avatar icon="user" size={100} />
                            <div style={{ marginLeft: '10px', color: 'white' }}>
                                <h2 style={{ color: 'white' }}>You're not logged in</h2>xfS
                            </div>
                        </div>
                    </div>
                    <div className="side-menu-link" style={{ marginLeft: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        </div>

                    </div>
                </Drawer>}
                {this.props.UID !== '' && <Drawer onClose={() => this.setState({ isProfileSideBar: !this.state.isProfileSideBar })} className="drawer" visible={this.state.isProfileSideBar} width='25%' closable={false} bodyStyle={{ padding: 0 }} >
                    <div style={{ height: '200px', backgroundColor: 'darkcyan' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
                            <Icon type="arrow-right" style={{ fontSize: '20px', color: 'white' }} onClick={() => { this.setState({ isProfileSideBar: false }) }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                            <Avatar src={this.props.userInfo !== null ? this.props.userInfo.profilePic : "https://firebasestorage.googleapis.com/v0/b/pureartisann.appspot.com/o/artisan%2Fimage1576146196579?alt=media&token=ad528ce7-a843-4548-8737-39337d71cb35"} size={100} />
                            <div style={{ marginLeft: '10px', color: 'white' }}>
                                <h2 style={{ color: 'white' }}>{this.props.userInfo !== null ? this.props.userInfo.fName : "No Name"}</h2>
                                <h5 style={{ color: 'white' }}>{this.props.userInfo !== null ? this.props.userInfo.username : "Test Username"}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="side-menu-link" style={{ marginLeft: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }} to="/user-profile">Profile</Link>
                            <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }} to="/messages">Conversations</Link>
                            <Link onClick={this.handleLogout} style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }}>Log Out</Link>
                        </div>


                    </div>
                </Drawer>}


                {/*Side bar for small device*/}
                <Drawer onClose={() => this.setState({ isSideBar: !this.state.isSideBar })} className="drawer" visible={this.state.isSideBar} width="80%" closable={false} bodyStyle={{ padding: 0 }} >
                    <div style={{ height: '200px', backgroundColor: 'darkcyan' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
                            <Icon type="arrow-right" style={{ fontSize: '30px', color: 'white' }} onClick={() => { this.setState({ isSideBar: false }) }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                            {
                                this.props.UID !== '' ?
                                    <>
                                        <Avatar src={this.props.userInfo !== null ? this.props.userInfo.profilePic : "https://firebasestorage.googleapis.com/v0/b/pureartisann.appspot.com/o/artisan%2Fimage1576146196579?alt=media&token=ad528ce7-a843-4548-8737-39337d71cb35"} size={100} />
                                        <div style={{ marginLeft: '10px', color: 'white' }}>
                                            <h2 style={{ color: 'white' }}>{this.props.userInfo !== null ? this.props.userInfo.fName : "No Name"}</h2>
                                            <h5 style={{ color: 'white' }}>{this.props.userInfo !== null ? this.props.userInfo.username : "Test Username"}</h5>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <Avatar icon="user" size={100} />
                                        <div style={{ marginLeft: '10px', color: 'white' }}>
                                            <h2 style={{ color: 'white' }}>Your Not logged In</h2>
                                            <h5 style={{ color: 'white' }}>Please Login Now</h5>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className="side-menu-link" style={{ marginLeft: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }}>Live Auction</Link>
                            <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }} to="/custom-made">Custom Made</Link>
                            {this.props.UID !== '' && <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }} to="/user-profile">Profile</Link>}
                            <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }} to="/messages">Conversations</Link>
                            <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }} to="/exclusive-services">Exclusive Services</Link>
                            <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }} to="/sponsor">Sponsorship</Link>
                            {this.props.UID !== '' && <Link style={{ padding: '15px', paddingLeft: 10, width: '100%', fontSize: '15px', color: 'black', borderBottom: 'solid 1px lightgray' }} onClick={this.handleLogout} >Log Out</Link>}
                        </div>

                    </div>
                </Drawer>


                {/*Addlisting Side Bar*/}
                <Drawer onClose={() => this.setState({ isAddListing: !this.state.isAddListing })} bodyStyle={{ padding: 20 }} title={<h1>Add Your Product</h1>} visible={this.state.isAddListing} width={(this.state.windowWidth) <= 768 ? '100%' : (this.state.windowWidth) <= 980 ? '80%' : (this.state.windowWidth) <= 1180 ? '60%' : '40%'} closable={false}>
                    <Button style={{ backgroundColor: 'darkcyan', color: 'white', position: 'relative', top: '-85px', left: '90%' }} shape="circle" size="large" onClick={this.handleCloseDrawer}>
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={() => { this.setState({ showDraftModal: true }) }} type='link' style={{ fontSize: 16 }}>Select from Drafts</Button>
                    </div>
                    <ReactSelect placeholder="Select Category" options={this.props.listingCategories} onChange={(val) => {
                        let subCategories = this.props.categories[val.value - 1].subCategories
                        let updatedSubCategories = subCategories.map((sub, index) => {
                            return {
                                label: sub.name,
                                value: index + 1
                            }
                        })
                        let tags = this.props.categories[val.value - 1].tags
                        if (tags !== undefined) {
                            this.setState({
                                tagsData: tags
                            })
                        }
                        this.setState({ isShowForm: true, subCategories: updatedSubCategories, Category: val.label })
                    }} />
                    <Divider />
                    {
                        this.state.isShowForm === true ?
                            <Form style={{ marginBottom: '10px' }}>
                                <ReactSelect placeholder="Select Sub Category" onChange={(val) => {
                                    this.setState({
                                        subCategory: val.label
                                    })
                                }} options={this.state.subCategories} />
                                <Input placeholder="Enter Title" onChange={this.handleValueChange} value={this.state.title} name='title' size="large" style={{ backgroundColor: '#fafafa', marginBottom: '10px', marginTop: '10px' }} />
                                <Input.TextArea size="large" onChange={this.handleValueChange} name='description' value={this.state.description} style={{ backgroundColor: '#fafafa', marginBottom: '10px' }} placeholder="Enter Description" autoSize={{ minRows: 5 }}></Input.TextArea>
                                <Input type='number' placeholder="Enter Price" value={this.state.price} onChange={this.handleValueChange} name='price' size="large" style={{ backgroundColor: '#fafafa', marginBottom: '10px' }} />
                                <div style={{ display: 'flex', justifyContent: "flex-start", alignItems: 'center', marginBottom: '10px' }}>
                                    <h4 style={{ marginRight: '10px', marginTop: '5px' }}>Accept Trade?</h4>
                                    <Radio.Group value={this.state.tradeCheckboxValue} onChange={this.tradeCheckboxValueChange}>
                                        <Radio value="Yes">Yes</Radio>
                                        <Radio value="No">No</Radio>
                                    </Radio.Group>
                                </div>
                                {this.props.isPRO === true && <div>
                                    <label for='sku'>SKU (optional)</label>
                                    <Input
                                        placeholder='SKU'
                                        name='sku'
                                        autoComplete='off'
                                        value={this.state.sku}
                                    />
                                    <Button onClick={this.handleSKU} type='link'>
                                        Auto Generate SKU
                                    </Button>
                                </div>}
                                {this.props.isPRO === true && <div>
                                    <label>Tags (max 10):</label>
                                    <br />
                                    <Select allowClear={true} maxTagCount={10} mode="tags" style={{ width: '100%' }} value={this.state.tags} placeholder="Tags" onChange={(value) => {
                                        if (value.length > 10) {
                                            message.error('Maximum 10 tags are allowed')
                                        }
                                        else this.setState({
                                            tags: value
                                        })
                                    }}>
                                        {this.state.tagsData.length !== 0 && this.state.tagsData.map(tag => {
                                            return <Option key={tag}>{tag}</Option>
                                        })}
                                    </Select>
                                </div>}
                                <br />

                                {

                                    <div style={{ marginBottom: '10px' }}>
                                        <h4>Shipping</h4>
                                        <br />
                                        <Radio.Group value={this.state.shippingCheckboxValue} onChange={this.shippingCheckboxValueChange}>
                                            <Radio value="National">Domestic</Radio>
                                            <Radio value="International">International</Radio>
                                            <Radio value="Pickup">Pickup Only (Locally)</Radio>
                                        </Radio.Group>

                                    </div>
                                }
                                <br />

                                {(this.state.shippingCheckboxValue === 'National' || this.state.shippingCheckboxValue === 'International') &&
                                    <ReactSelect placeholder="Select Shipping Profile" options={this.props.shippings} onChange={(val) => {
                                        this.setState({
                                            shippingID: val.value
                                        })
                                    }} />}
                                {this.props.isPRO && <div style={{ marginTop: 20, marginBottom: 20, width: 150 }}>
                                    <input accept="video/mp4,video/x-m4v,video/*" type="file" id="file" style={{ display: "none" }} onChange={e => {
                                        console.log(e.target.files[0])
                                        this.setState({
                                            filename: e.target.files[0].name,
                                            videoFile: e.target.files[0]
                                        })
                                        var reader = new FileReader();
                                        reader.onload = (res) => {
                                            const media = new Audio(reader.result);
                                            media.onloadedmetadata = () => {
                                                console.log(media.duration); // this would give duration of the video/audio file
                                                let duration = media.duration
                                                if (duration > 30 || duration === 'Infinity') {
                                                    alert('Video can not be greater than 30 seconds')
                                                    this.setState({
                                                        filename: "",
                                                        videoFile: null
                                                    })
                                                }
                                            };
                                        };
                                        reader.readAsDataURL(e.target.files[0]);
                                    }} />
                                    <br />
                                    <label style={{ backgroundColor: "#8b0000", color: 'white', padding: 15 }} for="file"><Icon type="upload" /> Choose a Video</label>
                                    {this.state.filename !== '' && <span style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>{this.state.filename}</span>}
                                </div>}
                                <br />
                                <h4>Add Pictures</h4>
                                <Upload
                                    listType="picture-card"
                                    multiple
                                    accept='image/*'
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                                <h3> Would you like to contribute to the <Link to='sponsorship'>Project Fund</Link>, by contributing a small percentage of your sales? <Tooltip title='You may sponsor our projects by paying a small percentage of your sell'>
                                    <Icon type="info-circle" theme='outlined' style={{ fontSize: this.state.windowWidth <= 576 ? '12px' : '16px' }} />
                                </Tooltip></h3>
                                <Radio.Group value={this.state.sponsor} onChange={e => this.setState({ sponsor: e.target.value })}>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                                {this.state.sponsor === "Yes" && <div>
                                    Percentage:
                                    <input
                                        type='number'
                                        min={1}
                                        step={1}
                                        value={this.state.sponsorRate}
                                        onChange={(e) => {
                                            this.setState({
                                                sponsorRate: e.target.value
                                            })
                                        }}
                                        max={70}
                                        style={{ width: "30%" }}
                                        defaultValue={1}
                                    /> %
                                </div>}

                                <br />
                                <br />
                                {this.props.isPRO === true &&
                                    <h3>Would you like to replicate this listing on My Consignment?</h3>}
                                {this.props.isPRO === true && <Radio.Group value={this.state.replicate} onChange={e => this.setState({ replicate: e.target.value })}>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>}
                                <br />
                                <br />
                                <Button loading={this.state.uploading} onClick={this.saveDraft} type='primary' size='small'>Save as draft</Button>
                                <Button loading={this.state.uploading} onClick={this.handleSubmit} style={{ backgroundColor: "darkgreen", color: 'white', width: '150px', marginLeft: 20 }} size="large" shape='round'>Add Listing</Button>

                            </Form>
                            : null
                    }

                </Drawer>

                <LogInModal
                    visible={this.state.isLoginModal}
                    handleLogInModalCancel={this.handleLogInModalCancel}
                    handleSignUpModal={this.handleSignUpModal}
                    setUID={this.props.setUID}
                    setUserInfo={this.props.setUserInfo}
                    cancel={() => this.setState({ isLoginModal: !this.state.isLoginModal })}
                />
                <SignUpModal
                    visible={this.state.isSignUpModal}
                    handleSignUpModalCancel={this.handleSignUpModalCancel}
                    handleLoginModal={this.handleLogIn}
                    addonAfter={this.state.addonAfter}
                    handleAddonStatus={this.handleAddonStatus}
                    setUID={this.props.setUID}
                    setUserInfo={this.props.setUserInfo}
                    cancel={() => this.setState({ isSignUpModal: !this.state.isSignUpModal })}
                />
                <Modal onOk={() => {
                    let value = this.state.draftValue
                    let selected = this.state.drafts.filter(draft => draft._id === value)
                    if (selected.length > 0) {
                        let data = {
                            ...selected[0]
                        }
                        data.isShowForm = true
                        data.showDraftModal = false
                        data.saved = true
                        data.id = value
                        console.log('draft => ', data)
                        this.setState({
                            ...data
                        })
                    }
                }} visible={this.state.showDraftModal}
                    closable={true}
                    style={{ padding: 0 }}
                    onCancel={() => { this.setState({ showDraftModal: false }) }}
                    bodyStyle={{ padding: 0 }}
                >
                    <div style={{ width: '100%' }}>
                        <h2 style={{ textAlign: "center" }}>Select Draft</h2>
                        <div style={{ width: '100%', marginTop: 10, display: "flex", justifyContent: "center", flexDirection: 'row', marginBottom: 10 }}>
                            {this.state.drafts.length > 0 && <Radio.Group style={{ width: '90%' }} onChange={e => {
                                this.setState({
                                    draftValue: e.target.value
                                })
                            }} value={this.state.draftValue}>
                                {this.state.drafts.length > 0 && this.state.drafts.map(draft => {
                                    return <Radio style={radioStyle} value={draft._id}>
                                        {draft.title}
                                    </Radio>

                                })}
                            </Radio.Group>}
                            {this.state.drafts.length === 0 && <h3 style={{ textAlign: "center" }}>No saved drafts</h3>}
                            <br />
                            <br />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

class LogInModal extends React.Component {
    constructor(props) {
        super(props)
        this.initialState = {
            email: "",
            password: ""
        }
        this.state = {
            ...this.initialState
        }
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
        this.handleGoogleSignup = this.handleGoogleSignup.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleLogInModalCancel = () => {
        this.props.handleLogInModalCancel(false)
    }
    handleSignUpModal = () => {
        this.props.handleSignUpModal(true);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleGoogleSignup() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
        provider.addScope('https://www.googleapis.com/auth/userinfo.email')
        firebase.auth().signInWithPopup(provider).then((result) => {
            // The signed-in user info.
            var user = result.user;
            console.log('user', user)
            fetch(url + '/api/checkgoogle', { method: "POST", body: JSON.stringify(user), headers: { "Content-Type": "application/json" } })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Success') {
                        localStorage.setItem('userData', JSON.stringify(data.doc))
                        console.log(data.doc)
                        this.props.setUserInfo(data.doc)
                        this.props.setUID(data.doc.firebaseUID)
                        // this.props.navigation.navigate('HomeScreen')
                        this.handleLogInModalCancel()
                    }
                })
        }).catch(err => console.log(err))
    }
    handleFacebookLogin() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            console.log('firebase => ', result)
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var user = result.user;
            let data = {
                firebaseUID: user.uid,
                isLoggedIn: true,
                profilePic: user.photoURL,
                fName: user.displayName,
                email: user.email
            }
            console.log('after firebase => ', data)
            fetch(url + '/api/fbLogin', { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
                .then(res => res.json()).then(data => {
                    this.setState({ loading: false })
                    if (data.error)
                        alert(data.message)
                    else {
                        this.setState({ loading: false })
                        localStorage.setItem('userData', JSON.stringify(data.doc))
                        this.props.setUserInfo(data.doc)
                        this.props.setUID(data.doc.firebaseUID)
                        this.setState({
                            loading: false
                        })
                        this.handleLogInModalCancel()
                        // this.props.navigation.navigate('HomeScreen')
                    }
                }).catch(err => console.log(err))
            // ...
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
            // ...
        });
    }
    handleSubmit() {
        let { email, password } = this.state
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            console.log(result)

            let userData = {
                firebaseUID: result.user.uid
            }
            fetch(url + '/api/login', { method: "PUT", body: JSON.stringify(userData), headers: { "Content-Type": "application/json" } }).then(res => res.json()).then(data => {
                this.setState({ loading: false })
                if (data.error)
                    alert(data.message)
                else {
                    this.setState({ loading: false })
                    console.log(data.user)
                    localStorage.setItem('userData', JSON.stringify(data.user))
                    this.props.setUserInfo(data.user)
                    this.props.setUID(data.user.firebaseUID)
                    this.props.handleLogInModalCancel(false)
                    //   this.props.navigation.navigate('HomeScreen')
                }
            }).catch(err => console.log(err))
        }).catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
        });
    }
    render() {

        return (
            <Modal
                closable={true}
                visible={this.props.visible}
                footer={null}
                style={{ padding: 0 }}
                onCancel={this.props.cancel}
                bodyStyle={{ padding: 0 }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', marginTop: '20px' }}>
                    <br />
                    <br />
                    <br />
                    <div style={{ maxWidth: "100%" }}>
                        <img
                            style={{ width: 200, marginTop: 30 }}
                            alt='logo not found'
                            src={Logo}
                        />
                    </div>
                    <Divider><p style={{ color: '#a2a2a2', fontSize: '18px' }}>Quick Connect With</p></Divider>
                    <Button onClick={this.handleFacebookLogin} shape="round" style={{ width: '80%', height: '40px', marginBottom: '10px', backgroundColor: '#4162a7', color: 'white', fontSize: '18px' }}>Continue With Facebook</Button>
                    <Button onClick={this.handleGoogleSignup} shape="round" style={{ width: '80%', height: '40px', backgroundColor: '#D84B37', color: 'white', fontSize: '18px' }}>Continue With Gmail</Button>
                    <Divider><p style={{ color: '#a2a2a2', fontSize: '18px' }}>Login Using Email</p></Divider>
                    <Form>
                        <Input onChange={this.handleChange} name='email' style={{ height: '40px', marginBottom: '10px' }} placeholder="Email" prefix={<Icon type="mail" style={{ color: 'gray', fontSize: '15px' }} />} />
                        <Input.Password onChange={this.handleChange} name='password' style={{ height: '40px', marginBottom: '10px' }} placeholder="Password" prefix={<Icon type="lock" style={{ color: 'gray', fontSize: '15px' }} />} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Button onClick={this.handleSubmit} shape="round" style={{ backgroundColor: 'darkgreen', color: 'white', height: '40px', width: '150px', fontSize: '18px' }}>Login</Button>
                        </div>
                    </Form>
                    <Divider><p style={{ color: '#a2a2a2', fontSize: '18px' }}>OR</p></Divider>
                    <p style={{ color: 'blue', fontSize: '15px' }} onClick={this.handleSignUpModal}>Create a new account</p>
                </div>
            </Modal>
        )
    }
}


class SignUpModal extends React.Component {
    constructor(props) {
        super(props)
        this.initialState = {
            username: "",
            password: "",
            confirm: "",
            email: "",
            country: "",
            passwordAddon: "",
            confirmAddon: "",
            fName: ""
        }
        this.state = {
            ...this.initialState
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSignUpModalCancel = () => {
        this.props.handleSignUpModalCancel(false)
    }
    handleLoginModal = () => {
        this.props.handleLoginModal(true)
    }
    checkUsername = (event) => {
        let val = event.target.value
        if (val.length < 4) {
            alert("Username must be longer than 3 characters")
        }
        else {
            fetch(url + '/api/checkUsername' + val).then(res => res.json()).then(response => {
                if (response.doc === null) {
                    this.props.handleAddonStatus(false)

                } else {
                    this.props.handleAddonStatus(true)
                }
            }).catch(err => alert(err))
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handlePassword(e) {
        if (e.target.name === 'password') {
            if (e.target.value.length < 6) {
                this.setState({
                    passwordAddon: "Weak password"
                })
            }
            else {
                this.setState({
                    passwordAddon: ""
                })
            }
        }
        else if (e.target.name === 'confirm') {
            if (this.state.password !== this.state.confirm) {
                this.setState({
                    passwordAddon: "Passwords do not match",
                    confirmAddon: "Passwords do not match"
                })
            }
            else {
                this.setState({
                    passwordAddon: "",
                    confirmAddon: ""
                })
            }
        }
    }
    handleSubmit() {
        if (this.state.password === this.state.confirm) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
                let userData = {
                    fName: this.state.fName,
                    email: this.state.email,
                    firebaseUID: user.user.uid,
                    country: this.state.country,
                    username: this.state.username
                }
                fetch(url + '/api/addUser', { method: "POST", body: JSON.stringify(userData), headers: { "Content-Type": "application/json" } }).then(res => res.json()).then(data => {
                    this.setState({ loading: false })
                    if (data.error)
                        alert(data.message)
                    else {
                        this.setState({ loading: false })
                        this.props.setUserInfo(data.user)
                        this.props.setUID(data.user.firebaseUID)
                        localStorage.setItem('userData', JSON.stringify(data.user))
                        this.setState({ ...this.initialState })
                        this.handleSignUpModalCancel()
                    }
                }).catch(err => console.log(err))
            }).catch(err => {
                console.log(err)
                this.setState({ loading: false });
                alert(err.message)
            })
        } else {
            alert("Passowrds do not match")
        }
    }
    render() {
        return (
            <Modal
                visible={this.props.visible}
                closable={false}
                footer={null}
                style={{ padding: 0 }}
                onCancel={this.props.cancel}
                bodyStyle={{ padding: 0 }}
            >
                <div style={{ display: 'flex', width: '100%', padding: '15px', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "lightgray", margin: 0 }}>
                    <h1>Sign Up</h1>
                    <FontAwesomeIcon icon={faTimes} size="1x" onClick={this.handleSignUpModalCancel} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', marginTop: '20px' }}>
                    <Form>
                        <Input name='fName' onChange={this.handleChange} style={{ height: '40px', marginBottom: '10px' }} placeholder="Full Name" prefix={<Icon type="user" style={{ color: 'gray', fontSize: '15px' }} />} />
                        <Input addonAfter={this.props.addonAfter} suffix={
                            <Tooltip title={this.props.addonAfter}>
                                <Icon type="close" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        } name='username' onChange={this.handleChange} onBlur={this.checkUsername} style={{ height: '40px', marginBottom: '10px' }} placeholder="User Name...." prefix={<Icon type="user" style={{ color: 'gray', fontSize: '15px' }} />} />
                        <Input onChange={this.handleChange} name='email' style={{ height: '40px', marginBottom: '10px' }} placeholder="Email" prefix={<Icon type="mail" style={{ color: 'gray', fontSize: '15px' }} />} />
                        <Input.Password addonAfter={this.state.passwordAddon} onBlur={this.handlePassword} onChange={this.handleChange} name='password' style={{ height: '40px', marginBottom: '10px' }} placeholder="Password...." prefix={<Icon type="lock" style={{ color: 'gray', fontSize: '15px' }} />} />
                        <Input.Password addonAfter={this.state.confirmAddon} onBlur={this.handlePassword} onChange={this.handleChange} name='confirm' style={{ height: '40px', marginBottom: '10px' }} placeholder="Confirm Password...." prefix={<Icon type="lock" style={{ color: 'gray', fontSize: '15px' }} />} />
                        <Select name='country' onChange={(val) => {
                            this.setState({
                                country: val
                            })
                        }} showSearch style={{ marginBottom: '10px' }} placeholder="Select a Country" size="large"  >
                        {
                            countries.map(country=>{
                                return <Select.Option key={country.code} value={country.name} >{country.name}</Select.Option>
                            })
                        }
                        </Select>
                    <br/>
                        <div style={{ display:'flex',alignItems:'center', justifyContent:'center',flexDirection:"row"}}>
                        <Button onClick={this.handleSubmit} shape="round" style={{ backgroundColor: 'darkcyan', color: 'white', height: '40px', width: '150px', fontSize: '18px' }}>Sign Up</Button>
                        </div>
                    </Form>
                    <br/>
                    <h3>By clicking on Signup, you agree to our <Link to='privacy-policy'>User agreement</Link> and <Link to='privacy-policy'>Privacy Policy</Link> </h3>
                    <br/>
                    <p className='lnk' style={{ color: 'blue', fontSize: '15px' }} onClick={this.handleLoginModal}>Do you already have an account?</p>

                </div>
            </Modal>
        )
    }
}
function mapStateToProps(state) {
    return ({
        UID: state.rootReducer.UID,
        userInfo: state.rootReducer.userInfo,
        categories: state.rootReducer.categories,
        listingCategories: state.rootReducer.listingCategories,
        paymentInfo: state.rootReducer.paymentInfo,
        isPRO: state.rootReducer.isPRO,
        shippings: state.rootReducer.shippings,
        currentLocation: state.rootReducer.currentLocation
    })
}
function mapActionsToProps(dispatch) {
    return ({
        setUID: (UID) => {
            dispatch(setUIDAction(UID))
        },
        setUserInfo: (info) => {
            dispatch(setUserInfoAction(info))
        },
        pushListing: (listing) => {
            dispatch(pushListingAction(listing))
        },
        setShippings: (shippings) => {
            dispatch(setShippingsAction(shippings))
        }
    })
}
export default connect(mapStateToProps, mapActionsToProps)(Navbar)