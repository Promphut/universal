import React from 'react'
import { OverlayImg, PublisherContact,PublisherAbout} from 'components'
import styled from 'styled-components'
import api from 'components/api'
import auth from 'components/auth'

const Container = styled.div`
  width:100%;
`

const PublisherContactAndAboutPage = React.createClass({
  
	getInitialState(){
		return {
			publisher:{
				contactCats: []
			}
		}
	},

	componentDidMount(){
		// we need private publisher object
		api.getPublisher(auth.getToken())
	    .then(pub => {
			this.setState({publisher:pub})
	    })
	},

  	render(){
  		let pub = this.state.publisher
  		//console.log('publisher', pub)
		return (
	      <Container>
	        <PublisherContact contactCats={pub.contactCats} />
	        <PublisherAbout aboutUs={pub.aboutUs} />
	      </Container>
	  	)
	}
});

export default PublisherContactAndAboutPage;