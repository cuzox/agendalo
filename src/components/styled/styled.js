import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 960px;
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
`

export const Content = styled.div`
  background-color: rgb(233, 236, 240);
  display: flex;
  justify-content: center;
  min-height: 80vh;
`