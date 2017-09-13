import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import findIndex from 'lodash/findIndex'
import capitalize from 'lodash/capitalize'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'
import Request from 'superagent'
import api from '../../../services/api'
import auth from '../../../services/auth'
import config from '../../../config'
import pullAllWith from 'lodash/pullAllWith'
import isEqual from 'lodash/isEqual'
import AutoComplete from 'material-ui/AutoComplete'

const Container = styled.div`
`

const TagContainer = styled.div`
	margin-top: 8px;
`

const FocusWordContainer = styled.div`
`

const Chips = styled.div`
`

const Label = styled.div`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	color: #222;
	margin-right: 10px;
`

const Detail = styled.div`
	display: inline-block;
	font-size: 12px;
	color: #222;
`

class EditorTags extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tag: '',
			tags: [],
			allTags: []
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentDidMount() {
		const { sid } = this.props.story

		this.getTags()
		this.getStoryTags(sid)
	}

	getTags = () => {
		api.getTags().then(tags => {
			let result = []
			tags.map((tag, i) => {
				result[i] = { text: tag.name, value: tag._id }
			})
			this.setState({
				allTags: result
			})
		})
	}

	getStoryTags = sid => {
		api.getStoryTags(sid).then(tags => {
			let result = []

			tags.map((tag, i) => {
				result[i] = { text: tag.name, value: tag._id }
			})

			this.setState({
				tags: result
			})
		})
	}

	changeTag = (tag) => {
		this.setState({ tag })
	}

	removeTag = (data, index) => {
		const { sid } = this.props.story
		const { tags } = this.state

		Request.delete(
			`${config.BACKURL}/stories/${sid}/tags/${data.value}?token=${auth.getToken()}`
		).end((err, res) => {
			if (err) throw err
			else {
				tags.splice(index, 1)
				this.setState({ tags })
			}
		})
	}

	selectedTag = (sel, index) => {
		const { sid } = this.props.story
		let { tag, tags, allTags } = this.state
		var allTagsIndex = findIndex(allTags, { text: capitalize(sel) })
		var tagsIndex = findIndex(tags, { text: capitalize(sel) })
		// console.log(sel)
		if(sel.text&&sel.value){
			api.addStoryTag(sid,sel.value).then((res)=>{
				const result = {
					text: res.tag.name,
					value: res.tag._id,
				}
				tags.push(result)
				this.setState({ tags })
			})
		}else if(sel!= '' && allTagsIndex != -1 && tagsIndex === -1){
			var tid = allTags[allTagsIndex].value
			api.addStoryTag(sid,tid).then((res)=>{
				const result = {
					text: res.tag.name,
					value: res.tag._id,
				}
				tags.push(result)
				this.setState({ tags })
			})
		}else if(sel!= '' && allTagsIndex === -1 && tagsIndex === -1){
			api.addTag(capitalize(tag)).then(r => {
				api.addStoryTag(sid,r._id).then((res)=>{
					const result = {
						text: res.tag.name,
						value: res.tag._id,
					}
					tags.push(result)
					this.setState({ tags })
				})
			})
		}
		this.setState({ tag: ''})
	}

	render() {
		const { story, changeFocusWord } = this.props
		const { tag, tags, allTags } = this.state
		const { focusWord } = story

		return (
			<Container>
				<TagContainer>
					<Label>Tags:</Label>
					<Detail>(up to 5)</Detail>
					<Chips>
						{tags.length !== 0
							? tags.map((data, index) => (
									<Chip
										key={index}
										onRequestDelete={() => this.removeTag(data, index)}
										style={{
											display: 'inline-flex',
											margin: '8px 8px 0px 0px'
										}}
									>
										{data.text}
									</Chip>
								))
							: ''}
					</Chips>
					{tags.length !== 5
						&& <AutoComplete
								hintText="Add up to 5 tags ..."
								dataSource={pullAllWith(allTags, tags, isEqual)}
								filter={AutoComplete.fuzzyFilter}
								onNewRequest={this.selectedTag}
								onUpdateInput={this.changeTag}
								openOnFocus
								searchText={tag}
							/>
						}
				</TagContainer>

				<FocusWordContainer>
					<Label>Focus Words:</Label>
					<TextField
						id="focusWord"
						value={focusWord ? focusWord : ''}
						onChange={changeFocusWord}
						hintText="ex. ธุรกิจ, การเงิน, ..."
						style={{ fontSize: '14px', width: '206px' }}
					/>
				</FocusWordContainer>
			</Container>
		)
	}
}

export default EditorTags
