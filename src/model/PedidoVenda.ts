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
     * Define o valor do pedido
     * 
     * @param valorPedido - Valor do pedido
     */
    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }

    //MÉTODO PARA ACESSAR BANCO DE DADOS
    static async listarPedidosVenda(): Promise<Array<PedidoVenda> | null> {

        let listaDePedidoVenda: Array<PedidoVenda> = [];

        try {

            const querySelectPedidoVenda = `SELECT * FROM pedido_venda`;

            const respostaBD = await database.query(querySelectPedidoVenda);

            respostaBD.rows.forEach((pedido_venda) => {
                let novoPedidoVenda = new PedidoVenda(
                    pedido_venda.id_carro,
                    pedido_venda.id_cliente,
                    pedido_venda.data_pedido,
                    pedido_venda.valor_pedido,
                );

                novoPedidoVenda.setIdPedido(pedido_venda.id_pedido);

                listaDePedidoVenda.push(novoPedidoVenda);

            });    
            //Retornando a lista para quem chamou
            return listaDePedidoVenda;


        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }
}   
