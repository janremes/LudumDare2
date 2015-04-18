(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @class base
 * This is the root file for the Phaser Boilerplate. All other files are included from this one.
 **/

var game = require('./game'),
    boot = require('./scenes/boot.js'),
    preloader = require('./scenes/preloader'),
    mainMenu = require('./scenes/mainMenu'),
    mainGame = require('./scenes/mainGame'),
    Analytics = require('./classes/Analytics.js');

// set the default language
game.language = "en";

// add add states
game.state.add('boot', boot, false);
game.state.add('preloader', preloader, false);
game.state.add('mainMenu', mainMenu, false);
game.state.add('mainGame', mainGame, false);

game.analytics = new Analytics("test");

// kick off the game
game.state.start('boot');

},{"./classes/Analytics.js":2,"./game":4,"./scenes/boot.js":6,"./scenes/mainGame":7,"./scenes/mainMenu":8,"./scenes/preloader":9}],2:[function(require,module,exports){
/**
 * @class Analytics
 * A wrapper around Google Analytics
 */
/*globals ga*/

var Analytics = function (category) {

  if (!category) {
    throw new this.exception("No category defined");
  }

  this.active = (window.ga) ? true : false;
  this.category = category;
};

Analytics.prototype.trackEvent = function (action, label, value) {
  if (!this.active) {
    return;
  }

  if (!action) {
    throw new this.exception("No action defined");
  }

  if (value) {
    window.ga('send', this.category, action, label, value);
  } else if (label) {
    window.ga('send', this.category, action, label);
  } else {
    window.ga('send', this.category, action);
  }

};

Analytics.prototype.exception = function (message) {
  this.message = message;
  this.name = "AnalyticsException";
};

module.exports = Analytics;

},{}],3:[function(require,module,exports){
(function (global){
/**
 * @class Label
 * An extention to the text class, that adds some default styling
 *
 * @extends Phaser.Text
 */
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null),
  game = require('../game');

/**
 * @constructor
 *
 * @param x {Number} Horizontal position
 * @param y {Number} Verticle position
 * @param textContext {String} The text to display
 * @param fontStyle {Object} Optional style of the text
 */
var Label = function (x, y, textContent, fontStyle) {

  // set a basic style
  var style = fontStyle || {
    font: '30px Arial',
    fill: '#4488cc',
    align: 'center'
  };

  // call the superclass method
  Phaser.Text.call(this, game, x, y, textContent, style);
  this.anchor.setTo(0.5, 0.5);


};

Label.prototype = Object.create(Phaser.Text.prototype);
Label.prototype.constructor = Label;

module.exports = Label;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../game":4}],4:[function(require,module,exports){
(function (global){
/**
 * @class game
 * This is used to store a reference to the Phaser game object
 **/
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null);

var game = new Phaser.Game(400, 400, Phaser.AUTO, 'content', null);

module.exports = game;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
/**
 * @class locale
 * A simple object to store translations for each language requred
 */
module.exports = {
  "en": {
    "mainMenu": {
      "labelTitle": "Example menu\nClick to continue"
    },
    "mainGame": {
      "labelTitle": "Add you game code goes here..."
    }
  }
};

},{}],6:[function(require,module,exports){
(function (global){
/**
 * @class boot
 * A Phaser scene
 */
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null),
  game = require('../game');

module.exports = {

  preload: function () {

    // add any images for the pre-loader here
    game.analytics.trackEvent('scene', 'preload', 'boot');

  },

  create: function () {

    game.analytics.trackEvent('scene', 'create', 'boot');

    // max number of fingers to detect
    this.input.maxPointers = 1;

    // auto pause if window looses focus
    this.stage.disableVisibilityChange = true;

    if (game.device.desktop) {
      this.stage.scale.pageAlignHorizontally = true;
    }
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

    game.state.start('preloader', true, false);
  }

};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../game":4}],7:[function(require,module,exports){
/**
 * @class mainGame
 * A Phaser scene
 */
var game = require('../game'),
  localisation = require('../locale'),
  Label = require('../classes/Label');

module.exports = {

  create: function () {

    game.analytics.trackEvent('scene', 'create', 'mainGame');

    game.stage.backgroundColor = '#fff';

    this.labelTitle = new Label(game.width * 0.5, game.height * 0.5, localisation[game.language].mainGame.labelTitle);
    game.add.existing(this.labelTitle);

  },

  update: function () {
    // add your game loop code here
  },

  restartGame: function () {

    game.analytics.trackEvent('scene', 'create', 'restartGame');

    game.state.start('mainMenu');
  }

};

},{"../classes/Label":3,"../game":4,"../locale":5}],8:[function(require,module,exports){
(function (global){
/**
 * @class mainMenu
 * A Phaser scene
 */
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null),
  game = require('../game'),
  localisation = require('../locale'),
  Label = require('../classes/Label');

module.exports = {

  create: function () {

    game.analytics.trackEvent('scene', 'create', 'mainMenu');

    var tween,
      style = {
        font: '30px Arial',
        fill: '#ffffff',
        align: 'center'
      };

    // set the background colour
    game.stage.backgroundColor = '#4488cc';
    
    // add a label based on our custom class
    this.labelTitle = new Label(game.width * 0.5, game.height * 0.5, localisation[game.language].mainMenu.labelTitle, style);
    this.labelTitle.alpha = 0;
    game.add.existing(this.labelTitle);

    // fade the label in
    tween = this.add.tween(this.labelTitle);
    tween.to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.addPointerEvents, this);
  },

  addPointerEvents: function () {
    
    // add an input listener
    this.input.onDown.addOnce(this.startGame, this);
  },

  startGame: function () {
    
    // go to the main game scene
    game.state.start('mainGame', true, false);
  }

};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../classes/Label":3,"../game":4,"../locale":5}],9:[function(require,module,exports){
(function (global){
/**
 * @class preloader
 * A Phaser scene
 */
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null),
  game = require('../game');

module.exports = {

  preload: function () {

    game.analytics.trackEvent('scene', 'preload', 'preloader');

    game.stage.backgroundColor = '#4488cc';

    var bmd = game.add.bitmapData(game.width, game.height);
    bmd.context.fillStyle = '#fff';
    bmd.context.fillRect(0, game.height - 10, game.width, 10);
    bmd.dirty = true;

    this.loadingBar = this.add.sprite(game.world.centerX, game.world.centerY, bmd);
    this.load.setPreloadSprite(this.loadingBar);

    // load any other assets here
  },

  create: function () {

    game.analytics.trackEvent('scene', 'create', 'preloader');

    var tween = this.add.tween(this.loadingBar)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startMainMenu, this);
  },

  startMainMenu: function () {
    game.state.start('mainMenu', true, false);
  }

};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../game":4}]},{},[1]);
