import styled from 'styled-components'

export const StdFilter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  
  > *:not(:last-child){
    margin-right: 10px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    > *{
      width: 100%;
    }
    > *:not(:last-child){
      margin-right: 0;
    }
    > *:not(:first-child){
      margin-top: 10px;
    }
  }
`