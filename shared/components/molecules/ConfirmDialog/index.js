import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
import api from '../../../services/api'
import Cropper from 'react-cropper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {PrimaryButton,SecondaryButton} from '../../../components'
import config from '../../../config'

const Container = styled.div`
    .row{
        display:flex;
        justify-content:center;
        padding:15px 0 30px 0;
    }
`
const Title = styled.div`
    position:relative;
    top:0;
    left:0;
    background-color:${props=>props.theme.primaryColor};
    color:white;
    text-align:center;
    font-weight:bold;
    font-size:16px;
    font-family:'Nunito';
    padding:15px 0 15px 0; 
`
const Desc = styled.div`
    color:#222;
    text-align:center;
    font-weight:bold;
    font-size:16px;
    font-family:'Nunito';
    padding:15px 0 15px 0; 
`

const ConfirmDialog  = ({open,onRequestClose,action,title,description})=>{
    return (
        <Dialog
          modal={true}
          actionsContainerStyle={{display:'none'}}
          bodyStyle={{padding:0}}
          contentStyle={{width:"513px"}}
          open={open}
          onRequestClose={onRequestClose}
        >
            <Container>
                <Title>{title}</Title>
                <Desc>{description}</Desc>
                <div className='row'>
                    <PrimaryButton
                        label=" Yes "
                        onClick={action}
                        style={{margin:'0 15px 0 15px',width:99}}
                    />
                    <SecondaryButton
                        label="Cancel"
                        onClick={onRequestClose}
                        style={{margin:'0 15px 0 15px'}}
                    />
                </div>
            </Container>   
        </Dialog>

    )
}

export default ConfirmDialog;
