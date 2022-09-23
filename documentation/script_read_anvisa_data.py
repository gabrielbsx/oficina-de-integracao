import csv

if __name__ == '__main__':
  with open('documentation/DADOS_ABERTOS_MEDICAMENTOS.csv', 'r', newline='', encoding='latin-1') as medicines:
    medicines_csv = csv.DictReader(medicines, delimiter=';', quotechar='\n')

    # row['NOME_PRODUTO']
    # row['TIPO_PRODUTO']
    # row['DATA_FINALIZACAO_PROCESSO']
    # row['CATEGORIA_REGULATORIA']
    # row['NUMERO_REGISTRO_PRODUTO']
    # row['DATA_VENCIMENTO_REGISTRO']
    # row['NUMERO_PROCESSO']
    # row['CLASSE_TERAPEUTICA']
    # row['EMPRESA_DETENTORA_REGISTRO']
    # row['SITUACAO_REGISTRO']
    # row['PRINCIPIO_ATIVO']

    nome_length = 0

    for index, row in enumerate(medicines_csv):
      print(row['NOME_PRODUTO'])
