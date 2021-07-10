/*
Generate Attributes
generates attributes for all 500 cassettes.
*/

class Distribution {
  constructor(events, odds) {
    this.events = events
    this.odds = odds
  }

  simulateEvent() {
    var sum = 0;
    this.odds.forEach(function(chance) {
        sum+=chance;
    });
    var rand = Math.random();
    var chance = 0;
    for(var i=0; i<this.odds.length; i++) {
        chance+=this.odds[i]/sum;
        if(rand<chance) {
            return i;
        }
    }

    // should never be reached unless sum of probabilities is less than 1
    // due to all being zero or some being negative probabilities
    return -1;
  }

  take() {
    let turn = this.simulateEvent()
    return {
      "index": turn,
      "event": this.events[turn]
    }
  }
}


let tapeComponents = [
  "screw",
  "label_small",
  "sticker_large",
  "front_canal",
  "front_top_plate",
  "front_middle_layer",
  "middle_main",
  "film_roll",
  "teeth",
  "teeth_ring",
  "film_middle_connector",
  "inner_post_left",
  "inner_post_right",
  "film_main_wiggle",
  "back_middle_layer",
  "back_canal",
  "back_top_plate"
]

// 4 capacities = 2^2 = 2 bits of information
let capacities = ["46","60","90","120"];
let capacityOdds = [50,40,17,3];

// 8 colors = 2^3 = 3 bits of information
// 17 components = 3 * 17 = 51 bits to store color -- would be nice to have 16 to make a clean uint48
let colors = ["red", "orange", "yellow", "green", "blue", "purple", "white", "black"];
let colorOdds = [3, 4, 20, 4, 2];

// 4 qualities = 2^2 = 2 bits of information
let qualities = ["low", "medium", "high", "ultra"];
let qualityOdds = [3, 4, 20, 1];

let capacityDitribution = new Distribution(capacities, capacityOdds)
let colorDistribution = new Distribution(colors, colorOdds);
let qualityDistribution = new Distribution(qualities, qualityOdds);

const main = () => {
    let attributeList = [];
    let amountOfTapes = 50;

    for (let i = 0; i < amountOfTapes; i++) {
      let capacity = capacityDitribution.take().event;
      let quality = qualityDistribution.take().event;

      let componentMap = {}
      let binary = "";
      for (let j = 0; j < tapeComponents.length; j++) {
        let choice = colorDistribution.take();
        componentMap[tapeComponents[j]] = choice.event;
        binary += (choice.index >>> 0).toString(2);
      }

      attributeList.push({"capacity": capacity, "quality": quality, "colors": componentMap, "colorBin": binary})
    }

    saveFrontendFiles({attributes: attributeList})
}


function saveFrontendFiles(attributes) {
    const fs = require("fs");

    fs.writeFileSync(
        __dirname + "/att.json",
      JSON.stringify(attributes, undefined, 2)
    );
}

main();
