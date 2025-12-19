import { cyborg } from "./cyborg.js";

async function setup() {
  const collection = await cyborg.createCollection("patients");

  await collection.add([
    {
      id: "p1",
      text: "Patient John, age 45, has diabetes and hypertension."
    },
    {
      id: "p2",
      text: "Patient Mary, age 30, diagnosed with anemia."
    },
    {
      id: "p3",
      text: "Patient Alex, age 60, heart disease, on beta blockers."
    }
  ]);

  console.log("✅ CyborgDB collection created with dummy data");
}

setup();
