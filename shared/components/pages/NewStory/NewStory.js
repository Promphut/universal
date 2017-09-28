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
	EditorTopRight,
	Preview
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
			prevStory: {},
			menu: {},
			preview: {
				mode: 'editor',
				platform: 'desktop'
			},
			status: this.SAVE_STATUS.INITIAL,
			saveStatus: '',
			textNotification: '',
			showNotification: false
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentDidMount() {
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
			story.meta = story.meta ? story.meta : {}

			const prevStory = {
				column: story.column ? story.column : null,
				slug: story.slug ? story.slug : '',
				title: story.meta && story.meta.title ? story.meta.title : '',
				desc: story.meta && story.meta.desc ? story.meta.desc : ''
			}

			this.setState({ story, prevStory })
		}
	}

	autoSave = () => {
		let { story, prevStory, menu, status } = this.state

		if (status === this.SAVE_STATUS.DIRTIED) {
			const images = [].slice.call(
				document
					.getElementsByClassName('fr-wrapper')[1]
					.getElementsByTagName('img')
			)

			if (images) {
				const title = story.title ? story.title : null
				images.map((value, index) => {
					if (!value.getAttribute('alt')) value.setAttribute('alt', title)
				})
			}

			this.setState({ saveStatus: 'Saving...' })

			story.status = story.status === 1 ? 3 : story.status
			const newsCol = menu.columns.find(col => col.name === 'news')._id
			if (story.format === 'NEWS') {
				story.column = newsCol
				story.contentType = 'NEWS'
			} else {
				if (
					story.column === newsCol ||
					(story.column && story.column._id === newsCol)
				)
					story.column = prevStory.column ? prevStory.column : null
				story.contentType = story.contentType !== 'OTHER'
					? story.contentType
					: null
			}

			if (!story.meta.title) story.meta.title = prevStory.title
			if (!story.meta.desc) story.meta.desc = prevStory.desc

			api.updateStory(story._id, story).then(_story => {
				story.column = _story.column
				story.cover = _story.cover
				story.coverMobile = _story.coverMobile

				this.setState({
					story,
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
		let { story } = this.state
		story.title = e.target.value

		this.setState({ story }, this.update)
	}

	handleChangeHighlight = highlight => {
		let { story } = this.state
		story.highlight = highlight

		this.setState({ story }, this.update)
	}

	handleChangeHtml = html => {
		let { story } = this.state
		story.html = html

		this.setState({ story }, this.update)
	}

	handleChangeFocusWord = (e, focusWord) => {
		let { story } = this.state
		story.focusWord = focusWord

		this.setState({ story }, this.update)
	}

	handleChangeFormat = (e, format) => {
		let { story } = this.state
		story.format = format

		this.setState({ story }, this.update)
	}

	handleChangeColumn = (e, ind, column) => {
		let { story } = this.state
		story.column = column

		this.setState({ story }, this.update)
	}

	handleChangeType = (e, ind, type) => {
		let { story, menu } = this.state
		story.contentType = menu.types[type]

		this.setState({ story }, this.update)
	}

	handleChangeSlug = (e, slug) => {
		let { story } = this.state
		story.slug = slug

		this.setState({ story }, this.update)
	}

	handleChangeMetaTitle = (e, title) => {
		let { story } = this.state
		story.meta.title = title

		this.setState({ story }, this.update)
	}

	handleChangeMetaDesc = (e, desc) => {
		let { story } = this.state
		if (desc.length > 140) desc = desc.slice(0, 140)
		story.meta.desc = desc

		this.setState({ story }, this.update)
	}

	handleSaveStatus = status => {
		this.setState({ saveStatus: status })
	}

	handlePreview = (mode, platform) => {
		let { preview } = this.state
		preview.mode = mode ? mode : preview.mode
		preview.platform = platform ? platform : preview.platform

		this.autoSave()
		this.setState({ preview })
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
		const { children } = this.props
		const {
			story,
			prevStory,
			menu,
			preview,
			status,
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

		const saving = status === this.SAVE_STATUS.DIRTIED ? true : false
		const topRight = (
			<EditorTopRight
				story={story}
				prevStory={prevStory}
				menu={menu}
				status={status}
				saving={saving}
				saveStatus={this.handleSaveStatus}
				notification={this.showNotification}
				preview={this.handlePreview}
			/>
		)

		return (
			<Wrapper>
				<TopBarEditor left={topLeft} right={topRight} />
				<TopNotification text={textNotification} show={showNotification} />
				{preview.mode === 'editor'
					? <Container>
							<Main>
								<EditorMain
									story={story}
									changeTitle={this.handleChangeTitle}
									changeHighlight={this.handleChangeHighlight}
									changeHtml={this.handleChangeHtml}
								/>
							</Main>
							<Aside>
								<EditorCollapse
									story={story}
									prevStory={prevStory}
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
					: <Preview story={story} platform={preview.platform} />}
			</Wrapper>
		)
	}
}

export default NewStory
