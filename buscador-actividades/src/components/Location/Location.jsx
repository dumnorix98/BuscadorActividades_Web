import React, { Component } from "react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";
import "./Location.css";
export default class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownList: false,
      locationText: "",
      WasClicked: false
    };
    this.openList = this.openList.bind(this);
    this.updatelocationText = this.updatelocationText.bind(this);
    this.clickLocation = this.clickLocation.bind(this);
    this.clickEditLocation = this.clickEditLocation.bind(this);

  }
  openList() {
    this.setState({
      dropdownList: !this.state.dropdownList
    });
  }
  updatelocationText(event) {
    this.setState({
      locationText: event.target.value
    });
  }

  clickLocation(event) {
    this.setState({
      locationText: event.target.innerHTML,
    }, () => {
      this.afterSetStateFinished();
    });
  }
  afterSetStateFinished() {
    this.setState({
      WasClicked: !this.state.WasClicked
    });
  }

  clickEditLocation() {
    this.setState({
      WasClicked: !this.state.WasClicked
    });
  }


  render() {

    let Locations = ubicacionesCAT.filter(el => el.Ubicacion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .indexOf(this.state.locationText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1)
      .map(el => <DropdownItem onClick={this.clickLocation} key={el.Id}>{el.Ubicacion}</DropdownItem>);
    /* 
    normalize() to NFD Unicode normal form decomposes combined graphemes into the combination of simple ones. 
    The è of Crème ends up expressed as e + ̀.
    Using a regex character class to match the U+0300 → U+036F range,
     it is now trivial to globally get rid of the diacritics, 
     which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
     */
    let isEditModeOn = this.state.WasClicked;
    const isLocationTextEmpty = this.state.locationText === "";

    return (
      <div>
        {isEditModeOn
          ? <Dropdown className="Invisible" isOpen={this.state.dropdownList} toggle={this.openList}>
            <DropdownToggle>
              <Input className="Visible" type="text" value={this.state.locationText} onChange={this.updatelocationText} />
            </DropdownToggle>
            <DropdownMenu className="Visible"
              modifiers={{
                setMaxHeight: {
                  enabled: true,
                  order: 890,
                  fn: (data) => {
                    return {
                      ...data,
                      styles: {
                        ...data.styles,
                        overflow: 'auto',
                        maxHeight: 100,
                      },
                    };
                  },
                },
              }}
            >
              {Locations}
            </DropdownMenu>
          </Dropdown>

          : <div>
            {isLocationTextEmpty
              ? <p className="clickableText" onClick={this.clickEditLocation}>Elige una localización</p>
              : <p className="clickableText" onClick={this.clickEditLocation}>{this.state.locationText}</p>
            }
          </div>

        }
      </div >
    );
  }
}

let ubicacionesCAT = [
  {
    Id: 1,
    Ubicacion: "Rubí"
  },
  {
    Id: 2,
    Ubicacion: "Cerdanyola"
  },
  {
    Id: 3,
    Ubicacion: "Molins de Rei"
  },
  {
    Id: 4,
    Ubicacion: "Sant Quirze del Vallès"
  },
  {
    Id: 5,
    Ubicacion: "Barberà del Vallès"
  },
  {
    Id: 6,
    Ubicacion: "Sant Andreu de la Barca"
  },
  {
    Id: 7,
    Ubicacion: "Sant Vicenç dels Horts"
  }, {
    Id: 8,
    Ubicacion: "Ripollet"
  },
  {
    Id: 9,
    Ubicacion: "Sant Just Desvern"
  },
  {
    Id: 10,
    Ubicacion: "Sant Feliu de LLobregat"
  },
  {
    Id: 11,
    Ubicacion: "Sabadell"
  },
  {
    Id: 12,
    Ubicacion: "La Moncada"
  },
  {
    Id: 13,
    Ubicacion: "Moncada i Reixac"
  },
  {
    Id: 14,
    Ubicacion: "La Palma del Cervelló"
  },
  {
    Id: 15,
    Ubicacion: "Sant Joan Despí"
  },
  {
    Id: 16,
    Ubicacion: "Cornellà"
  },
  {
    Id: 17,
    Ubicacion: "Esplugues de LLobregat"
  },
  {
    Id: 18,
    Ubicacion: "Martorell"
  },
  {
    Id: 19,
    Ubicacion: "La Llagosta"
  },
  {
    Id: 20,
    Ubicacion: "Barcelona"
  },
  {
    Id: 21,
    Ubicacion: "Sant Boi de Llobregat"
  },
  {
    Id: 22,
    Ubicacion: "Santa Perpètua de Mogoda"
  },
  {
    Id: 23,
    Ubicacion: "Sant Adrià de Besòs"
  },
  {
    Id: 24,
    Ubicacion: "Terrassa"
  },
  {
    Id: 25,
    Ubicacion: "Santa Coloma de Gramenet"
  },
  {
    Id: 26,
    Ubicacion: "L' Hospitalet de Llobregat"
  },
  {
    Id: 27,
    Ubicacion: "Badalona"
  },
  {
    Id: 28,
    Ubicacion: "Mollet del Vallès"
  },
  {
    Id: 29,
    Ubicacion: "Viladecans"
  },
  {
    Id: 30,
    Ubicacion: "Palau-solità i Plegamans"
  },
  {
    Id: 31,
    Ubicacion: "Gavà"
  },
  {
    Id: 32,
    Ubicacion: "Montornès del Vallès"
  },
  {
    Id: 33,
    Ubicacion: "Castellar del Vallès"
  },
  {
    Id: 34,
    Ubicacion: "Esparreguera"
  },
  {
    Id: 35,
    Ubicacion: "Parets del Vallès"
  },
  {
    Id: 36,
    Ubicacion: "Caldes de Montbui"
  },
  {
    Id: 37,
    Ubicacion: "Castelldefels"
  },
  {
    Id: 38,
    Ubicacion: "El Masnou"
  },
  {
    Id: 39,
    Ubicacion: "Granollers"
  },
  {
    Id: 40,
    Ubicacion: "Canovelles"
  },
  {
    Id: 41,
    Ubicacion: "Premià de Mar"
  },
  {
    Id: 42,
    Ubicacion: "La Garriga"
  },
  {
    Id: 43,
    Ubicacion: "Cardedeu"
  },
  {
    Id: 44,
    Ubicacion: "Mataró"
  },
  {
    Id: 45,
    Ubicacion: "Sant Pere de Ribes"
  },
  {
    Id: 46,
    Ubicacion: "Sitges"
  },
  {
    Id: 47,
    Ubicacion: "Manresa"
  },
  {
    Id: 48,
    Ubicacion: "Vilanova del Camí"
  },
  {
    Id: 49,
    Ubicacion: "Vilanova i la Geltrú"
  },
  {
    Id: 50,
    Ubicacion: "Igualada"
  },
  {
    Id: 51,
    Ubicacion: "Arenys de Mar"
  },
  {
    Id: 52,
    Ubicacion: "Sant Celoni"
  },
  {
    Id: 53,
    Ubicacion: "Cubelles"
  },
  {
    Id: 54,
    Ubicacion: "Calafell"
  },
  {
    Id: 55,
    Ubicacion: "Calella"
  },
  {
    Id: 56,
    Ubicacion: "El Vendrell"
  },
  {
    Id: 57,
    Ubicacion: "Vic"
  },
  {
    Id: 58,
    Ubicacion: "Pineda de Mar"
  },
  {
    Id: 59,
    Ubicacion: "Malgrat de Mar"
  },
  {
    Id: 60,
    Ubicacion: "Palafolls"
  },
  {
    Id: 61,
    Ubicacion: "Manlleu"
  },
  {
    Id: 62,
    Ubicacion: "Blanes"
  },
  {
    Id: 63,
    Ubicacion: "Torredembarra"
  },
  {
    Id: 64,
    Ubicacion: "Palafolls"
  },
  {
    Id: 65,
    Ubicacion: "Manlleu"
  },
  {
    Id: 66,
    Ubicacion: "Blanes"
  },
  {
    Id: 67,
    Ubicacion: "Torredembarra"
  },
  {
    Id: 68,
    Ubicacion: "Torelló"
  },
  {
    Id: 69,
    Ubicacion: "Lloret de Mar"
  },
  {
    Id: 70,
    Ubicacion: "Valls"
  },
  {
    Id: 71,
    Ubicacion: "Berga"
  },
  {
    Id: 72,
    Ubicacion: "Montblanc"
  },
  {
    Id: 73,
    Ubicacion: "Tarragona"
  },
  {
    Id: 74,
    Ubicacion: "Tàrrega"
  },
  {
    Id: 75,
    Ubicacion: "as-Salt"
  },
  {
    Id: 76,
    Ubicacion: "Girona"
  },
  {
    Id: 77,
    Ubicacion: "Reus"
  },
  {
    Id: 78,
    Ubicacion: "Vila-seca"
  },
  {
    Id: 79,
    Ubicacion: "Sant Feliu de Guíxols"
  },
  {
    Id: 80,
    Ubicacion: "Salou"
  },
  {
    Id: 81,
    Ubicacion: "Banyoles"
  }
];