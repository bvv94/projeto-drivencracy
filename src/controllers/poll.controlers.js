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
        res.status(201).send(poll)
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
//  GET /poll/:id/choice
export async function pollChoice(req, res) {
    const { id } = req.params

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
    const { id } = req.params

    try {
        const poll = await db.collection("polls").findOne({ _id: new ObjectId(id) })
        if (!poll) return res.status(404).send("Enquete Inexistente!")

        // Pegar todos os votes pra cada choice da poll enviada

        const choice = await db.collection("choices").find({ pollId: poll._id.toString() }).toArray()
        if (!choice) return res.status(404).send("Opção de voto ñ encontrada pra essa Enquete")

        const noVotes = await db.collection("choices").find({ pollId: poll._id.toString() }).toArray()
        if (noVotes.length === 0) return res.status(404).send("Sem votos registrados")

            const allchoices = await Promise.all(choice.map(async (choice) => {
                const votes = await db
                    .collection("votes")
                    .find({ choiceId: choice._id.toString() })
                    .toArray();

                return {
                    title: choice.title,
                    votes: votes.length,
                };
            })
            )

        let winner = { title: "", votes: 0 };

        //guardar a choice com mais votos
        allchoices.forEach((choice) => {
            if (choice.votes > winner.votes) {
                winner = choice
            }
        })

        const result = {
            _id: poll._id,
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title: winner.title,
                votes: winner.votes
            },
        }

        res.send(result)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
