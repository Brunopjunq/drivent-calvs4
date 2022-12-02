import Joi from "joi";

export const roomIdSchema = Joi.object<{roomId: number}>({
  roomId: Joi.number().integer().positive().required()
});

export const bookingIdSchema = Joi.object<{bookingId: number}>({
  bookingId: Joi.number().integer().positive().required()
});
