import React from 'react'
import {TopBarWithNavigation,SignUpFb,SignUp} from 'components'
import {Link} from 'react-router'
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'

const Wrapper = styled.div`
	.fixedPos{
		position:fixed;
		top:70px;
    
	}
  background:rgba(0,0,0,0.5);
`


const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;

`
const Share = styled.div`
	flex: 1 90px;
	position:relative;
	max-width: 90px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
  background:rgba(0,0,0,0.5);
	@media (max-width: 480px) {
		flex: 12;
	}
`

const Aside = styled.div`
	flex: 3 350px;
	position:relative;
	max-width: 350px;
	margin-left:20px;
	@media (max-width: 1160px) {
		display:none;
	}
	
`

const Footer = styled.div`
	text-align:center;
	background: lightgreen;
	height:400px;
`

const Homepage = React.createClass({
	getInitialState(){
		return {
		}
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

	},
                                  
	fixedTrending(e){

	},

	componentWillUnmount() {
        //window.removeEventListener("resize", this.updateDimensions);
  },

	trendingScroll(e){
		console.log(e)
	},

	render(){
		var {stopPos} = this.state
		return (
		    <Wrapper >
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={true} />

		      <Content>
						<Share ref='share'>
							
						</Share>

						<Main>
							
			      </Main>
			      
			      <Aside  id='trendingBar' className='' ref='trendingBar'></Aside>
		      </Content>
          <SignUpFb/>
          <SignUp/>
		   </Wrapper>
		  )
	}
});

export default Homepage;