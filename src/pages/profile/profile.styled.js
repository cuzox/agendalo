import styled from 'styled-components'

export const StdActivityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  height: 600px;
  padding: 10px;
  background-color: #e7e7e7;
  >*{
    width: 250px;
    min-width: 250px;
    margin: 10px !important;
  }
`