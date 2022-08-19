import path from "path";
import fs from "fs";
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function userHandler(req, res) {
  const houseId = parseInt(req?.query?.houseId);
  const method = req?.method;
  const jsonFile = path.resolve("./", "bids.json");

  async function getBidsData() {
    const readFileData = await readFile(jsonFile);
    return JSON.parse(readFileData).bids;
  }

  switch (method) {
    case "GET":
      try {
        await delay(1000);
        const bids = await getBidsData();
        const filteredBids = bids.filter((rec) => rec.houseId === houseId);
        if (!bids)
          res.status(404).send("Error: Request failed with status code 404");

        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(filteredBids, null, 2));

        console.log(`GET /api/bids/${houseId} status: 200`);
      } catch {
        console.log("/api/bids error:", e);
      }

      break;
    case "POST":
      try {
        await delay(1000);
        const recordFromBody = req?.body;
        const bids = await getBidsData();
        recordFromBody.id = Math.max(...bids.map((b) => b.id)) + 1;
        const newBidsArray = [...bids, recordFromBody];
        writeFile(
          jsonFile,
          JSON.stringify(
            {
              bids: newBidsArray,
            },
            null,
            2
          )
        );
        res.status(200).json(recordFromBody);
        console.log(`POST /api/bids/${houseId} status: 200`);
      } catch (e) {
        console.log("/api/bids POST error:", e);
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
