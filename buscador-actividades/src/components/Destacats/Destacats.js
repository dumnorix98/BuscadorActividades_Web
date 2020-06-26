import React, { Component } from "react";

import { Card, CardImg, CardTitle, CardText, Col, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import "./Destacats.css";

class Destacats extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      
      <Col md="4" className="ColumnaCarta">
        <Card className="CartaDestacada">
          <Link to={"/eventos/" + (this.props.Eventos.id)} className="link">
            <figure >
              <CardImg
                top
                width="100%"
                src={"http://localhost:3000/img/" + this.props.Eventos.Imagen}
                alt={this.props.Eventos.Nombre}
                className="escalar"
              />
            </figure>
          </Link>

          <Link to={"/eventos/" + (this.props.Eventos.id)} className="link">
            <CardBody className="carta-cos">
              <CardTitle>
                {" "}
                <div>
                  <span className="negreta">{this.props.Eventos.Nombre}</span>
                </div>
              </CardTitle>
            </CardBody>
          </Link>
        </Card>
      </Col>
    );
  }
}

export default connect()(Destacats);
