import storage, { StorageKeys } from "./clientStorage";
import { Commit } from "vuex";
import { State } from "./state";

export default {
  setState(ctx: { commit: Commit; state: State }, value: State) {
    ctx.commit("setState", value);

    // if (value.setting) {
    //   storage.set(StorageKeys.setting, value.setting);
    // }
  },
  logOut(ctx: { commit: Commit; state: State }, value: State) {
    Object.keys(StorageKeys).forEach(t => storage.remove(t));
    console.log("logout");
  }
};
