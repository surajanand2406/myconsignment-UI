import React, { Component } from 'react'
import { connect } from 'react-redux'
import './CSS/SellerSideBar.css'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import Truncate from 'react-truncate'
import { ReadExclusiveUserData } from '../../../store/actions/ExclusiveUserAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faPlusSquare, faList, faNetworkWired, faMoneyBill, faUserCog } from '@fortawesome/free-solid-svg-icons'


class SellerSideBar extends Component {

    componentDidMount() {

        this.props.readUserData();
    }

    render() {

        const userData = {
            Name: '',
            Email: '',
            Image: ''
        }

        this.props.userData.map(user => {
            if (user._id === this.props.Id) {
                userData.Name = user.BusinessName;
                userData.Email = user.Email;
                userData.Image = user.Image;
            }
        })

        return (
            <div className="Seller-sidebar-container">
                <div className="Seller-sidebar-Body-container">
                    <div className="Seller-sidebar-Body" >
                        <div className="Seller-sidebar-Body-Header" >
                            <div style={{ width: '40%' }}>
                                <Avatar size={80} src={userData.Image} />
                            </div>
                            <div style={{ width: '60%' }}>
                                <h3 style={{ margin: 0, fontWeight: 'bold' }}>{userData.Name}</h3>
                                <Truncate>{userData.Email}</Truncate>
                            </div>
                        </div>
                        <div className="Seller-sidebar-Body-Menues">
                            <Link to={`/exclusive-services/${this.props.Id}/seller-dashboard`} >
                                <div className="Menu">
                                    <div className="menu-icon"><FontAwesomeIcon size="md" icon={faTachometerAlt} /></div>
                                    <div className="menu-text">Dashboard</div>
                                </div>
                            </Link>
                            <Link to={`/exclusive-services/${this.props.Id}/seller-add-services`}>
                                <div className="Menu">
                                    <div className="menu-icon"><FontAwesomeIcon size="md" icon={faPlusSquare} /></div>
                                    <div className="menu-text">Add Service</div>
                                </div>
                            </Link>
                            <Link to={`/exclusive-services/${this.props.Id}/seller-my-services`}>
                                <div className="Menu">
                                    <div className="menu-icon"><FontAwesomeIcon size="md" icon={faList} /></div>
                                    <div className="menu-text">My Services</div>
                                </div>
                            </Link>
                            <Link to={`/exclusive-services/${this.props.Id}/seller-my-jobs`}>
                                <div className="Menu">
                                    <div className="menu-icon"><FontAwesomeIcon size="md" icon={faNetworkWired} /></div>
                                    <div className="menu-text" style={{marginLeft:"20"}}>My Jobs</div>
                                </div>
                            </Link>
                            <Link to={`/exclusive-services/${this.props.Id}/seller-my-earnings`}>
                                <div className="Menu">
                                    <div className="menu-icon"><FontAwesomeIcon size="md" icon={faMoneyBill} /></div>
                                    <div className="menu-text">My Earnings</div>
                                </div>
                            </Link>
                            <Link to={`/exclusive-services/${this.props.Id}/seller-my-profile`}>
                                <div className="Menu">
                                    <div className="menu-icon"><FontAwesomeIcon size="md" icon={faUserCog} /></div>
                                    <div className="menu-text">{"  "}Profile Setting</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.ExclusiveUserReducer.ExclusiveUserData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readUserData: () => { dispatch(ReadExclusiveUserData()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerSideBar);
