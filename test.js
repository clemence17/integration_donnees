const {TwitterApi} = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: 'NXc8kn5Gv9B6lyZolXsx4Jg2n',
    appSecret: 'YfmUCzQZjsQlrPH9o3CW6XrOCpW08MIUCCwn62Y4l8nC54eFsw',
    accessToken: '1513522544929873925-srdDi0sqKE1Xa6kgm3KQE7YadrKRFz',
    accessSecret: 'dVnzYUMqERkuIZOIYyltebARh0bmRxn5aBVTyPvDwuJGL',
});

client.v2.singleTweet('1347262570739200003', {
    'tweet.fields': [
        'text',
     ],
  }).then((val) => {
    console.log(val)
}).catch((err) => {
    console.log(err)
})