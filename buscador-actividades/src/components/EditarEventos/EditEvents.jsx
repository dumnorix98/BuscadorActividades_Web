import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { API } from "../../config/Config";
import ItemEventList from "../ItemEventList/ItemEventList";
import Header from "../Header/Header";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Container
} from "reactstrap";
import axios from 'axios';
import "./EditEvents.css";

class EditEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: "",
      description: "",
      telefono: "",
      price: "",
      image: "",
      asistance: "",
      id: "",
      fechaInicio: "",
      fechaFin: "",
      mail: "",
      link: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(API + "/eventos/" + this.props.match.params.idevent, {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        this.setState({
          name: data.data.Nombre,
          description: data.data.Descripcion,
          price: data.data.Precio,
          asistance: data.data.Asistentes,
          telefono: data.data.Telefono,
          image: String(data.data.Imagen),
          id: data.data.id,
          fechaInicio: data.data.FechaInicio,
          fechaFin: data.data.FechaFin,
          mail: data.data.Mail,
          link: data.data.Link,
          selectedFile: false
        });
      });
    // let itemId = this.props.match.params.idevent;

    // let event = this.props.list.find(el => el.Id === itemId);
  }

  eventName = event => {
    this.setState({ name: event.target.value });
  };

  eventDescription = event => {
    this.setState({ description: event.target.value });
  };

  eventPrice = event => {
    this.setState({ price: event.target.value });
  };

  eventTelefono = event => {
    this.setState({ telefono: event.target.value });
  };
  
  eventfechaInicio = event => {
    this.setState({ fechaInicio: event.target.value });
  };

  eventfechaFin = event => {
    this.setState({ fechaFin: event.target.value });
  };

  eventMail = event => {
    this.setState({ mail: event.target.value });
  };

  eventLink = event => {
    this.setState({ link: event.target.value });
  };

  onChangeHandler = event=>{
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  goBack() { }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    console.log(this.props.match.params.idevent);
    data.append('token', this.props.userToken);
    data.append('id', this.props.match.params.idevent);
    data.append('Nombre', this.state.name);
    data.append('Descripcion', this.state.description);
    data.append('Precio', this.state.price);
    data.append('FechaInicio', this.state.fechaInicio);
    data.append('FechaFin', this.state.fechaFin);
    data.append('Telefono', this.state.telefono);
    data.append('Mail', this.state.mail);
    data.append('Link', this.state.link);
    data.append('file', this.state.selectedFile);
    axios.post(API + "/eventos/EditarEvento", data)
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.id === undefined) {

      return <h3>Cargando datos...</h3>;
    }
    console.log(this.state.fechaInicio)
    return (
      <div>
        <Header buscador={false} />

        <div className="container">
          <Form onSubmit={this.handleSubmit} className="formulario">
            <h3>Edición</h3>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                name="eventName"
                id="eventName"
                placeholder="Nombre del Evento"
                value={this.state.name}
                onChange={this.eventName}
              />
              <FormGroup />
              <FormGroup>
                {" "}
                <Label for="eventDescription">Descripción</Label>
                <Input
                  type="text"
                  name="eventDescription"
                  id="eventDescription"
                  placeholder="Descripción"
                  value={this.state.description}
                  onChange={this.eventDescription}
                />
              </FormGroup>
              <FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="price">Precio</Label>
                      <Input
                        type="number"
                        step="0.01"
                        name="price"
                        id="price"
                        placeholder="Precio"
                        value={this.state.price}
                        onChange={this.eventPrice}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="fechaInicio">Fecha Inicio</Label>
                      <Input
                        type="date"
                        name="fechaInicio"
                        id="fechaInicio"
                        value={this.state.fechaInicio}
                        onChange={this.eventFechaInicio}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="fechaFin">Fecha Fin</Label>
                      <Input
                        type="date"
                        name="fechaFin"
                        id="fechaFin"
                        value={this.state.fechaFin}
                        onChange={this.eventFechaFin}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label for="telefono">Telefono</Label>
                <Input
                  type="number"
                  name="Telefono"
                  id="Telefono"
                  placeholder="Telefono"
                  value={this.state.telefono}
                  onChange={this.eventTelefono}
                />
              </FormGroup>
              <FormGroup>
                <Label for="mail">mail</Label>
                <Input
                  type="email"
                  name="eventmail"
                  id="eventmail"
                  placeholder="mail"
                  value={this.state.mail}
                  onChange={this.eventMail}
                />
              </FormGroup>
              <FormGroup>
                {" "}
                <Label for="link">link</Label>
                <Input
                  type="tel"
                  name="eventlink"
                  id="eventlink"
                  placeholder="link"
                  value={this.state.link}
                  onChange={this.eventlink}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="Imagen" md="2">
                  Imagen
                </Label>
                <Col md="10">
                <Input type="file" name="file" onChange={this.onChangeHandler} id="nombreFoto" />
                </Col>
              </FormGroup>
            </FormGroup>


            <div className="BotonAccion">
              <Button color="primary" type="sumbit" className="button">
                Guardar
              </Button>
              <Button color="primary" onClick={this.goBack}>
                Descartar
              </Button>
            </div>
          </Form>
          <ItemEventList
            Titulo={this.state.name}
            Asistentes={this.state.asistance}
            Precio={this.state.price}
            Img={this.state.image}
            Key={this.state.id}
            Descripcion={this.state.description}
            clickableCard={false}
          />
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

export default connect(mapStateToProps)(EditEvents);