import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionRepository";

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsServices {
    
    private connectionsRepository: Repository<Connection>;

    constructor () {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }
    
    async store ( { socket_id, user_id, admin_id, id }: IConnectionCreate) {
        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionsRepository.save(connection);
        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepository.findOne({
            user_id
        })
        return connection;
    }
   
    async findAllWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null},
            relations: ["user"],
        })
        return connections;
    }

    async findBySocketId(socket_id: string) {
        const connection = await this.connectionsRepository.findOne({
            socket_id
        })
        return connection;
    }
}

export { ConnectionsServices }