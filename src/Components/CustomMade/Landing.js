import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Button,Checkbox} from 'antd'
import './CSS/Landing.css'

export default class Landing extends Component {
    constructor(props){
        super(props)
        this.state={
            checked:false
        }
    }
    componentDidMount(){
        let data = localStorage.getItem('isChecked')
        if(data!==null){
            let checked = JSON.parse(data)
            if(checked===true){
                this.props.history.push('/custom-made-jobs')
            }
        }
    }
    render() {
        return (
            <div className="landing-container">
                    <div className="landing-body" >
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                            <div style={{width:'60%',textAlign:'center',justifyContent:'center'}}>
                                <h1>Designing Something Amazing Together</h1>
                            </div>
                            <div style={{width:'60%',textAlign:'center',justifyContent:'center'}}>
                                <p>
                                Your wish is our command. Within this area buyers are able to post requests for  their favorite Artisans and companies to make and buyers are able to search for Artisan products and services.
                                </p>
                            </div>
                           <Link to="/custom-made-jobs">
                               <Button onClick={()=>{
                                   localStorage.setItem('isChecked',JSON.stringify(this.state.checked))
                               }} className="btn" style={{backgroundColor:'darkcyan',color:'white',width:'250px',height:"55px",marginTop:'10px'}} size="large" shape="round">Let's Go</Button>
                           </Link>
                           <div style={{marginTop:10}}>
                           <Checkbox onChange={e=>{
                               this.setState({
                                   checked:e.target.checked
                               })
                           }} style={{fontSize:16,fontWeight:'bolder'}}>Do not show this page again</Checkbox>
                           </div>
                        </div>
                    </div>
            </div>
        )
    }
}
