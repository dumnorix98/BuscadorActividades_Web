import React, { Component } from "react";
import { Button, Row, Col, Table } from "reactstrap";

import Header from "../Header/Header";

import { Redirect } from "react-router-dom";
import { API } from "../../config/Config";
import { connect } from "react-redux";

import "./ListFavoriteEvents.css";

class ListFavoriteEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editEvent: false,
      newEvent: false,
      event: "",
      datosUsuario: []
    };
  }

  componentDidMount() {
    console.log("HOLA");
    let userToken = this.props.userToken;
    let usuari = {
      token: userToken
    };

    console.log(userToken + "userToken");
    fetch(API + "/usuarios/VerPerfil", {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify(usuari)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          datosUsuario: res.data
        });
        console.log(res.data + "data");
      })
      .catch(err => console.log(err));
  }

  renderEventos() {
    if (!this.state.datosUsuario) {
      return <h3> cargando </h3>;
    } else {
      let datos = this.state.datosUsuario;

      console.log("hola");
      console.log(datos.Eventos);
      let result = String(datos.Eventos).split(",");
      console.log(result[0]);
      let eventosdeMierda = [];
      let j = -1;
      for (let i = 0; i < result.length; i += 4) {
        j++;
        eventosdeMierda[j] = (
          <tr>
            <td>{String(result[i])}</td>
            <td>{String(result[i + 1])}</td>
            <td>{String(result[i + 2])}</td>
            <td>{String(result[i + 3])}</td>
          </tr>
        );
      }
      return eventosdeMierda;
    }
  }
  render() {
    let eventos = this.renderEventos();
    return (
      <div>
        <Header usuario={this.props.usuario} buscador={false} />

        <div>
          <div className="tabla">
            <Row>
              <Col>
                <h3 className="titulo">Lista de Eventos</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>{eventos}</tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userToken: state.usuario
  };
};

export default connect(mapStateToProps)(ListFavoriteEvents);
