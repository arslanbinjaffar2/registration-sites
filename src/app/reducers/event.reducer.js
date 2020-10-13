let eventInfo = localStorage.getItem("eventInfo");
const initialState =
  eventInfo && eventInfo !== undefined ? JSON.parse(eventInfo) : {};

export function event(state = initialState, action) {
  switch (action.type) {
    case "event-info":
      if (action.event) {
        localStorage.setItem("event_id", action.event.event.id);
        localStorage.setItem("language_id", action.event.event.language_id);
        action.event.id = action.event.event.id;
        localStorage.setItem("eventInfo", JSON.stringify(action.event));
        return action.event;
      } else {
        return {};
      }
    default:
      return state;
  }
}
