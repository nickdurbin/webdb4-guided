const express = require("express")
const helmet = require("helmet")
const db = require("./data/db-config")

const server = express()
const port = process.env.PORT || 4000

server.use(helmet())
server.use(express.json())

server.get("/api/species", async (req, res, next) => {
  try {
    // get all species from the database
    res.json(await db("species"))
  } catch(err) {
    next(err)
  }
})

server.get("/api/animals", async (req, res, next) => {
  try {
    // get all animals from the database
    // include species name
    const animals = await db("animals as a")
      .leftJoin("species as s", "s.id", "a.species_id")
      .select("a.id", "a.name as animal_name", "s.name as species_name")
    
    res.json(animals)
  } catch(err) {
    next(err)
  }
})

server.post("/api/animals", async (req, res, next) => {
  try {
    // create animal
    const [id] = await db("animals")
      .insert(req.body)
    
    const animal = await db("animals")
      .where({ id })
      .first()

    res.status(201).json(animal)
  } catch(err) {
    next(err)
  }
})


server.delete("/api/species/:id", async (req, res, next) => {
  try {
    // remove species
    const count = await db("species")
      .where({ id: req.params.id })
      .del()

    if (count > 0) {
      res.status(204).end()
    } else {
      res.status(404).json({
        message: "Species not found",
      })
    }
  } catch(err) {
    next(err)
  }
})

server.use((err, req, res, next) => {
  console.log("Error:", err)

  res.status(500).json({
    message: "Something went wrong",
  })
})

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})