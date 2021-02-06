1. Serverless getting started: https://www.serverless.com/framework/docs/getting-started/
2. sls create --name auction-service --template-url https://github.com/codingly-io/sls-base
   cd auction-service
   npm install

3. Severless Plugin: ext install ThreadHeap.serverless-ide-vscode  (ctl + p)
4. Deploy App: sls deploy --stage dev
               sls deploy -v
5.  Remove App: sls remove -v
6. If change is done only in function code, not in serverless.yaml: sls deploy -f createAuction -v

7. DynamoDB Document Client Documentation - AWS JavaScript SDK - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

8. Source Code course-auction-service : https://github.com/codingly-io/course-auction-service/tree/df75d1e5373b756febfd8c566ddf79391d6724f6

9. AWS Lambda middleware library: https://github.com/middyjs/middy

10. npm install @middy/core @middly/http-event-normalizer @middy/http-error-handler @middy/http-json-body-parser

11. npm install http-errors

12. DynamoDB Documentation: DocumentClient.query() - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property

13. DynamoDB Documentation: DocumentClient.get() - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property

14. DynamoDB Documentation: DocumentClient.update() - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property

15. Get cloud watch logs in terminal: sls logs -f processAuctions -t
                                      sls logs -f processAuctions -t
                                      sls logs -f processAuctions --startTime 1m
                                      sls logs -f processAuctions --startTime 1h

16. Invoke functions manually: sls invoke -f processAuctions -l

17. https://github.com/codingly-io/course-auction-service/blob/17ec7026cde940457019de8464d398bb2ad525be/resources/AuctionsTable.yml

18. https://github.com/codingly-io/course-auction-service/blob/6e4d9cde6da9819bb748411477fdd8106820c47c/src/lib/getEndedAuctions.js
    https://github.com/codingly-io/course-auction-service/blob/6e4d9cde6da9819bb748411477fdd8106820c47c/iam/AuctionsTableIAM.yml

19. https://github.com/codingly-io/course-auction-service/blob/17ec7026cde940457019de8464d398bb2ad525be/src/lib/closeAuction.js

20. JSON Schema Validation - Get Auctions Status:
    https://json-schema.org/
    https://github.com/codingly-io/course-auction-service/blob/8644327bc2b798b3b8e04a0d0129dbde221c1aec/src/lib/schemas/getAuctionsSchema.js
    https://github.com/codingly-io/course-auction-service/blob/fd7a1d77daff6b6c46e08084945092e7b59eaf40/src/lib/schemas/createAuctionSchema.js
    https://github.com/codingly-io/course-auction-service/blob/e986565c7670aaf836f8d21529a161332cab4111/src/lib/schemas/placeBidSchema.js
    npm install @middy/validator

21. https://auth0.com/

22. Create Test Tokens: https://gist.github.com/arielweinberger/21d3b72bb4f345a410abb7e98a17cc96
    curl --location --request POST 'https://sls-auth-******.eu.auth0.com/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=****************' \
--data-urlencode 'username=*******@gmail.com' \
--data-urlencode 'password=********' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'scope=openid'

23. https://github.com/codingly-io/serverless-auth0-authorizer

24. GitHub: Base Serverless Template - https://github.com/codingly-io/sls-base

25. sls invoke -f sendMail -l

26. AWS SDK SendMail: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property
                      https://github.com/codingly-io/course-notification-service/blob/3a03256e04aa5a8cdde3ec60b8c1a6544c7de00f/src/handlers/sendMail.js

27. https://github.com/codingly-io/course-notification-service/blob/4e80ae8dfc7e55c183212026e5dee262ffe3aa6f/iam/MailQueueIAM.yml
    https://github.com/codingly-io/course-notification-service/blob/4e80ae8dfc7e55c183212026e5dee262ffe3aa6f/resources/MailQueue.yml
    https://github.com/codingly-io/course-notification-service/blob/4e80ae8dfc7e55c183212026e5dee262ffe3aa6f/src/handlers/sendMail.js
    https://github.com/codingly-io/course-notification-service/blob/4e80ae8dfc7e55c183212026e5dee262ffe3aa6f/serverless.yml

28. Sample SQS Message: https://gist.githubusercontent.com/arielweinberger/af2eaebfa250b3ed2463e9a4c3d3fcd3/raw/0a0b7c1a83f5e836bc667e25c56986d434015b42/SQS%2520Message%2520Body

29. sls logs -f sendMail -t
    sls logs -f sendMail

30. https://github.com/codingly-io/course-notification-service/blob/fd9bae185094bdb996d86995c78f3603ff4fa4db/serverless.yml
    https://github.com/codingly-io/course-notification-service/blob/fd9bae185094bdb996d86995c78f3603ff4fa4db/resources/MailQueue.yml

31. https://github.com/codingly-io/course-auction-service/blob/6c96f4709ddee7346d64c03cac496ab9c48dc6aa/serverless.yml
    https://github.com/codingly-io/course-auction-service/blob/6c96f4709ddee7346d64c03cac496ab9c48dc6aa/iam/MailQueueIAM.yml

32. https://github.com/codingly-io/course-auction-service/blob/6c96f4709ddee7346d64c03cac496ab9c48dc6aa/serverless.yml

33. https://github.com/codingly-io/course-auction-service/blob/ac1796341be1ceb37162d0e0b46b39f5babb2144/src/lib/closeAuction.js

34. https://github.com/codingly-io/course-auction-service/blob/6c4ea0cb3bd463ee62eb85031c7f4450d7019b4f/serverless.yml
    https://github.com/codingly-io/course-auction-service/blob/6c4ea0cb3bd463ee62eb85031c7f4450d7019b4f/resources/AuctionsBucket.yml
    https://github.com/codingly-io/course-auction-service/blob/6c4ea0cb3bd463ee62eb85031c7f4450d7019b4f/iam/AuctionsBucketIAM.yml

35. https://github.com/codingly-io/course-auction-service/blob/88d5dc942231bd7c8e88198bcf9be8579fb5ccd2/resources/AuctionsBucket.yml

36. https://codingly-io.github.io/base64-encoder/
    https://github.com/codingly-io/course-auction-service/blob/9e20093e4c99cb0f761602e29b7bf9bb13e0bf99/src/lib/uploadPictureToS3.js

37. Your CORS and API Gateway survival guide by Alex DeBrie - https://www.serverless.com/blog/cors-api-gateway-survival-guide
     https://www.npmjs.com/package/@middy/http-cors
     npm install @middy/http-cors

38. Serverless Course Front-end (GitHub) - https://github.com/codingly-io/sls-course-frontend

39. sls info