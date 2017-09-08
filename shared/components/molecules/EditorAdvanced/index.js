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

		this.state = {
			slug: '',
			title: '',
			desc: '',
			hint: {
				slug: '',
				title: '',
				desc: ''
			}
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentWillMount() {
		const slug = 'slug'
		const title = 'title'
		const desc = 'Description Description Description Description'
		const hint = { slug, title, desc }

		this.setState({ slug, title, desc, hint })
	}

	changeSlug = (e, slug) => {
		this.setState({ slug })
	}

	changeTitle = (e, title) => {
		this.setState({ title })
	}

	changeDesc = (e, desc) => {
		if (desc.length > 140) {
			desc = desc.slice(0, 140)
		}

		this.setState({ desc })
	}

	render() {
		const { slug, title, desc, hint } = this.state

		return (
			<Container>
				<UrlContainer>
					<Label style={{ minWidth: '75px' }}>URL:</Label>
					<Label style={{ minWidth: '10px' }}>/</Label>
					<TextField
						value={slug}
						onChange={this.changeSlug}
						hintText={hint.slug}
						style={style}
					/>
				</UrlContainer>

				<TitleContainer>
					<Label style={{ minWidth: '85px' }}>Title:</Label>
					<TextField
						value={title}
						onChange={this.changeTitle}
						hintText={hint.title}
						style={style}
					/>
				</TitleContainer>

				<DescContainer>
					<Label style={{ minWidth: '85px' }}>Description:</Label>
					<TextField
						value={desc}
						onChange={this.changeDesc}
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
