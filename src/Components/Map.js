// import React from 'react';
// import ReactDOM from 'react-dom';

// const mapStyles = {
//   map: {
//     position: 'absolute',
//     width: '70%',
//     height: '70%'
//   }
// };
// export default class CurrentLocation extends React.Component{
//     constructor(props) {
//         super(props);
    
//         const { lat, lng } = this.props.initialCenter;
//         this.state = {
//           currentLocation: {
//             lat: lat,
//             lng: lng
//           }
//         };
//       }
//       componentDidUpdate(prevProps, prevState) {
//         if (prevProps.google !== this.props.google) {
//           this.loadMap();
//         }
//         if (prevState.currentLocation !== this.state.currentLocation) {
//           this.recenterMap();
//         }
//       }
//       recenterMap() {
//         const map = this.map;
//         const current = this.state.currentLocation;
    
//         const google = this.props.google;
//         const maps = google.maps;
    
//         if (map) {
//           let center = new maps.LatLng(current.lat, current.lng);
//           map.panTo(center);
//         }
//       }
//       componentDidMount() {
//         if (this.props.centerAroundCurrentLocation) {
//           if (navigator && navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(pos => {
//               const coords = pos.coords;
//               this.setState({
//                 currentLocation: {
//                   lat: coords.latitude,
//                   lng: coords.longitude
//                 }
//               });
//             });
//           }
//         }
//         this.loadMap();
//       }
//       loadMap() {
//         if (this.props && this.props.google) {
//           // checks if google is available
//           const { google } = this.props;
//           const maps = google.maps;
    
//           const mapRef = this.refs.map;
    
//           // reference to the actual DOM element
//           const node = ReactDOM.findDOMNode(mapRef);
    
//           let { zoom } = this.props;
//           const { lat, lng } = this.state.currentLocation;
//           const center = new maps.LatLng(lat, lng);
//           const mapConfig = Object.assign(
//             {},
//             {
//               center: center,
//               zoom: zoom
//             }
//           );
    
//           // maps.Map() is constructor that instantiates the map
//           this.map = new maps.Map(node, mapConfig);
//         }
//       }
//       renderChildren() {
//         const { children } = this.props;
    
//         if (!children) return;
    
//         return React.Children.map(children, c => {
//           if (!c) return;
//           return React.cloneElement(c, {
//             map: this.map,
//             google: this.props.google,
//             mapCenter: this.state.currentLocation
//           });
//         });
//       }

//       render() {
//         const style = Object.assign({}, mapStyles.map);
//        return (
//          <div>
//            <div style={style} ref="map">
//              Loading map...
//            </div>
//            {this.renderChildren()}
//          </div>
//        );
//      }
// }

// CurrentLocation.defaultProps = {
//     zoom: 14,
//     initialCenter: {
//       lat: -1.2884,
//       lng: 36.8233
//     },
//     centerAroundCurrentLocation: false,
//     visible: true
//   };
import React from 'react';
import ReactDOM from 'react-dom';
import { setLocationAction } from "../store/actions/actions";
import { connect } from 'react-redux';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '70%',
    height: '70%'
  }
};
class CurrentLocation extends React.Component{
    constructor(props) {
        super(props);
    
        const { lat, lng } = this.props.initialCenter;
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng
          }
        };
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
        if (prevState.currentLocation !== this.props.currentLocation) {
          this.recenterMap();
        }
      }
      recenterMap() {
        const map = this.map;
        const current = this.props.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
          let center = new maps.LatLng(current.lat, current.lng);
          map.panTo(center);
        }
      }
      componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              this.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
              let obj = {
                  lat: coords.latitude,
                  lng: coords.longitude
              }
              this.props.setLocation(obj)
            });
          }
        }
        this.loadMap();
      }
      loadMap() {
        if (this.props && this.props.google) {
          // checks if google is available
          const { google } = this.props;
          const maps = google.maps;
    
          const mapRef = this.refs.map;
    
          // reference to the actual DOM element
          const node = ReactDOM.findDOMNode(mapRef);
    
          let { zoom } = this.props;
          const { lat, lng } = this.props.currentLocation;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: zoom
            }
          );
    
          // maps.Map() is constructor that instantiates the map
          this.map = new maps.Map(node, mapConfig);
        }
      }
      renderChildren() {
        const { children } = this.props;
    
        if (!children) return;
    
        return React.Children.map(children, c => {
          if (!c) return;
          return React.cloneElement(c, {
            map: this.map,
            google: this.props.google,
            mapCenter: this.props.currentLocation
          });
        });
      }

      render() {
        const style = Object.assign({}, mapStyles.map);
       return (
         <div>
           <div style={style} ref="map">
             Loading map...
           </div>
           {this.renderChildren()}
         </div>
       );
     }
}

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
      lat: -1.2884,
      lng: 36.8233
    },
    centerAroundCurrentLocation: false,
    visible: true
  };

  function mapStateToProps(state) {
    return ({
        categories:state.rootReducer.categories,
        currentLocation:state.rootReducer.currentLocation
    })
}
function mapActionsToProps(dispatch) {
    return ({
      setLocation:(location)=>{
        dispatch(setLocationAction(location))
      }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(CurrentLocation)