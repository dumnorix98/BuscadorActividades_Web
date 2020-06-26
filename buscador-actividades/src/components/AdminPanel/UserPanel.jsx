import React, { Component } from "react";
import { Button, Row, Col, Table } from "reactstrap";

import Header from "../Header/Header";

import { Redirect } from "react-router-dom";
import { API } from "../../config/Config";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./UserPanel.css";

class UserPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editUser: false,
      newUser: false,
      event: "",
      datosUsuario: []
    };
  }
  deleteUser(itemId) {
    if (!itemId) return;
  }

  componentDidMount() {
    let userToken = this.props.userToken;
    let usuari = {
      token: userToken
    };

    console.log(userToken + "userToken");
    fetch(API + "/usuarios/VerUsuarios", {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify(usuari)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          datosUsuario: res.data
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  userColumn(el) {
    let AdminText;
    if(el.Admin)
    {
      AdminText = "Admin"
    }
    else
    {
      AdminText = "Usuario"
    }
    return (
      <tr key={el.id}>
        <td>{el.id}</td>
        <td>{el.Nombre}</td>
        <td>{el.Apellido}</td>
        <td>{el.Usuario}</td>
        <td>{el.Mail}</td>
        <td>{AdminText}</td>
        <td>{el.Estado}</td>

        <td>
          <FontAwesomeIcon
            icon={faEdit}
            style={{ cursor: "pointer" }}
            color="#28a745"
          />
        </td>

        <td>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ cursor: "pointer" }}
            color="#dc3545"
          />
        </td>
      </tr>
    );
  }

  render() {
    // console.log(userOnline[0]); // funciona con el 0,
    //el numero de array hay que vincularlo con la id del usuario, ej [0] con id:1
    let allUsers = this.state.datosUsuario.map(el => this.userColumn(el));
    return (
      <div>
        <Header buscador={false} />
        <div>
          <div className="tabla">
            <Row>
              <Col>
                <h3 className="titulo">Lista de Usuarios</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Usuario</th>
                      <th>Mail</th>
                      <th>Tipo</th>
                      <th>Estado</th>

                      <th>Editar</th>
                      <th>Borrar</th>
                    </tr>
                  </thead>
                  <tbody>{allUsers}</tbody>
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

export default connect(mapStateToProps)(UserPanel);