import React from 'react'
import { TopBarWithNavigation,ArticleBox,ArticleBoxLarge,More,TrendingSideBar,BGImg,StoryMenu } from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Request from 'superagent'
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

const trending = {
	name:'โมหจริตดินฮิปฮอปด็อกเตอร์โมหจริตแอดมิสชััน?',
	vote:'18',
	comment:11,
	photo:'/tmp/story-list/1485309433041-Screen-Shot-2017-01-23-at-33221-PM-1.png'
}
const trendingArray = [trending,trending,trending,trending,trending,trending]
var arr = [mock,mock,mock,mock]

const ColumnPage = React.createClass({
	getInitialState(){
		return {
			stopPos: 0,
			column: {},
			feed: [],
			popular: []
		}
	},

	componentDidMount() {
		const columnName = this.props.params.columns
		this.getFeed(columnName)
		this.setState({
			stopPos:dom(this.refs.more).getBoundingClientRect().top
		})
	},

	componentWillReceiveProps(nextProps) {
		const columnName = nextProps.params.columns
		this.getFeed(columnName)
	},

	getFeed(columnName) {
		Request
			.get(config.BACKURL + '/slugs/publishers/' + config.PID + '/' + columnName)
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) throw err
				else {
					const column = res.body.column
					const columnDesc = {
						name: column.name,
						shortDesc: column.shortDesc
					}
					this.setState({column: columnDesc})
					const filter = JSON.stringify({column: column.id, status: 1})

					Request
						.get(config.BACKURL + '/publishers/' + config.PID + '/feed?type=story&filter=' + filter + '&sort=latest')
						.set('Accept','application/json')
						.end((err, res) => {
							if (err) throw err
							else {
								const feed = res.body.feed
								this.setState({feed})
							}
						})
				}
			})
	},

	render(){
		//var article = []
		var {column, feed} = this.state
		var ChildCover =
			<div style={{margin:'170px 0 0 20%',width:'700px'}}>
				<ColumnName className='serif-font'>{column.name}</ColumnName>
				<ColumnDetail >{column.shortDesc}</ColumnDetail>
			</div>
		return (
		    <Wrapper>
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} />
					<BGImg src="/tmp/a-story/pic-min.jpg" style={{width:'100%',height:'510px'}} child={ChildCover}/>

		      <Content >
			      <Main>
							<StoryMenu style={{padding:'15px 0 15px 0',margin:'0 0 50px 0'}} next='FUND'/>
							<TextLine className='sans-font'>Lastest</TextLine>
							{/*{article}*/}
							{feed.map((data,index)=>(
								index%3==0?<ArticleBoxLarge detail={data} key={index}/>:<ArticleBox detail={data} key={index}/>
							))}
							<More style={{margin:'30px auto 30px auto'}} />
							<div ref='more'></div>
			      </Main>
			      <Aside>
							<TrendingSideBar detail={trendingArray} stop={this.state.stopPos}/>
						</Aside>
		      </Content>
		   </Wrapper>
		  )
	}
});

export default ColumnPage;
