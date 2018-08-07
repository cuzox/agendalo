import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px;
  padding-bottom: 160px;
  min-height: 100vh;

  &.space{
    padding-top: 140px;
    padding-bottom: 180px;
  }
  &.more-space{
    padding-top: 200px;
    padding-bottom: 240px
  }

  @media (max-width: 700px) {
    padding-bottom: 300px;
    &.space{ padding-bottom: 320px; }
    &.more-space{ padding-bottom: 380px }
  }

  @media (max-width: 500px) {
    padding-bottom: 300px;
  }
`