import express from "express";
import routes from './routes'

import "./database";

const port = 3000
const app = express();
routes(app)

app.listen(port, () => 
    console.log(`SERVER ON ${port}`)
)

export { app }