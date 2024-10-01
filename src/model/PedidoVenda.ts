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
}   
