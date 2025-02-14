import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import Navbar from './Navbar'
import SubNavbar from './SubNavbar'
import Footer from './Footer'
import Listing from './Listing';
import { Icon as Iconn } from '@ant-design/compatible';
import { Button, Menu, Dropdown, Divider, Card, List, Modal, Skeleton, Avatar, Input, Tooltip, Slider, Rate, message, Carousel } from 'antd'
import './CSS/Home.css'
import image1 from './images/mobile1.jpg'
import image2 from './images/image.jpg'
import image3 from './images/image1.jpg'
import image4 from './images/Nature.jpeg'
import image5 from './images/newimage.jpg'
import { url, headers } from '../Constants';
import GoogleStore from './images/googlplaystore.png'
import Reg from './images/Register.png'
import raw from './images/raw.png'
import Signin from './images/Signin.png'
import Handmadecover from './handmadecover.jpg'

import livecover from './bidding.jpg'
import servicescover from './servicescover.png'
import StripeCheckout from 'react-stripe-checkout';
import PaypalBtn from 'react-paypal-checkout';

import login from './images/Login.png'
import IphoneStore from './images/iphoneplaystore.png'
import { ReadExclusiveServices } from '../store/actions/ExclusiveServicesAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Facebook, Tumblr, Twitter, Linkedin, Pinterest, Reddit, Xing, Mail } from 'react-social-sharing';
import Buy from './buy.png'
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import { connect } from 'react-redux';
// import PaypalBtn from 'react-paypal-checkout';
import Map from './Maps'
import { setCategoriesAction, setListingsCategoriesAction, addtListingsAction, renderItemAction, setSubCategoriesAction, setLocationAction, favoriteItemAction, setUIDAction, setFavoriteAction } from "../store/actions/actions";
// import ScrollMenu from 'react-horizontal-scrolling-menu';

import Icon from 'react-web-vector-icons';
import {
  faCaretDown,
  faEye
} from '@fortawesome/free-solid-svg-icons'


import "./styles.css";

const carouselSetting = {
  autoplay: true,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  rtl: true

};

const carouselSettings = {
  arrows: true,
  infinite: true,
  slidesToShow: 3,
  autoplay: true,

};
const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
  rows: 2,
  slidesPerRow: 2
};

const contentStyle = {
  height: '490px',
  width:'880px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  padding: '50px'

};

const contentStyle2 = {
  height: '250px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  padding: '50px'
};

const imageStyle = {
  height: '500px',

}

const imageStyle2 = {
  height: '200px',
  paddingLeft: '20px'

}
const googleMapsApiKey = "AIzaSyBl2oJaWVIAGrzYmMPeHSm0IQnwVm0WXMU";

const modalMapStyles = [
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#e0efef"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        hue: "#1900ff"
      },
      {
        color: "#c0e8e8"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        lightness: 100
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on"
      },
      {
        lightness: 700
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#7dcdcd"
      }
    ]
  }
];
const width = window.screen.width;
class Home extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      windowWidth: width,
      searchBarOpacity: 0,
      isLocationModalvisible: false,
      fakeData: [
        { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1, price: "120" },
        { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1, price: "120" },
        { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1, price: "120" },
        { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1, price: "120" },
        { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1, price: "120" },
        { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1, price: "120" },
        { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1, price: "120" },
        { Title: 'abc', Description: 'sdsdasdfsdfsdfsda', image: image1, price: "120" }],

      customeMadeData: [
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": true,
          "shippingInternational": true,
          "imageLinks": [
            "https://placehold.co/500x400/ff0000/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing7077103",
          "isPRO": true,
          "_id": "612cad60a7534213e25e5aab",
          "title": "ultrices phasellus id sapien in",
          "description": "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
          "price": 7463,
          "Category": "Art",
          "subCategory": "Sculpture",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5aac",
            "coordinates": [
              67.52387879092444,
              24.995434941366632
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "61263e89b7cfb6391d6e0e97",
          "__v": 0
        },
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": false,
          "shippingInternational": true,
          "imageLinks": [
            "https://placehold.co/800x600/1100ff/FFFFFF.webp",
            "https://placehold.co/600x400/000000/FFFFFF.webp",
            "https://placehold.co/800x400/00ff00/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing5300799",
          "isPRO": true,
          "_id": "612cad60a7534213e25e5aad",
          "title": "ipsum primis in",
          "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
          "price": 546,
          "Category": "Art",
          "subCategory": "Reproduction",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5aae",
            "coordinates": [
              67.8438659418378,
              25.801578261819138
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "612349b5600f6c6800fcde03",
          "__v": 0
        },
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": false,
          "shippingInternational": true,
          "imageLinks": [
            "https://placehold.co/500x400/ff0000/FFFFFF.webp",
            "https://placehold.co/600x600/0011ff/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing8191773",
          "isPRO": true,
          "_id": "612cad60a7534213e25e5aaf",
          "title": "dis parturient montes nascetur ridiculus",
          "description": "Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.",
          "price": 3836,
          "Category": "Art",
          "subCategory": "Mixed Media",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5ab0",
            "coordinates": [
              67.9716975584846,
              25.502621822612547
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "61267e0bc647a54f7bdf7761",
          "__v": 0
        }],
      upComingAuction: [
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": true,
          "shippingInternational": true,
          "imageLinks": [
            "https://placehold.co/500x400/ff0000/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing7077103",
          "isPRO": true,
          "_id": "612cad60a7534213e25e5aab",
          "title": "ultrices phasellus id sapien in",
          "description": "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
          "price": 7463,
          "Category": "Art",
          "subCategory": "Sculpture",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5aac",
            "coordinates": [
              67.52387879092444,
              24.995434941366632
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "61263e89b7cfb6391d6e0e97",
          "__v": 0
        },
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": false,
          "shippingInternational": true,
          "imageLinks": [
            "https://placehold.co/800x600/1100ff/FFFFFF.webp",
            "https://placehold.co/600x400/000000/FFFFFF.webp",
            "https://placehold.co/800x400/00ff00/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing5300799",
          "isPRO": true,
          "_id": "612cad60a7534213e25e5aad",
          "title": "ipsum primis in",
          "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
          "price": 546,
          "Category": "Art",
          "subCategory": "Reproduction",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5aae",
            "coordinates": [
              67.8438659418378,
              25.801578261819138
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "612349b5600f6c6800fcde03",
          "__v": 0
        },
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": false,
          "shippingInternational": true,
          "imageLinks": [
            "https://placehold.co/500x400/ff0000/FFFFFF.webp",
            "https://placehold.co/600x600/0011ff/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing8191773",
          "isPRO": true,
          "_id": "612cad60a7534213e25e5aaf",
          "title": "dis parturient montes nascetur ridiculus",
          "description": "Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.",
          "price": 3836,
          "Category": "Art",
          "subCategory": "Mixed Media",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5ab0",
            "coordinates": [
              67.9716975584846,
              25.502621822612547
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "61267e0bc647a54f7bdf7761",
          "__v": 0
        },
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": false,
          "shippingInternational": false,
          "imageLinks": [
            "https://placehold.co/800x600/1100ff/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing7628629",
          "isPRO": false,
          "_id": "612cad60a7534213e25e5ab1",
          "title": "faucibus orci luctus",
          "description": "Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.",
          "price": 9243,
          "Category": "Art",
          "subCategory": "Painting",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5ab2",
            "coordinates": [
              67.83629737461912,
              25.75571208976163
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "612b4e74a2eb7c249ad6624c",
          "__v": 0
        },
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": false,
          "shippingInternational": false,
          "imageLinks": [
            "https://placehold.co/800x400/00ff00/FFFFFF.webp",
            "https://placehold.co/600x600/0011ff/FFFFFF.webp",
            "https://placehold.co/500x400/ff0000/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing1833262",
          "isPRO": false,
          "_id": "612cad60a7534213e25e5ab3",
          "title": "vestibulum vestibulum ante",
          "description": "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
          "price": 1414,
          "Category": "Art",
          "subCategory": "Fiber Art",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5ab4",
            "coordinates": [
              67.82753728994949,
              25.084566714615374
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "612349b5600f6c6800fcde03",
          "__v": 0
        },
        {
          "currency": "USD",
          "trade": false,
          "shippingNational": true,
          "shippingInternational": true,
          "imageLinks": [
            "https://placehold.co/600x400/0000ff/FFFFFF.webp",
            "https://placehold.co/800x600/1100ff/FFFFFF.webp",
            "https://placehold.co/500x400/ff0000/FFFFFF.webp",
            "https://placehold.co/600x400/000000/FFFFFF.webp",
            "https://placehold.co/800x400/00ff00/FFFFFF.webp"
          ],
          "createdDate": "2021-08-30T10:04:31.955Z",
          "listingID": "listing5195277",
          "isPRO": true,
          "_id": "612cad60a7534213e25e5ab5",
          "title": "quam pharetra magna ac consequat",
          "description": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
          "price": 6520,
          "Category": "Art",
          "subCategory": "Drawing",
          "geometry": {
            "type": "Point",
            "_id": "612cad60a7534213e25e5ab6",
            "coordinates": [
              67.56813530751617,
              25.302660330507912
            ]
          },
          "firebaseUID": "UaWAulsqdVPbWcFTfka9dZU5Shw1",
          "shippingID": "6123453c9006aa657aa56fc5",
          "__v": 0
        }
      ],
      loadingListings: true,
      loadingCustomeMade: true,
      data: [],
      page: 1,
      totalPages: 1,
      searchText: "",
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
      showShareModal: false,
      selectedItem: null,
      copyText: "Click to Copy",
      markerLocation: this.props.currentLocation,
      miles: 0,
      filtered: false,
      selectedListing: null,
      showBuyModal: false,
      favorites: [],
      colors: [
        "#64BBFF",
        "#2FFAA1",
        "#D4FA51",
        "#63FA2F",
        "#CE64FF",
        "#FABA51",
        "#64ADFF",
        "#FF64C4",
        "#9ef442",
        '#ffcd70', '#c5ff70', '#70ff77', '#70ebff', '#9385f2', '#ee71fc', '#37e8d9', '#36e87a', '#e89135', '#cd7cff',
      ]
    }
    this.state = {
      ...this.initialState
    }
    this.fetchListings = this.fetchListings.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
    this.sortByPriceFetch = this.sortByPriceFetch.bind(this)
    this.sortByDaysFetch = this.sortByDaysFetch.bind(this)
    this.searchByDistance = this.searchByDistance.bind(this)
    this.handleSearch = this.handleSearch.bind(this)


  }
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    console.log(address)
    this.setState({
      address
    })
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDRBIi3meFD4Vj6Okb-hmvK6wKN2Wy9v5s`)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          let location = {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          }
          console.log(location)
          this.props.setLocation(location)
        }
      })
    geocodeByAddress(address)
      .then(results => console.log(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
  componentDidMount() {
    this.props.readService();

    window.addEventListener('resize', () => {
      this.setState({ windowWidth: window.screen.width });
    })

    fetch(url + '/api/getCategories').then(res => res.json()).then(response => {
      if (response.message === 'Success') {
        let categories = response.docs
        const mobileIcons = ['material'
          , 'material-community'
          , 'simple-line-icon'
          , 'zocial'
          , 'font-awesome'
          , 'octicon'
          , 'ionicon'
          , 'foundation'
          , 'evilicon'
          , 'entypo'
          , 'antdesign']
        const webIcons = ['MaterialIcons', 'MaterialCommunityIcons', 'SimpleLineIcons', 'Zocial', 'FontAwesome', 'Octicons', 'Ionicons', 'Foundation', 'EvilIcons', 'Entypo', 'AntDesign']
        if (categories.length > 0) {
          let updatedCategories = categories.map(category => {
            let indexOfMobile = mobileIcons.indexOf(category.iconName)
            let webIconType = webIcons[indexOfMobile]
            category.iconName = webIconType
            return category
          })
          let listingCategories = updatedCategories.map((cat, index) => {
            return {
              label: cat.name,
              value: index + 1
            }
          })
          console.log(updatedCategories)
          this.props.setCategories(updatedCategories)
          this.props.setListingsCategories(listingCategories)
          localStorage.setItem('categories', JSON.stringify(updatedCategories))
        }
      } else {
        alert('Error in fetching categories')
      }
    })
    let data = localStorage.getItem('userData')
    if (data !== null) {
      let user = JSON.parse(data)
      this.props.setUID(user.firebaseUID)
      let uid = user.firebaseUID
      fetch(url + '/api/getFavoriteIds' + uid)
        .then(res => res.json())
        .then(response => {
          if (response.message === 'Success') {
            this.setState({
              favorites: response.docs.Favorites
            })
          }
        })
    }

    this.fetchListings()
  }
  fetchListings() {
    const { page } = this.state;;
    if (this.props.query === null) {
      fetch(url + '/api/getListings' + page, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then((res) => res.json()).then((data) => {
        if (page === 1) {
          if (data.data.length === 0 || page === data.pages - 1) {
            this.setState({
              endOfData: true,
              loadingMore: false,
              loadingListings: false
            });;
            return;;
          }

          let listings = data.data
          let updatedListings = listings.map(listing => {
            if (this.state.favorites.length > 0) {
              let obj = {
                ...listing,
                isFavorited: this.state.favorites.indexOf(listing._id) > -1 ? true : false
              }
              return obj
            } else {
              let obj = {
                ...listing,
                isFavorited: false
              }
              return obj
            }
          })
          this.props.addtListings({
            page: this.state.page,
            listings: updatedListings
          });
          this.setState({
            loadingMore: false,
            refreshing: false,
            totalPages: data.pages,
            data: updatedListings,
            loadingListings: false
          });;
        } else {
          if (data.data.length === 0 || page === data.pages) {
            this.setState({
              endOfData: true,
              loadingMore: false,
            });;
          }
          else {
            let listings = data.data
            let updatedListings = listings.map(listing => {
              let obj = {
                ...listing,
                isFavorited: false
              }
              return obj
            })
            let lists = [...updatedListings, ...this.state.data]
            this.setState({
              data: lists
            })

            this.props.addtListings({
              page: this.state.page,
              listings: lists
            });
          }

          this.setState({
            loadingMore: false
          });;
        }
      });;
    }


    else if (this.props.query !== null) {
      fetch(url + '/api/getListings' + this.state.page, { body: JSON.stringify(this.props.query), method: 'POST', headers: { 'Content-Type': 'application/json' } }).then((res) => res.json()).then((data) => {
        if (page === 1) {
          if (data.data.length === 0 || this.state.page === data.pages - 1) {
            this.setState({
              endOfData: true,
              loadingMore: false,
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
          });;
        } else {
          if (data.data.length === 0 || this.state.page === data.pages) {
            this.setState({
              endOfData: true,
              loadingMore: false,
            });;
          }

          let listings = data.data;
          // this.props.addtListings({
          //   page: this.state.page,
          //   listings,
          // });;
          console.log(listings)
          this.setState({
            loadingMore: false
          });;
        }
      });;
    }
  }
  _handleLoadMore = () => {
    if (
      this.state.searchText.length === 0
    ) {
      if (this.state.page === this.state.totalPages) return;
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
          loadingMore: true,
        }),
        () => {
          console.log('hit again...')
          this.fetchListings();
        }
      );
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  handleSearch(e) {
    e.preventDefault()
    if (this.state.searchText.length > 3) {
      this.setState({
        loadingListings: true
      })
      let data = {
        title: this.state.searchText
      }
      fetch(url + '/api/searchListing', { method: "PUT", body: JSON.stringify(data), headers: headers })
        .then(res => res.json())
        .then(response => {
          if (response.message === 'Success') {
            let data = response.doc
            if (data.length === 0) {
              message.success('No listing found')
              this.setState({
                endOfData: true,
                loadingMore: false,
                loadingListings: false

              });;
              this.props.addtListings({
                page: this.state.page,
                listings: []
              });
              return;;
            }

            let listings = data
            let updatedListings = listings.map(listing => {
              if (this.state.favorites.length > 0) {
                let obj = {
                  ...listing,
                  isFavorited: this.state.favorites.indexOf(listing._id) > -1 ? true : false
                }
                return obj
              } else {
                let obj = {
                  ...listing,
                  isFavorited: false
                }
                return obj
              }
            })
            this.props.addtListings({
              page: this.state.page,
              listings: updatedListings
            });
            this.setState({
              loadingMore: false,
              refreshing: false,
              data: updatedListings,
              loadingListings: false
            });;
          } else {
            message.error('Search listing failed')
          }
        })
    }
    else {
      if (this.state.searchText.length === 0) {
        this.fetchListings()
      }
      else {
        message.erorr('Search text must be minimum 4 characters')
      }
    }
  }
  locationModal = () => {
    this.setState({ isLocationModalvisible: true })
  }
  cancelLocationModal = () => {
    this.setState({ isLocationModalvisible: false })
  }
  selectCategory(index) {
    let data = {
      category: this.props.categories[index].name,
      subCategories: this.props.categories[index].subCategories,
      index: index
    }
    this.props.setSubCategories(data)
    this.props.history.push('/secondary/' + index)
  }
  sortByPriceFetch(type) {
    let data = {
      type
    }
    fetch(url + '/api/sortByPrice' + this.state.page, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(res => res.json())
      .then(response => {
        if (response.message === 'Success') {
          this.setState({
            data: response.data,
            loadingListings: false,
            filtered: true
          })
          this.props.addtListings({
            page: this.state.page,
            listings: response.data
          });
        }
        else {
          alert('Failed to sort by price')
        }
      })
  }
  searchByDistance() {
    this.setState({
      loadingListings: true,
      isLocationModalvisible: false
    })
    let data = {
      longitude: this.props.currentLocation.lng,
      latitude: this.props.currentLocation.lat,
      distance: this.state.miles
    }
    console.log('request -> ', data)
    fetch(url + '/api/findByLocation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(res => res.json())
      .then(response => {
        if (response.message === 'Success') {
          console.log(response)
          this.setState({
            loadingListings: false,
            data: response.docs,
            filtered: true
          })
          this.props.addtListings({
            page: this.state.page,
            listings: response.docs
          })
        }
        else {
          alert("Failed to fetch nearby listings")
        }
      }).catch(error => alert('Failed to fetch listings nearby'))
  }
  sortByDaysFetch(type) {
    let data = {
      type
    }
    fetch(url + '/api/sortByDate' + this.state.page, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(res => res.json())
      .then(response => {

        if (response.message === 'Success') {
          this.setState({
            data: response.data,
            loadingListings: false,
            filtered: true
          })
          this.props.addtListings({
            page: this.state.page,
            listings: response.data
          });
        }
        else {
          alert('Failed to sort by days')
        }
      })
  }

  handleShowSearch = (e) => {
    this.setState({ searchBarOpacity: this.state.searchBarOpacity === 1 ? 0 : 1 })
  }

  render() {
    //         const Arrow = ({ text, className }) => {
    //             return (
    //               <div
    //                 className={className}
    //               >{text}</div>
    //             );
    //           };

    // const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
    // const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
    const searchStyle = {
      transition: 'all 1s ease'
  }

    const sortByPrice = (
      <Menu onClick={({ key }) => {
        console.log(key)
        if (key === '0') {
          this.setState({
            loadingListings: true
          })
          this.sortByPriceFetch('desc')
        } else {
          this.setState({
            loadingListings: true
          })
          this.sortByPriceFetch('asc')

        }
      }}>
        <Menu.Item key="0">High to low</Menu.Item>
        <Menu.Item key="1">Low to high</Menu.Item>
      </Menu>
    );

    const sortByTime = (
      <Menu onClick={({ key }) => {
        if (key === '3') {
          this.setState({
            loadingListings: true
          })
          this.sortByDaysFetch('desc')
        } else {
          this.setState({
            loadingListings: true
          })
          this.sortByDaysFetch('asc')

        }
      }}>
        <Menu.Item key="3">Latest</Menu.Item>
        <Menu.Item key="4">Oldest</Menu.Item>
      </Menu>
    );
    // let menu = this.props.categories.length>0 ? this.props.categories.map((item, index) => {
    //     return (
    //         <Link id={item._id} className='menu-item'  to={`/iconsdetail/${index}`}>
    //             <div style={{ width: '70px', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
    //                 <Button shape="circle" style={{ width: '60px', height: '60px', backgroundColor: "#8b0000" }} >
    //                     <Icon
    //                         name={item.iconType}
    //                         font={item.iconName}
    //                         color='white'
    //                         size={20}
    //                     />
    //                 </Button>
    //     <h4 style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>

    //             </div>
    //         </Link>
    //     )
    // }):""
    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      console.log("The payment was succeeded!", payment);
    }


    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state  
    let total = 1;  // same as above, this is the total amount (based on currency) to be 
    let locale = 'en_US';
    // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
    let style = {
      'label': 'pay',
      'tagline': false,
      'size': 'medium',
      'shape': 'pill',
      'color': 'gold'
    };

    const client = {
      sandbox: 'AebZVgTaxE1-E1ACZ-q5lAqMWoNyM7oIdrqswPk8QVR52TdnfqpZ21xHmkxYnMnrFjvDNiKKgD05OPgB',
      production: 'YOUR-PRODUCTION-APP-ID',
    }

    // const searchStyle = {
    //   transition: 'all 1s ease'
    // }
    return (
      <div className="home-container" style={{ width: '100%' }}>
        <Navbar showSearch={this.handleShowSearch} history={this.props.history} />
        <SubNavbar />
        <div>
          <ul className="container-fluid bg-light nav">
            <Link to='/auction'><li className="l1 l2"><b>Live Auctions</b></li></Link>
            <Link to="/custom-made"><li className="l1 l2"><b> Custom Made</b> </li></Link>
            <Link to='/exclusive-services'><li className="l1 l2"> <b>Exclusive Services</b></li></Link>
            <Link to='/sponsor'><li className="l1 l2"> <b>Sponsorship</b> </li></Link>
            <Link to='/blog'><li className="l1 l2"> <b>Blog</b></li></Link>
          </ul>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-3 categories' style={{ marginBottom:'50px'}}   >
              <ul>
                <li className='catype'><Iconn type="Menu" key="like" />&nbsp;&nbsp;Categories</li>
                <Link to='/listing'><li><Iconn type="heart" key="like" />&nbsp;&nbsp; Art & Collection</li></Link>
                <Link to='/secondary/1'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Clothing & Shoes</li></Link>
                <Link to='/secondary/2'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Accessories</li></Link>
                <Link to='/secondary/3'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Handcrafts</li></Link>
                <Link to='/secondary/4'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Services</li></Link>
                <Link to='/secondary/5'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Home & Decor</li></Link>
                <Link to='/secondary/6'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Technical Services</li></Link>
                <Link to='/secondary/7'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Vintage</li></Link>
                <Link to='/secondary/8'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Stones & Specimens</li></Link>
                <Link to='/secondary/9'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Craft Supplies & Tools</li></Link>
                <Link to='/secondary/10'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Paper & Party Supplies</li></Link>
                <Link to='/secondary/11'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Weddings</li></Link>
                <Link to='/secondary/12'><li><Iconn type="heart" key="like" />&nbsp;&nbsp;Bags & Purses</li></Link>
              </ul>
            </div>
            <div className='col-8'>
              <Carousel {...carouselSetting} style={contentStyle}>
                <div>
                  <img style={imageStyle} src={image2} alt='' />
                </div>
                <div>
                  <img style={imageStyle} src={image3} alt='' />
                </div>
                <div>
                  <img style={imageStyle} src={image4} alt='' />
                </div>
                <div>
                  <img style={imageStyle} src={image5} alt='' />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
        <div className='carousel' >
          <Carousel style={contentStyle2} {...carouselSettings}>
            <div>
              <img style={imageStyle2} src={image2} alt='' />
            </div>
            <div>
              <img style={imageStyle2} src={image4} alt='' />
            </div>
            <div>
              <img style={imageStyle2} src={image3} alt='' />
            </div>
            <div>
              <img style={imageStyle2} src={image5} alt='' />
            </div>
          </Carousel>
        </div>

        {/* <div className="search-box" style={{...searchStyle}}>
                    <Input onKeyDown={e=> {
                      if(e.which===13 || e.keyCode===13){
                        this.handleSearch(e)
                      }
                    }} onSubmit={this.handleSearch} name='searchText' onChange={e=>{
                      this.setState({
                        searchText:e.target.value
                      })
                    }}  style={{width:this.state.windowWidth <= 768 ? '70%':'50%',border:'solid 1px gray',borderRadius:15,backgroundColor:'#eeeeee'}}  size="large"  placeholder="Search Listings" />
                </div> */}

        {/* <div style={{width:'100vw',display:'flex',justifyContent:'center',marginTop:'50px'}}>

                    <div className="icon-scroll-div" style={{width:'80vw',overflowX:'scroll'}}>

                        <div className="icons-bar">
                            {
                            this.props.categories.length>0 && this.props.categories.map((item, index) => {
                              let color = this.state.colors[Math.round(Math.random()*(this.state.colors.length-1))]
                                    return (
                                        <Link id={item._id} title={item.iconName} >
                                            <div title={item.name} style={{ width: '100px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                                <Button onClick={()=>this.selectCategory(index)} shape="circle" style={{ width: '65px', height: '70px', backgroundColor: color }} >
                                                    <Icon
                                                        name={item.iconType}
                                                        font={item.iconName}
                                                        color='white'
                                                        size={25}
                                                    />
                                                </Button>
                                                <div style={{height:20}}>
                                                <h5 style={{width:'100px',color:'black',textAlign:'center'}}>{item.name}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                        //     this.props.categories.length>0 &&  <ScrollMenu
                        //     data={menu}
                        //     arrowLeft={ArrowLeft}
                        //     arrowRight={ArrowRight}
                        //   />
                            }
                        </div>
                    </div>
                </div> */}
        {/* 
                <PaypalBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                locale={locale} 
                style={style}
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} /> */}
        {/* <div className="filter-container">
          <div className="filter">
            <div className="dropdown" data-target="#myModal" data-toggle="modal">
              <h3 style={{ color: 'gray' }}>Sort By <b style={{ fontSize: '20px', color: 'black' }}>Location</b> <FontAwesomeIcon onClick={() => { this.setState({ isLocationModalvisible: true }) }}
                className="icon1" icon={faCaretDown} style={{ marginLeft: '60px' }} /></h3>
              <Modal onOk={this.searchByDistance} visible={this.state.isLocationModalvisible} onCancel={this.cancelLocationModal}>
                <div style={{ flex: 1, justifyContent: 'center', height: 500 }}>
                  <Map markerLocation={this.props.currentLocation} />
                </div>
                <br />

                <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <Input


                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input',
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>

                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>Distance</h4>
                  <h4>{this.state.miles} Miles</h4>
                </div>
                <Slider step={5} min={0} max={200} onChange={(value) => this.setState({ miles: value })} />
              </Modal>
            </div>
            <div className="dropdown" >
              <Dropdown onClick={({ key }) => {
                console.log(key)
              }} overlay={sortByPrice} overlayStyle={{ fontSize: '20px' }} trigger={['click']}>
                <h3 style={{ color: 'gray' }}>Sort By <b style={{ fontSize: '20px', color: 'black' }}>Price</b> <FontAwesomeIcon className="icon2" icon={faCaretDown} style={{ marginLeft: '95px' }} /></h3>
              </Dropdown>
            </div>
            <div className="dropdown">
              <Dropdown overlay={sortByTime} trigger={['click']}>
                <h3 style={{ color: 'gray' }}>Sort By <b style={{ fontSize: '20px', color: 'black' }}>Time</b> <FontAwesomeIcon className="icon4" icon={faCaretDown} style={{ marginLeft: '90px' }} /></h3>
              </Dropdown>
            </div>
            {this.state.filtered === true && <a href='/' style={{ color: "red", fontSize: 16 }} className="ant-dropdown-link" onClick={e => {
              e.preventDefault()
              this.setState({ query: null, page: 1, loadingListings: true, filtered: false })
              this.fetchListings()
            }}>
              Clear Filters
            </a>}
          </div>
        </div> */}
        <Slide bottom>
          <h1 style={{ textAlign: 'left', paddingLeft: '50px' }}>Featured Listings</h1>
        </Slide>

        <div className="products-container">
          <div className="products">
            {this.state.loadingListings === false && this.props.data.length > 0 &&

              <List
                grid={{ gutter: 20, xxl: 4, xl: 4, lg: 3, md: 2, sm: 2 }}
                dataSource={this.props.data}
                renderItem={(item, index) => (
                  <List.Item>
                    <Slide bottom>
                      <Card
                        hoverable={true}
                        className="Cards"
                        bodyStyle={{ padding: 5 }}
                        style={{ width: (this.state.windowWidth <= 360) ? 200 : (this.state.windowWidth <= 576) ? 300 : 260, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                        cover={<Link to={`/itemdescription/${item.listingID}`}>
                          <img onClick={() => {
                            if (item.isFavorited === true) {
                              this.props.setFavorite(true)
                            }
                            else {
                              this.props.setFavorite(false)

                            }
                          }} alt='icon error' src={item.imageLinks[0]} style={{ height: 250, width: (this.state.windowWidth <= 360) ? 200 : (this.state.windowWidth <= 576) ? 300 : 260, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                        </Link>}
                        actions={[
                          <Iconn onClick={() => {

                            this.setState({
                              selectedItem: item,
                              showShareModal: true
                            })
                          }} type="share-alt" key="share-alt" />,
                          <div onClick={() => {
                            this.setState({
                              showBuyModal: true,
                              selectedListing: item
                            })
                          }}>
                            {/* <Link><FontAwesomeIcon icon={faEye} /></Link> */}
                            <img src={Buy} alt='Buy now' />
                          </div>,
                          <Iconn onClick={() => {
                            if (this.props.UID !== '') {
                              let data = {
                                id: item._id,
                                firebaseUID: this.props.UID
                              }
                              fetch(url + '/api/addFavorite', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                                .then(res => res.json())
                                .then(response => {
                                  if (response.message !== 'Success') {
                                    message.error('Failed to Favorite Item')
                                  }
                                })
                            }
                            this.props.favoriteItem(item._id)
                          }} type="heart" theme={item.isFavorited === true ? "filled" : "outlined"} key="heart" />,
                        ]}
                      >
                        <Card.Meta
                          title={
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                              <Truncate style={{ margin: 0, fontWeight: 'bold', fontSize: 18 }}>
                                <h3>{item.title}</h3>
                              </Truncate>
                              {
                                item.isPRO === true ?
                                  <p style={{ padding: 2, backgroundColor: '#8b0000', color: 'white', fontSize: 14, marginBottom: 0 }}>PRO</p>
                                  :
                                  <p style={{ padding: 13, marginBottom: 0 }}></p>
                              }
                            </div>
                          }
                          description={<div style={{ flex: 1, flexDirection: "row" }}>
                            <Truncate lines="3" style={{ margin: 0 }}>{item.description}</Truncate>
                            <h3 style={{ margin: 0, flexBasis: "30%" }}>${item.price}</h3>
                          </div>

                          }
                        />
                      </Card>
                    </Slide>
                  </List.Item>
                )}
              />
            }
            {this.state.loadingListings === false && this.props.data.length === 0 && <div>
              <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>No Listings Published</h2>
              <Fade bottom>
                <Button style={{ backgroundColor: 'darkgreen', width: '200px', color: 'white', marginBottom: '30px', marginTop: '30px', height: '50px', fontSize: '20px' }} shape="round">Add first listing</Button>
              </Fade>
            </div>}
            {this.state.loadingListings && <List
              grid={{ gutter: 35, xxl: 4, xl: 4, lg: 3, md: 2, sm: 2 }}
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
            <div>
              {this.props.data.length > 0 && this.state.loadingListings === false && <Fade bottom>
                <Button onClick={this._handleLoadMore} style={{ border: 'none', float: 'left' }}>See More</Button>
              </Fade>}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', background: '#75a76d' }}>
          <div className='container'>
            <Fade top cascade>
              <h1 style={{ fontWeight: 'bold', textAlign: 'left', fontSize: this.state.windowWidth <= 375 ? 22 : 30 }}>Exclusive Services</h1>
            </Fade>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>

            <List
              grid={{ gutter: 26, xl: 4, xs: 1, sm: 3, md: 3, lg: 4, xxl: 6 }}
              dataSource={this.props.serviceData.length > 5 ? this.props.serviceData.slice(Math.max(this.props.serviceData.length - 6, 0)) : this.props.serviceData}
              renderItem={(item, index) => (
                <List.Item>
                  <Fade duration={2000}>
                    <Card
                      style={this.state.windowWidth < 360 ? { width: 200 } : this.state.windowWidth < 576 ? { width: 300 } : this.state.windowWidth < 768 ? { width: 200 } : this.state.windowWidth <= 992 ? { width: 200 } : this.state.windowWidth <= 1400 ? { width: 200 } : { width: 200 }}
                      bodyStyle={{ padding: 0 }}
                      cover={<Link to={`/exclusive-services/${item._id}/service-description`}>
                        <img alt='cover not found' style={this.state.windowWidth < 360 ? { width: 200, height: 150 } : this.state.windowWidth < 576 ? { width: 300, height: 250 } : this.state.windowWidth < 768 ? { width: 200, height: 150 } : this.state.windowWidth <= 992 ? { width: 200, height: 150 } : this.state.windowWidth <= 1400 ? { width: 200, height: 150 } : { width: 200, height: 150 }} src={item.Images[0]} /></Link>}
                    >
                      <div >
                        <div style={{ padding: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar size="default" src={item.userImage} />
                              <h4 style={{ margin: 0, fontWeight: 'bold', marginLeft: 10 }}>{item.userName}</h4>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Rate count={1} value={item.totalRatings} disabled={true} style={{ fontSize: '15', marginBottom: 5 }} autoFocus={true} />
                              <h3 style={{ margin: 0, color: "#fadb14", fontWeight: 'bold', marginLeft: 5 }}>{item.totalRatings}</h3>
                            </div>
                          </div>
                          <hr />
                          <div>
                            <Truncate style={{ fontWeight: 'bold', margin: 0 }}>{item.ServiceTitle}</Truncate>
                            <br />
                            <Truncate lines="3">{item.ServiceDescription}</Truncate>
                          </div>
                        </div>
                        <div style={{ padding: 10, backgroundColor: "#eeeeee", display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ margin: 0, display: 'flex' }}>Starting At : <h4 style={{ margin: 0, fontWeight: 'bold' }}>${item.Price}</h4></p>
                        </div>
                      </div>
                    </Card>
                  </Fade>
                </List.Item>
              )}

            />
            <div style={{ float: 'right' }}>
              {this.props.serviceData.length >= 0 &&
                <Link to={`/exclusive-services`}>
                  See More
                </Link>
              }
            </div>
          </div>


        </div>

        {/* <Divider style={{ margin: 0 }}><h1>...</h1></Divider> */}

        <div className="What-You-Get-Section">
          <div className="What-You-Get-Inner-Container">
            <Zoom duration={500}>
              <h1 style={{ fontSize: 28, marginBottom: 50, fontWeight: 'bold' }}>Recent Custom Made Jobs</h1>
            </Zoom>
            {this.state.loadingListings === false && this.props.data.length > 0 &&

              <List
                grid={{ gutter: 26, xxl: 3, xl: 3, lg: 3, md: 2, sm: 2 }}
                dataSource={this.state.customeMadeData}
                renderItem={(item, index) => (
                  <List.Item>
                    <Slide bottom>
                      <Card
                        hoverable={true}
                        className="Cards"
                        bodyStyle={{ padding: 20 }}
                        style={{ width: (this.state.windowWidth <= 360) ? 200 : (this.state.windowWidth <= 576) ? 300 : 260, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                        cover={<Link to={`/itemdescription/${item.listingID}`}>
                          <img onClick={() => {
                            if (item.isFavorited === true) {
                              this.props.setFavorite(true)
                            }
                            else {
                              this.props.setFavorite(false)

                            }
                          }} alt='icon error' src={item.imageLinks[0]} style={{ height: 250, width: (this.state.windowWidth <= 360) ? 200 : (this.state.windowWidth <= 576) ? 300 : 260, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                        </Link>}
                        actions={[
                          <Iconn onClick={() => {

                            this.setState({
                              selectedItem: item,
                              showShareModal: true
                            })
                          }} type="share-alt" key="share-alt" />,
                          <div onClick={() => {
                            this.setState({
                              showBuyModal: true,
                              selectedListing: item
                            })
                          }}>
                            {/* <Link><FontAwesomeIcon icon={faEye} /></Link> */}
                            <img src={Buy} alt='Buy now' />
                          </div>,
                          <Iconn onClick={() => {
                            if (this.props.UID !== '') {
                              let data = {
                                id: item._id,
                                firebaseUID: this.props.UID
                              }
                              fetch(url + '/api/addFavorite', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                                .then(res => res.json())
                                .then(response => {
                                  if (response.message !== 'Success') {
                                    message.error('Failed to Favorite Item')
                                  }
                                })
                            }
                            this.props.favoriteItem(item._id)
                          }} type="heart" theme={item.isFavorited === true ? "filled" : "outlined"} key="heart" />,
                        ]}
                      >
                        <Card.Meta
                          title={
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                              <Truncate style={{ margin: 0, fontWeight: 'bold', fontSize: 18 }}>
                                <h3>{item.title}</h3>
                              </Truncate>
                              {
                                item.isPRO === true ?
                                  <p style={{ padding: 2, backgroundColor: '#8b0000', color: 'white', fontSize: 14, marginBottom: 0 }}>PRO</p>
                                  :
                                  <p style={{ padding: 13, marginBottom: 0 }}></p>
                              }
                            </div>
                          }
                          description={<div style={{ flex: 1, flexDirection: "row" }}>
                            <Truncate lines="3" style={{ margin: 0 }}>{item.description}</Truncate>
                            <h3 style={{ margin: 0, flexBasis: "30%" }}>${item.price}</h3>
                          </div>

                          }
                        />
                      </Card>
                    </Slide>
                  </List.Item>
                )}
              />
            }
            {this.state.loadingListings === false && this.props.data.length === 0 && <div>
              <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>No Listings Published</h2>
              <Fade bottom>
                <Button style={{ backgroundColor: 'darkgreen', width: '200px', color: 'white', marginBottom: '30px', marginTop: '30px', height: '50px', fontSize: '20px' }} shape="round">Add first listing</Button>
              </Fade>
            </div>}
            {this.state.loadingListings && <List
              grid={{ gutter: 35, xxl: 4, xl: 4, lg: 3, md: 2, sm: 2 }}
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
            <div>
              {this.props.data.length > 0 && this.state.loadingListings === false && <Fade bottom>
                <Button onClick={this._handleLoadMore} style={{ border: 'none', float: 'left' }}>See More</Button>
              </Fade>}
            </div>
            {/* <div className="main-box">
              <div className="box-1">
                <Flip left>
                  <img onClick={() => {
                    this.props.history.push('/custom-made')
                  }} alt='cover not found' src={Handmadecover} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Flip>
              </div>
              <div className="box-2">
                <Zoom duration={1500}>
                  <p style={{ fontSize: 22 }}>
                    <Link to='/custom-made'><h2 style={{ fontWeight: 'bold' }}>Custom Made</h2></Link>
                    Your wish is our command. Within this area buyers are able to post requests for  their favorites Artisans and companies to make and buyers are able to search for Artisan products and services.
                  </p>
                </Zoom>
              </div>
            </div>
            <div className="main-box">
              <div className="box-1 first">
                <Zoom duration={1500}>
                  <p style={{ fontSize: 22 }}>
                    <Link to='/auction'><h2 style={{ fontWeight: 'bold' }}>Live Auctions</h2></Link>
                    Comes with two features: <br /> <b>Timed Auctions- </b>set your auction up with the date and time, photos, title, description, and starting price and let us do the rest. <br /> <b>Live Auctions-</b>comes with live broadcasting and the same requirements as Timed Auctions, however the seller is present for live interactions with the buyer.
                  </p>
                </Zoom>
              </div>
              <div className="box-2 second">
                <Flip right>
                  <img onClick={() => {
                    this.props.history.push('/auction')
                  }} alt='cover not found' src={livecover} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Flip>
              </div>
            </div>
            <div className="main-box">
              <div className="box-1">
                <Flip left>
                  <img alt='cover not found' onClick={() => {
                    this.props.history.push('/exclusive-services')
                  }} src={servicescover} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Flip>
              </div>
              <div className="box-2">
                <Zoom duration={1500}>
                  <p style={{ fontSize: 22 }}>
                    <Link to='/exclusive-services'><h2 style={{ fontWeight: 'bold' }}>Exclusive Services</h2></Link>
                    Exclusive Services are individuals, teams, and companies worldwide that we’ve curated to aid and assist our community to have their business needs met with consistency, affordability, and to help grow their businesses with ease.  If you’re looking for services or you’d like to offer your services to the community
                  </p>
                </Zoom>
              </div>
            </div> */}

          </div>
        </div>

        <Slide bottom>
          <h1 style={{ textAlign: 'left', paddingLeft: '50px' }}>Live & Upcoming Auctions</h1>
        </Slide>

        <div className="products-container">
          <div className="products">
            {this.state.loadingListings === false && this.props.data.length > 0 &&

              <List
                grid={{ gutter: 20, xxl: 4, xl: 3, lg: 3, md: 2, sm: 2 }}
                dataSource={this.state.upComingAuction}
                renderItem={(item, index) => (
                  <List.Item>
                    <Slide bottom>
                      <Card
                        hoverable={true}
                        className="Cards"
                        bodyStyle={{ padding: 5 }}
                        style={{ width: (this.state.windowWidth <= 360) ? 200 : (this.state.windowWidth <= 576) ? 300 : 260, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                        cover={<Link to={`/itemdescription/${item.listingID}`}>
                          <img onClick={() => {
                            if (item.isFavorited === true) {
                              this.props.setFavorite(true)
                            }
                            else {
                              this.props.setFavorite(false)

                            }
                          }} alt='icon error' src={item.imageLinks[0]} style={{ height: 250, width: (this.state.windowWidth <= 360) ? 200 : (this.state.windowWidth <= 576) ? 300 : 260, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                        </Link>}
                        actions={[
                          <Iconn onClick={() => {

                            this.setState({
                              selectedItem: item,
                              showShareModal: true
                            })
                          }} type="share-alt" key="share-alt" />,
                          <div onClick={() => {
                            this.setState({
                              showBuyModal: true,
                              selectedListing: item
                            })
                          }}>
                            {/* <Link><FontAwesomeIcon icon={faEye} /></Link> */}
                            <img src={Buy} alt='Buy now' />
                          </div>,
                          <Iconn onClick={() => {
                            if (this.props.UID !== '') {
                              let data = {
                                id: item._id,
                                firebaseUID: this.props.UID
                              }
                              fetch(url + '/api/addFavorite', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                                .then(res => res.json())
                                .then(response => {
                                  if (response.message !== 'Success') {
                                    message.error('Failed to Favorite Item')
                                  }
                                })
                            }
                            this.props.favoriteItem(item._id)
                          }} type="heart" theme={item.isFavorited === true ? "filled" : "outlined"} key="heart" />,
                        ]}
                      >
                        <Card.Meta
                          title={
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                              <Truncate style={{ margin: 0, fontWeight: 'bold', fontSize: 18 }}>
                                <h3>{item.title}</h3>
                              </Truncate>
                              {
                                item.isPRO === true ?
                                  <p style={{ padding: 2, backgroundColor: '#8b0000', color: 'white', fontSize: 14, marginBottom: 0 }}>PRO</p>
                                  :
                                  <p style={{ padding: 13, marginBottom: 0 }}></p>
                              }
                            </div>
                          }
                          description={<div style={{ flex: 1, flexDirection: "row" }}>
                            <Truncate lines="3" style={{ margin: 0 }}>{item.description}</Truncate>
                            <h3 style={{ margin: 0, flexBasis: "30%" }}>${item.price}</h3>
                          </div>

                          }
                        />
                      </Card>
                    </Slide>
                  </List.Item>
                )}
              />
            }
            {this.state.loadingListings === false && this.props.data.length === 0 && <div>
              <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>No Listings Published</h2>
              <Fade bottom>
                <Button style={{ backgroundColor: 'darkgreen', width: '200px', color: 'white', marginBottom: '30px', marginTop: '30px', height: '50px', fontSize: '20px' }} shape="round">Add first listing</Button>
              </Fade>
            </div>}
            {this.state.loadingListings && <List
              grid={{ gutter: 35, xxl: 4, xl: 4, lg: 3, md: 2, sm: 2 }}
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
            <div>
              {this.props.data.length > 0 && this.state.loadingListings === false && <Fade bottom>
                <Button onClick={this._handleLoadMore} style={{ border: 'none', float: 'left' }}>See More</Button>
              </Fade>}
            </div>
          </div>
        </div>

        <div style={{ width: '100%', background: '#36ae7c' }}>
          <div className='container'>
            <Fade top cascade>
              <h1 style={{ fontWeight: 'bold', textAlign: 'left', fontSize: this.state.windowWidth <= 375 ? 22 : 30 }}>Latest Blogs</h1>
            </Fade>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>

            <List
              grid={{ gutter: 26, xl: 4, xs: 1, sm: 3, md: 3, lg: 4, xxl: 6 }}
              dataSource={this.props.serviceData.length > 5 ? this.props.serviceData.slice(Math.max(this.props.serviceData.length - 6, 0)) : this.props.serviceData}
              renderItem={(item, index) => (
                <List.Item>
                  <Fade duration={2000}>
                    <Card
                      style={this.state.windowWidth < 360 ? { width: 200 } : this.state.windowWidth < 576 ? { width: 300 } : this.state.windowWidth < 768 ? { width: 200 } : this.state.windowWidth <= 992 ? { width: 200 } : this.state.windowWidth <= 1400 ? { width: 200 } : { width: 200 }}
                      bodyStyle={{ padding: 0 }}
                      cover={<Link to={`/exclusive-services/${item._id}/service-description`}>
                        <img alt='cover not found' style={this.state.windowWidth < 360 ? { width: 200, height: 150 } : this.state.windowWidth < 576 ? { width: 300, height: 250 } : this.state.windowWidth < 768 ? { width: 200, height: 150 } : this.state.windowWidth <= 992 ? { width: 200, height: 150 } : this.state.windowWidth <= 1400 ? { width: 200, height: 150 } : { width: 200, height: 150 }} src={item.Images[0]} /></Link>}
                    >
                      <div >
                        <div style={{ padding: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar size="default" src={item.userImage} />
                              <h4 style={{ margin: 0, fontWeight: 'bold', marginLeft: 10 }}>{item.userName}</h4>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Rate count={1} value={item.totalRatings} disabled={true} style={{ fontSize: '15', marginBottom: 5 }} autoFocus={true} />
                              <h3 style={{ margin: 0, color: "#fadb14", fontWeight: 'bold', marginLeft: 5 }}>{item.totalRatings}</h3>
                            </div>
                          </div>
                          <hr />
                          <div>
                            <Truncate style={{ fontWeight: 'bold', margin: 0 }}>{item.ServiceTitle}</Truncate>
                            <br />
                            <Truncate lines="3">{item.ServiceDescription}</Truncate>
                          </div>
                        </div>
                        <div style={{ padding: 10, backgroundColor: "#eeeeee", display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ margin: 0, display: 'flex' }}>Starting At : <h4 style={{ margin: 0, fontWeight: 'bold' }}>${item.Price}</h4></p>
                        </div>
                      </div>
                    </Card>
                  </Fade>
                </List.Item>
              )}

            />
            <div style={{ float: 'right' }}>
              {this.props.serviceData.length >= 0 &&
                <Link to={`/exclusive-services`}>
                  See More
                </Link>
              }
            </div>
          </div>


        </div>
        <div style={{ width: '100%', background: '#d8ec8fb6' }}>
          <div className='container'>
            <Fade top cascade>
              <h1 style={{ fontWeight: 'bold', textAlign: 'left', fontSize: this.state.windowWidth <= 375 ? 22 : 30 }}>Best Selling Products</h1>
            </Fade>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>

            <List
              grid={{ gutter: 26, xl: 4, xs: 1, sm: 3, md: 3, lg: 4, xxl: 6 }}
              dataSource={this.props.serviceData.length > 5 ? this.props.serviceData.slice(Math.max(this.props.serviceData.length - 6, 0)) : this.props.serviceData}
              renderItem={(item, index) => (
                <List.Item>
                  <Fade duration={2000}>
                    <Card
                      style={this.state.windowWidth < 360 ? { width: 200 } : this.state.windowWidth < 576 ? { width: 300 } : this.state.windowWidth < 768 ? { width: 200 } : this.state.windowWidth <= 992 ? { width: 200 } : this.state.windowWidth <= 1400 ? { width: 200 } : { width: 200 }}
                      bodyStyle={{ padding: 0 }}
                      cover={<Link to={`/exclusive-services/${item._id}/service-description`}>
                        <img alt='cover not found' style={this.state.windowWidth < 360 ? { width: 200, height: 150 } : this.state.windowWidth < 576 ? { width: 300, height: 250 } : this.state.windowWidth < 768 ? { width: 200, height: 150 } : this.state.windowWidth <= 992 ? { width: 200, height: 150 } : this.state.windowWidth <= 1400 ? { width: 200, height: 150 } : { width: 200, height: 150 }} src={item.Images[0]} /></Link>}
                    >
                      <div >
                        <div style={{ padding: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar size="default" src={item.userImage} />
                              <h4 style={{ margin: 0, fontWeight: 'bold', marginLeft: 10 }}>{item.userName}</h4>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Rate count={1} value={item.totalRatings} disabled={true} style={{ fontSize: '15', marginBottom: 5 }} autoFocus={true} />
                              <h3 style={{ margin: 0, color: "#fadb14", fontWeight: 'bold', marginLeft: 5 }}>{item.totalRatings}</h3>
                            </div>
                          </div>
                          <hr />
                          <div>
                            <Truncate style={{ fontWeight: 'bold', margin: 0 }}>{item.ServiceTitle}</Truncate>
                            <br />
                            <Truncate lines="3">{item.ServiceDescription}</Truncate>
                          </div>
                        </div>
                        <div style={{ padding: 10, backgroundColor: "#eeeeee", display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ margin: 0, display: 'flex' }}>Starting At : <h4 style={{ margin: 0, fontWeight: 'bold' }}>${item.Price}</h4></p>
                        </div>
                      </div>
                    </Card>
                  </Fade>
                </List.Item>
              )}

            />
            <div style={{ float: 'right' }}>
              {this.props.serviceData.length >= 0 &&
                <Link to={`/exclusive-services`}>
                  See More
                </Link>
              }
            </div>
          </div>


        </div>
        <div style={{ width: '100%', background: '#ffff' }}>
          <div className='container'>
            <Fade top cascade>
              <h1 style={{ fontWeight: 'bold', textAlign: 'left', fontSize: this.state.windowWidth <= 375 ? 22 : 30 }}>Technical Services</h1>
            </Fade>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>

            <List
              grid={{ gutter: 26, xl: 4, xs: 1, sm: 3, md: 3, lg: 4, xxl: 6 }}
              dataSource={this.props.serviceData.length > 5 ? this.props.serviceData.slice(Math.max(this.props.serviceData.length - 6, 0)) : this.props.serviceData}
              renderItem={(item, index) => (
                <List.Item>
                  <Fade duration={2000}>
                    <Card
                      style={this.state.windowWidth < 360 ? { width: 200 } : this.state.windowWidth < 576 ? { width: 300 } : this.state.windowWidth < 768 ? { width: 200 } : this.state.windowWidth <= 992 ? { width: 200 } : this.state.windowWidth <= 1400 ? { width: 200 } : { width: 200 }}
                      bodyStyle={{ padding: 0 }}
                      cover={<Link to={`/exclusive-services/${item._id}/service-description`}>
                        <img alt='cover not found' style={this.state.windowWidth < 360 ? { width: 200, height: 150 } : this.state.windowWidth < 576 ? { width: 300, height: 250 } : this.state.windowWidth < 768 ? { width: 200, height: 150 } : this.state.windowWidth <= 992 ? { width: 200, height: 150 } : this.state.windowWidth <= 1400 ? { width: 200, height: 150 } : { width: 200, height: 150 }} src={item.Images[0]} /></Link>}
                    >
                      <div >
                        <div style={{ padding: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar size="default" src={item.userImage} />
                              <h4 style={{ margin: 0, fontWeight: 'bold', marginLeft: 10 }}>{item.userName}</h4>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Rate count={1} value={item.totalRatings} disabled={true} style={{ fontSize: '15', marginBottom: 5 }} autoFocus={true} />
                              <h3 style={{ margin: 0, color: "#fadb14", fontWeight: 'bold', marginLeft: 5 }}>{item.totalRatings}</h3>
                            </div>
                          </div>
                          <hr />
                          <div>
                            <Truncate style={{ fontWeight: 'bold', margin: 0 }}>{item.ServiceTitle}</Truncate>
                            <br />
                            <Truncate lines="3">{item.ServiceDescription}</Truncate>
                          </div>
                        </div>
                        <div style={{ padding: 10, backgroundColor: "#eeeeee", display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ margin: 0, display: 'flex' }}>Starting At : <h4 style={{ margin: 0, fontWeight: 'bold' }}>${item.Price}</h4></p>
                        </div>
                      </div>
                    </Card>
                  </Fade>
                </List.Item>
              )}

            />
            <div style={{ float: 'right' }}>
              {this.props.serviceData.length >= 0 &&
                <Link to={`/exclusive-services`}>
                  See More
                </Link>
              }
            </div>
          </div>


        </div>

        <div className='sponsor'>
        <Fade bottom><h1>Sponsorship</h1></Fade>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Slide left><div className='sponsor1'></div></Slide>
          <Slide right> <div className='sponsor2'></div></Slide>
          </div>
        </div>

        <div className='affordablePrice'>
        <Slide left><h2>Affordable Pricing</h2></Slide>
        <Slide bottom> <h3>Billed Early</h3></Slide>
          <div className="container pad">
    <div className="row">
    <Slide right>
      <div className="col-lg-3 hot-badge" >
        <div className="basic">
          <h2>Basic Users</h2>
          <h4>Free/Forever</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Add up to 40 listings.</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Add up to 5 images to each<br/> listings.
          </h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Messaging.</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Shipping profiles.</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Social Media sharing.</h4>
          <p>
            On each sale we charge 10% plus<br/>
            10 cents (for porducts) or 20% plus<br/>
            20 cents (for Services)
          </p>
          <h4 style={{textAlign: 'center', color:'blue'}}><a>See more...</a></h4>
          <div className="butn">
            <button type="button" className="button">Try for Free</button>
          </div>
        </div>
      </div>
      </Slide>
      <Slide top>
      <div className="col-lg-3 hot-badge1">
        <div className="basic">
          <h2>PRO Users</h2>
          <h4>$4.95/YEAR</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Everything for Basic Users.</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Add up to 300 listings (or<br/>may be unlimited
            if don't have<br/> any third package right now).</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Access to live Auctions.</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Pro Badge on all listings.</h4>
          <p>
            On each sale we charge 10% plus<br/>
            10 cents (for porducts) or 20% plus<br/>
            20 cents (for Services)
          </p>
          <h4 style={{textAlign: 'center', color:'blue'}}><a>See more...</a></h4>
          <div className="butn1">
            <button type="button" class="buttonPro">Subscribe to PRO</button>
          </div>
        </div>
      </div>
      </Slide>
      <Slide bottom>
      <div className="col-lg-3 hot-badge2">
        <div className="basic">
          <h2>Gold Users</h2>
          <h4>$7.95/YEAR</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Gold Badge.</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Unlimited listings.</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Blog (with 5-10 items for<br/> promotion).
          </h4>
          <p>
            On each sale we charge 10% plus<br/>
            10 cents (for porducts) or 20% plus<br/>
            20 cents (for Services)
          </p>
          <h4 style={{textAlign: 'center', color:'blue'}}><a>See more...</a></h4>
          <div className="butn2">
            <button type="button" className="buttonGold">Subscribe to Gold</button>
          </div>
        </div>
      </div>
      </Slide>
      <Slide left>
      <div className="col-lg-3 hot-badge3">
        <div className="basic">
          <h2>Gold Users</h2>
          <h4>$9.95/YEAR</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Coming soon.</h4>
          <h4><Iconn type="CheckCircleFilled" theme="Filled" style={{ color: 'blue'}}/>&nbsp;&nbsp;Wholesale.</h4>
          <p>
            On each sale we charge 10% plus<br/>
            10 cents (for porducts) or 20% plus<br/>
            20 cents (for Services)
          </p>
          <h4 style={{textAlign: 'center', color:'blue'}}><a>See more...</a></h4>
          <div className="butn3">
            <button type="button3" className="button3">Coming Soon</button>
          </div>
        </div>
      </div>
      </Slide>
    </div>
  </div>
        </div>

        <div className="How-To-Get-Start">
          <div className="How-To-Get-Start-Inner-Container">
            <h1 style={{ fontSize: 30, marginBottom: 50, fontWeight: 'bold', textAlign: 'center' }}>How to Get Started</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: '100%' }}>
              <Fade left duration={500}>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', width: 200 }}>
                  <img src={image1} style={{ width: "150px", maxHeight: "150px" }} />
                  <h3 style={{ fontWeight: 'bold' }}>Register</h3>
                </div>
              </Fade>
              {/* <Fade left duration={1000}>
                <div style={{ width: 350 }}>
                  <img src={raw} style={{ width: "100%", maxHeight: "100%" }} />
                </div>
              </Fade> */}
              <Fade left duration={1500}>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', width: 200 }}>
                  <img src={image4} style={{ width: "200px", maxHeight: "200px" }} />
                  <h3 style={{ fontWeight: 'bold' }}>Login</h3>
                </div>
              </Fade>
              {/* <Fade left duration={2000}>
                <div style={{ width: 350 }}>
                  <img src={raw} style={{ width: "100%" }} />
                </div>
              </Fade> */}
              <Fade left duration={2500}>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', width: 200 }}>
                  <img src={image3} style={{ width: "150px", maxHeight: "150px" }} />
                  <h3 style={{ fontWeight: 'bold' }}>Get Access</h3>
                </div>
              </Fade>
            </div>
          </div>
        </div>

        <Divider style={{ margin: 0 }}><h1>...</h1></Divider>

        <div className="mobile-apps-container">
          <div className="mobile-apps">
            <div style={{ width: '50%' }}>
              <Fade left duration={3000}>
                <img alt='cover not found' src={'https://firebasestorage.googleapis.com/v0/b/myconsignmentlive.appspot.com/o/download.png?alt=media&token=0844a822-77d3-4202-8b09-32039f1dea7d'} style={{ maxWidth: '60%', maxHeight: '60%' }} />
              </Fade>
            </div>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Fade top cascade>
                <h2 className="h1" style={{ color: "darkcyan" }}>Download Our App Now</h2>
              </Fade>
              <div style={{ maxWidth: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fade bottom cascade>
                  <img style={{ marginRight: '10px', width: '100%' }} onClick={() => {
                    window.open('https://play.google.com/store/apps/details?id=com.pureartisan', '_blank')
                  }} alt='should add art' src={GoogleStore} />
                  <img style={{ width: '100%' }} onClick={() => {
                    window.open('https://apps.apple.com/us/app/pure-artisan/id1474002500', '_blank')
                  }} src={IphoneStore} alt='should add art' />
                </Fade>
              </div>
            </div>
          </div>
        </div>
        <div className='subscribe-channel'>
        <Slide left><h1>Subscribe to Our Newsletter</h1></Slide>
        <Slide right><div className="search-box1" style={{ ...searchStyle }}>
                    <Input onKeyDown={e => {
                        if (e.which === 13 || e.keyCode === 13) {
                            this.handleSearch(e)
                        }
                    }} onSubmit={this.handleSearch} name='searchText' onChange={e => {
                        this.setState({
                            searchText: e.target.value
                        })
                    }} style={{ width: this.state.windowWidth <= 768 ? '100%' : '50%', border: 'solid 1px gray', borderRadius: 15, backgroundColor: '#eeeeee', alignItems:'center' }} size="large" placeholder="Enter your email here.." />
                </div></Slide>
        </div>
        <Modal visible={this.state.showShareModal} onCancel={() => { this.setState({ showShareModal: false }) }}>
          <img
            src={this.state.selectedItem !== null ? this.state.selectedItem.imageLinks[0] : ""}
            alt='nothing'
            style={{ width: '100%', height: 300 }}
          />
          <br />
          <br />
          <br />
          <div>
            <Tooltip title={this.state.copyText} placement='topLeft' arrowPointAtCenter>
              <Input
                onClick={() => {
                  console.log('shdfoaisdhf')
                  this.listingURL.select();
                  document.execCommand('copy');
                  this.setState({
                    copyText: "Copied"
                  })
                  setTimeout(() => {
                    this.setState({
                      copyText: "Click to Copy"
                    })
                  }, 2000)
                }}
                ref={(listingURL) => this.listingURL = listingURL}
                value={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`}

              />
            </Tooltip>
          </div>
          <br />
          <br />

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>

            <Facebook solidcircle medium link={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`} />

            <Twitter solidcircle medium link={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`} />

            <Linkedin solidcircle medium link={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`} />

            <Tumblr solidcircle medium link={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`} />

            <Pinterest solidcircle medium link={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`} />

            <Reddit solidcircle medium link={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`} />

            <Xing solidcircle medium link={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`} />
            <Mail solidcircle medium link={`https://pureartisan.com/itemdescription/${this.state.selectedItem !== null ? this.state.selectedItem.listingID : "sad"}`} />

          </div>
          <br />

        </Modal>
        <Modal visible={this.state.showBuyModal} onCancel={() => { this.setState({ showBuyModal: false }) }}>
          <br />
          <img
            src={this.state.selectedListing !== null ? this.state.selectedListing.imageLinks[0] : ""}
            alt='nothing'
            style={{ width: '100%', height: 300 }}
          />
          <br />
          <h2 style={{ textAlign: "center" }}>{this.state.selectedListing !== null ? this.state.selectedListing.title : "No Title"}</h2>
          <h3>Price: ${this.state.selectedListing !== null ? this.state.selectedListing.price : "0"}</h3>
          <br />
          <br />
          <h4>{this.state.selectedListing !== null ? this.state.selectedListing.description : "No Description"}</h4>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
            <StripeCheckout
              style={{ width: 250, borderRadius: 30, marginBottom: 10 }}
              amount={this.state.selectedListing !== null ? this.state.selectedListing.price * 100 : "495"}
              description={this.state.selectedListing != null ? this.state.selectedListing.description : "No description"}
              image="https://d33wubrfki0l68.cloudfront.net/ca0061c3c33c88b2b124e64ad341e15e2a17af49/c8765/images/alligator-logo3.svg"
              locale="auto"
              name={this.state.selectedListing !== null ? this.state.selectedListing.title : "No Title"}
              label='Pay with Stripe'
              stripeKey="pk_test_1CMaItiiBzBcG04N2X5l8WSU001Sc0miox"
              token={this.onToken}
              zipCode
            />


            <PaypalBtn
              env={env}
              client={client}
              currency={currency}
              total={this.state.selectedListing !== null ? this.state.selectedListing.price : total}
              locale={locale}
              style={style}
              onError={onError}
              onSuccess={onSuccess} />
          </div>
          <br />

        </Modal>
        <Footer />

      </div>
    )
  }
}
function mapStateToProps(state) {
  return ({
    categories: state.rootReducer.categories,
    UID: state.rootReducer.UID,
    query: state.rootReducer.query,
    data: state.rootReducer.data,
    currentLocation: state.rootReducer.currentLocation,
    serviceData: state.ExclusiveServicesReducer.ExclusiveServicesData
  })
}
function mapActionsToProps(dispatch) {
  return ({
    setCategories: (categories) => {
      dispatch(setCategoriesAction(categories))
    },
    setListingsCategories: (categories) => {
      dispatch(setListingsCategoriesAction(categories))
    },
    addtListings: (data) => {
      dispatch(addtListingsAction(data))
    },
    renderItem: (item) => {
      dispatch(renderItemAction(item))
    },
    setSubCategories: (data) => {
      dispatch(setSubCategoriesAction(data))
    },
    setLocation: (location) => {
      dispatch(setLocationAction(location))
    },
    readService: () => {
      dispatch(ReadExclusiveServices())
    },
    favoriteItem: (id) => {
      dispatch(favoriteItemAction(id))
    },
    setUID: (UID) => {
      dispatch(setUIDAction(UID))
    },
    setFavorite: (type) => {
      dispatch(setFavoriteAction(type))
    }
  })
}
export default connect(mapStateToProps, mapActionsToProps)(Home)
