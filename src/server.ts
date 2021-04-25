import { http } from "./http";
import "./websocket/client";


const port = 3000

http.listen(port, () => 
    console.log(`SERVER ON ${port}`)
)

