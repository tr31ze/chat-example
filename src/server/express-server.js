"use strict";
const Promise = require('bluebird');
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const _ = require('lodash');
const defaultConfig = require('electrode-confippet').config;
const Confippet = require('electrode-confippet');

const server = require('http').createServer(app);

const loadConfigs = function (userConfig) {
    //use confippet to merge user config and default config
    if (_.get(userConfig, 'plugins.electrodeStaticPaths.enable')) {
        userConfig.plugins.electrodeStaticPaths.enable = false;
    }

    return Confippet.util.merge(defaultConfig, userConfig);
};

const setStaticPaths = function () {
    app.use(
        express.static(
            path.join(
                __dirname,
                '../..',
                defaultConfig.$('plugins.electrodeStaticPaths.options.pathPrefix')
            )
        )
    );
};

const setRouteHandler = () =>
    new Promise((resolve, reject) => {
        const webapp = p => (p.startsWith('.') ? path.resolve(p) : p);
        const registerRoutes = require(webapp(defaultConfig.$("plugins.webapp.module"))); //eslint-disable-line

        return registerRoutes(app, defaultConfig.$('plugins.webapp.options'), err => {
            if (err) {
                console.error(err); //eslint-disable-line
                reject(err);
            } else {
                resolve();
            }
        });
    });

const startIOserver = () => new Promise((resolve) => {
    // const io = require("socket.io")(server); //eslint-disable-line global-require, no-magic-numbers
    // io.on('connection', socket => {
    //     let addedUser = false;
    //     // when the client emits 'new message', this listens and executes
    //     socket.on('new message', data => {
    //         // we tell the client to execute 'new message'
    //         socket.broadcast.emit('new message', {
    //             username: socket.username,
    //             message: data
    //         });
    //     });
    //
    //     // when the client emits 'add user', this listens and executes
    //     socket.on('add user', username => {
    //         if (addedUser) return;
    //
    //         // we store the username in the socket session for this client
    //         socket.username = username;
    //         ++numUsers;
    //         addedUser = true;
    //         socket.emit('login', {
    //             numUsers
    //         });
    //         // echo globally (all clients) that a person has connected
    //         socket.broadcast.emit('user joined', {
    //             username: socket.username,
    //             numUsers
    //         });
    //     });
    //
    //     // when the client emits 'typing', we broadcast it to others
    //     socket.on('typing', function () {
    //         socket.broadcast.emit('typing', {
    //             username: socket.username
    //         });
    //     });
    //
    //     // when the client emits 'stop typing', we broadcast it to others
    //     socket.on('stop typing', function () {
    //         socket.broadcast.emit('stop typing', {
    //             username: socket.username
    //         });
    //     });
    //
    //     //when the client  requests to make a Game
    //     socket.on('makeGame', function () {
    //
    //         var gameId = (Math.random() + 1).toString(36).slice(2, 18);
    //         console.log("Game Created by " + socket.username + " w/ " + gameId);
    //         gameCollection.gameList.gameId = gameId
    //         gameCollection.gameList.gameId.playerOne = socket.username;
    //         gameCollection.gameList.gameId.open = true;
    //         gameCollection.totalGameCount++;
    //
    //         io.emit('gameCreated', {
    //             username: socket.username,
    //             gameId
    //         });
    //
    //     });
    //
    //     // when the user disconnects.. perform this
    //     socket.on('disconnect', function () {
    //         if (addedUser) {
    //             --numUsers;
    //
    //             // echo globally that this client has left
    //             socket.broadcast.emit('user left', {
    //                 username: socket.username,
    //                 numUsers
    //             });
    //         }
    //     });
    // });
    // resolve();
});

const startServer = () =>
    new Promise((resolve, reject) => {
        app.listen(defaultConfig.$('connections.default.port'), err => {
            if (err) {
                reject(err);
            } else {
                //eslint-disable-next-line
                console.log(`App listening on port: ${defaultConfig.$("connections.default.port")}`);
                resolve();
            }
        });
    });

const setupIo = function () {

};

module.exports = function electrodeServer(userConfig, callback) {
    const promise = Promise.resolve(userConfig)
        .then(loadConfigs)
        .then(setStaticPaths)
        .then(setRouteHandler)
        .then(startServer);

    return callback ? promise.nodeify(callback) : promise;
};
