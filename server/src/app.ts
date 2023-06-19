import express from 'express'
import config from 'config'
import path from "path"
import userRoutes from "./routes/user.route"


const app = express()

app.use(express.json())
app.use("/api/users", userRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '..', '..', 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

app.listen(PORT, () => console.log (`App has been started on port ${PORT}...`))
