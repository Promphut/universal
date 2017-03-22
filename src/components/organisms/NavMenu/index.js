import React from 'react'
import styled from 'styled-components'

const Navbar = styled.div`
  font-size:18px;
  font-weight:bold;
  text-align:center;
  background-color:#000;
  color:white;
  width: 100%;
  height: 70px;
  position:fixed;
  top:0;
  left:0;
`

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};


const NavMenu = () => {
  return(
    <Navbar>
      <div>test1</div>
    </Navbar>
  )
}

export default NavMenu;
