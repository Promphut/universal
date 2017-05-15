import React from 'react'
import {BGImg} from 'components'
import styled,{keyframes} from 'styled-components'
import {Link} from 'react-router'
import api from 'components/api' 
import moment from 'moment'

const NewsBox = styled.div`
	flex:2;
	height:444px;
  padding:18px;
  background:white;
`
const News = styled.div`
  color:${props=>props.theme.primaryColor};
  font-size:20px;
  font-weight:bold;
`
const Dash = styled.div`
  margin:5px 0 0 0;
  width:30px;
  height:4px;
  background-color:${props=>props.theme.accentColor};
`
const VerticalTimeline = styled.div`
  width:8px;
  position:relative;
  height:100%;
  margin:0 5px 0 0px;
  border-radius:2em;
  background-color:#F4F4F4;
  position:relative;
  min-height:50px;
`
const Doughnut = styled.div`
  margin:0 5px 0 0px;
  border: 1px solid ${props=>props.theme.accentColor};
  border-radius: 50%;
  height:8px;
  width:8px;
`
const NameLink = styled(Link)`
  display: block;
  color:#222;
  font-weight:bold;
  font-size:14px;
  &:hover{
    color:${props=>props.theme.accentColor}
  }
  @media (max-width:480px) {
    font-size:12px;
  }
`
const Time = styled.div`
  color:#8E8E8E;
  font-size:12px;
  @media (max-width:480px) {
    margin-bottom:10px;
  }
`
const Box = styled.div`
  display:block;
  overflow:hidden;
  min-height:50px;
  height:auto;
`
const BoxInner = styled.div`
  margin:20px 0 0 0;
  overflow:auto;
  width:100%;
  height:90%;
  position:relative;
`
const Grad = styled.div`
  position:relative;
  width:100%;
  height:100%;
  z-index:5;
  background: rgba(255,255,255,0);
background: -moz-linear-gradient(top, rgba(255,255,255,0) 48%, rgba(255,255,255,1) 100%);
background: -webkit-gradient(left top, left bottom, color-stop(48%, rgba(255,255,255,0)), color-stop(100%, rgba(255,255,255,1)));
background: -webkit-linear-gradient(top, rgba(255,255,255,0) 48%, rgba(255,255,255,1) 100%);
background: -o-linear-gradient(top, rgba(255,255,255,0) 48%, rgba(255,255,255,1) 100%);
background: -ms-linear-gradient(top, rgba(255,255,255,0) 48%, rgba(255,255,255,1) 100%);
background: linear-gradient(to bottom, rgba(255,255,255,0) 48%, rgba(255,255,255,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );
`
const TopNewsHome = React.createClass({
	getInitialState(){
		return {
      hover:false,
      news:[],
		}
	},

	componentDidMount(){
    this.getFeed()
	},

  getFeed(){
		// - Fetching latestStories
		api.getFeed('news', {status:1}, 'latest', null, 0, 10)
		.then(result => {
			if(result) {
				this.setState({
					news:result.feed
				})
			}
		})
	},
  hover(){
    this.setState({hover:true})
  },
  leave(){
    this.setState({hover:false})
  },

	render(){
    var {theme} = this.context.setting.publisher
    var {style,swift,className,large} = this.props
    var {hover,news} = this.state
    //console.log(news)
    return (
      <NewsBox>
        <News>NEWS</News>
        <Dash/>
        <BoxInner>
          {news.length!=0&&news.map((val,ind)=>(
            <Box>
              <div className='hidden-mob' style={{float:'left',marginRight:'10px',overflow:'hidden'}}>
                <Doughnut/>
                <VerticalTimeline/>
              </div>
              <NameLink to={val.url} className='nunito-font' >{val.ptitle}</NameLink>
              <Time className='sans-font'>{moment(val.published).fromNow()}</Time>
            </Box>
          ))}
        </BoxInner>

      </NewsBox>
    )
	}
});

TopNewsHome.contextTypes = {
	setting: React.PropTypes.object
};

export default TopNewsHome;
