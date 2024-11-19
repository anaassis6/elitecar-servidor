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
        this.idCliente = idCliente;
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
            console.log('Erro ao buscar lista de clientes');
            return null;
        }
    }

    /**
      * Realiza o cadastro de um cliente no banco de dados.
      * 
      * Esta função recebe um objeto do tipo `Cliente` e insere seus dados (marca, modelo, ano e cor)
      * na tabela `cliente` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
      * foi realizado com sucesso.
      * 
      * @param {Cliente} cliente - Objeto contendo os dados do cliente que será cadastrado. O objeto `Cliente`
      *                        deve conter os métodos `getNome()`, `getCpf()` e `getTelefone()`
      *                        que retornam os respectivos valores do cliente.
      * @returns {Promise<boolean>} - Retorna `true` se o cliente foi cadastrado com sucesso e `false` caso contrário.
      *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
      * 
      * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
      *                   no console junto com os detalhes do erro.
    */
    static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            // query para fazer insert de um cliente no banco de dados
            const queryInsertCliente = `INSERT INTO cliente (nome, cpf, telefone)
                                            VALUES
                                            ('${cliente.getNome()}', 
                                            '${cliente.getCpf()}', 
                                            '${cliente.getTelefone()}')
                                            RETURNING id_cliente;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCliente);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso! ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
    /**
     * Remove um cliente do banco de dados com base no ID fornecido.
     * 
     * Esta função executa uma query `DELETE` para excluir um cliente da tabela `cliente` no banco de dados.
     * Retorna `true` se a remoção for bem-sucedida (linhas afetadas) ou `false` caso contrário.
     * 
     * @param {number} idCliente - ID do cliente a ser removido.
     * @returns {Promise<boolean>} - Retorna `true` se o cliente foi removido com sucesso, `false` caso contrário.
     * 
     * @throws {Error} - Caso ocorra um erro na execução da query, ele será logado no console.
     */
    static async removerCliente(idCliente: number): Promise<boolean> {
        try {
            // Query para deletar o cliente pelo ID
            const queryDeleteCliente = `DELETE FROM cliente WHERE id_cliente = ${idCliente}`;

            // Executa a query no banco de dados e armazena a resposta
            const respostaBD = await database.query(queryDeleteCliente);

            // Verifica se alguma linha foi afetada pela query (cliente encontrado e removido)
            if (respostaBD.rowCount != 0) {
                // Exibe mensagem de sucesso no console
                console.log(`Cliente removido com sucesso! ID removido: ${idCliente}`);
                return true; // Retorna `true` para indicar sucesso
            }

            // Retorna `false` se nenhuma linha foi afetada (cliente não encontrado)
            return false;
        } catch (error) {
            // Exibe uma mensagem de erro caso ocorra uma exceção
            console.log(`Erro ao remover cliente. Verifique os logs para mais detalhes`);
            // Loga o erro no console para depuração
            console.log(error);
            return false; // Retorna `false` para indicar falha na operação
        }
    }

    /**
     * Atualiza os dados de um cliente no banco de dados.
     * 
     * Esta função executa uma query `UPDATE` para atualizar os dados do cliente na tabela `cliente`.
     * Retorna `true` se a atualização for bem-sucedida (linhas afetadas) ou `false` caso contrário.
     * 
     * @param {Cliente} cliente - Objeto contendo os dados do cliente a serem atualizados.
     * @returns {Promise<boolean>} - Retorna `true` se o cliente foi atualizado com sucesso, `false` caso contrário.
     * 
     * @throws {Error} - Caso ocorra um erro na execução da query, ele será logado no console.
     */
    static async atualizarCliente(cliente: Cliente): Promise<boolean> {
        try {
            // Query para atualizar os dados do cliente no banco de dados
            const queryUpdateCliente = `UPDATE cliente SET
                                        nome = '${cliente.getNome()}',
                                        cpf = '${cliente.getCpf()}',
                                        telefone = '${cliente.getTelefone()}'
                                        WHERE id_cliente = ${cliente.getIdCliente()};`;

            // Executa a query no banco de dados e armazena a resposta
            const respostaBD = await database.query(queryUpdateCliente);

            // Verifica se alguma linha foi alterada pela query (atualização bem-sucedida)
            if (respostaBD.rowCount != 0) {
                // Exibe uma mensagem de sucesso no console indicando que o cliente foi atualizado
                console.log(`Cliente atualizado com sucesso! ID: ${cliente.getIdCliente()}`);
                return true; // Retorna `true` para indicar sucesso na atualização
            }

            // Retorna `false` se nenhuma linha foi alterada (atualização não realizada)
            return false;
        } catch (error) {
            // Exibe uma mensagem de erro no console caso ocorra uma exceção
            console.log('Erro ao atualizar o cliente. Verifique os logs para mais detalhes.');
            // Loga o erro no console para depuração
            console.log(error);
            return false; // Retorna `false` para indicar falha na operação
        }
    }


}