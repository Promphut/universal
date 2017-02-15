import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {TrendingSideBarInner} from 'components'
import {findDOMNode as dom} from 'react-dom'

const Container = styled.div`
  width:324px;
  margin-top:50px;
  position:relative;
`

const Head = styled.div`
  color:#8F8F8F;
  font-size:20px;
  text-align:center;
  margin:20px 0 15px 0;
`
const Divider =styled.div`
  height:1px;
  width:100%;
  background-color:#E2E2E2;
  margin:15px 0 15px 0;
`
const Column = styled.div`
  font-weight:bold;
  font-size:36px;
  color:#00B2B4;
  text-align:center;
`

const TrendingSideBar = React.createClass({
  getInitialState(){
    return{
      startPos:'',
      stopPos:''
    }
  },

  componentDidMount(){
		var self = this
		window.addEventListener("scroll", function(event) {
			var top = this.scrollY
			if(top>600&&top<self.state.stopPos-100){
				dom(self.refs.contain).style.top = top-600+'px';
			}else if(top==0){
				dom(self.refs.contain).style.top = self.state.startPos+'px';
			}else if(top>self.state.stopPos-100){
				dom(self.refs.contain).style.top = self.state.stopPos-730+'px';
			}
		});
	},

  componentWillReceiveProps(nextProps){
    if(nextProps.start != this.props.start){
      this.setState({
        startPos:nextProps.start,
        stopPos:nextProps.stop
      })
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
        <Head>Trending Stories in</Head>
        <Column>Fund</Column>
        <Divider/>
        {this.props.detail.map(this.mapTrending)}
        <Divider/>
      </Container>
    )
  },
})
  
   
export default TrendingSideBar;