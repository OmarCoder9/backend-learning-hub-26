import { NextFunction, Request, Response } from "express";

export const validateMicrobus = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method !== "POST" && req.method !== "PUT") {
    return next();
  }

  if (req.method === "POST") {
    const { driverName, route, farePerSeat, seatsAvailable } = req.body;

    if (typeof driverName !== "string" || driverName.trim() === "") {
      return res.status(400).send("driverName is required");
    }
    if (typeof route !== "string" || route.trim() === "") {
      return res.status(400).send("route is required");
    }
    if (
      typeof farePerSeat !== "number" ||
      Number.isNaN(farePerSeat) ||
      farePerSeat < 0
    ) {
      return res.status(400).send("farePerSeat must be a non-negative number");
    }
    if (
      typeof seatsAvailable !== "number" ||
      Number.isNaN(seatsAvailable) ||
      seatsAvailable < 0
    ) {
      return res
        .status(400)
        .send("seatsAvailable must be a non-negative number");
    }

    return next();
  }

  const hasAnyField = [
    "driverName",
    "route",
    "farePerSeat",
    "seatsAvailable",
  ].some((field) => Object.prototype.hasOwnProperty.call(req.body, field));

  if (!hasAnyField) {
    return res.status(400).send("At least one field is required for update");
  }

  if (
    req.body.driverName !== undefined &&
    (typeof req.body.driverName !== "string" ||
      req.body.driverName.trim() === "")
  ) {
    return res.status(400).send("driverName must be a non-empty string");
  }
  if (
    req.body.route !== undefined &&
    (typeof req.body.route !== "string" || req.body.route.trim() === "")
  ) {
    return res.status(400).send("route must be a non-empty string");
  }
  if (
    req.body.farePerSeat !== undefined &&
    (typeof req.body.farePerSeat !== "number" ||
      Number.isNaN(req.body.farePerSeat) ||
      req.body.farePerSeat < 0)
  ) {
    return res.status(400).send("farePerSeat must be a non-negative number");
  }
  if (
    req.body.seatsAvailable !== undefined &&
    (typeof req.body.seatsAvailable !== "number" ||
      Number.isNaN(req.body.seatsAvailable) ||
      req.body.seatsAvailable < 0)
  ) {
    return res.status(400).send("seatsAvailable must be a non-negative number");
  }

  next();
};
