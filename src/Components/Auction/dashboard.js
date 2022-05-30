import React from 'react'
import Confetti from 'react-confetti'
import { Link } from "react-router-dom";
const width = window.screen.width;
const height = window.screen.height;

export default class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state={
      wind:0.1
    }
  }
  componentDidMount(){
    setInterval(()=>{
      let number = Math.random()/10
      this.setState({
        wind:number
      })
    },2000)
  }
  render(){
  return (
    <div>

    <Confetti
      width={width}
      height={height}
      wind={this.state.wind}
      numberOfPieces={300}
    />
    <div style={{marginTop:'20%'}}>
    <h1 style={{textAlign:"center",fontSize:32}}>
    COMING SOON...
    </h1>
    <h3 style={{textAlign:"center"}}>Something exciting is underway</h3>
    <h3 style={{textAlign:"center",fontSize:18}}>
      <Link to='/' >
        Go Back
      </Link>
    </h3>
    </div>
    </div>
  )
  }
}