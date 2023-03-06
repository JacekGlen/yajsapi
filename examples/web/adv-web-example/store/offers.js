import { defineStore } from "pinia";

export const useOffersStore = defineStore({
  id: "offers-store",
  state: () => {
    return {
      offers: [],
      drawer: false,
      drawerOfferId: null,
    };
  },
  actions: {
    addOffer(offer) {
      if (offer.parentId) {
        const old = this.offers.find((item) => item.id === offer.parentId);
        Object.assign(old, offer);
      } else this.offers.push(offer);
      offer.memory = parseInt(offer.memory);
      offer.storage = parseInt(offer.storage);
      offer.cpuCores = parseInt(offer.cpuCores);
      offer.cpuThreads = parseInt(offer.cpuThreads);
      offer.time = new Date(offer.timestamp).toLocaleTimeString();
    },
    showOffer(id) {
      this.drawer = true;
      this.drawerOfferId = id;
    },
  },
  getters: {
    drawerOffer: (state) => state.offers.find((offer) => offer.id === state.drawerOfferId),
  },
});
