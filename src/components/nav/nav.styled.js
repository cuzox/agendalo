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
  vertical-align: middle;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: #194973;
  border-bottom: 20px solid rgb(0,201,211);
  transition: height 200ms linear;
  .Logo {
    z-index: 2;  
    img{ 
      transition: width 180ms linear; 
      width: 150px; 
    }
  }

  &.in-home,&.compact-top{
    transition: height 100ms linear;
    .Logo img{ 
      transition: width 100ms ease-in-out; 
    }
  }

  &.in-home.compact-top{
    .Logo img{ 
      width: 25vmin;
      min-width: 150px;
    }
  }


  &.in-home{
    align-items: center;
    border-bottom: none;
    background-color: rgba(0,0,0,0);
    height: 150px;
    align-items: flex-end;
    .Logo img{ 
      width: 250px;
    }
  }

  &.compact-top{
    justify-content: space-between;
    padding-top: 10px 0;
    transition: background-color 200ms ease-in;
  }
`

export const NavFold = styled.div`
  display: flex;
  justify-content: center; 
  width: 100%;
  background-color: #194973;
  position: absolute;
  padding: 15px 0;
  top: 100%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  z-index: -1;
  transform: translateY(-20px);
  transition: all 200ms ease-in;
  border-bottom: 20px solid rgb(0,201,211);
  margin-top: 20px;

  &.in-home{
    border-top: 20px solid rgb(0,201,211);
    margin-top: 0;
  }

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