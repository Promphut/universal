import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import auth from 'components/auth'
//import Request from 'superagent'
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import {findDOMNode as dom } from 'react-dom'
import api from 'components/api'

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

const Social = styled.div`
  color:#8F8F8F;
  font-size:19px;
  overflow:hidden;
`

const Desc = styled.div`
  color:#C2C2C2;
  font-size:14px;
  font-style:italic;
`

const TextStatus = styled.div`
  color:${props=> props.theme.primaryColor};
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

const Divider = styled.div`
  width:100%;
  height:1px;
  background-color:#E2E2E2;
  margin:40px 0 40px 0;
`
/*const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];
*/

const ColumnSettingPage = React.createClass({
  getInitialState(){

    return{
      column:{},
      user:{},
      
			cover:{
        medium: ''
      },
      dialogText:'',
			
      writers:[],
      writersAutoComplete: [],
      writerToRemove: {},
      writerSearchText: '',

			editors:[],
      editorsAutoComplete: [],
      editorToRemove: {},
      editorSearchText: '',
			
      switchTo:'',

      textStatus:'Unsave',
      error:false,
      dialog:false
    }
  },

  componentDidMount(){
    this.getWriters()
		this.getEditors()
    this.getColumn()
  },

	setData(){
    var {name,shortDesc,slug,cover} = this.state.column
    document.getElementById('name').value = !name?'':name
    document.getElementById('shortDesc').value = !shortDesc?'':shortDesc
    document.getElementById('slug').value = !slug?'':"/"+slug
		this.setState({cover:cover})
  },

  getEditors(){
    let cid = this.props.params.cid
    if(cid==null) return

    api.getEditors(cid)
    .then(editors => {
      editors = editors.map(editor => {
        return {text:editor.username, value:editor.id}
      })

      this.setState({editors:editors})
    })
  },

  getWriters(){
    let cid = this.props.params.cid
    if(cid==null) return

    api.getColumnWriters(cid)
    .then(writers => {
      writers = writers.map(writer => {
        return {text:writer.username, value:writer.id}
      })

      this.setState({writers:writers})
    })
  },

  getColumn(){
    let cid = this.props.params.cid
    if(cid==null) return 

    api.getColumn(cid)
    .then(col => {
      //console.log(res.body)
      this.setState({column:col})
      this.setData()
    })
  },

	deleteWriter(){
    let cid = this.props.params.cid
    if(cid==null) return

    let {writers, writerToRemove} = this.state
    writers = _.reject( writers, {value: writerToRemove.value} )

    api.removeWriter(writerToRemove.value, cid)
    .then(result => {
      this.setState({
        dialog: false,
        writerToRemove:{},
        writers
      });
    })
  },

	deleteEditor(){
    let cid = this.props.params.cid
    if(cid==null) return

    let {editors, editorToRemove} = this.state
    editors = _.reject( editors, {value: editorToRemove.value} )

    api.removeEditor(editorToRemove.value, cid)
    .then(result => {
      this.setState({
        dialog: false,
        editorToRemove:{},
        editors
      });
    })
  },

  handleClose(e){
    this.setState({dialog: false});
  },

	confirmDeleteEditor(editorToRemove){
		this.setState({
      dialog: true,
      dialogText:'Are you sure to delete '+ editorToRemove.text +' ?',
      switchTo:'editor',
      editorToRemove
    });
	},

	confirmDeleteWriter(writerToRemove){
		this.setState({
      dialog: true,
      dialogText:'Are you sure to delete '+ writerToRemove.text +' ?',
      switchTo:'writer',
      writerToRemove
    });
	},

  updateColumn(e){
    e.preventDefault()

    let cid = this.props.params.cid
    if(cid==null) return 

    let data = {}
    let input = dom(this.refs.columnForm).getElementsByTagName("input")
    input = [].slice.call(input)
    input.forEach((field,index)=>{
      data[field.name] = field.value
    })
    data['shortDesc'] = document.getElementById('shortDesc').value

    let column = {
      name:data.name,
      shortDesc:data.shortDesc,
      slug:data.slug,
    }
    api.updateColumn(cid, column)
    .then(col => {
      this.setState({
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

  fetchEditorsAutoComplete(keyword){

    this.setState({editorSearchText:keyword})

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
          editorsAutoComplete:a
        })
      })
    }
  },

  fetchWritersAutoComplete(keyword){

    this.setState({writerSearchText:keyword})

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
          writersAutoComplete:a
        })
      })
    }
  },

  addEditor(item, index){
    let cid = this.state.column._id
    if(cid==null) return

    if(typeof item==='object'){

      api.addEditorToColumn(parseInt(item.value), cid)
      .then(result => {
        let editors = this.state.editors.slice()
        editors.push(item)

        this.setState({
          editors: editors,
          editorSearchText: ''
        })
      })
      .catch(err => {})
    }
  },

  addWriter(item, index){
    let cid = this.state.column._id
    if(cid==null) return

    if(typeof item==='object'){

      api.addWriterToColumn(parseInt(item.value), cid)
      .then(result => {
        let writers = this.state.writers.slice()
        writers.push(item)

        this.setState({
          writers: writers,
          writerSearchText: ''
        })
      })
      .catch(err => {})
    }
  },

  render(){
    var {theme} = this.context.setting.publisher
    var {dialog,error,textStatus,dialogText,cover,writers,editors,switchTo, editorsAutoComplete, writersAutoComplete, writerSearchText,editorSearchText} = this.state
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Confirm"
        secondary={true}
        onTouchTap={switchTo=='writer'?this.deleteWriter:this.deleteEditor}
      />,
    ];
    return(
        <Container onSubmit={this.updateColumn} ref='columnForm'>
          <Dialog
            actions={actions}
            modal={false}
            contentStyle={{width:'600px'}}
            open={dialog}
            onRequestClose={this.handleClose}
          >
            <p style={{fontSize:'20px'}}>{dialogText}</p>
          </Dialog>
          <div  className="head sans-font">PROFILE</div>
          <Flex>
            <Title>
              <div className="sans-font">Name</div>
            </Title>
            <Edit>
              <TextField id='name' name='name'/>
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">URL</div>
            </Title>
            <Edit>
              <Social className="sans-font">

                <TextField style={{float:'left',margin:'5px 0 0 0'}} id='slug' name='slug'/>
              </Social>
              <Desc className='sans-font'>Note that changing slug will affect the whole URL structure of this publisher, meaning that previously used URLs won't be able to be accessed anymore. Are you sure to edit?</Desc>
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">Description</div>
            </Title>
            <Edit>
              <TextField
                defaultValue=""
                multiLine={true}
                fullWidth={true}
                floatingLabelText="140 characters"
                floatingLabelFixed={true}
                rows={1}
                rowsMax={6}
                id='shortDesc'
                name='shortDesc'
              />
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">Cover picture</div>
            </Title>
            <Edit>
              <UploadPicture src={cover.medium} path={'/publishers/'+config.PID+'/columns/'+this.props.params.cid+'/cover'} height="90px" width="200px" labelStyle={{top:'40px'}} type='cover'/>
            </Edit>
          </Flex>
          {/*<Divider/>*/}
          <br/><br/><br/>
          <div  className="head sans-font">TEAM</div>
          <Flex>
            <Title>
              <div className="sans-font">Writers</div>
            </Title>
            <Edit>
              <div className='row' style={{marginTop:'15px'}}>
                {writers.map((data, index) => (
                  <Chip
                    key={data.value}
                    onRequestDelete={() => this.confirmDeleteWriter(data)}
                    style={{margin:'4px'}}
                  >
                    {data.text}
                  </Chip>
                ))}
                <AutoComplete
                  hintText="Add an writer..."
                  filter={AutoComplete.noFilter}
                  dataSource={writersAutoComplete}
                  onUpdateInput={this.fetchWritersAutoComplete}
                  onNewRequest={this.addWriter}
                  searchText={writerSearchText}
                  style={{marginLeft:'10px', height:'32px'}}
                />
              </div>
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">Editors</div>
            </Title>
            <Edit>
              <div className='row' style={{marginTop:'15px'}}>
                {editors.map((data,index)=>(
                  <Chip
                    key={data.value}
                    onRequestDelete={() => this.confirmDeleteEditor(data)}
                    style={{margin:'4px'}}
                  >
                    {data.text}
                  </Chip>
                ))}
                <AutoComplete
                  hintText="Add an editor..."
                  filter={AutoComplete.noFilter}
                  dataSource={editorsAutoComplete}
                  onUpdateInput={this.fetchEditorsAutoComplete}
                  onNewRequest={this.addEditor}
                  searchText={editorSearchText}
                  style={{marginLeft:'10px', height:'32px'}}
                />
              </div>
            </Edit>
          </Flex>
          <div className='sans-font' style={{marginTop:'80px',overflow:'hidden'}}>
            <PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/>
            <SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/>
          <TextStatus style={{color:error?'#D8000C':theme.accentColor}}>{textStatus}</TextStatus></div>
        </Container>
    )
  },
})
ColumnSettingPage.contextTypes = {
	setting: React.PropTypes.object
};


export default ColumnSettingPage
