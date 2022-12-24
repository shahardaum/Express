import express from "express";
import log from "@ajar/marker";
import morgan from "morgan";

const { PORT, HOST } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Hello Express!");
});

app.get("/users", (req, res) => {
  res.status(200).send("Get all Users");
});

// Middle
app.use(morgan("dev"));

app.get("/search", (req, res, next) => {
  //When path /search show json of the query string URL

  res.status(200).json(req.query);
});

app.get("/body", (req, res, next) => {
  let data = "shahar";
  const markup = `<h1>The Body Req Task</h1>
  <p1>This is an example for body markup</p1>
  <ul>
  <li>Suprised</li>
  <li>Amazed!</li>
  <li>${data}</li>
  </ul>
  `;
  // res.status(200).set("Content-Type", "text/html").send(markup);
  res.status(200).set("Content-Type", "application/json").send(markup);
});

app.get("/expiriences/:expirienceID", (req, res) => {
  res
    .status(200)
    .send(`<h1>Expirience ID of the user is : ${req.params.expirienceID}`);
});

app.get("/expiriences/:expirienceID/details", (req, res) => {
  res.status(200).send(`<h1>Expirience Body:${req.body?.shahar}`);
});
// app.get("/user/:id", (req, res) => {
//   res.status(200).send("GET");
// });

// app.get("/user/:id/:transition", (req, res) => {
//   res.status(200).send(`Hello this is a page with unique id`);
// });
// app.get("/cards", (req, res) => {
//   console.log(req.query.name);
//   res.send("Response send to client::" + req.query?.name);
// });
// app.post("/profile", (req, res) => {
//   res.status(200).json(req.body);
// });
// app.post("/user/profile", (req, res) => {
//   res.status(200).urlencoded(req.body);
// });
// app.post("/", (req, res) => {
//   res.status(200);
// });
app.use("*", (req, res, next) => {
  res.status(404).send("Page isnt found!!!!!");
});

app.listen(PORT, HOST, () => {
  log.magenta(`🌎  listening on`, `http://${HOST}:${PORT}`);
});

//------------------------------------------
//         Express Echo Server
//------------------------------------------
/* challenge instructions

     - install another middleware - morgan
        configuring app middleware like so:
        app.use( morgan('dev') );

    -  define more routing functions that use

        - req.query - access the querystring part of the request url
        - req.params - access dynamic parts of the url
        - req.body - access the request body of a POST request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

    - return api json response
    - return html markup response

    - return 404 status with a custom response to unsupported routes


*/
