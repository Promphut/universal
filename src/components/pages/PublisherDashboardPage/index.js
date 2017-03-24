import React from 'react'
import {Link} from 'react-router'
import { OverlayImg} from 'components'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {TrendingSideBarInner} from 'components'
import auth from 'components/auth'
import Request from 'superagent'
import moment from 'moment'
import api from 'components/api'

const Container = styled.div`
  width:100%;
`

const Section1  = styled.div`
  background-color:#F7F7F7;
  color:#8F8F8F;
  font-family:'Nunito';
  padding:15px;
  font-size:16px;
`

const TabHead = styled.div`
  padding:0 25px 0 25px;
  display:inline;
  &:hover{
    color:#222;
    cursor:pointer;
    text-decoration:underline;
  }
`

const Section2 = styled.div`
  width:100%;
  padding:50px 15px 50px 15px;
  border-bottom:1px solid #E2E2E2;
`

const Col3 = styled.div`
  padding:0 5px 0 5px;
`

const Icon = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
`

const Primary = styled.div`
  background-color:#00B2B4;
  color:white;
  text-align:center;
  padding:15px 5px 15px 5px;
  font-size:16px;
  border:2px solid #00B2B4;
`

const Second = styled.div`
  background-color:white;
  color:#00B2B4;
  text-align:center;
  padding:15px 5px 15px 5px;
  font-size:16px;
  border:2px solid #00B2B4;
`

const Cont = styled.div`
  width:100%;
  @media (min-width:481px) {
    .sans-font {
      font-family: 'PT Sans', 'cs_prajad', sans-serif;
    }
  }
  /* FOR MOBILE */
  @media (max-width:480px) {
    .sans-font {
      font-family: 'Roboto', 'cs_prajad', sans-serif;
    }
  }
`

const TitleLink = styled(Link)`
  color:#222;
  font-size:15px;
  font-weight:bold;
  float:left;
  height:52px;
  word-wrap: break-word;
  white-space: pre-wrap;      /* Webkit */    
  white-space: -moz-pre-wrap; /* Firefox */     
  white-space: -pre-wrap;     /* Opera <7 */    
  white-space: -o-pre-wrap;   /* Opera 7 */     
  word-wrap: break-word;      /* IE */ 
  padding-right:5px;
  overflow: hidden;
  max-width:230px;
  margin:0 0 0 15px;
`

const StoryTitle = ({style, story})=>{
  let {title, cover, url} = story
  //console.log('story', story)
  return(
    <Cont style={{...style}}>
      <Link to={url}><OverlayImg src={cover.small || cover.medium} style={{width:'87px',height:'52px',float:'left'}}/></Link>
      <TitleLink to={url} className="sans-font">{title}</TitleLink>
    </Cont>
  )
}

const styles = {
  thead:{
    color:'#00B2B4',
    fontSize:'20px',
    width:'40%'
  },
  col1:{
    width:'40%',
    fontWeight:'bold'
  },
  col2:{
    width:'25%'
  },
  col4:{
    width:'10%',
    paddingLeft:'5px',
    paddingRight:'5px',
  }
}

const PublisherDashboardPage = React.createClass({
	getInitialState(){
		return {
      totalView:182032,
      totalShare:16555,
      totalStory:300,
      stories:[],
      writers:[],
      columns:[]
    }
	},

  componentDidMount(){
    this.getStories()
    this.getWriters()
    this.getColumns()
  },

  getStories(){
    let filter = {status: 1}
    api.getFeed('story', filter)
    .then(result => {
      this.setState({
        stories: result.feed
      })
    })
    .catch(err => {
      //console.log('getFeed() error', err)
    })
  },

  getWriters(){
    api.getPublisherWriters()
    .then(writers => {
      this.setState({
        writers: writers
      })
    })
    .catch(err => {
      //console.log('getWriters() error', err)
    })
  },

  getColumns(){
    api.getColumns()
    .then(cols => {
      this.setState({
        columns:cols
      })
    })
    .catch(err => {
      //console.log('getColumns() error', err)
    })
  },

  render(){
    let {totalShare,totalStory,totalView,stories,writers,columns} = this.state
		return (
      <Container>
        {/* THESE BELOW IS NOT FOR #1 MVP VERSION 
        <Section1>
          <TabHead>Weekly</TabHead>
          <TabHead>Monthly</TabHead>
          <TabHead>Overall</TabHead>
        </Section1>
        <Section2>
          <div className='row'>
            <Col3 className='col-4'>
              <Icon>
                <FontIcon className="material-icons" style={{float:'left',margin:'17px 10px 0 0',color:'#8F8F8F'}}>visibility</FontIcon>
                <div style={{float:'left',margin:'20px 20px 0 0'}}>Views</div>
              </Icon>
              <div className='row' style={{marginTop:'15px'}}>
                <Primary className="col-6">
                  <div>Total</div>
                  <div style={{fontSize:'30px',marginTop:'10px'}}>{totalView}</div>
                </Primary>
                <Second className="col-6">
                  <div>Avg per Story</div>
                  <div style={{fontSize:'30px',marginTop:'10px'}}>{parseInt(totalView/totalStory)}</div>
                </Second>
              </div>
            </Col3>
            <Col3 className='col-4'>
              <Icon>
                <FontIcon className="material-icons" style={{float:'left',margin:'17px 10px 0 0',color:'#8F8F8F'}}>share</FontIcon>
                <div style={{float:'left',margin:'20px 20px 0 0'}}>Shares</div>
              </Icon>
              <div className='row' style={{marginTop:'15px'}}>
                <Primary className="col-6">
                  <div>Total</div>
                  <div style={{fontSize:'30px',marginTop:'10px'}}>{totalShare}</div>
                </Primary>
                <Second className="col-6">
                  <div>Avg per Story</div>
                  <div style={{fontSize:'30px',marginTop:'10px'}}>{parseInt(totalShare/totalStory)}</div>
                </Second>
              </div>
            </Col3>
            <Col3 className='col-4'>
              <Icon>
                <FontIcon className="material-icons" style={{float:'left',margin:'17px 10px 0 0',color:'#8F8F8F'}}>description</FontIcon>
                <div style={{float:'left',margin:'20px 20px 0 0'}}>Number of stories</div>
              </Icon>
              <div className='row' style={{marginTop:'15px'}}>
                <Primary className="col-6">
                  <div>Total</div>
                  <div style={{fontSize:'30px',marginTop:'10px'}}>{totalStory}</div>
                </Primary>
              </div>
            </Col3>
          </div>
        </Section2>
        <Section2 style={{padding:'40px 5px 40px 5px'}}>
          <div className='row'>
            <div className="col-6" style={{padding:'10px'}}>
              <Table >
                <TableHeader 
                  displaySelectAll={false}
                  adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={{...styles.thead}}>Top Writers</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col2}}>Views</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col2}}>Shares</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col4}}>No.</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody 
                  showRowHover={true}
                  displayRowCheckbox={false}>
                  {writers ? writers.map((writer, index) => (
                    <TableRow key={index}>
                      <TableRowColumn style={{...styles.col1}}><Link to={writer.url}>{writer.display}</Link></TableRowColumn>
                      <TableRowColumn style={{...styles.col2}}>{writer.id}</TableRowColumn>
                      <TableRowColumn style={{...styles.col2}}>{writer.id}</TableRowColumn>
                      <TableRowColumn style={{...styles.col4}}>{writer.id}</TableRowColumn>
                    </TableRow>
                  )) : ''}
                </TableBody>
              </Table>
            </div>
            <div className="col-6" style={{padding:'10px'}}>
              <Table >
                <TableHeader 
                  displaySelectAll={false}
                  adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={{...styles.thead}}>Top Columns</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col2}}>Views</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col2}}>Shares</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col4}}>No.</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody 
                  showRowHover={true}
                  displayRowCheckbox={false}>
                  {columns ? columns.map((col, index) => (
                    <TableRow key={index}>
                      <TableRowColumn style={{...styles.col1}}><Link to={col.url}>{col.name}</Link></TableRowColumn>
                      <TableRowColumn style={{...styles.col2}}>{col.id}</TableRowColumn>
                      <TableRowColumn style={{...styles.col2}}>{col.id}</TableRowColumn>
                      <TableRowColumn style={{...styles.col4}}>{col.id}</TableRowColumn>
                    </TableRow>
                  )) : ''}
                </TableBody>
              </Table>
            </div>
          </div>
        </Section2>*/}
        <Section2 style={{padding:'40px 5px 40px 5px'}}>
          <Table >
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{...styles.thead,width:'40%'}}>Top Stories</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>Writer</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>Column</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>Stats</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>Published</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              showRowHover={true}
              displayRowCheckbox={false}>
              {stories ? stories.map((story, index) => (
                <TableRow key={index}>
                  <TableRowColumn style={{width:'40%',padding:'10px 0 10px 0'}}><StoryTitle story={story} /></TableRowColumn>
                  <TableRowColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>{story.writer && <Link to={story.writer.url}>{story.writer.display}</Link>}</TableRowColumn>
                  <TableRowColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>{story.column && <Link to={story.column.url}>{story.column.name}</Link>}</TableRowColumn>
                  <TableRowColumn style={{width:'15%'}}>{story.views || 0} Views<br/>{story.shares ? story.shares.total : 0} Shares</TableRowColumn>
                  <TableRowColumn style={{width:'15%',wordWrap:'break-word',whiteSpace:'pre-wrap'}}>{moment(story.published).format('lll')}</TableRowColumn>
                </TableRow>
              )) : ''}
            </TableBody>
          </Table>
        </Section2>
      </Container>
		  )
	}
});

export default PublisherDashboardPage;

