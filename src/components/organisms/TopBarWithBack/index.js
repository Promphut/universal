import React, {PropTypes} from 'react'
import styled from 'styled-components'
import {Link, browserHistory} from 'react-router'
import {Stick} from 'components'
import FontIcon from 'material-ui/FontIcon';

const Container = styled.div`
	margin: 0;
	padding: 0;
  background: ${props => props.theme.barTone=='light'?'white':props.theme.primaryColor};
	color: ${props => props.theme.barTone=='light'?'#222':'white'};
  height: 60px;
  border-bottom: ${props => props.theme.barTone=='light'?'1px solid #e2e2e2':'none'};
	width: 100%;
	transition: .1s;
	position: absolute;

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`

const Left = styled.div`
`

const Center = styled.div`
	text-align: center;
`

const Title = styled.div`
	font-family: 'Nunito', 'Mitr';
	font-size: 18px;
	margin-top: 18px;
`

const TopBarWithBack = React.createClass({
	checkBack(e){
		e.preventDefault()
		browserHistory.goBack()
	},

	render () {
	  var {theme} = this.context.setting.publisher
		const backStyle = {
			color: '#FFF',
			fontSize: '40px',
			position: 'absolute',
			top: '10px',
			left: '5px'
		}

	  return (
			<Stick>
        <Container>
					<Left>
						<Link to='#' onClick={this.checkBack}>
							<FontIcon className="material-icons" style={backStyle}>chevron_left</FontIcon>
						</Link>
					</Left>

					<Center>
						<Title>Setting</Title>
					</Center>
        </Container>
			</Stick>
	  )
	}
})

TopBarWithBack.contextTypes = {
	setting: React.PropTypes.object
};


export default TopBarWithBack;
