import { Router } from "express";

const nurseRouter = Router();

// Preencher questionário -> Setar o risco automaticamente -> criar appointments automaticamente se der vermelho ou laranja
nurseRouter.post("/query-mh-risk");

export default nurseRouter;
