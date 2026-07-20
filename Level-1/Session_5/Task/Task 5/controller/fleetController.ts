import { Request, Response } from "express";
import { fleet, Microbus } from "../models/fleetData";

export const getFleet = (_req: Request, res: Response) => {
  res.status(200).json(fleet);
};

export const filterFleet = (req: Request, res: Response) => {
  const maxFare = Number(req.query.maxFare);

  if (!maxFare || Number.isNaN(maxFare)) {
    return res.status(400).send("Max Fare is missing");
  }

  const filteredFleets = fleet.filter((m) => m.farePerSeat <= maxFare);
  if (filteredFleets.length === 0) {
    return res.status(200).send("No fleets in this price range");
  }

  res.status(200).json(filteredFleets);
};

export const getFleetById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const requestedMicrobus = fleet.find((microbus) => microbus.id === id);

  if (!requestedMicrobus) {
    return res.status(404).send("Am Ashraf doesn't run that one");
  }

  res.status(200).json(requestedMicrobus);
};

export const createMicrobus = (req: Request, res: Response) => {
  const { driverName, route, farePerSeat, seatsAvailable } = req.body as {
    driverName: string;
    route: string;
    farePerSeat: number;
    seatsAvailable: number;
  };

  const microbus: Microbus = {
    id: fleet.length + 1,
    driverName,
    route,
    farePerSeat,
    seatsAvailable,
    rating: [],
  };

  fleet.push(microbus);
  res.status(201).json(microbus);
};

export const updateMicrobus = (req: Request, res: Response) => {
  const index = fleet.findIndex((m) => m.id === Number(req.params.id));
  if (index === -1) return res.status(404).send("No Microbus Found");

  const updates: Partial<Microbus> = req.body;
  fleet[index] = { ...fleet[index], ...updates } as Microbus;

  res.status(200).json(fleet[index]);
};

export const deleteMicrobus = (req: Request, res: Response) => {
  const microbusIndex = fleet.findIndex((m) => m.id === Number(req.params.id));
  if (microbusIndex === -1) {
    return res.status(404).send("there is no microbus with this ID");
  }

  fleet.splice(microbusIndex, 1);
  res.status(200).send("Microbus Deleted Successfully");
};

export const getRating = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const rater = req.query.rater;
  const raterName = typeof rater === "string" ? rater.trim() : "";

  if (!id || !raterName) {
    return res.status(400).send("Invalid ID or Missing rater name");
  }

  const microbus = fleet.find((m) => m.id === id);
  if (!microbus) {
    return res.status(404).send("Invalid ID");
  }

  const ratingEntry = microbus.rating.find(
    (entry) => Object.keys(entry)[0] === raterName,
  );
  if (!ratingEntry) {
    return res.status(200).send(`${raterName} has not rated this microbus yet`);
  }

  res.status(200).json({
    microbusId: id,
    rater: raterName,
    rating: ratingEntry[raterName],
  });
};
