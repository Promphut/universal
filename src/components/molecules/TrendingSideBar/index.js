import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {TrendingSideBarInner} from 'components'
import {findDOMNode as dom} from 'react-dom'

const Container = styled.div`
  width:324px;
  position:relative;
`
const Head = styled.div`
  color:#8F8F8F;
  font-size:20px;
  width:171px;
  text-align:center;
  margin:20px auto 15px auto;
  border:1px solid #E2E2E2;
  background:white;
  padding:2px;
  font-family:'Nunito'
`
const Divider =styled.div`
  height:1px;
  width:100%;
  background-color:#E2E2E2;
  top:35px;
  z-index:-5;
  position:relative;
`
const Column = styled.div`
  font-weight:bold;
  font-size:36px;
  color:#00B2B4;
  text-align:center;
`

//if height less than 900px remove last item

const TrendingSideBar = React.createClass({
  getInitialState(){
    return{
      stopPos:this.props.stop
    }
  },

  // componentDidMount(){
  //   this.Slider()
	// },

  // Slider(){
  //   var self = this
  //   var item = dom(self.refs.contain)
  //   var startPos = item.getBoundingClientRect().top
  //   var height = item.scrollHeight;
  //   var direction = 0
	// 	window.addEventListener("scroll", function(event) {
	// 		var top = this.scrollY
  //     var stopPos = self.state.stopPos
  //     //console.log(height +' : '+startPos+' : '+top +' : '+stopPos)
  //     if(top>direction){
  //       if(top>=startPos-60&&top<=stopPos-height){
  //         item.style.top = top-startPos+'px';
  //       }
  //     }else{
  //       if(top>=startPos&&top<=stopPos-height){
  //         item.style.top =  top-startPos+'px';
  //       }
  //     }
  //     direction = top
	// 	});
  // },

  componentWillReceiveProps(nextProps){
    if(nextProps.stop != this.props.stop){
      this.setState({stopPos:nextProps.stop})
    }
  },

  render(){
    var {style,detail} = this.props
    return(
      <Container style={{...style}} ref='contain'>
        <Divider/>
        <Head>NOW TRENDING</Head>
        {detail.map((data,index)=><Link to='#' key={index}><TrendingSideBarInner detail={data}/></Link>)}
        <Divider/>
      </Container>
    )
  },
})
  
   
export default TrendingSideBar;