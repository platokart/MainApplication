import styled from 'styled-components'

export const VideoCallBgContainer = styled.div`
    padding : 40px;
    background: #FFF;
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : column;
    width : 95vw;
    height : 100vh;
    @media screen and (max-width:576px){
        padding : 20px;
    }
    
`

export const VideoCallBgCard = styled.div`
    display : flex;
    align-items : center;
    justify-content : ${props => props.msgbtnClicked ? 'space-between' : 'center'};
    flex-direction : ${props => props.msgbtnClicked ? 'row' : 'column'};
    width : 100%;
    height : 90vh;
    @media screen and  (max-width:576px){
     flex-direction : column;
     justify-content : flex-start;
     height : 100%;
     }
    
`

export const VideoCallHeading = styled.h1`
    color: #0071C1;
    font-family: Inter;
    font-size: 52px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    align-self : flex-start;
    margin-left : 60px;
    
`

export const VideoCallingMainContainer = styled.div`
    width : ${props => props.msgbtnClicked ? '66%' : '90%'};
    height : 100%;
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : column;
    margin-right : ${props => props.msgbtnClicked ? '20px' : '0'};
    @media screen and (min-width:577px) and (max-width:991px){
        width : ${props => props.msgbtnClicked ? '56%' : '90%'};
    }
    @media screen and (max-width : 576px){
        width : 90%;
        height : ${props => props.msgbtnClicked ? '800px' : '80vh'};
    }
    
`

export const VideoCallBgImageContainer = styled.div`
    height : 100%;
    width : 100%;
    display : flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content : space-between;
    border-radius : 20px;
    background-image : url(${props => props.bgimage});
    background-size : cover;
    margin-bottom : 30px;
`

export const VideoCallContentsContainer = styled.div`
    display : flex;
    align-items : center;
    justify-content : space-between;
    width : 100%
`
export const VideoCallingContentCard = styled.div`
    border-radius: 100px;
    background: rgba(0, 0, 0, 0.52);
    backdrop-filter: blur(30px);
    padding: 30px;
    margin : 20px;
`

export const VideoCallContent = styled.p`
    color: #FFF;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const VideoOppositeImage = styled.img`
    height : 280px;
    border-radius : 24px;
    width : 280px;
    margin-left : 40px;
    margin-bottom : 50px;
    @media screen and (min-width:577px) and (max-width:992px){
        height : 180px;
        width:220px;
        margin-left : 25px;
        margin-bottom : 30px;
    }
    @media screen and (max-width:576px){
        height : 120px;
        width : 150px;
        margin-left : 20px;
        margin-bottom : 20px;
    }
`

export const VideoCallFeaturesIcons = styled.div`
    disply : flex;
    align-items : center;
    justify-content : center;
    align-self : center;
    @media screen and (max-width:576px){
        margin-bottom : 30px;
    }
`

export const VideoCallFeaturesBtn = styled.button`
    border-radius : 50%;
    margin-right : 20px;
    padding : 14px;
    background : ${props => props.btnClicked ? 'black' : 'grey'};
    color : #FFF;
    font-size : 24px;
    cursor : pointer;
    border : none;
    @media screen and (max-width:576px){
        font-size : 20px;
        margin-right : 10px;
        padding : 14px;
    }
`

export const VideoCallCutBtn = styled.button`
    border-radius : 50%;
    margin-right : 20px;
    padding : 14px;
    background : #F8000F;
    font-size : 24px;
    color : #FFF;
    cursor : pointer;
    @media screen and (max-width:576px){
        font-size : 20px;
        padding : 14px;
        margin-right : 10px;
    }
`

export const ChatContainer = styled.div`
    border-radius: 30px;
    background: #B7C9F2;
    display: ${props => props.msgbtnClicked ? 'flex' : 'none'};
    height: 97%;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    width : 24%;
    justify-content : flex-end;
    @media screen and (min-width:577px) and (max-width:991px){
        width : 34%;
    }
    @media screen and (max-width:576px){
        margin-top : 40px;
        height : 700px;
        width : 86%;
        border-radius : 16px;
        padding : 14px;
    }
    
`

export const MsgInputContainer = styled.div`
    display : flex;
    align-items : center;
    justify-content : space-around;
    padding : 10px;
    border-radius: 10px;
    background: #FFF;
    width : 98%;
    align-self : flex-end;
    @mediac screen and (max-width:576px){
        width : 94%;
        padding : 6px;
    }
`

export const MsgInput = styled.input`
    width : '78%';
    margin-right : 10px;
    background : transparent;
    border : none;
    font-size : 20px;
    outline : none;
    @media screen and (max-width:576px){
        font-size : 14px;
        width : 70%;
    }
`



