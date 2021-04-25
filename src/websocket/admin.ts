import { io } from "../http";
import { ConnectionsServices } from "../services/ConnectionServices";
import { MessagesServices } from "../services/MessagesServices";


io.on("connect", async (socket) => { 
    const connectionService = new ConnectionsServices();
    const messagesServices = new MessagesServices();

    const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    socket.on("admin_list_messages_by_user", async (params, cb) => {
        const { user_id } = params
        
        const allMessages = await messagesServices.messageByUser(user_id);
        cb(allMessages)
    })

    socket.on("admin_send_message", async (params) => {
        const { user_id, text } = params;

        await messagesServices.store({
            text,
            user_id,
            admin_id: socket.id
        });

        const connection = await connectionService.findByUserId(user_id)
    })


})
