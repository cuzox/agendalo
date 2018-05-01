import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 700px; */
  position: relative;
  overflow: hidden;
  background-image: url("assets/images/bg-plain.png");
  background-color: #cccccc;
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom: 30px solid rgb(0,201,211);
  align-items: center;

  * {
    color: white;
  }

  h4, h3, p{ 
    color: white; 
    font-family: "Raleway"; 
  }
  h4{ font-size: 4em; }
  h3{ font-size: 3.5em; }
  p { font-size: 1.4em; }

  .add-activity{
    align-items: center;
    display: flex;
    button { font-weight: bold; color: #003366; }
  }

  .register{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2em;

    button {
      font-weight: 1.4em;
      font-weight: bold; 
      color: #003366;
    }
  }

  .video-link{
    margin: 20px 30px;
    font-size: 1.3em;
  }
`

export const Month = styled.div`
    display: flex;
    align-items: center;
    background-color: #003366;
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
    padding: 8px 40px;
    margin: 35px 8px 8px 0;
    justify-content: flex-end;


    span{
      font-size: 1.3em;
      font-weight: bolder;
      margin-right: 40px;
      color: white;
    }

    .ui.selection.active.dropdown .menu,
    .ui.selection.active.dropdown:hover,
    .ui.selection.dropdown{
      background-color: rgb(0,201,211);
      color: #003366 !important;
      font-weight: bold !important;
      font-size: 1.3em;
    }

    .ui.selection.dropdown{
      border-radius: 15px;
    }

    .ui.dropdown .menu>.item span{
      color: #003366 !important;
      font-weight: bold !important;
    }

    .ui.selection.visible.dropdown>.text{
      font-weight: bold !important;
    }
`

export const Newsletter = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #003366;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    padding: 20px 80px;
    margin: 35px 0px 8px 8px;
`
