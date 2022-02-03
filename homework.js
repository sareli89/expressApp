const express = require('express')
const fs = require('fs')
const fsPromise = require('fs/promises')

const app = express()

app.get('/', (request, response) => {
  response.send('Hola desde mi primer API')
})


// con callbacks
app.get('/file', (request, response) => {
  fs.readFile('hola.txt', (error, data) => {
    if (error) {
      response.send('NO SE PUDO LEER :c')
      return
    }

    response.send(data)
  })
})

// con promesas (then/catch)
app.get('/file-promise', (request, response) => {
  fsPromise.readFile('hola.txt', 'utf8')
    .then((data) => {
      response.send(data)
    })
    .catch((error) => {
      response.send('NO SE PUDO LEER :c')
    })
})

// con promesas (async/await)
app.get('/file-async', async (request, response) => {
  const data = await fsPromise.readFile('hola.txt', 'utf8')
  response.send(data)
})

app.listen(8080, () => {
  console.log('Server is listening')
})

// Hacer un endpoint que al llamarlo nos regrese el contenido de un archivo text.txt
// GET /file