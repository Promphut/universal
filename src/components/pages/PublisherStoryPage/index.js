import React from 'react'
import { OverlayImg, Pagination,Alert,EditMenu,BoxMenu,MenuList,DropdownWithIcon} from 'components'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Link,browserHistory} from 'react-router'
import Request from 'superagent'
import auth from 'components/auth'
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress';
import moment from 'moment'
import api from 'components/api'
import utils from 'components/utils'

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
  max-width:220px;
  margin:0 0 0 15px;
`

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

// const trending = {
// 	name:'โมหจริตดินฮิปฮอปด็อกเตอร์โมหจ ริตแอดมิdsf fsdfsddsfdsfsdสชััน?',
// 	vote:'18',
// 	comment:11,
// 	photo:'/tmp/story-list/1485309433041-Screen-Shot-2017-01-23-at-33221-PM-1.png'
// }

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

const Onload =styled.div`
  position:relative;
  width:100%;
  height:500px;
  padding-top:200px;
  background:white;
`

const StoryTitle = ({style, story})=>{
  let {title, cover, url} = story
  return(
    <Cont style={{...style}}>
      <Link to={url}><OverlayImg src={cover.small || cover.medium} style={{width:'87',height:'52',float:'left'}}/></Link>
      <TitleLink to={url} className="sans-font">{title}</TitleLink>
    </Cont>
  )
}

const STATUS = {
  'DRAFTED': 0,
  'PUBLISHED': 1
}

const PublisherStoryPage = React.createClass({
  FEED_LIMIT: config.FEED_LIMIT,

	getInitialState(){
		return {
      selectColumn:'all',
      selectStatus: STATUS.PUBLISHED,

      stories: [],
      storiesCount: 0,
      selectStoryId:0,
      
      columns:[],
      columnArray:[],

      currentPage: 0,
      totalPages: 0,

      sort:'latest',

      alert:false,
      alertConfirm:function(){},
      alertLoading:false,
      onLoad:false,
      snackbar:false,     
      snackbarMS:'',
      editStory:false
    }
	},

  getColumns(){
    return api.getColumns()
    .then(cols => {
      let a = cols.map((col,index) => ({value:col.id, text:col.name}))
      a.unshift({value:'all', text:'All Stories'})

      this.setState({
        columns:cols,
        columnArray:a
      })
    })
  },

  removeColumn(){
    let cid = this.state.selectColumn

    api.removeColumn(cid)
    .then(res => {
      this.setState({
        alert:false,
        alertDesc:'',
        snackbar:true,
        snackbarMS:'Delete Column Complete !',

        // when col removed, select the default 'all' columns
        selectColumn: 'all',
        selectStatus: STATUS.PUBLISHED
      },
      () => {
        this.getColumns()
        this.getStories()
      }
      )
    })
  },

  getCurrentFilter(){
    return {
      column: this.state.selectColumn==='all' ? null : parseInt(this.state.selectColumn),
      status: this.state.selectStatus
    }
  },

  getStories(){
    this.setState({onLoad:true})

    let {currentPage, sort} = this.state
    //console.log('filter', filter)

    api.getFeed('story', this.getCurrentFilter(), sort, null, currentPage, this.FEED_LIMIT, {onlyAuthorized: true})
    .then(result => {
      //console.log('getFeed()', result)
      this.setState({
        stories: result.feed,
        storiesCount: result.count,
        onLoad: false,
        totalPages: utils.getTotalPages(this.FEED_LIMIT, result.count[this.state.selectStatus])
      })
    })
  },

  filterPublished(){
    this.setState(
      {
        selectStatus:STATUS.PUBLISHED
      },
      () => {this.getStories()}
    )
  },

  filterDrafted(){
    this.setState(
      {
        selectStatus:STATUS.DRAFTED
      },
      ()=>{this.getStories()}
    )
  },

  recent(){
    this.setState(
      {sort:'latest'},
      ()=>{this.getStories()}
    )
  },

  popular(){
    this.setState(
      {sort:'popular'},
      ()=>{this.getStories()}
    )
  },

  changePage(e){
    this.setState(
      {currentPage:e-1},
      ()=>{this.getStories()}
    )
  },

  componentDidMount(){
    this.getColumns()
    this.getStories()
  },

  handleTouchTap(e){
    e.preventDefault();
    this.setState({
      alert: true,
      alertWhere: e.currentTarget,
    });
  },

  handleRequestClose(){
    this.setState({
      alert: false,
      alertDesc:''
    });
  },

  changeColumn(e, selectColumn){
    this.setState({
      selectColumn:selectColumn
    }, () => {
      this.getStories()
    })
  },

  goEditPage(){
    browserHistory.push('/editor/columns/'+this.state.selectColumn+'/settings')
  },

  alertDelete(e){
    this.setState({
      alert:true,
      alertWhere:e.currentTarget,
      alertChild: '',
      alertDesc:'Delete is permanent. Are you sure?',
      alertConfirm:this.removeColumn
    })
  },

  alertNew(e){
    this.setState({
      alert:true,
      alertWhere:e.currentTarget,
      alertChild:<div className='row'><TextField hintText="Column Name" id='newColName' style={{width:'170px',margin:'10px 15px 0 15px'}}/></div>,
      alertConfirm:this.newColumn
    })
  },

  newColumn(){
    this.setState({alertLoading:true})

    let column = {
      name:document.getElementById('newColName').value,
      shortDesc:''
    }
    api.newColumn(column)
    .then(col => {

      this.getColumns()
      .then(() => {
        this.setState({
          alertLoading:false,
          alert:false,
          snackbar:true,
          snackbarMS:'Create New Column Complete!',

          selectColumn:col.id,
          selectStatus: STATUS.PUBLISHED
        })

        this.getStories()
      })

    })
  },

  closeSnackbar(){
    this.setState({snackbar:false})
  },

  closeEditStory(){
    this.setState({editStory:false})
  },

  editStory(e,data){
    //console.log(data)
    this.setState({
      editStory:true,
      editStoryWhere:e.currentTarget, 
      selectStoryId:data
    })
  },

  deleteStory(){
    this.setState({editStory:false})

    api.deleteStory(this.state.selectStoryId)
    .then(res => {
      this.getStories()
    })
  },

  unpublishStory(){
    this.setState({editStory:false})

    api.setStoryStatus(this.state.selectStoryId, 0)
    .then(res => {
      this.getStories()
    })
  },

  publishStory(){
    this.setState({editStory:false})

    api.setStoryStatus(this.state.selectStoryId, 1)
    .then(res => {
      this.getStories()
    })
  },

  goEditStory(){
    browserHistory.push('/editor/stories/'+this.state.selectStoryId+'/edit')
  },

  render(){
    let { sort,totalPages,storiesCount,editStory,editStoryWhere,selectStatus,snackbar,snackbarMS,currentPage,stories,columns,selectColumn,alert,alertDesc,alertWhere,alertLoading,alertChild,alertConfirm,columnArray,onLoad} = this.state
    //console.log('storiesCount',storiesCount)
    return (
      <Container>
        <Snackbar
          open={snackbar}
          message={snackbarMS}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
          style={{backgroundColor:'#00B2B4'}}
          bodyStyle={{backgroundColor:'#00B2B4',textAlign:'center'}}
          className="nunito-font"
        />
        <Popover
          open={editStory}
          anchorEl={editStoryWhere}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          style={{border:'2px solid #00B2B4'}}
          onRequestClose={this.closeEditStory}
        >
          <MenuItem onClick={this.goEditStory} style={{color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>edit</FontIcon>}>Edit Story</MenuItem>
          <MenuItem onClick={this.deleteStory} style={{color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>delete</FontIcon>}>Delete</MenuItem>
          {selectStatus===STATUS.PUBLISHED ? <MenuItem onClick={this.unpublishStory} style={{color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>drafts</FontIcon>}>Unpublish</MenuItem>
          : <MenuItem onClick={this.publishStory} style={{color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>assignment_turned_in</FontIcon>}>Publish</MenuItem>}
        </Popover>
        <Alert 
          open={alert}
          anchorEl={alertWhere}
          onRequestClose={this.handleRequestClose}
          description={alertDesc}
          child={alertChild} 
          loading={alertLoading}
          confirm={alertConfirm}/>
        <div className='row' style={{padding:'30px 15px 20px 30px'}}>
          <DropdownWithIcon
            onChange={this.changeColumn} 
            menuItem={!columnArray ? null : columnArray} 
            value={selectColumn}
            editMenu={
              [<MenuList onClick={this.goEditPage} key="edit">Edit</MenuList>,
               <MenuList onClick={this.alertDelete} key='delete'>Delete</MenuList>,
               <MenuList onClick={this.alertNew} key='new'>+ New Column</MenuList>]}
            />
        </div>
        <div className='row'>
          <div className='col-6'>
            <Section1 className="sans-font">
              <TabHead onClick={this.filterPublished} style={selectStatus===STATUS.PUBLISHED ? {fontWeight:'bold',color:'#222'} : {}}>{storiesCount[STATUS.PUBLISHED+''] || '0 '} Published</TabHead>
              <TabHead onClick={this.filterDrafted} style={selectStatus===STATUS.DRAFTED ? {fontWeight:'bold',color:'#222'} : {}}>{storiesCount[STATUS.DRAFTED+''] || '0 '} Drafted</TabHead>
              {/*<TabHead>3 Scheduled</TabHead>*/}
            </Section1>
          </div>
          <div className='col-6'>
            <Section1 className="sans-font">
              <TabHead onClick={this.recent} style={sort=='latest'?{fontWeight:'bold',color:'#222'}:{}}>Recent</TabHead>
              {/*<TabHead>Trending</TabHead>*/}
              <TabHead onClick={this.popular} style={sort=='popular'?{fontWeight:'bold',color:'#222'}:{}}>Most Popular</TabHead>
              {/*<FontIcon className="material-icons" style={{float:'right',margin:'0 0 0 0',color:'#8f8f8f'}}>search</FontIcon>*/}
            </Section1>
          </div>
        </div>

        <Section2 style={{padding:'40px 5px 40px 5px'}}>
          {onLoad ? <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload> :
          <Table >
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{width:'40%'}}>Title</TableHeaderColumn>
                <TableHeaderColumn style={{width:'10%',textAlign:'center'}}>Writer</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%',textAlign:'center'}}>Column</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>stats</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>{selectStatus===STATUS.PUBLISHED ? 'Published' : 'Drafted'}</TableHeaderColumn>
                <TableHeaderColumn style={{width:'5%'}}></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              showRowHover={true}
              displayRowCheckbox={false}>
              {stories ? stories.map((story, index) => (
                <TableRow key={index}>
                  <TableRowColumn style={{width:'40%',padding:'10px 0 10px 0'}}><StoryTitle story={story} /></TableRowColumn>
                  <TableRowColumn style={{width:'10%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>{story.writer && <Link to={story.writer.url}>{story.writer.display}</Link>}</TableRowColumn>
                  <TableRowColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>{story.column && <Link to={story.column.url}>{story.column.name}</Link>}</TableRowColumn>
                  <TableRowColumn style={{width:'15%'}}>{story.views || 0} Views<br/>{story.shares ? story.shares.total : 0} Shares</TableRowColumn>
                  <TableRowColumn style={{width:'15%',wordWrap:'break-word',whiteSpace:'pre-wrap'}}>{selectStatus===STATUS.PUBLISHED ? moment(story.published).format('lll') : moment(story.created).format('lll')}</TableRowColumn>
                  <TableHeaderColumn style={{width:'5%',paddingRight:0,paddingLeft:0,textAlign:'center',cursor:'pointer'}} ><FontIcon className='material-icons' onClick={(e)=>{this.editStory(e,story.id)}} style={{color:'#bfbfbf'}}>more_vert</FontIcon></TableHeaderColumn>
                </TableRow>
              )) : ''}
            </TableBody>
          </Table>}
        </Section2>
        {totalPages > 0 && <Page>
          <Pagination 
            currentPage={currentPage+1} 
            totalPages={totalPages} 
            onChange={this.changePage}
          />
        </Page>}
      </Container>
		  )
	}
});

export default PublisherStoryPage;

