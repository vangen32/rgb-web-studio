import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    _selectedUser: null,
  }),
  getters: {
    selectedUser(state) {
      return state._selectedUser;
    },
  },
  actions: {
    setSelectedUser(user) {
      this._selectedUser = user;
    },
    addUserFile(fileId) {
      console.log("Call");
      if (this._selectedUser) {
        this._selectedUser.files.push(fileId);
      }
    },
  },
});
