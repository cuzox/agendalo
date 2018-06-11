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
  border-bottom: 20px solid rgb(0,201,211);
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

  @media only screen and (max-width: 800px) {

    h4{ font-size: 2.5em; }
    h3{ font-size: 2em; }
    p { font-size: 1em; }

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
    padding: 8px 0;
    justify-content: flex-end;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    margin-top: 25px;
    margin-right: 10px;
    padding-right: 40px;

    /* @media (max-width: 576px) {
       flex-direction: column;
       align-items: flex-start;
     } */


    > span{
      font-size: 1.2em;
      font-weight: bolder;
      margin-right: 20px;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      padding: 5px 8px;
      cursor: default;
    }

    .ui.selection.active.dropdown .menu,
    .ui.selection.active.dropdown:hover,
    .ui.selection.dropdown{
      background-color: rgb(0,201,211);
      color: #003366 !important;
      font-weight: bold !important;
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
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 20px 40px;
    margin: 25px 0px 25px 10px;
`
