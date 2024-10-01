CREATE TABLE carro(
	id_carro SERIAL PRIMARY KEY,
	marca VARCHAR (50) NOT NULL,
	modelo VARCHAR(50) NOT NULL,
	ano INT,
	cor VARCHAR(20)
);

CREATE TABLE cliente(
	id_cliente SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	cpf VARCHAR (11) UNIQUE NOT NULL,
	telefone VARCHAR(16)
);

CREATE TABLE pedido_venda(
	id_pedido SERIAL PRIMARY KEY,
	id_cliente INT NOT NULL,
	id_carro INT NOT NULL,
	data_pedido DATE NOT NULL,
	valor_pedido DECIMAL(6) NOT NULL,
	FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente),
	FOREIGN KEY (id_carro) REFERENCES Carro (id_carro)
);

INSERT INTO carro (marca, modelo, ano, cor) VALUES
	('Ford', 'Fiesta', 2020, 'Preto'),
	('Volkswagen', 'Gol', 2019, 'Prata'),
	('Chevrolet', 'Onix', 2021, 'Vermelho'),
	('Hyundai', 'HB20', 2022, 'Azul'),
	('Fiat', 'Argo', 2018, 'Branco');

INSERT INTO cliente (nome, cpf, telefone) VALUES 
    ('José Henrique', '12345678901', '11-91234-5678'),
    ('Ana Luiza', '23456789012', '21-98765-4321'),
    ('Luciana Cristina', '34567890123', '31-99876-5432'),
    ('Lorena Durigan', '45678901234', '41-97654-3210'),
    ('Bruno Gomes', '56789012345', '51-96543-2109');

INSERT INTO pedido_venda (id_cliente, id_carro, data_pedido, valor_pedido) VALUES 
    (1, 2, '2024-01-15', 50000.00),
    (2, 4, '2024-02-20', 45000.00),
    (3, 5, '2024-03-10', 55000.00),
    (4, 3, '2024-04-05', 60000.00),
    (5, 1, '2024-05-12', 30000.00);

SELECT * FROM carro;
SELECT * FROM cliente;
SELECT * FROM pedido_venda;

