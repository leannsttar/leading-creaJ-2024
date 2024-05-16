// import express from 'express'

// const app = express()

// app.listen(3000)
// console.log(`server on port ${3000}`)

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const newUser = await prisma.users.delete({
        where: {
            email: "tick@brawl.com",

            
        }
    })
    console.log(newUser)
}

main()