import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createNewBooking, getBooking } from "@/controllers/booking-controller";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", createNewBooking);

export { bookingRouter };
