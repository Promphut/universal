import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar'
import {CommentInput,CommentUser} from 'components'
import TextField from 'material-ui/TextField'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

const Container = styled.div`
  width:auto;
  margin:50px 0 30px 0;
` 


const AutoComplete = React.createClass({
  getInitialState(){
    return{
      open:false
    }
  },

  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  },

  handleRequestClose(){
    this.setState({
      open: false,
    });
  },

  showHint(e,next){
    var  val = e.target.value
    //console.log(e.target.value)
    if(val){
      this.setState({
        open: true,
        anchorEl: e.currentTarget,
      });
      e.target.focus()
    }
    next(e)
  },


  render(){
    var {style,className,type,id,value,hintText,floatingLabelFixed,floatingLabelText,rows,rowsMax,multiline,errorText,inputStyle,underlineStyle,onChange,name,defaultValue,dataSource} = this.props
    
    return(
      <Container style={{...style}} className={className}>
        <TextField
          hintText={hintText?hintText:''}
          floatingLabelText={floatingLabelText?floatingLabelText:''}
          floatingLabelFixed={floatingLabelFixed}
          id={id}
          name={name}
          type={type}
          value={value}
          errorText={errorText}
          rows={rows}
          rowsMax={rowsMax}
          multiline={multiline}
          inputStyle={inputStyle}
          onChange={(e)=>{this.showHint(e,onChange)}}
          defaultValue={defaultValue}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {dataSource.map((data,index)=>(
              <MenuItem primaryText={data.text} key={index} value={data.value}/>
            ))}
          </Menu>
        </Popover>
      </Container>
    )
  }
})

export default AutoComplete;