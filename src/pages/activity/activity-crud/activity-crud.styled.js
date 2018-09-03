import styled from "styled-components"


export const PhotoUpload = styled.div`
  height:  100px;
  width:  100px;
  border-radius:  5px;
  border:  2px dashed #b1b1b1;
  background-color:  #f1f1f1;
  display:  flex;
  flex-direction:  column;
  justify-content:  center;
  align-items:  center;
  cursor: default;
  
  &:hover, &.green-border{
    border-color: green !important;

  }
`

export const PhotoList = styled.div`
  overflow-x: auto; 
  overflow-y: hidden; 
  border-radius:  5px; 
  margin-left:  10px; 
  border:  1px solid #b1b1b1; 
  width:  calc(100% - 110px);
  height: 100px;
  background-color:  white;
  display: flex;
  position: relative;

  img{
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: 0 0;
  }

  div{
    position: relative;
    .eye, .trash {
      position: absolute;
      top: 8px;
      font-size: 1.5rem;
      background-color: white;
      border-radius: 50%;
      padding: 3px;
    }
    .eye {
      left: 8px;
      color: green;
    }
    .trash {
      right: 8px;
      color: red;
    }
  }
`