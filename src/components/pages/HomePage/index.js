import React from 'react'
import { PageTemplate, AppBarMenu, AppBarMenuMain} from 'components'

import styled from 'styled-components'


var Container = styled.div`
  width:100%;
  background-color:#625254;
  height:auto;
`

const HomePage = () => {
  return (
    <Container>
      <AppBarMenu onScroll={0} logedIn={0} />
      <div style={{height:'50px'}}></div>
      <AppBarMenuMain onScroll={0} logedIn={1}/>
      <div style={{height:'50px'}}></div>
   </Container>
  )
}

export default HomePage
