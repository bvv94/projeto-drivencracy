import { Router } from "express"
import pollRouter from "./poll.routes.js"
import choiceRouter from "./choice.routes.js"

const router = Router()

router.use(choiceRouter)
router.use(pollRouter)

export default router