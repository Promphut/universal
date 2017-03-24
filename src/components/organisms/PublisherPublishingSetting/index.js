import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton} from 'components'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
//import Request from 'superagent'
import auth from 'components/auth'
import api from 'components/api'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import {findDOMNode as dom} from 'react-dom'
import _ from 'lodash'

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

// const dataSource3 = [
//   {textKey: 'Some Text', valueKey: 'someFirstValue'},
//   {textKey: 'Some Text', valueKey: 'someSecondValue'},
// ];

const PublisherPublishingSetting = React.createClass({
  getInitialState(){
    return {
      admins: [],
      adminToRemove: {},

      adminSearchText: '',
      
      dialog:false,
      userToAdmin:[],
      selectedTag: undefined,
      autoState:false,
      tags: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Black',
        'White',
      ],
      initTags: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Black',
        'White',
      ],

      textStatus:'Unsave',
      error:false
    }
  },

  deleteAdmin(){
    let {admins, adminToRemove} = this.state
    //const chipToDelete = admins.map((data, index) => data.id).indexOf(adminRemoveName.id);
    //admins.splice(chipToDelete, 1);
    admins = _.reject( admins, {value: adminToRemove.value} )

    api.removeAdmin(adminToRemove.value)
    .then(result => {
      this.setState({
        dialog: false,
        adminToRemove:{},
        admins
      });
    })
    .catch(err => {
      // this.setState({
      //   error: true,
      //   textStatus: 'Cannot remove this admin.'
      // })
    })
  },

  handleOpen(admin){
    //console.log(admin)
    this.setState({
      dialog: true, 
      adminToRemove:admin
    });
  },

  handleClose(e){
    this.setState({dialog: false});
  },

  getAdmin(){
    api.getAdmins()
    .then(admins => {
      admins = admins.map(admin => {
        return {text:admin.username, value:admin.id}
      })

      this.setState({ admins:admins })
    })
  },

  componentDidMount(){
    this.getAdmin()
    document.addEventListener('click', this.handleClickOutside)
  },

  addAdmin(item, index){
    //console.log('addAdmin', item, index)
    if(typeof item==='object'){

      api.addAdmin(parseInt(item.value))
      .then(result => {
        // set admins state 
        let admins = this.state.admins.slice()
        admins.push(item)

        //console.log(dom(this.refs.text).searchText, dom(this.refs.text).value)
        this.setState({
          admins: admins,
          adminSearchText: ''
        })
      })
      .catch(err => {
        // this.setState({
        //   error: true,
        //   textStatus: 'Cannot add this admin.'
        // })
      })

    }
  },

  handleUpdateInput(keyword){
    this.setState({adminSearchText:keyword})

    let inp = keyword.split('').length,
        a = []
    //this.setState({userToAdmin:[text,text+text]})
    if(inp==3){
      api.getUsers(keyword)
      .then(users => {
        users.map((user, index) => {
          a[index] = {text:user.username, value:user.id}
        })

        this.setState({
          userToAdmin:a,
          autoState:true
        }, ()=>{dom(this.refs.text).focus()})
      })
    }
  },

  filterTags(event, searchText) {
    this.setState({
      tags: _.filter(this.state.initTags, tag => tag.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    }, () => {
      this.refs.searchText.focus()
    })
  },

  changeItem(event, menuItem, index) {
    this.setState({
      selectedTag: index
    })
  },

  handleClickOutside(evt) {
    const area = dom(this.refs.menu);

    if (area && !area.contains(evt.target)) {
      this.setState({
        selectedTag: undefined
      })
    }
  },

  render(){
    let {admins,textStatus,error,adminToRemove,dialog,userToAdmin,adminSearchText,selectedTag,autoState,tags} = this.state
    let menu=[]
    for(let i=0;i<tags.length;i++){
      menu.push(
        // <MenuItem key={i} primaryText="Help &amp; feedback" />
        <MenuItem key={i} value={i} primaryText={tags[i]} />
      )
    }
    //console.log('userToAdmin', userToAdmin, admins)
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
          <p style={{fontSize:'20px'}}>Are you sure to remove {adminToRemove.text} ?</p>
        </Dialog>
        <div  className="head sans-font">PUBLISHING</div>

        {/* THIS IS FOR THE NEXT VERSION
        <Flex>
          <Title>
            <div className="sans-font">Allowed Tags</div>
          </Title>
          <Edit>
            <div className='row'>
              <TextField
                hintText="Search Tags ..."
                onChange={this.filterTags}
                ref="searchText"
              />
              <i className="fa  fa-search" style={{float:'left',margin:'20px 10px 0 0',color:'#8f8f8f'}} aria-hidden="true"></i>
            </div>
            <div className='row'>
              <Paper style={style} className="col-7">
                <Menu
                  selectedMenuItemStyle={{backgroundColor: '#00B2B4', color: 'black'}}
                  value={selectedTag}
                  onItemTouchTap={this.changeItem}
                  disableAutoFocus={true}
                  ref="menu">
                  {menu}
                </Menu>
              </Paper>
              <div className="col-4">
                <AddTag>
                  <i className="fa fa-plus" style={{float:'left',margin:'20px 10px 0 0'}} aria-hidden="true"></i>
                  <div style={{float:'left',margin:'20px 20px 0 0'}}>New</div>
                </AddTag>
                <AddTag>
                  <i className="fa fa-trash" style={(selectedTag === undefined) ? {float:'left',margin:'20px 10px 0 0', opacity:0.5} : {float:'left',margin:'20px 10px 0 0'}} aria-hidden="true"></i>
                  <div style={(selectedTag === undefined) ? {float:'left',margin:'20px 20px 0 0', opacity:0.5} : {float:'left',margin:'20px 20px 0 0'}}>Delete Selected</div>
                </AddTag>
              </div>
            </div>
            <Desc className='sans-font'>Used by a writer to tag a story. Adding a relevant tag help discovering your publiser better on search website. </Desc>
          </Edit>
        </Flex>*/}

        <Flex>
          <Title>
            <div className="sans-font">Admins</div>
          </Title>
          <Edit>
            <div className='row' style={{marginTop:'15px'}}>
              {admins.map((admin,index)=>(
                <Chip
                  key={admin.value}
                  onRequestDelete={() => this.handleOpen(admin)}
                  style={{margin:'4px'}}
                >
                  {admin.text}
                </Chip>
              ))}   
              <AutoComplete
                key="editor1"
                hintText="Add an admin..."
                dataSource={userToAdmin}
                onUpdateInput={this.handleUpdateInput}
                openOnFocus={true}
                open={autoState}
                searchText={adminSearchText}
                menuCloseDelay={0}
                onNewRequest={this.addAdmin}
                ref='text'
                style={{marginLeft:'10px', height:'32px'}}
              />
            </div>
          </Edit>
        </Flex>
        {/*<div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{this.state.textStatus}</TextStatus></div>*/}
      </Container>
    )
  },
})



export default PublisherPublishingSetting
