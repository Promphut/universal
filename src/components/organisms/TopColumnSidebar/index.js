import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {TrendingSideBarInner} from 'components'
import {findDOMNode as dom} from 'react-dom'

const Container = styled.div`
  width:324px;
  position:relative;
  .bg1{
    background-color:#00B2B4;
  }
  .bg2{
    background-color:#4FC2C3;
  }
  .bg3{
    background-color:#85CDCE;
  }
  .bg4{
    background-color:#9BD0D0;
  }
  .bg5{
    background-color:#BAE7E9;
  }
  .bg6{
    background-color:#DAF8F9;
  }
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

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	cursor: default;
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
const Div = styled.div`
  width:100%;
  padding:20px;
  display:flex;
`
const Number = styled.div`
  width:60px;
  height:60px;
  font-size:32px;
  text-align:center;
  padding:9px;
  font-weight:bold;
  float:left;
`
const Name = styled.div`
  color:#222;
  font-size:19px;
  font-weight:bold;
`
const Sty = styled.div`
  color:#8F8F8F;
  font-size:16px;
`
//if height less than 900px remove last item

const TopColumnSidebar = React.createClass({
  getInitialState(){
    return{
      stopPos:''
    }
  },

  componentDidMount(){

	},

  componentWillReceiveProps(nextProps){
    if(nextProps.stop != this.props.stop){
      this.setState({stopPos:nextProps.stop})
    }
  },

  render(){
    var Sort = []
    for(let i=0;i<6;i++){
      Sort.push(
        <Div className='serif-font' key={i}>
          <Number className={'bg'+(1+i)}>{i+1}</Number>
          <div style={{padding:'10px 30px 0 30px'}}>
            <Name>Money Ideas</Name>
            <Sty className='sans-font'>31 Stories</Sty>
          </div>
        </Div>
      )
    }
    return(
      <Container style={{...this.props.style}} ref='contain'>
        <Divider/>
        <Head>TOP COLUMNS</Head>
          {Sort}
        <Divider/>
      </Container>
    )
  },
})


export default TopColumnSidebar;
