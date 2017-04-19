import React from 'react'
import styled from 'styled-components'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table'
import { ScoreBar } from 'components'
import FontIcon from 'material-ui/FontIcon'
import DatePicker from 'react-datepicker'
import Popover from 'material-ui/Popover'
import moment from 'moment'
import api from 'components/api'

const Container = styled.div`
`

const Bold = styled.div`
	font-weight: bold;
`

const Text = styled.div`
	color: ${props => props.color};
	font-weight: ${props => props.weight};
	margin: auto;
	text-align: center;
	fontSize: 16px;
`

const Line = styled.div`
	white-space: nowrap;
`

const SortText = styled.div`
`

const styles = {
	tableTextHeader(textDecoration, paddingRight = 'auto') {
		return {
			fontSize: '14px',
			fontWeight: 'bold',
			color: '#001738',
			textAlign: 'center',
			cursor: 'pointer',
			paddingLeft: 'auto',
			paddingRight,
			textDecoration
		}
	},
	tableTotalName: {
		fontSize: '16px',
		height: '36px',
		width: '30%'
	},
	tableTotal: {
		fontSize: '16px',
		height: '36px',
		textAlign: 'center'
	},
	tableTextBodyName: {
		fontSize: '16px',
		whiteSpace: 'initial',
		padding: '12px 24px',
		lineHeight: '25px',
		width: '30%'
	},
	tableTextBody: {
		fontSize: '16px',
		textAlign: 'center'
	},
	arrow: {
		fontSize: '12px',
		color: '#C4C4C4',
		padding: '0px 5px 0px 0px'
	},
	dropdown(accentColor) {
		return {
			fontSize: '20px',
			position: 'absolute',
			top: '33%',
			right: 0,
			color: accentColor,
			cursor: 'pointer'
		}
	}
}

const PublisherInsightGrowth = React.createClass({
	getInitialState() {
		return {
			data: {},
			open: false,
			startDate: moment().zone('+07:00').subtract(6, 'days'),
			endDate: moment().zone('+07:00'),
			hover: -1
		}
	},

	getGrowthInsight(current, sort, subaction, filter, limit) {
		api
			.getGrowthInsight(
				this.props.insigth,
				subaction,
				filter,
				sort,
				limit,
				current
			)
			.then(data => {
				this.setState({ data })
			})
	},

	componentDidMount() {
		this.getGrowthInsight()
	},

	openDatePicker(e) {
		this.setState({
			open: true,
			anchorEl: e.currentTarget
		})
	},

	handleRequestClose() {
		this.setState({
			open: false
		})
	},

	handleChangeDate(e) {
		this.setState(
			{
				startDate: moment(e).subtract(6, 'days'),
				endDate: e,
				open: false
			},
			() => {
				this.getGrowthInsight(moment(e).format('YYYYMMDD'))
			}
		)
	},

	sortBy(sort) {
		this.getGrowthInsight(moment(this.state.endDate).format('YYYYMMDD'), {
			[sort]: -1
		})
	},

	renderTableRowColumnAvr(rate) {
		let color
		let fontWeight
		if (rate > 9) {
			color = '#27AE60'
			fontWeight = 'bold'
		} else if (rate < 3) {
			color = '#EB5757'
			fontWeight = 'bold'
		} else {
			color = '#222222'
			fontWeight = 'regular'
		}

		return (
			<TableRowColumn style={{ ...styles.tableTotal, color, fontWeight }}>
				{rate}
			</TableRowColumn>
		)
	},

	renderTableRowColumn(rate) {
		let color
		let weight
		if (rate > 9) {
			color = '#27AE60'
			weight = 'bold'
		} else if (rate < 3) {
			color = '#EB5757'
			weight = 'bold'
		} else {
			color = '#222222'
			weight = 'regular'
		}

		return (
			<TableRowColumn>
				<Text color={color} weight={weight}>
					{rate || rate === 0 ? rate : '-'}
				</Text>
			</TableRowColumn>
		)
	},

	render() {
		// const { avr, stories } = this.state.data
		const { entries, summary } = this.state.data
		const { startDate, endDate, anchorEl, open, hover } = this.state
		const { insigth } = this.props
		const { theme } = this.context.setting.publisher

		return (
			<Container>
				<Popover
					open={open}
					anchorEl={anchorEl}
					onRequestClose={this.handleRequestClose}
					style={{ background: 'none', boxShadow: 'none' }}>
					<DatePicker
						selected={endDate}
						startDate={startDate}
						endDate={endDate}
						onChange={this.handleChangeDate}
						inline
					/>
				</Popover>
				<ScoreBar style={{ float: 'right', marginBottom: '13px' }} />
				<Table selectable={false} wrapperStyle={{ clear: 'both' }}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow className="sans-font">
							<TableHeaderColumn style={{ width: '30%' }} />
							<TableHeaderColumn
								style={
									hover == 1
										? styles.tableTextHeader('underline', '8px')
										: styles.tableTextHeader('none', '8px')
								}>
								<SortText
									onClick={() => this.sortBy('pastSevenDays')}
									onMouseOver={() => this.setState({ hover: 1 })}
									onMouseLeave={() => this.setState({ hover: -1 })}>
									<Line>Week of {moment(endDate).format('DD/MM/YY')}</Line>
								</SortText>
								<FontIcon
									className="material-icons"
									style={styles.dropdown(theme.accentColor)}
									onClick={this.openDatePicker}>
									arrow_drop_down
								</FontIcon>
							</TableHeaderColumn>
							<TableHeaderColumn
								style={
									hover == 2
										? styles.tableTextHeader('underline')
										: styles.tableTextHeader()
								}>
								<SortText
									onClick={() => this.sortBy('aWeekAgo')}
									onMouseOver={() => this.setState({ hover: 2 })}
									onMouseLeave={() => this.setState({ hover: -1 })}>
									Previous Week
								</SortText>
							</TableHeaderColumn>
							<TableHeaderColumn
								style={
									hover == 3
										? styles.tableTextHeader('underline')
										: styles.tableTextHeader()
								}>
								<SortText
									onClick={() => this.sortBy('twoWeeksAgo')}
									onMouseOver={() => this.setState({ hover: 3 })}
									onMouseLeave={() => this.setState({ hover: -1 })}>
									Previous 2 Weeks
								</SortText>
							</TableHeaderColumn>
							<TableHeaderColumn
								style={
									hover == 4
										? styles.tableTextHeader('underline')
										: styles.tableTextHeader()
								}>
								<SortText
									onClick={() => this.sortBy('overall')}
									onMouseOver={() => this.setState({ hover: 4 })}
									onMouseLeave={() => this.setState({ hover: -1 })}>
									Overall
								</SortText>
							</TableHeaderColumn>
						</TableRow>
					</TableHeader>

					<TableBody displayRowCheckbox={false}>
						<TableRow
							className="sans-font"
							style={{ height: '36px', background: '#F4F4F4' }}>
							<TableRowColumn style={styles.tableTotalName}>
								Average Growth Score
							</TableRowColumn>

							{summary
								? this.renderTableRowColumnAvr(summary.pastSevenDays)
								: <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{summary
								? this.renderTableRowColumnAvr(summary.aWeekAgo)
								: <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{summary
								? this.renderTableRowColumnAvr(summary.twoWeeksAgo)
								: <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{summary
								? this.renderTableRowColumnAvr(summary.overall)
								: <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
						</TableRow>

						{entries
							? entries.map((entry, index) => (
									<TableRow className="sans-font" key={index}>
										{insigth == 'topstories'
											? <TableRowColumn style={styles.tableTextBodyName}>
													<Bold>{index + 1}. {entry.story.title}</Bold>
													{entry.story.writer.username}
												</TableRowColumn>
											: ''}
										{insigth == 'topcolumns'
											? <TableRowColumn style={styles.tableTextBodyName}>
													<Bold>{index + 1}. {entry.column.name}</Bold>
												</TableRowColumn>
											: ''}
										{insigth == 'topwriters'
											? <TableRowColumn style={styles.tableTextBodyName}>
													<Bold>{index + 1}. {entry.writer.username}</Bold>
												</TableRowColumn>
											: ''}

										{this.renderTableRowColumn(entry.pastSevenDays)}
										{this.renderTableRowColumn(entry.aWeekAgo)}
										{this.renderTableRowColumn(entry.twoWeeksAgo)}
										{this.renderTableRowColumn(entry.overall)}
									</TableRow>
								))
							: ''}*/}
					</TableBody>
				</Table>
			</Container>
		)
	}
})

PublisherInsightGrowth.contextTypes = {
	setting: React.PropTypes.object
}

export default PublisherInsightGrowth
