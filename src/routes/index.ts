import bodyParser from "body-parser";

export = app => {
    app.user(bodyParser.json())
    app.use()
}