import express from "express";
import {
  listContactsAll,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  patchdateContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  patchSchema,
} from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidObjectId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", listContactsAll);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(patchSchema),
  patchdateContact,
);

export default contactsRouter;