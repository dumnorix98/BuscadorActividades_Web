import React, { Component } from "react";
import { Button, Row, Col, Table } from "reactstrap";

import Header from "../Header/Header";

import { Redirect } from "react-router-dom";
import { API } from "../../config/Config";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./CategoryPanel.css";

class CategoryPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editUser: false,
      newUser: false,
      event: "",
      datosCategorias: [],
      datosGruposCategorias: []
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
    fetch(API + "/categorias/VerCategorias", {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify(usuari)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          datosCategorias: res.data
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));

    console.log(userToken + "userToken");
    fetch(API + "/categorias/VerGruposCategorias", {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify(usuari)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          datosGruposCategorias: res.data
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  grupoCategoriaColumn(el) {
    return (
      <tr key={el.id}>
        <td>{el.id}</td>
        <td>{el.Nombre}</td>
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

  categoriasColumn(el) {
    return (
      <tr key={el.id}>
        <td>{el.id}</td>
        <td>{el.Nombre}</td>



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

  renderGruposCategorias() {
    if (!this.state.datosGruposCategorias) {
      return <h3>Datos Cargando</h3>
    } else {
      let allgruposCategorias = this.state.datosGruposCategorias.map(el => this.grupoCategoriaColumn(el));
      return allgruposCategorias;
    }
  }

  renderCategorias() {
    if (!this.state.datosCategorias) {
      return <h3>Datos Cargando</h3>
    } else {
      let allCategorias = this.state.datosCategorias.map(el => this.categoriasColumn(el));
      return allCategorias;
    }
  }

  render() {
    let categorias = this.renderCategorias();
    let grupos = this.renderGruposCategorias();
    // console.log(userOnline[0]); // funciona con el 0,
    //el numero de array hay que vincularlo con la id del usuario, ej [0] con id:1
    
    

    return (
      <div>
        <Header buscador={false} />

        <div>
          <div className="tabla">
            <Row>
              <Col>
                <h3 className="titulo">Grupos de categorias</h3>
              </Col>
              <Col>
                <Button
                  className="float-right"
                  size="sm"
                  color="primary"
                  onClick={this.newEvent}
                >
                  Nuevo grupo de categoria
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Grupos de categorias</th>
                      <th>Editar</th>
                      <th>Borrar</th>
                    </tr>
                  </thead>
                  <tbody>{grupos}</tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col>
                <h3 className="titulo">Lista de categorias</h3>
              </Col>
              <Col>
                <Button
                  className="float-right"
                  size="sm"
                  color="primary"
                  onClick={this.newEvent}
                >
                  Nueva Categoria
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>categoria</th>
                      <th>Editar</th>
                      <th>Borrar</th>
                    </tr>
                  </thead>
                  <tbody>{categorias}</tbody>
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

export default connect(mapStateToProps)(CategoryPanel);