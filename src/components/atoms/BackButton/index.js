import React from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';

var styles={
  btn:{
    float:'left',
  },
  labelBtn:{
    color:'#E2E2E2',
    fontWeight:'bold'
  }
}

const Box= styled.div`
  overflow:hidden;
  width:100%;
`

const BackButton = ({style})=>{
  return(
    <Box style={{...style}}>
    <FlatButton
      label='Back'
      labelStyle={styles.labelBtn}
      labelPosition='after'
      style={{...styles.btn}}
      icon={<i className="fa fa-chevron-left" style={{color:'#E2E2E2'}} aria-hidden="true"></i>}
    />
    </Box>
  )
}

export default BackButton