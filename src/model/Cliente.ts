import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe representa um cliente
 */
export class Cliente {

    /* Atributos */
    /* Id do cliente*/
    private idCliente: number = 0;
    /* Nome do cliente */
    private nome: string;
    /* cpf do cliente */
    private cpf: string;
    /*Telefone do cliente*/
    private telefone: string;

    /**
     * Construtor da classe Cliente
     * 
     * @param nome Nome do cliente
     * @param cpf cpf do cliente
     * @param telefone Telefone do cliente
     */

    constructor(
        nome: string,
        cpf: string,
        telefone: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    /*Método get e set */
    /**
     * Recupera o identificador do cliente
     * @returns o identificador do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atrubui um valor ao identificador do cliente
     * @param idCliente novo cliente a ser identificado
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente;
    }

    /**
     * Retorna o nome do cliente.
     *
     * @returns {string} O nome do cliente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do cliente.
     * 
     * @param nome - O nome do cliente a ser definidol.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o cpf do cliente.
     *
     * @returns {string} O cpf do cliente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o cpf do cliente
     * 
     * @param cpf - O cpf do cliente a ser definido.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o telefone do cliente
     *
     * @returns {string} Telefone do cliente
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o telefone do cliente
     * 
     * @param telefone - O telefone do cliente a ser definido.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    //MÉTODO PARA ACESSAR  O BANCO DE DADOS
    static async listarClientes(): Promise<Array<Cliente> | null>{

        let listaDeClientes: Array<Cliente> = [];

        try {

            const querySelectCliente = `SELECT * FROM cliente`;

            const respostaBD = await database.query(querySelectCliente);

            respostaBD.rows.forEach((cliente) => {
                let novoCliente = new Cliente(
                    cliente.nome,
                    cliente.cpf,
                    cliente.telefone,
                    
                );

                novoCliente.setIdCliente(cliente.id);

                listaDeClientes.push(novoCliente);

            });    
            // Retornando a lista para quem chamou a função
            return listaDeClientes;


        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

}