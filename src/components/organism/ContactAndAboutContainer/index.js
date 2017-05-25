import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {BGImg, TopBarWithNavigation, TrendingSideBar, RecommendArticle,
	Navbar, RecommendContainer, Footer} from 'components'
import api from 'components/api'

const Wrapper = styled.div`
	.recommends {
		font-size: 20px;
		color: #222;
		font-weight: bold;
	}
	@media (max-width: 480px) {
		.hidden-mob {
			// display: none;
		}
    .center {
      justify-content: center;
    }
		.recommends {
			font-size: 16px;
		}
  }
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`

const Main = styled.div`
	margin-top: 80px;
	flex: 8 730px;
	max-width: 730px;
	min-height: calc(100vh - 591px);

	@media (max-width: 768px) {
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

class ContactAndAboutContainer extends React.Component {
	constructor(props) {
		super(props)

		this.recommends = []
		this.publisher = {}

		//this.state = {
			//refresh: 0
			//recommends: []
		//}
	}

	getRecommendStories = () => {
		api.getFeed('story', {status:1}, 'latest', null, 0, 4)
		.then(result => {
			this.recommends = result.feed

			this.setState({ })
			//console.log('feed', result.feed.length)
			// this.setState({
			// 	recommends: result.feed,
			// })
		})
	}

	getPublisher = () => {
		api.getPublisher()
		.then(pub => {
			this.publisher = pub

			this.setState({ })
		})
	}

	componentDidMount(){
		this.getPublisher()
		this.getRecommendStories()
	}

  	render(){
  		//let {recommends} = this.state
  		let pub = this.publisher

  		let list = []
			for(let i=0; i<this.recommends.length; i++){
				list.push(
					<div key={i} className='col-lg-6 col-md-6 col-sm-12'>
						<RecommendArticle detail={this.recommends[i]}/>
					</div>
				)
			}

	    return (
	      <Wrapper>
			{pub.cover && <BGImg src={pub.cover.medium} opacity={-1} style={{width:'100%',height:'350px'}} className="hidden-mob" />}

			<TopBarWithNavigation title={'Title of AomMoney goes here..'} onLoading={this.props.onLoading}/>

	        <Content>
	          <Main>
	            {this.props.children}
	          </Main>
	          {/*<Aside>
	            <TrendingSideBar/>
	          </Aside>*/}
	        </Content>
			<Content>
				<RecommendContainer recommend={this.recommends}/>
			</Content>
			<Footer/>
	     </Wrapper>
	    )
  	}
}

export default ContactAndAboutContainer;
