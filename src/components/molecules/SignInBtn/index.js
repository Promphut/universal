import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const Btn = styled.button`
  background-color:#00B2B4;
  color:#fff;
  width:auto;
  height:auto;
  font-size:14px;
  border-radius:20px;
  border:0;
  padding:7px 20px 7px 20px;
  position:relative;
  &:hover{
    cursor: pointer,
  } 
`

const styles = {
  button:{
    borderRadius:'20px'
  },
  btnStyle:{
    borderRadius:'20px'
  },
  icon:{
    color:'#fff',
    fontSize:'18px',

  },
  textInner:{

  }
};


/*const b = <Btn style={style} type='button'>
      <div>
        <span style={styles.textInner}><span style={{fontSize:'20px'}}>+ </span> Story</span>
      </div>
    </Btn>*/

const SignInBtn = ({style,buttonStyle})=>{

  var newStyle = Object.assign({},style,styles.button)
  var newBtnStyle = Object.assign({},buttonStyle,styles.btnStyle)
  return(
    <RaisedButton
      target="_blank"
      label='Story'
      labelColor="#fff"
      style={newStyle}
      buttonStyle={newBtnStyle}
      backgroundColor="#00B2B4"
      icon={<FontIcon className="material-icons" style={{fontSize:"18px"}}>add</FontIcon>}
    ></RaisedButton>
  )
}

export default SignInBtn