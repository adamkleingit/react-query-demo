const jsonServer = require("json-server");
const { isArray } = require("lodash");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setTimeout(() => next(), 1000);
});
router.render = (req, res) => {
  let response = res.locals.data;
  if (isArray(response)) {
    console.log("trimming");
    response = response.map((item) => ({
      id: item.id,
      title: item.title,
    }));
  }
  res.jsonp(response);
};
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
