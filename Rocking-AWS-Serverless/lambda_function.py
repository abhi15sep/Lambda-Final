import json 
def lambda_handler(event, context):
    # TODO implement
    print(event)
    return 'Hello from ' + event['Country']
