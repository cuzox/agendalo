import React, { Component } from 'react';


import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'


import { Icon, Menu } from 'semantic-ui-react'

class ControlPanel extends Component {
  constructor(props) {
    super(props)
  }

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state
    return(
      <div style={{display: "flex", justifyContent: "center"}}>
        <Menu compact icon='labeled'>
          <Menu.Item name='gamepad' active={activeItem === 'gamepad'} onClick={this.handleItemClick}>
            <Icon name='user' />
            Usuarios
          </Menu.Item>

          <Menu.Item name='video play' active={activeItem === 'video play'} onClick={this.handleItemClick}>
            <Icon className='adversal' />
            Publicidad
          </Menu.Item>
        </Menu>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel)