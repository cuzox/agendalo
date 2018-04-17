import styled from "styled-components";

export const Main = styled.div`
  background: url("assets/images/bg-plain.png") no-repeat center center fixed;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const Img = styled.img`
  padding: 30px;
`

export const Text = styled.span`
  color: white;
  font-size: 4em;
  font-weight: bold;
  font-family: 'Montserrat';
  letter-spacing: 2px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
  font-size: 2.5em;
  }
`

export const Redes = styled.div`
  position: relative;
  img {
  width: 150px;
  }
  div {
  position: absolute;
  width: 50px;
  height: 48.38px;
  top: 20px;
  cursor: pointer;
  }
  div:nth-child(3){
  left: 50px;
  }
  div:nth-child(4){
  left: 100px;
  }
`