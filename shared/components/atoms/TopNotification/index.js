import React from 'react'
import styled from 'styled-components'

const Notification = styled.div`
    position: fixed;
    margin: auto;
    width: 540px;
    height: 50px;
    background: ${props => (props.background ? props.background : '#C24444')};
    top: ${props => (props.show ? '60px' : '0px')};
    left: 0;
    right: 0;
    border-radius: 0px 0px 10px 10px;
    display: grid;
    text-align: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF;
    transition: .5s;
    z-index: 9;
`

const TopNotification = ({ text, show, background }) => {
	return (
		<Notification className="nunito-font" background={background} show={show}>
			{text}
		</Notification>
	)
}

export default TopNotification
