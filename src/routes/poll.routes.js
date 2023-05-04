import { Router } from "express"
import { createPoll, getPoll, pollChoice, pollResult } from "../controllers/poll.controlers.js"
import { pollSchema } from "../schemas/poll.schema.js"
import validateSchema from "../middlewares/validadeSchemas.middlewares.js"

const pollRouter = Router()

pollRouter.post("/poll", validateSchema(pollSchema), createPoll)
pollRouter.get("/poll", getPoll)
pollRouter.get("/poll/:id/choice", pollChoice)
pollRouter.get("/poll/:id/result", pollResult)

export default pollRouter;