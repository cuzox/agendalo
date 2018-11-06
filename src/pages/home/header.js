import React from 'react';
import FaPlayCircleO from 'react-icons/lib/fa/play-circle-o'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { 
  Header as StdHeader,
} from './home.styled'
export default function(props){
  return (
    <StdHeader className={"home-header"}>
        <Row type="flex" justify="center">
          <Col xl={12} lg={16} md={18} sm={20} xs={22}>
            <span><h3>TU AGENDA EN LÍNEA DE</h3></span>
            <span><h4><b>ACTIVIDADES CRISTIANAS</b></h4></span>
            <span>
              <p>
                Mantente al día con todas las actividades cristianas:
                conciertos, charlas, campamentos, conferencias y más.
              </p>
            </span>
            <div style={{display: "flex", marginTop: "30px", marginBottom: "50px"}}>
              {!props.loggedIn &&
                <div className="register">
                  <Link to="/registro">
                    <Button className="our-green">
                      ¡REGISTRAME!
                    </Button>
                  </Link>
                  <Link to="/login">¿Ya tienes cuenta?</Link>
                </div>
              }
              <span className="video-link">
                <a href="https://www.youtube.com/watch?v=RPhmAjNhp28/">
                  ¿CÓMO FUNCIONA?
                </a>
                <FaPlayCircleO/>
              </span>
            </div>
          </Col>
        </Row>
        
    </StdHeader>
  )
}
