import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="section footer-classic context-dark">
        <Container fluid>
          <Row className="MarginFromItems">
            <Col md="6">
              <div>
                <Link to={"/"}>
                  ApropMeu

                    <div className="gat"> </div>

                </Link>
                <p>
                  {/* ApropMeu es una aplicacion web con la finalidad de conectar a las personas con los diversos eventos en su zona. */}
                  Encuentra tus eventos favoritos cerca de ti con ApropMeu
                </p>
                {/* Rights*/}
                <p className="rights">
                  <span>©  </span>
                  <span className="copyright-year">2019</span>
                  <span> </span>
                  <span>ApropMeu</span>
                  <span>. </span>
                  <span>Todos los derechos reservados.</span>
                </p>
              </div>
            </Col>
            <Col md="6">
              <h5>Contacts</h5>
              <dl className="contact-list">
                <dt>Direccion:</dt>
                <dd>
                  Carrer Balançó i Boter, 22, Ático, 2ª, 08302 plt, Barcelona
                </dd>
              </dl>
              <dl className="contact-list">
                <dt>Email:</dt>
                <dd>
                  <a href="mailto:#">contact@apropmeu.com</a>
                </dd>
              </dl>
              <dl className="contact-list">
                <dt>Telefono:</dt>
                <dd>
                  <a href="tel:#">+34 937 57 67 07</a>
                </dd>
              </dl>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <a className="social-inner" href="#">
                <FontAwesomeIcon icon={faFacebook} />
                <span>Facebook</span>
              </a>
            </Col>
            <Col md="4">
              <a className="social-inner" href="#">
                <FontAwesomeIcon icon={faInstagram} />
                <span>Instagram</span>
              </a>
            </Col>
            <Col md="4">
              <a className="social-inner" href="#">
                <FontAwesomeIcon icon={faTwitter} />
                <span>Twitter</span>
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
