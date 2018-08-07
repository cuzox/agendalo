import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-image: url("/assets/images/bg-plain.png");
  background-color: #cccccc;
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom: 20px solid rgb(0,201,211);
  padding-top: 150px;

  * {
    color: white;
  }

  h4, h3, p{
    color: white; 
    font-family: "Raleway"; 
  }
  h4{ font-size: calc(15px + 2vw); }
  h3{ font-size: calc(15px + 1.8vw); }
  p { font-size: calc(12px + 0.6vw); }

  .register{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(12px + 0.3vw);
    margin-right: calc(15px + 5vw);

    button {
      font-weight: bold; 
      color: #194973;
    }
  }

  .video-link{
    margin: 20px 0;
    font-size: calc(12px + 0.5vw);
    white-space: nowrap;
    a{
      margin-right: 10px;
    }
  }
`

export const Month = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;

    .ui.dropdown .item span{
      white-space: nowrap;
    }

    .ui.button, .ui.button:hover, .ui.button:visited{
      background: rgb(0,201,211) !important;
      color: #f3f3f3 !important;
    }

    .ui.button{
      position: relative;
      width: 100px;
    }

    a{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      color: white;
      &:hover{
        color: white;
      }
    }

    .ui.button:active{
      background: #02bec7 !important;
    }
`

export const Newsletter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #194973;
    border-radius: 12px;
    padding: 20px 0 10px;
    margin: 0 10px 25px 10px;
    overflow: hidden;
`
