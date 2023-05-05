import { ObjectId } from "mongodb"
import { db } from "../database/database.config.js"

export async function createChoices(req, res) {
    const { title, pollId } = req.body
    console.log(req.body)
    try {
        const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) })
        console.log(poll)
        if (!poll) return res.status(404).send("Enquente Inexistente!")

        const exist = await db.collection("choices").findOne({ title })
        if (exist) return res.sendStatus(409)

        //Falta FILTRO DA DATA EXPIRADA

        const choiceId = new ObjectId()
        const choice = { _id: choiceId, title, pollId }

        await db.collection("choices").insertOne(choice)

        res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}