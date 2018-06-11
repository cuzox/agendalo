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