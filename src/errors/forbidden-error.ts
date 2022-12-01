import { ApplicationError } from "@/protocols";

export function forbiddenError(): ApplicationError {
  return {
    name: "ForbiddenError",
    message: "You dont have permission to acess on this server",
  };
}
