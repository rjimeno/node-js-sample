// Include the async package
// Make sure you add "async" to your package.json
var async = require('async');
// Include the redis package
// Be sure to npm install redis
var redis = require('redis');
var PORT = 6379;
var HOST = "backspace-lab-redis.qlxgcb.0001.use1.cache.amazonaws.com";
var client = redis.createClient(PORT, HOST); //creates a new Redis client

client.on('connect', function() {
    console.log('connected');
    writeRedisKey("myHighScore", "1000");
});

function writeRedisKey(keyRedis, value){
  client.set(keyRedis, value, function(err, response) {
    console.log(response);
    client.expire('keyRedis', 30) // Seconds (too short, probably).
    readRedisKey(keyRedis);
  });
}

function readRedisKey(keyRedis){
  client.get(keyRedis, function(err, response) {
      console.log(response);
      var objInfo ={
        info1: "This is info 1",
        info2: "This is info 2",
        info3: "This is info 3"
      };
      writeRedisObject("myInfo", objInfo);
  });
}

function writeRedisObject(objRedis, value){
  client.hmset(objRedis, value, function(err, response){
    console.log(response);
    readRedisObject(objRedis);
  });
}

function readRedisObject(objRedis){
  client.hgetall(objRedis, function(err, response) {
      console.log(response);
  });
}