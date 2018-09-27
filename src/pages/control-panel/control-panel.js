import React, { Component } from 'react';
import { Route, withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { MainContainer} from '../../global.styled'
import ActivityList from '../activity/activity-list/activity-list'
import Adverts from './adverts/adverts'

import { Icon, Menu } from 'semantic-ui-react'

class ControlPanel extends Component {
  constructor(props) {
    super(props)
  }

  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(`/panel/${ name }`)
  }

  componentDidMount(){
    if(this.props.history.location.pathname == '/panel')
      this.props.history.replace('/panel/actividades')
    else{
      if(this.props.history.location.pathname.includes('actividades'))
        this.setState({activeItem: 'actividades'})
      else if(this.props.history.location.pathname.includes('publicidad'))
        this.setState({activeItem: 'publicidad'})
    }
  }

  render(){
    const { activeItem } = this.state
    return(
      <MainContainer>
        <div style={{paddingTop:"120px", display: "flex", justifyContent: "center"}}>
          <Menu compact icon='labeled'>
            {/* <Menu.Item name='gamepad' active={activeItem === 'gamepad'} onClick={this.handleItemClick}>
              <Icon name='user' />
              Usuarios
            </Menu.Item> */}
            <Menu.Item name='actividades' active={activeItem === 'actividades'} onClick={this.handleItemClick}>
              <Icon className='calendar alternate' />
              Actividades
            </Menu.Item>
            <Menu.Item name='publicidad' active={activeItem === 'publicidad'} onClick={this.handleItemClick}>
              <Icon className='adversal' />
              Publicidad
            </Menu.Item>
          </Menu>
        </div>
        <Route exact path="/panel/actividades" render={props =>
          <ActivityList panel compact buttons={["edit", "remove"]} {...props}/>
        }/>
        <Route exact path="/panel/publicidad" render={props =>
          <Adverts {...props}/>
        }/>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({

  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({

  }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ControlPanel)
)