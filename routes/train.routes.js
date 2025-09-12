import express from "express";
import client from "../client/vendoClient.js";

// Documentation for db-vendo-client:
// https://github.com/public-transport/db-vendo-client

// documentation for db-vendo-client requests:
// https://github.com/public-transport/db-vendo-client/blob/main/docs/api.md

const router = express.Router();

router.get("/getStations", async (req, res) => {
  try {
    console.log("fetching trains data...");
    // # Todo just show stations, not stops
    const locations = await client.locations("Hauptbahnhof", {
      results: 10,
    });

    // We don't want bus stops, just train stations
    const stations = locations.filter((loc) => loc.type === "station");

    res.status(200).json({
      amount: stations.length,
      message: "Train data fetched successfully",
      data: stations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// #todo split this into two routes: arrivals and departures, like in swagger
// https://editor.swagger.io/
router.get("/getTrains", async (req, res) => {
  try {
    // const { station } = req.query;
    const station = "8010389";
    const duration = 1;
    if (!station) {
      return res.status(400).json({ error: "Station parameter is required" });
    }

    const arrivals = await client.arrivals(station, {
      results: 2,
      duration: duration,
    });
    const departures = await client.departures(station, {
      results: 2,
      duration: duration,
    });
    res.status(200).json({
      message: "Train data fetched successfully",
      data: { arrivals, departures },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
