const appReducer = (
  state = {
    arraySearch: [],
    favEvents: [],
    usuario: "",
    checkedEvents: [],
    isClicked: false
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "ALERT_SUCCES":
      newState = "REGISTRAT";
      return newState;

    case "ALERT_FAIL":
      newState = "NO CONICIDE";
      return newState;

    case "NEW_SEARCH":
      //  return { ...state, search: action.item };
      newState.arraySearch.push(action.item);

      return newState;

    case "ADD_FAV_EVENT":
      newState.favEvents.push(action.item);
      return newState;

    case "SET_USUARIO":
      newState.usuario = action.value;
      return newState;

    case "CHECKED_EVENTS":
      newState.checkedEvents.push(action.item);
      console.log(newState.checkedEvents + "reducer");
      return newState;

    case "UNCHECKED_EVENTS":
      newState.checkedEvents.splice(action.index, 1);
      console.log(newState.checkedEvents + "vacio");
      return newState;

    case "IS_CLICKED":
      newState.isClicked = true;
      return newState;

    case "IS_UNCLICKED":
      newState.isClicked = false;
      return newState;
    default:
      return state;
  }
};

export default appReducer;
