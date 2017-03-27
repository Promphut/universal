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
	padding: 25px 0 50px 0;
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

const User = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 80px 0px 15px 0px;

	@media (max-width: 480px) {
		background: ${props=> props.theme.primaryColor};
		padding-top: 60px;
		padding: 60px 0px 0px 0px;
	}
`

const UserAvatar = styled(Avatar)`
	margin-right: 20px;
	float: left;

	@media (max-width: 480px) {
		height: 80px !important;
		width: 80px !important;
		float: none;
		border: 2px solid #FFF;
		margin-right: 0px;
	}
`

const UserData = styled.div`
	float: left;

	@media (max-width: 480px) {
		float: none;
	}
`

const UserName = styled.div`
  color:#000;
  font-size:26px;
  font-weight:bold;

	@media (max-width: 480px) {
		display: flex;
		justify-content: center;
	  color: #FFF;
		margin: 10px 0px;
		font-weight: normal;
	}
`

const UserDesc = styled.div`
  color: #8F8F8F;
  margin: 10px 10px 0px;
  font-size: 16px;
  width: 220px;

	@media (max-width: 480px) {
		flex: 1;
		justify-content: center;
		width: auto;
	  color: #C2C2C2;
		textAlign: center;
	}
`

const UserShare = styled.div`
	float: right;
	width: 225px;
	margin-top: 10px;

	@media (max-width: 480px) {
		display: none;
	}
`

const UserShareMobile = styled.div`
	overflow:'hidden'
	display: none;

	@media (max-width: 480px) {
		display: flex;
		justify-content: center;
		marginTop: 20px;
	}
`

const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`

const A = styled.a`
	flex: 1;
	textAlign: center;
	color: #c2c2c2;
	cursor: pointer;
`

const LinkMobile = styled.a`
	textAlign: center;
	color: #C2C2C2;
	cursor: pointer;
	width: 50px;
	font-size: 20px;
`

const UserDetail = ({style, user, shareFB}) => {
	const backStyle = {
		color: '#FFF',
		fontSize: '40px',
		position: 'absolute',
		top: '10px',
		left: '5px'
	}

	const rowStyle = {
		...style,
		margin: '50px 0 20px 0',
		display: 'block',
		overflow: 'hidden',
		maxWidth: '730px',
		flex: '8 730px'
	}
	//console.log('user', user)
  return (
		<User>
	    <div className='row' style={rowStyle}>
				<FontIcon className="material-icons hidden-des" style={backStyle}>chevron_left</FontIcon>
				<div style={{textAlign: 'center'}}>
      		<UserAvatar src={user.pic.medium} size={95}/>
				</div>
				<UserData>
	        <UserName className='serif-font'>{user.display}</UserName>
      	  <UserDesc className='sans-font'>{user.intro}</UserDesc>
	      </UserData>
	      <UserShare>
	        <div className='row' style={{overflow:'hidden'}}>
	          <A href='#' onClick={shareFB}><i className="fa fa-facebook" aria-hidden="true"></i></A>
	          <A href={config.TWT}><i className="fa fa-twitter" aria-hidden="true" ></i></A>
	          <A><i className="fa fa-youtube-play" aria-hidden="true" ></i></A>
	          <A><i className="fa fa-instagram" aria-hidden="true" ></i></A>
	        </div>
	      </UserShare>
	    </div>
		</User>
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
			loadOffset:300
			//popular:[]
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

	buildElements(page) {
		let uid = auth.getUser()._id
		api.getFeed('story', {writer:parseInt(uid),status:1}, 'latest', null, page, 10)
		.then(result => {
			//console.log(result.count[1])
			this.setState({
				latestStories:this.state.latestStories.concat(result.feed),
				feedCount:result.count[1]
			},()=>{
				if (this.state.latestStories.length==result.count[1]){
					this.setState({
						isInfiniteLoading: false,
						loadOffset:'undefined'
					})
				} else {
					this.setState({
						isInfiniteLoading: false
					})
				}
			})
		})
	},

	handleInfiniteLoad() {
		//console.log('onload')
		this.setState({
				isInfiniteLoading: true
		});
		this.buildElements(this.state.page)
		this.setState({
				page:this.state.page+1
		});
	},

	elementInfiniteLoad() {
			return <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>;
	},

	render(){
    var {theme} = this.context.setting.publisher
		//console.log('user', this.props)
		//var article = []
		let {feed, feedCount} = this.state

		return (
		    <Wrapper>
		      <TopBarWithNavigation className="hidden-mob" title={'Title of AomMoney goes here..'} />
					<UserDetail user={this.props.params.user} shareFB={api.shareFB}/>
					<UserShareMobile className='row'>
	          <LinkMobile href='#' onClick={api.shareFB}><i className="fa fa-facebook" aria-hidden="true"></i></LinkMobile>
	          <LinkMobile href={config.TWT}><i className="fa fa-twitter" aria-hidden="true" ></i></LinkMobile>
	          <LinkMobile><i className="fa fa-youtube-play" aria-hidden="true" ></i></LinkMobile>
	          <LinkMobile><i className="fa fa-instagram" aria-hidden="true" ></i></LinkMobile>
		 			</UserShareMobile>
		      <Content>
			      <Main>
						<TextLine className='sans-font'>
							<strong style={{color:theme.primaryColor,marginRight:'30px'}}>
								<span style={{fontSize:'30px'}}>{feedCount}</span> stories
							</strong>
							{/*<span style={{fontSize:'30px'}}>101</span> Upvotes*/}
						</TextLine>
						<Infinite
									elementHeight={210}
									infiniteLoadBeginEdgeOffset={this.state.loadOffset}
									onInfiniteLoad={this.handleInfiniteLoad}
									loadingSpinnerDelegate={this.elementInfiniteLoad()}
									isInfiniteLoading={this.state.isInfiniteLoading}
									useWindowAsScrollContainer={true}>

								{this.state.latestStories.length!=0?this.state.latestStories.map((story, index) => (
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


UserStory.contextTypes = {
	setting: React.PropTypes.object
};

export default UserStory;
