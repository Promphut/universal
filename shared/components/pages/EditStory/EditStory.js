import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
	PrimaryButton,
	SecondaryButton,
	UploadPicture,
	DropdownWithIcon,
	Alert,
	MenuList,
	EditorCss,
	AnalyticContainer,
	FroalaEditor
} from '../../../components'
import { findDOMNode as dom } from 'react-dom'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Request from 'superagent'
import auth from '../../../services/auth'
import Snackbar from 'material-ui/Snackbar'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import DropDownMenu from 'material-ui/DropDownMenu'
import AutoComplete from 'material-ui/AutoComplete'
import Chip from 'material-ui/Chip'
import moment from 'moment'
import CircularProgress from 'material-ui/CircularProgress'
import SwipeableViews from 'react-swipeable-views'
import { Helmet } from 'react-helmet'
import api from '../../../services/api'
import config from '../../../config'
import pullAllWith from 'lodash/pullAllWith'
import isEqual from 'lodash/isEqual'
import utils from '../../../services/utils'
import merge from 'lodash/merge'

const Container = styled(EditorCss)`
	width: 855px;
	padding: 60px;
	border-bottom: 1px solid #E2E2E2;
`

const HighlightBox = styled.div`
  width: 100%;
  padding: 2px;
  background: linear-gradient(135deg, ${props => props.theme.primaryColor} 0%, ${props => props.theme.accentColor} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
`
const Highlight = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 20px;

  &:focus {
    outline: none;
  }
`
const HighlightText = styled.span`
  position: relative;
  top: 10px;
  left: 20px;
  z-index: 5;
  color: ${props => props.theme.primaryColor};
  text-align: center;
  padding: 0 9px;
  font-size: 14px;
  font-weight: bold;
  font-family: 'PT Sans';
  background: white;
  border-left: 2px solid ${props => props.theme.accentColor};
  border-right: 2px solid ${props => props.theme.accentColor};
`
const Title = styled.textarea`
  margin: 15px 0 0 0;
  font-size: 36px;
  font-weight: bold;
  height: 105px;
  overflowY: hidden;
  color: #222;
  width: 100%;
  outline: none;
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
`

const Divider = styled.div`
  width: 100%;
  min-height: 1px;
  margin: 30px 0 30px 0;
  background-color: #bfbfbf;
`

const TextStatus = styled.div`
  font-size: 15px;
  font-style: italic;
  color: ${props => props.theme.accentColor};
  display: inline;
  float: right;
  padding: 12px 20px 12px 20px;
`
const Layout = styled.div`
  width: 307px;
  height: 439px;
  background-position: center;
  background-size: cover;
  margin: 0 auto 0 auto;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px ${props => props.theme.primaryColor};
  }
`
const Label = styled.div`
  color: #222;
  font-size: 14px;
  display: inline;
  font-weight: bold;
`
const Label2 = styled.div`
  color: #222;
  font-size: 19px;
  margin: 20px auto 20px auto;
  font-weight: bold;
  width: 50px;
`
const Delete = styled.div`
  color: #bfbfbf;
  font-size: 14px;
  text-decoration: underline;

  &:hover {
    cursor:pointer;
    color:#222;
  }
`

const BasicSetting = styled.div`
`

const AdvanceSetting = styled.div`
`

const AdvancedEdit = styled.div`
  font-family: 'Nunito', 'Mitr';
  color: #8E8E8E;
  text-decoration: underline;
  cursor: pointer;
  float: right;
  display: inline-block;

  &:hover {
    color: #222;
  }
`
const HintLabel = styled.div`
  margin-left: 130px;
  color: #C2C2C2;
  font-style: italic;
  font-size: 11px;
  line-height: 8px;
`
const styles = {
	backButton: {
		color: '#8e8e8e',
		cursor: 'pointer',
		height: '20px'
	}
}

class EditStory extends React.Component {
	SAVE_STATUS = {
		INITIAL: 0,
		DIRTIED: 1,
		UNDIRTIED: 2
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {
			story: {},

			chooseLayout: null,
			layout: 'news',
			open: false,
			column: null,
			contentType: 'NEWS',
			html: '',
			highlight: '',

			focusWord: '',
			tag: [],
			addTag: [],
			pureTag: [],
			searchText: '',

			columnList: [],
			contentTypeList: [],
			sid: props.match.params.sid,
			saveStatus: null,

			alert: false,

			title: '',
			slug: '',
			metaDesc: '',
			metaTitle: '',

			saveOnload: false,
			publishStatus: '',

			status: this.SAVE_STATUS.INITIAL,
			settingSlideIndex: 0,
			content: 'content'
		}
	}

	handleModelChangeHtml = html => {
		this.setState({ html,saveStatus: 'Unsave',status: this.SAVE_STATUS.DIRTIED, })
	}

	handleModelChangeHighlight = highlight => {
		this.setState({ highlight,saveStatus: 'Unsave',status: this.SAVE_STATUS.DIRTIED, })
	}

	chooseNews = () => {
		this.setState({ layout: 'news' })
	}

	chooseArticle = () => {
		this.setState({ layout: 'article' })
	}

	selectedLayout = () => {
		this.setState({ chooseLayout: 1 })
	}

	changeFocusWord = e => {
		if (this.state.status === this.SAVE_STATUS.DIRTIED) {
			this.setState({
				focusWord: e.target.value,
				saveStatus: 'Unsave'
			})
		} else {
			this.setState({
				focusWord: e.target.value,
				status: this.SAVE_STATUS.DIRTIED,
				saveStatus: 'Unsave'
			})
		}
	}

	handleEditableInput = (e, editable) => {
		if (this.state.status === this.SAVE_STATUS.INITIAL) {
			this.setState({
				status: this.SAVE_STATUS.UNDIRTIED,
				saveStatus: ''
			})
		} else {
			this.setState({
				status: this.SAVE_STATUS.DIRTIED,
				saveStatus: 'Unsave'
			})
		}
	}

	handleRequestClose = () => {
		this.setState({ open: false })
	}

	popoverSave = e => {
		this.setState({
			open: true,
			anchorEl: e.currentTarget
		})
	}

	chooseColumn = (e, ind, val) => {
		this.setState({
			column: val,
			status: this.SAVE_STATUS.DIRTIED,
			saveStatus: 'Unsave'
		})
	}

	chooseContentType = (e, ind, val) => {
		const contentType = this.state.contentTypeList[val]
		this.setState({
			contentType,
			status: this.SAVE_STATUS.DIRTIED,
			saveStatus: 'Unsave'
		})
	}

	getTags = () => {
		api.getTags().then(tags => {
			let result = []
			tags.map((tag, i) => {
				result[i] = { text: tag.name, value: tag._id, id: tag._id }
			})

			this.setState({
				tag: result,
				pureTag: tags
			})
		})
	}

	getColumns = () => {
		api.getColumns().then(cols => {
			this.setState({ columnList: cols })
		})
	}

	getContentType = () => {
		api.getContentTypes().then(types => {
			this.setState({ contentTypeList: types })
		})
	}

	autoSave = () => {
		let {
			sid,
			title,
			column,
			contentType,
			focusWord,
			story,
			highlight,
			html
		} = this.state

		if (this.state.status === this.SAVE_STATUS.DIRTIED) {
			const images = [].slice.call(
				document.getElementsByClassName('fr-wrapper')[1].getElementsByTagName('img')
			)

			if (images) {
				images.map((value, index) => {
					if(!value.getAttribute('alt'))
						value.setAttribute('alt', title)
				})
			}

			this.setState({
				saveStatus: 'Saving...'
			})

			let s = {
				title,
				publisher: parseInt(config.PID),
				html,
				focusWord,
				meta: story.meta,
				highlight
			}
			if (column) s.column = column
			s.contentType = contentType

			if (story.status == 1) {
				s.status = 3
			}

			api.updateStory(sid, s).then(story => {
				this.setState({
					status: this.SAVE_STATUS.UNDIRTIED,
					saveStatus: `Saved ${moment(new Date()).calendar()}`
				})
			})
		}
	}

	publishStory = () => {
		let {
			sid,
			column,
			contentType,
			title,
			focusWord,
			columnList,
			story,
			highlight,
			html
		} = this.state

		let s = {
			title,
			publisher: parseInt(config.PID),
			focusWord,
			html,
			format: columnList.find(col => col._id == column).name == 'news' ||
				columnList.find(col => col._id == column).name == 'News'
				? 'NEWS'
				: 'ARTICLE',
			meta: story.meta,
			highlight
		}

		if (story.status == 0) {
			s.status = 1
		}

		if (column) s.column = column
		s.contentType = contentType

		api
			.updateStory(sid, s)
			.then(story => {
				this.props.history.push(story.url)
			})
			.catch(err => {
				this.setState({
					publishStatus: err.message,
					open: false
				})
			})
	}

	unpublishStory = e => {
		api
			.updateStory(this.state.sid, { status: 0 })
			.then(story => {
				this.setState({
					sid: story._id,
					saveStatus: 'Story has been unpublished.',
					open: false,
					story: {
						status: 0
					}
				})
			})
			.catch(err => {
				this.setState({
					publishStatus: err.message,
					open: false
				})
			})
	}

	deleteStory = () => {
		api.deleteStory(this.state.sid).then(() => {
			this.props.history.push('/me/stories')
		})
	}

	selectedTag = (sel, index) => {
		var { tag, addTag, pureTag, sid } = this.state
		// console.log(sel)
		Request.post(
			`${config.BACKURL}/stories/${sid}/tags/${sel.id}?token=${auth.getToken()}`
		).end((err, res) => {
			if (err) throw err
			else {
				var addedTag = addTag
				var allTag = pureTag
				addedTag.push(sel)
				var Tag = tag
				var newTag = tag
				Tag.map((data, index) => {
					if (data.text == sel.text) {
						newTag.splice(index, 1)
					}
				})
				this.setState({
					addTag: addedTag,
					searchText: '',
					tag: newTag
				})
			}
		})
	}

	removeSelectedTag = (data, index) => {
		var { sid, tag, addTag } = this.state
		// console.log(data)
		Request.delete(
			`${config.BACKURL}/stories/${sid}/tags/${data.id}?token=${auth.getToken()}`
		).end((err, res) => {
			if (err) throw err
			else {
				var Tag = tag
				Tag.push(data)
				var addedTag = addTag
				addedTag.splice(index, 1)
				this.setState({
					tag: Tag,
					addTag: addedTag
				})
			}
		})
	}

	handleUpdateInput = searchText => {
		this.setState({
			searchText
		})
	}

	alertClose = () => {
		this.setState({ alert: false })
	}

	showAlert = e => {
		this.setState({
			alert: true,
			alertWhere: e.currentTarget,
			alertDesc: 'Are you sure to delete this story ?',
			alertConfirm: this.deleteStory
		})
	}

	titleChanged = e => {
		if (this.state.status === this.SAVE_STATUS.DIRTIED) {
			this.setState({
				title: e.target.value,
				saveStatus: 'Unsave'
			})
		} else {
			this.setState({
				title: e.target.value,
				status: this.SAVE_STATUS.DIRTIED,
				saveStatus: 'Unsave'
			})
		}
	}

	settingHandleChange = value => {
		this.setState({
			settingSlideIndex: value
		})
	}

	changeSlug = e => {
		this.setState({ slug: e.target.value })
	}

	changeTitle = e => {
		this.setState({ metaTitle: e.target.value })
	}

	changeDesc = e => {
		this.setState({ metaDesc: e.target.value })
	}

	changeMeta = () => {
		var sid = this.state.sid
		var slug = this.state.slug
		var title = this.state.metaTitle
		var desc = this.state.metaDesc
		var s = {
			slug,
			meta: {
				title,
				desc
			}
		}

		api.updateStory(sid, s).then(story => {
			this.setState({
				story
			})
		})
	}

	resetMeta = () => {
		var s = this.state.story
		// console.log(s)
		this.setState({
			slug: s.slug,
			metaTitle: s.meta.title,
			metaDesc: s.meta.desc
		})
	}

	getStoryDetail = story => {
		if (story) {
			//console.log('story', story)
			this.setState({
				story,
				title: story.title,
				slug: story.slug,
				metaTitle: story.meta && story.meta.title,
				metaDesc: story.meta && story.meta.desc,
				column: story.column ? story.column._id : null,
				contentType: story.contentType ? story.contentType : 'NEWS',
				focusWord: story.focusWord,
				html: story.html,
				highlight: story.highlight
			})
		}
	}

	getStoryTags = sid => {
		api.getStoryTags(sid).then(tags => {
			let result = []
			tags.map((tag, i) => {
				result[i] = { text: tag.name, value: tag._id, id: tag._id }
			})
			this.setState({
				addTag: result
			})
		})
	}

	checkCanEditStory(sid) {
		api
			.getStoryFromSid(sid, auth.getToken(), false)
			.then(result => {
				if (!result.canEditStory) return utils.toError(this.props.history)

				this.getStoryDetail(result.story)
				this.getStoryTags(sid)
			})
			.catch(err => {
				utils.toError(this.props.history, err)
			})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.sid != this.props.match.params.sid) {
			this.checkCanEditStory(nextProps.match.params.sid)
		}
	}

	componentWillMount() {
		this.checkCanEditStory(parseInt(this.props.match.params.sid))
	}

	componentDidMount() {
		this.interval = setInterval(this.autoSave, 3000)

		this.getTags()
		this.getColumns()
		this.getContentType()
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		let {
			chooseLayout,
			layout,
			open,
			anchorEl,
			column,
			contentType,
			tag,
			addTag,
			searchText,
			columnList,
			contentTypeList,
			sid,
			alert,
			alertWhere,
			alertConfirm,
			alertDesc,
			saveStatus,
			title,
			publishStatus,
			story,
			slug,
			metaTitle,
			metaDesc,
			html,
			focusWord,
			status,
			highlight
		} = this.state

		const dataSourceConfig = { text: 'text', value: 'value', id: 'id' }
		let { theme } = this.context.setting.publisher

		let contentTypeId = 0
		for (let i = 0; i < contentTypeList.length; i++) {
			if (contentTypeList[i] == contentType) {
				contentTypeId = i
			}
		}

		return (
			<Container onSubmit={this.updateData}>
				{/* <Helmet>
          <link rel="stylesheet" href="/css/tim.css" type="text/css"/>
          <link rel="stylesheet" href="/css/medium-editor.css" type="text/css"/>
        </Helmet> */}
				<Alert
					open={alert}
					anchorEl={alertWhere}
					onRequestClose={this.alertClose}
					description={alertDesc}
					confirm={alertConfirm}
				/>
				<RaisedButton
					onClick={this.popoverSave}
					label="Publish"
					labelStyle={{
						fontWeight: 'bold',
						fontSize: 15,
						top: 0,
						fontFamily: "'Nunito', 'Mitr'"
					}}
					labelColor="#fff"
					labelPosition="before"
					overlayStyle={{ borderRadius: '20px' }}
					rippleStyle={{ borderRadius: '20px' }}
					style={{
						borderRadius: '20px',
						height: '40px',
						lineHeight: '40px',
						background: theme.accentColor,
						boxShadow: 'none',
						float: 'right',
						visibility: sid != null ? 'visible' : 'hidden'
					}}
					buttonStyle={{
						borderRadius: '20px',
						background: theme.accentColor,
						border: `2px solid ${theme.accentColor}`,
						padding: '0 2px'
					}}
					icon={
						<FontIcon className="material-icons">keyboard_arrow_down</FontIcon>
					}
				>
					<Popover
						open={open}
						anchorEl={anchorEl}
						autoCloseWhenOffScreen={false}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						targetOrigin={{ horizontal: 'right', vertical: 'top' }}
						onRequestClose={this.handleRequestClose}
						style={{
							border: `3px solid ${theme.accentColor}`,
							width: '490px',
							padding: '30px',
							marginTop: 8,
							boxShadow: 'none',
							overflow: 'hidden'
						}}
					>
						<SwipeableViews
							index={this.state.settingSlideIndex}
							onChangeIndex={this.settingHandleChange}
						>
							<BasicSetting>
								<AdvancedEdit onClick={() => this.settingHandleChange(1)}>
									Advanced Edit
								</AdvancedEdit>
								<div className="" style={{ display: 'block', clear: 'both' }}>
									<Label
										className="nunito-font or"
										style={{
											float: 'left',
											marginTop: '22px',
											minWidth: '57px'
										}}
									>
										Column :{' '}
									</Label>
									<SelectField
										hintText="Please Select Column First"
										value={column}
										onChange={this.chooseColumn}
										autoWidth={false}
										hintStyle={{ top: '5px', left: '24px' }}
										labelStyle={{ top: '-11px', left: '24px' }}
										iconStyle={{ top: '-8px', left: '300px' }}
										style={{
											margin: '15px 0 15px 15px',
											width: '340px',
											height: '34px',
											border: '1px solid #e2e2e2',
											float: 'left'
										}}
										underlineStyle={{ display: 'none' }}
										menuStyle={{ width: '320px' }}
										menuItemStyle={{ width: '320px' }}
										selectedMenuItemStyle={{
											color: '#222',
											background: theme.accentColor
										}}
									>
										{columnList.length != 0 &&
											columnList.map((data, index) => (
												<MenuItem
													value={data._id}
													primaryText={data.name}
													key={index}
												/>
											))}
									</SelectField>
									<Label
										className="nunito-font or"
										style={{
											float: 'left',
											marginTop: '22px',
											minWidth: '57px'
										}}
									>
										Type :{' '}
									</Label>
									<DropDownMenu
										value={contentTypeId}
										onChange={this.chooseContentType}
										autoWidth={false}
										labelStyle={{ top: '-11px' }}
										iconStyle={{ top: '-8px', left: '300px' }}
										style={{
											margin: '15px 0 15px 15px',
											width: '340px',
											height: '34px',
											border: '1px solid #e2e2e2',
											float: 'left'
										}}
										underlineStyle={{ display: 'none' }}
										menuStyle={{ width: '320px' }}
										menuItemStyle={{ width: '320px' }}
										selectedMenuItemStyle={{
											color: '#222',
											background: theme.accentColor
										}}
									>
										<MenuItem value="no" primaryText="No Type" />
										{contentTypeList.length != 0 &&
											contentTypeList.map((data, index) => (
												<MenuItem
													value={index}
													primaryText={data}
													key={index}
												/>
											))}
									</DropDownMenu>
									<Label
										className="nunito-font or"
										style={{
											float: 'left',
											marginTop: '22px',
											minWidth: '60px'
										}}
									>
										Focus Word :{' '}
									</Label>
									<TextField
										value={this.state.focusWord}
										onChange={this.changeFocusWord}
										hintText="Enter Keyword"
										style={{
											width: '310px',
											float: 'right',
											marginRight: '20px',
											marginTop: '5px'
										}}
									/>
								</div>
								<div
									className=""
									style={{
										display: 'block',
										clear: 'both',
										overflow: 'hidden'
									}}
								>
									<Label
										className="nunito-font"
										style={{ float: 'left', marginTop: '26px' }}
									>
										Add up to 5 tags :{' '}
									</Label>
									<div
										className="row"
										style={{ marginTop: '15px', paddingLeft: '5px' }}
									>
										{addTag.length != 0
											? addTag.map((data, index) => (
													<Chip
														key={index}
														onRequestDelete={() =>
															this.removeSelectedTag(data, index)}
														style={{ margin: '4px' }}
													>
														{data.text}
													</Chip>
												))
											: ''}
										{tag.length != 0
											? <AutoComplete
													hintText="Add a Tag..."
													dataSource={pullAllWith(tag, addTag, isEqual)}
													filter={AutoComplete.fuzzyFilter}
													onNewRequest={this.selectedTag}
													onUpdateInput={this.handleUpdateInput}
													openOnFocus
													searchText={searchText}
													dataSourceConfig={dataSourceConfig}
												/>
											: ''}
									</div>
								</div>
								<Divider />
								<div
									className=""
									style={{ overflow: 'hidden', display: 'block' }}
								>
									<TextStatus
										className="sans-font"
										style={{
											color: '#DC143C',
											float: 'right',
											marginTop: '30px'
										}}
									>
										{publishStatus}
									</TextStatus>
								</div>
								<div
									className="row"
									style={{
										display: 'block',
										overflow: 'hidden',
										marginTop: '0px'
									}}
								>
									<Delete
										style={{ float: 'left', margin: '10px' }}
										onClick={this.showAlert}
									>
										Delete
									</Delete>
									<PrimaryButton
										label={story.status == 1 ? 'update' : 'publish'}
										style={{ float: 'right' }}
										onClick={this.publishStory}
										disabled={!column}
									/>
									{/* <PrimaryButton label={story.status===1 ? moment(story.published).format('ddd, [at] h:mm a') : 'Publish'} style={{float:'right'}} onClick={this.publishStory} iconName="done"/> */}
									{/* <SecondaryButton label="Save" style={{float:'right',marginRight:'20px'}} onClick={this.save}/> */}
									{story.status === 1 &&
										<SecondaryButton
											label="Unpublish"
											style={{ float: 'right', marginRight: '20px' }}
											onClick={this.unpublishStory}
										/>}
								</div>
							</BasicSetting>
							<AdvanceSetting>
								<FontIcon
									className="material-icons"
									style={styles.backButton}
									onClick={() => this.settingHandleChange(0)}
								>
									chevron_left
								</FontIcon>
								<div
									className="row"
									style={{ display: 'block', overflow: 'hidden' }}
								>
									<Label
										className="nunito-font or"
										style={{
											float: 'left',
											margin: '19px 15px auto',
											minWidth: '80px'
										}}
									>
										URL:{' '}
									</Label>
									<TextField
										hintText="URL"
										name="slug"
										value={slug}
										onChange={this.changeSlug}
									/>
									<br />
									<Label
										className="nunito-font or"
										style={{
											float: 'left',
											margin: '19px 15px auto',
											minWidth: '80px'
										}}
									>
										Title:{' '}
									</Label>
									<TextField
										hintText="Title"
										name="metaTitle"
										value={metaTitle}
										onChange={this.changeTitle}
									/>
									<br />
									<Label
										className="nunito-font or"
										style={{
											float: 'left',
											margin: '19px 15px auto',
											minWidth: '80px'
										}}
									>
										Description:{' '}
									</Label>
									<TextField
										hintText="Description"
										name="metaDesc"
										value={metaDesc}
										onChange={this.changeDesc}
										multiLine
										rows={1}
										rowsMax={4}
									/>
									<br />
									<HintLabel className="sans-font">140 characters</HintLabel>

									<div style={{ marginTop: '35px' }}>
										<SecondaryButton
											label="Reset"
											style={{ float: 'right' }}
											onClick={this.resetMeta}
										/>
										<PrimaryButton
											label="Save"
											style={{ float: 'right', marginRight: '10px' }}
											onClick={this.changeMeta}
										/>
									</div>
								</div>
							</AdvanceSetting>
						</SwipeableViews>
					</Popover>
				</RaisedButton>
				{sid != null &&
					<TextStatus className="sans-font">{saveStatus}</TextStatus>}
				<div>
					{/* <Label className="nunito-font" >Select cover picture : </Label> */}
					<div
						className="row"
						style={{
							overflow: 'hidden',
							margin: '100px 0 20px 0',
							paddingBottom: '40px',
							borderBottom: '1px solid #8E8E8E'
						}}
					>
						<div className="col-6">
							<UploadPicture
								ratio={1200 / 628}
								path={`/stories/${sid}/cover`}
								src={story.cover && story.cover.medium}
								size="1920x860"
								width={300}
								height={170}
								label="Landscape Cover"
								type="cover"
								style={{
									width: '194px',
									height: '137px',
									margin: '0 auto 0 auto'
								}}
							/>
						</div>
						<div className="col-6">
							<UploadPicture
								ratio={330 / 500}
								path={`/stories/${sid}/covermobile`}
								src={story.coverMobile && story.coverMobile.medium}
								size="330x500"
								width={120}
								height={170}
								label="Portrait Cover"
								type="coverMobile"
								style={{
									width: '96px',
									height: '137px',
									margin: '0 auto 0 auto'
								}}
							/>
						</div>
					</div>
				</div>
				<Title
					placeholder="Title"
					className="serif-font"
					value={title}
					onChange={this.titleChanged}
				/>
				<div style={{ margin: '40px 0px 45px' }}>
					<HighlightText>HIGHLIGHT</HighlightText>
					<HighlightBox>
						<Highlight>
							<FroalaEditor
								model={highlight}
								onModelChange={this.handleModelChangeHighlight}
								highlight={true}
							/>
						</Highlight>
					</HighlightBox>
				</div>
				<FroalaEditor ref="paper" model={html} onModelChange={this.handleModelChangeHtml} />
				<Divider />
				<AnalyticContainer
					content={html}
					focusWord={focusWord}
					title={title}
					highlight={highlight}
				/>
			</Container>
		)
	}
}

export default EditStory
