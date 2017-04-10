import React from 'react'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
	TableRowColumn} from 'material-ui/Table'
import {ScoreBar} from 'components'

const Container = styled.div`
`

const Bold = styled.div`
	font-weight: bold;
`

const Text = styled.div`
	color: ${props => props.color};
	font-weight: ${props => props.weight};
	background: ${props => props.color == '#FFF' ? '#27AE60' : ''};
	width: ${props => props.color == '#FFF' ? '32px' : ''};
	margin: auto;
	text-align: center;
	fontSize: 16px;
	padding: 6px 0px;
	border-radius: 15px;
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
  }
}

const PublisherInsightGrowth = React.createClass({
	getInitialState() {
		return {
			data: {}
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
			stories:
			[
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

		this.setState({data})
	},

	renderTableRowColumnAvr(rate) {
		let color
		let fontWeight
		if (rate > 9) {
			color = '#27AE60'
			fontWeight = 'bold'
		} else if (rate > 2) {
			color = '#222222'
			fontWeight = 'regular'
		} else {
			color = '#EB5757'
			fontWeight = 'bold'
		}

		return (
			<TableRowColumn style={{...styles.tableTotal, color, fontWeight}}>
				{rate}
			</TableRowColumn>
		)
	},

	renderTableRowColumn(rate) {
		let color
		let weight
		if (rate > 9) {
			color = '#FFF'
			weight = 'bold'
		} else if (rate > 2) {
			color = '#222222'
			weight = 'regular'
		} else {
			color = '#EB5757'
			weight = 'bold'
		}

		return (
			<TableRowColumn>
				<Text color={color} weight={weight}>{rate ? rate : '-'}</Text>
			</TableRowColumn>
		)
	},

  render() {
		const {avr, stories} = this.state.data

    return (
      <Container>
				<ScoreBar style={{float: 'right', marginBottom: '13px'}}/>
				<Table selectable={false} wrapperStyle={{clear: 'both'}}>

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
							<TableRowColumn style={styles.tableTotalName}>Average Growth Score</TableRowColumn>

							{avr ? this.renderTableRowColumnAvr(avr.now) : <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{avr ? this.renderTableRowColumnAvr(avr.prev) : <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{avr ? this.renderTableRowColumnAvr(avr.twoPrev) : <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
							{avr ? this.renderTableRowColumnAvr(avr.overall) : <TableRowColumn style={styles.tableTotal}>-</TableRowColumn>}
						</TableRow>

						{stories ?
							stories.map((story, index) => (
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
            	)) : ''
						}
					</TableBody>
				</Table>
      </Container>
    )
  }
})

export default PublisherInsightGrowth
