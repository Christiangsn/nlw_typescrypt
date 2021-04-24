import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
interface ISettingsCreate {
    chat: boolean;
    username: string
 }

class SettingsServices { 

    async store ({ chat, username}: ISettingsCreate) { 
        const settingRepository = getCustomRepository(SettingsRepository);

        const userAlreadyExists = await settingRepository.findOne({
            username
         })

         if(userAlreadyExists) { 
             throw new Error("User already exists!")
         }
        
        const settings = settingRepository.create({
            chat,
            username
        })

        await settingRepository.save(settings);

        return settings
    }

}

export { SettingsServices }