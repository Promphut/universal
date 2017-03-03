import React from 'react'
import { TopBarWithNavigation, OverlayImg, Pagination} from 'components'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Link} from 'react-router'
import Request from 'superagent'
import auth from 'components/auth'
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
const Container = styled.div`
  width:100%;
`
const Section1  = styled.div`
  background-color:#F7F7F7;
  color:#8F8F8F;
  font-family:'Nunito';
  padding:15px;
  font-size:16px;
  border:1px solid #E2E2E2;
`
const TabHead = styled.div`
  padding:0 15px 0 15px;
  display:inline;
  font-size:16px;
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
  color:#222;
  font-size:32px;
  overflow:hidden;
  &:hover{
    cursor:pointer;
  }
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
  label:{
    fontSize:'30px'
  },
  underline:{
    background:'none',
    border:'none'
  },
  selected:{
    backgroundColor:'#00B2B4',
    color:'white',
    fill:'white'
  },
  menuItem:{
    padding:'15px 40px 15px 15px',
  },
  newColumn:{
    color:'#00B2B4',
    fontWeight:'bold'
  },
  showInactive:{
    textDecoration:'underline',
    color:'#8F8F8F'
  }
}
const trending = {
	name:'โมหจริตดินฮิปฮอปด็อกเตอร์โมหจ ริตแอดมิdsf fsdfsddsfdsfsdสชััน?',
	vote:'18',
	comment:11,
	photo:'/tmp/story-list/1485309433041-Screen-Shot-2017-01-23-at-33221-PM-1.png'
}

const IconEdit = styled(Link)`
  background-color:#00B2B4;
  color:white;
  border-radius:12px;
  padding:5px 8px 5px 8px;
  height: 35px;
  width:40px;
  margin:8px 12px 0 0;
  &:hover{
    cursor:pointer;
  }
`

const Page = styled.div`
  display: flex;
	flex-flow: row wrap;
	justify-content: center;
  padding:30px 0 30px 0;
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

const PublisherStoryPage = React.createClass({
	getInitialState(){
		return {
      value:'all',
      role:'admin',
      currentPage:1,
      article:[],
      column:[],
      dialog:false,
    }
	},

  handleOpen(e){
    e.preventDefault()
    this.setState({dialog: true});
  },

  handleClose(e){
    this.setState({dialog: false});
  },

  getColumn(){
    var self = this
    Request
      .get(config.BACKURL+'/publishers/11/columns')
      .set('Accept','application/json')
      .end((err,res)=>{
        //console.log(res.body)
        if(err)throw err
        else{
          self.setState({
            column:res.body.columns
          })
        }
      })
  },

  getStory(filter={publisher:config.PID},sort='lastest'){
    var self = this
    var fil = JSON.stringify(filter)
    //var path = encodeURIComponent('/publishers/'+config.PID+'/feed?type=story&filter='+fil+'&sort='+sort)
    //console.log(config.BACKURL+path)
    Request
      .get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+fil+'&sort='+sort)
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err)throw err
        else{
          console.log(res.body)
          self.setState({
            article:res.body.feed
          })
        }
      })
  },

  recent(){
    if(typeof this.state.value === 'number') this.getStory({publisher:config.PID,column:this.state.value},'lastest')
    else this.getStory({publisher:config.PID},'lastest')
  },

  popular(){
    if(typeof this.state.value === 'number') this.getStory({publisher:config.PID,column:this.state.value},'popular')
    else this.getStory({publisher:config.PID},'popular')
  },

  removeColumn(){
    var self = this
    Request
      .delete(config.BACKURL+'/publishers/11/columns/'+this.state.value+'?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .end((err,res)=>{
        //console.log(res.body)
        if(err)throw err
        else{
          self.setState({dialog:false})
          self.getColumn()
        }
      })
  },

  handleChange(event, index, value){
    this.setState({value})
    if(typeof value === 'number'){
      this.getStory({column:value})
    }
    //console.log(value)
  },

  changePage(){
    if(typeof this.state.value === 'number') this.getStory({publisher:config.PID,column:this.state.value},'popular')
    else this.getStory({publisher:config.PID},'popular')
  },

  componentDidMount(){
    this.getColumn()
    this.getStory()
  },

  render(){
    var {role,currentPage,article,column,value} = this.state
    var editable1 = ''
    var editable2 = ''
    if(role=='admin'){
      editable1=<div className='row'>
                  <Link to={"/editor/columns/"+ this.state.value +"/settings"}><FontIcon className="material-icons" style={{display:'inline',color:'#8f8f8f',margin:'0 15px 0 0'}}>mode_edit</FontIcon></Link>
                  <FontIcon onClick={this.handleOpen} className="material-icons" style={{display:'inline',color:'#8f8f8f'}}>delete</FontIcon>
                </div>
      editable2=<div className='row'>
                  <IconEdit to={"/editor/columns/"+ this.state.value +"/settings"}><FontIcon className="material-icons" style={{color:'white'}}>mode_edit</FontIcon></IconEdit>
                  <IconEdit to="#" onClick={this.handleOpen} ><FontIcon className="material-icons"  style={{color:'white'}}>delete</FontIcon></IconEdit>
                </div>
    }else if(role=='editor'){
      editable1=<div className='row'><Link to={"/editor/columns/"+ this.state.value +"/settings"}><FontIcon className="material-icons"  style={{marginLeft:'15px',color:'#8f8f8f'}}>mode_edit</FontIcon></Link></div>
      editable2=<IconEdit to={"/editor/columns/"+ this.state.value +"/settings"}><FontIcon className="material-icons" style={{color:'white'}}>mode_edit</FontIcon></IconEdit>
            
    }else if(role=='writer'){
      editable1=''
      editable2=''
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Confirm"
        secondary={true}
        onTouchTap={this.removeColumn}
      />,
    ];
		return (
      <Container>
        <Dialog
          actions={actions}
          modal={false}
          contentStyle={{width:'600px'}}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
        >
          <p style={{fontSize:'20px'}}>Are you sure to remove this column ?</p>
        </Dialog>
        <div className='row' style={{padding:'30px 15px 20px 30px'}}>
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            autoWidth={false}
            style={{display:'inline'}}
            labelStyle={{...styles.label}}
            underlineStyle={{...styles.underline}}
            selectedMenuItemStyle={{...styles.selected}}
            menuItemStyle={{...styles.menuItem}}
            menuStyle={{width:330}}
          > 
            <MenuItem value='all' primaryText="All Stories" />
            {column.map((data,index)=>(
              <MenuItem value={data._id} key={index} primaryText={data.name} rightIcon={editable1}/>
            ))}
            <MenuItem value='new column' primaryText="+ New Column" style={{...styles.newColumn}} />
            <MenuItem value='inactive' primaryText="Show inactive columns"style={{...styles.showInactive}} />
          </DropDownMenu>
          {value!='all'?editable2:''}
        </div>
        <div className='row'>
          <div className='col-6'>
            <Section1 className="sans-font">
              <TabHead>19 Published</TabHead>
              <TabHead>7 Drafted</TabHead>
              <TabHead>3 Scheduled</TabHead>
            </Section1>
          </div>
          <div className='col-6'>
            <Section1 className="sans-font">
              <TabHead onClick={this.recent}>Recent</TabHead>
              <TabHead>Trending</TabHead>
              <TabHead onClick={this.popular}>Most Popular</TabHead>
              <FontIcon className="material-icons" style={{float:'right',margin:'0 0 0 0',color:'#8f8f8f'}}>search</FontIcon>
            </Section1>
          </div>
        </div>

        <Section2 style={{padding:'40px 5px 40px 5px'}}>
          <Table >
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{width:'40%'}}>Title</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>Writer</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>Column</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>stats</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>Published</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              showRowHover={true}
              displayRowCheckbox={false}>
              {article.map((data,index)=>(
                <TableRow key={index}>
                  <TableRowColumn style={{width:'40%',padding:'10px 0 10px 0'}}><TopArticle detail={data} /></TableRowColumn>
                  <TableRowColumn style={{width:'15%'}}>{data.writer.display}</TableRowColumn>
                  <TableRowColumn style={{width:'15%'}}>{data.column.name}</TableRowColumn>
                  <TableRowColumn style={{width:'15%'}}>{'vote : '+data.votes.total}<br/>{'comment : '+data.comments.count}</TableRowColumn>
                  <TableRowColumn style={{width:'15%'}}>{data.status?'Published':'Draft'}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section2>
        <Page >
          <Pagination 
            currentPage={currentPage} 
            totalPages={8} 
            onChange={(e)=>{this.setState({currentPage:e})}}
          />
        </Page>
      </Container>
		  )
	}
});

export default PublisherStoryPage;

