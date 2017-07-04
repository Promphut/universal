import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
  border: 0.5px solid #c4c4c4;
  border-radius: 100px;
  text-align: center;
  padding: 8px 15px 15px 15px;
  font-size: 14px;
  color: #8E8E8E;
  width: 168px;
  height: 35px;

  &:hover{
    cursor:pointer;
    border: 0.5px solid ${props => props.theme.accentColor};
    color: ${props => props.theme.accentColor};
  }
  
  @media (max-width:480px){
    font-size:13px;
    padding:6px 10px 8px 10px;
  }
`
class SeeMore extends React.Component {
    constructor(props) {
    super(props)
  }

    render() {
        return(
            <a href={this.props.linkTo}><Button>See More</Button></a>
        )
    }
  
}

export default SeeMore