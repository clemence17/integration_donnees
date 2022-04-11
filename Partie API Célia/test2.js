const {TwitterApi} = require('twitter-api-v2');

var client = new TwitterApi({
    appKey: 'NXc8kn5Gv9B6lyZolXsx4Jg2n',
    appSecret: 'YfmUCzQZjsQlrPH9o3CW6XrOCpW08MIUCCwn62Y4l8nC54eFsw',
    accessToken: '1513522544929873925-srdDi0sqKE1Xa6kgm3KQE7YadrKRFz',
    accessSecret: 'dVnzYUMqERkuIZOIYyltebARh0bmRxn5aBVTyPvDwuJGL',
});

client.stream('statuses/filter', {track: 'covid'},  function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});