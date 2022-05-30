// import React, { Component } from 'react'
// import Navbar from './Navbar'
// import Footer from './Footer'
// import privacyImage from './privacy_policy.jpg'
// import GoogleStore from './images/googlplaystore.png'
// import IphoneStore from './images/iphoneplaystore.png'
// import Logo from './my1.png'
// import './CSS/Privacy.css'

// import { Link } from 'react-router-dom'

// class About extends Component {
//     componentDidMount(){
//         window.scrollTo(0, 0)
//     }
//     render() {
//         return (
//             <div className="Privacy-Container">
//                 <Navbar />
//                 <h1 style={{textAlign:"center",color:"white",position:"absolute",marginLeft:"43%",marginTop:"10%",fontWeight:"bolder"}}>ABOUT US</h1>

//                 <div className="Privacy-Body-Container">
//                     <div style={{maxWidth:'100%',maxHeight:300,backgroundColor:'#8b0000',position:'flxed'}}>
//                         <img alt='privacy not found' src={privacyImage} style={{width:'100%',height:300,opacity:0.2}} />
//                     </div>
//                     <div className="Privacy-Body">
//                         <br/>
//                         <br/>
//                         <br/>
//                         <br/>
//                     <p><img src={Logo} width='100' alt='logo'/> is an International Artisan Community, based on our application (phase 1, complete) and website (phase 2, complete) You can download mobile app from:</p>
//                     <div style={{maxWidth:'95%',display:'flex',alignItems:'center',justifyContent:'center'}}>

// <img style={{ marginRight: '10px',width:'20%' }} onClick={()=>{
//     window.open('https://play.google.com/store/apps/details?id=com.pureartisan','_blank')
// }} alt='should add art' src={GoogleStore} />
// <img style={{ width:'20%' }} onClick={()=>{
//     window.open('https://apps.apple.com/us/app/pure-artisan/id1474002500','_blank')
// }} src={IphoneStore} alt='should add art'/>
// </div>
//                     <h1><i>Our Goal</i></h1>
//                     <p>Our goal is to seamlessly unite Artisans and their supporters worldwide with the quickest and most efficient ways possible and to take the difficulty of the business aspect away from the Artist. </p>
//                     <br/>
//                     <p>With the click of a button an Artist has the ability to submit their goods to the worldwide marketplace: via listings, auctions, and live auctioning as well as find <Link to='exclusive-services'>Exclusive Services</Link> to enhance their business.</p>
//                     <h1><i>The Bazaars ( Phase 3, <small>in process..</small>)</i></h1>
//                     <p>Our long term vision through <Link to='sponsorship'>Sponsorship</Link>  and Our Project Fund is to create a physical self sustaining bazaar, where Artisans worldwide may apply to have their products and services physically sold and promoted.
// These bazaars will be shared with venders from our sister application and website (My Consignment, hyperlink to website and logo font), which provides similar services to the Worldwide Community of Buyers and Sellers.
//                    <br/>
//                    <br/>
//                     <h1><i>Also available</i></h1>
//                     <h2 style={{textAlign:"center"}}><p>My Consignment Mobile App</p></h2>
//                     <div style={{maxWidth:'95%',display:'flex',alignItems:'center',justifyContent:'center'}}>

//                             <img style={{ marginRight: '10px',width:'20%' }} onClick={()=>{
//                                 window.open('https://play.google.com/store/apps/details?id=com.pureartisan','_blank')
//                             }} alt='should add art' src={GoogleStore} />
//                             <img style={{ width:'20%' }} onClick={()=>{
//                                 window.open('https://apps.apple.com/us/app/pure-artisan/id1474002500','_blank')
//                             }} src={IphoneStore} alt='should add art'/>
//                         </div>
//                     <p>The bazaars will range from pre-existing houses, shops, and hotels, which will be renovated to house traveling Artisans and their supporters.</p>
//                     <h1><i>Wholesale (coming soon)</i> </h1>
//                    <h1><i>Fee Structure</i></h1>
//                    <p>Basic version of applications and websites are free to use with the commission structure of 0.10 cents administration fee and 10% of commission fee for listings that sell, if an item does not sell the vender pays nothing..



// We make money only when you make money. 



// Pro subscriptions are $4.95 a year and include: advanced listing features, live auctioning, importing inventory in bulk via csv and xls files and from sites such as ebay, etsy, and so much more.</p>
                    
// </p>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         )
//     }
// }



// export default About;

import React, { Component } from 'react'
import Navbar from './Navbar'
import GoogleStore from './images/googlplaystore.png'
import IphoneStore from './images/iphoneplaystore.png'
import Logo from './my1.png'
import './CSS/Privacy.css'
import Background from './coverr.jpg'
import ring from './ring.jpg'
import grow from './grow.jpg'
import artist from './artist.jpg'
import { Link } from 'react-router-dom'
import './CSS/bootstrap.css'
import './about/css/util.css'
import './about/css/main.css'
import Footer from './Footer'
class About extends Component {
    componentDidMount(){
        window.scrollTo(0,0)
    }
    render() {
        return (
            <div classNameName="Privacy-Container">
                <Navbar />
                

	<section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: "url(" + Background + ")"}}>
		<h2 className="ltext-105 cl0 txt-center">
			About Us
		</h2>
	</section>	



	<section className="bg0 p-t-75 p-b-120">
		<div className="container">
			<div className="row p-b-148">
				<div className="col-md-7 col-lg-8">
					<div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
						<h3 className="mtext-111 cl2 p-b-16">
							My Consignment
						</h3>

						<p className="stext-113 cl6 p-b-26">
                        <p><img src={Logo} width='100' alt='logo'/> is an International Consignment Community, based on our application (phase 1, complete) and website (phase 2, complete) You can download mobile app from:</p>
                     <div style={{maxWidth:'95%',display:'flex',alignItems:'center',justifyContent:'center'}}>

<img style={{ marginRight: '10px',width:'20%' }} onClick={()=>{
    window.open('https://play.google.com/store/apps/details?id=com.myconsignment','_blank')
}} alt='should add art' src={GoogleStore} />
<img style={{ width:'20%' }} onClick={()=>{
    window.open('https://apps.apple.com/us/app/pure-artisan/id1474002500','_blank')
}} src={IphoneStore} alt='should add art'/>
</div>
						</p>

					</div>
				</div>

				<div className="col-11 col-md-5 col-lg-4 m-lr-auto">
					<div className="how-bor1 ">
						<div className="hov-img0">
							<img src={ring} alt="IMG"/>
						</div>
					</div>
				</div>
			</div>
			
			<div className="row">
				<div className="order-md-2 col-md-7 col-lg-8 p-b-30">
					<div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
						<h3 className="mtext-111 cl2 p-b-16">
							Our Mission
						</h3>

						<p className="stext-113 cl6 p-b-26">
                        <p>Our goal is to seamlessly unite Buyers and Sellers and their supporters worldwide with the quickest and most efficient ways possible and to take the difficulty of the business aspect away from the seller. </p>

                     <br/>
                     <p>With the click of a button a vender has the ability to submit their goods to the worldwide marketplace: via listings, auctions, and live auctioning as well as find <Link to='exclusive-services'>Exclusive Services</Link> to enhance their business.</p>
                     <h1><i>The Bazaars ( Phase 3, <small>in process..</small>)</i></h1>
                     <p>Our long term vision through <Link to='sponsorship'>Sponsorship</Link>  and Our Project Fund is to create a physical self sustaining bazaar, where Artisans worldwide may apply to have their products and services physically sold and promoted.
 These bazaars will be shared with venders from our sister application and website (My Consignment, hyperlink to website and logo font), which provides similar services to the Worldwide Community of Buyers and Sellers.
                   </p>
                    <br/>
                    <p>The bazaars will range from pre-existing houses, shops, and hotels, which will be renovated to house traveling Artisans and their supporters.</p>
						</p>

						<div className="bor16 p-l-29 p-b-9 m-t-22">
							<p className="stext-114 cl6 p-r-40 p-b-11">
								Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.
							</p>

							<span className="stext-111 cl8">
								- Steve Job’s 
							</span>
						</div>
					</div>
				</div>

				<div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
					<div className="how-bor2">
						<div className="hov-img0">
							<img src={artist} alt="IMG"/>
						</div>
					</div>
				</div>
			</div>
            <br/>
            <h1 style={{textAlign:"center"}}>Wholesale (coming soon)</h1>
		<br/>
		<br/>
	<div className="row p-b-148">
				<div className="col-md-7 col-lg-8">
					<div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
						<h3 className="mtext-111 cl2 p-b-16">
							Fee Structure
						</h3>

						<p className="stext-113 cl6 p-b-26">
                        Basic version of applications and websites are free to use with the commission structure of 0.10 cents administration fee and 10% of commission fee for listings that sell, if an item does not sell the vender pays nothing..

 We make money only when you make money. 

 Pro subscriptions are $4.95 a year and include: advanced listing features, live auctioning, importing inventory in bulk via csv and xls files and from sites such as ebay, etsy, and so much more.
						</p>

					</div>
				</div>

				<div className="col-11 col-md-5 col-lg-4 m-lr-auto">
					<div className="how-bor1 ">
						<div className="hov-img0">
							<img src={grow} alt="IMG"/>
						</div>
					</div>
				</div>
			</div>
        </div>
	</section>	
	<div className="btn-back-to-top" id="myBtn">
		<span className="symbol-btn-back-to-top">
			<i className="zmdi zmdi-chevron-up"></i>
		</span>
	</div>
	<Footer/>
            </div>
        )
    }
}



export default About;
