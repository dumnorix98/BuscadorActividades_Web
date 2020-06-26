import React, { Component } from 'react'

import { Collapse, Container, Row, Col, Button } from 'reactstrap';
import Checkboxs from "../Checkboxs/Checkboxs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default class CategoryGroup extends Component {
    constructor(props) {
        super(props);


        this.state = {
            collapsed: true
        };
        this.toggle = this.toggle.bind(this);
        this.GenerateCategoryItems = this.GenerateCategoryItems.bind(this);
        this.CheckIfCollapsed = this.CheckIfCollapsed.bind(this);
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    GenerateCategoryItems() {
        let i = 0;
        let ListaTemporal = this.props.Categorias.Categorias.map(el => <Checkboxs
            type="checkbox"
            value={el.Nombre}
            text={el.Nombre}
            id={el.Id.toString()} key={i++} />);
        return ListaTemporal;
    }
    CheckIfCollapsed() {
        let TemporalVar;
        if (this.state.collapsed) {
            TemporalVar = <FontAwesomeIcon icon={faArrowLeft} />
        }
        else {
            TemporalVar = <FontAwesomeIcon icon={faArrowDown} />
        }
        return TemporalVar;
    }
    render() {
        let ListaCategorias = this.GenerateCategoryItems();
        let Flecha = this.CheckIfCollapsed();
        return (
            <Container fluid>
                <Row>
                    <Col md="9">
                        <p>{this.props.Categorias.Grupo}</p>
                        <Collapse isOpen={!this.state.collapsed}>
                            {ListaCategorias}
                        </Collapse>
                    </Col>
                    <Col md="1" onClick={this.toggle}>
                        <Button color="secondary" size="sm" active>
                            {Flecha}
                        </Button>

                    </Col>
                </Row>
            </Container>
        );
    }
}
