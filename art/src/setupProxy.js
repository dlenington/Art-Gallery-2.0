const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("https://us-central1-art-app-32060.cloudfunctions.net/api", {
      target: "http://localhost:5000/"
    })
  );
};
