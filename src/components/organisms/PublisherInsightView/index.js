import React from 'react'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
	TableRowColumn} from 'material-ui/Table';


const Container = styled.div`
`

const styles = {
  tableText: {
		fontSize: '16px'
  }
}

const PublisherInsightView = React.createClass({
	getInitialState() {
		return {
    }
	},

  render() {
    return (
      <Container className="sans-font">
				<Table>
					<TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
					>
						<TableRow style={{fontSize: '22px'}}>
							<TableHeaderColumn style={styles.tableText}></TableHeaderColumn>
							<TableHeaderColumn style={styles.tableText}>Today</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableText}>Previous Week</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableText}>Previous 2 Weeks</TableHeaderColumn>
							<TableHeaderColumn style={styles.tableText}>Overall</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody
						displayRowCheckbox={false}
					>
						<TableRow>
							<TableRowColumn style={styles.tableText}>1</TableRowColumn>
							<TableRowColumn style={styles.tableText}>John Smith</TableRowColumn>
							<TableRowColumn style={styles.tableText}>Employed</TableRowColumn>
							<TableRowColumn style={styles.tableText}>Employed</TableRowColumn>
							<TableRowColumn style={styles.tableText}>Employed</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn style={styles.tableText}>2</TableRowColumn>
							<TableRowColumn style={styles.tableText}>Randal White</TableRowColumn>
							<TableRowColumn style={styles.tableText}>Unemployed</TableRowColumn>
							<TableRowColumn style={styles.tableText}>Randal White</TableRowColumn>
							<TableRowColumn style={styles.tableText}>Unemployed</TableRowColumn>
						</TableRow>
					</TableBody>
				</Table>
      </Container>
    )
  }
})

export default PublisherInsightView
