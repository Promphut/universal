import React from 'react'
import { TopBarWithNavigation, OverlayImg} from 'components'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {TrendingSideBarInner} from 'components'
import auth from 'components/auth'
import Request from 'superagent'
import moment from 'moment'

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
const Name = styled.div`
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
const TopArticle = ({style,detail})=>{
  var {title,cover} = detail
  return(
    <Cont style={{...style}}>
      <OverlayImg src={cover} style={{width:'87',height:'52',float:'left'}}/>
      <Name className="sans-font">{title}</Name>
    </Cont>
  )
}
const tableData = [
  {
    name: 'John Smith',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
  {
    name: 'Randal White',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
  {
    name: 'Stephanie Sanders',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
  {
    name: 'Steve Brown',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
  {
    name: 'Joyce Whitten',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
  {
    name: 'Samuel Roberts',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
  {
    name: 'Adam Moore',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
  {
    name: 'Adam Moore',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
  {
    name: 'Adam Moore',
    view:115665,
    share:4665,
    no:16,
    detail:trending
  },
];

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
const trending = {
	title:'โมหจริตดินฮิปฮอปด็อกเตอร์โมหจ ริตแอดมิdsf fsdfsddsfdsfsdสชััน?',
	votes:'18',
	comment:11,
	cover:'/tmp/story-list/1485309433041-Screen-Shot-2017-01-23-at-33221-PM-1.png'
}

const PublisherDashboardPage = React.createClass({
	getInitialState(){
		return {
      totalView:182032,
      totalShare:16555,
      totalStory:300,
      article:[],
      writer:[],
      column:[]
    }
	},

  componentDidMount(){
    this.getArticle()
    this.getWriter()
    this.getColumn()
  },

  getArticle(){
    var self = this
    var fil = JSON.stringify({publisher:config.PID,status: 1})
    Request
      .get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+fil)
      .set('Accept','application/json')
      .end((err,res)=>{
        console.log('article',res.body)
        if(err)throw err
        else{
          self.setState({
            article:res.body.feed
          })
        }
      })
  },
  getWriter(){
    var self = this
    Request
      .get(config.BACKURL+'/publishers/'+config.PID+'/writers')
      .set('Accept','application/json')
      .end((err,res)=>{
        console.log('Writer',res.body)
        if(err)throw err
        else{
          self.setState({
            writer:res.body.writers
          })
        }
      })
  },
  getColumn(){
    var self = this
    Request
      .get(config.BACKURL+'/publishers/'+config.PID+'/columns')
      .set('Accept','application/json')
      .end((err,res)=>{
        console.log('Column',res.body)
        if(err)throw err
        else{
          self.setState({
            column:res.body.columns
          })
        }
      })
  },

  render(){
    var {totalShare,totalStory,totalView,article,writer,column} = this.state
		return (
      <Container>
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
                    <TableHeaderColumn style={{...styles.thead}}>Top Witers</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col2}}>Views</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col2}}>Shares</TableHeaderColumn>
                    <TableHeaderColumn style={{...styles.col4}}>No.</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody 
                  showRowHover={true}
                  displayRowCheckbox={false}>
                  {writer?writer.map((data,index)=>(
                    <TableRow key={index}>
                      <TableRowColumn style={{...styles.col1}}>{data.display}</TableRowColumn>
                      <TableRowColumn style={{...styles.col2}}>{data.id}</TableRowColumn>
                      <TableRowColumn style={{...styles.col2}}>{data.id}</TableRowColumn>
                      <TableRowColumn style={{...styles.col4}}>{data.id}</TableRowColumn>
                    </TableRow>
                  )):''}
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
                  {column?column.map((data,index)=>(
                    <TableRow key={index}>
                      <TableRowColumn style={{...styles.col1}}>{data.name}</TableRowColumn>
                      <TableRowColumn style={{...styles.col2}}>{data.id}</TableRowColumn>
                      <TableRowColumn style={{...styles.col2}}>{data.id}</TableRowColumn>
                      <TableRowColumn style={{...styles.col4}}>{data.id}</TableRowColumn>
                    </TableRow>
                  )):''}
                </TableBody>
              </Table>
            </div>
          </div>
        </Section2>
        <Section2 style={{padding:'40px 5px 40px 5px'}}>
          <Table >
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{...styles.thead,width:'40%'}}>Top Articles</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>Writer</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>Column</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>stats</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>Published</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              showRowHover={true}
              displayRowCheckbox={false}>
              {article?article.map((data,index)=>(
                <TableRow key={index}>
                  <TableRowColumn style={{width:'40%',padding:'10px 0 10px 0'}}><TopArticle detail={data} /></TableRowColumn>
                  <TableRowColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>{data.writer.display}</TableRowColumn>
                  <TableRowColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>{data.column.name}</TableRowColumn>
                  <TableRowColumn style={{width:'15%'}}>{'vote : '+data.votes.total}<br/>{'comment : '+data.comments.count}</TableRowColumn>
                  <TableRowColumn style={{width:'15%',wordWrap:'break-word',whiteSpace:'pre-wrap'}}>{moment(data.published).format('lll')}</TableRowColumn>
                </TableRow>
              )):''}
            </TableBody>
          </Table>
        </Section2>
      </Container>
		  )
	}
});

export default PublisherDashboardPage;

