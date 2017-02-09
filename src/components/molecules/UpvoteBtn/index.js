import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const Btn = styled.button`
  background-color:#E06048;
  color:#fff;
  width:auto;
  height:auto;
  font-size:14px;
  border-radius:17px;
  margin:5px 15px 15px 100px;
  border:0;
  padding:10px 20px 10px 20px;
  position:relative;
  top:-5px;
  &:hover{
    cursor: pointer,
  } 
`

const styles = {
  button: {
    borderRadius:'15px',
    margin: 12,    
  },
  btnStyle:{
    borderRadius:'15px',
  },
};

/*const a =  <RaisedButton
      target="_blank"
      label={text}
      labelColor="#fff"
      style={styles.button}
      buttonStyle={styles.btnStyle}
      backgroundColor="#E06048"
      icon={<FontIcon className="muidocs-icon-custom-github" />}
    />*/


const UpvoteBtn = ({text,style})=>{

  return(
    <Btn>{text}</Btn>
  )
}

export default UpvoteBtn