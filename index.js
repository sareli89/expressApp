// const { response } = require('express')
const express = require('express')
const fs = require('fs/promises')
const app = express()
app.use(express.json() )

// app.get('/', (request, response ) => {
//     response.send('Hola mundo')
// }) 

// app.get('/file-async', async (request, response) => {
//     const data = await fs.readFile('hola.txt', 'utf8')
//     response.send(data)
//   })

app.get('/koders', async(request, response) => {
    const data = await fs.readFile('kodemia.json', 'utf8')
    // response.send(data)
    const db = JSON.parse(data)
    let kodersFound = db.koders

    // if (request.query.max_age) {
    //     kodersFound = kodersFound.filter( (koder) => {
    //         return koder.age <=  request.query.max_age
    //     })
    // }

    response.json(db.koders)
})



// ruta dinamicas que acepten rutas parciales ej. GET /koders/sara
// app.get('/koders/:name', async(request, response) => {
//     const name = request.params.name
//     const data = await fs.readFile('kodemia.json', 'utf8')
//     const dataBase = JSON.parse(data)

//     const koderFound = dataBase.koders.find( (koder) => {
//         return koder.name.toLowerCase() === name.toLowerCase() //normalizacion
//     })

//     response.json(koderFound)
// })



// app.get('/koders/sex/:sex', async(request,response) => {
//     const sex = request.params.sex
//     const data = await fs.readFile('kodemia.json', 'utf8')
//     const db = JSON.parse(data)

//     const koderSex = db.koders.filter( (koder) => {
//         return koder.sex.toLowerCase() === sex.toLowerCase()
//     })

//     response.json(koderSex)
// })

// app.get('/koders/id/:id', async(request,response) => {
//     const id = request.params.id
//     const data = await fs.readFile('kodemia.json', 'utf8')
//     const db = JSON.parse(data)

//     const koderID = db.koders.find( (koder) => {
//         return koder.id.toString() === id.toString()
//     })

//     response.json(koderID)
// })  

app.get('/koders/:id', async(request,response) => {
    const id = parseInt(request.params.id)
    const data = await fs.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)

    const koderID2 = db.koders.find( (koder) => {
        return koder.id === id
    })

    response.json(koderID2)
})

// Crear un koder
app.post('/koders', async(request, response) => {
    // response.json(request.body)
    const data = await fs.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)

    const newKoderId =  db.koders.length + 1
    const newKoderData = { 
        id: newKoderId,
        ... request.body
    }
    db.koders.push(newKoderData)

    const dbAsString = JSON.stringify(db, '\n', 2)
    await fs.writeFile('kodemia.json', dbAsString, 'utf8')

    response.json(db.koders)
})

app.delete('/koders/:id', async(request, response) => {
    const id = parseInt(request.params.id)
    const data = await fs.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)

    const newKodersArray = db.koders.filter( (koder) => id != koder.id)
    db.koders = newKodersArray

    const dbAsString = JSON.stringify(db, '\n', 2)
    await fs.writeFile('kodemia.json', dbAsString, 'utf8')

    response.json(db.koders)
})

app.patch('/koders/:id', async(request, response) => {
    const id = parseInt(request.params.id)
    const data = await fs.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)

    if (isNaN(id)) {
        response
        .status(400)
        .json( {
            message: 'id must be a number'
        })
        return
    }


    const koderFoundIndex = db.koders.findIndex( (koder) =>  id === koder.id)

    if ( koderFoundIndex < 0 ) {
        response.status(404)
        response.json({
            message: 'Koder not found'
        })
        return
    }

    db.koders[koderFoundIndex] = {
        ... db.koders[koderFoundIndex],
        ... request.body,
    }

    const dbAsString = JSON.stringify(db, '\n', 2)
    await fs.writeFile('kodemia.json', dbAsString, 'utf8')

    response.json(db.koders[koderFoundIndex])
        
})


// homework - mentors
app.get('/mentors', async( request, response ) => {
    const data = await fs.readFile('kodemia.json', 'utf-8')
    const db = JSON.parse(data)
    let findingMentors = db.mentors
    

    response.json(db.mentors)
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
app.get('/mentors/:name', async( request, response ) => {
    const name = request.params.name
    const data = await fs.readFile('kodemia.json', 'utf8' )
    const db = JSON.parse(data)

    const mentorFound = db.mentors.find( (mentor) =>{
        return mentor.name.toLowerCase() === name.toLowerCase()
    })

    response.json( mentorFound )
})
app.post('/mentors', async( request, response ) => {
    const data = await fs.readFile('kodemia.json', 'utf-8')
    const db = JSON.parse(data)

    const newMentorID = db.mentors.length + 1
    const newMentorData = {
        id : newMentorID,
        ... request.body
    }
    db.mentors.push(newMentorData)

    const dbString = JSON.stringify(db, '\n', 2)
    await fs.writeFile('kodemia.json', dbString, 'utf-8')

    response.json(db.mentors)
})

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

app.listen(8080, () => {
    console.log('Server is listening')
})

// Hacer un endpoint que al llamarlo nos regrese el contenido de un archivo text.txt
// GET /file

