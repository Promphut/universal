import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import auth from 'components/auth'
import Request from 'superagent'
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import {findDOMNode as dom } from 'react-dom'
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
const Divider = styled.div`
  width:100%;
  height:1px;
  background-color:#E2E2E2;
  margin:40px 0 40px 0;
`
const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];


const ColumnSettingPage = React.createClass({
  getInitialState(){

    return{
      column:{},
      user:{},
      textStatus:'Unsave',
      error:false,
      dialog:false,
			cover:null,
      dialogText:'',
			writer:[],
			editor:[],
			switchTo:'',
			info:{}
    }
  },
  componentDidMount(){
    this.getWriter()
		this.getEditor()
    this.getColumnId()
  },
	setData(){
    var {name,shortDesc,slug,cover} = this.state.column
    document.getElementById('name').value = !name?'':name 
    document.getElementById('shortDesc').value = !shortDesc?'':shortDesc
    document.getElementById('slug').value = !slug?'':"/"+slug
		this.setState({cover:cover})
  },
  getEditor(){
    var self=this
    Request
      .get(config.BACKURL+'/publishers/11/columns/'+this.props.params.cid+'/editors')
			.set('Accept','application/json')
      .end((err,res)=>{
        if(err) throw err //console.log(err)
				else{
					self.setState({editor:res.body.editors})
				}
      })
  },
  getColumnId(){
    var self = this
    var user = auth.getUser()
    Request
      .get(config.BACKURL+'/publishers/11/columns/'+this.props.params.cid)
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err) throw err 
        else{
          //console.log(res.body)
          self.setState({column:res.body.column})
          self.setData()
        }
      })
  },
  getWriter(){
    var self=this
    Request
      .get(config.BACKURL+'/publishers/11/columns/'+this.props.params.cid+'/writers')
			.set('Accept','application/json')
      .end((err,res)=>{
        if(err) console.log(err)
				else{
					//console.log(res.body)
					self.setState({writer:res.body.writers})
				}
      })
  },
	deleteWriter(){
    var {writer,info} = this.state
    const chipToDelete = writer.map((data,index) => data.id).indexOf(info.id);
    var self = this
    writer.splice(chipToDelete, 1);
    Request
      .delete(config.BACKURL+'/publishers/11/columns/'+this.props.params.cid+'/writers/'+info.id+'?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err)throw err
        else{
          self.setState({dialog: false,info:{},writer});
        }
      })
  },
	deleteEditor(){
    var {editor,info} = this.state
    const chipToDelete = editor.map((data,index) => data.id).indexOf(info.id);
    var self = this
    editor.splice(chipToDelete, 1);
    Request
      .delete(config.BACKURL+'/publishers/11/columns/'+this.props.params.cid+'/editors/'+info.id+'?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err)throw err
        else{
          self.setState({dialog: false,info:{},editor});
        }
      })
  },
  handleClose(e){
    this.setState({dialog: false});
  },
	confirmDeleteEditor(d){
		this.setState({dialog: true,dialogText:'Are you sure to delete '+ d.display +' ?',switchTo:'editor',info:d});
	},
	confirmDeleteWriter(d){
		this.setState({dialog: true,dialogText:'Are you sure to delete '+ d.display +' ?',switchTo:'writer',info:d});
	},
  updateColumn(e){
    e.preventDefault()
    var data = {}
    var self = this
    var input = dom(this.refs.columnForm).getElementsByTagName("input")
    input = [].slice.call(input)
    input.forEach((field,index)=>{
      data[field.name] = field.value
    })
    data['shortDesc'] = document.getElementById('shortDesc').value
    var column = {
      column:{
        name:data.name,
        shortDesc:data.shortDesc,
        slug:data.slug,
      }
    }
    Request
      .patch(config.BACKURL+'/publishers/11/columns/'+this.props.params.cid+'?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .send(column)
      .end((err,res)=>{
        if(err) this.setState({textStatus:res.body.error.message,error:true})
        else{
          this.setState({textStatus:'Saved successfully',error:false})
        }
      })

  },
  render(){
    var {dialog,error,textStatus,dialogText,cover,writer,editor,switchTo} = this.state
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
                defaultValue="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"
                multiLine={true}
                fullWidth={true}
                floatingLabelText="140 characters"
                floatingLabelFixed={true}
                rows={3}
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
              <UploadPicture src={cover} path={'/publishers/11/columns/'+this.props.params.cid+'/cover'} type='cover'/>
            </Edit>
          </Flex>
          <Divider/>
          <div  className="head sans-font">TEAM</div>
          <Flex>
            <Title>
              <div className="sans-font">Writers</div>
            </Title>
            <Edit>
              <div className='row' style={{marginTop:'15px'}}>
                {writer.map((data,index)=>(
                  <Chip
                    key={index}
                    onRequestDelete={() => this.confirmDeleteWriter(data)}
                    style={{margin:'4px'}}
                  >
                    {data.display}
                  </Chip>
                ))}
                <AutoComplete
                  hintText="Add an writer..."
                  filter={AutoComplete.noFilter}
                  dataSource={dataSource3}
                  onUpdateInput={this.getSource}
                  onNewRequest={this.addAdmin}
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
                {editor.map((data,index)=>(
                  <Chip
                    key={index}
                    onRequestDelete={() => this.confirmDeleteEditor(data)}
                    style={{margin:'4px'}}
                  >
                    {data.display}
                  </Chip>
                ))}
                <AutoComplete
                  hintText="Add an editor..."
                  filter={AutoComplete.noFilter}
                  dataSource={dataSource3}
                  onUpdateInput={this.getSource}
                  onNewRequest={this.addAdmin}
                />
              </div>
            </Edit>
          </Flex>
          <div className='sans-font' style={{margin:'80px',overflow:'hidden'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{textStatus}</TextStatus></div>
        </Container>
    )
  },
})



export default ColumnSettingPage