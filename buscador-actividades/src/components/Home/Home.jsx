import React, { Component } from "react";

import {
  Container,
  Col,
  Row,
  FormGroup,
  Collapse,
  Navbar,
  NavbarToggler,
  Spinner,
  Button
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import ItemEventList from "../ItemEventList/ItemEventList";
import Destacats from "../Destacats/Destacats";
// import Destacados from "../Destacados/Destacados";
import Footer from "../Footer/Footer";

import Header from "../Header/Header";
import Maps from "../Maps/Maps";
import CategoryGroup from "../CategoryGroup/CategoryGroup";

import { API } from "../../config/Config";

import InfiniteScroll from "react-infinite-scroller";

import { connect } from "react-redux";

import "./Home.css";
import SimpleMap from "../Maps/Maps";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ColapsarFiltro: false,
      items: 1,
      hasMoreItems: true,
      inifniteScroll: false,
      datosCarta: [],
      cargados: false,
      datosCategorias: [],
      listaTemporal: [],
      search: ""
    };
    this.ColapsarFiltro = this.ColapsarFiltro.bind(this);
    this.OrdenarCategorias = this.OrdenarCategorias.bind(this);
    // this.CrearArticulos = this.CrearArticulos.bind(this);
    this.enableInfiniteScroll = this.enableInfiniteScroll.bind(this);
    this.CrearDestacados = this.CrearDestacados.bind(this);
    this.CrearArticulosEstado = this.CrearArticulosEstado.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(valor) {
    this.setState({ search: valor });
  }

  ColapsarFiltro() {
    this.setState(state => ({ ColapsarFiltro: !state.ColapsarFiltro }));
  }

  componentDidMount() {
    fetch(API + "/eventos/", {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          datosCarta: data.data
        });
      });
    fetch(API + "/categorias/", {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          datosCategorias: data.data,
          cargados: true
        });
      });
  }

  OrdenarCategorias() {
    let ListaTemporal = [];
    let items = this.state.datosCategorias;

    items.forEach(element => {
      let GrupoCategorias = element.GrupoCategorias;
      let repetido = false;
      let ItemRepeated = 0;
      for (let i = 0; i < ListaTemporal.length; i++) {
        if (GrupoCategorias === ListaTemporal[i].Grupo) {
          repetido = true;
          ItemRepeated = i;
        }
      }
      if (!repetido) {
        ListaTemporal.push({
          Grupo: GrupoCategorias,
          Categorias: []
        });
        ItemRepeated = ListaTemporal.length - 1;
      }
      ListaTemporal[ItemRepeated].Categorias[
        ListaTemporal[ItemRepeated].Categorias.length
      ] = { Id: element.id, Nombre: element.Nombre };
    });
    let ListaFormateada = [];
    for (let i = 0; i < ListaTemporal.length; i++) {
      ListaFormateada[ListaFormateada.length] = (
        <CategoryGroup key={i} Categorias={ListaTemporal[i]} />
        // <div key={i + "a"} className="Filtro_Grupo">
        //   {ListaTemporal[i].Grupo}
        // </div>
      );
      // for (let j = 0; j < ListaTemporal[i].Categorias.length; j++) {
      //   ListaFormateada[ListaFormateada.length] = (
      //     <div key={ListaTemporal[i].Categorias[j].Id} className="Filtro_Item">
      //       <Checkboxs
      //         type="checkbox"
      //         value={ListaTemporal[i].Categorias[j].Nombre}
      //         text={ListaTemporal[i].Categorias[j].Nombre}
      //         id={ListaTemporal[i].Categorias[j].Id.toString()}
      //       ></Checkboxs>
      //       {}
      //     </div>
      //   );
      // }
    }
    return ListaFormateada;
  }

  // CrearArticulos() {
  //   let listaTemporal = [];
  //   for (let i = 0; i < this.state.items; i++) {
  //     listaTemporal.push(
  //       <ItemEventList
  //         Titulo={this.props.eventos[i].Nombre}
  //         Asistentes={this.props.eventos[i].Asistentes}
  //         Precio={this.props.eventos[i].Precio}
  //         Descripcion={this.props.eventos[i].Descripcion}
  //         Img={this.props.eventos[i].Imagen}
  //         Id={this.props.eventos[i].Id}
  //         key={this.props.eventos[i].Id}
  //         clickableCard={true}
  //       />
  //     );
  //   }
  //   return listaTemporal;
  // }

  CrearArticulosEstado() {
    this.state.listaTemporal = [];
    //filtre de buscador d'activitats
    this.state.listaTemporal = [];
    console.log(this.state.datosCarta);
    let elements = this.state.search
      ? this.state.datosCarta.filter(
          el =>
            el.Nombre.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1
        )
      : this.state.datosCarta;

    if (this.state.cargados) {
      for (let i = 0; i < elements.length; i++) {
        this.state.listaTemporal.push(
          <ItemEventList
            Titulo={elements[i].Nombre}
            Asistentes={elements[i].Asistentes}
            Precio={elements[i].Precio}
            Descripcion={elements[i].Descripcion}
            Img={elements[i].Imagen}
            Id={elements[i].id}
            key={elements[i].id}
            clickableCard={true}
          />
        );
      }
      if (this.props.isClicked) {
        console.log(this.state.datosCarta[1].Categorias + "categorias");
        console.log(this.state.datosCarta.length + "datos carta ");
        let datosCarta = this.state.datosCarta.length;
        let i;
        if (this.state.datosCarta.Categorias !== null) {
          for (i = 1; i < datosCarta; i++) {
            console.log(this.props.checkedEvents + "checked events");
            if (this.state.datosCarta[i].Categorias !== null) {
              if (
                this.state.datosCarta[i].Categorias.includes(
                  this.props.checkedEvents
                )
              ) {
                this.state.listaTemporal = [];
                console.log("hola");
                console.log(this.state.datosCarta[i] + "hola");

                console.log("aisdjkajsd");
                console.log(this.state.datosCarta[i].Nombre + "patata");
                this.state.listaTemporal.push(
                  <ItemEventList
                    Titulo={this.state.datosCarta[i].Nombre}
                    Asistentes={this.state.datosCarta[i].Asistentes}
                    Precio={this.state.datosCarta[i].Precio}
                    Descripcion={this.state.datosCarta[i].Descripcion}
                    Img={this.state.datosCarta[i].Imagen}
                    Id={this.state.datosCarta[i].id}
                    key={this.state.datosCarta[i].id}
                    clickableCard={true}
                  />
                );
              }
            }
          }
        }
      }
      return this.state.listaTemporal;
    }
  }

  loadMore() {
    let items = this.state.items + 5;
    let maxEvents = this.state.datosCarta.length - 1;

    if (this.state.items === maxEvents) {
      this.setState({ hasMoreItems: false });
    } else if (items < maxEvents) {
      setTimeout(() => {
        this.setState({ items: items });
      }, 2000);
    } else {
      setTimeout(() => {
        this.setState({ items: maxEvents });
      }, 2000);
    }
  }

  enableInfiniteScroll() {
    this.setState({ inifniteScroll: true });
  }

  CrearDestacados() {
    let TemporalArray = [];
    for (let i = 0; i < 3; i++) {
      TemporalArray[i] = (
        <Destacats Eventos={this.state.datosCarta[i]} key={i} />
      );
    }
    return TemporalArray;
  }
  render() {
    if (
      this.state.datosCarta.length === 0 ||
      this.state.datosCategorias.length === 0
    ) {
      return <h3>datos cargando</h3>;
    }

    // let ArticulosFormateados = this.CrearArticulos();
    let ListaCategorias = this.OrdenarCategorias();
    let Destacados = this.CrearDestacados();
    if (this.state.search) Destacados = <> </>;
    let articulosEstado = this.CrearArticulosEstado();

    let showMoreItems;
    if (this.state.inifniteScroll) {
      showMoreItems = (
        <Col md="9">
          <InfiniteScroll
            loadMore={this.loadMore.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={
              <div key={0}>
                <Spinner color="primary" className="loader" />
              </div>
            }
          >
            <Row>{articulosEstado}</Row>
          </InfiniteScroll>
        </Col>
      );
    } else {
      showMoreItems = (
        <Col md="9">
          <Row>{articulosEstado}</Row>
          <div className="button">
            <Button onClick={this.enableInfiniteScroll}> Cargar más </Button>
          </div>
        </Col>
      );
    }
    // let usuario;
    // if (true) {
    //   usuario = "Cambiar En un futuro, esta hardcodeado";
    // } else {
    //   usuario = "Wally";
    // }

    return (
      <>
        <Header
          updateSearch={this.updateSearch}
          usuario={this.props.usuario}
          buscador={true}
        />
        <Container fluid>
          <Row>
            <Col md="2"></Col>
            <Col md="10">
              {" "}
              {!this.state.search ? (
                <p className="titols"> Destacats </p>
              ) : (
                <> </>
              )}
            </Col>
          </Row>
          <Row>
            <Col md="1"></Col>
            <Col md="10" className="divDestacats">
              <div className="destacats">{Destacados} </div>
            </Col>
            {/* <Col md="1"></Col> */}
          </Row>
          <Row>
            <Col md="2"></Col>
            <Col md="8">
              {" "}
              {/* { (!this.state.search) ?  <p className="titols"> On estàs, {usuario}? </p> :  <> </> }  */}
              {!this.state.search ? <Maps /> : <></>}
              {this.state.listaTemporal.length === 0 ? (
                <>
                  {" "}
                  <div className="NoResultats"> No hi ha resultats </div>{" "}
                  <div className="gatError"></div>{" "}
                </>
              ) : (
                <> </>
              )}
            </Col>
            <Col md="1"></Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col md="2">
              {" "}
              <p className="subtitols"> Buscar </p>{" "}
            </Col>
            <Col md="9">
              {" "}
              <p className="titols"> Aprop Meu </p>{" "}
            </Col>
          </Row>
          <Row>
            <Col md="2">
              {/* <FormGroup>
              <Label for="exampleCustomRange">Custom Range</Label>
                <CustomInput type="range" id="exampleCustomRange" name="customRange" />
            </FormGroup> */}
              <Navbar color="faded" light expand="md">
                <NavbarToggler onClick={this.ColapsarFiltro}>
                  <FontAwesomeIcon icon={faFilter} />
                </NavbarToggler>
                <Collapse isOpen={this.state.ColapsarFiltro} navbar>
                  <FormGroup>{ListaCategorias}</FormGroup>
                </Collapse>
              </Navbar>
            </Col>
            {showMoreItems}
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userToken: state.usuario,
    checkedEvents: state.checkedEvents,
    isClicked: state.isClicked
  };
};

export default connect(mapStateToProps)(Home);
