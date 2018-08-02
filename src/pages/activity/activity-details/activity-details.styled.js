import styled from 'styled-components'


import { MainContainer} from '../../../global.styled'

export const StdMain = MainContainer.extend`
  padding-top: 160px;
  padding-bottom: 220px;
  justify-content: initial;
  .column {
    background-color: white;
    box-shadow: 0 0 12px rgba(0,0,0,0.2);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .body{
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .body-title{
      font-weight: bold;
    }
    .body-text{
      color: #555;
    }
  }
  img{
    width: 100%;
    margin-bottom: 20px;
  }
`

export const StdActivityList = styled.div`
  display: flex;
  flex-grow: 0;
  overflow: auto;
  >*{
    margin: 10px !important;
  }
`