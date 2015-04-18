/**
 * @class game
 * This is used to store a reference to the Phaser game object
 **/
var Phaser = require('phaser');

var game = new Phaser.Game(400, 400, Phaser.AUTO, 'content', null);

module.exports = game;
