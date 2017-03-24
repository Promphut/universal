import React from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'
import {Logo} from 'components'

const Wrapper = styled.div`
	background: #F4F4F4;
	width: 100vw;
	height: 100vh;
	padding: 17px;

	a {
		color: #00B2B4;

		&:hover {
			color: #999;
		}
	}
`

const Center = styled.div`
	background: #FFF;
	border: 2px dashed #D1D1D1;
	text-align: center;
	margin: 20vh auto;
	height: 400px;
	box-shadow: 0px 35px 42px -35px #C2C2C2;
`

const ErrorNumber = styled.div`
	margin-top: ${props => props.smallSize ? '40px' : '10px'};
	font-size: ${props => props.smallSize ? '48px' : '128px'};
	font-weight: bold;
	font-family: 'Nunito', 'Mitr';

  background: -webkit-linear-gradient(#00B2B4, #00B2B4 30%, #CEF1B7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

	@media (min-width: 1388px) {
  	margin-top: ${props => props.smallSize ? '80px' : '10px'};
		font-size: ${props => props.smallSize ? '60px' : '128px'};
	}
`

const ErrorText = styled.div`
	margin-top: 18px;
	font-size: 1.8rem;
	font-family: 'Nunito', 'Mitr';

	@media (max-width: 480px) {
		font-size: 1.4rem;
	}
`

const NotFoundPage = React.createClass({
  render() {
		const buttonStyle = {
			marginTop: '45px',
			borderRadius: '20px',
			boxShadow: '0px 3px 0px 0px #008687'
		}

		const buttonLabelStyle = {
			textTransform: 'none',
			fontSize: '1.2rem',
			fontFamily: "'Nunito', 'Mitr'",
			color: '#FFF',
			margin: '0px 10px 0px 5px'
		}

    return (
			<Wrapper style={this.props.style}>
				<Link to="/">
					<Logo fill={"#00B2B4"} />
				</Link>
				<Center className="col-sm-10 col-md-6">
					<ErrorNumber smallSize={this.props.smallSize}>
						{this.props.errorNumber}
					</ErrorNumber>
					<ErrorText>
						{this.props.children}
					</ErrorText>
          <Link to="/">
  					<FlatButton
  						backgroundColor="#00B2B4"
        			label="Go Home"
  						labelPosition="before"
  						labelStyle={buttonLabelStyle}
  						style={buttonStyle}
  						hoverColor="#00B2B4"
  						icon={
  	            <FontIcon
  								className="material-icons"
  								style={{color: '#FFF'}}
  							>
  	              chevron_right
  	            </FontIcon>
  	          }
  					/>
				  </Link>
				</Center>
			</Wrapper>
    )
  }
})

export default NotFoundPage;
