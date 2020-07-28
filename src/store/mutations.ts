import { State } from "./state";

export default {
  setState(state: State, value: State) {
    Object.assign(state, value);
  }
};
