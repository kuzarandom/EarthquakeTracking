import type { NextApiRequest, NextApiResponse } from 'next'
import { Message, SMTPClient } from 'emailjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const email = typeof req.body?.email === 'string' ? req.body.email : ''
    const from = process.env.mail
    const password = process.env.password

    if (!email || !from || !password) {
        res.status(400).json({ message: 'Error' })
        return
    }

    const client = new SMTPClient({
        user: from,
        password,
        host: 'smtp.gmail.com',
        ssl: true,
    })

    try {
        await client.sendAsync(
            new Message({
                text: 'Just for testing purpose',
                from,
                to: email,
                subject: 'testing emailjs',
            })
        )
    } catch {
        res.status(400).json({ message: 'Error' })
        return
    }

    res.status(200).json({ message: 'Send Mail' })
}