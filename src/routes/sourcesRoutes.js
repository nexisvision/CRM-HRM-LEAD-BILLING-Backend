import express from "express";
import { createSources, deleteSources, updateSources, getAllSources } from "../controllers/sourcesControllers/index.js";

const router = express.Router();

router.post("/", createSources.validator, createSources.handler);
router.delete("/:id", deleteSources.validator, deleteSources.handler);
router.put("/:id", updateSources.validator, updateSources.handler);
router.get("/", getAllSources.validator, getAllSources.handler);
export default router;
