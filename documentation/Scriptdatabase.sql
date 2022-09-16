USE oficina;

CREATE TABLE tb_clientes(
	id_cliente INTEGER PRIMARY KEY auto_increment,
    nome_cliente VARCHAR(50) NOT NULL,
    email_clinte VARCHAR(50) NOT NULL,
    senha_cliente VARCHAR(100) NOT NULL,
    datanasc_cliente DATE NOT NULL,
    cpf_cliente VARCHAR(11) UNIQUE NOT NULL
);

CREATE TABLE tb_medicamentos(
	id_medicamente INTEGER PRIMARY KEY auto_increment,
    nome_medicamento VARCHAR(30) NOT NULL,
    farmaceutica_medicamentos VARCHAR(50) NOT NULL
);

CREATE TABLE tb_gerenciamento(
	id_gerenciamento INTEGER PRIMARY KEY auto_increment,
	id_cliente INTEGER NOT NULL,
    id_medicamento INTEGER NOT NULL,
    hora_gerenciamento TIME NOT NULL,
    CONSTRAINT fk_GereciamentoCliente FOREIGN KEY(id_cliente)
		REFERENCES tb_clientes(id_cliente),
	CONSTRAINT fk_GerenciamentoMedicamento FOREIGN KEY(id_medicamento)
		REFERENCES tb_medicamentos(id_medicamente)
);