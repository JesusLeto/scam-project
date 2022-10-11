import SongsService from "../Services/SongsService.js";

class SongsController {
    async getSongs(req, res, next) {
        if (!req.query.phase) res.send({error: "Not phase"})
        try {
            const r = await SongsService.getRecommendSongs(req.query.phase)
            res.send({text: r})
            next()
        } catch (e) {
            res.send({error: e.message})
        }
    }
}

export default new SongsController()
