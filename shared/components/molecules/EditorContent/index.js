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

		this.state = {}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	render() {
		const { theme } = this.context.setting.publisher
		const { story, menu, changeFormat, changeColumn, changeType } = this.props
		const { columns, types } = menu
		let { format, column, contentType } = story

		if (column) column = column._id ? column._id : column
		let type = contentType ? types.indexOf(contentType) : contentType
		column = column === menu.columns.find(col => col.name === 'news')._id
			? null
			: column
		type = type === 0 ? null : type

		return (
			<Container>
				<RadioContainer>
					<RadioButtonGroup
						name="format"
						defaultSelected={format}
						onChange={changeFormat}
					>
						<RadioButton
							value="NEWS"
							label="News"
							style={RadioButtonStyle}
							labelStyle={labelStyle}
						/>
						<RadioButton
							value="ARTICLE"
							label="Article"
							style={RadioButtonStyle}
							labelStyle={labelStyle}
						/>
					</RadioButtonGroup>
				</RadioContainer>

				{format === 'ARTICLE'
					? <SelectContainer>
							<ColumnContainer>
								<Label>Column:</Label>
								<SelectField
									hintText="Choose Column ..."
									value={column}
									onChange={changeColumn}
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
									{columns.length != 0 &&
										columns.map(
											(data, index) =>
												(data.name !== 'news'
													? <MenuItem
															key={index}
															value={data._id}
															primaryText={data.name}
														/>
													: null)
										)}
								</SelectField>
							</ColumnContainer>

							<TypeContainer>
								<Label>Type:</Label>
								<SelectField
									hintText="Choose Type ..."
									value={type}
									onChange={changeType}
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
									{types.length != 0 &&
										types.map(
											(data, index) =>
												(data !== 'NEWS'
													? <MenuItem
															key={index}
															value={index}
															primaryText={data}
														/>
													: null)
										)}
								</SelectField>
							</TypeContainer>
						</SelectContainer>
					: null}
			</Container>
		)
	}
}

export default EditorContent
