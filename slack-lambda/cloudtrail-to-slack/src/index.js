"use strict;"

const SLACK_TOKEN = process.env.SLACK_TOKEN
const SLACK_CHANNEL = process.env.SLACK_CHANNEL

const zlib = require("zlib");
const { DateTime } = require("luxon");
const { WebClient } = require("@slack/web-api");
const slack = new WebClient(SLACK_TOKEN);

/**
 * CloudTrailログレコードをSlackに通知する
 *
 * @param {Object} log CloudTrailログレコード
 * @param {string} log.eventTime
 * @param {string} log.eventVersion
 * @param {string} log.userIdentity
 * @param {string} log.eventSource
 * @param {string} log.eventName
 * @param {string} log.awsRegion
 * @param {string} log.sourceIPAddress
 * @param {string} log.userAgent
 * @param {string} log.errorCode
 * @param {string} log.errorMessage
 * @param {string} log.requestParameters
 * @param {string} log.responseElements
 * @param {string} log.additionalEventData
 * @param {string} log.requestID
 * @param {string} log.eventID
 * @param {string} log.eventType
 * @param {string} log.apiVersion
 * @param {string} log.managementEvent
 * @param {string} log.readOnly
 * @param {string} log.resources
 * @param {string} log.recipientAccountId
 * @param {string} log.serviceEventDetails
 * @param {string} log.sharedEventID
 * @param {string} log.vpcEndpointId
 * @see https://docs.aws.amazon.com/ja_jp/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html
 */
const notifyToSlack = async (log) => {
    const userName = log.userIdentity.arn.split(":").slice(-1).pop();
    const summary = `${log.eventName} by ${userName}`;
    const eventTime = DateTime.fromISO(log.eventTime);
    const eventTimeJST = eventTime.setZone("Asia/Tokyo").toFormat("yyyy/MM/dd (ccc) HH:mm:ss");
    const epochSeconds = eventTime.toMillis() / 1000;

    const payload = {
        token: SLACK_TOKEN,
        channel: SLACK_CHANNEL,
        attachments: [
            {
                fallback: summary,
                color: "warning",
                author_name: "AWS CloudTrail",
                title: `AWS CloudTrail イベントログ [${log.eventID}]`,
                title_link: `https://console.aws.amazon.com/cloudtrail/home?region=${log.awsRegion}#/events?EventId=${log.eventID}`,
                fields: [
                    {
                        title: "日時",
                        value: eventTimeJST,
                        short: false
                    },
                    {
                        title: "イベント名",
                        value: log.eventName,
                        short: true
                    },
                    {
                        title: "ユーザー名",
                        value: userName,
                        short: true
                    },
                    {
                        title: "サービス",
                        value: log.eventSource,
                        short: true
                    },
                    {
                        title: "リージョン",
                        value: log.awsRegion,
                        short: true
                    }
                ],
                ts: epochSeconds
            }
        ]
    };

    return slack.chat.postMessage(payload);
};

exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        // ログストリームのペイロードを展開
        const payload = Buffer.from(event.awslogs.data, "base64");
        const dataBin = zlib.gunzipSync(payload);
        const data = JSON.parse(dataBin.toString("ascii"));

        // ログイベントのCloudTrailログレコードを取り出してSlackに通知
        const apiTasks = data.logEvents
            .map(ev => JSON.parse(ev.message))
            .map(notifyToSlack);

        await Promise.all(apiTasks);

        callback(null, {
            statusCode: 200,
            body: "done."
        });
    } catch (e) {
        console.error(e, JSON.stringify(e.data));
        callback(e, {
            statusCode: 500,
            body: e.message
        });
    }
};
