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

		this.state = {
			froalaConfig: {
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
				quickInsertButtons: ['image', 'table', 'hr'],
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
					'|',
					'paragraphFormat',
					'paragraphStyle',
					'quote',
					'|',
					'insertLink',
					'insertImage',
					'insertVideo',
					'insertTable'
				],
				// toolbarInline: true,
				// toolbarVisibleWithoutSelection: true,
				videoDefaultWidth: 730,
				videoEditButtons: [],
				videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
				videoResize: true,
				imageUploadParam: 'image',
				imageMaxSize: 1024 * 1024 * 10,
				events: {
					'froalaEditor.paste.beforeCleanup': function(
						e,
						editor,
						clipboard_html
					) {
						var $html = $('<div>' + clipboard_html + '</div>')
						var $span = $html.find('span')
						$span.each(function(i, field) {
							var style = field.style
							var s = style['font-weight'] == 700
							var ul = style['text-decoration'] == 'underline'
							var fs = style['font-style'] == 'italic'
							$(field).html(
								`${s ? '<strong>' : ''}${fs ? '<em>' : ''}${ul ? '<u>' : ''}${field.innerHTML}${ul ? '</u>' : ''}${fs ? '</em>' : ''}${s ? '</strong>' : ''}`
							)
						})
						var newHTML = $html.html()
						// console.log(newHTML)
						return newHTML
					}
				}
			},
			froalaConfigHighlight: {
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
		}
	}

	componentWillReceiveProps = nextProps => {
		let { froalaConfig } = this.state

		if (
			froalaConfig.imageUploadURL === undefined ||
			this.props.sid !== nextProps.sid
		) {
			froalaConfig.imageUploadURL = this.props.imgURL
				? this.props.imgURL
				: `${BACKURL}/stories/${nextProps.sid}/image`

			this.setState({ froalaConfig })
		}
	}

	render() {
		const { sid } = this.props

		let newConfig = this.state.froalaConfig
		newConfig.tableColors = [
			this.context.setting.publisher.theme.secondaryColor,
			this.context.setting.publisher.theme.accentColor,
			'#EAEAEA',
			'REMOVE'
		]

		return (
			<div>
			{ sid ? <Froala
				tag="textarea"
				config={this.props.highlight ? this.state.froalaConfigHighlight : newConfig}
				model={this.props.model}
				onModelChange={this.props.onModelChange}
				/> : null
			}
			</div>
		)
	}
}

export default withRouter(FroalaEditor)
