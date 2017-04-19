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

const Line = styled.div`
	white-space: nowrap;
`

const SortText = styled.div`
`

const styles = {
	tableTextHeader(opacity = '1', paddingRight = 'auto') {
		return {
			fontSize: '14px',
			fontWeight: 'bold',
			color: '#222',
			textAlign: 'center',
			cursor: 'pointer',
			paddingLeft: 'auto',
			paddingRight,
			opacity
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
		padding: '12px',
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
			color: accentColor,
			position: 'absolute',
			top: '35%',
			right: 0,
			cursor: 'pointer'
		}
	}
}

const PublisherInsightShare = React.createClass({
	getInitialState() {
		return {
			data: {},
			open: false,
			startDate: moment().zone('+07:00').subtract(6, 'days'),
			endDate: moment().zone('+07:00'),
			hover: -1
		}
	},

	getShareInsight(current, sort, subaction, filter, limit) {
		api
			.getShareInsight(
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
		this.getShareInsight()
	},

	toShortNumber(number) {
		if (number > 1000000000) {
			number = Math.floor(number / 1000000000) + 'B'
		} else if (number > 1000000) {
			number = Math.floor(number / 1000000) + 'M'
		} else if (number > 1000) {
			number = Math.floor(number / 1000) + 'K'
		}

		return number
	},

	numberWithCommas(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
				this.getShareInsight(moment(e).format('YYYYMMDD'))
			}
		)
	},

	sortBy(sort) {
		this.getShareInsight(moment(this.state.endDate).format('YYYYMMDD'), {
			[sort]: -1
		})
	},

	renderTableRowColumn(share) {
		return (
			<TableRowColumn style={styles.tableTextBody}>
				{share ? this.numberWithCommas(share) : '-'}
			</TableRowColumn>
		)
	},

	render() {
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
				<Table selectable={false}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow className="sans-font">
							<TableHeaderColumn style={{ width: '30%' }} />
							<TableHeaderColumn
								style={
									hover == 1
										? styles.tableTextHeader('.8', '8px')
										: styles.tableTextHeader('1', '8px')
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
										? styles.tableTextHeader('.8')
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
										? styles.tableTextHeader('.8')
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
										? styles.tableTextHeader('.8')
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
								Total Share
							</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>
								{summary ? this.toShortNumber(summary.pastSevenDays) : '-'}
							</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>
								{summary ? this.toShortNumber(summary.aWeekAgo) : '-'}
							</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>
								{summary ? this.toShortNumber(summary.twoWeeksAgo) : '-'}
							</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>
								{summary ? this.toShortNumber(summary.overall) : '-'}
							</TableRowColumn>
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

										<TableRowColumn style={styles.tableTextBody}>
											{entry.overall
												? this.numberWithCommas(entry.overall)
												: '-'}
										</TableRowColumn>
									</TableRow>
								))
							: ''}*/}
					</TableBody>
				</Table>
			</Container>
		)
	}
})

PublisherInsightShare.contextTypes = {
	setting: React.PropTypes.object
}

export default PublisherInsightShare
