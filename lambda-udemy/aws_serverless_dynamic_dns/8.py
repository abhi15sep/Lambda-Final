import boto3

def lambda_handler(event, context):
    
    sourceIp = event["sourceIp"]
    secret = event["secret"]
    
    if secret != "mySecurePassword":
        print("Auth fail: %s" %event)
        raise Exception("Wrong Secret")
    
    try:
        client = boto3.client('route53')
    except Exception as e:
        print("AWS connection fail: %s" %e)
        raise Exception("Internal Server Error when connecting")
    
    try:
        response = client.change_resource_record_sets(
            HostedZoneId='Z30HFGYJYCDP4N',
            ChangeBatch={
                'Comment': 'updateDns',
                'Changes': [
                    {
                        'Action': 'UPSERT',
                        'ResourceRecordSet': {
                            'Name': 'home.bestmethod-training.com.',
                            'Type': 'A',
                            'TTL': 1,
                            'ResourceRecords': [
                                {
                                    'Value': sourceIp
                                },
                            ],
                        }
                    },
                ]
            }
        )
    except Exception as e:
        print("AWS change_resource_record_sets error: %s" %e)
        raise Exception("Internal Server Error updating the record to : %s" %sourceIp)
    
    print("success change to: %s" %sourceIp)
    return {
        "result": "success",
        "target_ip": sourceIp
    }
    