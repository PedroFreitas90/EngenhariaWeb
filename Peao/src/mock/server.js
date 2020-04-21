import { Server, Model } from "miragejs";

const createMockServer = () => {
  new Server({
    models: {
    crosswalk: Model,
    },
    routes() {
      this.get("/crosswalks", (db) => {
        return db.crosswalks.all();
      });

    },
    seeds(server) {
      server.schema.crosswalks.create({
        title: "Casa da Música",
        latitude: 41.1589,
        longitude: -8.6307,
      });
      server.schema.crosswalks.create({
        title: "Torre de Belém",
        latitude: 38.6916,
        longitude: -9.216,
      });
      server.schema.crosswalks.create({
        title: "Cabo da Roca",
        latitude: 38.7804,
        longitude: -9.4989,
      });
    },
  });
};

export default createMockServer;
