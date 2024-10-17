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
    /**
        * Busca e retorna uma lista de clientes do banco de dados.
        * @returns Um array de objetos do tipo `Cliente` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
        * 
        * - A função realiza uma consulta SQL para obter todos os registros da tabela "cliente".
        * - Os dados retornados são utilizados para instanciar objetos da classe `Cliente`.
        * - Cada cliente instanciado é adicionado a uma lista que será retornada ao final da execução.
        * - Se houver uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
        */
    static async listagemClientes(): Promise<Array<Cliente> | null> {
        const listaDeClientes: Array<Cliente> = [];

        try {
            const querySelectCliente = `SELECT * FROM cliente`;
            const respostaBD = await database.query(querySelectCliente);

            respostaBD.rows.forEach((linha) => {
                const novoCliente = new Cliente(
                    linha.nome,
                    linha.cpf,
                    linha.telefone
                );

                novoCliente.setIdCliente(linha.id_cliente);

                listaDeClientes.push(novoCliente);
            });

            return listaDeClientes;
        } catch (error) {
            console.log('Erro ao buscar lista de carros');
            return null;
        }
    }
}