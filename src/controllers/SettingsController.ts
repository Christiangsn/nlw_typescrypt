import { Request, response, Response} from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettingsServices } from "../services/SettingsServices";

class SettingsController { 

    async store(req: Request, res: Response) {

        const { chat, username } = req.body
        const settingsServices = new SettingsServices();

        try {

            const settings = await settingsServices.store({ chat, username })
            return res.json(settings);

        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }


       
    }

}

export { SettingsController }