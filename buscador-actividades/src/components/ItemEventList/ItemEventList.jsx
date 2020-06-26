import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardImg, CardTitle, CardText, Col, CardBody } from "reactstrap";
import { faUserAlt, faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Alerta from "../Alerta/Alerta";
import "./ItemEventList.css";

import { connect } from "react-redux";
import { API } from "../../config/Config";

class ItemEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialColor: "grey"
    };

    this.addFavEvent = this.addFavEvent.bind(this);
  }

  componentDidUpdate() {
    let userToken = this.props.userToken;
    let usuari = {
      token: userToken
    };

    fetch(API + "/usuarios/VerPerfil", {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify(usuari)
    });
  }

  addFavEvent() {
    /** this.props.dispatch({
      type: "ADD_FAV_EVENT",
      item: this.props.Id
    });*/
    let userToken = this.props.userToken;
    let usuari = {
      token: userToken,
      Eventos_id: this.props.Id
    };
    let color;
    console.log(usuari + "usuario eventos");
    console.log(this.props.Id);
    if (this.state.initialColor === "grey" && userToken) {
      color = "black";
      fetch(API + "/usuarios/Like", {
        method: "POST",
        headers: new Headers({ "Content-type": "application/json" }),
        body: JSON.stringify(usuari)
      })
        .then(res => res.json())
        .then(res => {
          if (res.ok === false) {
            <Alerta
              alertColor="danger"
              alertMessage="error al añadir a favoritos"
            />;
            throw "Ha habído un error al añadir a favoritos";
          } else {
            console.log("Evento añadido a favoritos");
            <Alerta alertColor="success" alertMessage="añadido a favoritos" />;
          }
        })
        .catch(err => console.log(err));
    } else {
      color = "grey";
      if (userToken) {
        fetch(API + "/usuarios/Dislike", {
          method: "POST",
          headers: new Headers({ "Content-type": "application/json" }),
          body: JSON.stringify(usuari)
        })
          .then(res => res.json())
          .then(res => {
            if (res.ok === false) {
              throw "no se ha podido borrar de favoritos";
            } else {
              console.log("Borrado de favoritos");
            }
          });
      }
    }
    this.setState({
      initialColor: color
    });
    console.log("hola click");
    console.log(this.state.initialColor);
  }

  render() {
    let renderCard;
    if (this.props.clickableCard) {
      renderCard = (
        <Card className="Carta">
          <Link to={"/eventos/" + (this.props.Id)} className="link">
            <CardImg
              top
              width="100%"
              src={"http://localhost:3000/img/" + this.props.Img}
              alt={this.props.Titulo}
              className="escalar"
            />
          </Link>

          <FontAwesomeIcon
            icon={faHeart}
            color={this.state.initialColor}
            onClick={this.addFavEvent}
            className="icon"
          />

          <div className="iconoUsers">
            {this.props.Asistentes}
            <FontAwesomeIcon icon={faUserAlt} />
          </div>
          <Link to={"/eventos/" + (this.props.Id)} className="link">
            <CardBody className="carta-cos">
              <CardTitle>
                {" "}
                <div>
                  <span className="negreta">{this.props.Titulo}</span>
                  <span className="precio"> {this.props.Precio} </span>
                  <FontAwesomeIcon
                    icon={faEuroSign}
                    className="tamany-icona"
                  />{" "}
                </div>
              </CardTitle>
              <CardText>{this.props.Descripcion} </CardText>
              {/* <Button> Més info </Button> */}
            </CardBody>
          </Link>
        </Card>
      );
    } else {
      renderCard = (
        <Card className="Carta">
          <CardImg
            top
            width="100%"
            src={"http://localhost:3000/img/" + this.props.Img}
            alt={this.props.Titulo}
            className="escalar"
          />

          <FontAwesomeIcon
            icon={faHeart}
            color={this.state.initialColor}
            onClick={this.addFavEvent}
            className="icon"
          />

          <div className="iconoUsers">
            {this.props.Asistentes}
            <FontAwesomeIcon icon={faUserAlt} />
          </div>
          <CardBody className="carta-cos">
            <CardTitle>
              {" "}
              <div>
                <span className="negreta">{this.props.Titulo}</span>
                <span className="precio"> {this.props.Precio} </span>
                <FontAwesomeIcon
                  icon={faEuroSign}
                  className="tamany-icona"
                />{" "}
              </div>
            </CardTitle>
            <CardText>{this.props.Descripcion} </CardText>
            {/* <Button> Més info </Button> */}
          </CardBody>
        </Card>
      );
    }
    return (
      <Col md="4" className="ColumnaCarta">
        {renderCard}
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    userToken: state.usuario
  };
};
export default connect(mapStateToProps)(ItemEventList);
