import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import api from '../../../services/api'
import auth from '../../../services/auth'
import utils from '../../../services/utils'
import config from '../../../config'
import moment from 'moment'

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

const SaveStatus = styled.div`
	font-size: 14px;
	font-weight: normal;
	transition: .5s;
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
			saveStatus: '',
			textNotification: '',
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

	componentDidMount() {
		this.interval = setInterval(this.autoSave, 3000)
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

	componentWillUnmount() {
		clearInterval(this.interval)
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
				sid: story._id,
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
				},
				cover: story.cover ? story.cover : null,
				coverMobile: story.coverMobile ? story.coverMobile : null
			}

			this.setState({ story, content, setting })
		}
	}

	autoSave = () => {
		const { story, content, setting, menu, status } = this.state
		const title = content.title ? content.title : story.title

		if (status === this.SAVE_STATUS.DIRTIED) {
			const images = [].slice.call(
				document
					.getElementsByClassName('fr-wrapper')[1]
					.getElementsByTagName('img')
			)

			if (images) {
				images.map((value, index) => {
					if (!value.getAttribute('alt')) value.setAttribute('alt', title)
				})
			}

			this.setState({ saveStatus: 'Saving...' })

			let s = {}

			s.publisher = story.publisher
			s.title = content.title ? content.title : story.title
			s.highlight = content.highlight ? content.highlight : story.highlight
			s.html = content.html ? content.html : story.html
			s.focusWord = setting.focusWord ? setting.focusWord : story.focusWord
			s.format = setting.format ? setting.format : story.format
			s.status = story.status === 1 ? 3 : story.status

			s.meta = { title: '', desc: '' }
			if (setting && setting.title) s.meta.title = setting.title
			else if (story.meta && story.meta.title) s.meta.title = story.meta.title
			else s.meta.title = ''

			if (setting && setting.desc) s.meta.desc = setting.desc
			else if (story.meta && story.meta.desc) s.meta.desc = story.meta.desc
			else s.meta.desc = ''

			if (s.format === 'NEWS') {
				s.column = menu.columns.find(col => col.name === 'news')._id
				s.contentType = 'NEWS'
			} else {
				s.column = setting.column ? setting.column : null
				s.contentType = setting.type ? setting.type : null
				s.contentType = s.contentType !== 'OTHER' ? s.contentType : null
			}

			api.updateStory(story._id, s).then(story => {
				this.setState({
					status: this.SAVE_STATUS.UNDIRTIED,
					saveStatus: `Saved ${moment(new Date()).calendar()}`
				})
			})
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

		this.setState({ content }, this.update)
	}

	handleChangeHighlight = highlight => {
		let { content } = this.state
		content.highlight = highlight

		this.setState({ content }, this.update)
	}

	handleChangeHtml = html => {
		let { content } = this.state
		content.html = html

		this.setState({ content }, this.update)
	}

	handleChangeFocusWord = (e, focusWord) => {
		let { content, setting } = this.state
		content.focusWord = focusWord
		setting.focusWord = focusWord

		this.setState({ content, setting }, this.update)
	}

	handleChangeFormat = (e, format) => {
		let { setting } = this.state
		setting.format = format

		this.setState({ setting }, this.update)
	}

	handleChangeColumn = (e, ind, column) => {
		let { setting } = this.state
		setting.column = column

		this.setState({ setting }, this.update)
	}

	handleChangeType = (e, ind, type) => {
		let { setting, menu } = this.state
		setting.type = menu.types[type]

		this.setState({ setting }, this.update)
	}

	handleChangeSlug = (e, slug) => {
		let { setting } = this.state
		setting.slug = slug

		this.setState({ setting }, this.update)
	}

	handleChangeMetaTitle = (e, title) => {
		let { setting } = this.state
		setting.title = title

		this.setState({ setting }, this.update)
	}

	handleChangeMetaDesc = (e, desc) => {
		let { setting } = this.state
		if (desc.length > 140) desc = desc.slice(0, 140)
		setting.desc = desc

		this.setState({ setting }, this.update)
	}

	handleSaveStatus = status => {
		this.setState({ saveStatus: status })
	}

	update = () => {
		this.setState({
			saveStatus: 'Unsave',
			status: this.SAVE_STATUS.DIRTIED
		})
	}

	showNotification = textNotification => {
		this.setState({ textNotification, showNotification: true })

		setTimeout(() => {
			this.setState({ textNotification: '', showNotification: false })
		}, 5000)
	}

	render() {
		const { onLoading } = this.props
		const {
			story,
			content,
			setting,
			menu,
			saveStatus,
			textNotification,
			showNotification
		} = this.state

		const topLeft = (
			<TopLeft>
				<SaveStatus>
					{saveStatus}
				</SaveStatus>
			</TopLeft>
		)

		const topRight = (
			<EditorTopRight
				story={story}
				content={content}
				setting={setting}
				menu={menu}
				saveStatus={this.handleSaveStatus}
				notification={this.showNotification}
			/>
		)

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
					<Aside>
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
