import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px;
  padding-bottom: 160px;
`

export const Header = styled.div`
  height: 120px;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  background-color: rgba(0,52,102,0.9);
  border-bottom: 20px solid rgb(0,201,211);
  transition: height 200ms linear 100ms;
  .Logo img{ 
    transition: width 180ms linear; 
    width: 150px; 
  }

  &.in-home,&.compact,&.compact-top{
    transition: height 100ms linear;
    border-bottom: none;
    align-items: center;
    background-color: rgba(0,0,0,0);
    .Logo img{ 
      transition: width 100ms ease-in-out; 
    }
  }

  &.in-home{
    height: 150px;
    align-items: flex-end;
    .Logo img{ 
      width: 250px; 
    }
  }

  &.compact{
    justify-content: space-between;
    background-color: rgba(0,0,0,0.8);
    .Logo img{ width: 100px; }
    position: fixed;
  }

  &.compact-top{
    margin-top: 0;
    justify-content: space-evenly;
    margin-top: 20px;
    .Logo img{ 
      width: 25vmin; 
      min-width: 150px; 
    }
  }
`

export const Footer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  padding: 1rem;
  height: 160px;
  overflow: hidden;
  color: white;
  display: flex;
  justify-content: center;
  background-color: rgba(0,52,102,0.9);
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