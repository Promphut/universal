import React from 'react'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
	TableRowColumn} from 'material-ui/Table';


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
		textAligh: 'center'
  },
  tableTextBodyName: {
		fontSize: '16px',
		textAligh: 'center',
		whiteSpace: 'initial',
		padding: '12px 24px',
		lineHeight: '25px',
		width: '30%'
  },
  tableTextBody: {
		fontSize: '16px',
		textAligh: 'center'
  }
}

const PublisherInsightView = React.createClass({
	getInitialState() {
		return {
    }
	},

  render() {
    return (
      <Container>
				<Table>
					<TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
					>
						<TableRow className="sans-font">
							<TableHeaderColumn style={styles.tableTextBodyName}></TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>Today</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>Previous Week</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>Previous 2 Weeks</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableTextHeader}>Overall</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody
						displayRowCheckbox={false}
					>
						<TableRow className="sans-font">
							<TableRowColumn style={styles.tableTextBodyName}>
								<Bold>1. A New Drought Simulation Has Concluded With Frightening Results</Bold>
								Dr.Nut
							</TableRowColumn>
							<TableRowColumn style={styles.tableTextBody}>13,123</TableRowColumn>
							<TableRowColumn style={styles.tableTextBody}>13,123</TableRowColumn>
							<TableRowColumn style={styles.tableTextBody}>13,123</TableRowColumn>
							<TableRowColumn style={styles.tableTextBody}>13,123</TableRowColumn>
						</TableRow>
						<TableRow className="sans-font">
							<TableRowColumn style={styles.tableTextBodyName}>
								<Bold>1. A New Drought Simulation Has Concluded With Frightening Results</Bold>
								Dr.Nut
							</TableRowColumn>
							<TableRowColumn style={styles.tableTextBody}>13,123</TableRowColumn>
							<TableRowColumn style={styles.tableTextBody}>13,123</TableRowColumn>
							<TableRowColumn style={styles.tableTextBody}>13,123</TableRowColumn>
							<TableRowColumn style={styles.tableTextBody}>13,123</TableRowColumn>
						</TableRow>
					</TableBody>
				</Table>
      </Container>
    )
  }
})

export default PublisherInsightView
