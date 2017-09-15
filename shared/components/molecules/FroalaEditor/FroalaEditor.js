import React from 'react'
import PropTypes from 'prop-types'
import Froala from 'react-froala-wysiwyg'
import api from '../../../services/api'
import { withRouter } from 'react-router'
import { BACKURL } from '../../../config'

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

		this.state = {}
	}

	froalaConfig = {
		charCounterCount: false,
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
			Caption: "font-family: 'PT Sans', 'cs_prajad'; font-size: 16px; color: #8e8e8e; font-weight: normal;",
			Source: "font-family:'PT Sans', 'cs_prajad'; font-size: 16px; color: #8e8e8e; font-weight: normal;"
			// 'Image source': "font-family: 'PT Sans', 'cs_prajad'; font-size: 14px; color: #CCC; font-style: italic; line-height: .1;"
		},
		linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
		linkInsertButtons: ['linkBack'],
		paragraphFormat: {
			H2: 'Head',
			H3: 'Subhead',
			N: 'Normal'
		},
		paragraphMultipleStyles: false,
		paragraphStyles: {
			'fr-text-caption': 'Caption',
			'fr-text-source': 'Source'
		},
		placeholderText: 'Write ...',
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
		videoDefaultWidth: 730,
		videoEditButtons: [],
		videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
		videoResize: true,
		imageUploadURL: this.props.imgURL
			? this.props.imgURL
			: `${BACKURL}/stories/${this.props.sid}/image`,
		imageUploadParam: 'image',
		imageMaxSize: 1024 * 1024 * 10
	}
	froalaConfigHighlight = {
		charCounterCount: false,
		linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
		linkInsertButtons: ['linkBack'],
		placeholderText: 'Write Highlight ...',
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

	componentDidMount() {}

	render() {
		var newConfig = this.froalaConfig
		newConfig.tableColors = [
			this.context.setting.publisher.theme.secondaryColor,
			this.context.setting.publisher.theme.accentColor,
			'#EAEAEA',
			'REMOVE'
		]
		return (
			<Froala
				tag="textarea"
				config={this.props.highlight ? this.froalaConfigHighlight : newConfig}
				model={this.props.model}
				onModelChange={this.props.onModelChange}
			/>
		)
	}
}

export default withRouter(FroalaEditor)
