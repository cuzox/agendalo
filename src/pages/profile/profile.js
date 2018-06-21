import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
        <img style={{ height: "100px", width: "100px" }}src="assets/images/user.png"/>
        <span>{this.props.userName}</span>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    userName: `${state.user.firstName} ${state.user.lastName}`
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)