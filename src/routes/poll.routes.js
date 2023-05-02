import { Router } from "express"
import { createPoll, getPoll, pollChoice, pollResult } from "../controllers/poll.controlers.js"

const pollRouter = Router()

pollRouter.post("/poll", createPoll)
pollRouter.get("/poll", getPoll)
pollRouter.get("/poll/:id/choice", pollChoice)
pollRouter.get("/poll/:id/result", pollResult)

export default pollRouter;