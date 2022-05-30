import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-multi-carousel/lib/styles.css';
import 'antd/dist/antd.css';
import './index.scss'
import { Provider } from "react-redux";
import store from './store/index'


require('react-web-vector-icons/fonts');
class Root extends React.Component {
    render(){
        return(
            <Provider store={store}><App/></Provider>
        )
    }
}


ReactDOM.render(<Root />, document.getElementById('root'));
