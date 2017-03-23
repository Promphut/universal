import React from 'react'
import {TopBarWithNavigation, ArticleBox, ArticleBoxLarge, More, TrendingSideBar,
	BGImg, StoryMenu} from 'components'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import api from 'components/api'

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

const ColumnPage = React.createClass({
	getInitialState(){
		return {
			stopPos: 0,
			column: {},
			feed: []
			//popular: []
		}
	},

	componentDidMount() {
		this.getColumnFeed(this.props.params.column)
		// this.setState({
		// 	stopPos:dom(this.refs.more).getBoundingClientRect().top
		// })
	},

	componentWillReceiveProps(nextProps) {
		this.getColumnFeed(nextProps.params.column)
	},

	getColumnFeed(col){
		let {id, name, shortDesc, cover} = col

		api.getFeed('story', {column: id, status: 1})
		.then(result => {
			this.setState({
				column: {id, name, shortDesc},
				feed: result.feed,
				stopPos:dom(this.refs.more).getBoundingClientRect().top
			})
		})
	},

	render(){
		let {column, feed} = this.state

		let ChildCover =
			<div style={{margin:'170px 0 0 20%',width:'700px'}}>
				<ColumnName className='serif-font'>{column.name}</ColumnName>
				<ColumnDetail >{column.shortDesc}</ColumnDetail>
			</div>

		return (
		    <Wrapper>
				<TopBarWithNavigation title={'Title of AomMoney goes here..'} />
				<BGImg src={column.cover} style={{width:'100%',height:'510px'}} child={ChildCover}/>

		      	<Content>
			      <Main>
						<StoryMenu style={{padding:'15px 0 15px 0',margin:'0 0 50px 0'}} next='FUND'/>
						<TextLine className='sans-font'>Latest</TextLine>

						{feed.map((data,index) => (
							index%3===0 ? <ArticleBoxLarge detail={data} key={index}/> : <ArticleBox detail={data} key={index}/>
						))}

						<More style={{margin:'30px auto 30px auto'}} />
						<div ref='more'></div>
			      </Main>
			      <Aside>
						<TrendingSideBar stop={this.state.stopPos}/>
					</Aside>
		      	</Content>
		   </Wrapper>
		)
	}
});

export default ColumnPage;
