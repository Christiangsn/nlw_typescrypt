import { Router } from "express";
import { SettingsController } from "../controllers/SettingsController";
import { UsersController } from "../controllers/UsersController";


const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();

routes.post('/settings', settingsController.store);
routes.post('/users', usersController.store);

export { routes }