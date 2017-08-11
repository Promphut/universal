import React from 'react'
import PropTypes from 'prop-types'
import Froala from 'react-froala-wysiwyg'
import api from '../../../services/api'
import { withRouter } from 'react-router'

// Require Editor JS and CSS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

class FroalaEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			renderEditor: false,
			froalaConfig: {
				imageDefaultWidth: 736,
				imageEditButtons: ['imageReplace', 'imageAlt'],
				imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
				imageMove: false,
				imageResize: false,
				inlineStyles: {
					Caption: "font-family: 'PT Sans', 'cs_prajad'; font-size: 16px; color: #8e8e8e; line-height: .5;",
					Source: "font-family:'PT Sans', 'cs_prajad'; font-size: 16px; color: #8e8e8e;",
					'Image source': "font-family: 'PT Sans', 'cs_prajad'; font-size: 14px; color: #CCC; font-style: italic; line-height: .1;"
				},
				linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
				linkInsertButtons: ['linkBack'],
				paragraphFormat: {
					H2: 'Head',
					H3: 'Subhead',
					N: 'Normal'
				},
				placeholderText: 'เขียนบทความ...',
				quickInsertButtons: ['image', 'ul', 'ol', 'hr'],
				tabSpaces: 4,
				toolbarButtons: [
					'undo',
					'|',
					'bold',
					'italic',
					'underline',
					'|',
					'paragraphFormat',
					'inlineStyle',
					'align',
					'quote',
					'|',
					'insertLink',
					'insertImage',
					'insertVideo',
					'|',
					'help'
				],
				toolbarInline: true,
				videoDefaultWidth: 736,
				videoEditButtons: ['videoReplace'],
				videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
				videoMove: false,
				videoResize: true
			},
			froalaConfigHighlight: {
				charCounterCount: false,
				linkEditButtons: ['linkOpen', 'linkEdit', 'linkRemove'],
				linkInsertButtons: ['linkBack'],
				placeholderText: '',
				quickInsertButtons: ['ul', 'ol'],
				tabSpaces: 4,
				toolbarButtons: [
					'undo',
					'|',
					'bold',
					'italic',
					'underline',
					'|',
					'insertLink'
				],
				toolbarInline: true
			}
		}
	}

	componentDidMount() {
		api.getSignature(this.props.match.params.sid).then(res => {
			// console.log(this.props.match.params.sid)
			// console.log(res)
			let config = this.state.froalaConfig
			config.imageUploadToS3 = res
			this.setState({ froalaConfig: config }, () => {
				this.setState({ renderEditor: true })
			})
		})
	}

	render() {
		return (
			this.state.renderEditor &&
			<Froala
				tag="textarea"
				config={
					this.props.highlight
						? this.state.froalaConfigHighlight
						: this.state.froalaConfig
				}
				model={this.props.model}
				onModelChange={this.props.onModelChange}
			/>
		)
	}
}

export default withRouter(FroalaEditor)
