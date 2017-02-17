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
      stopPos:''
    }
  },

  componentDidMount(){
		var self = this
    var startPos = dom(self.refs.contain).getBoundingClientRect().top
    var height = dom(self.refs.contain).scrollHeight;
    //console.log(startPos)
		window.addEventListener("scroll", function(event) {
			var top = this.scrollY
			if(top>startPos+height&&top<self.state.stopPos){
				dom(self.refs.contain).style.top = top-height+'px';
			}
      // else if(top==0){
			// 	dom(self.refs.contain).style.top = startPos+'px';
      //   //console.log(startPos+'px')
			// }
		});
	},

  componentWillReceiveProps(nextProps){
    if(nextProps.stop != this.props.stop){
      this.setState({stopPos:nextProps.stop})
    }
  },

  mapTrending(data,index){
    return(
      <Link to='#' key={index}><TrendingSideBarInner detail={data}/></Link>
    )
  },

  render(){
    return(
      <Container style={{...this.props.style}} ref='contain'>
        <Divider/>
        <Head>NOW TRENDING</Head>
        {this.props.detail.map(this.mapTrending)}
        <Divider/>
      </Container>
    )
  },
})
  
   
export default TrendingSideBar;