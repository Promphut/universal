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
const TopArticle = ({style,detail})=>{
  var {title,cover} = detail
  return(
    <Cont style={{...style}}>
      <OverlayImg src={cover} style={{width:'87',height:'52',float:'left'}}/>
      <Name className="sans-font">{title}</Name>
    </Cont>
  )
}
const UserSettingStory = React.createClass({
	getInitialState(){
    this.user = this.props.params.user.user
		return {
      value:1,
      role:'admin',
      currentPage:1,
      article:[],
      articleStatus:'published',
      page:0,
      sort:'latest',
      filter:{writer:this.user._id,status:1},
      onLoad:false,
      editStory:false,
      count:0,
      articleSelectedId:0
    }
	},

  getArticle(){
    this.setState({onLoad:true})
    var self = this
    var {page,sort,filter} = this.state
    //console.log(filter)
    var fil = JSON.stringify(filter)
    Request
      .get(config.BACKURL+'/publishers/'+config.PID+'/feed?type=story&filter='+fil+'&sort='+sort+'&page='+page)
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err)throw err
        else{
          //console.log(res.body)
          self.setState({
            article:res.body.feed,
            count:res.body.count,
            onLoad:false
          })
        }
      })
  },

  handleChange(event, index, value){this.setState({value})},

  componentDidMount(){
    this.getArticle()
    //console.log(this.user)
  },


  editStory(e,data){
    this.setState({editStory:true,editStoryWhere:e.currentTarget,articleSelectedId:data})
  },

  closeEditStory(){
    this.setState({editStory:false})
  },

  filterByPub(){
    this.setState({filter:{writer:this.user._id,status:1},articleStatus:'published'},()=>{this.getArticle()})
  },

  filterByDra(){
    this.setState({filter:{writer:this.user._id,status:0},articleStatus:'drafted'},()=>{this.getArticle()})
    
  },

  changePage(e){
    this.setState({page:e-1,currentPage:e},()=>{this.getArticle()})
    
  },

  deleteArticle(){
    var self = this
    this.setState({editStory:false})
    Request
      .delete(config.BACKURL+'/stories/'+this.state.articleSelectedId+'?token='+auth.getToken())
      .end((err,res)=>{
        if(err) throw err
        else{
          self.getArticle()
        }
      })
  },

  unpublishArticle(){
    var self = this
    this.setState({editStory:false})
    Request
      .patch(config.BACKURL+'/stories/'+this.state.articleSelectedId+'?token='+auth.getToken())
      .send({story:{status:0}})
      .end((err,res)=>{
        if(err) throw err
        else{
          self.getArticle()
        }
      })
  },

  publishArticle(){
    var self = this
    this.setState({editStory:false})
    Request
      .patch(config.BACKURL+'/stories/'+this.state.articleSelectedId+'?token='+auth.getToken())
      .send({story:{status:1}})
      .end((err,res)=>{
        if(err) throw err
        else{
          self.getArticle()
        }
      })
  },

  goEditArticle(){
    browserHistory.push('/editor/stories/'+articleSelectedId+'/edit')
  },



  render(){
    var {articleSelectedId,role,currentPage,article,articleStatus,onLoad,editStory,editStoryWhere,count} = this.state
		return (
      <Container>
        <div className='row' style={{padding:'30px 15px 20px 30px'}}>
          <MyStory className='nunito-font'>My Stories</MyStory>   
        </div>
        <div className='row'>
          <div className='col-12'>
            <Section1 className="sans-font">
              <TabHead onClick={this.filterByPub} style={articleStatus=='published'?{fontWeight:'bold',color:'#222'}:{}} >{!count[1]?0:count[1]+' '} Published</TabHead>
              <TabHead onClick={this.filterByDra} style={articleStatus=='drafted'?{fontWeight:'bold',color:'#222'}:{}} >{!count[0]?0:count[0]+' '} Drafted</TabHead>
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
          onRequestClose={this.closeEditStory}
        >
          <MenuItem onClick={this.goEditArticle} style={{border:'2px solid #00B2B4',color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>edit</FontIcon>}>Edit story</MenuItem>
          <MenuItem onClick={this.deleteArticle} style={{border:'2px solid #00B2B4',color:'#fff',fontSize:'17px',backgroundColor:'#00B2B4'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#fff'}}>delete</FontIcon>}>Delete</MenuItem>
          {articleStatus=='published'?<MenuItem onClick={this.unpublishArticle} style={{border:'2px solid #00B2B4',color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>drafts</FontIcon>}>Unpublish</MenuItem>
          :<MenuItem onClick={this.publishArticle} style={{border:'2px solid #00B2B4',color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>assignment_turned_in</FontIcon>}>publish</MenuItem>}
        </Popover>

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
                <TableHeaderColumn style={{width:'15%'}}>{articleStatus=='published'?'Published':'Drafted'}</TableHeaderColumn>
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
                  <TableHeaderColumn style={{width:'5%',paddingRight:0,paddingLeft:0,textAlign:'center',cursor:'pointer'}} ><FontIcon className='material-icons' onClick={(e)=>{this.editStory(e,data.id)}} style={{color:'#bfbfbf'}}>more_vert</FontIcon></TableHeaderColumn>
                </TableRow>
              )):''}
            </TableBody>
          </Table>}
        </Section2>
        <Page >
          <Pagination 
            currentPage={currentPage} 
            totalPages={8} 
            onChange={this.changePage}
          />
        </Page>
      </Container>
		  )
	}
});

export default UserSettingStory;

