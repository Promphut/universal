import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PrimaryButton, SecondaryButton } from 'components'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import auth from 'components/auth'
import api from 'components/api'
import { Helmet } from 'react-helmet'
// import $ from 'jquery'

// import 'blueimp-file-upload/js/vendor/jquery.ui.widget.js'
// import 'blueimp-file-upload/js/jquery.iframe-transport.js'
// import 'blueimp-file-upload/js/jquery.fileupload.js'
// import 'blueimp-file-upload/js/jquery.fileupload-image.js'

// import MediumEditor from 'medium-editor'
// require('medium-editor-insert-plugin')($)

const Container = styled.form`
  width:100%;
  padding:80px;
  border-bottom:1px solid #E2E2E2;
  .textTitle{
    color:#C2C2C2;
    font-family:'PT Sas';
    font-size:17px;
  }
  .head{
    color:#C2C2C2;
    font-family:'Nunito';
    font-size:18px;
    text-transform:uppercase;
  }
`

const Flex = styled.div`
  display:flex;
  items-align:center;
  flex-flow: row wrap;
`

const Title = styled.div`
  flex:2 150px;
  max-width:150px;
  color:#C2C2C2;
  font-size:17px;
  padding-top:15px;
`

const Edit = styled.div`
  flex:6 100%;
  max-width:100%;
`

const TextStatus = styled.div`
  color:${props => props.theme.primaryColor};
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
`

const AddTag = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
  margin-top:20px;
  display:inline;
`

const Paper = styled.div`
  position:relative;
  width:100%;
  min-height:500px;
  &:focus{
    outline: none;
  }
`

const PublisherAbout = () => {
	return <div></div>
}
// class PublisherAbout extends React.Component {
// 	state = {
// 		textStatus: 'Unsave',
// 		error: false
// 	}
// 	contextTypes = {
// 		setting: PropTypes.object
// 	}
// 	constructor(props) {
// 	    super(props)

// 	    this.aboutUs = props.aboutUs
// 	}

// 	setAboutUs = (aboutUs) => {
// 		this.aboutUs = aboutUs
// 		this.editor.setContent(aboutUs)
// 	}

// 	resetData = () => {
// 		if (this.props.aboutUs) this.editor.setContent(this.aboutUs) //this.editor.setContent(this.props.aboutUs)
// 	}

// 	updateAboutUs = (e) => {
// 		if (e) e.preventDefault()

// 		let { paper } = this.editor.serialize()

// 		if (paper && paper.value) {
// 			api
// 			.updatePublisher({
// 				aboutUs: paper.value
// 			})
// 			.then(pub => {
// 				this.aboutUs = pub.aboutUs

// 				this.setState({
// 					textStatus: 'Saved successfully',
// 					error: false
// 				})
// 			})
// 			.catch(err => {
// 				this.setState({
// 					textStatus: err.message,
// 					error: true
// 				})
// 			})
// 		}
// 	}

// 	componentWillReceiveProps(nextProps) {
// 		//this.editor.setContent(nextProps.aboutUs || '')
// 		this.setAboutUs(nextProps.aboutUs || '')
// 	}

// 	componentWillUnmount(){
// 		this.editor.destroy()
// 	}

// 	componentDidMount() {
// 		this.editor = new MediumEditor('#paper', {
// 			toolbar: {
// 				buttons: [
// 					{ name: 'bold', contentDefault: '<span class="fa fa-bold" ></span>' },
// 					{
// 						name: 'italic',
// 						contentDefault: '<span class="fa fa-italic" ></span>'
// 					},
// 					{
// 						name: 'underline',
// 						contentDefault: '<span class="fa fa-underline" ></span>'
// 					},
// 					{
// 						name: 'h1',
// 						action: 'append-h2',
// 						aria: 'Header',
// 						tagNames: ['h2'],
// 						style: { prop: 'font-size', value: '28px' },
// 						contentDefault: '<span class="fa fa-header" style="font-size:24px"><span>',
// 						classList: ['custom-class-h1'],
// 						attrs: { 'data-custom-attr': 'attr-value-h1' }
// 					},
// 					{
// 						name: 'h2',
// 						action: 'append-h3',
// 						aria: 'Subheader',
// 						tagNames: ['h3'],
// 						contentDefault: '<span class="fa fa-header" style="font-size:14px"><span>',
// 						classList: ['custom-class-h2'],
// 						attrs: { 'data-custom-attr': 'attr-value-h2' }
// 					},
// 					{
// 						name: 'quote',
// 						contentDefault: '<span class="fa fa-quote-left" ></span>'
// 					},
// 					{
// 						name: 'anchor',
// 						contentDefault: '<span class="fa fa-link" ></span>'
// 					},
// 					{
// 						name: 'justifyLeft',
// 						contentDefault: '<span class="fa fa-align-left" ></span>'
// 					},
// 					{
// 						name: 'justifyCenter',
// 						contentDefault: '<span class="fa fa-align-center" ></span>'
// 					},
// 					{
// 						name: 'justifyRight',
// 						contentDefault: '<span class="fa fa-align-right" ></span>'
// 					}
// 				]
// 			},
// 			targetBlank: true,
// 			placeholder: {
// 				text: 'Write a story ...'
// 			}
// 		})

// 		$('#paper').mediumInsert({
// 			editor: this.editor,
// 			addons: {
// 				images: {}
// 			}
// 		})

// 		// initialize editor content
// 		this.setAboutUs(this.aboutUs)

// 		//this.editor.setContent(this.state.aboutUs || '')
// 	}

// 	render() {
// 		let { error, textStatus, aboutUs } = this.state
// 		let { theme } = this.context.setting.publisher

// 		return (
// 			<Container onSubmit={this.updateAboutUs}>
// 				<Helmet>
// 					<link
// 						rel="stylesheet"
// 						href="/css/medium-editor.css"
// 						type="text/css"
// 					/>
// 					<link rel="stylesheet" href="/css/tim.css" type="text/css" />
// 					<link
// 						rel="stylesheet"
// 						href="/css/medium-editor-insert-plugin.css"
// 						type="text/css"
// 					/>
// 				</Helmet>
// 				<div className="head sans-font">About Us</div>
// 				<div className="sans-font" style={{ marginTop: -30, float: 'right' }}>
// 					<TextStatus style={{ color: error ? '#D8000C' : theme.accentColor }}>
// 						{textStatus}
// 					</TextStatus>
// 					<SecondaryButton
// 						label="Reset"
// 						onClick={this.resetData}
// 						style={{ float: 'left', margin: '0 0 0 20px' }}
// 					/>
// 					<PrimaryButton
// 						label="Save"
// 						type="submit"
// 						style={{ float: 'left', margin: '0 0 0 20px' }}
// 					/>
// 				</div>
// 				<br />
// 				<Flex>
// 					<Edit>
// 						<Paper id="paper" />
// 					</Edit>
// 				</Flex>
// 			</Container>
// 		)
// 	}
// }

export default PublisherAbout
