import express from "express";
import * as db from "../utils/db.utils";

export const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hey, this works" });
});

router.get("/rides", (req, res) => {
  res.send(db.getAllRides());
});

router.get("/rides/get/:id", (req, res) => {
  res.send(db.getOneRide(Number(req.params.id)));
});

router.post("/rides/add", (req, res) => {
  if (db.addRide(req.body)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

router.put("/rides/update", (req, res) => {
  if (db.updateRide(req.body)) {
    res.status(200);
  } else {
    res.status(400);
  }
});

router.delete("/rides/delete/:id", (req, res) => {
  if (db.deleteRide(Number(req.params.id))) {
    res.status(200);
  } else {
    res.status(400);
  }
});
