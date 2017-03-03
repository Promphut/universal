import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton} from 'components'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Request from 'superagent'
import auth from 'components/auth'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'

const Container = styled.div`
  width:100%;
  padding:80px;
  border-bottom:1px solid #E2E2E2;
  .textTitle{
    color:#C2C2C2;
    font-family:'PT Sas';
    font-size:17px;
  }
  .head{
    color:#C2C2C2;
    font-family:'Nunito';
    font-size:18px;
  }
`
const Flex = styled.div`
  display:flex;
  items-align:center;
  flex-flow: row wrap;
  margin:50px 0 0 50px;
`
const Title = styled.div`
  flex:2 150px;
  max-width:150px;
  color:#C2C2C2;
  font-size:17px;
  padding-top:15px;
`
const Edit = styled.div`
  flex:6 480px;
  max-width:480px;
`
const AddTag = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
  margin-top:20px;
`
const style = {
  display: 'inline-block',
  margin: '16px 40px 16px 0',
  overflowY:'auto',
  overflowX:'hidden',
  width:'240px',
  height:'233px'
};

const Desc = styled.div`
  color:#C2C2C2;
  font-size:14px;
  font-style:italic;
` 
const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 
const Admin = styled.div`
  color:#8F8F8F;
  font-size:18px;
  display:inline;
  height:25px;
  margin:8px 0 0 10px;
  border-bottom:1px solid #8F8F8F;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
    text-shadow: 0 0 1px #C2C2C2;
  }
`

const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];

const PublisherPublishingSetting = React.createClass({
  getInitialState(){
    return{
      admin: [],
      textStatus:'Unsave',
      error:false,
      dialog:false,
      adminRemoveName:''
    }
  },

  deleteAdmin(){
    var {admin,adminRemoveName} = this.state
    const chipToDelete = admin.map((data,index) => data.id).indexOf(adminRemoveName.id);
    var self = this
    admin.splice(chipToDelete, 1);
    Request
      .delete(config.BACKURL+'/publishers/'+config.PID+'/admins/'+adminRemoveName.id+'?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err)throw err
        else{
          self.setState({dialog: false,adminRemoveName:{},admin: admin});
        }
      })
  },

  handleOpen(admin){
    //console.log(admin)
    this.setState({dialog: true,adminRemoveName:admin});
  },

  handleClose(e){
    this.setState({dialog: false});
  },

  getAdmin(){
    var self=this
    Request
      .get(config.BACKURL+'/publishers/'+config.PID+'/admins?token='+auth.getToken())
      .end((err,res)=>{
        if(err) throw err
        else{
          self.setState({admin:res.body.admins})
        }
      })
  },

  componentDidMount(){
    this.getAdmin()
  },

  addAdmin(){

  },
  getSource(){

  },

  render(){
    var {admin,textStatus,error,adminRemoveName,dialog} = this.state
    var menu=[]
    for(let i=0;i<10;i++){
      menu.push(
        <MenuItem key={i} primaryText="Help &amp; feedback" />
      )
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
        onTouchTap={this.deleteAdmin}
      />,
    ];
    return(
      <Container>
        <Dialog
          actions={actions}
          modal={false}
          contentStyle={{width:'600px'}}
          open={dialog}
          onRequestClose={this.handleClose}
        >
          <p style={{fontSize:'20px'}}>Are you sure to remove {adminRemoveName.display} ?</p>
        </Dialog>
        <div  className="head sans-font">PUBLISHING</div>
        <Flex>
          <Title>
            <div className="sans-font">Allowed Tags</div>
          </Title>
          <Edit>
            <div className='row'>
              <AutoComplete
                hintText="Search Tags ..."
                filter={AutoComplete.noFilter}
                dataSource={dataSource3}
              />
              <i className="fa  fa-search" style={{float:'left',margin:'20px 10px 0 0',color:'#8f8f8f'}} aria-hidden="true"></i>
            </div>
            <div className='row'>
              <Paper style={style} className="col-7">
                <Menu>
                  {menu}
                </Menu>
              </Paper>
              <div className="col-4">
                <AddTag>
                  <i className="fa fa-plus" style={{float:'left',margin:'20px 10px 0 0'}} aria-hidden="true"></i> 
                  <div style={{float:'left',margin:'20px 20px 0 0'}}>New</div>
                </AddTag>
                <AddTag>
                  <i className="fa fa-trash" style={{float:'left',margin:'20px 10px 0 0'}} aria-hidden="true"></i> 
                  <div style={{float:'left',margin:'20px 20px 0 0'}}>Delete Selected</div>
                </AddTag>
              </div>
            </div>
            <Desc className='sans-font'>Used by a writer to tag a story. Adding a relevant tag help discovering your publiser better on search website. </Desc>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Admins</div>
          </Title>
          <Edit>
            <div className='row' style={{marginTop:'15px'}}>
              {admin.map((data,index)=>(
                <Chip
                  key={data.id}
                  onRequestDelete={() => this.handleOpen(data)}
                  style={{margin:'4px'}}
                >
                  {data.display}
                </Chip>
              ))}
              <AutoComplete
                hintText="Add an admin..."
                filter={AutoComplete.noFilter}
                dataSource={dataSource3}
                onUpdateInput={this.getSource}
                onNewRequest={this.addAdmin}
              />
            </div>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{this.state.textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherPublishingSetting