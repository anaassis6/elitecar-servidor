import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que represeta um Pedido de Venda
 */
export class PedidoVenda {

    /* Atributos */
    /* Id do pedido */
    private idPedido: number = 0;
    /* Id do carro */
    private idCarro: number = 0;
    /* Id do cliente */
    private idCliente: number = 0;
    /* Data do pedido */
    private dataPedido: Date;
    /* Valor do pedido */
    private valorPedido: number;

    /**
     * Construtor da Classe PedidoVenda
     * 
     * @param idCarro Identificador do carro
     * @param idCliente Identificador do cliente
     * @param dataPedido Data do pedido
     * @param valorPedido Valor do pedido
     */

    constructor(
        idCarro: number,
        idCliente: number,
        dataPedido: Date,
        valorPedido: number
    ) {
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do pedido
     * @returns o identificador do pedido
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Atribui um valor ao identificador do pedido
     * @param idPedido novo identificado do pedido
     */
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }
    /**
     * Recupera o Id do carro
     * @returns o identificador do carro
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Atribui um valor ao identificador do carro
     * @param idCarro novo identificado do carro
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Retorna o Id do cliente
     * 
     * @returns {number} Id do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * * Atribui um valor ao identificador do cliente
     * @param idCliente - O id do cliente a ser definido.
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna a data do pedido
     * 
     * @returns {Date} data do pedido.
     */
    public getDataPedido(): Date {
        return this.dataPedido;
    }

    /**
     * Define a data do pedido
     * 
     * @param dataPedido -  Data do pedido a ser definido.
     */
    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    /**
     * Retorna o valor do pedido
     * 
     * @returns {number} valor do pedido
     */
    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
        * Busca e retorna uma lista de pedidos de venda do banco de dados.
        * @returns Um array de objetos do tipo `PedidoVenda` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
        * 
        * - A função realiza uma consulta SQL para obter todos os registros da tabela "pedido_venda".
        * - Os dados retornados são utilizados para instanciar objetos da classe `PedidoVenda`.
        * - Cada pedido de venda instanciado é adicionado a uma lista que será retornada ao final da execução.
        * - Caso ocorra uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
        */
    static async listagemPedidos(): Promise<Array<PedidoVenda> | null> {
        const listaDePedidos: Array<PedidoVenda> = [];

        try {
            const querySelectPedidos = `SELECT * FROM pedido_venda;`;
            const respostaBD = await database.query(querySelectPedidos);

            respostaBD.rows.forEach((linha) => {
                const novoPedidoVenda = new PedidoVenda(
                    linha.id_carro,
                    linha.id_cliente,
                    linha.data_pedido,
                    parseFloat(linha.valor_pedido)
                );

                novoPedidoVenda.setIdPedido(linha.id_pedido);

                listaDePedidos.push(novoPedidoVenda);
            });

            return listaDePedidos;
        } catch (error) {
            console.log('Erro ao buscar lista de pedidos');
            return null;
        }
    }
}