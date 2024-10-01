import { Request, Response, Router } from "express";

//criando um roteador
const router = Router();

//criando uma rota principal para a aplicação
router.get("/", (req: Request, res:Response) => {
    res.json({ mensagem: "Olá mundo!"});
});

//exportando as rotas
export {router};