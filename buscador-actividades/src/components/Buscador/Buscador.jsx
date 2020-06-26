import React, { Component } from "react";

import "./Buscador.css";

import { InputGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
  }

  updateSearch() {
    this.setState({ search: event.target.value });
    this.props.updateSearch(event.target.value);
    // console.log(this.state.search); //No muestra en consola el ultimo el caracter que escribo...
  }

  sendSearch() {
    // alert("Hi Person") // sendSearch se activa bien al clicar el boton
    this.props.dispatch({
      type: "NEW_SEARCH",
      item: this.state.search
    });
    // this.setState({search: ''}) // Dejar en blanco el buscador al enviar;
  }
  render() {
    return (
      <InputGroup className="Buscador">
        <Input
          className="Buscador TextoBuscador"
          type="text"
          placeholder="Escribe aqui para buscar actividades..."
          value={this.state.search}
          onChange={this.updateSearch}
        />
        <Button className="lupa">
          <FontAwesomeIcon icon={faSearch} onClick={this.sendSearch} />
        </Button>
      </InputGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    lista: state.arraySearch
  };
};

export default connect(mapStateToProps)(Buscador);

// connect(mapStateToProps) ???? No se para que sirve, estaba en el ejemplo de ricard
