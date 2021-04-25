import { getCustomRepository, Repository } from "typeorm";
import { Settings } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";
interface ISettingsCreate {
    chat: boolean;
    username: string
 }

class SettingsServices { 

    private settingsRepository: Repository<Settings>;

    constructor () {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async store ({ chat, username}: ISettingsCreate) { 

        const userAlreadyExists = await this.settingsRepository.findOne({
            username
         })

         if(userAlreadyExists) { 
             throw new Error("User already exists!")
         }
        
        const settings = this.settingsRepository.create({
            chat,
            username
        })

        await this.settingsRepository.save(settings);

        return settings
    }

    async findByUserName(username: string){
        const settings = await this.settingsRepository.findOne({
            username
        })  
        return settings
    }

}

export { SettingsServices }