import React from 'react'
import {TopBarWithNavigation, ArticleBox, ArticleBoxLarge, More, TrendingSideBar,
	BGImg, StoryMenu, Stick, Footer,EmptyStory} from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import api from 'components/api'
import Infinite from 'react-infinite'
import {Link} from 'react-router'
import {Helmet} from 'react-helmet'
import CircularProgress from 'material-ui/CircularProgress';
const Wrapper = styled.div`

`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding:50px 0 50px 0;

	@media (min-width: 481px) {
		min-height: 480px;
	}
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
		margin: 72px 5% 0 5%;
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

	@media (max-width:480px) {
  	font-size: 16px;
  }
`

const ColumnDetail = styled.div`
	color:#fff;
  font-size:16px;
	font-family:'Mitr';
	margin-top:15px;

	@media (max-width:480px) {
  	font-size: 12px;
		margin-top: 8px;
  }
`

const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`
const ColumnPage = React.createClass({
	getInitialState(){
		return {
			column: this.props.params.column || {
				cover:{}
			},	//this.props.params.column || {},
			feed: [],
			latestStories:[],
			page:0,
			isInfiniteLoading: true,
			loadOffset:300,
			feedCount:0,
			isMobile:false
		}
	},

	componentDidMount() {
		this.handleInfiniteLoad()
		this.setState({
			isMobile:window.isMobile()
		})
	},

	componentWillReceiveProps(nextProps) {
		if(nextProps.params.column && nextProps.params.column!=this.props.params.column){
			this.setState({
				column:nextProps.params.column,
				page:0,
				latestStories:[],
				loadOffset:300
			},()=>{
				this.handleInfiniteLoad()
			})
		}
	},

	// shouldComponentUpdate(nextProps, nextState){
	// 	console.log('-- ColumnPage Updated --', nextProps, nextState)
	// 	return true
	// },

	buildElements() {
		let page = this.state.page
		var {column} = this.state
		api.getFeed('article', {status:1,column:column.id }, 'latest', null, page, 10)
		.then(result => {
			var s = this.state.latestStories.concat(result.feed)
			if(s.length==result.count[1]){
				this.setState({
					feedCount:result.count[1],
					latestStories:s,

					loadOffset:'undefined',
					isInfiniteLoading: false,
				})

			} else {
				this.setState({
					feedCount:result.count[1],
					latestStories:s,

					isInfiniteLoading: false
				})
			}

			// this.setState({
			// 	feedCount:result.count[1],
			// 	latestStories:s,
			// },()=>{
			// 	if(s.length==result.count[1]){
			// 		this.setState({
			// 			loadOffset:'undefined',
			// 			isInfiniteLoading: false,
			// 		})
			// 	}else{
			// 		this.setState({
			// 			isInfiniteLoading: false
			// 		})
			// 	}
			// })
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
	    let {keywords, channels,theme} = this.context.setting.publisher
	    const BGImgSize = (window.isMobile() ? 100 : 280) + 60
		let {column, feed} = this.state
		var {count, loadOffset, isInfiniteLoading, latestStories, isMobile} = this.state
		//console.log('COL', column)
		let ChildCover = (
			<Head>
				<ColumnName className='serif-font'>{column.name}</ColumnName>
				<ColumnDetail >{column.shortDesc}</ColumnDetail>
			</Head>
		)

		return (
	    <Wrapper>
				<Helmet>
					<title>{column.name}</title>
          <meta name="title" content={column.name} />
          <meta name="keywords" content={keywords} />
          <meta name="description" content={column.shortDesc} />

          <link rel="shortcut icon" type="image/ico" href={config.BACKURL+'/publishers/'+config.PID+'/favicon'} />
          {channels && channels.fb ? <link rel="author" href={getFbUrl(channels.fb)} /> : ''}
          <link rel="canonical" href={window.location.href} />

          <meta property="og:sitename" content={column.name} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:title" content={column.name} />
          <meta property="og:type" content="article" />
					<meta property="og:image" content={column.cover.medium} />
          <meta property="og:keywords" content={keywords} />
          <meta property="og:description" content={column.shortDesc} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:image:alt" content={column.name} />
          <meta property="fb:app_id" content={config.ANALYTIC.FBAPPID} />
				</Helmet>
				<TopBarWithNavigation title={'Title of AomMoney goes here..'} onLoading={this.props.onLoading}/>
				<BGImg src={column.cover.medium || column.cover.small}
					style={{width:'100%',height: BGImgSize + 'px'}} alt={column.name}
					child={ChildCover}/>
		      	<Content>
			      {latestStories.length!=0?
						<Main>
							<StoryMenu style={{padding:'15px 0 15px 0', margin:'0 0 50px 0'}}	next={column.name} />
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
			      </Main>:
						<Main>
							<StoryMenu style={{padding:'15px 0 15px 0', margin:'0 0 50px 0'}}next={column.name}/>
						  {isInfiniteLoading?<Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>:
							<EmptyStory title='No Story, yet' description={<div>There are no stories in this column right now. Wanna back to see <Link to='/stories/columns' style={{color:theme.accentColor}}>other columns</Link>?</div>} />}
			      </Main>}
			      <Aside>
							<Stick topOffset={70} style={{zIndex: '0'}}>
								<TrendingSideBar/>
							</Stick>
						</Aside>
	      	</Content>
					<Footer/>
		   </Wrapper>
		)
	}
});

ColumnPage.contextTypes = {
	setting: React.PropTypes.object
}

export default ColumnPage
