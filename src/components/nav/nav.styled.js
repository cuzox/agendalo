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
  padding-top: 15px;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0,52,102,0.9);
  border-bottom: 20px solid rgb(0,201,211);
  transition: height 200ms linear 100ms;
  .Logo {
    z-index: 2;  
    img{ 
      transition: width 180ms linear; 
      width: 150px; 
    }
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
    justify-content: space-between;
    padding-top: 10px 0;
    transition: background-color 200ms ease-in;
    .Logo img{ 
      width: 25vmin; 
      min-width: 150px; 
    }
  }
`

export const NavFold = styled.div`
  display: flex;
  justify-content: center; 
  width: 100%;
  background-color: #003366;
  position: absolute;
  padding: 15px 0;
  top: 100%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  z-index: -1;
  transform: translateY(-20px);
  transition: all 200ms ease-in;
  border-bottom: 10px solid rgb(0,201,211);
  border-top: 10px solid rgb(0,201,211);

  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
      padding: 10px 0;

      a {
        text-decoration: none;
        color: white;
      }

      &:not(:last-child){
        border-bottom: 1px solid white
      }

      &.center{
        display: flex;
        justify-content: center;
      }
    }

  }

  &.fold-down{
    opacity: 1;
    visibility: visible;
    z-index: 1;
    transform: translateY(0)
  }
}
`