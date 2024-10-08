import { Request, Response, Router } from "express";
import CarroController from "./controller/CarroController";
import ClienteController from "./controller/ClienteController";
import PedidoVendaController from "./controller/PedidoVendaController";

//criando um roteador
const router = Router();

//criando uma rota principal para a aplicação
router.get("/", (req: Request, res:Response) => {
    res.json({ mensagem: "Olá mundo!"});
});

router.get("/carros", CarroController.todos);

router.get("/clientes", ClienteController.todos);

router.get("/pedidos", PedidoVendaController.todos);

//exportando as rotas
export {router};