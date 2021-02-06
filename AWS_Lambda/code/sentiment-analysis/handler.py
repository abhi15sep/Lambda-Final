import json
import boto3

comprehend = boto3.client(service_name='comprehend', region_name='ap-south-1')

def detect_sentiment(event, context):
    
    print("Dynamo DB Data :: " + str(event))

    rating = event["Records"][0]['dynamodb']['NewImage']['rating']['S']
    pid = event["Records"][0]['dynamodb']['NewImage']['pid']['S']
    text = event["Records"][0]['dynamodb']['NewImage']['text']['S']
    
    sentiments = comprehend.detect_sentiment(Text=text, LanguageCode='en')

    print("Sentiments :: " + str(sentiments))
    
    print("Sentiment Type : " + str(sentiments["Sentiment"]))
    print("Score : " + str(sentiments["SentimentScore"]))
    
    table = boto3.resource('dynamodb').Table('reviewsp2')

    response = table.update_item(
        Key={
            'pid': pid
        },
        UpdateExpression='SET score = :val1, sentiment = :val2',
        ExpressionAttributeValues={
            ':val1': str(sentiments["SentimentScore"]),
            ':val2': str(sentiments["Sentiment"])
        }
    )

    print("response : " + str(response))

    return response

    
