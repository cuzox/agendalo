import styled from 'styled-components'

export const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10vh;
  
  span{
    margin: 0 30px;
    a {
      color: #ededed;
      font-weight: 600;
    }
  }
  span:first-child{ margin-left: 0; }
  span:last-child{ margin-right: 0; }
`