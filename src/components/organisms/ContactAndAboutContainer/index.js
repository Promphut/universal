import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router'
import {BGImg, TopBarWithNavigation, TrendingSideBar, RecommendArticle, Navbar} from 'components'
import api from 'components/api'

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 50px 0 50px 0;
`

const Main = styled.div`
	margin-top: 50px;
	flex: 8 730px;
	max-width: 730px;
	@media (max-width: 480px) {
		flex: 0 100%;
		max-width: 100%;
		padding: 0 15px 0 15px;
	}
`

const Aside = styled.div`
	flex: 3 325px;
	position:relative;
	max-width: 325px;
	margin-top: 50px;
	margin-left:60px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const RecommendContainer = styled.div`
	flex:12 1275px;
	max-width:1275px;
	margin-top:60px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const ContactAndAboutContainer = React.createClass({
	getInitialState(){
		this.recommends = []
		this.publisher = {}

		return {
			refresh: 0
			//recommends: []
		}
	},

	getRecommendStories(){
		api.getFeed('story', {status:1}, 'latest', null, 0, 4)
		.then(result => {
			this.recommends = result.feed

			this.setState({
				refresh: Math.random()
			})
			//console.log('feed', result.feed.length)
			// this.setState({
			// 	recommends: result.feed,
			// })
		})
	},

	getPublisher(){
		api.getPublisher()
		.then(pub => {
			this.publisher = pub

			this.setState({
				refresh: Math.random()
			})
		})
	},

	componentDidMount(){
		this.getPublisher()
		this.getRecommendStories()
	},

  	render(){
  		//let {recommends} = this.state
  		let pub = this.publisher

  		let list = []
		for(let i=0; i<this.recommends.length; i++){
			list.push(
				<div className='col-lg-6 col-md-6 col-sm-12'>
					<RecommendArticle detail={this.recommends[i]}/>
				</div>
			)
		}

	    return (
	      <div>
			{pub.cover && <BGImg src={pub.cover.medium} style={{width:'100%',height:'350px'}} className="hidden-mob" />}
			
	      	<TopBarWithNavigation title={'Title of AomMoney goes here..'} />
	        <Content>
	          <Main>
	            {this.props.children}
	          </Main>
	          <Aside>
	            <TrendingSideBar/>
	          </Aside>
	        </Content>
	        <Content>
	          <RecommendContainer ref='recommend'>
	            <div className='recommends sans-font'>Recommends</div>
	            <div className='row center'>
	            	{list}
	            </div>
	          </RecommendContainer>
	        </Content>
	     </div>
	    )
  	}
})

export default ContactAndAboutContainer;
