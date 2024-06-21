const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

// req = request 
// res = response

const users = []

const checkUserId = (req, res, next) => {
    const { id } = req.params
    
    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return res.status(404).json({ messagem: "User not found"})
    }

    req.userIndex = index
    req.userId = id

    next()
}

app.get('/users', (req, res) => {
    
    return res.json(users)
})

app.post('/users', (req, res) => {
    const {name, age} = req.body

    const user = {id:uuid.v4(), name,age}

    users.push(user)
    return res.status(201).json(user)
})

app.put('/users/:id', checkUserId, (req, res) => {
    const { name, age } = req.body
    const index = req.userIndex
    const id = req.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return res.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (req, res) => {
    const index = req.userIndex

    users.splice(index,1)

    return res.status(204).json()
})

// app.get('/users', (req, res) => {
//     const {name, age} = req.query //Destucturing assignment //Desestruturando e critando Variaveis

//     return res.json({name, age})
// })

// app.get('/users', (request, response) => {
//     return response.send('Hello NODE e Express')
// })

app.listen(port, () => {
    console.log(`🚀 Server Started on port ${port}`)
})