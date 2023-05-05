import { ObjectId } from "mongodb"
import { db } from "../database/database.config.js"

export async function createChoices(req, res) {
    const { title, pollId } = req.body

    try {
        const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId) })
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

export async function vote(req, res) {
    const { id } = req.params
    console.log(id)
    try {
        const exist = await db.collection("choices").findOne({ _id: new ObjectId(id) })
        if(!exist) return res.status(404).send("Opção Inexistente!")

        const vote = {
            createdAt: new Date(),
            choiceId: id
        }

        db.collection("votes").insertOne(vote)

        res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}