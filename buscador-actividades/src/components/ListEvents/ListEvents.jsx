import React, { Component } from "react";
import { Button, Row, Col, Table } from "reactstrap";

import Header from "../Header/Header";

import { Redirect } from "react-router-dom";
import { API } from "../../config/Config";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./ListEvents.css";

class ListEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editEvent: false,
      newEvent: false,
      event: ""
    };
    this.newEvent = this.newEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
  }


  newEvent() {
    this.setState({ newEvent: true });
  }

  editEvent(itemId) {
    this.setState({ editEvent: true, event: itemId });
  }

  deleteEvenet(itemId) {
    if (!itemId) return;
  }

  componentDidMount() {
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
      let result = String(datos.EventosCreados).split(",");
      console.log(result[0]);
      let eventosdeMierda = [];
      let j = -1;
      for (let i = 0; i < result.length; i += 4) {
        j++;
        eventosdeMierda[j] = (
            <tr key={String(result[i])}>
              <td>{String(result[i])}</td>
              <td>{String(result[i+1])}</td>
              <td>{String(result[i+2])}</td>
              <td>{String(result[i+3])}</td>
  
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ cursor: "pointer" }}
                  color="#28a745"
                  onClick={() => this.editEvent(String(result[i]))}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: "pointer" }}
                  color="#dc3545"
                  onClick={() => this.deleteEvenet(String(result[i]))}
                />
              </td>
            </tr>
        );
      }
      return eventosdeMierda;
    }
  }

  render() {
    let eventos = this.renderEventos();
    if (this.state.newEvent) {
      return <Redirect to={"/crear_eventos"} />;
    }

    if (this.state.editEvent) {
      return <Redirect to={"/" + this.state.event + "/edit_events"} />;
    }

    return (
      <div>
        <Header buscador={false} />

        <div>
          <div className="tabla">
            <Row>
              <Col>
                <h3 className="titulo">Lista de Eventos</h3>
              </Col>
              <Col>
                <Button
                  size="sm"
                  color="primary"
                  onClick={this.newEvent}
                >
                  Nuevo evento
                </Button>
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

                      <th>Editar</th>
                      <th>Borrar</th>
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

export default connect(mapStateToProps)(ListEvents);