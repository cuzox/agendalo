import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
`

export const Header = styled.div`
  height: 10vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: #003366;
  .Logo img{ width: 100px; }

  &.in-home{
    margin-top: 30px;
    height: 150px;
    background-color: initial;
    .Logo img{ width: 250px; }
  }

  &.compact{
    margin-top: 0;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background-color: rgba(0,0,0,0.8);
    align-items: center;
    .Logo img{ width: 250px; }
    position: fixed;
  }
`

export const Footer = Header.extend`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  height: 10vh;
  overflow: hidden;
  color: white;
  background-color: #003366;
  border-top: 20px solid rgb(0,201,211);
  font-size: 0.9rem;
`

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid white;
  margin: 0 10px;
  padding: 0 0 0 15px;
  height: 4rem;
  font-size: 0.8em;
  white-space: nowrap;

  span:first-child{
    font-size: 1.1em;
    margin-bottom: 5px;
    font-weight: 600;
  }
`