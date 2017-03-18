import React from 'react'
import { PageTemplate, TopBarWithNavigation, OverlayImg, Thumpnail, 
	ThumpnailSmall,ArticleBox,ArticleBoxLarge,ThumpnailRow,TopColumnSidebar,TopWriterSidebar,More} from 'components'
import styled from 'styled-components'
import Request from 'superagent'
import auth from 'components/auth'
import slider from 'react-slick'

const Wrapper = styled.div`
	
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding:50px 0 0 0;
`

const Main = styled.div`
	flex: 3 790px;
	max-width: 790px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		min-width: 100%;
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
	flex: 1 350px;
	max-width: 350px;

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

const Footer = styled.div`
	text-align:center;
	background: lightgreen;
	height:400px;
`

const HomePage2 = React.createClass({
	getInitialState(){
		return {
			feed:[],
			popular:[]
		}
	},

	updateDimensions(){
		// this.setState({
		// 	width: window.getWidth(), 
		// 	height: window.getHeight()
		// });
	},

	componentWillMount(){
		//this.updateDimensions();

		// when enter this page, update the token.
     	auth.updateCookie()
	},
	componentDidMount(){
		this.getFeed()
	},

	getFeed(){
		var self = this
		var filter = JSON.stringify({status:1})
		//console.log(path)
		Request
		.get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+filter+'&sort=latest')
		.set('Accept','application/json')
		.end((err,res)=>{
			if(err) throw err
			else{
				//console.log(res.body)
				self.setState({feed:res.body.feed})
			}
		})
		Request
		.get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+filter+'&sort=popular')
		.set('Accept','application/json')
		.end((err,res)=>{
			if(err) throw err
			else{
				self.setState({popular:res.body.feed})
				//console.log(self.state.popular)
			}
		})
	},
	
	render(){
		var {feed,popular} = this.state
		return (
		    <Wrapper>

		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} />
		      {/*<TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={this.props.params.loggedIn} />*/}
		      {/*<OverlayImg style={{width:'100%',height:'90vh'}} src="/tmp/a-story/pic-min.jpg"/>*/}

					<Content style={{paddingTop:'100px'}}>
						<Feed>
							<div className='row' style={{display:'block',overflow:'hidden'}}>
								<Text className='sans-font' style={{float:'left'}}>Trending Now</Text>
								<Text className='sans-font' style={{fontSize:'14px',float:'right',margin:'5px'}}>View more</Text>
							</div>
							{popular.length!=0?<ThumpnailRow detail={popular} style={{margin:'20px 0 30px 0'}}/>:''}
							{popular.length!=0?<ThumpnailRow detail={popular} size='small' style={{margin:'30px 0 30px 0'}}/>:''}
						</Feed>
					</Content>	
		      <Content >
			      <Main>
							<TextLine className='sans-font'>Latest</TextLine>
							{/*{article}*/}
							{feed.map((data,index)=>(
								index%3==0?<ArticleBoxLarge detail={data} key={index}/>:<ArticleBox detail={data} key={index}/>
							))}
							<More style={{margin:'30px auto 30px auto'}}/>
			      </Main>
			      <Aside>
							<TopColumnSidebar />
							<TopWriterSidebar />
						</Aside>
		      </Content>
		   </Wrapper>
		  )
	}
});

export default HomePage2;