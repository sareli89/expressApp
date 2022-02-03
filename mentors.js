
const express = require('express')
const fs = require('fs/promises')
const app = express()
app.use( express.json() )

app.get('/mentors', async( request, response ) => {
    const data = await fs.readFile('kodemia.json', 'utf-8')
    const db = JSON.parse(data)
    let findingMentors = db.mentors
    

    response.json(db.mentors)
})

app.get('/mentors/:name', async( request, response ) => {
    const name = request.params.name
    const data = await fs.readFile('kodemia.json', 'utf8' )
    const db = JSON.parse(data)

    const mentorFound = db.mentors.find( (mentor) =>{

        return mentor.name.toLowerCase() === name.toLowerCase()
    })

    response.json( mentorFound )
})

app.listen( 8080, () => {
    console.log('Server is here')
})

app.get('/mentors/:id', async( request, response ) => {
    const id = parseInt(request.params.id)
    const data = await fs.readFile('kodemia.json', 'utf-8')
    const db = JSON.parse(data)

    const mentorID = db.mentors.find( (mentor) => {
        return mentor.id === id
    })
    response.json(mentorID)
})

// app.post('/mentors', async( request, response ) => {
//     const data = await fs.readFile('kodemia.json', 'utf-8')
//     const db = JSON.parse(data)

//     const newMentorID = db.mentors.length + 1
//     const newMentorData = {
//         id : newMentorID,
//         ... request.body
//     }
//     db.mentors.push(newMentorData)

//     const dbString = JSON.stringify(db, '\n', 2)
//     await fs.writeFile('kodemia/json', dbString, 'utf-8')

//     response.json(db.mentors)
// })

/* "id" : 1,
"name" : "Israel",
"lastName": "Salinas",
"puesto" : "Program Lead",
"mentorOf" : 
[
    "Maquetado",
    "CSS",
    "Bootstrap",
    "React"
], 
"gitub" : true,
"sex" : "m" */

app.delete('/mentors:id', async( request, response ) => {
    const id = parseInt(request.params.id)
    const data = await fs.readFile('kodemia.json', 'utf-8')
    const db = JSON.parse(data)

    const mentorsArray = db.mentors.filter( (mentor) => id != mentor.id )
    db.mentors = mentorsArray

    const dbString = JSON.stringify(db, '\n', 2)
    await fs.writeFile('kodemia.json', dbString, 'utf-8')

    response.json(db.mentors)
})