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
  h4{ font-size: 4rem; }
  h3{ font-size: 3.5rem; }
  p { font-size: 1.4rem; }

  .register{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
    margin-right: 50px;

    button {
      font-weight: 1.4rem;
      font-weight: bold; 
      color: #003366;
    }
  }

  .video-link{
    margin: 20px 0;
    font-size: 1.3rem;
    span{
      margin-right: 10px;
    }
  }
`

export const Month = styled.div`
    display: flex;
    align-items: center;
    background-color: #003366;
    padding: 8px 40px;
    border-radius: 20px;
    margin: 25px 10px 0 10px;
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
    border-radius: 20px;
    padding: 20px 40px;
    margin: 0 10px 25px 10px;
`
