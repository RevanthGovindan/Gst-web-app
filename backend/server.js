'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'placementseason'
});
connection.connect();
server.connection({
    host: '127.0.0.1',
    port: 8000,
    routes: {
        cors: true
    }
});

// Add the route
server.route({
    method: 'POST',
    path: '/addproduct',
    handler: function(request, reply) {
        var payload = request.payload
        console.log(payload.price);
        connection.query("INSERT INTO products(product_code,product_name,product_price,product_gst) VALUES('" + payload.code + "','" + payload.name + "','" + payload.price + "','"+payload.gst+"')", function(error, results, fields) {
            if (error) throw error;
            emit("refresh")
        });

        return reply(payload);
    }
});
server.route({
    method: 'POST',
    path: '/update',
    handler: function(request, reply) {
        var payload = request.payload
        connection.query("UPDATE products  SET product_name='"+payload.name+"',product_price='"+payload.price+"',product_gst='"+payload.gst+"' WHERE product_code='"+payload.code+"'", function(error, results, fields) {
            if (error) throw error;
            emit("refresh")
        });

        return reply(payload);
    }
});
server.route({
    method: 'POST',
    path: '/productdelete',
    handler: function(request, reply) {
        var payload = request.payload
        connection.query("DELETE FROM products WHERE product_name='" + payload.name + "'", function(error, results, fields) {
            if (error) throw error;
            emit("refresh")
        });

        return reply(payload);
    }
});
server.route({
    method: 'POST',
    path: '/productsearch',
    handler: function(request, reply) {
        var payload = request.payload
        connection.query("SELECT * FROM products where product_code ='"+ payload.code+"' or product_name='"+ payload.name+"'", function(error, results, fields) {
            if (error) throw error;
            return reply(JSON.stringify(results));
        });
    }
});
server.route({
    method: 'GET',
    path: '/load',
    handler: function(request, reply) {
        connection.query("SELECT * FROM products", function(error, results, fields) {
            if (error) throw error;
            return reply(JSON.stringify(results));
        });
    }
});

var io = require("socket.io")(server.listener);

io.on("connection", function(socket) {
    // emit();
    console.log('connected');
})

function emit(name) {
    io.sockets.emit('address', { hello: name });
}

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});