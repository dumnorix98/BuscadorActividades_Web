import React, { Component } from "react";

import {
  Container,
  Col,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { API } from "../../config/Config";

import Registro from "../registro/Registro";
import Login from "../Login/Login";
import UserLoggedButton from "../UserLoggedButton/UserLoggedButton";
import Buscador from "../Buscador/Buscador";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ColapsarBarraInicio: false,
      Token: "",
      Logged: "",
      Usuario: [],
      Mounted: false,
      userLogged: false
    };
    this.ColapsarBarraInicio = this.ColapsarBarraInicio.bind(this);
    this.TextIfUserIsLoggedOrNot = this.TextIfUserIsLoggedOrNot.bind(this);
    this.RenderBuscador = this.RenderBuscador.bind(this);
  }

  ColapsarBarraInicio() {
    this.setState({
      ColapsarBarraInicio: !this.state.ColapsarBarraInicio
    });
  }

  componentDidMount() {
    this.CheckIfUserIsLoged();
  }

  CheckIfUserIsLoged() {
    let vuserToken = this.props.userToken;

    let usuari = {
      token: vuserToken
    };

    let Result;
    let DatosUsuario;
    fetch(API + "/usuarios/ComprobateLogged", {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify(usuari)
    })
      .then(res => res.json())
      .then(res => {
        Result = res.ok;
        DatosUsuario = res.data;
        this.setState({
          Logged: Result,
          Usuario: DatosUsuario,
          Mounted: true
        });
      })
      .catch(err => console.log(err));
    //comparar si el usuario está en la BDD
  }

  TextIfUserIsLoggedOrNot() {
    let TemporalVar;
    if (this.state.Logged) {
      TemporalVar = <UserLoggedButton Usuario={this.state.Usuario} />;
    } else {
      TemporalVar = (
        <>
          <NavItem>
            <Registro Texto="Registrate" />
          </NavItem>
          <NavItem>
            <Login Texto="Entra" />
          </NavItem>
        </>
      );
    }
    return TemporalVar;
  }
  RenderBuscador() {
    let TemporalVar;
    if (this.props.buscador) {
      TemporalVar = <Buscador updateSearch= {this.props.updateSearch} />;
    } else {
      TemporalVar = <> </>;
    }
    return TemporalVar;
  }

  render() {
    console.log(this.state.Mounted);
    if (!this.state.Mounted) {
      return <h3>Comprobando token...</h3>;
    }
    if (this.props.userToken && !this.state.Logged) {
      this.CheckIfUserIsLoged();
    }

    let Usuario = this.TextIfUserIsLoggedOrNot();
    let Buscador = this.RenderBuscador();

    return (
      <Container fluid>
        <Row>
          <Col md="12" className="fonsnav">
            <Navbar color="faded" light expand="md">
              <Link className="CaixaLogo" to={"/"}>
                <div className="Logo">
                  <div className="gat">
                  </div>
                </div>
              </Link>
              <NavbarToggler onClick={this.ColapsarBarraInicio} />
              <Collapse isOpen={this.state.ColapsarBarraInicio} navbar>
                {Buscador}
                <Nav className="ml-auto" navbar>
                  {Usuario}
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    userToken: state.usuario
  };
};

export default connect(mapStateToProps)(Header);
