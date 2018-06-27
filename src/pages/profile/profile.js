import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { MainContainer} from '../../global.styled'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <MainContainer style={{alignItems: "center", justifyContent: "initial"}}>
        <img style={{ height: "100px", width: "100px" }}src="assets/images/user.png"/>
        <span>{this.props.userName}</span>
      </MainContainer>
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