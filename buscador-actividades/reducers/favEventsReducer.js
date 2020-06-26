import { favEventsConstants } from "../constants";

export function favEvents(state = {}, action) {
  switch (action.type) {
    case favEventsConstants.GET_USER_FAV_EVENTS:
      return {
        items: action.events
      };

    case favEventsConstants.DELETE_USER_FAV_EVENT:
      return {
        items: state.items.filter(events => events.id !== action.id)
      };
    default:
      return state;
  }
}
