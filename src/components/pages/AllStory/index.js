import React from 'react'
import {TopBarWithNavigation, ArticleBox, ArticleBoxLarge, More,
	TrendingSideBar, BGImg, StoryMenu, ColumnThumpnailRow} from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Request from 'superagent'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress';
import api from 'components/api'

const Wrapper = styled.div`

`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding:50px 0 0 0;
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
const ColumnName = styled.div`
  font-size:88px;
  font-weight:bold;
  background: ${props=> props.theme.primaryColor};
  background: -moz-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, ${props=> props.theme.primaryColor}), color-stop(100%, ${props=> props.theme.secondaryColor}));
  background: -webkit-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -o-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -ms-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: linear-gradient(135deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background-clip:text;
  text-fill-color: transparent;
  -Webkit-background-clip:text;
  -Webkit-text-fill-color: transparent;
`
const Column = styled.div`
	color:#8F8F8F;
  font-size:30px;
  text-align:center;
  font-weight:bold;

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

const AllStory = React.createClass({
	getInitialState(){
		return {
			//stopPos:0,
			//feed:[],
			popular:[],			
			latestStories:[],
			refresh: 0,
			page:0,
			isInfiniteLoading: false,
			loadOffset:300
		}
	},

	componentDidMount(){
		this.getFeed()
	},

	// getFeed(){
	// 	var filter = JSON.stringify({status:1})
	// 	//console.log(path)
	// 	Request
	// 		.get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+filter+'&sort=latest')
	// 		.set('Accept','application/json')
	// 		.end((err,res)=>{
	// 			if(err) throw err
	// 			else{
	// 				//console.log(res.body)
	// 				this.setState({feed:res.body.feed})
	// 			}
	// 		})

	// },

	buildElements(page) {
		api.getFeed('story', {status:1}, 'latest', null, page, 10)
		.then(result => {
			//console.log(result.count[1])
			this.setState({
				latestStories:this.state.latestStories.concat(result.feed)
			},()=>{
				if(this.state.latestStories.length==result.count[1]){
					this.setState({
						isInfiniteLoading: false,
						loadOffset:'undefined'
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
		//var article = []
		var {feed} = this.state
		return (
		    <Wrapper>
        	<TopBarWithNavigation title={'Title of AomMoney goes here..'} />
					<Content >
            <Feed>
              <div className='row' style={{width:'100%'}}><StoryMenu style={{padding:'15px 0 15px 0',marginTop:'20px',float:'left'}}/></div>
            </Feed>
          </Content>
          <Content style={{paddingTop:'0px'}}>
            <main>
              <ColumnName className='nunito-font'>TOP</ColumnName>
              <Column className='nunito-font'>Column</Column>
            </main>
          </Content>
          <Content >
            <Feed>
              <ColumnThumpnailRow/>
            </Feed>
          </Content>
		      <Content >
			      <Main>
							<TextLine className='sans-font'>Lastest</TextLine>
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
							</Infinite>;
							<More style={{margin:'30px auto 30px auto'}} />
			      </Main>
			      <Aside>
							<TrendingSideBar/>
						</Aside>
		      </Content>
		   </Wrapper>
		  )
	}
});

export default AllStory;
