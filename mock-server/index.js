let express = require('express')
let request = require('request')
let cors = require('cors')

/**
 * Cassette Mock API Endpoints
 *
 * - /tapes - lists all tapes
 * - /tape/:id - get a single tape
 *  node iex shell?
 */

let app = express()
app.use(cors())

const rand = (n) => { return Math.floor(Math.random() * n) }
const randColor = () => { return colors[rand(colors.length)] }
const randColorMap = () => {
  const componentlist = Object.keys(components);
  const map = {};
  componentlist.forEach((component) => { map[component] = randColor() })
  return map;
}

// arbitrary colors to test with
const colors = [
  "#1CDAA7",
  "#FF9F43",
  "#EF5777",
  "#E2543D",
  "##5F28CD",
  "#08BDE3",
  "#F367E0",
  "#DCE26B"
]

 const components = {
  "screw": "#03045e",
  "label_small": "#023e8a",
  "sticker_large": "#0077b6",
  "front_canal": "#0096c7",
  "front_top_plate": "#00b4d8",
  "front_middle_layer": "#48cae4",
  "middle_main": "#90e0ef",
  "film_roll": "#ade8f4",
  "teeth": "#F367E0",
  "teeth_ring": "#caf0f8",
  "film_middle_connector": "#023e8a",
  "inner_post_left": "#ade8f4",
  "inner_post_right": "#48cae4",
  "film_main_wiggle": "#023e8a",
  "back_middle_layer": "#48cae4",
  "back_canal": "#ade8f4",
  "back_top_plate": "#0077b6"
}

const attributes = {

}

const songInterface = {
  id: "4vF5CLuFgNo6o3Rt2FrNoA",
  name: "Bad Boys Running Wild",
  uri: "spotify:track:6UWWzTU1NgKf7vHbOeO17p",
  artists: "Scintillante"
}

const songInterface2 = {
  id: "null",
  name: "The Zoo",
  uri: "spotify:track:0YpmF3aZXOIuyi8itZbpkp",
  artists: "Scorpions"
}

const createTapes = (amt) => {
  let tapes = [];
  for (let i = 0; i < amt; i++) {
    tapes.push(createTape(i))
  }

  return tapes;
}

const createTape = (i) => {
  const tape = {
    id: i,
    owner: "0x0",
    name: `Classic ${i}`,
    price: 1.2,
    bids: [],
    colorMap: randColorMap(),
    attributes: attributes,
    songs: [songInterface, songInterface2]
  }

  return tape
}

let tapes = createTapes(12);


app.get('/tapes', function (req, res) {
  res.status(200).send({
    tapes: tapes
  })
})

app.get('/tape/:id', (req, res) => {
  id = req.params.id; // <- not really using this for mocking
  let tape = tapes[id];
  res.status(200).send(tape)
})


let port = 1234
console.log(`Listening on port ${port}.`)
app.listen(port)