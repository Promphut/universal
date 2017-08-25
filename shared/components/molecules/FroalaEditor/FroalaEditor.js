import React from 'react'
import PropTypes from 'prop-types'
import Froala from 'react-froala-wysiwyg'
import api from '../../../services/api'
import { withRouter } from 'react-router'
import {BACKURL } from '../../../config'

// Require Editor JS and CSS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

import './custom.js'

class FroalaEditor extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {
		}
	}

	froalaConfig = {
		imageDefaultWidth: 0,
		imageEditButtons: [
			'imageAlignCustom',
			'imageAlt',
			'|',
			'imageLink',
			'linkOpen',
			'linkEdit',
			'linkRemove'
		],
		imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
		imageResize: false,
		imageDefaultAlign: 'center',
		inlineStyles: {
			Caption: "font-family: 'PT Sans', 'cs_prajad'; font-size: 16px; color: #8e8e8e; line-height: .5;",
			Source: "font-family:'PT Sans', 'cs_prajad'; font-size: 16px; color: #8e8e8e;"
			// 'Image source': "font-family: 'PT Sans', 'cs_prajad'; font-size: 14px; color: #CCC; font-style: italic; line-height: .1;"
		},
		linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
		linkInsertButtons: ['linkBack'],
		paragraphFormat: {
			H2: 'Head',
			H3: 'Subhead',
			N: 'Normal'
		},
		paragraphStyles: {
			'fr-text-caption': 'Caption',
			'fr-text-source': 'Source'
		},
		placeholderText: 'เขียนบทความ...',
		quickInsertButtons: false,
		tableEditButtons: [
			'tableHeader',
			'tableRemove',
			'|',
			'tableRows',
			'tableColumns',
			'-',
			'tableCells',
			'tableCellBackground',
			'tableCellVerticalAlign',
			'tableCellHorizontalAlign'
		],
		tableColors:[
			this.context.setting.publisher.theme.secondaryColor,
			this.context.setting.publisher.theme.accentColor,
			'#EAEAEA',
			'REMOVE'
		],
		tabSpaces: 4,
		toolbarButtons: [
			'bold',
			'italic',
			'underline',
			'|',
			'align',
			'formatOL',
			'formatUL',
			'insertHR',
			'-',
			'paragraphFormat',
			'paragraphStyle',
			'quote',
			'|',
			'insertLink',
			'insertImage',
			'insertVideo',
			'insertTable'
		],
		toolbarInline: true,
		toolbarVisibleWithoutSelection: true,
		videoDefaultWidth: 736,
		videoEditButtons: ['videoAlign'],
		videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
		videoResize: true,
		imageUploadURL: BACKURL+`/stories/${this.props.match.params.sid}/image`,
		imageUploadParam: 'image'
	}
	froalaConfigHighlight =  {
		charCounterCount: false,
		linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
		linkInsertButtons: ['linkBack'],
		placeholderText: '',
		quickInsertButtons: false,
		tabSpaces: 4,
		toolbarButtons: [
			'bold',
			'italic',
			'underline',
			'|',
			'formatOL',
			'formatUL',
			'|',
			'insertLink'
		],
		toolbarInline: true,
		toolbarVisibleWithoutSelection: true
	}

	componentDidMount() {

		const { theme } = this.context.setting.publisher
		let config = this.state.froalaConfig
		config.tableColors = [
			theme.secondaryColor,
			theme.accentColor,
			'#EAEAEA',
			'REMOVE'
		]
	}

	render() {
		return (
			<Froala
				tag="textarea"
				config={
					this.props.highlight
						? this.froalaConfigHighlight
						: this.froalaConfig
				}
				model={this.props.model}
				onModelChange={this.props.onModelChange}
			/>
		)
	}
}

export default withRouter(FroalaEditor)
