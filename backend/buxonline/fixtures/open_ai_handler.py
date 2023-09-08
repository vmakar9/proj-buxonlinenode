import json
import time
import openai
from buxonline.models import Vacancy
from typing import List


if __name__ == '__main__':
    import os
    import django
    from dotenv import load_dotenv
    load_dotenv()
    os.environ["DJANGO_SETTINGS_MODULE"] = 'config.settings'
    django.setup()


def get_keywords_prompt(page_lang: str, page_title: str, page_description: str):
    json_format = "[\n    \"{keyword}\",\n    \"{keyword}\",\n    \"{keyword}\"\n]"
    prompt = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"I am using google ads to promote vacancies on my job list site. I want you to "
                                    "generate {keywords} for my ad group in specified language based on vacancy title "
                                    "and vacancy description. "
                                    "I also want to include in to keywords specific skills or technologies mentioned "
                                    "in the job description. You have to respect Google Ad Grants limitations "
                                    "and avoid trademarks in text."},
        {"role": "assistant", "content": "Certainly! I can help you generate keywords for your Google Ads campaign "
                                         "in specified language based on the vacancy title and vacancy description."},
        {"role": "user", "content": 'Ok. Generate me 15 {keywords} for this example:\n'
                                    f'Language: {page_lang}\n'
                                    f'Vacancy title: {page_title}\n'
                                    f'Vacancy Description: {page_description}\n'
                                    f'I want to get answer in json format only as single array '
                                    f'in this format:\n{json_format}'}
    ]
    return prompt


def get_headers_prompt(page_lang: str, page_title: str, page_description: str):
    json_format = "[\n    \"{header}\",\n    \"{header}\",\n    \"{header}\"\n]"
    prompt = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "I am using google ads to promote vacancies on my job list site. I want you to "
                                    "generate {headers} in specified language based on vacancy title and vacancy "
                                    "description. You have to respect Google Ad Grants limitations "
                                    "and avoid trademarks in text."},
        {"role": "assistant", "content": "Certainly! I can help you generate headers for your Google Ads campaign "
                                         "in specified language based on the vacancy title and vacancy "
                                         "description."},
        {"role": "user", "content": 'Ok. Generate me 15 {headers} limited to 30 characters for ad group for this '
                                    'example:\n'
                                    f'Language: {page_lang}\n'
                                    f'Vacancy title: {page_title}\n'
                                    f'Vacancy description: {page_description}\n'
                                    f'I want to get answer in json format as single array '
                                    f'in this format:\n{json_format}'}
    ]
    return prompt


def get_descriptions_prompt(page_lang: str, page_title: str, page_description: str):
    json_format = "[\n    \"{description}\",\n    \"{description}\",\n    \"{description}\",\n    \"{description}\"\n]"
    prompt = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "I am using google ads to promote vacancies on my job list site. I want you to "
                                    "generate {descriptions} for my ad group in specified language based on vacancy"
                                    " title and vacancy description. You have to respect Google Ad Grants "
                                    "limitations and avoid trademarks in text."},
        {"role": "assistant", "content": "Certainly! I can help you generate descriptions for your ad group in "
                                         "specified language based on the vacancy title and vacancy description."},
        {"role": "user", "content": 'Ok. Generate me 4 {descriptions} limited to 90 characters for ad group for '
                                    'this example:\n'
                                    f'Language: {page_lang}\n'
                                    f'Vacancy title: {page_title}\n'
                                    f'Vacancy description: {page_description}\n'
                                    f'I want to get answer in json format as single array '
                                    f'in this format:\n{json_format}'}
    ]
    return prompt


def clean_ai_answer(raw_data: str, target_element_len: int = None) -> list:
    start_index = raw_data.find('{')
    if start_index != -1:
        end_index = raw_data.rfind('}') + 1
        json_data = raw_data[start_index:end_index]
        # print('>>> clean_ai_answer {}', json_data)
    else:
        start_index = raw_data.find('[')
        end_index = raw_data.rfind(']') + 1
        json_data = raw_data[start_index:end_index]
        # print('>>> clean_ai_answer []', json_data)
    try:
        parsed_json = json.loads(json_data)
    except Exception as ex:
        # print('>> clean_ai_answer error (raw_data):', raw_data)
        # print('>> clean_ai_answer error (json_data):', json_data)
        print('>> clean_ai_answer error:', str(ex))
        return []
    if 'keywords' in parsed_json:
        answer = parsed_json.get('keywords')
    elif 'headers' in parsed_json:
        answer = parsed_json.get('headers')
    elif 'descriptions' in parsed_json:
        answer = parsed_json.get('descriptions')
    else:
        answer = parsed_json
    if type(answer) == dict:
        answer = [value for value in answer.values()]
    if type(answer) != list or len(answer) <= 2 or type(answer) == list and type(answer[0]) != str:
        # print(f'>> clean_ai_answer error: Type: {type(answer)}; Data: {answer}')
        return []
    if target_element_len:
        len_filtered_answer = [element for element in answer if len(element) <= target_element_len]
        return len_filtered_answer if len(len_filtered_answer) > 2 else []
    return answer


def generate_ads_data(prompt, api_key: str, target_element_len: int = None) -> list:
    openai.api_type = "azure"
    openai.api_base = 'https://bablo.openai.azure.com/'  # 'https://chat-gpt-4-usa.openai.azure.com/'
    openai.api_version = "2023-03-15-preview"  # 2023-05-15
    openai.api_key = api_key
    time.sleep(3)
    for i in range(20):
        try:
            raw_answer = openai.ChatCompletion.create(engine='gpt-35', messages=prompt)  # "gpt-4-32k"
            if i > 1:
                print('> try #', i, 'waiting delay')
                time.sleep(20)
            answer = clean_ai_answer(raw_answer['choices'][0]['message']['content'], target_element_len)
            if answer:
                return answer
        except Exception as ex:
            print(f'>>> generate_ads_data error: {str(ex)}')
            continue
    raise Exception(f'> Cant generate data for case: {prompt}')


def limit_phrase(phrase, limit):
    words = phrase.split()
    result = []
    current_length = 0
    for word in words:
        if current_length + len(word) + len(result) <= limit:
            result.append(word)
            current_length += len(word)
        else:
            break
    return ' '.join(result)


def generate_vacancy_seo_data(open_ai_api_key: str, vacancies: List[Vacancy]):
    # vacancies = Vacancy.objects.filter(language__name='Italian').order_by('pk')
    result = []
    for count, vacancy in enumerate(vacancies):
        # if vacancy.id <= 1816:
        #     continue
        keywords_prompt = get_keywords_prompt(vacancy.language.name, vacancy.title, vacancy.text)
        keywords = generate_ads_data(prompt=keywords_prompt, api_key=open_ai_api_key, target_element_len=40)
        for keyword in keywords[:15]:
            vacancy.vacancyrawkeyword_set.create(text=keyword[:40])
        headers_prompt = get_headers_prompt(vacancy.language.name, vacancy.title, vacancy.text)
        headers = generate_ads_data(prompt=headers_prompt, api_key=open_ai_api_key, target_element_len=30)
        for header in headers[:15]:
            vacancy.vacancyheader_set.create(text=header[:30])
        descriptions_prompt = get_descriptions_prompt(vacancy.language.name, vacancy.title, vacancy.text)
        descriptions = generate_ads_data(prompt=descriptions_prompt, api_key=open_ai_api_key, target_element_len=90)
        for desc in descriptions[:4]:
            vacancy.vacancydescription_set.create(text=desc[:90])
        log = f'> {count+1}/{vacancies.count()} done | kw: [{vacancy.vacancyrawkeyword_set.count()}]; hd: ' \
              f'[{vacancy.vacancyheader_set.count()}]; ds: [{vacancy.vacancydescription_set.count()}] --> {vacancy}'
        print(log)
        result.append(log)
    return result
