import { Router } from "express";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { createNewBooking, getBooking, updateBooking } from "@/controllers/booking-controller";
import { bookingIdSchema, roomIdSchema } from "@/schemas/booking-schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", createNewBooking)
  .put("/:bookingId", validateBody(roomIdSchema), validateParams(bookingIdSchema), updateBooking);

export { bookingRouter };
