import React, { Component } from 'react';

import { MainContainer} from '../../global.styled'
import { Row, Col } from 'antd'

class Terms extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <MainContainer style={{alignItems: "center", justifyContent: "initial"}}>
        <Row type="flex" justify="center">
          <Col xl={12} lg={16} md={18} sm={20} xs={22}>
            <div style={{margin: "20px"}}>
              <h2 style={{textAlign: "center"}} >Términos y Condiciones</h2>
              <h3>Sobre el contenido</h3>
              <p>
                Para publicar contenido en nuestro portal cada empresa deberá pasar por un proceso de verificación el cual no ayudará a evitar la colocación de informaciones falsas o inexactas para perjudicar alguna institución.
                <br/><br/>
                Todo el contenido provisto por los usuarios, pasa a ser propiedad de agendalo.com.do, sin retribución alguna directa, y nos autoriza a mostrar, distribuir y aprovechar por cualquier vía que agendalo.com.do considere.
                <br/><br/> 
                Agendalo.com.do no asume responsabilidad por cualquier contenido colocado en el portal, ni por las  decisiones o acciones que realices. Si encuentras una información aparentemente incorrecta en el sitio web y para evitar que algún dato sea inexacto y así evitar que se siga mostrando, te pedimos que por favor nos ayudes reportando el error por las vías correspondientes.
                <br/><br/>
                Todo el contenido mostrado en nuestro portal, como las recomendaciones, descripciones, fotografías y comentarios, son suministradas de forma exclusiva por los usuarios  de agendalo.com.do, por lo que queda prohibido que de alguna manera, este contenido sea reproducido en alguna otra página web o aplicación móvil.
                <br/><br/> 
                No asumimos responsabilidad alguna, por las decisiones que pueda tomar, quien consuma el contenido generado por la agendalo.com.do, ni por posibles daños que pudiera ocasionar alguna falta de exactitud de los datos mostrados.
                <br/><br/> 
                Los usuarios de agendalo.com.do son responsables por los datos suministrados, y asumimos dicha información como veraz y actual, por lo que debe ser revisada periódicamente, debiendo mantener libre de responsabilidad a la administración de este portal ante eventuales reclamos generados por ellos, en caso de alguna diferencia, error o faltas, sin que estas se entiendan como limitativas, agendalo.com.do no asume responsabilidad al respecto.
                <br/><br/>
              </p>
              <h3>Sobre su información y privacidad</h3>
              <p>
                Al crear esta cuenta para acceder, interactuar y publicar debe saber lo siguiente para su tranquilidad:
              </p>
              <ul>
                <li>
                  Si utiliza su correo para hacer login, almacenaremos su contraseña de manera encriptada. 
                </li>
                <li>
                  Bajo ninguna circunstancia compartiremos su información personal (Nombre, correo, fecha de nacimiento y otros datos que nos suministres) a terceros, su información queda segura con nosotros, y por eso, solamente nosotros, la utilizaremos para interactuar con usted.
                </li>
              </ul>
              <br/>
              <h3>
                Sobre las valoraciones y comentarios de los usuarios
              </h3>
              <p>
                Los comentarios u opiniones, las imágenes, así como la valoración en estrellas sobre los diferentes productos y/o servicios, que salen registrados en nuestro portal, son producidos y/o enviados por los usuarios y no se pueden considerar un juicio de valor por parte de cifrar.com.do. 
                <br/><br/>
                Nos reservamos el derecho de publicar o no, las opiniones ofrecidas por los usuarios en sus valoraciones y comentarios, de manera discrecional. Por esta razón, es posible que tu comentario no sea mostrado de inmediato.
                <br/><br/>
                Se prohíbe utilizar en el portal, términos ofensivos y contrarios a la moral y buenas costumbres. Tampoco el lenguaje vulgar /obsceno, discriminatorio y/u ofensivo. No se aceptarán comentarios a modo de denuncia que mencionen nombres de personas o nombres de otras empresas distintas al que se está comentando o valorando.
                <br/><br/>
                Nos reservamos el derecho de eliminar o suspender la cuenta de aquellos usuarios, incluyendo todo su contenido provisto, que actúen de manera incongruente con estos términos y condiciones. Aplica principalmente si son cuentas falsas para hacer spam, difamar, o si se crean para ofender al resto de la comunidad.
                <br/><br/>
                Si tienes alguna pregunta que no hayamos respondido en esta página, por favor escríbenos.
              </p>
            </div>
          </Col>
        </Row>
      </MainContainer>
    )
  }
}

export default Terms