import React from 'react'
import { TopBarWithNavigation, OverlayImg, Pagination,Alert,EditMenu,BoxMenu,MenuList,DropdownWithIcon} from 'components'
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

const Onload =styled.div`
  position:relative;
  width:100%;
  height:500px;
  padding-top:200px;
  background:white;
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
      columnArray:[],
      page:0,
      sort:'lastest',
      filter:{publisher:config.PID},
      alert:false,
      alertConfirm:function(){},
      alertLoading:false,
      onLoad:false,
      snackbar:false,     
      snackbarMS:'',
      articleStatus:'published',
      editStory:false,
    }
	},

  getColumn(cb=function(){}){
    var self = this
    Request
      .get(config.BACKURL+'/publishers/11/columns')
      .set('Accept','application/json')
      .end((err,res)=>{
        //console.log(res.body)
        if(err)throw err
        else{
          var a = res.body.columns.map((data,index)=>({value:data.id,text:data.name}))
          a.unshift({value:'all',text:'All Stories'})
          self.setState({
            column:res.body.columns,
            columnArray:a
          })
          cb()
        }
      })
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
          self.setState({alert:false,alertDesc:'',snackbar:true,snackbarMS:'Delete Column Complete !'})
          self.getColumn()
        }
      })
  },

  getStory(){
    //console.log('getStory')
    this.setState({onLoad:true})
    var self = this
    var {page,sort,filter,value} = this.state
    var fil = JSON.stringify(filter)
    Request
      .get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+fil+'&sort='+sort+'&page='+page)
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err)throw err
        else{
          console.log(res.body)
          self.setState({
            article:res.body.feed,
            onLoad:false
          })
          
        }
      })
  },

  filterPublished(){
    if(typeof this.state.value === 'number'){
      this.setState({filter:{publisher:config.PID,column:this.state.value,status:1,articleStatus:'published'}})
      this.getStory()
    }else{
      this.setState({publisher:config.PID,status:1,articleStatus:'published'})
      this.getStory()
    }
  },

  filterDraft(){
    if(typeof this.state.value === 'number'){
      this.setState({filter:{publisher:config.PID,column:this.state.value,status:0,articleStatus:'drafted'}})
      this.getStory()
    }else{
      this.setState({publisher:config.PID,status:0,articleStatus:'drafted'})
      this.getStory()
    }
  },

  recent(){
    this.setState({sort:'latest'})
    this.getStory()
  },

  popular(){
    this.setState({sort:'popular'})
    this.getStory()
  },

  handleChange(event, index, value){
    if(typeof value === 'number'){
      this.setState({value,filter:{publisher:config.PID,column:value}})
      this.getStory()
    }else if(value == 'all'){
      this.setState({value,filter:{publisher:config.PID}})
      this.getStory()
    }else{
      this.setState({value})
    }
  },

  changePage(e){
    //console.log(e-1)
    this.setState({page:e-1,currentPage:e})
    this.getStory()
  },

  componentDidMount(){
    this.getColumn()
    this.getStory()
  },

  handleTouchTap(event){
    event.preventDefault();
    this.setState({
      alert: true,
      alertWhere: event.currentTarget,
    });
  },

  handleRequestClose(){
    this.setState({
      alert: false,
      alertDesc:''
    });
  },

  selectItem(e,value){
    if(typeof value === 'number'){
      this.setState({value,filter:{publisher:config.PID,column:value}})
      this.getStory()
    }else if(value == 'all'){
      this.setState({value,filter:{publisher:config.PID}})
      this.getStory()
    }else{
      this.setState({value})
      this.getStory()
    }
  },

  goEditPage(){
    browserHistory.push('/editor/columns/'+this.state.value+'/settings')
  },

  alertDelete(e){
    this.setState({
      alert:true,
      alertWhere:e.currentTarget,
      alertDesc:'Delete is permanent. Are you sure?',
      alertConfirm:this.removeColumn})
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
    var self = this
    var column = {
      column:{
        name:document.getElementById('newColName').value,
        shortDesc:''
      }
    } 
    Request
      .post(config.BACKURL+'/publishers/'+config.PID+'/columns?token='+auth.getToken())
      .set('Accept','application/json')
      .send(column)
      .end((err,res)=>{
        if(err)throw err
        else{
          //console.log(res.body)
          self.getColumn(()=>{
            //console.log(res.body)
            self.setState({value:res.body.column.id,alertLoading:false,alert:false,snackbar:true,snackbarMS:'Create New Column Complete!'})
            self.getStory()
          }) 
        }
      })
  },

  closeSnackbar(){
    this.setState({snackbar:false})
  },

  closeEditStory(){
    this.setState({editStory:false})
  },

  editStory(e){
    //console.log(e.currentTarget)
    this.setState({editStory:true,editStoryWhere:e.currentTarget})
  },

  render(){
    var { editStory,editStoryWhere,articleStatus,snackbar,snackbarMS,role,currentPage,article,column,value,alert,alertDesc,alertWhere,alertLoading,alertChild,alertConfirm,columnArray,onLoad} = this.state
    //console.log(this.state)
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
          onRequestClose={this.closeEditStory}
        >
          <MenuItem style={{border:'2px solid #00B2B4',color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>edit</FontIcon>}>Edit story</MenuItem>
          <MenuItem style={{border:'2px solid #00B2B4',color:'#fff',fontSize:'17px',backgroundColor:'#00B2B4'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#fff'}}>delete</FontIcon>}>Delete</MenuItem>
          <MenuItem style={{border:'2px solid #00B2B4',color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>drafts</FontIcon>}>Unpublish</MenuItem>
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
            onChange={this.selectItem} 
            menuItem={!columnArray?null:columnArray} 
            value={value}
            editMenu={
              [<MenuList onClick={this.goEditPage} key="edit">Edit</MenuList>,
               <MenuList onClick={this.alertDelete} key='delete'>Delete</MenuList>,
               <MenuList onClick={this.alertNew} key='new'>+ new column</MenuList>]}
            />
        </div>
        <div className='row'>
          <div className='col-6'>
            <Section1 className="sans-font">
              <TabHead onClick={this.filterPublished}>19 Published</TabHead>
              <TabHead onClick={this.filterDraft}>7 Drafted</TabHead>
              {/*<TabHead>3 Scheduled</TabHead>*/}
            </Section1>
          </div>
          <div className='col-6'>
            <Section1 className="sans-font">
              <TabHead onClick={this.recent}>Recent</TabHead>
              {/*<TabHead>Trending</TabHead>*/}
              <TabHead onClick={this.popular}>Most Popular</TabHead>
              {/*<FontIcon className="material-icons" style={{float:'right',margin:'0 0 0 0',color:'#8f8f8f'}}>search</FontIcon>*/}
            </Section1>
          </div>
        </div>

        <Section2 style={{padding:'40px 5px 40px 5px'}}>
          {onLoad?<Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>:
          <Table >
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{width:'40%'}}>Title</TableHeaderColumn>
                <TableHeaderColumn style={{width:'10%',textAlign:'center'}}>Writer</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%',textAlign:'center'}}>Column</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>stats</TableHeaderColumn>
                <TableHeaderColumn style={{width:'15%'}}>Published</TableHeaderColumn>
                <TableHeaderColumn style={{width:'5%'}}></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              showRowHover={true}
              displayRowCheckbox={false}>
              {article?article.map((data,index)=>(
                <TableRow key={index}>
                  <TableRowColumn style={{width:'40%',padding:'10px 0 10px 0'}}><TopArticle detail={data} /></TableRowColumn>
                  <TableRowColumn style={{width:'10%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>{data.writer.display}</TableRowColumn>
                  <TableRowColumn style={{width:'15%',paddingRight:0,paddingLeft:0,textAlign:'center'}}>{data.column.name}</TableRowColumn>
                  <TableRowColumn style={{width:'15%'}}>{'vote : '+data.votes.total}<br/>{'comment : '+data.comments.count}</TableRowColumn>
                  <TableRowColumn style={{width:'15%',wordWrap:'break-word',whiteSpace:'pre-wrap'}}>{articleStatus=='published'?moment(data.published).format('lll'):moment(data.created).format('lll')}</TableRowColumn>
                  <TableHeaderColumn style={{width:'5%',paddingRight:0,paddingLeft:0,textAlign:'center',cursor:'pointer'}} ><FontIcon className='material-icons' onClick={this.editStory} style={{color:'#bfbfbf'}}>more_vert</FontIcon></TableHeaderColumn>
                </TableRow>
              )):''}
            </TableBody>
          </Table>}
        </Section2>
        <Page >
          <Pagination 
            currentPage={currentPage} 
            totalPages={8} 
            onChange={(e)=>{this.changePage(e)}}
          />
        </Page>
      </Container>
		  )
	}
});

export default PublisherStoryPage;

