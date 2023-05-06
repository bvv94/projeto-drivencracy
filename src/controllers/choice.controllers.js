import { ObjectId } from "mongodb"
import { db } from "../database/database.config.js"

export async function createChoices(req, res) {
    const { title, pollId } = req.body

    try {
        //Verifica se Enquete existe e se está expirada
        const poll = await db.collection("polls").findOne({ _id: new ObjectId(pollId)})
        if (!poll) return res.status(404).send("Enquente Inexistente!")

        const expired = await db.collection("polls").findOne({ _id: new ObjectId(pollId), expireAt: { $gt: new Date() } })
        if (!expired) return res.status(403).send("Enquente Expirada!")

        const exist = await db.collection("choices").findOne({ title })
        if (exist) return res.sendStatus(409)

        const choiceId = new ObjectId()
        const choice = { _id: choiceId, title, pollId }

        await db.collection("choices").insertOne(choice)

        res.status(201).send(choice)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function vote(req, res) {
    const { id } = req.params //choiceId
    
    try {
        const exist = await db.collection("choices").findOne({ _id: new ObjectId(id) })
        if (!exist) return res.status(404).send("Opção Inexistente!")

        const expired = await db.collection("polls").findOne({ _id: new ObjectId(exist.pollId), expireAt: { $gt: new Date() } })
        if (!expired) return res.status(403).send("Enquente Expirada!")

        const vote = {
            createdAt: new Date(),
            choiceId: id //choiceId
        }

        await db.collection("votes").insertOne(vote)

        res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}