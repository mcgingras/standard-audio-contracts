/*
Attributes
generates attributes for all 1000 cassettes.
*/

// 1024 = 2^10
const colors = {
    0: "yellow",
    1: "red",
    2: "blue",
    3: "green",
    4: "purple"
}

// open to changing these things for sure
const capacities = [1,2,3,5,8,13,21,34]

// certain types of quality attributes
const qualities = {
    0: "low",
    1: "medium",
    2: "high"
}

const main = () => {
    let attributeList = [];

    for (color = 0; color < Object.keys(colors).length; color++) {
        for (capacity = 0; capacity < capacities.length; capacity++) {
            for (quality = 0; quality < Object.keys(qualities).length; quality++) {
                attributeList.push([color, capacity, quality])
            }
        }
    }

    saveFrontendFiles({attributes: attributeList})
}


function saveFrontendFiles(attributes) {
    const fs = require("fs");

    fs.writeFileSync(
        __dirname + "/attributes.json",
      JSON.stringify(attributes, undefined, 2)
    );
}

main();
