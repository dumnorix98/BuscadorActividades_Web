import React, { Component } from "react";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faPhone,
  faAt,
  faLink,
  faUserAlt,
  faEuroSign,
  faTag,
  faCalendarAlt,
  faArrowRight,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faTelegram,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton
} from "react-share";
import { Link } from "react-router-dom";

import Comment from "../Comment/Comment";
import MapContainer from "../MapContainer/MapContainer";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { API } from "../../config/Config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./EventItem.css";

class EventItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datos: [],
      Texto: ""
    };
    this.FormatTags = this.FormatTags.bind(this);
    this.FormatComments = this.FormatComments.bind(this);
    this.ComprobateIfPreviousEvent = this.ComprobateIfPreviousEvent.bind(this);
    this.CompraobateIfNextEvent = this.CompraobateIfNextEvent.bind(this);
    this.HasLink = this.HasLink.bind(this);
    this.HasPhone = this.HasPhone.bind(this);
    this.HasMail = this.HasMail.bind(this);
    this.LoadData = this.LoadData.bind(this);
    this.PreviousEvent = this.PreviousEvent.bind(this);
    this.NextEvent = this.NextEvent.bind(this);
    this.inputText = this.inputText.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }
  FormatTags() {
    let TemporalArray;
    let i = 0;
    if (this.state.datos.Categorias != null) {
      TemporalArray = this.state.datos.Categorias.split(",").map(el => (
        <span key={i++}>
          <FontAwesomeIcon icon={faTag} />
          <span> {el} </span>
          <br />
        </span>
      ));
    }
    return TemporalArray;
  }
  ComprobateIfPreviousEvent(id) {
    let PreviousEvent = parseInt(id + 1);
    let TemporalItem;
    TemporalItem = (
      <Link to={"/eventos/" + PreviousEvent} onClick={this.NextEvent}>
        <Button color="success" className="Event_MoveFromEvents" onClick={this.NextEvent}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Link>
    );
    return TemporalItem;
  }

  CompraobateIfNextEvent(id) {
    let PreviousEvent = parseInt(id - 1);
    let TemporalItem;
    TemporalItem = (
      <Link to={"/eventos/" + PreviousEvent} onClick={this.PreviousEvent}>
        <Button color="success" className="Event_MoveFromEvents" onClick={this.PreviousEvent}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
      </Link>
    );
    return TemporalItem;
  }

  HasLink() {
    if (this.state.datos.Link !== "") {
      return (
        <>
          <FontAwesomeIcon icon={faLink} />
          <span itemProp="url"> {this.state.datos.Link}</span>
          <br />
        </>
      );
    } else {
      return <></>;
    }
  }
  HasPhone() {
    if (this.state.datos.Telefono !== 0) {
      console.log(this.state.datos)
      return (
        <>
          <FontAwesomeIcon icon={faPhone} />
          <span itemProp="telephone"> {this.state.datos.Telefono}</span>
          <br />
        </>
      );
    } else {
      return <></>;
    }
  }
  HasMail() {
    if (this.state.datos.Mail !== "") {
      console.log(this.state.datos.Mail)
      return (
        <>
          <FontAwesomeIcon icon={faAt} />
          <span itemProp="mail"> {this.state.datos.Mail}</span>
          <br />
        </>
      );
    } else {
      return <></>;
    }
  }
  FormatComments() {
    let TemporalArray = [];
    if (this.state.datos.Comentarios != null) {
      let ComentariosSplitted = this.state.datos.Comentarios.split(",");
      let j = -1;
      for (let i = 0; i < ComentariosSplitted.length; i = i + 3) {
        j++;
        TemporalArray[j] = (
          <Comment
            UserName={String(ComentariosSplitted[i])}
            Image={String(ComentariosSplitted[i + 1])}
            Text={String(ComentariosSplitted[i + 2])}
            key={j}
          />
        );
      }
    }
    return TemporalArray;
  }

  componentDidMount() {
    fetch(API + "/eventos/" + this.props.match.params.iditem, {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          datos: data.data
        });
      });
  }

  LoadData(idToLoad) {
    fetch(API + "/eventos/" + idToLoad, {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          datos: data.data
        });
      });
  }

  PreviousEvent() {
    let id = parseInt(this.props.match.params.iditem);
    let TemporalVar = parseInt(id - 1);
    this.LoadData(TemporalVar);
  }

  NextEvent() {
    let id = parseInt(this.props.match.params.iditem);
    let TemporalVar = parseInt(id + 1);
    this.LoadData(TemporalVar);
  }

  inputText = event => {
    this.setState({ Texto: event.target.value });
  };

  handleSumbit(event) {
    event.preventDefault();
    let vuserToken = this.props.userToken;

    let usuari = {
      token: vuserToken,
      Eventos_id: this.props.match.params.iditem,
      Texto: this.state.Texto
    };
    fetch(API + "/eventos/AddComment", {
      method: "POST",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify(usuari)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
      this.LoadData(this.props.match.params.iditem);
  }

  render() {
    if (this.state.datos.length === 0) {
      return <h3>Cargando datos...</h3>;
    }
    let id = parseInt(this.props.match.params.iditem);
    let Hastag = ["ApropMeu"];
    let TagList = this.FormatTags();
    let CommentsList = this.FormatComments();
    let PreviousEvent = this.ComprobateIfPreviousEvent(id);
    let NextEvent = this.CompraobateIfNextEvent(id);
    let Link = this.HasLink();
    let Mail = this.HasMail();
    let Phone = this.HasPhone();
    return (
      <>
        <Header usuario={this.props.usuario} buscador={true} />
        <Container fluid itemType="http://schema.org/Event">
          <Row className="RowBotons">
            <Col md="2"></Col>
            <Col md="6">
              <Button className="BotoTornar">Volver</Button>
            </Col>
            <Col md="1">
              {NextEvent}
            </Col>
            <Col md="1">
              {PreviousEvent}
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <FontAwesomeIcon icon={faUserAlt} />
              <span> {this.state.datos.Asistentes}</span>
              <br />
              <img
                itemProp="image"
                className="Event_Image"
                src={"http://localhost:3000/img/" + this.state.datos.Imagen}
                alt={this.state.datos.Nombre}
              />
              <span itemProp="organizer">{this.state.datos.Autor}</span>
            </Col>
            <Col md="6" sm="12">
              <h1 className="Event_Title" itemProp="name">
                {this.state.datos.Nombre}
              </h1>
              <p className="Event_Description" itemProp="description">
                {this.state.datos.Estado}
              </p>
              <p className="Event_Estado" itemProp="description">
                {this.state.datos.Descripcion}
              </p>
              {TagList}
              <FontAwesomeIcon icon={faEuroSign} />
              <span itemProp="price"> {this.state.datos.Precio}</span>
              <br />
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span itemProp="startDate"> {this.state.datos.FechaInicio}</span>
              <span> - </span>

              <span itemProp="endDate">{this.state.datos.FechaFin}</span>
              <br />
              {Phone}
              {Mail}
              {Link}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md="12">
              <div style={{ height: "300px", width: "100%" }}>
                <MapContainer
                  longitud={this.state.datos.Longitud}
                  latitud={this.state.datos.Latitud}
                  eventName={this.state.datos.Nombre}
                  showMarker={true}
                />
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md="9">
              <div className="Event_SocialNetwork">
                <FacebookShareButton
                  url={this.state.datos.Nombre}
                  quote={this.state.datos.Nombre}
                  hashtag={Hastag[0].toString()}
                  className="Event_SocialNetwork_ShareButton">
                  <Button color="info">
                    <FontAwesomeIcon icon={faFacebook} />
                  </Button>
                </FacebookShareButton>
              </div>
              <div className="Event_SocialNetwork">
                <LinkedinShareButton
                  url={this.state.datos.Nombre}
                  className="Event_SocialNetwork_ShareButton">
                  <Button color="info">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Button>
                </LinkedinShareButton>
              </div>
              <div className="Event_SocialNetwork">
                <TwitterShareButton
                  url={this.state.datos.Nombre}
                  title={this.state.datos.Nombre}
                  via="ApropMeu"
                  hashtags={Hastag}
                  className="Event_SocialNetwork_ShareButton">
                  <Button color="info">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                </TwitterShareButton>
              </div>
              <div className="Event_SocialNetwork">
                <TelegramShareButton
                  url={this.state.datos.Nombre}
                  title={this.state.datos.Nombre}
                  className="Event_SocialNetwork_ShareButton">
                  <Button color="info">
                    <FontAwesomeIcon icon={faTelegram} />
                  </Button>
                </TelegramShareButton>
              </div>
              <div className="Event_SocialNetwork">
                <WhatsappShareButton
                  url={this.state.datos.Nombre}
                  title={this.state.datos.Nombre}
                  separator=" "
                  className="Event_SocialNetwork_ShareButton">
                  <Button color="success">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </Button>
                </WhatsappShareButton>
              </div>
            </Col>
            <Col md="3">
              <Button color="success">
                Guardar en Favoritos
              </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md="12">
              <h2>Comentarios</h2>
            </Col>
          </Row>
          <Form onSubmit={this.handleSumbit}>
            <Row form>
              <Col md="10">
                <FormGroup>
                  <Input
                    type="Comment"
                    name="Comment"
                    id="Comment"
                    placeholder="Escribe aqui un comentario..." onChange={this.inputText}/>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup>
                  <Button color="primary" type="sumbit" className="button">Publicar</Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <hr />
          <Row>
            <Col md="12">{CommentsList}</Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    userToken: state.usuario
  };
};

export default connect(mapStateToProps)(EventItem);