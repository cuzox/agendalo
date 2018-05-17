import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`

export const Header = styled.div`
  height: 15vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 15px 0 20px 0;
`

export const Footer = Header.extend`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  height: 10vh;
`

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid blue;
  margin: 0 10px;
  padding: 0 0 0 15px;
  height: 60px;
  font-size: 0.8em;

  span:first-child{
    font-size: 1.1em;
    margin-bottom: 5px;
    font-weight: 600;
  }
`