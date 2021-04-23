import { Router } from "express";
import testeController from "../controllers/test"

const router = Router();

router.get('/', testeController.store)