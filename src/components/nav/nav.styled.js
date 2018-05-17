import styled from 'styled-components'

export const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  height: 10vh;
  
  span{
    margin: 0 30px;
    a {
      color: #ededed;
      font-weight: 600;
    }
  }
  .Logo img{ width: 250px; }

  span:first-child{ margin-left: 0; }
  span:last-child{ margin-right: 0; }
`

export const Nav = styled.div`
  
`