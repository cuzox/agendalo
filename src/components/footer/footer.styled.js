import styled from "styled-components";

export const Footer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  padding: 1rem;
  height: 160px;
  overflow: hidden;
  color: white;
  display: flex;
  justify-content: center;
  background-color: rgba(0,52,102,0.9);
  border-top: 20px solid rgb(0,201,211);
  font-size: 0.9rem;

  @media (max-width: 500px) {
    flex-direction: column;
    height: 300px;
  }
`

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid white;
  margin: 0 10px;
  padding: 0 0 0 15px;
  height: 4rem;
  font-size: 0.8em;
  white-space: nowrap;

  @media (max-width: 500px) {
    
    border-left: none;
    border-top: 1px solid white;
    justify-content: center;
    padding: 0;
    margin: 0;
    margin-top: 10px;
  }

  span:first-child{
    font-size: 1.1em;
    margin-bottom: 5px;
    font-weight: 600;
  }
`