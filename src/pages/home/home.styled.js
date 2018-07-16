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
    background-color: #194973;
    padding: 8px 0;
    border-radius: 12px;
    margin: 25px 10px 0 10px;

    > span{
      font-size: calc(12px + 0.3vw);
      white-space: nowrap;
      font-weight: bolder;
      margin-right: 20px;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      padding: 5px 8px;
      cursor: default;
    }

    .ui.selection.dropdown {
      min-width: calc(120px + 5vw)
    }

    .ui.selection.active.dropdown .menu,
    .ui.selection.active.dropdown:hover,
    .ui.selection.dropdown{
      background-color: rgb(0,201,211);
      color: #194973 !important;
      font-weight: bold !important;
    }

    .ui.dropdown .menu>.item span{
      color: #194973 !important;
      font-weight: bold !important;
    }

    .ui.selection.visible.dropdown>.text{
      font-weight: bold !important;
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
