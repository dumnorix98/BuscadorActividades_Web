import React, { Component } from "react";
import { Form, FormGroup, Col, Label, Input, Button, Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { API } from "../../config/Config";
import Header from "../Header/Header";
import MapContainer from "../MapContainer/MapContainer";

import axios from 'axios';
import "./CreateEvent.css";
class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      telefono: "",
      price: "",
      email: "",
      link: "",
      fechaInicio: "",
      fechaFin: "",
      selectedFile: false
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.test = this.test.bind(this);
  }

  test() {
    console.log("hola");
    console.log(this.state.locations);
  }
  inputName = event => {
    this.setState({ name: event.target.value });
  };

  inputDescription = event => {
    this.setState({ description: event.target.value });
  };

  inputEmail = event => {
    this.setState({ email: event.target.value });
  };

  inputPrice = event => {
    this.setState({ price: event.target.value });
  };

  inputTelefono = event => {
    this.setState({ telefono: event.target.value });
  };

  inputFechaFin = event => {
    this.setState({ fechaFin: event.target.value });
  };

  inputFechaInicio = event => {
    this.setState({ fechaInicio: event.target.value });
  };

  inputLink = event => {
    this.setState({ link: event.target.value });
  };

  onChangeHandler = event=>{
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  handleSumbit(event) {
    event.preventDefault();
    const data = new FormData();
    console.log(this.props.userToken);
    data.append('token', this.props.userToken);
    data.append('Nombre', this.state.name);
    data.append('Descripcion', this.state.description);
    data.append('Precio', this.state.price);
    data.append('FechaInicio', this.state.fechaInicio);
    data.append('FechaFin', this.state.fechaFin);
    data.append('Telefono', this.state.telefono);
    data.append('Mail', this.state.email);
    data.append('Link', this.state.link);
    data.append('file', this.state.selectedFile);
    axios.post(API+"/eventos/CrearEvento", data)
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props.locations + "hola");
    return (
      <div>
        <Header usuario={this.props.usuario} buscador={true} />
        <div className="container">
          <Form className="formulario" onSubmit={this.handleSumbit}>
            <FormGroup row>
              <Label for="Nombre" md="2">
                Nombre
              </Label>
              <Col md="10">
                <Input
                  type="text"
                  name="Nombre"
                  id="Nombre"
                  placeholder="Escribe el nombre del evento..."
                  onChange={this.inputName}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Descripcion" md="2">
                Descripcion
              </Label>
              <Col md="10">
                <Input
                  type="textarea"
                  name="Descripcion"
                  id="Descripcion"
                  placeholder="Escribe la descripcion del evento..."
                  onChange={this.inputDescription}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Precio" md="2">
                Precio
              </Label>
              <Col md="10">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  name="Precio"
                  id="Precio"
                  placeholder="Escribe el precio del evento..."
                  onChange={this.inputPrice}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Telefono" md="2">
                Telefono
              </Label>
              <Col md="10">
                <Input
                  type="tel"
                  name="Telefono"
                  id="Telefono"
                  placeholder="Escribe el telefono del evento..."
                  onChange={this.inputTelefono}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Email" md="2">
                Email
              </Label>
              <Col md="10">
                <Input
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Escribe el email del evento..."
                  onChange={this.inputEmail}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Link" md="2">
                Link
              </Label>
              <Col md="10">
                <Input
                  type="url"
                  name="Link"
                  id="Link"
                  placeholder="Escribe el link del evento..."
                  onChange={this.InputLink}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="FechaInicio" md="2">
                Fecha Inicio
              </Label>
              <Col md="10">
                <Input
                  type="date"
                  name="FechaInicio"
                  id="FechaInicio"
                  onChange={this.inputFechaInicio}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="FechaFin" md="2">
                Fecha Fin
              </Label>
              <Col md="10">
                <Input
                  type="date"
                  name="FechaFin"
                  id="FechaFin"
                  onChange={this.inputFechaFin}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Imagen" md="2">
                Imagen
              </Label>
              <Col md="10">
              <Input type="file" name="file" onChange={this.onChangeHandler} id="nombreFoto" />
              </Col>
            </FormGroup>
            <div className="BotonAccion">
              <Button color="primary" type="sumbit" className="button">
                Guardar
              </Button>
              <Button color="success" onClick={this.goBack}>
                Descartar
              </Button>
            </div>
          </Form>
          <Row>
            <div style={{ height: "300px", width: "100%" }}>
              <MapContainer
                longitud={2.4445}
                latitud={41.54211}
                showMarker={false}
              />
            </div>
          </Row>
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

export default connect(mapStateToProps)(CreateEvent);