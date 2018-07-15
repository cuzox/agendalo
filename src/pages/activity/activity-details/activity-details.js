import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { MainContainer} from '../../../global.styled'

import { Dimmer, Loader, Input, Dropdown } from 'semantic-ui-react'
import { Row, Col } from 'antd';

class ActivityList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    
  }

  render(){
    return(
      <MainContainer>

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