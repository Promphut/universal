import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture,DropdownWithIcon,Alert,MenuList} from 'components'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Request from 'superagent'
import auth from 'components/auth'
import Snackbar from 'material-ui/Snackbar';
import api from 'components/api'
import utils from 'components/utils'

const Container = styled.form`
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
    text-transform:uppercase;
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
  flex:6 450px;
  max-width:450px;
`

const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 

const AddTag = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
  margin-top:20px;
  display:inline;
`

const SendBox = styled.div`
  width:480px;
  background-color:#F4F4F4;
  margin:20px 0 0 0;
  padding:15px;
`

const PublisherContact = React.createClass({
  defaultContactCat: {
    _id:'',
    toEmail: '',
    catName: '',
    desc: ''
  },

  getInitialState(){
    let cats = this.props.contactCats || []

    return {
      textStatus:'Unsave',
      error:false,
      alert:false,
      snackbar:false,
      snackbarMS:'',

      selectContactCat: cats[0] || this.defaultContactCat, // selected contactCat
      contactCats:cats // array of contactCat
    }
  },

  resetData(){
    let cat = this.getCatById(this.state.selectContactCat._id)
    if(!_.isEmpty(cat)) 
      this.setState({
        selectContactCat: cat
      })
  },

  componentWillReceiveProps(nextProps){
    let cats = nextProps.contactCats || []
    let selectContactCat = nextProps.selectContactCat || cats[0] || this.defaultContactCat

    this.setState({
      selectContactCat: selectContactCat, 
      contactCats: cats
    })
  },

  newContactCat(){
    let contactCat = { catName: document.getElementById('newCate').value }
    if(!contactCat.catName) return 

    api.newContactCat(contactCat)
    .then(_cat => {
      let cats = this.state.contactCats.slice()
      cats.push(_cat)

      this.setState({
        selectContactCat: _cat,
        contactCats: cats,

        alert:false,
        alertDesc:'',
        alertChild:'',
        snackbar:true,
        snackbarMS:'Create New Category Complete !'
      })
    })
  },

  updateContactCat(e){
    if(e) e.preventDefault()

    let update = this.state.selectContactCat
    if(_.isEmpty(update)) return 

    // the hard part is to update contactCat in the contactCats array as well.
    let cats = this.state.contactCats.slice() 
    let cat = _.findLast(cats, {_id: update._id})
    _.assign(cat, update)

    api.updateContactCat(update)
    .then(_cat => {
      this.setState({
        selectContactCat: _cat,
        contactCats: cats,

        textStatus:'Saved successfully',
        error:false
      })
    })
    .catch(err => {
      this.setState({
        textStatus:err.message,
        error:true
      })
    })
  },

  // convert contactCats to MenuItems
  toMenuItems(){
    let items = []
    this.state.contactCats.map((cat, index) => {
      items.push({text:cat.catName, value:cat._id})
    })
    //console.log('items', items)
    return items
  },

  changeSelectContactCat(e, idVal){
    let cat = this.getCatById(idVal)
    this.setState({
      selectContactCat: cat
    })
  },

  getCatById(_id){
    return _.findLast(this.state.contactCats, {_id: _id}) || {}
  },

  catChanged(e){
    const name = e.target.name
    let cat = {...this.state.selectContactCat}
    utils.set(cat, name, e.target.value)
    this.setState({
      selectContactCat: cat
    })
  },

  handleRequestClose(){
    this.setState({
      alert:false,
      alertDesc:''
    })
  },

  alertDelete(e){
    this.setState({
      alert:true,
      alertWhere:e.currentTarget,
      alertDesc:'Delete is permanent. Are you sure?',
      alertConfirm:this.deleteCate
    })
  },

  deleteCate(){
    let conid = this.state.selectContactCat._id

    api.deleteContactCat(conid)
    .then(res => {
      // remove delete on from contactCats and selectContactCat
      let cats = this.state.contactCats
      cats = _.reject(cats, {_id: conid})

      this.setState({
        contactCats: cats,
        selectContactCat: cats[0] || this.defaultContactCat,

        alert:false,
        alertDesc:'',
        snackbar:true,
        snackbarMS:'Delete Category Complete !'
      })
    })
  },

  alertNew(e){
    this.setState({
      alert:true,
      alertWhere:e.currentTarget,
      alertChild:<div className='row'><TextField hintText="Column Name" id='newCate' style={{width:'170px',margin:'10px 15px 0 15px'}}/></div>,
      alertConfirm:this.newContactCat //this.newCate
    })
  },

  closeSnackbar(){
    this.setState({
      snackbar:false,
      snackbarMS:''
    })
  },

  render(){
    let {error,textStatus,alert,alertConfirm,alertWhere,alertChild,alertDesc,snackbar,snackbarMS, contactCats, selectContactCat} = this.state

    return (
      <Container onSubmit={this.updateContactCat}>
        <Snackbar
          open={snackbar}
          message={snackbarMS}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
          style={{backgroundColor:'#00B2B4'}}
          bodyStyle={{backgroundColor:'#00B2B4',textAlign:'center'}}
          className="nunito-font"
        />
        <div  className="head sans-font">Contact</div>
        <Flex>
          <Title>
            <div className="sans-font">Categories</div>
          </Title>
          <Edit>
            <Alert 
              open={alert}
              anchorEl={alertWhere}
              onRequestClose={this.handleRequestClose}
              description={alertDesc}
              child={alertChild} 
              confirm={alertConfirm}/>
              <DropdownWithIcon
                onChange={this.changeSelectContactCat} 
                menuItem={ this.toMenuItems(contactCats) } 
                value={ selectContactCat._id }
                editMenu={
                  [<MenuList onClick={this.alertDelete} key='delete'>Delete</MenuList>,
                  <MenuList onClick={this.alertNew} key='new'>+ New Category</MenuList>]}
                />

            { contactCats.length > 0 && <SendBox>
              <TextField
                floatingLabelText="Sent to Email"
                floatingLabelFixed={true}
                value={selectContactCat.toEmail || ''}
                name='toEmail'
                id='toEmail'
                onChange={this.catChanged}
              /><br/><br/>
              <TextField
                multiLine={true}
                fullWidth={true}
                floatingLabelText="Description"
                floatingLabelFixed={true}
                value={selectContactCat.desc || ''}
                name='desc'
                id='desc'
                onChange={this.catChanged}
                rows={2}
                rowsMax={10}
              />
            </SendBox> }

          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.resetData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherContact