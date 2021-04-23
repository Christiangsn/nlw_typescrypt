import express from "express";

import "./database";

const port = 3000
const app = express();

app.listen(port, () => 
    console.log(`SERVER ON ${port}`)
)

export = app