# cloudtrail to slack

CloudTrail のログストリームを Slack に通知する Lambda 関数

## 開発環境

- [awscli](https://docs.aws.amazon.com/ja_jp/cli/)
- [aws-sam-cli](https://github.com/awslabs/aws-sam-cli)
- [docker](https://docs.docker.com/install/)

## ローカル環境のセットアップ

```bash
git clone git@github.com:hidekuro/cloudtrail-to-slack.git
cd cloudtrail-to-slack

sam build --use-container

# .env.example をコピーしてSlackのOauthトークン、宛先チャンネル名 or チャンネルIDを記入し、環境変数にexport
cp .env.example .env
source .env && export SLACK_TOKEN SLACK_CHANNEL

# テスト実行
sam local invoke CloudTrailToSlackFunction --event test-stream-event.json
```

## 環境変数

|変数名|説明|サンプル|
|---|---|---|
|`SLACK_TOKEN`|Slack Oauth トークン|`xoxp-XXXXXXXXXX-XXXXXXXXXXXX-XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`|
|`SLACK_CHANNEL`|Slack チャンネルID or チャンネル名|`#general` `C1234567890`|

## パッケージングとデプロイ

パッケージングしてS3にアップロード

```bash
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket $YOUR_S3_BUCKET_NAME
```

ログに表示されるObject Keyか `packaged.yaml` 内のS3 URLを確認してLambdaのソースに指定する。

## CloudWatch Logs ストリーミングフィルタの例

```
{
    ($.eventName != "Get*") && ($.eventName != "List*") && ($.eventName != "Describe*")
        && (
            ($.eventName = "SecurityGroup*")
            || ($.eventName = "ApplySecurityGroupsToLoadBalancer")
            || ($.eventName = "*Policy*")
            || ($.eventName = "*Gateway")
            || ($.eventName = "*User")
            || ($.eventName = "*Vpc*")
            || ($.eventName = "*NetworkAcl*")
            || ($.eventName = "CreateRoute")
            || ($.eventName = "StopLogging")
            || (($.eventName = "ConsoleLogin") && ($.errorMessage = "Failed authentication"))
        )
}
```

- Get, List, Describe は無視
- 下記を検知
  - セキュリティグループの変更
  - IAMの変更
  - ゲートウェイ、VPCの変更
  - CloudTrailのログ停止
  - コンソールログインの失敗

設定用にスペースを省いたもの

```
{($.eventName!="Get*")&&($.eventName!="List*")&&($.eventName!="Describe*")&&(($.eventName="SecurityGroup*")||($.eventName="ApplySecurityGroupsToLoadBalancer")||($.eventName="*Policy*")||($.eventName="*Gateway")||($.eventName="*User")||($.eventName="*Vpc*")||($.eventName="*NetworkAcl*")||($.eventName="CreateRoute")||($.eventName="StopLogging")||(($.eventName="ConsoleLogin")&&($.errorMessage="Failedauthentication")))}
```

### 参考リンク

- [AWS CloudFormation テンプレートを使用して CloudWatch アラームを作成する - AWS CloudTrail](https://docs.aws.amazon.com/ja_jp/awscloudtrail/latest/userguide/use-cloudformation-template-to-create-cloudwatch-alarms.html)
- [The Most Important AWS CloudTrail Security Events You Should Track - GorillaStack](https://www.gorillastack.com/news/important-aws-cloudtrail-security-events-tracking/)

# LICENSE

[The MIT License](LICENSE)
