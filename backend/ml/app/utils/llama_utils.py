import requests
import json
import re
import random
import numpy as np

LLAMA_SERVER = 'http://localhost:11434/api/generate'
TEMPERATURE = 1.2    # отвечает за вариативность и длину генерации
MODEL = 'llama3'

def generate_prompt_dataset(data, num_tags):

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    
    new_data = {}

    if np.isnan(data['gender']) == False:
        new_data['gender'] = ['man', 'woman'][int(data['gender'])]
    
    if np.isnan(data['age']) == False:
        new_data['age'] = 'age ' + str(int(data['age']))
    
    if np.isnan(data['app_vehicle_ind']) == False:
        new_data['app_vehicle_ind'] = 'have car'
    else:
        new_data['app_vehicle_ind'] = 'have not car'

    if np.isnan(data['cnt_tr_all_3m']) == False:
        new_data['user_status'] = 'not active' if data['cnt_tr_all_3m'] < 8 else ('very active' if data['cnt_tr_all_3m'] > 27 else 'moderately active')
        new_data['user_status'] += ' user of bank'

    if np.isnan(data['cnt_tr_buy_3m']) == False:
        new_data['purchases'] = 'low' if data['cnt_tr_buy_3m'] < 6 else ('high' if data['cnt_tr_buy_3m'] > 26 else 'medium') 
        new_data['purchases'] += ' number of purchases'
    
    if np.isnan(data['cnt_tr_mobile_3m']) == False:
        new_data['mobile'] = 'have' if data['cnt_tr_mobile_3m'] > 0 else 'have not' 
        new_data['mobile'] += ' expenses on mobile communications'

    if np.isnan(data['cnt_tr_oil_3m']) == False:
        new_data['gas_station'] = 'have' if data['cnt_tr_oil_3m'] > 0 else 'have not'
        new_data['gas_station'] +=  ' expenses for gas station'
    
    if np.isnan(data['sum_zp_12m']) == False:
        new_data['salary'] = 'low' if data['sum_zp_12m'] < 122298 else ('high' if data['sum_zp_12m'] > 867959 else 'medium') 
        new_data['salary'] += ' salary'

    INFO_USER = ','.join([val for _, val in new_data.items()])
    
    MEETING = 'You are writing prompts for diffusion model to generate selling images for bank. You are given information about user.\
    Write what physical objects can be located in the picture. Use user information. For example, if this is an active user with a large salary, offer him the topic of investment.\
    If the user has a car, offer to insure the car. If this is an inactive user, offer favorable interest rates for a credit card. Objects must have a color specified.\
    If a gender is specified, choose colors that match that gender. It is also worth paying attention to the user’s expenses on communications and refueling.\
    Write only the sequence of words, in the start of sequence write word "PROMPT" and in the end write word "END"!.\n\n\
    For example\n\n\
    info: man,age 52,have car,very active user of bank,high number of purchases,have expenses on mobile communications,have expenses for gas station,high salary\n\
    prompt: blue car,percent sign,car,percent\n\n\
    info: man,age 52,have car,very active user of bank,high number of purchases,have expenses on mobile communications,have expenses for gas station,high salary\n\
    prompt: blue car,percent sign,car,percent\n\n\
    info: woman,age 49,have not car,not active user of bank,low number of purchases,have not expenses on mobile communications,have not expenses for gas station,low salary\n\
    prompt: credit card,card,pink diamond,orange confetti\n\n'
    
    MEETING += 'your info: ' + INFO_USER + '\nprompt:'
    
    data = {"model": MODEL, "prompt": MEETING, "options": {"temperature": TEMPERATURE, "num_predict": -1, "top_k": 80, "mirostat": 2}}
    
    response : requests.Response = requests.post(LLAMA_SERVER, headers = headers, data = json.dumps(data))
    if response.status_code != 200:
        print('ERROR')
    else:
        ans = ''
        for obj in response.content.decode('utf-8').split('\n')[:-1]:
            ans += (json.loads(obj)['response'])
        
        ans = re.sub(r'[^a-zA-Z, ]', '', ans.split('PROMPT')[-1].split('prompt:')[-1].split("END")[0])

        def process(ans, num_tags):
            array = ans.split(',')
            ready = []
            for i in array:
                if len(i) == 0 or i.count(' ') == len(i) or 'background' in i or 'man' in i or 'woman' in i:
                    continue
                else:
                    while not(i[0].isalpha()):
                        i = i[1:]
                    while not(i[-1].isalpha()):
                        i = i[:-1]
                    ready += [i]
            
            if len(ready) > num_tags:
                ready = np.array(ready)
                np.random.shuffle(ready)
                ready = ready[:num_tags].tolist()
            return ','.join(ready)
        
        return process(ans, num_tags), INFO_USER


def agregate_users(df, num_tags):
    if len(df) > 1: 
        age = df.age.mean()
        gender = df.gender.mode()[0]
        car = df.app_vehicle_ind.mode()[0]
        transactions = df.cnt_tr_all_3m.mean()
        purchases = df.cnt_tr_buy_3m.mean()
        mobile = df.cnt_tr_mobile_3m.mean()
        oil = df.cnt_tr_oil_3m.mean()
        salary = df.sum_zp_12m.mean()
        data = {'gender': gender, 'age': age, 'app_vehicle_ind': car, 'cnt_tr_all_3m': transactions, 'cnt_tr_buy_3m': purchases, 'cnt_tr_mobile_3m': mobile, 'cnt_tr_oil_3m': oil, 'sum_zp_12m': salary}
    else:
        data = df.iloc[0].to_dict()

    prompt, info_user = generate_prompt_dataset(data, num_tags)
    return len(df), prompt, info_user
    

def prompt_dataset_pipeline(path_to_csv, num_tags = 3): # Можно регулировать количество тегов
    df = pd.read_csv(path_to_csv) 
    length, prompt, info_user = agregate_users(df, num_tags)
    print(f'Количество пользователей: {length},\nprompt: {prompt}\ninfo: {info_user}')