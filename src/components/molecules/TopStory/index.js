import React from 'react'
import {BGImg} from 'components'
import styled,{keyframes} from 'styled-components'
import {Link} from 'react-router'

const LargeBox =styled(Link)`
  display:flex;
	flex:${props=>props.large?3:2};
	height:222px;
`
const MiniBox = styled(BGImg)`
	height:222px;
  transition: all 0.3s;
  transform: ${props=>props.hover?'scale(1.15)':'scale(1)'};
  z-index:-1;
`
const Box1 = styled.div`
  flex:${props=>props.large?2:1};
	height:222px;
  overflow: hidden;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
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
`
const HName = styled.div`
	text-transform: uppercase;
	color:#C4C4C4;
	font-size:14px;
	font-weight:bold;
  margin-bottom:8px;
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
    var {style,swift,className,large} = this.props
    var {hover} = this.state
    if(swift){
      return (
        <LargeBox to='#' large={large} style={{...style}} className={' '+className} onMouseOver={this.hover} onMouseLeave={this.leave}>
          <MiniBoxLight>
            <ArrowLeft style={{marginLeft:'100%',left:'0px',borderLeft:'15px solid white'}}/>
            <div style={{width:'174px',margin:'0 0 0 20px'}}>
              <HName className='sans-font' style={{}}>TOP STORIES</HName>
              <SName hover={hover} to={'#'} className='nunito-font' >“เน็ตมือถือไม่พอใช้” ปัญหาใหญ่ของผู้ใช้ สมาร์ทโฟนชาวไทยในยุคนี้</SName>
            </div>
          </MiniBoxLight>
          <Box1 large={large}>
            <MiniBox hover={hover} src={'/tmp/story-list/1486687443533-Dakota.jpeg'}  opacity={0.7}/>
          </Box1>
        </LargeBox>    
      )
    }else{
      return (
        <LargeBox to='#' large={large} style={{...style}} className={' '+className} onMouseOver={this.hover} onMouseLeave={this.leave}>
          <Box1 large={large}>
            <MiniBox hover={hover} src={'/tmp/story-list/1486687443533-Dakota.jpeg'}  opacity={0.7}/>
          </Box1>
          <MiniBoxLight>
            <ArrowRight style={{borderRight:'15px solid white',left:'-14px'}}/>
            <div style={{width:'174px',margin:'0 0 0 20px'}}>
              <HName className='sans-font' style={{}}>TOP STORIES</HName>
              <SName hover={hover} to={'#'} className='nunito-font' >“เน็ตมือถือไม่พอใช้” ปัญหาใหญ่ของผู้ใช้ สมาร์ทโฟนชาวไทยในยุคนี้</SName>
            </div>
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
