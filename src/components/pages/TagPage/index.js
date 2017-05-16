import React from 'react'
import {TopBarWithNavigation, ArticleBox, ArticleBoxLarge, More, TrendingSideBar,
	BGImg, StoryMenu, Stick, Footer,TagSideBar,EmptyStory} from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import api from 'components/api'
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from 'material-ui/CircularProgress';
import utils from '../../../services/utils'

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

const TagName = styled.h1`
  font-size:32px;
  font-weight:bold;
  color:${props=>props.theme.primaryColor};
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

class TagPage extends React.Component {
	state = {
		isMobile:false,
		tag: {},

		page:0,
		feedCount:-1,
		feed: [],
		hasMoreFeed: true,
	}

	constructor(props) {
		super(props)
	}

	onload = () => <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>
	reloadFeed = () => {
		this.setState({
			page:0,
			feedCount:-1,
			feed: [],
			hasMoreFeed: true
		}, () => {
			this.loadFeed(this.state.tag._id)()
		})
	}
	loadFeed = (tagId) => {
		return () => {
			//console.log('LOAD FEED0', tagId, this.loading)
			if(tagId==null) return 
			// ensure this method is called only once at a time
			if(this.loading===true) return 
			this.loading = true
			//console.log('LOAD FEED1')

			let page = this.state.page
			//console.log('page', page)

			api.getFeed('story', {status:1, tags:tagId}, 'latest', null, page, 15)
			.then(result => {

				let feed = this.state.feed.concat(result.feed)
				this.setState({
					page: ++page,
					feed: feed,
					feedCount: result.count['1'],
					hasMoreFeed: feed.length < result.count['1']
				}, () => {this.loading = false})
			})
		}
	}

	getTagFromSlug = (tagSlug, done=()=>{}) => {
		//console.log('PROP', this.props)
		if(!tagSlug) utils.notFound(this.props.history)

		api.getTagFromTagSlug(tagSlug)
		.then(tag => {
			this.setState({tag:tag}, done)
		})
		.catch(utils.toError(this.props.history))
	}

	componentDidMount() {
		this.getTagFromSlug(this.props.match.params.tagSlug)

		this.setState({
			isMobile:utils.isMobile()
		})
	}

	componentWillReceiveProps(nextProps) {
		//console.log('COL', nextProps, this.props)
		if(nextProps.match.params.tagSlug!=this.props.match.params.tagSlug){
			//console.log('RELOAD FEED')
			this.getTagFromSlug(nextProps.match.params.tagSlug, this.reloadFeed)
			//this.reloadFeed()
		}
	}

	render(){
		//console.log(this.props.params.tag)
    	//const BGImgSize = (utils.isMobile() ? 100 : 280) + 60
		let {column, isMobile, tag} = this.state
		//console.log('column', column)
		//let {count,loadOffset,isInfiniteLoading,latestStories,isMobile} = this.state
		let {feedCount,feed,hasMoreFeed} = this.state

		return (
		    <Wrapper>
				<TopBarWithNavigation title={'Title of AomMoney goes here..'} onLoading={this.props.onLoading}/>

		      	<Content>

		      		{feedCount===0 ? <Main>
		                <TextLine className='sans-font' style={{border:'none',marginTop:'60px'}}>tag</TextLine>
		                <TagName className='nunito-font' style={{margin:'10px 0 50px 0'}}>{tag.name}</TagName>
						
						<EmptyStory title='No Story, yet' description='There are no stories in this column right now. Wanna back to see other columns?' />
	              	</Main> : <Main>
		                <TextLine className='sans-font' style={{border:'none',marginTop:'60px'}}>tag</TextLine>
		                <TagName className='nunito-font' style={{margin:'10px 0 50px 0'}}>{tag.name}</TagName>

	                	<TextLine className='sans-font'>Latest</TextLine>

	                	<InfiniteScroll
						    loadMore={this.loadFeed(tag._id)}
						    hasMore={hasMoreFeed}
						    loader={this.onload()}
						>
							<div>
							    {feed.map((item, index) => (
									<ArticleBox detail={item} key={index}/>
								))}
							</div>
						</InfiniteScroll>

		                <More style={{margin:'30px auto 30px auto'}} />
	              	</Main>}

				    <Aside>
	              		<TagSideBar style={{marginTop:'4 0px'}}/>
						<Stick topOffset={70} style={{zIndex: '0'}}>
							<TrendingSideBar/>
						</Stick>
					</Aside>

	      		</Content>

				<Footer/>
		   </Wrapper>
		)
	}
}

export default TagPage;
