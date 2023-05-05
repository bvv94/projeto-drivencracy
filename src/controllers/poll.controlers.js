import { ObjectId } from "mongodb"
import { db } from "../database/database.config.js"

export async function createPoll(req, res) {

    const { title, expireAt } = req.body

    try {
        const poll = {
            title: title,
            expireAt: expireAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }

        await db.collection("polls").insertOne(poll)
        res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getPoll(req, res) {
    try {
        const polls = await db.collection("polls").find().toArray()
        res.send(polls)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function pollChoice(req, res) {
    const { id } = req.params
    console.log(id)
    try {
        const choices = await db.collection("choices").find({ pollId: id }).toArray()
        if (!choices) return res.status(404).send("Enquete Inexistente!")

        res.send(choices)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function pollResult(req, res) {
    try {

    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
