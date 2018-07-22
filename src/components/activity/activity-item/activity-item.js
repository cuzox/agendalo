import React from 'react'
import { StdCard } from './activity-item.styled'
import { Button } from 'semantic-ui-react'


function ActivityItem (props){
  let { activity, compact } = props
  function agendalo(e){
    e.stopPropagation()
    e.preventDefault()
  }
  return (
    <StdCard className={compact ? "compact":""}>
      <img alt="" src={activity.photos.length ? activity.photos[0] : '/assets/images/placeholder.jpg'}/>
      <div className="card-content">
        <h3 className="title">
          {activity.name}
        </h3>
        <h4 className="body">
          {activity.description}
        </h4>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
            <span style={{color: "black"}}>Domingo 29, 5:00PM</span>
            <span style={{color: "black"}}>{activity.category && "#" + activity.category.name}</span>
          </div>
          <Button basic style={{ padding: "5px 10px" }} onClick={e => agendalo(e)}>
            <img style={{height: "30px", width: "auto"}} src="/assets/images/logo_sm_darkb.png" />
          </Button>
        </div>
      </div>
    </StdCard>
  )
}

export default ActivityItem