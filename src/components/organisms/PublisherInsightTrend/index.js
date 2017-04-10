import React from 'react'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
	TableRowColumn} from 'material-ui/Table'
import FontIcon from 'material-ui/FontIcon'

const Container = styled.div`
`

const Bold = styled.div`
	font-weight: bold;
`

const Trend = styled.div`
`

const Rate = styled.div`
 font-size: 14px;
 color: #C4C4C4;
 margin-top: 7px;
`

const styles = {
  tableTextHeader: {
		fontSize: '16px',
		fontWeight: 'bold',
		color: '#001738',
		textAlign: 'center'
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
	}
}

const PublisherInsightTrend = React.createClass({
	getInitialState() {
		return {
			data: {}
    }
	},

	componentDidMount() {
		const data = {
			total: {
				now: 90901,
				prev: 88989,
				twoPrev: 56415,
				overall: 655215
			},
			stories:
			[
				{
					name: 'AAA',
					by: 'Mr.A',
					now: 3000,
					prev: 3000,
					twoPrev: 1000,
					threePrev: 2000,
					overall: 12000
				},
				{
					name: 'BBB',
					by: 'Mr.B',
					now: 2000,
					prev: 4000,
					overall: 6000
				},
				{
					name: 'CCC',
					by: 'Mrs.C',
					now: 5000,
					prev: 2000,
					twoPrev: 4000,
					threePrev: 1000,
					overall: 8000
				}
			]
		}

		this.setState({data})
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
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
			return Math.floor((now / prev) * 100)
		} else if (now < prev) {
			return Math.floor((prev - now) * 100 / prev)
		} else {
			return 0
		}
	},

	renderTableRowColumn(now, prev) {
		let color
		if (now > prev) {
			color = '#219653'
		} else if (now < prev) {
			color = '#EB5757'
		}

		return (
			<TableRowColumn style={{...styles.tableTextBody, color: (now != prev) ? color : ''}}>
				{prev ?
					<Trend>
						<FontIcon className="material-icons" style={{...styles.arrow, color: color}}>
							{this.checkRateArrow(now, prev)}
						</FontIcon>
						{this.checkRateNumber(now, prev)}%
					</Trend> : <Trend>-</Trend>
				}
				<Rate>{now ? this.numberWithCommas(now) : '-'}</Rate>
			</TableRowColumn>
		)
	},

  render() {
		const {total, stories} = this.state.data

    return (
      <Container>
				<Table selectable={false}>

					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow className="sans-font">
							<TableHeaderColumn style={styles.tableTextBodyName}></TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>Today</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>Previous Week</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>Previous 2 Weeks</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>Overall</TableHeaderColumn>
						</TableRow>
					</TableHeader>

					<TableBody displayRowCheckbox={false}>
						<TableRow className="sans-font"  style={{height: '36px', background: '#F4F4F4'}}>
							<TableRowColumn style={styles.tableTotalName}>Total View</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>
								{total ? this.toShortNumber(total.now) : '-'}
							</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>
								{total ? this.toShortNumber(total.prev) : '-'}
							</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>
								{total ? this.toShortNumber(total.twoPrev) : '-'}
							</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>
								{total ? this.toShortNumber(total.overall) : '-'}
							</TableRowColumn>
						</TableRow>

						{stories ?
							stories.map((story, index) => (
								<TableRow className="sans-font" key={index}>

									<TableRowColumn style={styles.tableTextBodyName}>
										<Bold>{index + 1}. {stories[index].name}</Bold>
										{stories[index].by}
									</TableRowColumn>

									{this.renderTableRowColumn(stories[index].now, stories[index].prev)}
									{this.renderTableRowColumn(stories[index].prev, stories[index].twoPrev)}
									{this.renderTableRowColumn(stories[index].twoPrev, stories[index].threePrev)}

									<TableRowColumn style={styles.tableTextBody}>
										<Trend>&nbsp;</Trend>
										<Rate>{stories[index].overall ? this.numberWithCommas(stories[index].overall) : '-'}</Rate>
									</TableRowColumn>
								</TableRow>
            	)) : ''
						}
					</TableBody>
				</Table>
      </Container>
    )
  }
})

export default PublisherInsightTrend
