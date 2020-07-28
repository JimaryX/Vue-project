import { State } from "./state";

export default {
  // remote
  // setting: (state: State) => state.setting, // local now

  // local
  width: (state: State) => state.width,
  sidebar: (state: State) => state.sidebar,
  sidebarRight: (state: State) => state.sidebarRight,

  // cache data

};
