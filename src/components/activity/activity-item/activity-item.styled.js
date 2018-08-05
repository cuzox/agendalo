import styled from 'styled-components'

export const StdCard = styled.div`
  display: flex;
  margin: 20px 0;
  background-color: white;
  border-radius: 10px;
  overflow: hidden; 
  box-shadow: 0 1px 0 0 rgba(0,0,0,0.1);
  cursor: pointer;
  max-height: 320px;
  /* transition: all .2s ease-in-out; */

  &:hover{
    transform: scale(1.02);
  }

  .card-content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 196px);
    margin: 8px;
  }

  .title{
    display: block;
    display: -webkit-box;
    max-height: 38px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #282C35;
    font-size: 15px;
    line-height: 19px;
    max-height: 2.5em;
    font-weight: 600;
    letter-spacing: 0;
    padding: 0;
    height: 2.5em;
  }

  .body{
    display: block;
    display: -webkit-box;
    max-height: 38px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #282C35;
    font-size: 15px;
    line-height: 19px;
    max-height: 2.5em;
    letter-spacing: 0;
    padding: 0;
    height: 2.5em;
  }

  > img {
    height: 170px; 
    width: 180px;
    min-width: 180px;
    object-fit: cover;
  }

  &.compact{
    flex-direction: column;
    width: 250px;
    min-width: 250px;
    > img {
      width: 100%;
    }
    .card-content{
      width: calc(100% - 16px);
    }
  }

  &.margin{
    margin: 20px 5px;
  }
  
  @media (max-width: 460px) {
    flex-direction: column;
    > img {
      width: 100%;
    }
    .card-content{
      width: calc(100% - 16px);
    }
  }
`