import React from 'react'


function ActivityItem (props){
  let { activity } = props
  return (
    <div style={{display: "flex", margin: "20px 0"}}>
      {activity.photos.length && (
        <img style={{height: "150px", width: "170px", objectFit: "cover", borderRadius: "20px"}} alt="" src={activity.photos[0]}/>
      )}
      <div style={{width: "calc(100% - 190px)", margin: "10px"}}>
        <h3 style={{fontWeight: "bold"}} >
          {activity.name}
        </h3>
        <h4 style={{overflow: "hidden", textOverflow: "ellipsis"}}>
          {activity.description}
        </h4>
      </div>
    </div>
  )
}

export default ActivityItem