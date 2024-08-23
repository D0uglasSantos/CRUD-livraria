import express from "express";
import { getClient, addClient, updateClient, deleteClient } from "../controllers/clients.js";

const router = express.Router();

router.get("/", getClient);

router.post("/", addClient);

router.put("/:id_cliente", updateClient);

router.delete("/:id_cliente", deleteClient);

export default router;