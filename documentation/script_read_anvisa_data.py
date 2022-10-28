import csv
import sqlite3

if __name__ == '__main__':
  with open('DADOS_ABERTOS_MEDICAMENTOS.csv', 'r', newline='', encoding='latin-1') as medicines:
    medicines_csv = csv.DictReader(medicines, delimiter=';', quotechar='\n')
    nome_length = 0
    for index, row in enumerate(medicines_csv):
      print(row['NOME_PRODUTO'], row['EMPRESA_DETENTORA_REGISTRO'])
      sqlite_path = '../backend/tmp/db.sqlite3'
      sqlite_connection = sqlite3.connect(sqlite_path)
      query = 'INSERT INTO medicamentos (id, nome, farmaceutica) VALUES (NULL, ?, ?)'
      sqlite_connection.execute(query, (row['NOME_PRODUTO'], row['EMPRESA_DETENTORA_REGISTRO']))
      sqlite_connection.commit()
    sqlite_connection.close()
      