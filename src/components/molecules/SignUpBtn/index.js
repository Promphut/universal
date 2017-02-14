import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';


const styles = {
  button:{
    borderRadius:'17px',
    background:'none'
  },
  btnStyle:{
    borderRadius:'17px',
    border:'2px solid #00B2B4',
    background:'none'
  },

};


/*const b = <Btn style={style} type='button'>
      <div>
        <span style={styles.textInner}><span style={{fontSize:'20px'}}>+ </span> Story</span>
      </div>
    </Btn>*/

const SignUpBtn = ({style,buttonStyle})=>{

  var newStyle = Object.assign({},style,styles.button)
  var newBtnStyle = Object.assign({},buttonStyle,styles.btnStyle)
  return(
    <RaisedButton
      target="_blank"
      label='Sign Up'
      labelColor="#00B2B4"
      labelStyle={{fontFamily:'Nunito'}}
      style={newStyle}
      buttonStyle={newBtnStyle}
      backgroundColor="none"
    ></RaisedButton>
  )
}

export default SignUpBtn