import {Router} from "express";
import SongsController from "../controllers/SongsController.js"

const router = Router()

router.get("/recommend-songs", SongsController.getSongs)


export default router
