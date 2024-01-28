import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (_, res) => {
  try {
    const contacts = await contactsService.listContacts();

    res.json({
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.error(error);
    res.send(HttpError(404));
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    console.log(contact);

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    res.json({
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error(error);
    res.send(HttpError(409));
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    res.json({
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error(error);
    res.send(HttpError(409));
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = createContactSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const contact = await contactsService.addContact(name, email, phone);

    res.status(201).json({
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error(error);
    res.send(HttpError(409));
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const isBodyEmpty = Object.keys(req.body).length === 0;

    if (isBodyEmpty) {
      return res
        .status(400)
        .send({ message: "Body must have at least one field" });
    }

    const { error } = updateContactSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const contact = await contactsService.updateContact(id, req.body);

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    res.json({
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error(error);
    res.send(HttpError(409));
  }
};
