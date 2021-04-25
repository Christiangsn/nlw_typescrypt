import { io } from "../http";
import { ConnectionsServices } from "../services/ConnectionServices";
import { UsersServices } from "../services/UsersServices"
import { MessagesServices } from "../services/MessagesServices";

interface Iparams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const usersServices = new UsersServices();
    const connectionService = new ConnectionsServices();
    const messagesServices = new MessagesServices();

    socket.on("client_first_access", async params => {
        const socket_id = socket.id
        const { text, email } = params as Iparams;
        let user_id = null;

        const userExists = await usersServices.findByEmail(email)
        
        if(!userExists){
            await usersServices.store(email)
            const userExists = await usersServices.findByEmail(email)

            await connectionService.store({
                socket_id,
                user_id: userExists.id
            })
            user_id = userExists.id

        } else {
            user_id = userExists.id
            const connection = await connectionService.findByUserId(userExists.id);

            if(!connection){
                await connectionService.store({
                    socket_id,
                    user_id: userExists.id
                })  
            } else {
                connection.socket_id = socket_id;
                await connectionService.store(connection);
            }
        }

        await messagesServices.store({
            text,
            user_id
        })

        const allMessages = await messagesServices.messageByUser(user_id);

        socket.emit("client_list_all_messages", allMessages)

    })
});