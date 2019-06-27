import json, requests
import pandas as pd
import openpyxl

url = 'https://novamokita.firebaseio.com/debrief_mce.json'
http_proxy= 'http://PITC-Zscaler-Americas-Cincinnati3PR.proxy.corporate.ge.com:80'
https_proxy= 'https://PITC-Zscaler-Americas-Cincinnati3PR.proxy.corporate.ge.com:80'
proxyDict = {"http"  : http_proxy,  "https" : https_proxy}

def get_dados():
    resp = requests.get(url=url, verify=False, proxies=proxyDict)
    return pd.read_json(json.dumps(resp.json())).T

def processa_dados(df):

    # Cria um dataframe vazio para cada categoria de debrief
    labor_df = pd.DataFrame()
    material_df = pd.DataFrame()
    paradas_df = pd.DataFrame()

    tipo_repair_mapping = ['Inspeção', 'MCE', 'Up Tower Repair', 'Down Tower Repair']

    print(df.columns)

    # Criamos um excelwriter para salvar multiplas sheets no mesmo excel
    with pd.ExcelWriter('database_reparos.xlsx') as writer:
        # Iteramos sobre todas as linhas dentro do dataframe de debrief inteiro
        for index, row in df.iterrows():

            # Substituimos o tiporepair numero pelo descritivo

            # print(row['labor'])
            # Verificamos se existe o tipo de debrief
            if type(row['labor']) is list:
                # Criamos um dataframe temporario com todas as linhas de labor
                row['tiporepair'] = tipo_repair_mapping[row['tiporepair']]
                _labor_df = pd.DataFrame(row['labor'])
                _labor_df['data_inicio'] = _labor_df['inicio'].str.split('T', n=1, expand=True)[0]
                _labor_df['hora_inicio'] = _labor_df['inicio'].str.split('T', n=1, expand=True)[1]
                _labor_df['data_fim'] = _labor_df['fim'].str.split('T', n=1, expand=True)[0]
                _labor_df['hora_fim'] = _labor_df['fim'].str.split('T', n=1, expand=True)[1]
                _labor_df['parque'] = row['complexo']
                _labor_df['numero_sr'] = row['numero_sr']

                #Numero de técnicos da atividade

                labor_df = pd.concat([labor_df, _labor_df])

            # if type(row['material']) is list:
            #     # Criamos um dataframe temporario com todas as linhas de material
            #     _material_df = pd.DataFrame(row['material'])
            #     _material_df['parque'] = row['complexo']
            #     _material_df['numero_sr'] = row['numero_sr']
            #     _material_df['paccase'] = row['paccase']
            #     material_df = pd.concat([material_df, _material_df])
            #
            # if type(row['paradas']) is list:
            #     # Criamos um dataframe temporario com todas as linhas de paradas
            #     _paradas_df = pd.DataFrame(row['paradas'])
            #     _paradas_df['parque'] = row['complexo']
            #     _paradas_df['numero_sr'] = row['numero_sr']
            #     _paradas_df['data_inicio'] = _paradas_df['inicio'].str.split('T', n=1, expand=True)[0]
            #     _paradas_df['hora_inicio'] = _paradas_df['inicio'].str.split('T', n=1, expand=True)[1]
            #     _paradas_df['data_fim'] = _paradas_df['fim'].str.split('T', n=1, expand=True)[0]
            #     _paradas_df['hora_fim'] = _paradas_df['fim'].str.split('T', n=1, expand=True)[1]
            #     paradas_df = pd.concat([paradas_df, _paradas_df])

        columnsLabor=['key', 'numero_sr', 'parque', 'subcategoria', 'data_inicio', 'hora_inicio', 'data_fim', 'hora_fim', 'descricao']
        labor_df.to_excel(writer, sheet_name='labor', columns=columnsLabor, index=False)
        # material_df.to_excel(writer, sheet_name='material', columns=['key', 'numero_sr', 'parque', 'partnumber', 'partnumberout', 'quantidade', 'quantidadeout', 'serialnumber', 'serialnumberout', 'tipopeca'], index=False)
        # paradas_df.to_excel(writer, sheet_name='paradas', columns=['key', 'numero_sr', 'parque', 'subcategoria_parada', 'tipo_parada', 'data_inicio', 'hora_inicio', 'data_fim', 'hora_fim'], index=False)

        #Media de tecnicos por atividade de labor -> média
        # df.to_excel(writer, sheet_name='atividades', columns=['key', 'numero_sr', 'complexo', 'data_do_debrief', 'paccase', 'problemcode', 'resolutioncode', 'subcategoria', 'tiporepair'], index=False)
        df.to_excel(writer, sheet_name='atividades', index=False)

if __name__ == '__main__':
    df = get_dados()
    processa_dados(df)
