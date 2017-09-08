import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import findIndex from 'lodash/findIndex'
import capitalize from 'lodash/capitalize'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'

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
			focusWord: ''
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentWillMount() {
		const tags = [
			{ id: 0, text: 'Dog' },
			{ id: 1, text: 'Egg' },
			{ id: 2, text: 'Fish' }
		]

		this.setState({ tags })
	}

	changeTag = (e, tag) => {
		this.setState({ tag })
	}

	enterTag = e => {
		if (e.charCode === 13) {
			let { tag, tags } = this.state
			tag = { id: 0, text: capitalize(tag) } // mock id

			if (tag.text !== '' && findIndex(tags, { text: tag.text }) === -1) {
				tags.push(tag)
			}

			this.setState({ tag: '', tags })
		}
	}

	changeFocusWord = (e, focusWord) => {
		this.setState({ focusWord })
	}

	removeTag = (data, index) => {
		// var { sid, tag, addTag } = this.state
		// // console.log(data)
		// Request.delete(
		// 	`${config.BACKURL}/stories/${sid}/tags/${data.id}?token=${auth.getToken()}`
		// ).end((err, res) => {
		// 	if (err) throw err
		// 	else {
		// 		var Tag = tag
		// 		Tag.push(data)
		// 		var addedTag = addTag
		// 		addedTag.splice(index, 1)
		// 		this.setState({
		// 			tag: Tag,
		// 			addTag: addedTag
		// 		})
		// 	}
		// })
	}

	render() {
		const { tag, tags, focusWord } = this.state

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
						value={focusWord}
						onChange={this.changeFocusWord}
						hintText="ex. ธุรกิจ, การเงิน, ..."
						style={{ fontSize: '14px', width: '206px' }}
					/>
				</FocusWordContainer>
			</Container>
		)
	}
}

export default EditorTags
