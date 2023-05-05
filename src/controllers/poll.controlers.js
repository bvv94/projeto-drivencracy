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
    try {

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
