import React from 'react'
import { PageTemplate, TopBarWithNavigation, OverlayImg, Thumpnail, ThumpnailSmall,ArticleBox,ArticleBoxLarge} from 'components'

import styled from 'styled-components'


const Wrapper = styled.div`
	
`

const Cover = (props) => (
	<OverlayImg src="/tmp/a-story/pic-min.jpg" style={{maxHeight: props.height-120+'px'}}/>
)

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;

	> * {
		flex: 1 0;
	}
`

const Main = styled.div`
	flex: 3 790px;
	max-width: 790px;
`

const Aside = styled.div`
	background: gold;
	flex: 1 350px;
	max-width: 350px;

	@media (max-width: 1160px) {
		display:none;
	}
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


const HomePage2 = React.createClass({
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
		
		return (
		    <Wrapper>
<<<<<<< HEAD
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={true} />
=======
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={this.props.params.loggedIn} />
>>>>>>> d2c7ca557f1eeac0e21764812c4ab07fd9081d8b

		      <Cover width={this.state.width} height={this.state.height}/>

		      <Content>
			      <Main>
							<div className="row">
								<Thumpnail detail={mock} style={{margin:'15px'}}/>
						 		<ThumpnailSmall detail={mock} style={{margin:'15px'}}/>
							</div>
			     		<ArticleBox detail={mock2}/>
							<ArticleBox detail={mock2}/>
							<ArticleBoxLarge detail={mock2}/>
			      </Main>
			      
			      <Aside><h2>Sidebar here</h2></Aside>
		      </Content>

		      

		      <Footer>This is footer</Footer>
		   </Wrapper>
		  )
	}
});

export default HomePage2;