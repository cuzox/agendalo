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
`

export const PhotoList = styled.div`
  overflow-x: auto; 
  overflow-y: hidden; 
  border-radius:  5px; 
  margin-left:  10px; 
  border:  1px solid #b1b1b1; 
  width:  calc(100% - 110px); 
  background-color:  white;
`