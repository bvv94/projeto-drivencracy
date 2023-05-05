import { Router } from "express"
import validateSchema from "../middlewares/validadeSchemas.middlewares.js"
import {choiceSchema} from "../schemas/choice.schema.js"
import { createChoices, vote } from "../controllers/choice.controllers.js"

const choiceRouter = Router()

choiceRouter.post("/choice", validateSchema(choiceSchema), createChoices)
choiceRouter.post("/choice/:id/vote", vote)

export default choiceRouter;