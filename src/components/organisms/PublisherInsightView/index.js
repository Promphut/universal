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

const Trend = styled.div`
 font-size: 14px;
 color: #C4C4C4;
 margin-top: 7px;
`

const Line = styled.div`
	white-space: nowrap;
`

const SortText = styled.div`
`

const styles = {
	tableTextHeader(textDecoration, whiteSpace = 'nowrap', paddingLeft) {
		return {
			fontSize: '16px',
			fontWeight: 'bold',
			color: '#001738',
			textAlign: 'center',
			cursor: 'pointer',
			whiteSpace,
			paddingLeft,
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
		width: '30%',
		height: '72px'
	},
	tableTextBody: {
		fontSize: '16px',
		textAlign: 'center',
		height: '72px'
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

const PublisherInsightView = React.createClass({
	getInitialState() {
		return {
			data: {},
			open: false,
			startDate: moment().zone('+07:00').subtract(6, 'days'),
			endDate: moment().zone('+07:00'),
			hover: -1
		}
	},

	getViewInsight(current, sort, subaction, filter, limit) {
		api
			.getViewInsight(
				this.props.insigth,
				subaction,
				filter,
				sort,
				limit,
				current
			)
			.then(data => {
				console.log(data)
				this.setState({ data })
			})
	},

	componentDidMount() {
		this.getViewInsight()
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

	checkRateArrow(now, prev) {
		if (now > prev) {
			return 'arrow_upward'
		} else if (now < prev) {
			return 'arrow_downward'
		}
	},

	checkRateNumber(now, prev) {
		if (now > prev) {
			return Math.floor(now / prev * 100)
		} else if (now < prev) {
			return Math.floor((prev - now) * 100 / prev)
		} else {
			return 0
		}
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
				this.getViewInsight(moment(e).format('YYYYMMDD'))
			}
		)
	},

	sortBy(sort) {
		this.getViewInsight(moment(this.state.endDate).format('YYYYMMDD'), {
			[sort]: -1
		})
	},

	renderTableRowColumn(now, prev) {
		return (
			<TableRowColumn style={styles.tableTextBody}>
				{now ? this.numberWithCommas(now) : '-'}
				{prev
					? <Trend>
							<FontIcon className="material-icons" style={styles.arrow}>
								{this.checkRateArrow(now, prev)}
							</FontIcon>
							{this.checkRateNumber(now, prev)}%
						</Trend>
					: <Trend>-</Trend>}
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
							<TableHeaderColumn style={styles.tableTextBodyName} />
							<TableHeaderColumn
								style={
									hover == 1
										? styles.tableTextHeader('underline', 'normal', '20px')
										: styles.tableTextHeader('none', 'normal', '20px')
								}>
								<SortText
									onClick={() => this.sortBy('pastSevenDays')}
									onMouseOver={() => this.setState({ hover: 1 })}
									onMouseLeave={() => this.setState({ hover: -1 })}>
									<Line>{moment(startDate).format('MMM DD, YYYY')} -</Line>
								</SortText>
								<FontIcon
									className="material-icons"
									style={styles.dropdown(theme.accentColor)}
									onClick={this.openDatePicker}>
									arrow_drop_down
								</FontIcon>
								<SortText
									onClick={() => this.sortBy('pastSevenDays')}
									onMouseOver={() => this.setState({ hover: 1 })}
									onMouseLeave={() => this.setState({ hover: -1 })}>
									<Line>{moment(endDate).format('MMM DD, YYYY')}</Line>
								</SortText>
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
								Total View
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

										{this.renderTableRowColumn(
											entry.pastSevenDays,
											entry.aWeekAgo
										)}
										{this.renderTableRowColumn(
											entry.aWeekAgo,
											entry.twoWeeksAgo
										)}
										{this.renderTableRowColumn(
											entry.twoWeeksAgo,
											entry.twoWeeksAgo
										)}

										<TableRowColumn style={styles.tableTextBody}>
											{entry.overall
												? this.numberWithCommas(entry.overall)
												: '-'}
											<Trend>&nbsp;</Trend>
										</TableRowColumn>
									</TableRow>
								))
							: ''}
					</TableBody>
				</Table>
			</Container>
		)
	}
})

PublisherInsightView.contextTypes = {
	setting: React.PropTypes.object
}

export default PublisherInsightView
