import React from 'react'
import {TopBarWithNavigation, ArticleBox, ArticleBoxLarge, More, TrendingSideBar,
	BGImg, StoryMenu,Stick} from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
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

const Head = styled.div`
	margin: 120px 0 0 20%;
	
	@media (max-width: 768px) {
		margin: 120px 5% 0 5%;
  }

	@media (max-width: 480px) {
		margin: 80px 5% 0 5%;
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

const ColumnName = styled.div`
  color:#fff;
  font-size:48px;
  font-weight:bold;
`

const ColumnDetail = styled.div`
	color:#fff;
  font-size:16px;
	font-family:'Mitr';
	margin-top:15px;
`

const Footer = styled.div`
	text-align:center;
	background: lightgreen;
	height:400px;
`
const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`
const ColumnPage = React.createClass({
	getInitialState(){
		return {
			// column: {
			// 	cover: {
			// 		medium: ''
			// 	},
			// 	shortDesc: '',
			// 	name: ''
			// },
			column:this.props.params.column,
			feed: [],
			latestStories:[],
			page:0,
			isInfiniteLoading: false,
			loadOffset:300,
			feedCount:0,
			isMobile:false
		}
	},

	componentDidMount() {
		//this.getColumnFeed(this.props.params.column)
		this.setState({
			isMobile:window.isMobile()
		})
	},

	componentWillReceiveProps(nextProps) {
		if(nextProps.params.column!=this.props.params.column){
			this.setState({
				column:nextProps.params.column,
			},()=>{
				this.setState({
					page:0,
					latestStories:[],
					loadOffset:300
				},()=>{
					this.handleInfiniteLoad()
				})
			})
		}
	},

	// getColumnFeed(col){
	// 	let {id, name, shortDesc, cover} = col

	// 	api.getFeed('story', {column: id, status: 1})
	// 	.then(result => {
	// 		this.setState({
	// 			column: {id, name, shortDesc, cover},
	// 			feed: result.feed,
	// 		})
	// 	})

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
		let {column, feed} = this.state
		//console.log('column', column)
		var {count,loadOffset,isInfiniteLoading,latestStories,isMobile} = this.state
		let ChildCover =
			<Head>
				<ColumnName className='serif-font'>{column.name}</ColumnName>
				<ColumnDetail >{column.shortDesc}</ColumnDetail>
			</Head>

		return (
		    <Wrapper>
				<TopBarWithNavigation title={'Title of AomMoney goes here..'} />
				<BGImg src={column.cover.medium || column.cover.small} style={{width:'100%',height: (280+60)+'px'}} child={ChildCover}/>

		      	<Content>
			      <Main>
						<StoryMenu
							style={{padding:'15px 0 15px 0', margin:'0 0 50px 0'}}
							next={column.name}
						/>
						<TextLine className='sans-font'>Latest</TextLine>

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
			      <Aside>
							<Stick topOffset={70} style={{zIndex: '0'}}>
								<TrendingSideBar/>
							</Stick>
						</Aside>
		      	</Content>
		   </Wrapper>
		)
	}
});

export default ColumnPage;
