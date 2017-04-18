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

const styles = {
	tableTextHeader: {
		fontSize: '16px',
		fontWeight: 'bold',
		color: '#001738',
		textAlign: 'center'
	},
	tableTextHeaderMulLine: {
		fontSize: '16px',
		fontWeight: 'bold',
		color: '#001738',
		textAlign: 'center',
		whiteSpace: 'normal',
		paddingLeft: '10px'
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

const PublisherInsightShare = React.createClass({
	getInitialState() {
		return {
			data: {},
			open: false,
			startDate: moment().zone('+07:00').subtract(6, 'days'),
			endDate: moment().zone('+07:00')
		}
	},

	getShareInsight(current, subaction, filter, sort, limit) {
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
				console.log(data)
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

	renderTableRowColumn(share) {
		return (
			<TableRowColumn style={styles.tableTextBody}>
				{share ? this.numberWithCommas(share) : '-'}
			</TableRowColumn>
		)
	},

	render() {
		const { entries, summary } = this.state.data
		const { startDate, endDate, anchorEl, open } = this.state
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
							<TableHeaderColumn style={styles.tableTextHeaderMulLine}>
								<Line>{moment(startDate).format('MMM DD, YYYY')} -</Line>
								<FontIcon
									className="material-icons"
									style={styles.dropdown(theme.accentColor)}
									onClick={this.openDatePicker}>
									arrow_drop_down
								</FontIcon>
								<Line>{moment(endDate).format('MMM DD, YYYY')}</Line>
							</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>
								Previous Week
							</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>
								Previous 2 Weeks
							</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>
								Overall
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
