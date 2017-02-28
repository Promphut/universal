import React from 'react'
import { PageTemplate, TopBarWithNavigation, OverlayImg, Thumpnail, 
	ThumpnailSmall,ArticleBox,ArticleBoxLarge,ThumpnailRow,TopColumnSidebar,TopWriterSidebar,More} from 'components'

import styled from 'styled-components'


const Wrapper = styled.div`
	
`



const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding:50px 0 50px 0;
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
const ColumnName = styled.h1`
  color:#fff;
  font-size:48px;
  font-weight:bold;
  position:relative;
  top:-300px;
  left:354px;
`

const Footer = styled.div`
	text-align:center;
	background: lightgreen;
	height:400px;
`
var mock = {
	name:'ฟหกหฟก หฟกกฟหกหฟกฟหกห ',
	time:'3',
	photo:'tmp/16112046_10209835674580972_1744602643_n.jpg'
}

var mock2 = {
	name:'ฟหกหฟก หฟกกฟหกหฟกฟหกห ฟหกฟหกหฟกหฟกหฟกห ดฟหกดหด หกดห',
	time:'3',
	photo:'tmp/story-list/1486591796200-GettyImages-591802466.jpeg',
	writer:{
		name:'Ochawin Chirasottikul',
		photo:'tmp/avatar.png',
		date:'10'
	},
	vote:'15',
	comment:'11',
	date:'10',
	column:'Money Ideas'
}

var arr = [mock,mock,mock,mock]

const ColumnPage = React.createClass({
	getInitialState(){
		return {}
	},

	updateDimensions(){
        this.setState({
        	width: window.getWidth(), 
        	height: window.getHeight()
        });
    },

	componentWillMount(){
        this.updateDimensions();
    },

	render(){
		var article = []
		for(let i=0;i<5;i++){
			article.push(
				i%3==0?<ArticleBoxLarge detail={mock2} key={i}/>:<ArticleBox detail={mock2} key={i}/>
			)
		}
		return (
		    <Wrapper>

		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={this.props.params.loggedIn} />

		      <OverlayImg src="/tmp/a-story/pic-min.jpg" style={{width:'100%',height:'510px'}}/>

          <ColumnName className='serif-font'>Fund</ColumnName>

					<Content >
						<Feed>
							<div className='row' style={{display:'block',overflow:'hidden'}}>
								<Text className='sans-font' style={{float:'left'}}>Trending Now</Text>
								<Text className='sans-font' style={{fontSize:'14',float:'right',margin:'5px'}}>View more</Text>
							</div>
							<ThumpnailRow detail={arr} style={{margin:'20px 0 30px 0'}}/>
							<ThumpnailRow detail={arr} size='small' style={{margin:'30px 0 30px 0'}}/>
						</Feed>
					</Content>	
		      <Content >
			      <Main>
							<TextLine className='sans-font'>Lastest</TextLine>
							{article}
							<More style={{margin:'30px auto 30px auto'}}/>
			      </Main>
			      <Aside>
							<TopColumnSidebar />
							<TopWriterSidebar/>
						</Aside>
		      </Content>
		   </Wrapper>
		  )
	}
});

export default ColumnPage;