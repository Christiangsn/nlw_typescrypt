import { io } from "../http";
import { ConnectionsServices } from "../services/ConnectionServices";


io.on("connect", async (socket) => { 
    const connectionService = new ConnectionsServices();

    const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);


})
