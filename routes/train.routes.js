import express from "express";
import client from "../client/vendoClient.js";

// Documentation for db-vendo-client:
// https://github.com/public-transport/db-vendo-client

// documentation for db-vendo-client requests:
// https://github.com/public-transport/db-vendo-client/blob/main/docs/api.md

const router = express.Router();

router.get("/getStations/:query", async (req, res) => {
  try {
    const { query } = req.params;

    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid query parameter" });
    }

    console.log("Fetching stations for query:", query);

    const locations = await client.locations(query, { results: 10 });

    // Nur Bahnhöfe, keine Bushaltestellen
    const stations = locations.filter((loc) => loc.type === "station");

    res.status(200).json({
      amount: stations.length,
      message: "Stations fetched successfully",
      stations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/arrivals/:stationId", async (req, res) => {
  try {
    const { stationId } = req.params;

    const arrivals = await client.arrivals(stationId);
    res.status(200).json({
      message: "Train data fetched successfully",
      data: { arrivals },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/departures/:stationId", async (req, res) => {
  try {
    const { stationId } = req.params;

    const departures = await client.departures(stationId);
    res.status(200).json({
      message: "Train data fetched successfully",
      data: { departures },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
