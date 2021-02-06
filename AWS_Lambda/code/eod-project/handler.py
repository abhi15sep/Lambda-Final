import json
import datetime

def hello(event, context):

    print("EOD Procesing started " + str(datetime.datetime.now()))

    body = {
        "message": "EOD Processing",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """
