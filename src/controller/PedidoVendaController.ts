import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO{
    id_carro: number,
    id_cliente: number,
    data_pedido: Date,
    valor_pedido: number
}

/**
 * A classe `PedidoVendaController` estende a classe `PedidoVenda` e é responsável por controlar as requisições relacionadas aos pedidos de venda.
 * 
 * - Como um controlador dentro de uma API REST, esta classe gerencia as operações relacionadas ao recurso "pedido de venda".
 * - Herdando de `PedidoVenda`, ela pode acessar os métodos e propriedades da classe base.
 */
export class PedidoVendaController extends PedidoVenda {

    /**
     * Lista todos os pedidos de venda.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de pedidos de venda em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de pedidos de venda.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaPedidos = await PedidoVenda.listagemPedidos();

            return res.status(200).json(listaPedidos);
        } catch (error) {
            console.log('Erro ao acessar listagem de carros');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de carros" });
        }
    }

        /**
    * Método controller para cadastrar um novo pedido.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um pedido no corpo da requisição
    * e tenta cadastrar este pedido no banco de dados utilizando a função `cadastroPedido`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do pedido no formato `PedidoDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao usuário.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao usuário.
    */
        static async novo(req: Request, res: Response): Promise<Response> {
            try {
                // recuperando informações do corpo da requisição e colocando em um objeto da interface PedidoDTO
                const pedidoRecebido: PedidoVendaDTO = req.body;
    
                // instanciando um objeto do tipo pedido com as informações recebidas
                const novoPedido = new PedidoVenda(pedidoRecebido.id_carro,
                    pedidoRecebido.id_cliente,
                    pedidoRecebido.data_pedido,
                    pedidoRecebido.valor_pedido);
    
                // Chama a função de cadastro passando o objeto como parâmetro
                const repostaClasse = await PedidoVenda.cadastroPedidoVenda(novoPedido);
    
                // verifica a resposta da função
                if (repostaClasse) {
                    // retornar uma mensagem de sucesso
                    return res.status(200).json({ mensagem: "Pedido de Venda cadastrado com sucesso!" });
                } else {
                    // retorno uma mensagem de erro
                    return res.status(400).json({ mensagem: "Erro ao cadastrar o Pedido de Venda. Entre em contato com o administrador do sistema." })
                }
    
            } catch (error) {
                // lança uma mensagem de erro no console
                console.log(`Erro ao cadastrar um Pedido de Venda. ${error}`);
    
                // retorna uma mensagem de erro há quem chamou a mensagem
                return res.status(400).json({ mensagem: "Não foi possível cadastrar o Pedido de Venda. Entre em contato com o administrador do sistema." });
            }
        }
}