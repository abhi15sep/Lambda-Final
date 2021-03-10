import requests
def handler(event, context):
    base_url = "https://cat-fact.herokuapp.com"
    facts = "/facts/random?animal_type=dog&amount=1"
    first_response = requests.get(base_url+facts)             
    response_list=first_response.json()
    print(response_list['text'])
    return response_list['text']