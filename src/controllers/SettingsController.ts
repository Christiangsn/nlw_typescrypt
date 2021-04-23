import { Request, response, Response} from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController { 

    async store(req: Request, res: Response) {

        console.log("teste")
        const { chat, username } = req.body

        const settingRepository = getCustomRepository(SettingsRepository);
        
        const settings = settingRepository.create({
            chat,
            username
        })

        await settingRepository.save(settings);
        return response.json(settings);
    }

}

export { SettingsController }