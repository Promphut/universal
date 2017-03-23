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

const UserDetail = ({style, user})=>{
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
          <i className="fa fa-facebook" aria-hidden="true" style={{flex:1,textAlign:'center',color:'#C2C2C2'}}></i>
          <i className="fa fa-twitter" aria-hidden="true" style={{flex:1,textAlign:'center',color:'#C2C2C2'}}></i>
          <i className="fa fa-youtube-play" aria-hidden="true" style={{flex:1,textAlign:'center',color:'#C2C2C2'}}></i>
          <i className="fa fa-instagram" aria-hidden="true" style={{flex:1,textAlign:'center',color:'#C2C2C2'}}></i>
        </div>
        <UserDesc className='sans-font' style={{textAlign:'right',width:'250px'}}>{user.shortDesc}</UserDesc>
      </div>
    </div>
  )
}

const UserStory = React.createClass({
	getInitialState(){
		return {
			stopPos:0,
			feed:[],
			feedCount: 0,
			//popular:[]
		}
	},

	componentDidMount(){
		this.getFeed()
		this.setState({
			stopPos:dom(this.refs.more).getBoundingClientRect().top
		})
	},

	getFeed(){
		let uid = auth.getUser()._id

		api.getFeed('story', {writer:uid, status:1}, 'latest')
		.then(result => {
			this.setState({
				feed: result.feed,
				feedCount: result.count['1']
			})
		})

		// var filter = JSON.stringify({writer:1,status:1})

		// //console.log(path)
		// Request
		// .get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+filter+'&sort=latest')
		// .set('Accept','application/json')
		// .end((err,res)=>{
		// 	if(err) throw err
		// 	else{
		// 		//console.log(res.body)
		// 		this.setState({feed:res.body.feed})
		// 	}
		// })
	},

	render(){
		//console.log('user', this.props)
		//var article = []
		let {feed, feedCount} = this.state

		return (
		    <Wrapper>
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} />
		      <Content >
			      <Main style={{marginTop:'100px'}}>
              			<UserDetail user={this.props.params.user}/>
						<TextLine className='sans-font'>
							<strong style={{color:'#00B2B4',marginRight:'30px'}}>
								<span style={{fontSize:'30px'}}>{feedCount}</span> stories
							</strong> 
							{/*<span style={{fontSize:'30px'}}>101</span> Upvotes*/}
						</TextLine>
						{feed.map((data, index) => (
							index%3==0 ? <ArticleBoxLarge detail={data} key={index}/> : <ArticleBox detail={data} key={index}/>
						))}
						<More style={{margin:'30px auto 30px auto'}} />
						<div ref='more'></div>
			      </Main>
		      </Content>
		   </Wrapper>
		  )
	}
});

export default UserStory;