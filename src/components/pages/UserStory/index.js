import React from 'react'
import { TopBarWithNavigation,ArticleBox,ArticleBoxLarge,More,TrendingSideBar,BGImg,StoryMenu } from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
//import Request from 'superagent'
import Avatar from 'material-ui/Avatar'
import auth from 'components/auth'
import api from 'components/api'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress';

const Wrapper = styled.div`

`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding:50px 0 50px 0;
`

const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const Feed = styled.div`
	flex: 12 1120px;
	max-width: 1120px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		min-width: 100%;
		padding:0 15px 0 15px;
  }
`

const Aside = styled.div`
	flex: 3 325px;
	position:relative;
	max-width: 325px;
	margin-left:60px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const Text = styled.div`
	color:#8F8F8F;
	font-size:19px;
`

const TextLine = styled.div`
	color:#8F8F8F;
	font-size:19px;
	border-bottom:1px solid #E2E2E2;
	padding-bottom:11px;
`

const UserName = styled.div`
  color:#000;
  font-size:26px;
  font-weight:bold;
`

const UserDesc = styled.div`
  color:#8F8F8F;
  margin:10px 0 0 0;
  font-size:16px;
  width:220px;
`
const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`

const A = styled.a`
	flex:1;
	textAlign:center;
	color:#c2c2c2;
`

const UserDetail = ({style, user,shareFB})=>{
	//console.log('user', user)
  return (
    <div className='row' style={{...style,margin:'50px 0 50px 0',display:'block',overflow:'hidden'}}>
      <Avatar src={user.pic.medium} size={95} style={{marginRight:'20px',float:'left'}}/>
      <div style={{marginTop:'10px',float:'left'}}>
        <UserName className='serif-font'>{user.display}</UserName>
        <UserDesc className='sans-font'>{user.intro}</UserDesc>
      </div>
      <div style={{float:'right',width:'250px',marginTop:'20px'}}>
        <div className='row' style={{overflow:'hidden'}}>
          <A href='#' onClick={shareFB}><i className="fa fa-facebook" aria-hidden="true"></i></A>
          <A href={config.TWT}><i className="fa fa-twitter" aria-hidden="true" ></i></A>
          <A><i className="fa fa-youtube-play" aria-hidden="true" ></i></A>
          <A><i className="fa fa-instagram" aria-hidden="true" ></i></A>
        </div>
        <UserDesc className='sans-font' style={{textAlign:'right',width:'250px'}}>{user.shortDesc}</UserDesc>
      </div>
    </div>
  )
}

const UserStory = React.createClass({
	getInitialState(){
		return {
			//feed:[],
			feedCount: 0,
			latestStories:[],
			page:0,
			isInfiniteLoading: false,
			loadOffset:300,
			feedCount:0,
			isMobile:false
		}
	},

	componentDidMount(){
		//this.getFeed()
	},

	// getFeed(){
	// 	let uid = auth.getUser()._id

	// 	api.getFeed('story', {writer:uid, status:1}, 'latest')
	// 	.then(result => {
	// 		this.setState({
	// 			feed: result.feed,
	// 			feedCount: result.count['1']
	// 		})
	// 	})

	// 	// var filter = JSON.stringify({writer:1,status:1})

	// 	// //console.log(path)
	// 	// Request
	// 	// .get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+filter+'&sort=latest')
	// 	// .set('Accept','application/json')
	// 	// .end((err,res)=>{
	// 	// 	if(err) throw err
	// 	// 	else{
	// 	// 		//console.log(res.body)
	// 	// 		this.setState({feed:res.body.feed})
	// 	// 	}
	// 	// })
	// },

	buildElements() {
		let page = this.state.page

		api.getFeed('story', {status:1}, 'latest', null, page, 10)
		.then(result => {
			var s = this.state.latestStories.concat(result.feed)
			this.setState({
				feedCount:result.count[1],
				latestStories:s,
			},()=>{
				if(s.length==result.count[1]){
					this.setState({
						loadOffset:'undefined',
						isInfiniteLoading: false,
					})
				}else{
					this.setState({
						isInfiniteLoading: false
					})
				}
			})
		})
	},

	handleInfiniteLoad() {
		//console.log('Onload')
		this.buildElements(this.state.page)
		this.setState({
				isInfiniteLoading: true,
				page:this.state.page+1
		});	
	},

	elementInfiniteLoad() {
			return <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>;
	},

	render(){
		//console.log('user', this.props)
		//var article = []
		let {feed, feedCount} = this.state
		var {count,loadOffset,isInfiniteLoading,latestStories,isMobile} = this.state

		return (
		    <Wrapper>
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} />
		      <Content >
			      <Main style={{marginTop:'100px'}}>
              <UserDetail user={this.props.params.user} shareFB={api.shareFB}/>
						<TextLine className='sans-font'>
							<strong style={{color:'#00B2B4',marginRight:'30px'}}>
								<span style={{fontSize:'30px'}}>{feedCount}</span> stories
							</strong>
							{/*<span style={{fontSize:'30px'}}>101</span> Upvotes*/}
						</TextLine>
							<Infinite
									containerHeight={!isMobile?(count*210)-100:(count*356)-100}
									elementHeight={!isMobile?210:356}
									infiniteLoadBeginEdgeOffset={loadOffset}
									onInfiniteLoad={this.handleInfiniteLoad}
									loadingSpinnerDelegate={this.elementInfiniteLoad()}
									isInfiniteLoading={isInfiniteLoading}
									useWindowAsScrollContainer={true}>

								{latestStories.length!=0?latestStories.map((story, index) => (
									<ArticleBox detail={story} key={index}/>
								)):''}
							</Infinite>
						<More style={{margin:'30px auto 30px auto'}} />
						<div ref='more'></div>
			      </Main>
		      </Content>
		   </Wrapper>
		  )
	}
});

export default UserStory;
