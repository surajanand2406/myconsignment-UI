
import React, { PureComponent } from "react";
import { Button, Form, Input, Select, Avatar, Drawer, Radio, Upload, Tooltip, message } from 'antd'
import { Icon } from '@ant-design/compatible';
import './CSS/LoginSignupCss.css';
import { url } from "../Constants";
import firebase from 'firebase'
import { countries } from './CustomMade/countries'
import Navbar from "./Navbar";

class SignUp extends PureComponent{
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

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
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
            <div className="loginSignup">
            <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-6" style={{ paddingTop: '150px' }}>
                            <h1 style={{ color: 'rgb(4, 131, 53)', fontSize: '30px' }}>Welcome to</h1>
                            <h1 style={{ color: '#fff', fontSize: '50px', paddingTop: '40px' }}>MyConsignment</h1>
                            <p style={{ color: '#fff', fontSize: '20px', paddingTop: '30px' }}>
                                some Welcoming quote here incididunt<br />
                                consectetur adipiscing elit
                            </p>
                        </div>
                        <div className="col-6">
                            <div className="login-page">
                                <div className="logowrap1">
                                    <img
                                        className="loginLogo1"
                                        src={`${require("../Components/View/imgs/logo.png")}`}
                                        alt='' />
                                </div>
                                <h5 style={{ textAlign: 'center', paddingTop: '10px' }}>Welcome! Please login to your account</h5>
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
                                        countries.map(country => {
                                            return <Select.Option key={country.code} value={country.name} >{country.name}</Select.Option>
                                        })
                                    }
                                </Select>
                                <br />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "row" }}>
                                    <Button onClick={this.handleSubmit} shape="round" style={{ backgroundColor: 'darkcyan', color: 'white', height: '40px', width: '150px', fontSize: '18px' }}>Sign Up</Button>
                                </div>
                            </Form>
                            <div className="fb">
                                <button type="button" className="btn btn-link fb">Facebook</button>
                                <h2>OR</h2>
                                <button type="button" className="btn btn-link fb">Google</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default SignUp;
