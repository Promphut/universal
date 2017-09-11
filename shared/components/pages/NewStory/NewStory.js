import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import api from '../../../services/api'
import auth from '../../../services/auth'
import utils from '../../../services/utils'
import config from '../../../config'

import {
	TopBarEditor,
	TopNotification,
	EditorCss,
	EditorMain,
	EditorCollapse,
	EditorTopRight
} from '../../../components'

const Wrapper = styled.div`
	width:100%;
`

const Container = styled(EditorCss)`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	width: 1110px;
	margin: 0 auto;
	
	@media(max-width:480px){
		max-width: 100%;
	}
`

const Main = styled.div`
	width: 731px;
	margin-top: 92px;
`

const Aside = styled.div`
	width: 334px;
	margin-left: 37px;
	margin-top: 92px;
`

const TopLeft = styled.div`
	display: inherit;
	align-items: center;
	margin-left: 20px;
`

const TopRight = styled.div`
	display: inherit;
	align-items: center;
	margin-right: 20px;
`

const SavedTime = styled.div`
	font-size: 14px;
	font-weight: normal;
`

class NewStory extends React.Component {
	SAVE_STATUS = {
		INITIAL: 0,
		DIRTIED: 1,
		UNDIRTIED: 2
	}

	constructor(props) {
		super(props)

		this.state = {
			publisher: parseInt(config.PID),
			story: {},
			content: {},
			setting: {},
			menu: {},
			status: this.SAVE_STATUS.INITIAL,
			textNotification: 'Story must have title before publishing.',
			showNotification: false
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentWillMount() {
		const { publisher } = this.state

		if (this.props.match.params.sid) {
			const sid = parseInt(this.props.match.params.sid)

			this.canEditStory(sid)
		} else {
			let newStory = {
				publisher,
				status: this.SAVE_STATUS.INITIAL,
				title: '',
				html: '',
				writer: '',
				format: 'NEWS'
			}

			api.createStory(newStory).then(story => {
				this.setStory(story)
			})
		}

		this.getColumns()
		this.getTypes()
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.sid) {
			const sid = parseInt(this.props.match.params.sid)
			const nextSid = parseInt(nextProps.match.params.sid)

			if (nextSid !== sid) {
				this.canEditStory(nextSid)
			}
		}
	}

	canEditStory(sid) {
		api
			.getStoryFromSid(sid, auth.getToken(), false)
			.then(result => {
				if (!result.canEditStory) return utils.toError(this.props.history)

				this.setStory(result.story)
			})
			.catch(err => {
				utils.toError(this.props.history, err)
			})
	}

	setStory = story => {
		if (story) {
			const content = {
				title: story.title ? story.title : '',
				highlight: story.highlight ? story.highlight : null,
				html: story.html ? story.html : '',
				focusWord: story.focusWord ? story.focusWord : null
			}

			const setting = {
				format: story.format ? story.format : 'NEWS',
				column: story.column ? story.column._id : null,
				type: story.contentType ? story.contentType : null,
				focusWord: story.focusWord ? story.focusWord : '',
				slug: story.slug ? story.slug : '',
				title: story.meta && story.meta.title ? story.meta.title : '',
				desc: story.meta && story.meta.desc ? story.meta.desc : '',
				hint: {
					slug: story.slug ? story.slug : '',
					title: story.meta && story.meta.title ? story.meta.title : '',
					desc: story.meta && story.meta.desc ? story.meta.desc : ''
				}
			}

			this.setState({ story, content, setting })
		}
	}

	getColumns = () => {
		const { menu } = this.state

		api.getColumns().then(columns => {
			menu.columns = columns

			this.setState({ menu })
		})
	}

	getTypes = () => {
		const { menu } = this.state

		api.getContentTypes().then(types => {
			menu.types = types

			this.setState({ menu })
		})
	}

	handleChangeTitle = e => {
		let { content } = this.state
		content.title = e.target.value

		this.setState({ content })
	}

	handleChangeHighlight = highlight => {
		let { content } = this.state
		content.highlight = highlight

		this.setState({ content })
	}

	handleChangeHtml = html => {
		let { content } = this.state
		content.html = html

		this.setState({ content })
	}

	handleChangeFocusWord = (e, focusWord) => {
		let { content, setting } = this.state
		content.focusWord = focusWord
		setting.focusWord = focusWord

		this.setState({ content, setting })
	}

	handleChangeFormat = (e, format) => {
		let { setting } = this.state
		setting.format = format

		this.setState({ setting })
	}

	handleChangeColumn = (e, ind, column) => {
		let { setting } = this.state
		setting.column = column

		this.setState({ setting })
	}

	handleChangeType = (e, ind, type) => {
		let { setting, menu } = this.state
		setting.type = menu.types[type]

		this.setState({ setting })
	}

	handleChangeSlug = (e, slug) => {
		let { setting } = this.state
		setting.slug = slug

		this.setState({ setting })
	}

	handleChangeMetaTitle = (e, title) => {
		let { setting } = this.state
		setting.title = title

		this.setState({ setting })
	}

	handleChangeMetaDesc = (e, desc) => {
		let { setting } = this.state
		if (desc.length > 140) desc = desc.slice(0, 140)
		setting.desc = desc

		this.setState({ setting })
	}

	preSave = (format, type) => {
		const { menu } = this.state

		if (format === 'NEWS') {
			column = menu.columns.find(col => col.name === 'news')._id
			type = 'NEWS'
		}
	}

	showNotification = millsec => {
		this.setState({ showNotification: true })

		setTimeout(() => {
			this.setState({ showNotification: false })
		}, millsec)
	}

	render() {
		const { onLoading } = this.props
		const {
			story,
			content,
			setting,
			menu,
			textNotification,
			showNotification
		} = this.state

		const topLeft = (
			<TopLeft>
				<SavedTime>
					Saved at 10:30AM
				</SavedTime>
			</TopLeft>
		)

		const topRight = <EditorTopRight story={story} />

		return (
			<Wrapper>
				<TopBarEditor left={topLeft} right={topRight} />
				<TopNotification text={textNotification} show={showNotification} />
				<Container>
					<Main>
						<EditorMain
							story={content}
							changeTitle={this.handleChangeTitle}
							changeHighlight={this.handleChangeHighlight}
							changeHtml={this.handleChangeHtml}
						/>
					</Main>
					<Aside onClick={() => this.showNotification(5000)}>
						<EditorCollapse
							story={setting}
							menu={menu}
							changeFormat={this.handleChangeFormat}
							changeColumn={this.handleChangeColumn}
							changeType={this.handleChangeType}
							changeFocusWord={this.handleChangeFocusWord}
							changeSlug={this.handleChangeSlug}
							changeMetaTitle={this.handleChangeMetaTitle}
							changeMetaDesc={this.handleChangeMetaDesc}
						/>
					</Aside>
				</Container>
			</Wrapper>
		)
	}
}

export default NewStory
