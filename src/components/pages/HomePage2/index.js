import React from 'react'
import { PageTemplate, TopBarWithNavigation, OverlayImg } from 'components'

import styled from 'styled-components'


const Wrapper = styled.div`
	
`

const Cover = (props) => (
	<OverlayImg src="/tmp/a-story/pic-min.jpg" width={props.width} height={props.height} opacity={0.3} style={{maxHeight: props.height-120+'px'}}/>
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
	background: deepskyblue;
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
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={true} />

		      <Cover width={this.state.width} height={this.state.height}/>

		      <Content>
			      <Main>
			     	<h1>MICROSOFT SURFACE STUDIO REVIEW: A BEAUTIFUL INVADER OF APPLE'S BASE</h1>
			      </Main>
			      
			      <Aside><h2>Sidebar here</h2></Aside>
		      </Content>

		      

		      <Footer>This is footer</Footer>
		   </Wrapper>
		  )
	}
});

export default HomePage2;