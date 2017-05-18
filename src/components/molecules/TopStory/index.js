import React from 'react'
import {BGImg} from 'components'
import styled,{keyframes} from 'styled-components'
import {Link} from 'react-router'

const LargeBox =styled(Link)`
  display:flex;
	flex:${props=>props.large?3:2};
	height:222px;
  @media (max-width:480px) {
    height:auto;
    padding:16px 0 16px 0;
    border-bottom:1px solid #E2E2E2;
    display:${props=>props.head?'block':'flex'};
  }
`
const MiniBox = styled(BGImg)`
	height:222px;
  transition: all 0.3s;
  transform: ${props=>props.hover?'scale(1.15)':'scale(1)'};
  z-index:-1;
  @media (max-width:480px) {
    height:${props=>props.head?props.height:'80'}px;
    margin-bottom:${props=>props.head?'10':'0'}px;
  }
`
const Box1 = styled.div`
  flex:${props=>props.large?2:1};
	height:222px;
  overflow: hidden;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @media (max-width:480px) {
    flex: 1 ;
    height:auto;
  }
`
const MiniBoxDark = styled.div`
	flex:1;
	height:222px;
	background-color:${props=>props.theme.primaryColor};
`
const MiniBoxLight = styled.div`
	flex:1;
	height:222px;
	background-color:white;
  @media (max-width:480px) {
    flex: 2 ;
  	height:auto;
    background:none;
  }
`
const ArrowLeft = styled.div`
	position:relative;
	left:-15px;
	top:96px;
	width:0;
	height:0;
	z-index:10; 
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left:15px solid ${props=>props.theme.primaryColor};
  @media (max-width:480px) {
    display:none;
  }
`
const ArrowRight = styled.div`
	position:relative;
	left:-15px;
	top:96px;
	width:0;
	height:0;
	z-index:10; 
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right:15px solid ${props=>props.theme.primaryColor};
  @media (max-width:480px) {
    display:none;
  }
`
const NewsBox = styled.div`
	flex:2;
	height:444px;
`
const SName = styled(Link)`
	font-size:18px;
  transition: all 0.3s;
  color:${props=>props.hover?props.theme.accentColor:'#222'};
  &:hover{
    color:${props=>props.theme.accentColor};
  }
  @media (max-width:480px) {
    color:white;
    font-size:14px;
  }
`
const HName = styled.div`
	text-transform: uppercase;
	color:#C4C4C4;
	font-size:14px;
	font-weight:bold;
  margin-bottom:8px;
  @media (max-width:480px) {
    font-size:10px;
    margin-bottom:4px;
    color:${props=>props.theme.accentColor};
  }
`
const Inner = styled.div`
  width:174px;
  margin:0 0 0 20px;
  @media (max-width:480px) {
    width:auto;
    margin:0 0 0 15px;
  }
`

const TopStory = React.createClass({
	getInitialState(){
		return {
      hover:false
		}
	},

	componentDidMount(){

	},
  hover(){
    this.setState({hover:true})
  },
  leave(){
    this.setState({hover:false})
  },

	render(){
    var {style,swift,className,large,head} = this.props
    var {cover,writer,column,votes,comments,updated,url,readTime,contentShort,ptitle} = this.props.detail
    var {hover} = this.state
    if(swift&&screen.width>480){
      return (
        <LargeBox to='#' head={head}  large={large} style={{...style}} className={' '+className} onMouseOver={this.hover} onMouseLeave={this.leave}>
          <MiniBoxLight>
            <ArrowLeft style={{marginLeft:'100%',left:'0px',borderLeft:'15px solid white'}}/>
            <Inner>
              <HName className='sans-font' style={{}}>TOP STORIES</HName>
              <SName hover={hover} to={this.props.detail&&url} className='nunito-font' >{_.truncate(ptitle?ptitle:'', {'length': 150,'separator': ''})}</SName>
            </Inner>
          </MiniBoxLight>
          <Box1 large={large}>
            <MiniBox hover={hover}  head={head} height={(screen.width-16)/2} src={cover&&cover.medium}  opacity={0.7}/>
          </Box1>
        </LargeBox>    
      )
    }else{
      return (
        <LargeBox to='#'  head={head} large={large} style={{...style}} className={' '+className} onMouseOver={this.hover} onMouseLeave={this.leave}>
          <Box1 large={large}>
            <MiniBox  head={head} height={(screen.width-16)/2} hover={hover} src={cover&&cover.medium}  opacity={0.7}/>
          </Box1>
          <MiniBoxLight>
            <ArrowRight style={{borderRight:'15px solid white',left:'-14px'}}/>
            <Inner>
              <HName className='sans-font' style={{}}>TOP STORIES</HName>
              <SName hover={hover} to={url} className='nunito-font' >{_.truncate(ptitle?ptitle:'', {'length': 150,'separator': ''})}</SName>
            </Inner>
          </MiniBoxLight>
        </LargeBox>    
      )
    }
	}
});

TopStory.contextTypes = {
	setting: React.PropTypes.object
};

export default TopStory;
