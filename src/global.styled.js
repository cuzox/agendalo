import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px;
  padding-bottom: 160px;
  min-height: 100vh;

  @media (max-width: 500px) {
    padding-bottom: 300px;
  }
`