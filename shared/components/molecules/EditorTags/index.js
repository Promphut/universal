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
			let allTags = []

			tags.forEach(tag => {
				allTags.push(tag.slug)
			})

			this.setState({ allTags })
		})
	}

	getStoryTags = sid => {
		api.getStoryTags(sid).then(tags => {
			let result = []

			tags.map((tag, i) => {
				result[i] = { text: tag.name, value: tag._id, id: tag._id }
			})

			this.setState({
				tags: result
			})
		})
	}

	changeTag = (e, tag) => {
		this.setState({ tag })
	}

	enterTag = e => {
		if (e.charCode === 13) {
			const { sid } = this.props.story
			let { tag, tags, allTags } = this.state

			if (
				tag.text !== '' &&
				findIndex(tags, { text: capitalize(tag.text) }) === -1
			) {
				if (allTags.indexOf(tag.toLowerCase()) !== -1) {
					api.getTagFromTagSlug(tag).then(t => {
						const id = t._id

						Request.post(
							`${config.BACKURL}/stories/${sid}/tags/${id}?token=${auth.getToken()}`
						).end((err, res) => {
							if (err) throw err
							else {
								const result = {
									text: res.body.tag.name,
									value: res.body.tag._id,
									id: res.body.tag._id
								}
								tags.push(result)

								this.setState({ tags })
							}
						})
					})
				} else {
					api.addTag(capitalize(tag)).then(res => {
						const result = {
							text: res.name,
							value: res._id,
							id: res._id
						}
						tags.push(result)

						this.setState({ tags })
					})
				}
			}

			this.setState({ tag: '', tags })
		}
	}

	removeTag = (data, index) => {
		const { sid } = this.props.story
		const { tags } = this.state

		Request.delete(
			`${config.BACKURL}/stories/${sid}/tags/${data.id}?token=${auth.getToken()}`
		).end((err, res) => {
			if (err) throw err
			else {
				tags.splice(index, 1)
				this.setState({ tags })
			}
		})
	}

	render() {
		const { story, changeFocusWord } = this.props
		const { tag, tags } = this.state
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
						? <TextField
								value={tag}
								onChange={this.changeTag}
								onKeyPress={this.enterTag}
								hintText="|Add up to 5 tags ..."
								fullWidth={true}
								style={{ fontSize: '14px' }}
							/>
						: null}
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
