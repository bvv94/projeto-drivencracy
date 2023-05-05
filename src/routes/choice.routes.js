import { Router } from "express"
import validateSchema from "../middlewares/validadeSchemas.middlewares.js"
import {choiceSchema} from "../schemas/choice.schema.js"
import { createChoices } from "../controllers/choice.controllers.js"

const choiceRouter = Router()

choiceRouter.post("/choice", validateSchema(choiceSchema), createChoices)
choiceRouter.post("/choice/:id/vote")

export default choiceRouter;