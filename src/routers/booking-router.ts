import { Router } from "express";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { createNewBooking, getBooking, updateUserBooking } from "@/controllers/booking-controller";
import { bookingIdSchema, roomIdSchema } from "@/schemas/booking-schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", createNewBooking)
  .put("/:bookingId", validateParams(bookingIdSchema), validateBody(roomIdSchema), updateUserBooking );

export { bookingRouter };
