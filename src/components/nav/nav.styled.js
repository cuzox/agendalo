import styled from 'styled-components'

export const NavLinks = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  
  span{
    margin: 0 10px;
    a {
      color: #ededed;
      font-weight: 600;
    }
  }
  span:first-child{ margin-left: 0; }
  span:last-child{ margin-right: 0; }
`


export const NavContent = styled.div`
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