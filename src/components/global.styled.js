import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 280px);
`

export const Header = styled.div`
  height: 120px;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(0,52,102,0.9);
  transition: height 150ms linear;
  .Logo img{ transition: width 150ms linear; width: 150px; }
  border-bottom: 20px solid rgb(0,201,211);

  &.in-home{
    margin-top: 30px;
    background-color: rgba(0,0,0,0);
    .Logo img{ width: 250px; }
    position: absolute;
    z-index: 1;
    border-bottom: none;
  }

  &.compact{
    justify-content: space-between;
    background-color: rgba(0,0,0,0.8);
    align-items: center;
    .Logo img{ width: 100px; }
    position: fixed;
    z-index: 1;
    border-bottom: none;
  }

  &.compact-top{
    margin-top: 0;
    justify-content: space-evenly;
    background-color: rgba(0,0,0,0);
    border-bottom: none;
    align-items: center;
    margin-top: 20px;
    position: absolute;
    z-index: 1;
    .Logo img{ width: 25vmin; min-width: 150px; }
  }
`

export const Footer = Header.extend`
  top: initial;
  bottom: 0;
  padding: 1rem;
  height: 160px;
  overflow: hidden;
  color: white;
  background-color: rgba(0,52,102,0.9);
  border-top: 20px solid rgb(0,201,211);
  font-size: 0.9rem;
  border-bottom: none;
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