import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const Container = styled.div`
`

const RadioContainer = styled.div`
	margin-top: 20px;
`

const SelectContainer = styled.div`
`

const ColumnContainer = styled.div`
	margin: 20px auto;
`

const TypeContainer = styled.div`
`

const Label = styled.div`
	display: block;
	font-size: 14px;
	font-weight: bold;
	color: #222222;
	margin-bottom: 10px;
`

const RadioButtonStyle = {
	marginTop: '10px'
}

const labelStyle = {
	fontFamily: "'Nunito', 'Mitr'",
	fontSize: '14px',
	fontWeight: 'bold',
	color: '#222222'
}

class EditorContent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			content: 'news',
			column: '',
			columnList: [],
			type: '',
			typeList: []
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentWillMount() {
		const columnList = [
			{ _id: 0, name: 'A' },
			{ _id: 1, name: 'B' },
			{ _id: 2, name: 'C' }
		]

		const typeList = ['Ant', 'Bird', 'Cat']

		this.setState({ columnList, typeList })
	}

	chooseContent = (e, content) => {
		this.setState({ content })
	}

	chooseColumn = (e, ind, column) => {
		this.setState({ column })
	}

	chooseType = (e, ind, type) => {
		this.setState({ type })
	}

	render() {
		const { theme } = this.props
		const { content, column, columnList, type, typeList } = this.state

		return (
			<Container>
				<RadioContainer>
					<RadioButtonGroup
						name="content"
						defaultSelected={content}
						onChange={this.chooseContent}
					>
						<RadioButton
							value="news"
							label="News"
							style={RadioButtonStyle}
							labelStyle={labelStyle}
						/>
						<RadioButton
							value="article"
							label="Article"
							style={RadioButtonStyle}
							labelStyle={labelStyle}
						/>
					</RadioButtonGroup>
				</RadioContainer>

				{content === 'article'
					? <SelectContainer>
							<ColumnContainer>
								<Label>Column:</Label>
								<SelectField
									hintText="Choose Column ..."
									value={column}
									onChange={this.chooseColumn}
									selectedMenuItemStyle={{
										color: '#222',
										background: theme.accentColor
									}}
									style={{
										display: 'block',
										width: '304px',
										border: '1px solid #E2E2E2',
										background: '#FFFFFF'
									}}
									labelStyle={{ paddingLeft: '15px' }}
									hintStyle={{ paddingLeft: '15px' }}
									menuStyle={{ width: '304px' }}
									menuItemStyle={{ width: '304px' }}
									underlineStyle={{ display: 'none' }}
								>
									{columnList.length != 0 &&
										columnList.map((data, index) => (
											<MenuItem
												key={index}
												value={data._id}
												primaryText={data.name}
											/>
										))}
								</SelectField>
							</ColumnContainer>

							<TypeContainer>
								<Label>Type:</Label>
								<SelectField
									hintText="Choose Type ..."
									value={type}
									onChange={this.chooseType}
									selectedMenuItemStyle={{
										color: '#222',
										background: theme.accentColor
									}}
									style={{
										display: 'block',
										width: '304px',
										border: '1px solid #E2E2E2',
										background: '#FFFFFF'
									}}
									labelStyle={{ paddingLeft: '15px' }}
									hintStyle={{ paddingLeft: '15px' }}
									menuStyle={{ width: '304px' }}
									menuItemStyle={{ width: '304px' }}
									underlineStyle={{ display: 'none' }}
								>
									{typeList.length != 0 &&
										typeList.map((data, index) => (
											<MenuItem key={index} value={index} primaryText={data} />
										))}
								</SelectField>
							</TypeContainer>
						</SelectContainer>
					: null}
			</Container>
		)
	}
}

export default EditorContent
