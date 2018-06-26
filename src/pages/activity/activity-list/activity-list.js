import React, { Component } from 'react';


import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { MainContainer} from '../../../components/global.styled'

class ActivityList extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <MainContainer style={{alignItems: "center", justifyContent: "initial"}}>

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList)