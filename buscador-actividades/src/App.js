import React from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import appReducer from "../reducers/appReducer";

import Home from "./components/Home/Home";
import EventItem from "./components/EventItem/EventItem";
import Profile from "./components/Profile/Profile";
import ListEvents from "./components/ListEvents/ListEvents";
import ListFavoriteEvents from "./components/ListFavoriteEvents/ListFavoriteEvents";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import EditEvents from "./components/EditarEventos/EditEvents";

const store = createStore(appReducer);

let grupoCategorias = [
  { Id: 1, GrupoCategorias: "Deportes" },
  { Id: 2, GrupoCategorias: "Ciencia" },
  { Id: 3, GrupoCategorias: "Danza" },
  { Id: 4, GrupoCategorias: "Tecnología" },
  { Id: 5, GrupoCategorias: "Gastronomía" },
  { Id: 6, GrupoCategorias: "Movimentos sociales" }
];

let Categorias = [
  { Id: 1, Nombre: "Taichi", GrupoCategorias: "Deportes" },
  { Id: 2, Nombre: "Bicicleta", GrupoCategorias: "Deportes" },
  { Id: 3, Nombre: "Física", GrupoCategorias: "Ciencia" },
  { Id: 4, Nombre: "Pedagogía", GrupoCategorias: "Ciencia" },
  { Id: 5, Nombre: "Country", GrupoCategorias: "Danza" },
  { Id: 6, Nombre: "Salsa", GrupoCategorias: "Danza" },
  { Id: 7, Nombre: "Videojuegos", GrupoCategorias: "Tecnología" },
  { Id: 8, Nombre: "Butifarrada", GrupoCategorias: "Gastronomía" },
  { Id: 9, Nombre: "Calçotada", GrupoCategorias: "Gastronomía" },
  { Id: 10, Nombre: "Feminismo", GrupoCategorias: "Movimentos sociales" },
  { Id: 11, Nombre: "Ecología", GrupoCategorias: "Movimentos sociales" }
];

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home />
            )}
          />
          <Route
            exact
            path="/eventos/:iditem"
            component={props => (
              <EventItem {...props} />
            )}
          />
          <Route
            exact
            path="/perfil_Usuario"
            component={props => <Profile
              categorias={Categorias} grupoCategorias={grupoCategorias} {...props} />}
          />
          <Route
            exact
            path="/listar_eventos"
            component={props => <ListFavoriteEvents {...props} />}
          />
          <Route
            exact
            path="/crear_eventos"
            component={props => <CreateEvent {...props} />}
          />
          <Route
            exact
            path="/lista_eventos"
            component={props => (
              <ListEvents {...props} />
            )}
          />
          <Route
            exact
            path="/:idevent/edit_events"
            component={props => (
              <EditEvents {...props} />
            )}
          />
          <Route
            exact
            path="/admin_panel"
            component={props => (
              <AdminPanel {...props} />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);
