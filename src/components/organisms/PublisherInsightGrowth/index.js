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

	renderTableRowColumn(share) {
		return (
			<TableRowColumn style={styles.tableTextBody}>
				{share ? share : '-'}
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
							<TableRowColumn style={styles.tableTotal}>{avr ? avr.now : '-'}</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>{avr ? avr.prev : '-'}</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>{avr ? avr.twoPrev : '-'}</TableRowColumn>
							<TableRowColumn style={styles.tableTotal}>{avr ? avr.overall : '-'}</TableRowColumn>
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

									<TableRowColumn style={styles.tableTextBody}>
										{stories[index].overall ? stories[index].overall : '-'}
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

export default PublisherInsightGrowth
