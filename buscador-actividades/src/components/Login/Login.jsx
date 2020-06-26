/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

import { withRouter } from "react-router-dom";

import { API } from "../../config/Config";
import { connect } from "react-redux";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      password: "",
      userName: ""
    };

    this.toggle = this.toggle.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  userPassword = event => {
    this.setState({ password: event.target.value });
  };

  userName = event => {
    this.setState({ userName: event.target.value });
  };

  handleSumbit(event) {
    event.preventDefault();

    let usuari = {
      Usuario: this.state.userName,
      Password: this.state.password
    };

    fetch(API + "/usuarios/login", {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify(usuari)
    })
      .then(res => res.json())
      .then(res => {
        let usuario = res.data.token;
        console.log(usuario)

        this.props.dispatch({
          type: "SET_USUARIO",
          value: usuario
        });
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
    //comparar si el usuario está en la BDD

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    return (
      <div>
        <Button className="BotonAccion" color="success" onClick={this.toggle}>
          {this.props.Texto}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Nombre de Usuario
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSumbit}>
              <FormGroup>
                <Input
                  type="text"
                  name="nombreUsuario"
                  id="nombreUsuario"
                  placeholder="Nombre Usuario"
                  value={this.state.userName}
                  onChange={this.userName}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="userPasswordLogin"
                  id="userPasswordLogin"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.userPassword}
                />
              </FormGroup>
              <ModalFooter>
                <Button color="primary" type="sumbit">
                  Entrar
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cerrar
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
