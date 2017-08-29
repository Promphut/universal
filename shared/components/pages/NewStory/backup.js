import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { findDOMNode as dom } from 'react-dom'
import auth from '../../../services/auth'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import { Helmet } from 'react-helmet'
import api from '../../../services/api'
import config from '../../../config'

const Container = styled.div`
  width:855px;
  padding:60px;
  border-bottom:1px solid #E2E2E2;
  h1{
    color:${props => props.theme.primaryColor};
    font-size:42px;
  }
`
const Layout = styled.div`
  width:307px;
  height:439px;
  background-position:center;
  background-size:cover;
  margin:0 auto 0 auto;
  &:hover{
    cursor:pointer;
    box-shadow: 0 0 10px ${props => props.theme.primaryColor};
  }
`
const Label = styled.div`
  color:#222;
  font-size:14px;
  display:inline;
  font-weight:bold;
`
const Label2 = styled.div`
  color:#222;
  font-size:19px;
  margin:20px auto 20px auto;
  font-weight:bold;
  width:50px;
`

const styles = {
	backButton: {
		color: '#8e8e8e',
		cursor: 'pointer',
		height: '20px'
	}
}

class NewStory extends React.Component {
	state = {
		layout: null
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	chooseLayout = layout => {
		this.setState({ layout })
	}
	selectedLayout = () => {
		var s = {
			title: '',
			publisher: parseInt(config.PID),
			status: 0,
			format: this.state.layout,
			html: '',
			writer: ''
		}
		api.createStory(s).then(story => {
			this.props.history.push('/me/stories/' + story._id + '/edit')
		})
	}
	render() {
		let { layout } = this.state
		let { theme } = this.context.setting.publisher
		return (
			<Container>
				<h1 className="nunito-font">Choose Layout</h1>
				<div className="row" style={{ marginTop: '60px', padding: '10px' }}>
					<div className="col-6">
						<Label2 className="nunito-font">News</Label2>
						<Layout
							style={{
								backgroundImage: 'url(/pic/news.png)',
								boxShadow: layout == 'NEWS'
									? '0 0 10px ' + theme.primaryColor
									: ''
							}}
							onClick={() => this.chooseLayout('NEWS')}
						/>
					</div>
					<div className="col-6">
						<Label2 className="nunito-font">Article</Label2>
						<Layout
							style={{
								backgroundImage: 'url(/pic/article.png)',
								boxShadow: layout == 'ARTICLE'
									? '0 0 10px ' + theme.primaryColor
									: ''
							}}
							onClick={() => this.chooseLayout('ARTICLE')}
						/>
					</div>
				</div>
				<div
					className="row"
					style={{ display: 'block', overflow: 'hidden', marginTop: '50px' }}
				>
					<RaisedButton
						label="next"
						labelStyle={{
							fontWeight: 'bold',
							fontSize: 15,
							top: 0,
							fontFamily: "'Nunito', 'Mitr'"
						}}
						labelColor="#fff"
						onClick={this.selectedLayout}
						labelPosition="before"
						overlayStyle={{ borderRadius: '20px' }}
						rippleStyle={{ borderRadius: '20px' }}
						style={{
							borderRadius: '20px',
							height: '40px',
							lineHeight: '40px',
							background: theme.primaryColor,
							boxShadow: 'none',
							float: 'right',
							visibility: layout == null ? 'hidden' : 'visible'
						}}
						buttonStyle={{
							borderRadius: '20px',
							background: theme.accentColor,
							border: '2px solid ' + theme.accentColor,
							padding: '0 2px'
						}}
						icon={
							<FontIcon className="material-icons">
								keyboard_arrow_right
							</FontIcon>
						}
					/>
				</div>
			</Container>
		)
	}
}

export default NewStory
