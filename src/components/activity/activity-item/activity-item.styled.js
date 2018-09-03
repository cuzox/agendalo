import styled from 'styled-components'

export const StdCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 10px;
  overflow: hidden; 
  box-shadow: 0px 6px 30px rgba(210, 210, 210, 0.5);
  border: 2px solid #dadada;
  cursor: pointer;
  max-height: 330px;
  transition: all .2s ease;
  margin: 8px 0;

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
    margin-bottom: 5px;
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
    margin-bottom: 5px;
  }

  > img {
    height: 170px; 
    width: 180px;
    min-width: 180px;
    object-fit: cover;
    object-position: 0 0;
  }

  &.compact{
    flex-direction: column;
    min-width: 250px;
    > img {
      width: 100%;
    }
    .card-content{
      width: calc(100% - 16px);
    }
  }

  .date-tags{
    line-height: 14px;
    font-weight: 13px;
  }  

  .action-button{
    width: 40px;
    height: 40px;
    position: relative;
    margin: 0 0 0 5px !important;

    .action-icon{
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 8px;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  
  @media (max-width: 450px) {
    flex-direction: column;
    > img {
      width: 100%;
    }
    .card-content{
      width: calc(100% - 16px);
    }
  }
`