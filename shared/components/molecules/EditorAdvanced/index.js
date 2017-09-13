import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'

const Container = styled.div`
`

const UrlContainer = styled.div`
`

const TitleContainer = styled.div`
`

const DescContainer = styled.div`
`

const Label = styled.div`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	color: #222;
	float: left;
	margin-top: 14px;
`

const style = {
	fontSize: '14px',
	width: '217px'
}

class EditorAdvanced extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	render() {
		const { story, changeSlug, changeMetaTitle, changeMetaDesc } = this.props
		const { slug, title, desc, hint } = story

		return (
			<Container>
				<UrlContainer>
					<Label style={{ minWidth: '75px' }}>URL:</Label>
					<Label style={{ minWidth: '10px' }}>/</Label>
					<TextField
						id="slug"
						value={slug ? slug : ''}
						onChange={changeSlug}
						hintText={hint.slug}
						style={style}
					/>
				</UrlContainer>

				<TitleContainer>
					<Label style={{ minWidth: '85px' }}>Title:</Label>
					<TextField
						id="title"
						value={title ? title : ''}
						onChange={changeMetaTitle}
						hintText={hint.title}
						style={style}
					/>
				</TitleContainer>

				<DescContainer>
					<Label style={{ minWidth: '85px' }}>Description:</Label>
					<TextField
						id="desc"
						value={desc ? desc : ''}
						onChange={changeMetaDesc}
						hintText={hint.desc}
						style={style}
						multiLine
						rows={1}
						rowsMax={4}
						errorText="140 characters"
						errorStyle={{ color: '#C2C2C2', fontStyle: 'italic' }}
					/>
				</DescContainer>
			</Container>
		)
	}
}

export default EditorAdvanced
