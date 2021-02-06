import json
import boto3

reko = boto3.client('rekognition')
s3 = boto3.client('s3')

def char_reco(event, context):


    print(event)
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    print()
    
    print(bucket + " :: " + key)

    response=reko.detect_text(Image={'S3Object':{'Bucket':bucket,'Name':key}})

    textDetections=response['TextDetections']
    print ('Printing Detected text\n----------')
    for text in textDetections:
            print ('Detected text:' + text['DetectedText'])

    new_file = key+".txt"        
    
    response = s3.put_object(Body=str(textDetections), 
                      Bucket=bucket, 
                      Key=new_file)

    print(response)

    
    return response

    