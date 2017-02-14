import React from 'react'
import { PageTemplate, TopBar} from 'components'

import styled from 'styled-components'


const Wrapper = styled.div`
	
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

const Cover = React.createClass({
	getInitialState(){
		return {}
	},

	render(){return (
			<div style={{
				overflow:'hidden',
				maxHeight: this.props.height-120+'px',
				position:'relative'
			}}>
				<img src="/tmp/a-story/pic-min.jpg" style={{width: '100%'}}/>
				<GradientOverlay />
			</div>
		)
	}
})

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

	componentDidMount(){
		//window.addEventListener("resize", this.updateDimensions);
	},

	componentWillUnmount() {
        //window.removeEventListener("resize", this.updateDimensions);
    },

	render(){
		return (
		    <Wrapper>
		      <TopBar title={'Title of AomMoney goes here..'} loggedIn={false} />

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