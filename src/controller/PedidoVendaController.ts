import { Request, Response} from "express";
import {PedidoVenda} from "../model/PedidoVenda";

class PedidoVendaController extends PedidoVenda{

    /**
     * método estático chamado todos que faz parte de uma classe (provavelmente um controlador).
     *  Ele é marcado como assíncrono (async), o que significa que dentro dele podem ser usadas 
     * operações assíncronas com await
     * @param req Representa a requisição HTTP que contém informações enviadas pelo cliente.
     * @param res Representa a resposta HTTP que será enviada de volta ao cliente.
     */
    static async todos(req: Request, res: Response){
        try{
            const listaDePedidoVenda = await PedidoVenda.listarPedidosVenda();

            res.status(200).json(listaDePedidoVenda);

        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recupera as informações de pessoas.")

        }
        
    }
}

export default PedidoVendaController;