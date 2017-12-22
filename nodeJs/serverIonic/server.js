'use strict';

const Hapi = require('hapi');
const MySQL = require('mysql');
const Joi = require('joi');
var SHA256 = require("crypto-js/sha256");
const server = new Hapi.Server();


const connection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'huytd',
    database: 'sateco'
});




server.connection({
    host: 'localhost',
    port: 6969
});
connection.connect();

server.route({
    method: 'GET',
    path: '/helloworld',
    handler: function (request, reply) {
        return reply('hello world');
    }
});

// Add the route
server.route({
    method: 'GET',
    path: '/user',
    handler: function (request, reply) {

        connection.query('SELECT user_id, user_name FROM user', function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            reply(results);
        });

    }
});

server.route({
    method: 'GET',
    path: '/user/{user_id}',
    handler: function (request, reply) {
        const user_id = request.params.user_id;

        connection.query('SELECT user_id, user_name FROM user WHERE user_id = "' + user_id + '"', function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            reply(results);
        });

    },
    config: {
        validate: {
            params: {
                user_id: Joi.number().integer()
            }
        }
    }
});

server.route({
    method: 'POST',
    path: '/signup',

    handler: function (request, reply) {

       var user_name = request.payload.user_name;
        var password = request.payload.password;
        var orgPassword = SHA256(password);
        connection.query('SELECT * FROM user WHERE user_name = "'+ user_name + '"', function (error, results) {
            if (error){
                console.log(error);
                reply({status: "201", message: "Error connect data"});
                return;    
            }
            if(results.length > 0){
                reply({status: "202", message: "Username "+ user_name +" already exist"});
            }else{
                connection.query('INSERT INTO user (user_name,password,user_role) VALUES ("' + user_name + '","' 
                    + orgPassword + '","' + 1 + '")', function (err, res) {
                    if (error){
                        console.log(error);
                        reply({status: "201", message: "Error connect data"});
                        return;    
                    }
                    reply({status: "200", results, message: "Success"});
                });
            }
        });
    }
});

server.route({
    method: 'POST',
    path: '/login',

    handler: function (request, reply) {

        var user_name = request.payload.user_name;
        var password = request.payload.password;
        var orgPassword = SHA256(password);
        connection.query('SELECT user_id, user_name FROM user WHERE user_name = "'+ user_name +'" AND password = "'+orgPassword+'"', function (error, results) {
            if (error) throw error;
            
            if(results.length > 0){
                reply({status : "200", results, message: "Success"});
            }else{
                reply({status: "201", message: "Account not exist"});
            }
        });
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
}); 

server.route({
    method: 'POST',
    path: '/changePass',

    handler: function (request, reply) {

        var user_id = request.payload.user_id;
        var password = request.payload.oldPassword;
        var newPassword = request.payload.newPassword;
        var encodePass = SHA256(password);
        var encodeNewPass = SHA256(newPassword);
        connection.query('SELECT  user_id, password FROM user WHERE  password="'+encodePass+'"', function (error, results) {
            console.log(results);
            if (error){
                console.log(error);
                reply({status: "201", message: "Error connect data"});
                return;    
            }
            if(results.length == 0){
                reply({status: "202", message: "Old password is not correct"});
            }else{
        connection.query('UPDATE user SET password= "'+encodeNewPass+'" WHERE user_id ="'+user_id+'"', function (err, res) {
            if (error) throw error;
                reply({status : "200", results, message: "Password changed"});
            // console.log(results);
                });
            }
        });
    }
});

server.route({
    method: 'GET',
    path: '/getDivice',
    handler: function (request, reply) {
        connection.query('SELECT * FROM devices WHERE updated IN (SELECT MAX(updated) FROM devices)', function (error, results) {
            if(error){
                console.log(error);
                reply({status: '201', message: 'Error connect data'});
                return;
            } 
            reply({status: '200', message: 'Get device success', results});
        });
    }
});

var interval = setInterval(function(){
    getDiviceLastTime();
},5*60*100);

function getDiviceLastTime(){
     connection.query('SELECT * FROM devices WHERE updated IN (SELECT MAX(updated) FROM devices)', function (error, results) {
        if(error){
            console.log(error);
            return;
        } else {
            insertDevices(results[0]);
        }
    });
}

function insertDevices(devices){
    var lat = parseFloat(devices.lat) + 0.01;
    var long = parseFloat(devices.long) + 0.01;
    var query = 'INSERT INTO `devices`(`lat`, `long`) VALUES ('+ lat +', '+ long +')';

    connection.query(query, function (error, results) {
        if (error){
            console.log(error);
            return;
        }
    });
}