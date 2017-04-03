import React from 'react'
import { PageTemplate, TopBarWithNavigation, StoryDetail, RecommendArticle, TrendingSideBar,
	 Stick,ShareSideBar, BGImg,RecommendContainer} from 'components'
import {Link} from 'react-router'
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
import api from 'components/api'
import  { StickyContainer, Sticky }  from 'react-sticky'

const Wrapper = styled.div`
	 .hidden-des{
	  	display:none;
	  }
	@media(max-width:480px){
	  .hidden-des{
	  	display:block;
	  }
		.hidden-mob{
			display:none;
		}
    .center{
      justify-content: center;
    }
		.recommends{
			font-size:16px;
		}
  }
`

const GradientOverlay = styled.div`
	background: -moz-linear-gradient(-45deg,  rgba(202,130,172,0.3) 0%, rgba(49,77,170,0.3) 100%);
	background: -webkit-linear-gradient(-45deg,  rgba(202,130,172,0.3) 0%,rgba(49,77,170,0.3) 100%);
	background: linear-gradient(135deg,  rgba(202,130,172,0.3) 0%,rgba(49,77,170,0.3) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4dca82ac', endColorstr='#4d314daa',GradientType=1 );

	bottom:0;
	top:0; left:0;
	right:0;
	position:absolute;
	z-index:0
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;

	padding-top: ${props => props.paddingTop}
`

const Share = styled.div`
	flex: 1 120px;
	position:relative;
	max-width: 120px;
	margin:150px 0 0 0;
	@media (max-width: 1280px) {
		display:none;
	}
`

const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
	marginTop: 40px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const Aside = styled.div`
	flex: 3 385px;
	position:relative;
	max-width: 385px;
	padding:0 0 0 60px;
	margin:150px 0 0 0;
	@media (max-width: 1280px) {
		display:none;
	}
`

const Cover = styled.div`
	position:relative;
	top:0;
	left:0;
	width:100%;
	height:100%;
background: rgba(34,34,34,0.64);
background: -moz-linear-gradient(top, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(34,34,34,0.64)), color-stop(0%, rgba(0,0,0,0.64)), color-stop(20%, rgba(0,0,0,0)));
background: -webkit-linear-gradient(top, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
background: -o-linear-gradient(top, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
background: -ms-linear-gradient(top, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
background: linear-gradient(to bottom, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#222222', endColorstr='#000000', GradientType=0 );
`

// const rec = {
// 	name:'Donald Trump’s First, Alarming Week',
// 	column:'Money Ideas',
// 	writer:'RYAN LIZZA',
// 	vote:'18',
// 	comment:'3'
// }

const StoryPage = React.createClass({
	getInitialState(){
		this.story = this.props.params.story
		//console.log('canEditStory', this.props.params.canEditStory)

		return {
			refresh: 0,

			stopPos:'',
			recommends: [] 	// trending stories
		}
	},

	componentWillReceiveProps(nextProps){
		//console.log('componentWillReceiveProps', nextProps)
		if(nextProps.params.story){
			this.story = nextProps.params.story

			this.setState({refresh: Math.random()})
		}
	},

	componentDidMount(){
		this.getRecommendStories()
	},

	getRecommendStories(){
		if(this.story.column){
			// Get recommend from column
			let cid = this.story.column._id

			api.getFeed('story', {status:1, column:cid}, 'latest', null, 0, 4)
			.then(result => {
				//console.log('feed', result.feed.length)
				this.setState({
					recommends: result.feed,
				})
			})
		} else {
			// If no column presented, use writer instead
			let uid = this.story.writer._id

			api.getFeed('story', {status:1, writer:uid}, 'latest', null, 0, 4)
			.then(result => {
				//console.log('feed', result.feed.length)
				this.setState({
					recommends: result.feed,
				})
			})
		}

	},

	render(){
		let {stopPos, recommends} = this.state
		
		const hasCover = (this.story.cover.medium == config.BACKURL+'/imgs/article_cover_landscape.png'
		|| this.story.coverMobile.medium == config.BACKURL+'/imgs/article_cover_portrait.png') ? false : true
		//console.log('render', this.story)
		return (
		    <Wrapper>
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} article={this.story.title} editButton={'/me/stories/'+this.story.id+'/edit'} hasCover={hasCover} />

		      {this.story.cover.medium!=config.BACKURL+'/imgs/article_cover_landscape.png'&&<BGImg style={{width:'100%',height:'85vh'}} src={this.story.cover.large || this.story.cover.medium} className='hidden-mob'>
						<Cover/>
					</BGImg>}
		      {this.story.coverMobile.medium!=config.BACKURL+'/imgs/article_cover_portrait.png'&&<BGImg style={{width:'100%',height:'85vh'}} src={this.story.coverMobile.large || this.story.coverMobile.medium} className='hidden-des'>
						<Cover/>
					</BGImg>}

		      <Content paddingTop={hasCover ? '0px' : '60px'}>
						<Share ref='share' style={{zIndex:'50'}}>
							<Stick topOffset={60}>
								<ShareSideBar detail={this.story}/>
							</Stick>
						</Share>

						<Main>
							<StoryDetail story={this.story}/>
						</Main>

								<Aside  id='trendingBar' ref='trendingBar'>
							<Stick topOffset={60} style={{zIndex:'50'}}>
								<TrendingSideBar />
							</Stick>
						</Aside>
		      </Content>

				<Content>
					<RecommendContainer recommend={recommends}/>
				</Content>
		   </Wrapper>
		  )
	}
});

export default StoryPage;
