import styled from 'styled-components'

const Header = styled.div`
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

export default Header