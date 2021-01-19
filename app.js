const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


var admin = require("firebase-admin");
var serviceAccount = require("./seviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const database = admin.firestore()

app.post('/add', async (req, res) => {
    try {
        let user = await database.collection('user').doc().set({
            name: req.body.name,
            club: req.body.club
        })
        res.json(user)

    } catch (error) {
        console.log('errrror', error);
    }
})

app.get('/add', async (req, res) => {
    try {
        let user = await database.collection('user').get()
        let obj = user.docs.map(u => u.data())
        res.json(obj)

    } catch (error) {
        console.log('errror', error);

    }
})

app.put('/add/:id', async (req, res) => {
    try {
        let user = await database.collection('user').doc(req.params.id).update({
            name: req.body.name,
            club: req.body.club
        })
        res.json(user)
    } catch (error) {
        console.log(error);
    }
})

app.delete('/remove/:id', async (req, res) => {
    try {
        let user = await database.collection('user').doc(req.params.id).delete()
        res.json(user)
    } catch (error) {
        console.log(error);
    }
})

app.get('/query', async (req, res) => {
    try {
        const { name, club } = req.query

        let user = await database.collection('user').where("name", "==", name).where("club", "==", club).get()
        let ob = await user.docs.map(u => u.data())
        console.log("oiiiiiii", ob);
        res.json(ob)

    } catch (error) {
        console.log(error);
    }
})


app.listen(3000, () => {
    console.log('server started on port 3000');
})


