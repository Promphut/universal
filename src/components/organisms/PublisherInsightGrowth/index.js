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

const PublisherInsightGrowth = React.createClass({
	getInitialState() {
		return {
			data: {},
			open: false,
			startDate: moment().zone('+07:00').subtract(6, 'days'),
			endDate: moment().zone('+07:00')
		}
	},

	componentDidMount() {
		const data = {
			avr: {
				now: 11,
				prev: 2,
				twoPrev: 10,
				overall: 8
			},
			stories: [
				{
					name: 'AAA',
					by: 'Mr.A',
					now: 4,
					prev: 5,
					twoPrev: 10,
					overall: 8
				},
				{
					name: 'BBB',
					by: 'Mr.B',
					now: 3,
					prev: 6,
					overall: 7
				},
				{
					name: 'CCC',
					by: 'Mrs.C',
					now: 10,
					prev: 1,
					twoPrev: 5,
					overall: 11
				}
			]
		}

		this.setState({ data })
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
				api.getShareInsight('topcolumns').then((res) => {
					console.log(res)
        })
			}
		)
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
				<Text color={color} weight={weight}>{rate ? rate : '-'}</Text>
			</TableRowColumn>
		)
	},

	render() {
		const { avr, stories } = this.state.data
		const { startDate, endDate, anchorEl, open } = this.state
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
								Average Growth Score
							</TableRowColumn>

							{avr
								? this.renderTableRowColumnAvr(avr.now)
								: <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{avr
								? this.renderTableRowColumnAvr(avr.prev)
								: <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{avr
								? this.renderTableRowColumnAvr(avr.twoPrev)
								: <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{avr
								? this.renderTableRowColumnAvr(avr.overall)
								: <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
						</TableRow>

						{stories
							? stories.map((story, index) => (
									<TableRow className="sans-font" key={index}>

										<TableRowColumn style={styles.tableTextBodyName}>
											<Bold>{index + 1}. {stories[index].name}</Bold>
											{stories[index].by}
										</TableRowColumn>

										{this.renderTableRowColumn(stories[index].now)}
										{this.renderTableRowColumn(stories[index].prev)}
										{this.renderTableRowColumn(stories[index].twoPrev)}
										{this.renderTableRowColumn(stories[index].overall)}
									</TableRow>
								))
							: ''}
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
