import React from 'react'
import { OverlayImg, Pagination} from 'components'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Link} from 'react-router'
import Request from 'superagent'
import CircularProgress from 'material-ui/CircularProgress';
import moment from 'moment'
import auth from 'components/auth'
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

const MyStory = styled.div`
  font-size:32px;
  color:#222;
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
  //console.log('story', story)
  return(
    <Cont style={{...style}}>
      <OverlayImg src={cover} style={{width:'87',height:'52',float:'left'}}/>
      <TitleLink to={url} className="sans-font">{title}</TitleLink>
    </Cont>
  )
}

const STATUS = {
  'DRAFTED': 0,
  'PUBLISHED': 1
}

const UserSettingStory = React.createClass({
  FEED_LIMIT: config.FEED_LIMIT,

	getInitialState(){
    this.user = auth.getUser()

		return {
      selectStatus: STATUS.PUBLISHED,
      
      stories:[],
      storiesCount:0,
      selectStoryId:0,

      currentPage:0,
      totalPages: 0,

      sort:'latest',

      onLoad:false,
      editStory:false
    }
	},

  getCurrentFilter(){
    return {
      writer: this.user._id,
      status: this.state.selectStatus
    }
  },

  getStories(){
    this.setState({onLoad:true})

    let {currentPage, sort} = this.state

    api.getFeed('story', this.getCurrentFilter(), sort, null, currentPage, this.FEED_LIMIT)
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

  componentDidMount(){
    this.getStories()
  },

  editStory(e,data){
    this.setState({
      editStory:true,
      editStoryWhere:e.currentTarget,
      selectStoryId:data
    })
  },

  closeEditStory(){
    this.setState({editStory:false})
  },

  filterPublished(){
    this.setState(
      {
        selectStatus: STATUS.PUBLISHED
      }, 
      ()=>{this.getStories()}
    )
  },

  filterDrafted(){
    this.setState(
      {
        selectStatus: STATUS.DRAFTED
      },
      ()=>{this.getStories()}
    )
  },

  changePage(e){
    this.setState(
      {
        currentPage:e-1,
        //currentPage:e
      },
      ()=>{this.getStories()}
    )
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
    let {stories,selectStatus,onLoad,editStory,editStoryWhere,storiesCount,currentPage,totalPages} = this.state
		
    return (
      <Container>
        <div className='row' style={{padding:'30px 15px 20px 30px'}}>
          <MyStory className='nunito-font'>My Stories</MyStory>   
        </div>
        <div className='row'>
          <div className='col-12'>
            <Section1 className="sans-font">
              <TabHead onClick={this.filterPublished} style={selectStatus===STATUS.PUBLISHED ? {fontWeight:'bold',color:'#222'} : {}} >{storiesCount[STATUS.PUBLISHED+''] || '0 '} Published</TabHead>
              <TabHead onClick={this.filterDrafted} style={selectStatus===STATUS.DRAFTED ? {fontWeight:'bold',color:'#222'} : {}} >{storiesCount[STATUS.DRAFTED+''] || '0 '} Drafted</TabHead>
              {/*<TabHead>3 Scheduled</TabHead>*/}
              {/*<FontIcon className="material-icons" style={{float:'right',margin:'0 0 0 0',color:'#8f8f8f'}}>search</FontIcon>*/}
            </Section1>
          </div>
        </div>
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

        <Section2 style={{padding:'40px 5px 40px 5px'}}>
          {onLoad ? <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>:
          <Table >
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{width:'40%'}}>Title</TableHeaderColumn>
                <TableHeaderColumn style={{width:'10%',textAlign:'center'}}>Writer</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%',textAlign:'center'}}>Column</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>Stats</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>{selectStatus===STATUS.PUBLISHED?'Published':'Drafted'}</TableHeaderColumn>
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
                  <TableRowColumn style={{width:'15%'}}>{story.views} Views<br/>{story.shares.total} Shares</TableRowColumn>
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

export default UserSettingStory;

