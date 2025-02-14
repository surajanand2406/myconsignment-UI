import React, { Component } from 'react'
import { Select, Divider } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import './CSS/Footer.css'
import Artisan from './footerImage.png'
import { Link } from 'react-router-dom';
import Logo from './my1.png'
const width = window.screen.width
export default class Footer extends Component {
    render() {
        return (
            <div class="div14">
                <div className="row" style={{ paddingTop: '20px' }}>
                    <div className="container col-3">
                        <img className="myImagen"
                            src={Logo}
                            alt='logo not found'
                            style={{ color: 'white', width: 250, height: 200, filter: 'white' }}
                        />
                        <h3>Follow us on...</h3>
                        <div>
                            <FontAwesomeIcon onClick={() => {
                                window.open('https://web.facebook.com/myconsignmentnyc/', '_blank')
                            }} style={{ marginRight: '20px' }} icon={faFacebookF} size="2x" color="blue" />
                            <FontAwesomeIcon onClick={() => {
                                window.open('https://www.instagram.com/pureartisan2019/', '_blank')
                            }} style={{ marginRight: '20px' }} icon={faInstagram} size="2x" color="red" />
                            {/* <FontAwesomeIcon icon={faTwitter} size="2x" color="white" /> */}
                        </div>
                    </div>
                    <div className="col-2">
                        <h2>About Us</h2>
                        <ul>
                            <li>Our Community</li>
                        </ul>
                    </div>
                    <div className="col-2">
                        <h2>Quick link</h2>
                        <ul>
                            <li>Live Auctions</li>
                            <li>Custom Made</li>
                            <li>Exclusive Service</li>
                            <li>Sponsorship</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className="col-2">
                        <h2>Apps</h2>
                        <ul>
                            <li>Pure Artisan</li>
                            <li>The Trading Post</li>
                        </ul>
                    </div>
                    <div className="col-2">
                        <h2>Support</h2>
                        <ul>
                            <li>Help</li>
                            <li>FAQs</li>
                            <li>Privacy Policy</li>
                            <li>Term of Service</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            // <div className="footer-container">
            //             <img
            //                 className="myImagen"
            //                 src={Artisan}
            //                 alt='logo not found'
            //                 style={{color:'white',width:250,height:100,filter:'white'}}
            //             />
            //     <div className="footer-body" >
            //     <div className="apps" >
            //             <h2 style={{color:"white",fontWeight:'bold'}}>About Us</h2>
            //             <div style={{listStyle:'none'}}>
            //             <Link to="/aboutus"><li style={{color:'white'}} className="l2 lnks">Who we are</li></Link>

            //             </div>
            //         </div>
            //         <div className="apps" >
            //             <h2 style={{color:"white",fontWeight:'bold'}}>Apps</h2>
            //             <div style={{listStyle:'none'}}>
            //                 <h4 className='lnks' onClick={()=>{
            //                 window.open('https://pureartisan.co/','_blank')
            //                 }}>Pure Artisan</h4>
            //             </div>
            //         </div>
            //         <div className="apps" >
            //             <h2 style={{color:"white",fontWeight:'bold'}}>Quick Links</h2>
            //             <div style={{listStyle:'none'}}>
            //             <Link to='/auction'><li style={{color:'white'}} className="l1 lnks">Live Auctions</li></Link>
            //             <Link to="/custom-made"><li style={{color:'white'}} className="l2 lnks">Custom Made</li></Link>
            //             <Link to="/exclusive-services"><li style={{color:'white'}} className="l2 lnks">Exclusive Services</li></Link>
            //         <Link style={{  fontSize: '14px', color: 'white' }} to="/sponsor" className='lnks'>Sponsorship</Link>

            //             </div>
            //         </div>
            //         <div className="support">  
            //             <h2 style={{color:"white",fontWeight:'bold'}}>Support</h2>
            //             <div style={{listStyle:'none'}}>
            //                 <Link to="/help-center" ><h4 className='lnks'>Help</h4></Link>
            //                 <Link to="/blog"><h4 className='lnks'>Blog</h4></Link>
            //                 <Link to="/privacy-policy"><h4 className='lnks'>Privacy Policy</h4></Link>
            //                 <Link to="/terms-of-services"><h4 className='lnks'>Terms of Services</h4></Link>
            //             </div>
            //         </div>
            //         <div className="languages">
            //             <h2 style={{color:"white",fontWeight:'bold'}}>Select Language</h2>
            //             <div style={{listStyle:'none'}}>
            //                 <Select onChange={e=>{
            //                     if(e==='Spanish'){
            //                         window.location.href='https://miconsignacion.com/'
            //                     }
            //                 }} defaultValue="English" dropdownStyle={{fontWeight:'bold'}} style={{width:'250px',backgroundColor:'#8b0000',fontWeight:'bold'}} size="large">
            //                     <Select.Option value="English">English</Select.Option>
            //                     <Select.Option value="Spanish">Spanish</Select.Option>
            //                 </Select>
            //             </div>
            //         </div>
            //     </div>
            //     <Divider style={{margin:0,marginTop:20}}></Divider>
            //     <div className="footer-social">
            //         <p style={{color:'white'}}>@Copyright <b>My Consignment 2019-2020</b></p>
            //         <div className="icons">
            //             <FontAwesomeIcon onClick={()=>{
            //                 window.open('https://web.facebook.com/myconsignmentnyc/','_blank')
            //             }} style={{marginRight:'20px'}} icon={faFacebookF} size="2x" color="white" />
            //             <FontAwesomeIcon onClick={()=>{
            //                 window.open('https://www.instagram.com/pureartisan2019/','_blank')
            //             }}  style={{marginRight:'20px'}} icon={faInstagram} size="2x" color="white" />
            //             {/* <FontAwesomeIcon icon={faTwitter} size="2x" color="white" /> */}
            //         </div>
            //     </div>
            // </div>
        )
    }
}
