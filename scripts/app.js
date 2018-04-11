(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _statesBootJs = require("./states/Boot.js");

var _statesBootJs2 = _interopRequireDefault(_statesBootJs);

var _statesMenuJs = require("./states/Menu.js");

var _statesMenuJs2 = _interopRequireDefault(_statesMenuJs);

var _statesGameNarrativeJs = require("./states/GameNarrative.js");

var _statesGameNarrativeJs2 = _interopRequireDefault(_statesGameNarrativeJs);

var _statesPreloadJs = require("./states/Preload.js");

var _statesPreloadJs2 = _interopRequireDefault(_statesPreloadJs);

var _statesGameJs = require("./states/Game.js");

var _statesGameJs2 = _interopRequireDefault(_statesGameJs);

var _statesEp1Js = require("./states/Ep1.js");

var _statesEp1Js2 = _interopRequireDefault(_statesEp1Js);

var _statesEp2Js = require("./states/Ep2.js");

var _statesEp2Js2 = _interopRequireDefault(_statesEp2Js);

var _statesEp3Js = require("./states/Ep3.js");

var _statesEp3Js2 = _interopRequireDefault(_statesEp3Js);

var _statesEp4Js = require("./states/Ep4.js");

var _statesEp4Js2 = _interopRequireDefault(_statesEp4Js);

var _statesEp5Js = require("./states/Ep5.js");

var _statesEp5Js2 = _interopRequireDefault(_statesEp5Js);

var _statesEp6Js = require("./states/Ep6.js");

var _statesEp6Js2 = _interopRequireDefault(_statesEp6Js);

var _statesGameOverJs = require("./states/GameOver.js");

var _statesGameOverJs2 = _interopRequireDefault(_statesGameOverJs);

var _statesWonJs = require("./states/Won.js");

var _statesWonJs2 = _interopRequireDefault(_statesWonJs);

var game;

window.onload = function () {
  game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'game');
  game.state.add('boot', _statesBootJs2["default"]);
  game.state.add('menu', _statesMenuJs2["default"]);
  game.state.add('gamenarrative', _statesGameNarrativeJs2["default"]);
  game.state.add('preload', _statesPreloadJs2["default"]);
  game.state.add('game', _statesGameJs2["default"]);
  game.state.add('ep1', _statesEp1Js2["default"]);
  game.state.add('ep2', _statesEp2Js2["default"]);
  game.state.add('ep3', _statesEp3Js2["default"]);
  game.state.add('ep4', _statesEp4Js2["default"]);
  game.state.add('ep5', _statesEp5Js2["default"]);
  game.state.add('ep6', _statesEp6Js2["default"]);
  game.state.add('gameover', _statesGameOverJs2["default"]);
  game.state.add('won', _statesWonJs2["default"]);
  game.state.start('boot');
};

},{"./states/Boot.js":23,"./states/Ep1.js":24,"./states/Ep2.js":25,"./states/Ep3.js":26,"./states/Ep4.js":27,"./states/Ep5.js":28,"./states/Ep6.js":29,"./states/Game.js":30,"./states/GameNarrative.js":31,"./states/GameOver.js":32,"./states/Menu.js":33,"./states/Preload.js":34,"./states/Won.js":35}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tools = (function () {
  function Tools() {
    _classCallCheck(this, Tools);
  }

  _createClass(Tools, null, [{
    key: "muteOrPlay",
    value: function muteOrPlay(audiosprite, bool) {
      if (!audiosprite) return;
      for (var key in audiosprite.sounds) {
        audiosprite.sounds[key].mute = bool;
      }
    }
  }, {
    key: "playSound",
    value: function playSound(sfx, soundarray) {
      //with blocking function
      if (sfx == undefined || soundarray == undefined || soundarray.length < 0) return;
      var canPlay = true;
      soundarray.forEach(function (sound) {
        if (sfx.sounds[sound].isPlaying) {
          canPlay = false;
          return;
        }
      });
      if (canPlay) sfx.play(sfx.game.rnd.pick(soundarray));
    }
  }, {
    key: "storeEp",
    value: function storeEp(whichEp) {
      if (typeof Storage !== "undefined") {
        var epArray = localStorage.getItem("played_ep");
        if (epArray) {
          var data = JSON.parse(epArray);
          data.push(whichEp);
          localStorage.setItem("played_ep", JSON.stringify(Array.from(new Set(data)))); //Set is only unique items
        } else {
            localStorage.setItem("played_ep", JSON.stringify([whichEp]));
          }

        localStorage.setItem("current_ep", whichEp);
      } else {
        console.log("Warning: no local storage");
      }
    }
  }, {
    key: "getEp",
    value: function getEp() {
      if (typeof Storage !== "undefined") {
        return localStorage.getItem("current_ep");
      } else {
        console.log("Warning: no local storage");
      }
    }
  }, {
    key: "storeTotalScore",
    value: function storeTotalScore(ep, score) {
      if (typeof Storage !== "undefined") {
        var scArray = localStorage.getItem("total_score");
        if (scArray) {
          var data = JSON.parse(scArray);
          data[ep - 1] = score;
          localStorage.setItem("total_score", JSON.stringify(data));
        } else {
          var newData = new Array();
          newData[ep - 1] = score;
          localStorage.setItem("total_score", JSON.stringify(newData));
        }
      } else {
        console.log("Warning: no local storage");
      }
    }
  }, {
    key: "getTotalScore",
    value: function getTotalScore() {
      if (typeof Storage !== "undefined") {
        var scArray = localStorage.getItem("total_score");
        var highScore = localStorage.getItem("high_score");
        if (scArray) {
          var data = JSON.parse(scArray);
          var totalScore = 0;
          data.forEach(function (s) {
            totalScore += s;
          });
          if (highScore) {
            if (highScore < totalScore) localStorage.setItem("high_score", totalScore);
          } else localStorage.setItem("high_score", totalScore);
          return totalScore;
        } else console.log("No idea: no data");
      } else {
        console.log("Warning: no local storage");
      }
    }
  }, {
    key: "storeData",
    value: function storeData(target, data) {
      if (typeof Storage !== "undefined") {
        localStorage.setItem(target, JSON.stringify(data));
      } else {
        console.log("Warning: no local storage");
      }
    }
  }, {
    key: "getData",
    value: function getData(target) {
      if (typeof Storage !== "undefined") {
        return JSON.parse(localStorage.getItem(target));
      } else {
        console.log("Warning: no local storage");
      }
    }
  }, {
    key: "convertTileCoorToP2",
    value: function convertTileCoorToP2(x, y, width, height, P2Body) {
      var returnCoor = new Phaser.Point(x + width / 2, y - height / 2);
      P2Body.x = returnCoor.x;P2Body.y = returnCoor.y;

      return returnCoor;
    }
  }, {
    key: "findObjectInLayer",
    value: function findObjectInLayer(map, layer) {
      //modified it to search only for unique GID
      var result = new Array();
      map.objects[layer].forEach(function (element) {
        //element.y -= element.height;
        result.push(element);
      });
      return result;
    }
  }, {
    key: "findUniqueGIDInLayer",
    value: function findUniqueGIDInLayer(map, layer) {
      //modified it to search only for unique GID
      var result = new Array();
      var gid = new Array();
      map.objects[layer].forEach(function (element) {
        //element.y -= element.height;
        if (gid.length > 0 && gid.indexOf(element.gid) != -1) return;
        result.push(element);
        gid.push(element.gid);
      });
      return result;
    }
  }, {
    key: "checkIfOnFloor",
    value: function checkIfOnFloor(game, player) {

      var yAxis = p2.vec2.fromValues(0, 1);
      var result = false;

      for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
          var d = p2.vec2.dot(c.normalA, yAxis);

          if (c.bodyA === player.body.data) {
            d *= -1;
          }

          if (d > 0.5) {
            result = true;
          }
        }
      }

      return result;
    }
  }]);

  return Tools;
})();

exports["default"] = Tools;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var BlockingObjects = (function (_Phaser$Sprite) {
  _inherits(BlockingObjects, _Phaser$Sprite);

  function BlockingObjects(game, x, y, key, frame) {
    _classCallCheck(this, BlockingObjects);

    _get(Object.getPrototypeOf(BlockingObjects.prototype), "constructor", this).call(this, game, x, y, key, frame);
    console.log("blocking frame name created: " + frame);
    //console.log("before x y width height "+x+" "+y+" "+this.offsetX+" "+this.offsetY+" "+this.right+" "+this.bottom);
    this.game.physics.p2.enable(this, false); //debug is true
    this.body["static"] = true; //this center the anchor to 0.5,0.5

    switch (frame) {
      case 'wateroutlet':
        this.body.clearShapes();
        this.body.setCircle(this.width / 2, 0, -this.width / 4);
        _componentsToolsJs2["default"].convertTileCoorToP2(x, y, this.width, this.height, this.body);

        break;
      default:
        this.body.clearShapes();
        this.body.setRectangle(this.width, Math.round(this.height * 0.9), 0);
        _componentsToolsJs2["default"].convertTileCoorToP2(x, y, this.width, this.height, this.body);
        break;
    }
  }

  return BlockingObjects;
})(Phaser.Sprite);

exports["default"] = BlockingObjects;
module.exports = exports["default"];

},{"../components/Tools.js":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Cat = (function (_Phaser$Sprite) {
  _inherits(Cat, _Phaser$Sprite);

  function Cat(game, x, y, key, frame) {
    _classCallCheck(this, Cat);

    _get(Object.getPrototypeOf(Cat.prototype), 'constructor', this).call(this, game, x, y, key, frame);
    this.animations.add('fly', Phaser.Animation.generateFrameNames('frame', 0, 3, '', 0), 6, false, false);
    this.speed = 200; //need to flip the images

    game.physics.p2.enable(this, false); //debug is true
    this.body.data.gravityScale = -0.1; //no gravity to this guy
    this.body.clearShapes();

    this.body.setRectangle(this.width * 0.5, Math.round(this.height * 0.9), 0, 0); //setRectange will apply the shape with anchor to middle
    //reset the body location after setShapes method.. //if I dont want the hassle of setting offsets
    _componentsToolsJs2['default'].convertTileCoorToP2(x, y, this.width, this.height, this.body);
    this.anchor.setTo(0.7, 0.55); //it is better to adjust by anchor rather than using offset above coz the body will sink
    this.body.fixedRotation = true;
    this.body.damping = 0.2;

    //add a timer to check whether its blocked upon an obstacle
    this.lastPositionX = this.x;
    this.heartBeatInterval = 1200;
    this.heartBeatChecker = this.game.time.create(false);
    this.heartBeatChecker.loop(this.heartBeatInterval, this.heartBeatCheck, this);
    this.heartBeatChecker.start();
    this.reverseNow = false;

    this.animations.play('fly', null, true);

    //set health-internal built in params
    this.damageTimer = 0;
    this.setHealth(56); //default maxHealth is 100

    //create 8 balls - 2 of each color

    this.balls = game.add.group(game.world, 'balls', false, true, 1);
    this.balls.createMultiple(2, 'objects3', ['ball_green', 'ball_red', 'ball_yellow', 'ball_blue']);

    this.balls.forEach(function (ball) {
      ball.body.clearShapes();
      ball.body.setCircle(ball.width / 2);
      //ball.body.debug=true;
    }, game.world);

    this.ballticker = 0;

    //console.log("are their children "+this.children.length);
    //damage animation
    this.flashRedEffect = this.game.add.tween(this) //blink blink when hit
    .to({ tint: 0xFF0000 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFB8989 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFFFFFF }, 150, Phaser.Easing.Circular.out);
  }

  _createClass(Cat, [{
    key: 'heartBeatCheck',
    value: function heartBeatCheck() {
      //check for position
      if (Math.abs(this.x - this.lastPositionX) > 20) {
        this.lastPositionX = this.x;
      } else {
        this.reverseNow = true;
      }

      //4 ticks then fire one ball
      if (this.ballticker > 2) {
        var ball = this.balls.getRandom();
        if (ball && !ball.alive) {
          ball.lifespan = 5200;
          //ball.body.debug=true;
          ball.reset(this.x, this.y - 50);
          if (this.scale.x < 0) ball.body.applyForce([800, 1000], this.body.x + 5, this.body.y + 5); //from right -> shoot left
          else ball.body.applyForce([-800, 1000], this.body.x - 5, this.body.y + 5); //-> shoot right
        }
        this.ballticker = 0;
      }

      this.ballticker++;
    }
  }, {
    key: 'damageCat',
    value: function damageCat(amt, interval) {
      if (this.health <= 0.5) return;

      if (this.game.time.now > this.damageTimer) {
        //player cannot keep taking damage every tick!
        this.damage(amt); //use interal function, which will activate the kill if health = 0;
        console.log("cat health " + this.health);

        if (!this.flashRedEffect.isRunning) this.flashRedEffect.start();

        this.damageTimer = this.game.time.now + interval;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.body.velocity.x = this.speed;

      //if stumbled upon an obstacle
      if (this.reverseNow) {
        this.speed *= -1;
        this.scale.x = this.speed > 0 ? 1 : -1;
        this.reverseNow = false;
      }

      this.scale.x = this.speed > 0 ? 1 : -1;
    }
  }]);

  return Cat;
})(Phaser.Sprite);

exports['default'] = Cat;
module.exports = exports['default'];

},{"../components/Tools.js":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Cat = (function (_Phaser$Sprite) {
  _inherits(Cat, _Phaser$Sprite);

  function Cat(game, x, y, key, frame) {
    _classCallCheck(this, Cat);

    _get(Object.getPrototypeOf(Cat.prototype), 'constructor', this).call(this, game, x, y, key, frame);
    this.animations.add('fly', Phaser.Animation.generateFrameNames('catf', 1, 4, '', 0), 6, false, false);
    this.speed = 150;
    this.paused = true;

    var rope = game.add.graphics(this.x, this.y); //belongs to world
    rope.clear();
    rope.beginFill(0x524539);
    rope.drawRect(0, -200, 2, 400);
    rope.endFill();
    rope.name = 'rope';

    this.marina = game.add.sprite(this.x, this.y, 'objects5', 'marina_captured');
    this.marina.name = 'marina';

    game.physics.p2.enable([this, rope, this.marina], false);

    this.body.data.gravityScale = -0.6; //no gravity to this guy

    /*
    this.body.clearShapes();
    this.body.setRectangle(this.width*0.5,this.height,0,0);//setRectange will apply the shape with anchor to middle
    //reset the body location after setShapes method.. //if I dont want the hassle of setting offsets
    Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);
    this.anchor.setTo(0.5,0.5);//it is better to adjust by anchor rather than using offset above coz the body will sink
    */

    this.body.fixedRotation = true;
    this.body.damping = 0.2;

    rope.body.data.gravityScale = 0.4;
    //rope.body.fixedRotation = true;

    this.marina.body.data.gravityScale = 0.6;
    this.marina.anchor.setTo(1, 0.5);
    //this.marina.body.fixedRotation = true;

    game.physics.p2.createRevoluteConstraint(this, [80, -62], rope, [1, -200], 1000);
    game.physics.p2.createRevoluteConstraint(rope, [1, 200], this.marina, [0, 0], 1000);

    this.marinatext = game.add.text(this.x, this.y, " ", {
      font: '15px Century', fill: '#ffffff'
    });
    this.marinatext.anchor.setTo(0.5, 0.5);
    this.marinatext.kill();

    this.animations.play('fly', null, true);

    this.fadesout = new Array();

    this.fadesout[0] = this.game.add.tween(this).to({ alpha: 0.0 }, 4000, Phaser.Easing.Quadratic.Out);
    this.fadesout[1] = this.game.add.tween(rope).to({ alpha: 0.0 }, 4000, Phaser.Easing.Quadratic.Out);
    this.fadesout[2] = this.game.add.tween(this.marina).to({ alpha: 0.0 }, 4000, Phaser.Easing.Quadratic.Out);
  }

  _createClass(Cat, [{
    key: 'say',
    value: function say(speech) {

      this.marinatext.setText(speech);
      this.marinatext.reset(this.marina.x - this.marina.width / 2, this.marina.y - 140);
      this.marinatext.lifespan = 3000;
      //console.log('text location ' + this.bosstext.x + ' '+ this.bosstext.y + ' '+ this.x + ' ' + this.y);
    }
  }, {
    key: 'fadeout',
    value: function fadeout() {
      this.fadesout[0].start();
      this.fadesout[1].start();
      this.fadesout[2].start();
    }
  }, {
    key: 'update',
    value: function update() {
      this.body.velocity.y = -this.speed;

      if (!this.paused) {
        this.body.velocity.x = this.speed;
      }
    }
  }]);

  return Cat;
})(Phaser.Sprite);

exports['default'] = Cat;
module.exports = exports['default'];

},{"../components/Tools.js":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var CheeseScore = (function (_Phaser$Group) {
  _inherits(CheeseScore, _Phaser$Group);

  function CheeseScore(game, xpos, ypos, totalcheese) {
    _classCallCheck(this, CheeseScore);

    _get(Object.getPrototypeOf(CheeseScore.prototype), 'constructor', this).call(this, game);

    this.style = {
      font: 'bold 24px Century', fill: '#cde16d'
    };

    this.totalcheese = totalcheese;
    this.score = 0;
    this.holder = this.create(xpos, ypos, 'objects1', 'cheese1');
    this.scoretext = this.add(new Phaser.Text(game, xpos + 70, ypos + 12, 'x ' + this.score + ' / ' + this.totalcheese, this.style));

    this.fixedToCamera = true;
  }

  _createClass(CheeseScore, [{
    key: 'increaseScore',
    value: function increaseScore(val) {
      this.score += val;
      this.scoretext.setText('x ' + this.score + ' / ' + this.totalcheese);
    }
  }, {
    key: 'addToTotalScore',
    value: function addToTotalScore(ep) {
      _componentsToolsJs2['default'].storeTotalScore(ep, this.score);
    }
  }]);

  return CheeseScore;
})(Phaser.Group);

exports['default'] = CheeseScore;
module.exports = exports['default'];

},{"../components/Tools.js":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Collectables = (function (_Phaser$Sprite) {
  _inherits(Collectables, _Phaser$Sprite);

  function Collectables(game, x, y, key, frame) {
    _classCallCheck(this, Collectables);

    _get(Object.getPrototypeOf(Collectables.prototype), 'constructor', this).call(this, game, x, y, key, frame);
    this.game.physics.p2.enable(this, false); //debug is true
    _componentsToolsJs2['default'].convertTileCoorToP2(x, y, this.width, this.height, this.body);
    if (frame == 'sword1' || frame == 'shurikens') {
      this.game.add.tween(this.scale).to({ x: -1 }, 1500, Phaser.Easing.Circular.InOut, true, 0, Infinity, true);
    } else this.game.add.tween(this).to({ alpha: 0.6 }, 800, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
  }

  return Collectables;
})(Phaser.Sprite);

exports['default'] = Collectables;
module.exports = exports['default'];

},{"../components/Tools.js":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var EnemyStops = (function (_Phaser$Sprite) {
  _inherits(EnemyStops, _Phaser$Sprite);

  function EnemyStops(game, x, y, key, frame) {
    _classCallCheck(this, EnemyStops);

    _get(Object.getPrototypeOf(EnemyStops.prototype), "constructor", this).call(this, game, x, y, key, frame);
    this.game.physics.p2.enable(this, false); //debug is true
    this.body["static"] = true; //this center the anchor to 0.5,0.5
    this.alpha = 0;
    _componentsToolsJs2["default"].convertTileCoorToP2(x, y, this.width, this.height, this.body);
  }

  return EnemyStops;
})(Phaser.Sprite);

exports["default"] = EnemyStops;
module.exports = exports["default"];

},{"../components/Tools.js":2}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnergyBar = (function (_Phaser$Group) {
  _inherits(EnergyBar, _Phaser$Group);

  function EnergyBar(game, xpos, ypos) {
    _classCallCheck(this, EnergyBar);

    _get(Object.getPrototypeOf(EnergyBar.prototype), 'constructor', this).call(this, game);

    this.warningholder = this.create(xpos - 10, ypos, 'objects1', 'warning');
    this.warningholder.alpha = 0;
    this.bar = this.create(xpos + 21, ypos + 13, 'objects1', 'energy');
    this.holder = this.create(xpos, ypos, 'objects1', 'energy_holder');
    this.fixedToCamera = true;
    this.warninganime = game.add.tween(this.warningholder).to({ alpha: 1 }, 600, Phaser.Easing.Quadratic.InOut, false, 0, 0, true);
  }

  _createClass(EnergyBar, [{
    key: 'setValue',
    value: function setValue(val) {
      if (val <= 0) return;
      if (this.tween) this.tween.stop(); //stop the tween if running and flag it for deletion. That's no more after this.
      this.tween = this.game.add.tween(this.bar.scale);
      this.tween.to({ x: val }, 350);
      this.tween.start();
    }
  }, {
    key: 'startWarning',
    value: function startWarning() {
      if (!this.warninganime.isPlaying) {
        this.warninganime.start();
      }
    }
  }]);

  return EnergyBar;
})(Phaser.Group);

exports['default'] = EnergyBar;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var BlockingObjects = (function (_Phaser$Sprite) {
  _inherits(BlockingObjects, _Phaser$Sprite);

  function BlockingObjects(game, x, y, key, frame) {
    _classCallCheck(this, BlockingObjects);

    _get(Object.getPrototypeOf(BlockingObjects.prototype), "constructor", this).call(this, game, x, y, key, frame);
    console.log("door frame name created: " + frame);
    //console.log("before x y width height "+x+" "+y+" "+this.offsetX+" "+this.offsetY+" "+this.right+" "+this.bottom);
    this.game.physics.p2.enable(this, false); //debug is true
    this.body["static"] = true; //this center the anchor to 0.5,0.5
    _componentsToolsJs2["default"].convertTileCoorToP2(x, y, this.width, this.height, this.body);
  }

  return BlockingObjects;
})(Phaser.Sprite);

exports["default"] = BlockingObjects;
module.exports = exports["default"];

},{"../components/Tools.js":2}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HealthBar = (function (_Phaser$Group) {
  _inherits(HealthBar, _Phaser$Group);

  function HealthBar(game, xpos, ypos) {
    _classCallCheck(this, HealthBar);

    _get(Object.getPrototypeOf(HealthBar.prototype), 'constructor', this).call(this, game);

    this.warningholder = this.create(xpos, ypos, 'objects1', 'warning');
    this.warningholder.alpha = 0;
    this.bar = this.create(xpos + 32, ypos + 13, 'objects1', 'health');
    this.holder = this.create(xpos, ypos, 'objects1', 'heart_holder');
    this.fixedToCamera = true;
    this.warninganime = game.add.tween(this.warningholder).to({ alpha: 1 }, 600, Phaser.Easing.Quadratic.InOut, false, 0, 0, true);
  }

  _createClass(HealthBar, [{
    key: 'setValue',
    value: function setValue(val) {
      if (val <= 0) return;
      if (this.tween) this.tween.stop(); //stop the tween if running and flag it for deletion. That's no more after this.
      this.tween = this.game.add.tween(this.bar.scale);
      this.tween.to({ x: val }, 350);
      this.tween.start();
    }
  }, {
    key: 'startWarning',
    value: function startWarning() {
      if (!this.warninganime.isPlaying) {
        this.warninganime.start();
      }
    }
  }]);

  return HealthBar;
})(Phaser.Group);

exports['default'] = HealthBar;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Platforms = (function (_Phaser$Sprite) {
  _inherits(Platforms, _Phaser$Sprite);

  function Platforms(game, x, y, key, frame) {
    _classCallCheck(this, Platforms);

    _get(Object.getPrototypeOf(Platforms.prototype), "constructor", this).call(this, game, x, y, key, frame);
    this.game.physics.p2.enable(this, false); //debug is true
    this.body["static"] = true; //this center the anchor to 0.5,0.5
    _componentsToolsJs2["default"].convertTileCoorToP2(x, y, this.width, this.height, this.body);
  }

  _createClass(Platforms, [{
    key: "update",
    value: function update() {
      //can be moving here..

    }
  }]);

  return Platforms;
})(Phaser.Sprite);

exports["default"] = Platforms;
module.exports = exports["default"];

},{"../components/Tools.js":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Player = (function (_Phaser$Sprite) {
  _inherits(Player, _Phaser$Sprite);

  function Player(game, x, y) {
    var _this = this;

    _classCallCheck(this, Player);

    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, game, x, y, 'player', 'runframe0');
    //player properties
    this.speed = 450;
    this.airSpeed = 300;
    this.jumpPower = 680;
    this.jumpTimer = 0;
    this.hitGroundTimer = 0;
    this.jumpInterval = 750;
    this.damageTimer = 0;
    this.damageInterval = 1200;
    this.heartBeatInterval = 800; //need a timer event to keep check every interval - since energy is going to be spent often!
    this.jump = false;
    this.isMoving = false;
    this.isJumping = false;

    this.game.physics.p2.enable(this, false); //debug is true
    this.body.clearShapes(); //adding any shapes will shift the anchor to 0.5, 0.5
    this.body.addCapsule(30, 35, 0, 0); //cannot add offset!!!, else will have collision trouble with the side tiles
    this.anchor.setTo(.5, .6);

    this.body.fixedRotation = true;
    this.body.damping = 0.2;

    this.attackEnabled = _componentsToolsJs2['default'].getData('attackEnabled');
    this.throwEnabled = _componentsToolsJs2['default'].getData('throwEnabled');

    if (!this.attackEnabled) {
      this.animations.add('run', Phaser.Animation.generateFrameNames('runframe', 1, 8, '', 0), 18, false, false);
      this.stillFrame = 'runframe0';
      this.jumpUpFrame = 'jumpframe1';
      this.jumpDownFrame = 'jumpframe2';
    } else {
      this.changeBody();
    }

    //attack box
    this.hitbox1 = this.addChild(game.make.sprite(this.x, this.y, 'objects1', 'stop'));
    this.game.physics.p2.enable(this.hitbox1, false); //debug is false
    this.hitbox1.body.kinematic = true;
    this.hitbox1.alpha = 0;
    this.hitbox1.kill();

    if (this.throwEnabled) this.throwBody();
    //create 5 shurikens with first frame
    this.shurikens = this.game.add.group(this.game.world, 'shurikens', false, true, 1);
    this.shurikens.createMultiple(20, 'player', 's1');

    this.shurikens.forEach(function (shuriken) {
      shuriken.body.clearShapes();
      shuriken.body.setCircle(shuriken.width / 2);
      shuriken.animations.add('fly', Phaser.Animation.generateFrameNames('s', 1, 3, '', 0), 25, true, false);
      shuriken.body.kinematic = true;
      shuriken.body.damping = 0.2;
      //shuriken.body.debug=true;
    }, this.game.world);

    this.playertext = this.game.add.text(this.x, this.y, " ", {
      font: '15px Century', fill: '#ffffff'
    });
    this.playertext.anchor.setTo(0.5, 0.5);
    this.playertext.kill();
    this.texttimer = 0;

    //damage animation
    this.flashRedEffect = this.game.add.tween(this) //blink blink when hit
    .to({ tint: 0xFF0000 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFB8989 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFFFFFF }, 150, Phaser.Easing.Circular.out);

    //power up animation
    this.flashGreenEffect = this.game.add.tween(this) //blink blink when hit
    .to({ tint: 0x00FF00 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0x83ff83 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFFFFFF }, 150, Phaser.Easing.Circular.out);

    //set health-internal built in params
    this.setHealth(this.maxHealth); //default maxHealth is 100
    //custom energy params
    this.maxEnergy = 100;
    this.energy = this.maxEnergy;
    this.heartBeat = this.game.time.create(false);
    this.heartBeat.loop(this.heartBeatInterval, this.heartBeatCheck, this);
    this.heartBeat.start();
    //check for death
    this.events.onKilled.add(function () {
      _this.game.state.start('preload', true, false, 'gameover');
    }, this);

    this.resting = false;
    this.onslippyplatform = false;

    this.paused = false;

    //keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.keys = this.game.input.keyboard.addKeys({ 'A': Phaser.Keyboard.A, 'S': Phaser.Keyboard.S });
    this.keys.A.onDown.add(function () {
      if (_this.paused) return;if (_this.attackEnabled) _this.attacking = true;
    }, this);
    this.keys.S.onDown.add(function () {
      if (_this.paused) return;
      if (_this.throwEnabled && _this.shurikenHUD) {
        if (_this.shurikenHUD.count < 1) {
          var out = _this.game.cache.getJSON('config').popup.outofammo;
          _this.say(_this.game.rnd.pick(Object.values(out)));
        } else {
          _this.throwing = true;
        }
      }
      //console.log("dossier position: "+this.x+" "+this.y)
    }, this);
  }

  _createClass(Player, [{
    key: 'attack',
    value: function attack() {
      if (this.attackEnabled) {
        //enable hit box
        if (!this.hitbox1.exists) {
          this.animations.play('attack');
          this.sfx.play(this.game.rnd.pick(['pull', 'pull1', 'swipe1']));
          var faceDir = this.scale.x;
          this.hitbox1.reset(this.x + faceDir * 70, this.y - 60);
          this.hitbox1.body.velocity.x = faceDir * 150;
          this.drainEnergy(6);
        }
      }
    }
  }, {
    key: 'throwstars',
    value: function throwstars() {
      //console.log("throwstars "+ this.throwEnabled + " " + this.shurikenscount);
      if (this.throwEnabled) {
        this.animations.play('throw');
        this.sfx.play('swish');
        var faceDir = this.scale.x;
        var shuriken = this.shurikens.getFirstDead(false, this.x, this.y - 70);
        if (shuriken) {
          shuriken.lifespan = 2500;
          shuriken.body.velocity.x = faceDir * 400;
          shuriken.animations.play('fly');

          this.decreaseShuriken(1);
          this.drainEnergy(4);
        }
      }
    }
  }, {
    key: 'heartBeatCheck',
    value: function heartBeatCheck() {
      if (this.paused) return;
      //check for energy drainage
      if (this.isMoving) this.drainEnergy(2);else if (this.isJumping) this.drainEnergy(4);else this.replenishEnergy(2);

      //if this player energy/life lower than 20, flash warning
      //health priority is first when displaying dialogue
      if (this.health < 30) {
        this.healthBar.startWarning();
        if (!this.playertext.alive && this.game.time.now > this.texttimer) {
          var dyingobj = this.game.cache.getJSON('config').popup.dying;
          var texttosay = this.game.rnd.pick(Object.values(dyingobj));
          this.say(texttosay);
          this.texttimer = this.game.time.now + 6000;
        }
      }

      if (this.energy < 30) {
        this.energyBar.startWarning();
        if (!this.playertext.alive && this.game.time.now > this.texttimer) {
          var tiringobj = this.game.cache.getJSON('config').popup.tiring;
          var texttosay = this.game.rnd.pick(Object.values(tiringobj));
          this.say(texttosay);
          this.texttimer = this.game.time.now + 6000;
        }
      }
    }
  }, {
    key: 'say',
    value: function say(speech) {
      if (!this.playertext.alive) {
        this.playertext.fixedToCamera = false;
        this.playertext.setText(speech);
        this.playertext.reset(this.x - this.game.camera.position.x, this.y - this.game.camera.position.y - 120);
        this.playertext.lifespan = 2500;

        this.playertext.fixedToCamera = true;
        //console.log(this.game.camera.position.x+" "+this.game.camera.position.y +" "+ this.playertext.cameraOffset.x+" " + this.playertext.cameraOffset.y+ " " + this.x + " " + this.y);
      }
    }
  }, {
    key: 'animationState',
    value: function animationState() {

      if (this.attacking && !this.inAir && this.frameName == this.stillFrame) {
        //console.log("hitbox body location "+this.hitbox1.body.x+" "+this.hitbox1.body.y);
        if (!this.resting) this.attack();
      }

      if (this.throwing && !this.inAir && this.frameName == this.stillFrame) {
        if (!this.resting) this.throwstars();
      }

      if (this.inAir) {
        if (this.body.velocity.y < -500) this.frameName = this.jumpUpFrame;else if (this.body.velocity.y > 100) this.frameName = this.jumpDownFrame;
      } else if (!this.inAir) {
        if (Math.abs(this.body.velocity.x) > 150) {
          //running
          //drain energy every fixed interval
          this.animations.play('run');
          this.isMoving = true;
        } else {
          //idling
          //add energy slowly
          this.isMoving = false;
          this.isJumping = false;

          if (this.attackEnabled && this.attackAnimation.isPlaying) {} else if (this.throwEnabled && this.throwAnimation.isPlaying) {} //if any of these animation is playing, do nothing
          else {
              this.frameName = this.stillFrame;
            }
        }
      }
    }
  }, {
    key: 'movePlayer',
    value: function movePlayer() {
      //move functions
      //if no energy just skip
      if (this.energy <= 0.5 || this.resting && this.energy < 5) {
        //if ftrueirst time exhaust, rest; second time is check whether is resting, until energy >5
        this.resting = true;
      } else if (this.resting && this.energy > 5) this.resting = false;

      var speedToUse = this.inAir ? this.airSpeed : this.speed;

      if (this.cursors.left.isDown) {
        this.scale.x = -1; //this will make the sprite falls through tilemap!
        if (!this.resting) this.body.moveLeft(speedToUse);
      } else if (this.cursors.right.isDown) {
        this.scale.x = 1;
        if (!this.resting) this.body.moveRight(speedToUse);
      } else {
        //this.body.velocity.x = 0;//if i set this to 0, the slippery platform wont work!

        if (!this.inAir && !this.onslippyplatform) this.body.velocity.x = 0;
      }

      if (!this.resting) {
        if (this.cursors.up.isDown || this.spaceBar.isDown) {
          this.jump = true;
        } else if (this.cursors.up.isUp || this.spaceBar.isUp) this.jump = false;

        this.checkJump();
      }
    }
  }, {
    key: 'checkJump',
    value: function checkJump() {
      if (this.jump && this.game.time.now > this.jumpTimer && !this.inAir) {
        this.body.moveUp(this.jumpPower);
        this.sfx.play('jump');
        this.jumpTimer = this.game.time.now + this.jumpInterval;
        this.isJumping = true;
      }
    }
  }, {
    key: 'flash',
    value: function flash(tint) {
      var flashEffect = undefined;
      switch (tint) {
        case 'red':
          flashEffect = this.flashRedEffect;
          break;
        case 'green':
          flashEffect = this.flashGreenEffect;
          break;
      }

      if (!flashEffect.isRunning) flashEffect.start();
    }
  }, {
    key: 'drainEnergy',
    value: function drainEnergy(amt) {
      if (this.energy <= 0.5) return;
      this.energy -= amt;
      this.energyBar.setValue(this.energy / this.maxEnergy);
    }
  }, {
    key: 'replenishEnergy',
    value: function replenishEnergy(amt) {
      if (this.energy >= this.maxEnergy) return;
      if (this.energy + amt > this.maxEnergy) this.energy = this.maxEnergy;else this.energy += amt;
      this.energyBar.setValue(this.energy / this.maxEnergy);
    }
  }, {
    key: 'drainLife',
    value: function drainLife(amt) {
      if (this.health <= 0.5) return;
      this.damage(amt); //use interal function, which will activate the kill if health = 0;
      this.healthBar.setValue(this.health / this.maxHealth);
    }
  }, {
    key: 'replenishLife',
    value: function replenishLife(amt) {
      this.heal(amt); //this takes care of the checking of maxHealth ...
      this.healthBar.setValue(this.health / this.maxHealth);
    }
  }, {
    key: 'increaseShuriken',
    value: function increaseShuriken(amt) {
      this.shurikenHUD.increaseCount(amt);
    }
  }, {
    key: 'decreaseShuriken',
    value: function decreaseShuriken(amt) {
      this.shurikenHUD.decreaseCount(amt);
    }
  }, {
    key: 'damagePlayer',
    value: function damagePlayer(amt, dmgInterval) {
      var interval = dmgInterval ? dmgInterval : this.damageInterval;

      if (this.game.time.now > this.damageTimer) {
        //player cannot keep taking damage every tick!
        this.drainLife(amt);
        console.log("player health " + this.health);
        this.flash('red');
        this.sfx.play('damaged');
        this.damageTimer = this.game.time.now + interval;
      }
    }
  }, {
    key: 'changeBody',
    value: function changeBody() {
      //reset existing all animation frames
      this.animations.add('run', Phaser.Animation.generateFrameNames('swordframe', 1, 8, '', 0), 18, false, false);
      this.stillFrame = 'hitframe0';
      this.jumpUpFrame = 'swordjumpframe1';
      this.jumpDownFrame = 'swordjumpframe2';

      //new attack animation
      this.attackAnimation = this.animations.add('attack', Phaser.Animation.generateFrameNames('hitframe', 1, 3, '', 0), 12, false, false);

      _componentsToolsJs2['default'].storeData('attackEnabled', true);
      this.attackEnabled = true;
    }
  }, {
    key: 'throwBody',
    value: function throwBody() {
      //add throw animation
      this.throwAnimation = this.animations.add('throw', Phaser.Animation.generateFrameNames('throwframe', 1, 4, '', 0), 12, false, false);

      _componentsToolsJs2['default'].storeData('throwEnabled', true);
      this.throwEnabled = true;
    }
  }, {
    key: 'update',
    value: function update() {
      //override sprite's update function

      if (this.paused) return;

      var wasAir = this.inAir; //previously in the air?
      this.inAir = !_componentsToolsJs2['default'].checkIfOnFloor(this.game, this);
      if (!this.inAir && wasAir) {
        //console.log("hit ground");
        _componentsToolsJs2['default'].playSound(this.sfx, ['land']);
      }
      this.animationState();

      this.movePlayer();

      if (this.attackEnabled && !this.attackAnimation.isPlaying) {
        if (this.hitbox1.exists) this.hitbox1.kill();
        this.attacking = false;
      }

      if (this.throwEnabled && !this.throwAnimation.isPlaying) {
        this.throwing = false;
      }
    }
  }]);

  return Player;
})(Phaser.Sprite);

exports['default'] = Player;
module.exports = exports['default'];

},{"../components/Tools.js":2}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Popup = (function (_Phaser$Image) {
  _inherits(Popup, _Phaser$Image);

  function Popup(game, x, y, paneltype) {
    _classCallCheck(this, Popup);

    //full content height = 460
    _get(Object.getPrototypeOf(Popup.prototype), 'constructor', this).call(this, game, x, y, 'popup');

    this.name = 'popup';

    this.titleStyle = {
      font: 'bold 40px Century', fill: '#d9d21a'
    };

    this.defaultStyle = {
      font: 'bold 26px Century', fill: '#131a55'
    };

    this.optionStyle = {
      font: 'bold 22px Century', fill: '#131a55'
    };

    this.descriptionStyle = {
      font: 'bold 15px Century', fill: '#131a55'
    };

    this.highlightStyle = {
      font: 'bold 26px Century', fill: '#cde16d'
    };
    this.paneltype = paneltype;
    //paneltype: 1 - menuscreen, 2 - ingame pause, 3 - description
    this.sfx = this.game.add.audioSprite('sfx');
    switch (paneltype) {
      case 1:
        this.title = new Phaser.Text(game, 512, 188, 'Options', this.titleStyle);
        this.title.anchor.setTo(0.5, 0.5);
        this.title.setShadow(2, 2);

        if (_componentsToolsJs2['default'].getData('mutetheme')) this.music = new Phaser.Text(game, 340, 245, 'Play Music', this.defaultStyle);else this.music = new Phaser.Text(game, 340, 245, 'Mute Music', this.defaultStyle);
        if (_componentsToolsJs2['default'].getData('mutesound')) this.sound = new Phaser.Text(game, 340, 305, 'Play Sound', this.defaultStyle);else this.sound = new Phaser.Text(game, 340, 305, 'Mute Sound', this.defaultStyle);

        this.instructions = new Phaser.Text(game, 340, 365, 'Instructions', this.defaultStyle);
        this.credits = new Phaser.Text(game, 340, 425, 'Credits', this.defaultStyle);
        this.back = new Phaser.Text(game, 340, 485, 'Back', this.defaultStyle);

        this.addChild(this.title);
        this.addChild(this.music);
        this.addChild(this.sound);
        this.addChild(this.instructions);
        this.addChild(this.credits);
        this.addChild(this.back);

        this.highlight(this.music);
        break;
      case 2:
        this.title = new Phaser.Text(game, 512, 188, 'Paused', this.titleStyle);
        this.title.anchor.setTo(0.5, 0.5);
        this.title.setShadow(2, 2);
        this.resume = new Phaser.Text(game, 340, 245, 'Resume Game', this.defaultStyle);
        this.restart = new Phaser.Text(game, 340, 305, 'Restart Episode', this.defaultStyle);
        if (_componentsToolsJs2['default'].getData('mutetheme')) this.music = new Phaser.Text(game, 340, 365, 'Play Music', this.defaultStyle);else this.music = new Phaser.Text(game, 340, 365, 'Mute Music', this.defaultStyle);
        if (_componentsToolsJs2['default'].getData('mutesound')) this.sound = new Phaser.Text(game, 340, 425, 'Play Sound', this.defaultStyle);else this.sound = new Phaser.Text(game, 340, 425, 'Mute Sound', this.defaultStyle);
        this.instructions = new Phaser.Text(game, 340, 485, 'Instructions', this.defaultStyle);
        this.quit = new Phaser.Text(game, 340, 545, 'Quit to Main Menu', this.defaultStyle);

        this.addChild(this.title);
        this.addChild(this.resume);
        this.addChild(this.restart);
        this.addChild(this.music);
        this.addChild(this.sound);
        this.addChild(this.instructions);
        this.addChild(this.quit);

        this.highlight(this.resume);

        break;
      case 3:
        //used in instructions, credits & in-game tips
        this.title = new Phaser.Text(game, 512, 188, 'Title', this.titleStyle);
        this.title.anchor.setTo(0.5, 0.5);
        this.title.setShadow(2, 2);

        this.description = new Phaser.Text(game, 332, 245, 'Description', this.descriptionStyle);
        this.back = new Phaser.Text(game, 340, 560, 'Got it!', this.defaultStyle);
        this.addChild(this.title);
        this.addChild(this.description);
        this.addChild(this.back);

        this.highlight(this.back);
        break;
      case 4:
        //used in Continue menu option
        this.title = new Phaser.Text(game, 512, 188, 'Choose Episode', this.titleStyle);
        this.title.anchor.setTo(0.5, 0.5);
        this.title.setShadow(2, 2);

        this.addChild(this.title);

        var epArray = _componentsToolsJs2['default'].getData('played_ep');
        if (epArray) {
          for (var k = 0, ypos = 240; k < epArray.length; k++, ypos += 52) {
            var epdesc = this.game.cache.getJSON('config').popup.episodes[epArray[k]];
            console.log("ya " + epdesc);
            var datatxt = new Phaser.Text(game, 340, ypos, epArray[k] + '. ' + epdesc, this.defaultStyle);
            this.addChild(datatxt);
          }
        } else {//still show ep1
          //show nothing
          //let epdesc = this.game.cache.getJSON('config').popup.episodes.ep1;
          //let datatxt = new Phaser.Text(game,340,245,'ep1. '+epdesc,this.defaultStyle);
          //this.addChild(datatxt);
        }

        var back = new Phaser.Text(game, 340, 560, 'Back', this.defaultStyle);

        this.addChild(back);

        break;
    }
    this.selectionArray = new Array();
    for (var i = 1; i < this.children.length; i++) {
      this.selectionArray.push(this.children[i]);
    }if (this.paneltype == '4') {
      //quick hack to make the selection correct for 'continue'
      this.cursorMoved(Phaser.KeyCode.UP);
      this.cursorMoved(Phaser.KeyCode.UP);
    }

    //this.selectionArray = new Array(this.music,this.sound,this.keyboard,this.credits,this.back);
    //select first element

    //menu sound effect
    this.sfx = this.game.add.audioSprite('sfx');
  }

  _createClass(Popup, [{
    key: 'setTitle',
    value: function setTitle(title) {
      this.title.setText(title);
    }
  }, {
    key: 'setDescription',
    value: function setDescription(text, y_offset) {
      this.description.setText(text);
      this.description.y += y_offset;
    }
  }, {
    key: 'addImage',
    value: function addImage(image) {
      this.addChild(image);
    }
  }, {
    key: 'cursorMoved',
    value: function cursorMoved(key) {
      if (key === Phaser.KeyCode.UP) {
        //pop then unshift
        this.selectionArray.unshift(this.selectionArray.pop());
        this.select(this.selectionArray[0]);
      } else if (key === Phaser.KeyCode.DOWN) {
        //shift then push
        this.selectionArray.push(this.selectionArray.shift());
        this.select(this.selectionArray[0]);
      }
      this.sfx.play('menuselect');
    }
  }, {
    key: 'optionEntered',
    value: function optionEntered() {
      var selectedtext = this.selectionArray[0].text;
      switch (selectedtext) {
        case 'Mute Music':
          this.selectionArray[0].setText('Play Music');
          break;
        case 'Mute Sound':
          this.selectionArray[0].setText('Play Sound');
          break;
        case 'Play Music':
          this.selectionArray[0].setText('Mute Music');
          break;
        case 'Play Sound':
          this.selectionArray[0].setText('Mute Sound');
          break;
      }
      if (this.paneltype == 3) return 'Got it!';else return selectedtext;
    }
  }, {
    key: 'select',
    value: function select(textObj) {
      var _this = this;

      //reset everything
      this.selectionArray.forEach(function (textObj) {
        _this.reset(textObj);
      });
      this.highlight(textObj);
    }
  }, {
    key: 'highlight',
    value: function highlight(textObj) {
      textObj.setStyle(this.highlightStyle);
      textObj.setShadow(2, 2, '#9a753a', 0.5);
    }
  }, {
    key: 'reset',
    value: function reset(textObj) {
      textObj.setStyle(this.defaultStyle);
      textObj.setShadow();
    }
  }]);

  return Popup;
})(Phaser.Image);

exports['default'] = Popup;
module.exports = exports['default'];

},{"../components/Tools.js":2}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var RatBoss = (function (_Phaser$Sprite) {
  _inherits(RatBoss, _Phaser$Sprite);

  function RatBoss(game, x, y, key, frame) {
    _classCallCheck(this, RatBoss);

    _get(Object.getPrototypeOf(RatBoss.prototype), 'constructor', this).call(this, game, x, y, key, frame);
    this.action = this.animations.add('action', ['bodyf1', 'bodyf2'], 4, false, false);
    game.physics.p2.enable(this, false); //debug is true
    this.body.clearShapes();
    this.body.loadPolygon('bossbody', 'bossbody');
    _componentsToolsJs2['default'].convertTileCoorToP2(x, y, this.width, this.height, this.body);
    //this.anchor.setTo(0.5,0.5);//it is better to adjust by anchor rather than using offset above coz the body will sink
    this.body.fixedRotation = true;
    //this.body.kinematic = true;
    this.body.mass = 100; //anchor this dynamic body to ground

    this.detectionrange = 220;
    this.damageTimer = 0;
    this.health = {
      max: 80,
      now: 80
    };

    this.attack = false;
    this.startscene = false;
    this.attackTimer = 0;

    this.bosstext = game.add.text(this.x, this.y, " ", {
      font: '17px Century', fill: '#ffffff'
    });
    this.bosstext.anchor.setTo(0.5, 0.5);
    this.bosstext.kill();

    //add arm

    this.rightarm = game.add.sprite(this.x, this.y, key, 'rightarm');
    this.rightarm.name = 'rightarm';
    game.physics.p2.enable(this.rightarm, false);
    this.rightarm.body.clearShapes();
    this.rightarm.body.loadPolygon('rightarm', 'rightarm');
    this.rightarm.body.data.gravityScale = 0.8;
    this.bossconstraint = game.physics.p2.createRevoluteConstraint(this, [0, -50], this.rightarm, [600, -165], 3000);

    this.rightarm.body.onBeginContact.add(this.shake, this);

    //damage animation
    this.flashRedEffect = this.game.add.tween(this) //blink blink when hit
    .to({ tint: 0xFF0000 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFB8989 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFFFFFF }, 150, Phaser.Easing.Circular.out);

    this.heartBeat = this.game.time.create(false);
    this.heartBeat.loop(4200, this.heartBeatCheck, this);
    this.heartBeat.start();

    this.events.onKilled.add(function () {
      //remove rock

    }, this);
  }

  _createClass(RatBoss, [{
    key: 'shake',
    value: function shake(bodyA, bodyB, shapeA, shapeB, contactEq, sfx) {
      if (bodyB) {
        //console.log("bodyB "+ bodyB.id);
        if (bodyB.id == this.player.body.id) {
          console.log("body player");
          return;
        }
        //touched floor. shake it!
        this.game.camera.shake(0.03, 600, true, Phaser.Camera.SHAKE_VERTICAL, true);
        this.sfx.play('bosshit');
      }
    }
  }, {
    key: 'damageRat',
    value: function damageRat(amt, interval) {
      if (this.health.now <= 0.5) {
        //say something?

        this.say('NooooOOOOooOOOoOOOooooo....');

        //kill the guy
        this.game.physics.p2.removeConstraint(this.bossconstraint);
        this.rightarm.kill();
        this.kill();
        return;
      }

      if (this.game.time.now > this.damageTimer) {
        //player cannot keep taking damage every tick!
        this.health.now -= amt; //use interal function, which will activate the kill if health = 0;
        console.log("rat boss health " + this.health.now);

        if (!this.flashRedEffect.isRunning) this.flashRedEffect.start();

        this.damageTimer = this.game.time.now + interval;
      }
    }
  }, {
    key: 'heartBeatCheck',
    value: function heartBeatCheck() {
      if (this.startscene) {
        if (this.textarray) {
          if (this.textcounter == 4) {
            this.startscene = false;
            return;
          }
          this.say(this.textarray[this.textcounter++]);
        } else {
          this.textarray = Object.values(this.game.cache.getJSON('config').popup.ep6.bosstext);
          this.textcounter = 0;
        }
      }

      if (this.attack && this.alive) {
        //left side attack
        //this.rightarm.body.applyForce([-800,1000],this.rightarm.body.x-50,this.rightarm.body.y);
        this.rightarm.body.applyForce([4000, 5000], this.rightarm.body.x + 50, this.rightarm.body.y);
      }
    }
  }, {
    key: 'say',
    value: function say(speech) {

      this.bosstext.setText(speech);
      this.bosstext.reset(this.x - 20, this.y - 172);
      this.bosstext.lifespan = 3000;

      //console.log('text location ' + this.bosstext.x + ' '+ this.bosstext.y + ' '+ this.x + ' ' + this.y);
    }
  }, {
    key: 'update',
    value: function update() {

      /*
      if(this.player.x < this.x){
        this.scale.x = 1;//face the player
      }
      else{
        this.scale.x = -1;
      }*/

      var distFromPlayer = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y); //where does the x y starts, is it based on the anchor?
      if (this.alive && Math.round(distFromPlayer) < this.detectionrange) {
        if (this.player.x < this.x) {
          //to left
          this.body.moveLeft(200);
        } else {
          this.body.moveRight(200);
        }
      }

      if (this.attack && !this.action.isPlaying && this.alive) this.animations.play('action', null, true);
    }
  }]);

  return RatBoss;
})(Phaser.Sprite);

exports['default'] = RatBoss;
module.exports = exports['default'];

},{"../components/Tools.js":2}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var RatGrunt = (function (_Phaser$Sprite) {
  _inherits(RatGrunt, _Phaser$Sprite);

  function RatGrunt(game, x, y, key, frame) {
    var _this = this;

    _classCallCheck(this, RatGrunt);

    _get(Object.getPrototypeOf(RatGrunt.prototype), 'constructor', this).call(this, game, x, y, key, frame);
    this.animations.add('walk', Phaser.Animation.generateFrameNames('frame', 1, 4, '', 0), 6, false, false);
    this.attacking = this.animations.add('attack', ['frame0', 'ratattack'], 4, false, false);
    this.speed = 200 + game.rnd.pick([-20, +20]); //need to flip the images
    this.detectionrange = 150;
    this.game.physics.p2.enable(this, false); //debug is true
    this.paused = false;

    this.body.clearShapes();
    this.body.setRectangle(this.width * 0.4, Math.round(this.height * 0.9), 0, 0); //setRectange will apply the shape with anchor to middle
    //reset the body location after setShapes method.. //if I dont want the hassle of setting offsets
    _componentsToolsJs2['default'].convertTileCoorToP2(x, y, this.width, this.height, this.body);
    //add a non colliding shape on its head as base to jump - with no damage to player
    this.body.addRectangle(80, 5, 0, -110);
    this.anchor.setTo(0.6, 0.45); //it is better to adjust by anchor rather than using offset above coz the body will sink
    this.body.fixedRotation = true;
    this.body.damping = 0.4;

    //add a timer to check whether its blocked upon an obstacle
    this.lastPositionX = this.x;
    this.stumbledInterval = 1200;
    this.stumbledChecker = this.game.time.create(false);
    this.stumbledChecker.loop(this.stumbledInterval, this.stumbledCheck, this);
    this.stumbledChecker.start();
    this.reverseNow = false;

    this.animations.play('walk', null, true);

    //set health-internal built in params
    this.damageTimer = 0;
    this.setHealth(24); //default maxHealth is 100

    //damage animation
    this.flashRedEffect = this.game.add.tween(this) //blink blink when hit
    .to({ tint: 0xFF0000 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFB8989 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFFFFFF }, 150, Phaser.Easing.Circular.out);

    //power up animation
    this.flashGreenEffect = this.game.add.tween(this) //blink blink when hit
    .to({ tint: 0x00FF00 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0x83ff83 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFFFFFF }, 150, Phaser.Easing.Circular.out);

    this.events.onKilled.add(function () {
      _this.afterKilled();
    }, this);
    this.events.onRevived.add(function () {
      _this.flash('green');
    }, this);
  }

  _createClass(RatGrunt, [{
    key: 'afterKilled',
    value: function afterKilled() {
      var _this2 = this;

      this.game.time.events.add(7800, function () {
        _this2.revive(24);
      }, this.game);
    }
  }, {
    key: 'flash',
    value: function flash(tint) {
      var flashEffect = undefined;
      switch (tint) {
        case 'red':
          flashEffect = this.flashRedEffect;
          break;
        case 'green':
          flashEffect = this.flashGreenEffect;
          break;
      }

      if (!flashEffect.isRunning) flashEffect.start();
    }
  }, {
    key: 'stumbledCheck',
    value: function stumbledCheck() {
      if (!this.attacking.isPlaying) {
        if (Math.abs(this.x - this.lastPositionX) > 20) {
          this.lastPositionX = this.x;
        } else {
          //console.log("help rat is stucked");
          this.reverseNow = true;
        }
      }
    }
  }, {
    key: 'damageRat',
    value: function damageRat(amt, interval) {
      if (this.health <= 0.5) return;

      if (this.game.time.now > this.damageTimer) {
        //player cannot keep taking damage every tick!
        this.damage(amt); //use interal function, which will activate the kill if health = 0;
        console.log("rat health " + this.health);

        this.flash('red');

        this.damageTimer = this.game.time.now + interval;
      }
    }
  }, {
    key: 'attack',
    value: function attack(distFromPlayer) {
      if (!this.attacking.isPlaying && this.alive) this.sfx.play(this.game.rnd.pick(['mnstr7', 'mnstr8', 'mnstr9']));
      if (this.player.x < this.x) this.scale.x = -1; //face the player
      else this.scale.x = 1;
      this.animations.play('attack');
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.paused) return;
      var distFromPlayer = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y); //where does the x y starts, is it based on the anchor?
      if (Math.round(distFromPlayer) < this.detectionrange) {
        this.attack(distFromPlayer);
      }

      if (!this.attacking.isPlaying) {
        this.body.velocity.x = this.speed;
        this.animations.play('walk', null, true);

        //if stumbled upon an obstacle
        if (this.reverseNow) {
          this.speed *= -1;
          this.scale.x = this.speed > 0 ? 1 : -1;
          this.reverseNow = false;
        }

        this.scale.x = this.speed > 0 ? 1 : -1;
      }
    }
  }]);

  return RatGrunt;
})(Phaser.Sprite);

exports['default'] = RatGrunt;
module.exports = exports['default'];

},{"../components/Tools.js":2}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var RatNinja = (function (_Phaser$Sprite) {
  _inherits(RatNinja, _Phaser$Sprite);

  function RatNinja(game, x, y, key, frame) {
    var _this = this;

    _classCallCheck(this, RatNinja);

    _get(Object.getPrototypeOf(RatNinja.prototype), 'constructor', this).call(this, game, x, y, key, frame);
    this.throwing = this.animations.add('throw', ['throwframe1', 'throwframe2', 'throwframe3'], 12, false, false);

    this.game.physics.p2.enable(this, false); //debug is true

    this.body.clearShapes();
    this.body.setRectangle(this.width * 0.4, Math.round(this.height * 0.8), 0, 0); //setRectange will apply the shape with anchor to middle
    //reset the body location after setShapes method.. //if I dont want the hassle of setting offsets
    _componentsToolsJs2['default'].convertTileCoorToP2(x, y, this.width, this.height, this.body);
    //add a non colliding shape on its head as base to jump - with no damage to player
    this.body.addRectangle(80, 5, 0, -100);
    this.anchor.setTo(0.6, 0.45); //it is better to adjust by anchor rather than using offset above coz the body will sink
    this.body.fixedRotation = true;

    this.detectionrange = 500;
    //set health-internal built in params
    this.damageTimer = 0;
    this.throwTimer = 0;
    this.throwInterval = 2400;
    this.setHealth(40); //default maxHealth is 100

    //add shurikens
    this.shurikens = this.game.add.group(this.game.world, 'ninjashurikens', false, true, 1);
    this.shurikens.createMultiple(10, key, 's1');

    this.shurikens.forEach(function (shuriken) {
      shuriken.body.clearShapes();
      shuriken.body.setCircle(shuriken.width / 2);
      shuriken.animations.add('fly', Phaser.Animation.generateFrameNames('s', 1, 3, '', 0), 25, true, false);
      shuriken.body.kinematic = true;
      shuriken.body.damping = 0.2;
      //shuriken.body.debug=true;
    }, this.game.world);

    //damage animation
    this.flashRedEffect = this.game.add.tween(this) //blink blink when hit
    .to({ tint: 0xFF0000 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFB8989 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFFFFFF }, 150, Phaser.Easing.Circular.out);

    //power up animation
    this.flashGreenEffect = this.game.add.tween(this) //blink blink when hit
    .to({ tint: 0x00FF00 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0x83ff83 }, 50, Phaser.Easing.Bounce.out).to({ tint: 0xFFFFFF }, 150, Phaser.Easing.Circular.out);

    this.events.onKilled.add(function () {
      _this.afterKilled();
    }, this);
    this.events.onRevived.add(function () {
      _this.flash('green');
    }, this);
  }

  _createClass(RatNinja, [{
    key: 'afterKilled',
    value: function afterKilled() {
      var _this2 = this;

      this.game.time.events.add(7800, function () {
        _this2.revive(40);
      }, this.game);
    }
  }, {
    key: 'flash',
    value: function flash(tint) {
      var flashEffect = undefined;
      switch (tint) {
        case 'red':
          flashEffect = this.flashRedEffect;
          break;
        case 'green':
          flashEffect = this.flashGreenEffect;
          break;
      }

      if (!flashEffect.isRunning) flashEffect.start();
    }
  }, {
    key: 'damageRat',
    value: function damageRat(amt, interval) {
      if (this.health <= 0.5) return;

      if (this.game.time.now > this.damageTimer) {
        //player cannot keep taking damage every tick!
        this.damage(amt); //use interal function, which will activate the kill if health = 0;
        console.log("rat ninja health " + this.health);
        this.flash('red');

        this.damageTimer = this.game.time.now + interval;
      }
    }
  }, {
    key: 'throwStars',
    value: function throwStars() {
      this.animations.play('throw');
      var faceDir = this.scale.x;
      var shuriken = this.shurikens.getFirstDead(false, this.x + faceDir * 50, this.y + 15);
      if (shuriken) {
        shuriken.lifespan = 2500;
        shuriken.body.velocity.x = faceDir * 320;
        shuriken.animations.play('fly');
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.paused) return;
      var distFromPlayer = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y);
      if (Math.round(distFromPlayer) < this.detectionrange) {
        if (this.player.x < this.x) this.scale.x = -1; //face the player
        else this.scale.x = 1;

        if (this.game.time.now > this.throwTimer && this.alive) {
          this.throwStars();
          this.throwTimer = this.game.time.now + this.throwInterval;
        }
      }

      if (!this.throwing.isPlaying) {
        this.frameName = 'throwframe1';
      }
    }
  }]);

  return RatNinja;
})(Phaser.Sprite);

exports['default'] = RatNinja;
module.exports = exports['default'];

},{"../components/Tools.js":2}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _RatGruntJs = require("./RatGrunt.js");

var _RatGruntJs2 = _interopRequireDefault(_RatGruntJs);

var RatSoldier = (function (_RatGrunt) {
  _inherits(RatSoldier, _RatGrunt);

  function RatSoldier(game, x, y, key, frame) {
    _classCallCheck(this, RatSoldier);

    _get(Object.getPrototypeOf(RatSoldier.prototype), 'constructor', this).call(this, game, x, y, key, frame);
    this.attacking = this.animations.add('attack', ['hitframe0', 'hitframe1', 'hitframe2', 'hitframe3'], 2.5, false, false);
    this.detectionrange = 260;
    this.hitrange = 150;
    this.hitspeed = 140; //slower hit approch velocity
    this.hitinterval = 1200;
    this.hittimer = 0;
    //set health-internal built in params
    this.setHealth(40); //default maxHealth is 100

    this.hitbox1 = this.addChild(game.make.sprite(this.x, this.y, 'objects1', 'stop'));
    this.game.physics.p2.enable(this.hitbox1, false); //debug is false
    this.hitbox1.body.kinematic = true;
    this.hitbox1.name = 'soldierclub';
    this.hitbox1.alpha = 0;
    this.hitbox1.kill();
  }

  _createClass(RatSoldier, [{
    key: 'afterKilled',
    value: function afterKilled() {
      var _this = this;

      //when a rat its dead, its gone - any hitbox should be killed too
      this.hitbox1.kill();
      this.game.time.events.add(7200, function () {
        _this.revive(40);
        _this.hitbox1.revive();
      }, this.game);
    }
  }, {
    key: 'attack',
    value: function attack(distFromPlayer) {
      if (this.player.x < this.x) {
        this.scale.x = -1; //face the player
      } else {
          this.scale.x = 1;
        }
      var faceDir = this.scale.x;
      if (Math.round(distFromPlayer) > 160) this.body.velocity.x = faceDir * this.hitspeed; //keep pushing n hitting the player
      if (!this.hitbox1.exists) {
        //there should be a DELAY between hitting player..
        this.animations.play('attack'); //need to sync the animation action and the hit timer
        if (this.game.time.now > this.hittimer && this.alive) {
          this.hitbox1.reset(this.x + faceDir * 10, this.y + 30);
          this.hitbox1.body.velocity.x = faceDir * 150;
          this.hitbox1.lifespan = 600;
          this.hittimer = this.game.time.now + this.hitinterval;
        }
      }
    }
  }, {
    key: 'update',
    value: function update() {
      _get(Object.getPrototypeOf(RatSoldier.prototype), 'update', this).call(this);

      if (!this.attacking.isPlaying && this.hitbox1.exists) {
        this.hitbox1.kill();
      }
    }
  }]);

  return RatSoldier;
})(_RatGruntJs2['default']);

exports['default'] = RatSoldier;
module.exports = exports['default'];

},{"./RatGrunt.js":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShurikenHUD = (function (_Phaser$Group) {
  _inherits(ShurikenHUD, _Phaser$Group);

  function ShurikenHUD(game, xpos, ypos) {
    _classCallCheck(this, ShurikenHUD);

    _get(Object.getPrototypeOf(ShurikenHUD.prototype), 'constructor', this).call(this, game);

    this.style = {
      font: 'bold 20px Century', fill: '#f6f6de'
    };

    this.count = 0;
    this.holder = this.create(xpos, ypos, 'objects4', 'shurikens');
    this.counttext = this.add(new Phaser.Text(game, xpos + 70, ypos + 12, 'x ' + this.count, this.style));

    this.holder.alpha = 0;
    this.counttext.alpha = 0;

    this.fixedToCamera = true;
  }

  _createClass(ShurikenHUD, [{
    key: 'increaseCount',
    value: function increaseCount(val) {
      if (this.holder.alpha == 0) this.holder.alpha = 1;
      if (this.counttext.alpha == 0) this.counttext.alpha = 1;
      this.count += val;
      this.counttext.setText('x ' + this.count);
    }
  }, {
    key: 'decreaseCount',
    value: function decreaseCount(val) {
      this.count -= val;
      this.counttext.setText('x ' + this.count);
      if (this.count < 1) {
        this.holder.alpha = 0;
        this.counttext.alpha = 0;
      }
    }
  }]);

  return ShurikenHUD;
})(Phaser.Group);

exports['default'] = ShurikenHUD;
module.exports = exports['default'];

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Stalacites = (function (_Phaser$Sprite) {
  _inherits(Stalacites, _Phaser$Sprite);

  function Stalacites(game, x, y, key, frame) {
    _classCallCheck(this, Stalacites);

    _get(Object.getPrototypeOf(Stalacites.prototype), "constructor", this).call(this, game, x, y, key, frame);
    this.game.physics.p2.enable(this, false); //debug is true
    this.body["static"] = true; //this center the anchor to 0.5,0.5
    _componentsToolsJs2["default"].convertTileCoorToP2(x, y, this.width, this.height, this.body);

    this.body.clearShapes();
    this.body.loadPolygon('stalacites', frame);
  }

  _createClass(Stalacites, [{
    key: "update",
    value: function update() {}
  }]);

  return Stalacites;
})(Phaser.Sprite);

exports["default"] = Stalacites;
module.exports = exports["default"];

},{"../components/Tools.js":2}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TitleText = (function (_Phaser$Text) {
  _inherits(TitleText, _Phaser$Text);

  function TitleText(game, text) {
    _classCallCheck(this, TitleText);

    _get(Object.getPrototypeOf(TitleText.prototype), 'constructor', this).call(this, game, 512, 384, text);
    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera = true;

    var style = {
      font: 'bold 36px Century', fill: '#ffffff'
    };

    this.setStyle(style);

    game.add.tween(this).to({ alpha: 0 }, 4600, Phaser.Easing.Quadratic.Out, true);
  }

  _createClass(TitleText, [{
    key: 'update',
    value: function update() {
      if (this.alpha == 0) this.destroy();
    }
  }]);

  return TitleText;
})(Phaser.Text);

exports['default'] = TitleText;
module.exports = exports['default'];

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WavesObjects = (function (_Phaser$Sprite) {
  _inherits(WavesObjects, _Phaser$Sprite);

  function WavesObjects(game, x, y, key, frame) {
    _classCallCheck(this, WavesObjects);

    _get(Object.getPrototypeOf(WavesObjects.prototype), "constructor", this).call(this, game, x, y, key, frame);
    //100 * ((x + y) % 10)
    this.anchor.setTo(0, 1); //you need an anchor to tween!
    //console.log("i am at "+x + " "+Math.sin(x * (Math.PI/180)));
    this.game.add.tween(this).to({ y: y - Math.sin(x * (Math.PI / 180)) * 8 }, 800, Phaser.Easing.Back.In, true, 0, Infinity, true);
  }

  return WavesObjects;
})(Phaser.Sprite);

exports["default"] = WavesObjects;
module.exports = exports["default"];

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Boot = (function () {
  function Boot() {
    _classCallCheck(this, Boot);
  }

  _createClass(Boot, [{
    key: 'preload',
    value: function preload() {

      //preload for menu screen
      this.load.image('splashscreen', 'assets/menu/splashscreenbare.png');
      this.load.image('animeffect', 'assets/menu/animeffect.png');
      this.load.image('start', 'assets/menu/startselect.png');
      this.load.image('continue', 'assets/menu/continueselect.png');
      this.load.image('options', 'assets/menu/optionsselect.png');
      this.load.image('wordings', 'assets/menu/wordings.png');
      this.load.image('popup', 'assets/menu/popuppanel.png');

      //load SFX first in boot
      this.load.audioSprite('sfx', ['assets/audio/sfx/sfx.ogg', 'assets/audio/sfx/sfx.mp3', 'assets/audio/sfx/sfx.m4a', 'assets/audio/sfx/sfx.mc3'], 'assets/audio/sfx/sfx.json');
      //standard configuration settings.. popups, tips, dialouges etc
      this.load.json('config', 'assets/config/Config.json');

      this.stage.backgroundColor = "#22226a";
      //need a loading bar
      this.load.image('preloader', 'assets/menu/loadingbar.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.input.maxPointers = 1;
      this.input.mspointer.capture = false;
      this.state.start('menu');
    }
  }]);

  return Boot;
})();

exports['default'] = Boot;
module.exports = exports['default'];

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsEntranceDoorJs = require("../prefabs/EntranceDoor.js");

var _prefabsEntranceDoorJs2 = _interopRequireDefault(_prefabsEntranceDoorJs);

var _prefabsBlockingObjectsJs = require("../prefabs/BlockingObjects.js");

var _prefabsBlockingObjectsJs2 = _interopRequireDefault(_prefabsBlockingObjectsJs);

var _prefabsCollectablesJs = require("../prefabs/Collectables.js");

var _prefabsCollectablesJs2 = _interopRequireDefault(_prefabsCollectablesJs);

var _prefabsWavesObjectsJs = require("../prefabs/WavesObjects.js");

var _prefabsWavesObjectsJs2 = _interopRequireDefault(_prefabsWavesObjectsJs);

var _prefabsPlatformsJs = require("../prefabs/Platforms.js");

var _prefabsPlatformsJs2 = _interopRequireDefault(_prefabsPlatformsJs);

var _prefabsHealthBarJs = require("../prefabs/HealthBar.js");

var _prefabsHealthBarJs2 = _interopRequireDefault(_prefabsHealthBarJs);

var _prefabsEnergyBarJs = require("../prefabs/EnergyBar.js");

var _prefabsEnergyBarJs2 = _interopRequireDefault(_prefabsEnergyBarJs);

var _prefabsRatGruntJs = require("../prefabs/RatGrunt.js");

var _prefabsRatGruntJs2 = _interopRequireDefault(_prefabsRatGruntJs);

var _prefabsRatSoldierJs = require("../prefabs/RatSoldier.js");

var _prefabsRatSoldierJs2 = _interopRequireDefault(_prefabsRatSoldierJs);

var _prefabsEnemyStopsJs = require("../prefabs/EnemyStops.js");

var _prefabsEnemyStopsJs2 = _interopRequireDefault(_prefabsEnemyStopsJs);

var _prefabsPopupJs = require("../prefabs/Popup.js");

var _prefabsPopupJs2 = _interopRequireDefault(_prefabsPopupJs);

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var _prefabsCheeseScoreJs = require("../prefabs/CheeseScore.js");

var _prefabsCheeseScoreJs2 = _interopRequireDefault(_prefabsCheeseScoreJs);

var _prefabsTitleTextJs = require("../prefabs/TitleText.js");

var _prefabsTitleTextJs2 = _interopRequireDefault(_prefabsTitleTextJs);

var Ep1 = (function (_Phaser$State) {
  _inherits(Ep1, _Phaser$State);

  function Ep1() {
    _classCallCheck(this, Ep1);

    //object level properties
    _get(Object.getPrototypeOf(Ep1.prototype), "constructor", this).call(this);
  }

  _createClass(Ep1, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 800;
      //this sets the default contact material to all P2 body in this world
      this.physics.p2.world.defaultContactMaterial.friction = 0.42; //perfect not to be AIRBORNE
      this.physics.p2.world.setGlobalStiffness(1e5);

      //map start
      this.map = this.add.tilemap('ep1');
      //add tileset image
      this.map.addTilesetImage('tile');
      //parallax background
      this.bg = this.map.createLayer('background');
      this.bg.scrollFactorX = .7;
      this.bg.scrollFactorY = .7;

      //walkable tiles
      this.layer = this.map.createLayer('tiles');

      //collision
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 106, true, this.layer);

      var tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

      //add arch layer
      this.map.createLayer('decorative');

      //add moving waves objects
      //this guy has same gid 184 for all the tiles... depending on how this function is written, it might just grabbed all the
      //objects for this gid
      this.map.createFromObjects('movingwaves', 184, 'objects1', 'watertile', true, false, this.world, _prefabsWavesObjectsJs2["default"]);
      //add the damage zone associated with the water area
      this.damageZone = new Phaser.Rectangle(1200, 2100, 400, 100);

      //add custom platforms
      this.platformsGroup = this.add.group();
      this.map.createFromObjects('platforms', 183, 'objects1', 'slippery2', true, false, this.platformsGroup, _prefabsPlatformsJs2["default"]);
      //custom properties to this
      this.slippery = this.platformsGroup.getTop();
      var slipperyMaterial = this.physics.p2.createMaterial('slipperyMaterial', this.slippery.body);

      //add blocking objects
      this.blockingGroup = this.add.group();
      _componentsToolsJs2["default"].findObjectInLayer(this.map, 'blockingobjects').forEach(function (element) {
        _this.map.createFromObjects('blockingobjects', element.gid, 'objects1', element.name, true, false, _this.blockingGroup, _prefabsBlockingObjectsJs2["default"]);
      });

      //add collectables
      this.collectablesGroup = this.add.group();
      _componentsToolsJs2["default"].findObjectInLayer(this.map, 'collectables').forEach(function (element) {
        _this.map.createFromObjects('collectables', element.gid, 'objects1', element.name, true, false, _this.collectablesGroup, _prefabsCollectablesJs2["default"]);
      });

      //add entrance door
      this.map.createFromObjects('door', 176, 'objects1', 'entrancedoor', true, false, this.world, _prefabsEntranceDoorJs2["default"]);
      this.entrancedoor = this.world.getTop();
      //add player
      this.player = new _prefabsPlayerJs2["default"](this.game, 260, this.world._height - 200);
      //this.player = new Player(this.game,712,776);
      //this.player = new Player(this.game,550,200);

      //
      this.sound.stopAll();
      this.sfx = this.add.audioSprite('sfx');
      this.theme = this.add.audioSprite('theme');

      if (_componentsToolsJs2["default"].getData('mutesound')) _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
      if (_componentsToolsJs2["default"].getData('mutetheme')) _componentsToolsJs2["default"].muteOrPlay(this.theme, true);

      this.player.sfx = this.sfx;

      var playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
      //contact material with slippery
      var contactMaterial = this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterial, { friction: 0.35, surfaceVelocity: -1000 });

      //this.world.addChild(this.player);//need to add this display object to the world group
      this.add.existing(this.player);

      //add enemy rat grunt
      this.ratGruntGroup = this.add.group();
      this.map.createFromObjects('enemies', 187, 'ratgrunt', 'frame0', true, false, this.ratGruntGroup, _prefabsRatGruntJs2["default"]);
      this.ratGruntGroup.forEach(function (ratGrunt) {
        ratGrunt.player = _this.player;
        ratGrunt.sfx = _this.sfx;
      }, this);

      //add stops for enemy
      this.stopsGroup = this.add.group();
      _componentsToolsJs2["default"].findObjectInLayer(this.map, 'enemystops').forEach(function (element) {
        _this.map.createFromObjects('enemystops', element.gid, 'objects1', element.name, true, false, _this.stopsGroup, _prefabsEnemyStopsJs2["default"]);
      });

      //the most front layer which to be displayed in front of player
      this.map.createLayer('decorative2');

      //UI setup
      this.healthBar = new _prefabsHealthBarJs2["default"](this.game, 20, 20);
      this.energyBar = new _prefabsEnergyBarJs2["default"](this.game, 31, 80);
      this.player.energyBar = this.energyBar;
      this.player.healthBar = this.healthBar;
      this.player.ratGroup = this.ratGruntGroup;

      this.cheeseScore = new _prefabsCheeseScoreJs2["default"](this.game, 460, 20, 2);

      this.camera.follow(this.player);
      //seems like no need
      //this.physics.p2.setBoundsToWorld(true, true, true, true, false);
      //PHYSICS collisions--->
      this.physics.p2.setImpactEvents(true);

      var tilesCG = this.physics.p2.createCollisionGroup();
      var platformsCG = this.physics.p2.createCollisionGroup();
      var playerCG = this.physics.p2.createCollisionGroup();
      var blockingObjectsCG = this.physics.p2.createCollisionGroup();
      var collectablesCG = this.physics.p2.createCollisionGroup();
      var ratGruntCG = this.physics.p2.createCollisionGroup();
      var stopsCG = this.physics.p2.createCollisionGroup();
      var hitboxCG = this.physics.p2.createCollisionGroup();
      var entrancedoorCG = this.physics.p2.createCollisionGroup();
      //update world bounds collision group  to collide with all the custom collision groups
      this.physics.p2.updateBoundsCollisionGroup();
      //set the collisions
      tilesBodies.forEach(function (tile) {
        tile.setCollisionGroup(tilesCG);
        tile.collides([playerCG, collectablesCG, blockingObjectsCG, ratGruntCG]);
      });
      this.platformsGroup.forEach(function (child) {
        child.body.setCollisionGroup(platformsCG);
        child.body.collides([playerCG, collectablesCG, ratGruntCG]);
      }, this);
      this.player.body.setCollisionGroup(playerCG);
      this.player.body.collides([tilesCG, blockingObjectsCG, platformsCG, collectablesCG, ratGruntCG, entrancedoorCG], this.platformHitListener, this);
      this.player.hitbox1.body.setCollisionGroup(hitboxCG);
      this.player.hitbox1.body.collides(ratGruntCG, this.playerHitListener, this);
      this.blockingGroup.forEach(function (child) {
        child.body.setCollisionGroup(blockingObjectsCG);
        child.body.collides([playerCG, collectablesCG, ratGruntCG, tilesCG]);
      }, this);
      this.collectablesGroup.forEach(function (child) {
        child.body.setCollisionGroup(collectablesCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG]);
        child.body.collides(playerCG, _this.collectablesListener, _this);
      }, this);
      this.ratGruntGroup.forEach(function (child) {
        child.body.setCollisionGroup(ratGruntCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, stopsCG, hitboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
      }, this);
      this.stopsGroup.forEach(function (child) {
        child.body.setCollisionGroup(stopsCG);
        child.body.collides(ratGruntCG);
      }, this);
      this.entrancedoor.body.setCollisionGroup(entrancedoorCG);
      this.entrancedoor.body.collides(playerCG, this.nextEpisode, this);

      //GAME INPUT--->
      //lock arrows key input from the browser
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE, Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);

      //initialize pop up panels,main pop up, instruction, tip1...N
      //add esc key to bring up pop up panel
      this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc': Phaser.KeyCode.ESC });
      this.naviKeys.esc.onDown.add(function () {
        if (!_this.game.paused) {
          _this.game.paused = true;
          _this.popup = new _prefabsPopupJs2["default"](_this.game, _this.camera.x, _this.camera.y, 2);
          _this.world.addChild(_this.popup);
        } else {
          _this.resumeGame();
        }
      }, this);
      this.naviKeys.up.onDown.add(function (target) {
        //should this be added inside the Popup clas?
        //console.log("up");
        if (_this.game.paused) _this.popup.cursorMoved(target.keyCode);
      }, this);
      this.naviKeys.down.onDown.add(function (target) {
        //console.log("down");
        if (_this.game.paused) _this.popup.cursorMoved(target.keyCode);
      }, this);
      this.naviKeys.enter.onDown.add(function () {
        if (_this.game.paused) _this.processSelection();
      }, this);

      this.game.onPause.add(function () {
        this.sound.unsetMute();
      }, this); //<==enable the sound to continue play ';)'
      this.theme.sounds['Obliteration'].play('Obliteration', null, 0.3, true);

      //To get the FPS
      this.time.advancedTiming = true;
      //experiment

      this.titletext = new _prefabsTitleTextJs2["default"](this.game, 'Ep 1. The Apprenticeship');
      this.add.existing(this.titletext);

      this.tipsmarker = [false, false, false, false, false, false];
    }
  }, {
    key: "update",
    value: function update() {
      //water area hurts player
      if (this.damageZone.intersectsRaw(this.player.left, this.player.right, this.player.top, this.player.bottom)) {
        //if(!this.sfx.sounds['Footstep_Water_00','Footstep_Water_01','Footstep_Water_03'].isPlaying)this.sfx.play(this.game.rnd.pick(['Footstep_Water_00','Footstep_Water_01','Footstep_Water_03']));
        this.tipspopper(1);
        _componentsToolsJs2["default"].playSound(this.sfx, ['Footstep_Water_01', 'Footstep_Water_02', 'Footstep_Water_03']);
        this.player.damagePlayer(4);
      }

      //fire pop ups here?
      //all manual
      if (this.player.y > 2140) {
        this.tipspopper(0);
      }

      if (this.player.x > 790 && this.player.y < 927) {
        this.tipspopper(5);
      }
    }
  }, {
    key: "tipspopper",
    value: function tipspopper(index) {
      if (this.tipsmarker[index]) return;
      this.game.paused = true;
      var tippopup = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
      var tip = this.cache.getJSON('config').popup.ep1.tips[index];
      tippopup.setTitle(tip['title']);
      if (tip['description']) tippopup.setDescription(tip['description'], 0);

      this.tipsmarker[index] = true;

      this.world.addChild(tippopup);
      this.enableCursorKeys(false);
    }
  }, {
    key: "render",
    value: function render() {
      //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
    }
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }, {
    key: "nextEpisode",
    value: function nextEpisode(thisBody, thatBody) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        this.cheeseScore.addToTotalScore(1);
        this.state.start('preload', true, false, 'ep2');
      }
    }

    ////---> In Game Menu
  }, {
    key: "resumeGame",
    value: function resumeGame() {
      var somepopup = this.world.getTop();
      if (somepopup.key === 'popup') {
        this.world.removeChild(somepopup);
        somepopup.destroy();
      }
      this.game.paused = false;
    }

    //processing for pop up menu items
  }, {
    key: "processSelection",
    value: function processSelection() {
      var popupText = this.world.getTop().optionEntered();
      if (!popupText) return;

      console.log("enter " + popupText);
      //this guy has to do the lifting for the options
      switch (popupText) {
        case 'Resume Game':
          this.resumeGame();
          break;
        case 'Restart Episode':
          this.resumeGame(); //need to unpause the game before change state
          this.state.start('ep1');
          break;
        case 'Instructions':
          this.popupInstruction = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
          var instruction = this.cache.getJSON('config').popup.instructions;
          this.popupInstruction.setTitle(instruction['title']);
          this.popupInstruction.setDescription(instruction['description'], 0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupInstruction);
          this.enableCursorKeys(false);
          break;
        case 'Got it!':
          this.enableCursorKeys(true);
          this.resumeGame();
          break;
        case 'Quit to Main Menu':
          this.resumeGame();
          this.state.start('menu');
          break;
        case 'Mute Music':
          console.log("muting music ");
          _componentsToolsJs2["default"].storeData('mutetheme', true);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, true);
          break;
        case 'Mute Sound':
          console.log("muting sound");
          _componentsToolsJs2["default"].storeData('mutesound', true);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
          break;
        case 'Play Music':
          console.log("playing music");
          _componentsToolsJs2["default"].storeData('mutetheme', false);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, false);
          break;
        case 'Play Sound':
          console.log("playing sound");
          _componentsToolsJs2["default"].storeData('mutesound', false);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, false);
          break;
      }
    }
  }, {
    key: "enableCursorKeys",
    value: function enableCursorKeys(bool) {
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
    }
  }, {
    key: "platformHitListener",
    value: function platformHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && (thatBody.sprite.frameName == 'slippery1' || thatBody.sprite.frameName == 'slippery2')) {
        this.tipspopper(3);
        _componentsToolsJs2["default"].playSound(this.sfx, ['slime7', 'slime8', 'slime9']);
        this.player.onslippyplatform = true;
      } else {
        if (this.player.onslippyplatform) this.player.onslippyplatform = false;
      }
    }

    //player interaction functions
  }, {
    key: "enemyHitListener",
    value: function enemyHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        console.log('enemy hit');
        if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(5);
      }
    }
  }, {
    key: "playerHitListener",
    value: function playerHitListener(thisBody, thatBody, thisShape, thatShape) {
      //hitbox only target is enemy so pretty much no need to check
      if (thatBody.sprite) {
        thatBody.sprite.damageRat(8, 400);
      }
    }
  }, {
    key: "collectablesListener",
    value: function collectablesListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === "player") {
        console.log("player contacted by" + thisBody.sprite.frameName);
        switch (thisBody.sprite.frameName) {
          case 'cheese1':
            console.log("cheese1 am grabbed!");
            this.tipspopper(2);
            //increase player energy..
            this.player.replenishEnergy(10);
            this.cheeseScore.increaseScore(2);
            this.sfx.play('Rise04');
            break;
          case 'cheese2':
          case 'cheese3':
            console.log("cheese2 / 3 am grabbed!");
            //increase player energy..
            this.player.replenishEnergy(5);
            this.cheeseScore.increaseScore(1);
            this.sfx.play('Rise04');
            break;
          case 'wineglass':
            console.log("wineglass am grabbed!");
            this.tipspopper(4);
            this.player.replenishLife(10);
            this.sfx.play('Rise04');
            break;
          case 'winebottle':
            console.log("winebottle am grabbed!");
            this.tipspopper(6);
            this.player.replenishLife(20);
            this.sfx.play('Rise04');
            break;

        }
        //flashy
        this.player.flash('green');
        //destroy the said sprite
        thisBody.sprite.destroy();
      }
    }
  }]);

  return Ep1;
})(Phaser.State);

exports["default"] = Ep1;
module.exports = exports["default"];

},{"../components/Tools.js":2,"../prefabs/BlockingObjects.js":3,"../prefabs/CheeseScore.js":6,"../prefabs/Collectables.js":7,"../prefabs/EnemyStops.js":8,"../prefabs/EnergyBar.js":9,"../prefabs/EntranceDoor.js":10,"../prefabs/HealthBar.js":11,"../prefabs/Platforms.js":12,"../prefabs/Player.js":13,"../prefabs/Popup.js":14,"../prefabs/RatGrunt.js":16,"../prefabs/RatSoldier.js":18,"../prefabs/TitleText.js":21,"../prefabs/WavesObjects.js":22}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsEntranceDoorJs = require("../prefabs/EntranceDoor.js");

var _prefabsEntranceDoorJs2 = _interopRequireDefault(_prefabsEntranceDoorJs);

var _prefabsBlockingObjectsJs = require("../prefabs/BlockingObjects.js");

var _prefabsBlockingObjectsJs2 = _interopRequireDefault(_prefabsBlockingObjectsJs);

var _prefabsCollectablesJs = require("../prefabs/Collectables.js");

var _prefabsCollectablesJs2 = _interopRequireDefault(_prefabsCollectablesJs);

var _prefabsWavesObjectsJs = require("../prefabs/WavesObjects.js");

var _prefabsWavesObjectsJs2 = _interopRequireDefault(_prefabsWavesObjectsJs);

var _prefabsPlatformsJs = require("../prefabs/Platforms.js");

var _prefabsPlatformsJs2 = _interopRequireDefault(_prefabsPlatformsJs);

var _prefabsHealthBarJs = require("../prefabs/HealthBar.js");

var _prefabsHealthBarJs2 = _interopRequireDefault(_prefabsHealthBarJs);

var _prefabsEnergyBarJs = require("../prefabs/EnergyBar.js");

var _prefabsEnergyBarJs2 = _interopRequireDefault(_prefabsEnergyBarJs);

var _prefabsRatGruntJs = require("../prefabs/RatGrunt.js");

var _prefabsRatGruntJs2 = _interopRequireDefault(_prefabsRatGruntJs);

var _prefabsRatSoldierJs = require("../prefabs/RatSoldier.js");

var _prefabsRatSoldierJs2 = _interopRequireDefault(_prefabsRatSoldierJs);

var _prefabsStalacitesJs = require("../prefabs/Stalacites.js");

var _prefabsStalacitesJs2 = _interopRequireDefault(_prefabsStalacitesJs);

var _prefabsEnemyStopsJs = require("../prefabs/EnemyStops.js");

var _prefabsEnemyStopsJs2 = _interopRequireDefault(_prefabsEnemyStopsJs);

var _prefabsPopupJs = require("../prefabs/Popup.js");

var _prefabsPopupJs2 = _interopRequireDefault(_prefabsPopupJs);

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var _prefabsCheeseScoreJs = require("../prefabs/CheeseScore.js");

var _prefabsCheeseScoreJs2 = _interopRequireDefault(_prefabsCheeseScoreJs);

var _prefabsTitleTextJs = require("../prefabs/TitleText.js");

var _prefabsTitleTextJs2 = _interopRequireDefault(_prefabsTitleTextJs);

var Ep2 = (function (_Phaser$State) {
  _inherits(Ep2, _Phaser$State);

  function Ep2() {
    _classCallCheck(this, Ep2);

    //object level properties
    _get(Object.getPrototypeOf(Ep2.prototype), "constructor", this).call(this);
  }

  _createClass(Ep2, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 800;
      //this sets the default contact material to all P2 body in this world
      this.physics.p2.world.defaultContactMaterial.friction = 0.42; //perfect not to be AIRBORNE
      this.physics.p2.world.setGlobalStiffness(1e5);

      //map start
      this.map = this.add.tilemap('ep2');
      //add tileset image
      this.map.addTilesetImage('tile');
      //parallax background
      this.bg = this.map.createLayer('background');
      this.bg.scrollFactorX = .7;
      this.bg.scrollFactorY = .7;

      //walkable tiles
      this.layer = this.map.createLayer('tiles');

      //collision
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 106, true, this.layer);
      var tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

      this.map.createLayer('decorative');

      //general world properties above--------------------------------//

      //add water waves if any
      this.map.createFromObjects('movingwaves', 184, 'objects1', 'watertile', true, false, this.world, _prefabsWavesObjectsJs2["default"]);
      //add the damage zone associated with the water area
      this.damageZone = new Phaser.Rectangle(1700, 3580, 800, 100);

      //add platforms
      this.platformsGroup = this.add.group();
      var slipperyMaterials = new Array();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'platforms').forEach(function (element) {
        //looks like doesnt support object unique id for now
        _this.map.createFromObjects('platforms', element.gid, 'objects1', element.name, true, false, _this.platformsGroup, _prefabsPlatformsJs2["default"]);
      });
      this.platformsGroup.forEach(function (child) {
        //this is NOT in order of the Tiled since the above add all gids 183 THEN 182
        slipperyMaterials.push(_this.physics.p2.createMaterial('slipperyMaterial', child.body));
      }, this);

      //add blocking objects
      this.blockingGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'blockingobjects').forEach(function (element) {
        _this.map.createFromObjects('blockingobjects', element.gid, 'objects1', element.name, true, false, _this.blockingGroup, _prefabsBlockingObjectsJs2["default"]);
      });

      //add collectables
      this.collectablesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'collectables').forEach(function (element) {
        _this.map.createFromObjects('collectables', element.gid, 'objects1', element.name, true, false, _this.collectablesGroup, _prefabsCollectablesJs2["default"]);
      });

      //add weapons
      this.map.createFromObjects('weapons', 190, 'objects2', 'sword1', true, false, this.collectablesGroup, _prefabsCollectablesJs2["default"]);

      //add the stalacites
      this.stalacitesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'stalacites').forEach(function (element) {
        _this.map.createFromObjects('stalacites', element.gid, 'objects2', element.name, true, false, _this.stalacitesGroup, _prefabsStalacitesJs2["default"]);
      });

      //add toriis
      this.map.createFromObjects('torii1', 193, 'objects2', 'torii1');
      //create two graphics rectangle to the world
      this.toriiGroup = this.add.group();
      this.toriiRect1 = this.add.graphics(1480, 800, this.toriiGroup);
      //this.toriiRect2 = this.add.graphics(1560,900,this.toriiGroup);
      this.toriiRect1.clear();
      this.toriiRect1.drawRect(0, 0, 530, 28);
      //this.toriiRect2.clear();
      //this.toriiRect2.drawRect(0,0,480,26);
      this.physics.p2.enable(this.toriiRect1, false);
      //this.physics.p2.enable(this.toriiRect2,true);
      this.toriiRect1.body["static"] = true;
      //this.toriiRect2.body.static = true;
      _componentsToolsJs2["default"].convertTileCoorToP2(1480, 800, 530, 28, this.toriiRect1.body);
      //Tools.convertTileCoorToP2(1560,900,480,26,this.toriiRect2.body);

      //add entrance door
      this.map.createFromObjects('door', 176, 'objects1', 'entrancedoor', true, false, this.world, _prefabsEntranceDoorJs2["default"]);
      this.entrancedoor = this.world.getTop();

      //add player & player properties
      this.player = new _prefabsPlayerJs2["default"](this.game, 260, this.world._height - 200);
      //this.player = new Player(this.game,1150,320);
      //this.player = new Player(this.game,1545,1240);
      //this.player = new Player(this.game,258,270);

      //player materials
      var playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
      //contact material with slippery platforms..
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[0], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[1], { friction: 0.35, surfaceVelocity: 1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[2], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[3], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[4], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[5], { friction: 0.35, surfaceVelocity: 1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[6], { friction: 0.35, surfaceVelocity: 1000 });

      this.add.existing(this.player);

      this.camera.follow(this.player);

      //add torii2 sprite in front of player
      this.map.createFromObjects('torii2', 194, 'objects2', 'torii2');

      //stop all previous playing sound first
      this.sound.stopAll();
      this.sfx = this.add.audioSprite('sfx');
      this.theme = this.add.audioSprite('theme');
      if (_componentsToolsJs2["default"].getData('mutesound')) _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
      if (_componentsToolsJs2["default"].getData('mutetheme')) _componentsToolsJs2["default"].muteOrPlay(this.theme, true);

      this.player.sfx = this.sfx;

      //add enemy rat grunt
      this.ratGroup = this.add.group();
      this.map.createFromObjects('ratgrunts', 187, 'ratgrunt', 'frame0', true, false, this.ratGroup, _prefabsRatGruntJs2["default"]);

      //add enemy rat soldiers
      this.map.createFromObjects('ratsoldiers', 195, 'ratsoldier', 'hitframe0', true, false, this.ratGroup, _prefabsRatSoldierJs2["default"]);
      this.ratGroup.forEach(function (rat) {
        rat.player = _this.player;
        rat.sfx = _this.sfx;
        /*
        if(rat.name==='unique1'||rat.name==='unique2')rat.events.onKilled.add(()=>{
          this.uniquesdied++;
          console.log(rat.name+" died ");
        },this);*/
      }, this);

      //this.uniquesdied = 0;
      //add enemy stops
      this.stopsGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'enemystops').forEach(function (element) {
        _this.map.createFromObjects('enemystops', element.gid, 'objects1', element.name, true, false, _this.stopsGroup, _prefabsEnemyStopsJs2["default"]);
      });

      //the most front layer which to be displayed in front of player
      this.map.createLayer('decorative2');

      //UI setup
      this.healthBar = new _prefabsHealthBarJs2["default"](this.game, 20, 20);
      this.energyBar = new _prefabsEnergyBarJs2["default"](this.game, 31, 80);
      this.player.energyBar = this.energyBar;
      this.player.healthBar = this.healthBar;

      this.cheeseScore = new _prefabsCheeseScoreJs2["default"](this.game, 460, 20, 9);

      //add collision groups
      //  Turn on impact events for the world, without this we get no collision callbacks
      this.physics.p2.setImpactEvents(true);

      var tilesCG = this.physics.p2.createCollisionGroup();
      var platformsCG = this.physics.p2.createCollisionGroup();
      var stalacitesCG = this.physics.p2.createCollisionGroup();
      var toriiCG = this.physics.p2.createCollisionGroup();
      var playerCG = this.physics.p2.createCollisionGroup();
      var hitboxCG = this.physics.p2.createCollisionGroup();
      var ratHitboxCG = this.physics.p2.createCollisionGroup();
      var blockingObjectsCG = this.physics.p2.createCollisionGroup();
      var collectablesCG = this.physics.p2.createCollisionGroup();
      var ratCG = this.physics.p2.createCollisionGroup();
      var stopsCG = this.physics.p2.createCollisionGroup();
      var entrancedoorCG = this.physics.p2.createCollisionGroup();

      //update world bounds collision group  to collide with all the custom collision groups
      this.physics.p2.updateBoundsCollisionGroup();
      //set the collisions
      tilesBodies.forEach(function (tile) {
        tile.setCollisionGroup(tilesCG);
        tile.collides([playerCG, collectablesCG, blockingObjectsCG, ratCG]);
      });
      this.platformsGroup.forEach(function (child) {
        child.body.setCollisionGroup(platformsCG);
        child.body.collides([playerCG, collectablesCG, ratCG]);
      }, this);
      this.stalacitesGroup.forEach(function (child) {
        child.body.setCollisionGroup(stalacitesCG);
        child.body.collides(ratCG);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
      }, this);
      this.toriiGroup.forEach(function (child) {
        child.body.setCollisionGroup(toriiCG);
        child.body.collides([playerCG, collectablesCG, ratCG]);
      }, this);
      this.player.body.setCollisionGroup(playerCG);
      this.player.body.collides([tilesCG, stalacitesCG, toriiCG, blockingObjectsCG, platformsCG, collectablesCG, ratCG, ratHitboxCG, entrancedoorCG], this.platformHitListener, this);
      this.player.hitbox1.body.setCollisionGroup(hitboxCG);
      this.player.hitbox1.body.collides(ratCG, this.playerHitListener, this);

      this.blockingGroup.forEach(function (child) {
        child.body.setCollisionGroup(blockingObjectsCG);
        child.body.collides([playerCG, collectablesCG, ratCG, tilesCG]);
      }, this);
      this.collectablesGroup.forEach(function (child) {
        child.body.setCollisionGroup(collectablesCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, toriiCG]);
        child.body.collides(playerCG, _this.collectablesListener, _this);
      }, this);
      this.ratGroup.forEach(function (child) {
        child.body.setCollisionGroup(ratCG);
        child.body.collides([tilesCG, platformsCG, toriiCG, stalacitesCG, blockingObjectsCG, stopsCG, hitboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
        if (child.key == 'ratsoldier') {
          //for rat soldiers only
          child.hitbox1.body.setCollisionGroup(ratHitboxCG);
          child.hitbox1.body.collides(playerCG, _this.enemyHitListener, _this);
        }
      }, this);
      this.stopsGroup.forEach(function (child) {
        child.body.setCollisionGroup(stopsCG);
        child.body.collides(ratCG);
      }, this);
      this.entrancedoor.body.setCollisionGroup(entrancedoorCG);
      this.entrancedoor.body.collides(playerCG, this.nextEpisode, this);

      //lock arrows key input from the browser
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE, Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
      //initialize pop up panels,main pop up, instruction, tip1...N
      //add esc key to bring up pop up panel
      this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc': Phaser.KeyCode.ESC });
      this.naviKeys.esc.onDown.add(function () {
        if (!_this.game.paused) {
          _this.game.paused = true;
          _this.popup = new _prefabsPopupJs2["default"](_this.game, _this.camera.x, _this.camera.y, 2);
          _this.world.addChild(_this.popup);
        } else {
          _this.resumeGame();
        }
      }, this);
      this.naviKeys.up.onDown.add(function (target) {
        //should this be added inside the Popup clas?
        //console.log("up");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.down.onDown.add(function (target) {
        //console.log("down");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.enter.onDown.add(function () {
        if (_this.game.paused) _this.processSelection();
      }, this);

      this.game.onPause.add(function () {
        _this.sound.unsetMute();
      }, this); //<==enable the sound to continue play ';)'
      this.theme.sounds['Hiding Your Reality'].play('Hiding Your Reality', null, 0.4, true);

      this.titletext = new _prefabsTitleTextJs2["default"](this.game, 'Ep 2. The Rat Infestation');
      this.add.existing(this.titletext);

      //To get the FPS
      this.time.advancedTiming = true;

      this.tipsmarker = [false, false];
    }
  }, {
    key: "update",
    value: function update() {
      //water area hurts player
      if (this.damageZone.intersectsRaw(this.player.left, this.player.right, this.player.top, this.player.bottom)) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['Footstep_Water_04', 'Footstep_Water_05', 'Footstep_Water_06']);
        this.player.damagePlayer(4);
      }

      //if(this.uniquesdied==2)this.tipspopper(1);
    }
  }, {
    key: "nextEpisode",
    value: function nextEpisode(thisBody, thatBody) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        this.cheeseScore.addToTotalScore(2);
        this.state.start('preload', true, false, 'ep3');
      }
    }

    ////---> In Game Menu
  }, {
    key: "resumeGame",
    value: function resumeGame() {
      var somepopup = this.world.getTop();
      if (somepopup.key === 'popup') {
        this.world.removeChild(somepopup);
        somepopup.destroy();
      }
      this.game.paused = false;
    }

    //processing for pop up menu items
  }, {
    key: "processSelection",
    value: function processSelection() {
      //let popupText = this.popup.optionEntered();
      var popupText = this.world.getTop().optionEntered();
      if (!popupText) return;

      console.log("enter " + popupText);
      //this guy has to do the lifting for the options
      switch (popupText) {
        case 'Resume Game':
          this.resumeGame();
          break;
        case 'Restart Episode':
          this.resumeGame(); //need to unpause the game before change state
          this.state.start('ep2');
          break;
        case 'Instructions':
          this.popupInstruction = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
          var instruction = this.cache.getJSON('config').popup.instructions;
          this.popupInstruction.setTitle(instruction['title']);
          this.popupInstruction.setDescription(instruction['description'], 0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupInstruction);
          this.enableCursorKeys(false);
          break;
        case 'Got it!':
          this.enableCursorKeys(true);
          this.resumeGame();
          break;
        case 'Quit to Main Menu':
          this.resumeGame();
          this.state.start('menu');
          break;
        case 'Mute Music':
          console.log("muting music ");
          _componentsToolsJs2["default"].storeData('mutetheme', true);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, true);
          break;
        case 'Mute Sound':
          console.log("muting sound");
          _componentsToolsJs2["default"].storeData('mutesound', true);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
          break;
        case 'Play Music':
          console.log("playing music");
          _componentsToolsJs2["default"].storeData('mutetheme', false);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, false);
          break;
        case 'Play Sound':
          console.log("playing sound");
          _componentsToolsJs2["default"].storeData('mutesound', false);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, false);
          break;
      }
    }
  }, {
    key: "enableCursorKeys",
    value: function enableCursorKeys(bool) {
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
    }
  }, {
    key: "platformHitListener",
    value: function platformHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && (thatBody.sprite.frameName == 'slippery1' || thatBody.sprite.frameName == 'slippery2')) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['slime7', 'slime8', 'slime9']);
        this.player.onslippyplatform = true;
      } else {
        if (this.player.onslippyplatform) this.player.onslippyplatform = false;
      }
    }
  }, {
    key: "collectablesListener",
    value: function collectablesListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === "player") {
        console.log("player contacted by " + thisBody.sprite.frameName);
        switch (thisBody.sprite.frameName) {
          case 'cheese1':
            //increase player energy..
            this.player.replenishEnergy(10);
            this.cheeseScore.increaseScore(2);
            this.sfx.play('Rise04');

            break;
          case 'cheese2':
          case 'cheese3':
            //increase player energy..
            this.player.replenishEnergy(5);
            this.cheeseScore.increaseScore(1);
            this.sfx.play('Rise04');

            break;
          case 'wineglass':
          case 'martiniglass':
            this.player.replenishLife(10);
            this.sfx.play('Rise04');

            break;
          case 'winebottle':
            this.player.replenishLife(20);
            this.sfx.play('Rise04');

            break;
          case 'sword1':
            //pause the game, bring up the tip pop up
            this.sfx.play('collectsword');
            this.player.changeBody();
            this.tipspopper(0);

            break;

        }
        //flashy
        this.player.flash('green');
        //destroy the said sprite
        thisBody.sprite.destroy();
      }
    }
  }, {
    key: "tipspopper",
    value: function tipspopper(index) {
      if (this.tipsmarker[index]) return;

      this.game.paused = true;
      var tippopup = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
      var tip = this.cache.getJSON('config').popup.ep2.tips[index];
      tippopup.setTitle(tip['title']);
      if (tip['description']) tippopup.setDescription(tip['description'], 0);

      this.tipsmarker[index] = true;

      this.world.addChild(tippopup);
      this.enableCursorKeys(false);
    }
  }, {
    key: "enemyHitListener",
    value: function enemyHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        //Does the things that hit player all have sprite shape? and defined key?
        if (thisBody.sprite) {
          console.log('player hit by: ' + thisBody.sprite.key + ' ' + thisBody.sprite.name);
          switch (thisBody.sprite.key) {
            case 'ratgrunt':
              //rat grunt
              if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(5);
              break;
            case 'ratsoldier':
              //rat soldier
              if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(8);
              break;
            case 'objects2':
              var str = thisBody.sprite.frameName;
              //below match its a stalacites - upper{/d} and below {/d}
              if (/^upper\d{1}/.test(str) || /^below\d{1}/.test(str)) this.player.damagePlayer(4);
              break;
            case 'objects1':
              //clubbed by soldier
              if (thisBody.sprite.frameName == 'stop') this.player.damagePlayer(5, 200);
              break;
          }
        }
      }
    }
  }, {
    key: "playerHitListener",
    value: function playerHitListener(thisBody, thatBody, thisShape, thatShape) {
      //hitbox only target is enemy so pretty much no need to check
      if (thatBody.sprite) {
        thatBody.sprite.damageRat(8, 400);
      }
    }
  }, {
    key: "render",
    value: function render() {
      //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
    }
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }]);

  return Ep2;
})(Phaser.State);

exports["default"] = Ep2;
module.exports = exports["default"];

},{"../components/Tools.js":2,"../prefabs/BlockingObjects.js":3,"../prefabs/CheeseScore.js":6,"../prefabs/Collectables.js":7,"../prefabs/EnemyStops.js":8,"../prefabs/EnergyBar.js":9,"../prefabs/EntranceDoor.js":10,"../prefabs/HealthBar.js":11,"../prefabs/Platforms.js":12,"../prefabs/Player.js":13,"../prefabs/Popup.js":14,"../prefabs/RatGrunt.js":16,"../prefabs/RatSoldier.js":18,"../prefabs/Stalacites.js":20,"../prefabs/TitleText.js":21,"../prefabs/WavesObjects.js":22}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsEntranceDoorJs = require("../prefabs/EntranceDoor.js");

var _prefabsEntranceDoorJs2 = _interopRequireDefault(_prefabsEntranceDoorJs);

var _prefabsBlockingObjectsJs = require("../prefabs/BlockingObjects.js");

var _prefabsBlockingObjectsJs2 = _interopRequireDefault(_prefabsBlockingObjectsJs);

var _prefabsCollectablesJs = require("../prefabs/Collectables.js");

var _prefabsCollectablesJs2 = _interopRequireDefault(_prefabsCollectablesJs);

var _prefabsWavesObjectsJs = require("../prefabs/WavesObjects.js");

var _prefabsWavesObjectsJs2 = _interopRequireDefault(_prefabsWavesObjectsJs);

var _prefabsPlatformsJs = require("../prefabs/Platforms.js");

var _prefabsPlatformsJs2 = _interopRequireDefault(_prefabsPlatformsJs);

var _prefabsHealthBarJs = require("../prefabs/HealthBar.js");

var _prefabsHealthBarJs2 = _interopRequireDefault(_prefabsHealthBarJs);

var _prefabsEnergyBarJs = require("../prefabs/EnergyBar.js");

var _prefabsEnergyBarJs2 = _interopRequireDefault(_prefabsEnergyBarJs);

var _prefabsRatGruntJs = require("../prefabs/RatGrunt.js");

var _prefabsRatGruntJs2 = _interopRequireDefault(_prefabsRatGruntJs);

var _prefabsRatSoldierJs = require("../prefabs/RatSoldier.js");

var _prefabsRatSoldierJs2 = _interopRequireDefault(_prefabsRatSoldierJs);

var _prefabsCatJs = require("../prefabs/Cat.js");

var _prefabsCatJs2 = _interopRequireDefault(_prefabsCatJs);

var _prefabsStalacitesJs = require("../prefabs/Stalacites.js");

var _prefabsStalacitesJs2 = _interopRequireDefault(_prefabsStalacitesJs);

var _prefabsEnemyStopsJs = require("../prefabs/EnemyStops.js");

var _prefabsEnemyStopsJs2 = _interopRequireDefault(_prefabsEnemyStopsJs);

var _prefabsPopupJs = require("../prefabs/Popup.js");

var _prefabsPopupJs2 = _interopRequireDefault(_prefabsPopupJs);

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var _prefabsCheeseScoreJs = require("../prefabs/CheeseScore.js");

var _prefabsCheeseScoreJs2 = _interopRequireDefault(_prefabsCheeseScoreJs);

var _prefabsTitleTextJs = require("../prefabs/TitleText.js");

var _prefabsTitleTextJs2 = _interopRequireDefault(_prefabsTitleTextJs);

var Ep3 = (function (_Phaser$State) {
  _inherits(Ep3, _Phaser$State);

  function Ep3() {
    _classCallCheck(this, Ep3);

    //object level properties
    _get(Object.getPrototypeOf(Ep3.prototype), "constructor", this).call(this);
  }

  _createClass(Ep3, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 800;
      //this sets the default contact material to all P2 body in this world
      this.physics.p2.world.defaultContactMaterial.friction = 0.42; //perfect not to be AIRBORNE
      this.physics.p2.world.setGlobalStiffness(1e5);

      //map start
      this.map = this.add.tilemap('ep3');
      //add tileset image
      this.map.addTilesetImage('tile');
      //parallax background
      this.bg = this.map.createLayer('background');
      this.bg.scrollFactorX = .7;
      this.bg.scrollFactorY = .7;

      //walkable tiles
      this.layer = this.map.createLayer('tiles');

      //collision
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 106, true, this.layer);
      var tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

      this.map.createLayer('decorative');

      //general world properties above--------------------------------//

      //add water waves if any
      this.map.createFromObjects('movingwaves', 184, 'objects1', 'watertile', true, false, this.world, _prefabsWavesObjectsJs2["default"]);
      //add the damage zone associated with the water area
      this.damageZone = new Phaser.Rectangle(150, 3700, 300, 120);
      this.damageZone1 = new Phaser.Rectangle(1540, 1160, 400, 120);

      //add platforms
      this.platformsGroup = this.add.group();
      var slipperyMaterials = new Array();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'platforms').forEach(function (element) {
        //looks like doesnt support object unique id for now
        _this.map.createFromObjects('platforms', element.gid, 'objects1', element.name, true, false, _this.platformsGroup, _prefabsPlatformsJs2["default"]);
      });
      this.platformsGroup.forEach(function (child) {
        //this is NOT in order of the Tiled since the above add all gids 183 THEN 182
        slipperyMaterials.push(_this.physics.p2.createMaterial('slipperyMaterial', child.body));
      }, this);

      //add blocking objects
      this.blockingGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'blockingobjects').forEach(function (element) {
        _this.map.createFromObjects('blockingobjects', element.gid, 'objects1', element.name, true, false, _this.blockingGroup, _prefabsBlockingObjectsJs2["default"]);
      });

      //add collectables
      this.collectablesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'collectables').forEach(function (element) {
        _this.map.createFromObjects('collectables', element.gid, 'objects1', element.name, true, false, _this.collectablesGroup, _prefabsCollectablesJs2["default"]);
      });

      //add the stalacites
      this.stalacitesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'stalacites').forEach(function (element) {
        _this.map.createFromObjects('stalacites', element.gid, 'objects2', element.name, true, false, _this.stalacitesGroup, _prefabsStalacitesJs2["default"]);
      });

      //add entrance door
      this.map.createFromObjects('door', 176, 'objects1', 'entrancedoor', true, false, this.world, _prefabsEntranceDoorJs2["default"]);
      this.entrancedoor = this.world.getTop();

      this.player = new _prefabsPlayerJs2["default"](this.game, 150, 2850); //start pos
      //this.player = new Player(this.game,1975,150);
      //this.player = new Player(this.game,860,650);
      //this.player = new Player(this.game,297,200);
      //player materials
      var playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
      //contact material with slippery platforms..
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[0], { friction: 0.35, surfaceVelocity: 1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[1], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[2], { friction: 0.35, surfaceVelocity: 1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[3], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[4], { friction: 0.35, surfaceVelocity: -1000 });

      this.add.existing(this.player);

      this.camera.follow(this.player);

      //stop all previous playing sound first
      this.sound.stopAll();
      this.sfx = this.add.audioSprite('sfx');
      this.theme = this.add.audioSprite('theme');
      if (_componentsToolsJs2["default"].getData('mutesound')) _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
      if (_componentsToolsJs2["default"].getData('mutetheme')) _componentsToolsJs2["default"].muteOrPlay(this.theme, true);

      this.player.sfx = this.sfx;

      //add enemy rat grunt
      this.ratGroup = this.add.group();
      this.map.createFromObjects('ratgrunts', 187, 'ratgrunt', 'frame0', true, false, this.ratGroup, _prefabsRatGruntJs2["default"]);
      this.ratGroup.forEach(function (ratGrunt) {
        ratGrunt.player = _this.player;
        ratGrunt.sfx = _this.sfx;
      }, this);

      //add enemy rat soldiers
      this.map.createFromObjects('ratsoldiers', 191, 'ratsoldier', 'hitframe0', true, false, this.ratGroup, _prefabsRatSoldierJs2["default"]);
      this.ratGroup.forEach(function (ratSoldier) {
        ratSoldier.player = _this.player;
        ratSoldier.sfx = _this.sfx;
      }, this);

      this.catGroup = this.add.group();
      this.map.createFromObjects('cats', 194, 'cat', 'frame0', true, false, this.catGroup, _prefabsCatJs2["default"]);

      //add enemy stops
      this.stopsGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'enemystops').forEach(function (element) {
        _this.map.createFromObjects('enemystops', element.gid, 'objects1', element.name, true, false, _this.stopsGroup, _prefabsEnemyStopsJs2["default"]);
      });

      //the most front layer which to be displayed in front of player
      this.map.createLayer('decorative2');

      //UI setup
      this.healthBar = new _prefabsHealthBarJs2["default"](this.game, 20, 20);
      this.energyBar = new _prefabsEnergyBarJs2["default"](this.game, 31, 80);
      this.player.energyBar = this.energyBar;
      this.player.healthBar = this.healthBar;

      this.cheeseScore = new _prefabsCheeseScoreJs2["default"](this.game, 460, 20, 15);

      //add collision groups
      //  Turn on impact events for the world, without this we get no collision callbacks
      this.physics.p2.setImpactEvents(true);

      var tilesCG = this.physics.p2.createCollisionGroup();
      var platformsCG = this.physics.p2.createCollisionGroup();
      var stalacitesCG = this.physics.p2.createCollisionGroup();
      var playerCG = this.physics.p2.createCollisionGroup();
      var hitboxCG = this.physics.p2.createCollisionGroup();
      var ratHitboxCG = this.physics.p2.createCollisionGroup();
      var catBallsCG = this.physics.p2.createCollisionGroup();
      var blockingObjectsCG = this.physics.p2.createCollisionGroup();
      var collectablesCG = this.physics.p2.createCollisionGroup();
      var ratCG = this.physics.p2.createCollisionGroup();
      var catCG = this.physics.p2.createCollisionGroup();
      var stopsCG = this.physics.p2.createCollisionGroup();
      var entrancedoorCG = this.physics.p2.createCollisionGroup();

      //update world bounds collision group  to collide with all the custom collision groups
      this.physics.p2.updateBoundsCollisionGroup();
      //set the collisions
      //tile materials
      var tileMaterial = this.physics.p2.createMaterial('tileMaterial');
      tilesBodies.forEach(function (tile) {
        tile.setMaterial(tileMaterial);
        tile.setCollisionGroup(tilesCG);
        tile.collides([playerCG, collectablesCG, blockingObjectsCG, ratCG, catCG, catBallsCG]);
      });
      this.platformsGroup.forEach(function (child) {
        child.body.setCollisionGroup(platformsCG);
        child.body.collides([playerCG, collectablesCG, ratCG, catCG, catBallsCG]);
      }, this);
      this.stalacitesGroup.forEach(function (child) {
        child.body.setCollisionGroup(stalacitesCG);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
      }, this);
      this.player.body.setCollisionGroup(playerCG);
      this.player.body.collides([tilesCG, stalacitesCG, blockingObjectsCG, platformsCG, collectablesCG, ratCG, catCG, ratHitboxCG, catBallsCG, entrancedoorCG], this.platformHitListener, this);
      this.player.hitbox1.body.setCollisionGroup(hitboxCG);
      this.player.hitbox1.body.collides([ratCG, catCG, catBallsCG], this.playerHitListener, this);

      this.blockingGroup.forEach(function (child) {
        child.body.setCollisionGroup(blockingObjectsCG);
        child.body.collides([playerCG, collectablesCG, ratCG, tilesCG, catCG, catBallsCG]);
      }, this);
      this.collectablesGroup.forEach(function (child) {
        child.body.setCollisionGroup(collectablesCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG]);
        child.body.collides(playerCG, _this.collectablesListener, _this);
      }, this);
      this.ratGroup.forEach(function (child) {
        child.body.setCollisionGroup(ratCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, stopsCG, hitboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
        if (child.key == 'ratsoldier') {
          //for rat soldiers only
          child.hitbox1.body.setCollisionGroup(ratHitboxCG);
          child.hitbox1.body.collides(playerCG, _this.enemyHitListener, _this);
        }
      }, this);
      var ballMaterial = this.physics.p2.createMaterial('ballMaterial');
      this.catGroup.forEach(function (child) {
        child.body.setCollisionGroup(catCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, stopsCG, hitboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
        child.balls.forEach(function (ball) {
          ball.body.setMaterial(ballMaterial);
          ball.body.setCollisionGroup(catBallsCG);
          ball.body.collides([tilesCG, platformsCG, blockingObjectsCG, hitboxCG]);
          ball.body.collides(playerCG, _this.enemyHitListener, _this);
        }, child);
      }, this);
      this.stopsGroup.forEach(function (child) {
        child.body.setCollisionGroup(stopsCG);
        child.body.collides([ratCG, catCG]);
      }, this);
      this.entrancedoor.body.setCollisionGroup(entrancedoorCG);
      this.entrancedoor.body.collides(playerCG, this.nextEpisode, this);

      this.physics.p2.createContactMaterial(tileMaterial, ballMaterial, { friction: 0.2, restitution: 0.8 });

      //lock arrows key input from the browser
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE, Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
      //initialize pop up panels,main pop up, instruction, tip1...N
      //add esc key to bring up pop up panel
      this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc': Phaser.KeyCode.ESC });
      this.naviKeys.esc.onDown.add(function () {
        if (!_this.game.paused) {
          _this.game.paused = true;
          _this.popup = new _prefabsPopupJs2["default"](_this.game, _this.camera.x, _this.camera.y, 2);
          _this.world.addChild(_this.popup);
        } else {
          _this.resumeGame();
        }
      }, this);
      this.naviKeys.up.onDown.add(function (target) {
        //should this be added inside the Popup clas?
        //console.log("up");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.down.onDown.add(function (target) {
        //console.log("down");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.enter.onDown.add(function () {
        if (_this.game.paused) _this.processSelection();
      }, this);

      this.game.onPause.add(function () {
        this.sound.unsetMute();
      }, this); //<==enable the sound to continue play ';)'
      this.theme.sounds['Obliteration'].play('Obliteration', null, 0.3, true);

      this.titletext = new _prefabsTitleTextJs2["default"](this.game, 'Ep 3. The Flying Menace');
      this.add.existing(this.titletext);

      //To get the FPS
      this.time.advancedTiming = true;
    }
  }, {
    key: "update",
    value: function update() {
      //water area hurts player
      if (this.damageZone.intersectsRaw(this.player.left, this.player.right, this.player.top, this.player.bottom) || this.damageZone1.intersectsRaw(this.player.left, this.player.right, this.player.top, this.player.bottom)) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['Footstep_Water_04', 'Footstep_Water_05', 'Footstep_Water_06']);
        this.player.damagePlayer(4);
      }
    }
  }, {
    key: "nextEpisode",
    value: function nextEpisode(thisBody, thatBody) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        this.cheeseScore.addToTotalScore(3);
        this.state.start('preload', true, false, 'ep4');
      }
    }

    ////---> In Game Menu
  }, {
    key: "resumeGame",
    value: function resumeGame() {
      var somepopup = this.world.getTop();
      if (somepopup.key === 'popup') {
        this.world.removeChild(somepopup);
        somepopup.destroy();
      }
      this.game.paused = false;
    }

    //processing for pop up menu items
  }, {
    key: "processSelection",
    value: function processSelection() {
      //let popupText = this.popup.optionEntered();
      var popupText = this.world.getTop().optionEntered();
      if (!popupText) return;

      console.log("enter " + popupText);
      //this guy has to do the lifting for the options
      switch (popupText) {
        case 'Resume Game':
          this.resumeGame();
          break;
        case 'Restart Episode':
          this.resumeGame(); //need to unpause the game before change state
          this.state.start('ep3');
          break;
        case 'Instructions':
          this.popupInstruction = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
          var instruction = this.cache.getJSON('config').popup.instructions;
          this.popupInstruction.setTitle(instruction['title']);
          this.popupInstruction.setDescription(instruction['description'], 0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupInstruction);
          this.enableCursorKeys(false);
          break;
        case 'Got it!':
          this.enableCursorKeys(true);
          this.resumeGame();
          break;
        case 'Quit to Main Menu':
          this.resumeGame();
          this.state.start('menu');
          break;
        case 'Mute Music':
          console.log("muting music ");
          _componentsToolsJs2["default"].storeData('mutetheme', true);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, true);
          break;
        case 'Mute Sound':
          console.log("muting sound");
          _componentsToolsJs2["default"].storeData('mutesound', true);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
          break;
        case 'Play Music':
          console.log("playing music");
          _componentsToolsJs2["default"].storeData('mutetheme', false);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, false);
          break;
        case 'Play Sound':
          console.log("playing sound");
          _componentsToolsJs2["default"].storeData('mutesound', false);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, false);
          break;
      }
    }
  }, {
    key: "enableCursorKeys",
    value: function enableCursorKeys(bool) {
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
    }
  }, {
    key: "platformHitListener",
    value: function platformHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && (thatBody.sprite.frameName == 'slippery1' || thatBody.sprite.frameName == 'slippery2')) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['slime7', 'slime8', 'slime9']);
        this.player.onslippyplatform = true;
      } else {
        if (this.player.onslippyplatform) this.player.onslippyplatform = false;
      }
    }
  }, {
    key: "collectablesListener",
    value: function collectablesListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === "player") {
        console.log("player contacted by " + thisBody.sprite.frameName);
        switch (thisBody.sprite.frameName) {
          case 'cheese1':
            //increase player energy..
            this.player.replenishEnergy(10);
            this.cheeseScore.increaseScore(2);
            this.sfx.play('Rise04');

            break;
          case 'cheese2':
          case 'cheese3':
            //increase player energy..
            this.player.replenishEnergy(5);
            this.cheeseScore.increaseScore(1);
            this.sfx.play('Rise04');

            break;
          case 'wineglass':
          case 'martiniglass':
            this.player.replenishLife(10);
            this.sfx.play('Rise04');

            break;
          case 'winebottle':
            this.player.replenishLife(20);
            this.sfx.play('Rise04');

            break;
        }
        //flashy
        this.player.flash('green');
        //destroy the said sprite
        thisBody.sprite.destroy();
      }
    }
  }, {
    key: "enemyHitListener",
    value: function enemyHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        //Does the things that hit player all have sprite shape? and defined key?
        if (thisBody.sprite) {
          console.log('player hit by: ' + thisBody.sprite.key + ' ' + thisBody.sprite.name);
          switch (thisBody.sprite.key) {
            case 'ratgrunt':
              //rat grunt
              if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(5);
              break;
            case 'ratsoldier':
              //rat soldier
              if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(8);
              break;
            case 'cat':
              this.player.damagePlayer(8);
              break;
            case 'objects3':
              //objects 3 are all balls
              this.player.damagePlayer(4);
              break;
            case 'objects2':
              var str = thisBody.sprite.frameName;
              //below match its a stalacites - upper{/d} and below {/d}
              if (/^upper\d{1}/.test(str) || /^below\d{1}/.test(str)) this.player.damagePlayer(4);
              break;
            case 'objects1':
              //clubbed by soldier
              if (thisBody.sprite.frameName == 'stop') this.player.damagePlayer(5, 200);
              break;
          }
        }
      }
    }
  }, {
    key: "playerHitListener",
    value: function playerHitListener(thisBody, thatBody, thisShape, thatShape) {
      //hitbox only target is enemy so pretty much no need to check
      if (thatBody.sprite) {
        switch (thatBody.sprite.key) {
          case 'ratgrunt':
          case 'ratsoldier':
            thatBody.sprite.damageRat(8, 400);
            break;
          case 'cat':
            thatBody.sprite.damageCat(8, 400);
            break;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
    }
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }]);

  return Ep3;
})(Phaser.State);

exports["default"] = Ep3;
module.exports = exports["default"];

},{"../components/Tools.js":2,"../prefabs/BlockingObjects.js":3,"../prefabs/Cat.js":4,"../prefabs/CheeseScore.js":6,"../prefabs/Collectables.js":7,"../prefabs/EnemyStops.js":8,"../prefabs/EnergyBar.js":9,"../prefabs/EntranceDoor.js":10,"../prefabs/HealthBar.js":11,"../prefabs/Platforms.js":12,"../prefabs/Player.js":13,"../prefabs/Popup.js":14,"../prefabs/RatGrunt.js":16,"../prefabs/RatSoldier.js":18,"../prefabs/Stalacites.js":20,"../prefabs/TitleText.js":21,"../prefabs/WavesObjects.js":22}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsEntranceDoorJs = require("../prefabs/EntranceDoor.js");

var _prefabsEntranceDoorJs2 = _interopRequireDefault(_prefabsEntranceDoorJs);

var _prefabsBlockingObjectsJs = require("../prefabs/BlockingObjects.js");

var _prefabsBlockingObjectsJs2 = _interopRequireDefault(_prefabsBlockingObjectsJs);

var _prefabsCollectablesJs = require("../prefabs/Collectables.js");

var _prefabsCollectablesJs2 = _interopRequireDefault(_prefabsCollectablesJs);

var _prefabsWavesObjectsJs = require("../prefabs/WavesObjects.js");

var _prefabsWavesObjectsJs2 = _interopRequireDefault(_prefabsWavesObjectsJs);

var _prefabsPlatformsJs = require("../prefabs/Platforms.js");

var _prefabsPlatformsJs2 = _interopRequireDefault(_prefabsPlatformsJs);

var _prefabsHealthBarJs = require("../prefabs/HealthBar.js");

var _prefabsHealthBarJs2 = _interopRequireDefault(_prefabsHealthBarJs);

var _prefabsEnergyBarJs = require("../prefabs/EnergyBar.js");

var _prefabsEnergyBarJs2 = _interopRequireDefault(_prefabsEnergyBarJs);

var _prefabsRatGruntJs = require("../prefabs/RatGrunt.js");

var _prefabsRatGruntJs2 = _interopRequireDefault(_prefabsRatGruntJs);

var _prefabsRatSoldierJs = require("../prefabs/RatSoldier.js");

var _prefabsRatSoldierJs2 = _interopRequireDefault(_prefabsRatSoldierJs);

var _prefabsCatJs = require("../prefabs/Cat.js");

var _prefabsCatJs2 = _interopRequireDefault(_prefabsCatJs);

var _prefabsStalacitesJs = require("../prefabs/Stalacites.js");

var _prefabsStalacitesJs2 = _interopRequireDefault(_prefabsStalacitesJs);

var _prefabsEnemyStopsJs = require("../prefabs/EnemyStops.js");

var _prefabsEnemyStopsJs2 = _interopRequireDefault(_prefabsEnemyStopsJs);

var _prefabsPopupJs = require("../prefabs/Popup.js");

var _prefabsPopupJs2 = _interopRequireDefault(_prefabsPopupJs);

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var _prefabsCheeseScoreJs = require("../prefabs/CheeseScore.js");

var _prefabsCheeseScoreJs2 = _interopRequireDefault(_prefabsCheeseScoreJs);

var _prefabsShurikenHUDJs = require("../prefabs/ShurikenHUD.js");

var _prefabsShurikenHUDJs2 = _interopRequireDefault(_prefabsShurikenHUDJs);

var _prefabsTitleTextJs = require("../prefabs/TitleText.js");

var _prefabsTitleTextJs2 = _interopRequireDefault(_prefabsTitleTextJs);

var Ep4 = (function (_Phaser$State) {
  _inherits(Ep4, _Phaser$State);

  function Ep4() {
    _classCallCheck(this, Ep4);

    //object level properties
    _get(Object.getPrototypeOf(Ep4.prototype), "constructor", this).call(this);
  }

  _createClass(Ep4, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 800;
      //this sets the default contact material to all P2 body in this world
      this.physics.p2.world.defaultContactMaterial.friction = 0.42; //perfect not to be AIRBORNE
      this.physics.p2.world.setGlobalStiffness(1e5);

      //map start
      this.map = this.add.tilemap('ep4');
      //add tileset image
      this.map.addTilesetImage('tile');
      //parallax background
      this.bg = this.map.createLayer('background');
      this.bg.scrollFactorX = .7;
      this.bg.scrollFactorY = .7;

      //walkable tiles
      this.layer = this.map.createLayer('tiles');

      //collision
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 120, true, this.layer);
      var tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

      //general world properties above--------------------------------//
      //add water waves if any
      this.map.createFromObjects('movingwaves', 13, 'objects1', 'watertile', true, false, this.world, _prefabsWavesObjectsJs2["default"]);
      //add the damage zone associated with the water area
      this.damageZone = new Phaser.Rectangle(-20, 3750, 720, 120);

      //----------------------------
      //add platforms
      this.platformsGroup = this.add.group();
      var slipperyMaterials = new Array();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'platforms').forEach(function (element) {
        //looks like doesnt support object unique id for now
        _this.map.createFromObjects('platforms', element.gid, 'objects1', element.name, true, false, _this.platformsGroup, _prefabsPlatformsJs2["default"]);
      });
      this.platformsGroup.forEach(function (child) {
        //this is NOT in order of the Tiled since the above add all gids 183 THEN 182
        slipperyMaterials.push(_this.physics.p2.createMaterial('slipperyMaterial', child.body));
      }, this);

      //add blocking objects
      this.blockingGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'blockingobjects').forEach(function (element) {
        _this.map.createFromObjects('blockingobjects', element.gid, 'objects1', element.name, true, false, _this.blockingGroup, _prefabsBlockingObjectsJs2["default"]);
      });

      //add collectables
      this.collectablesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'collectables').forEach(function (element) {
        _this.map.createFromObjects('collectables', element.gid, 'objects1', element.name, true, false, _this.collectablesGroup, _prefabsCollectablesJs2["default"]);
      });

      //add weapons
      this.map.createFromObjects('weapons', 26, 'objects4', 'shurikens', true, false, this.collectablesGroup, _prefabsCollectablesJs2["default"]);

      //add the stalacites
      this.stalacitesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'stalacites').forEach(function (element) {
        _this.map.createFromObjects('stalacites', element.gid, 'objects2', element.name, true, false, _this.stalacitesGroup, _prefabsStalacitesJs2["default"]);
      });
      //-----------------------------

      //add entrance door
      this.map.createFromObjects('door', 5, 'objects1', 'entrancedoor', true, false, this.world, _prefabsEntranceDoorJs2["default"]);
      this.entrancedoor = this.world.getTop();

      this.map.createFromObjects('torii1', 24, 'objects2', 'torii1');

      //this.player = new Player(this.game,60,3800);
      this.player = new _prefabsPlayerJs2["default"](this.game, 2340, 2860); //start pos
      //this.player = new Player(this.game,2380,700);

      //player materials
      var playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
      //contact material with slippery platforms..
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[0], { friction: 0.35, surfaceVelocity: 1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[1], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[2], { friction: 0.35, surfaceVelocity: 1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[3], { friction: 0.35, surfaceVelocity: -1000 });

      this.add.existing(this.player);

      this.map.createFromObjects('torii2', 25, 'objects2', 'torii2');

      this.camera.follow(this.player);

      //stop all previous playing sound first
      this.sound.stopAll();
      this.sfx = this.add.audioSprite('sfx');
      this.theme = this.add.audioSprite('theme');
      if (_componentsToolsJs2["default"].getData('mutesound')) _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
      if (_componentsToolsJs2["default"].getData('mutetheme')) _componentsToolsJs2["default"].muteOrPlay(this.theme, true);

      this.player.sfx = this.sfx;

      //add enemy rat grunt
      this.ratGroup = this.add.group();
      this.map.createFromObjects('ratgrunts', 16, 'ratgrunt', 'frame0', true, false, this.ratGroup, _prefabsRatGruntJs2["default"]);
      this.ratGroup.forEach(function (ratGrunt) {
        ratGrunt.player = _this.player;
        ratGrunt.sfx = _this.sfx;
      }, this);

      //add enemy rat soldiers
      this.map.createFromObjects('ratsoldiers', 20, 'ratsoldier', 'hitframe0', true, false, this.ratGroup, _prefabsRatSoldierJs2["default"]);
      this.ratGroup.forEach(function (ratSoldier) {
        ratSoldier.player = _this.player;
        ratSoldier.sfx = _this.sfx;
      }, this);

      this.catGroup = this.add.group();
      this.map.createFromObjects('cats', 23, 'cat', 'frame0', true, false, this.catGroup, _prefabsCatJs2["default"]);

      //add enemy stops
      this.stopsGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'enemystops').forEach(function (element) {
        _this.map.createFromObjects('enemystops', element.gid, 'objects1', element.name, true, false, _this.stopsGroup, _prefabsEnemyStopsJs2["default"]);
      });

      //the most front layer which to be displayed in front of player
      this.map.createLayer('decorative2');

      //UI setup
      this.healthBar = new _prefabsHealthBarJs2["default"](this.game, 20, 20);
      this.energyBar = new _prefabsEnergyBarJs2["default"](this.game, 31, 80);
      this.player.energyBar = this.energyBar;
      this.player.healthBar = this.healthBar;

      this.cheeseScore = new _prefabsCheeseScoreJs2["default"](this.game, 460, 20, 18);
      this.shurikenHUD = new _prefabsShurikenHUDJs2["default"](this.game, 870, 25, 18);
      this.player.shurikenHUD = this.shurikenHUD;

      //add collision groups
      //  Turn on impact events for the world, without this we get no collision callbacks
      this.physics.p2.setImpactEvents(true);

      var tilesCG = this.physics.p2.createCollisionGroup();
      var platformsCG = this.physics.p2.createCollisionGroup();
      var stalacitesCG = this.physics.p2.createCollisionGroup();
      var playerCG = this.physics.p2.createCollisionGroup();
      var hitboxCG = this.physics.p2.createCollisionGroup();
      var shurikenboxCG = this.physics.p2.createCollisionGroup();
      var ratHitboxCG = this.physics.p2.createCollisionGroup();
      var catBallsCG = this.physics.p2.createCollisionGroup();
      var blockingObjectsCG = this.physics.p2.createCollisionGroup();
      var collectablesCG = this.physics.p2.createCollisionGroup();
      var ratCG = this.physics.p2.createCollisionGroup();
      var catCG = this.physics.p2.createCollisionGroup();
      var stopsCG = this.physics.p2.createCollisionGroup();
      var entrancedoorCG = this.physics.p2.createCollisionGroup();

      //update world bounds collision group  to collide with all the custom collision groups
      this.physics.p2.updateBoundsCollisionGroup();
      //set the collisions
      //tile materials
      var tileMaterial = this.physics.p2.createMaterial('tileMaterial');
      tilesBodies.forEach(function (tile) {
        tile.setMaterial(tileMaterial);
        tile.setCollisionGroup(tilesCG);
        tile.collides([playerCG, collectablesCG, blockingObjectsCG, ratCG, catCG, catBallsCG]);
      });
      this.platformsGroup.forEach(function (child) {
        child.body.setCollisionGroup(platformsCG);
        child.body.collides([playerCG, collectablesCG, ratCG, catCG, catBallsCG]);
      }, this);
      this.stalacitesGroup.forEach(function (child) {
        child.body.setCollisionGroup(stalacitesCG);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
      }, this);
      this.player.body.setCollisionGroup(playerCG);
      this.player.body.collides([tilesCG, stalacitesCG, blockingObjectsCG, platformsCG, collectablesCG, ratCG, catCG, ratHitboxCG, catBallsCG, entrancedoorCG], this.platformHitListener, this);
      this.player.hitbox1.body.setCollisionGroup(hitboxCG);
      this.player.hitbox1.body.collides([ratCG, catCG, catBallsCG], this.playerHitListener, this);
      this.player.shurikens.forEach(function (shuriken) {
        shuriken.body.setCollisionGroup(shurikenboxCG);
        shuriken.body.collides([ratCG, catCG, catBallsCG], _this.playerHitListener, _this);
      }, this);
      this.blockingGroup.forEach(function (child) {
        child.body.setCollisionGroup(blockingObjectsCG);
        child.body.collides([playerCG, collectablesCG, ratCG, tilesCG, catCG, catBallsCG]);
      }, this);
      this.collectablesGroup.forEach(function (child) {
        child.body.setCollisionGroup(collectablesCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG]);
        child.body.collides(playerCG, _this.collectablesListener, _this);
      }, this);
      this.ratGroup.forEach(function (child) {
        child.body.setCollisionGroup(ratCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, stopsCG, hitboxCG, shurikenboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
        if (child.key == 'ratsoldier') {
          //for rat soldiers only
          child.hitbox1.body.setCollisionGroup(ratHitboxCG);
          child.hitbox1.body.collides(playerCG, _this.enemyHitListener, _this);
        }
      }, this);
      var ballMaterial = this.physics.p2.createMaterial('ballMaterial');
      this.catGroup.forEach(function (child) {
        child.body.setCollisionGroup(catCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, stopsCG, hitboxCG, shurikenboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
        child.balls.forEach(function (ball) {
          ball.body.setMaterial(ballMaterial);
          ball.body.setCollisionGroup(catBallsCG);
          ball.body.collides([tilesCG, platformsCG, blockingObjectsCG, hitboxCG, shurikenboxCG]);
          ball.body.collides(playerCG, _this.enemyHitListener, _this);
        }, child);
      }, this);
      this.stopsGroup.forEach(function (child) {
        child.body.setCollisionGroup(stopsCG);
        child.body.collides([ratCG, catCG]);
      }, this);
      this.entrancedoor.body.setCollisionGroup(entrancedoorCG);
      this.entrancedoor.body.collides(playerCG, this.nextEpisode, this);

      this.physics.p2.createContactMaterial(tileMaterial, ballMaterial, { friction: 0.2, restitution: 0.8 });

      //lock arrows key input from the browser
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE, Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
      //initialize pop up panels,main pop up, instruction, tip1...N
      //add esc key to bring up pop up panel
      this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc': Phaser.KeyCode.ESC });
      this.naviKeys.esc.onDown.add(function () {
        if (!_this.game.paused) {
          _this.game.paused = true;
          _this.popup = new _prefabsPopupJs2["default"](_this.game, _this.camera.x, _this.camera.y, 2);
          _this.world.addChild(_this.popup);
        } else {
          _this.resumeGame();
        }
      }, this);
      this.naviKeys.up.onDown.add(function (target) {
        //should this be added inside the Popup clas?
        //console.log("up");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.down.onDown.add(function (target) {
        //console.log("down");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.enter.onDown.add(function () {
        if (_this.game.paused) _this.processSelection();
      }, this);

      this.game.onPause.add(function () {
        this.sound.unsetMute();
      }, this); //<==enable the sound to continue play ';)'
      this.theme.sounds['Hiding Your Reality'].play('Hiding Your Reality', null, 0.4, true);

      this.titletext = new _prefabsTitleTextJs2["default"](this.game, 'Ep 4. The Shooting Stars');
      this.add.existing(this.titletext);

      //To get the FPS
      this.time.advancedTiming = true;

      this.tipsmarker = [false];
    }
  }, {
    key: "update",
    value: function update() {
      if (this.damageZone.intersectsRaw(this.player.left, this.player.right, this.player.top, this.player.bottom)) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['Footstep_Water_04', 'Footstep_Water_05', 'Footstep_Water_06']);
        this.player.damagePlayer(4);
      }
    }
  }, {
    key: "nextEpisode",
    value: function nextEpisode(thisBody, thatBody) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        this.cheeseScore.addToTotalScore(4);
        this.state.start('preload', true, false, 'ep5');
      }
    }

    ////---> In Game Menu
  }, {
    key: "resumeGame",
    value: function resumeGame() {
      var somepopup = this.world.getTop();
      if (somepopup.key === 'popup') {
        this.world.removeChild(somepopup);
        somepopup.destroy();
      }
      this.game.paused = false;
    }

    //processing for pop up menu items
  }, {
    key: "processSelection",
    value: function processSelection() {
      //let popupText = this.popup.optionEntered();
      var popupText = this.world.getTop().optionEntered();
      if (!popupText) return;

      console.log("enter " + popupText);
      //this guy has to do the lifting for the options
      switch (popupText) {
        case 'Resume Game':
          this.resumeGame();
          break;
        case 'Restart Episode':
          this.resumeGame(); //need to unpause the game before change state
          this.state.start('ep4');
          break;
        case 'Instructions':
          this.popupInstruction = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
          var instruction = this.cache.getJSON('config').popup.instructions;
          this.popupInstruction.setTitle(instruction['title']);
          this.popupInstruction.setDescription(instruction['description'], 0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupInstruction);
          this.enableCursorKeys(false);
          break;
        case 'Got it!':
          this.enableCursorKeys(true);
          this.resumeGame();
          break;
        case 'Quit to Main Menu':
          this.resumeGame();
          this.state.start('menu');
          break;
        case 'Mute Music':
          console.log("muting music ");
          _componentsToolsJs2["default"].storeData('mutetheme', true);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, true);
          break;
        case 'Mute Sound':
          console.log("muting sound");
          _componentsToolsJs2["default"].storeData('mutesound', true);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
          break;
        case 'Play Music':
          console.log("playing music");
          _componentsToolsJs2["default"].storeData('mutetheme', false);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, false);
          break;
        case 'Play Sound':
          console.log("playing sound");
          _componentsToolsJs2["default"].storeData('mutesound', false);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, false);
          break;
      }
    }
  }, {
    key: "enableCursorKeys",
    value: function enableCursorKeys(bool) {
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
    }
  }, {
    key: "platformHitListener",
    value: function platformHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && (thatBody.sprite.frameName == 'slippery1' || thatBody.sprite.frameName == 'slippery2')) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['slime7', 'slime8', 'slime9']);
        this.player.onslippyplatform = true;
      } else {
        if (this.player.onslippyplatform) this.player.onslippyplatform = false;
      }
    }
  }, {
    key: "collectablesListener",
    value: function collectablesListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === "player") {
        console.log("player contacted by " + thisBody.sprite.frameName);
        switch (thisBody.sprite.frameName) {
          case 'cheese1':
            //increase player energy..
            this.player.replenishEnergy(10);
            this.cheeseScore.increaseScore(2);
            this.sfx.play('Rise04');

            break;
          case 'cheese2':
          case 'cheese3':
            //increase player energy..
            this.player.replenishEnergy(5);
            this.cheeseScore.increaseScore(1);
            this.sfx.play('Rise04');

            break;
          case 'wineglass':
          case 'martiniglass':
            this.player.replenishLife(10);
            this.sfx.play('Rise04');

            break;
          case 'winebottle':
            this.player.replenishLife(20);
            this.sfx.play('Rise04');

            break;
          case 'shurikens':
            //enable shurikens for first time
            if (!this.tipsmarker[0]) {
              this.player.throwBody();
              this.tipspopper(0);
            }

            //increase player shurikens count
            this.player.increaseShuriken(5);
            this.sfx.play('Rise04');

            break;
        }
        //flashy
        this.player.flash('green');
        //destroy the said sprite
        thisBody.sprite.destroy();
      }
    }
  }, {
    key: "tipspopper",
    value: function tipspopper(index) {
      if (this.tipsmarker[index]) return false;

      this.sfx.play('collectsword');

      this.game.paused = true;
      var tippopup = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
      var tip = this.cache.getJSON('config').popup.ep4.tips[index];
      tippopup.setTitle(tip['title']);
      if (tip['description']) tippopup.setDescription(tip['description'], 0);

      this.tipsmarker[index] = true;

      this.world.addChild(tippopup);
      this.enableCursorKeys(false);

      return true;
    }
  }, {
    key: "enemyHitListener",
    value: function enemyHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        //Does the things that hit player all have sprite shape? and defined key?
        if (thisBody.sprite) {
          console.log('player hit by: ' + thisBody.sprite.key + ' ' + thisBody.sprite.name);
          switch (thisBody.sprite.key) {
            case 'ratgrunt':
              //rat grunt
              if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(5);
              break;
            case 'ratsoldier':
              //rat soldier
              if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(8);
              break;
            case 'cat':
              this.player.damagePlayer(8);
              break;
            case 'objects3':
              //objects 3 are all balls
              this.player.damagePlayer(4);
              break;
            case 'objects2':
              var str = thisBody.sprite.frameName;
              //below match its a stalacites - upper{/d} and below {/d}
              if (/^upper\d{1}/.test(str) || /^below\d{1}/.test(str)) this.player.damagePlayer(4);
              break;
            case 'objects1':
              //clubbed by soldier
              if (thisBody.sprite.frameName == 'stop') this.player.damagePlayer(5, 200);
              break;
          }
        }
      }
    }
  }, {
    key: "playerHitListener",
    value: function playerHitListener(thisBody, thatBody, thisShape, thatShape) {
      //hitbox only target is enemy so pretty much no need to check
      if (thatBody.sprite) {
        if (thisBody.sprite && /^s\d{1}/.test(thisBody.sprite.frameName)) {
          console.log("shuriken hit");
          //kill the shuriken body
          switch (thatBody.sprite.key) {
            case 'ratgrunt':
            case 'ratsoldier':
              thatBody.sprite.damageRat(6, 400);
              break;
            case 'cat':
              thatBody.sprite.damageCat(6, 400);
              break;
          }
          thisBody.sprite.kill();
        } else {
          switch (thatBody.sprite.key) {
            case 'ratgrunt':
            case 'ratsoldier':
              thatBody.sprite.damageRat(8, 400);
              break;
            case 'cat':
              thatBody.sprite.damageCat(8, 400);
              break;
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
    }
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }]);

  return Ep4;
})(Phaser.State);

exports["default"] = Ep4;
module.exports = exports["default"];

},{"../components/Tools.js":2,"../prefabs/BlockingObjects.js":3,"../prefabs/Cat.js":4,"../prefabs/CheeseScore.js":6,"../prefabs/Collectables.js":7,"../prefabs/EnemyStops.js":8,"../prefabs/EnergyBar.js":9,"../prefabs/EntranceDoor.js":10,"../prefabs/HealthBar.js":11,"../prefabs/Platforms.js":12,"../prefabs/Player.js":13,"../prefabs/Popup.js":14,"../prefabs/RatGrunt.js":16,"../prefabs/RatSoldier.js":18,"../prefabs/ShurikenHUD.js":19,"../prefabs/Stalacites.js":20,"../prefabs/TitleText.js":21,"../prefabs/WavesObjects.js":22}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsEntranceDoorJs = require("../prefabs/EntranceDoor.js");

var _prefabsEntranceDoorJs2 = _interopRequireDefault(_prefabsEntranceDoorJs);

var _prefabsBlockingObjectsJs = require("../prefabs/BlockingObjects.js");

var _prefabsBlockingObjectsJs2 = _interopRequireDefault(_prefabsBlockingObjectsJs);

var _prefabsCollectablesJs = require("../prefabs/Collectables.js");

var _prefabsCollectablesJs2 = _interopRequireDefault(_prefabsCollectablesJs);

var _prefabsWavesObjectsJs = require("../prefabs/WavesObjects.js");

var _prefabsWavesObjectsJs2 = _interopRequireDefault(_prefabsWavesObjectsJs);

var _prefabsPlatformsJs = require("../prefabs/Platforms.js");

var _prefabsPlatformsJs2 = _interopRequireDefault(_prefabsPlatformsJs);

var _prefabsHealthBarJs = require("../prefabs/HealthBar.js");

var _prefabsHealthBarJs2 = _interopRequireDefault(_prefabsHealthBarJs);

var _prefabsEnergyBarJs = require("../prefabs/EnergyBar.js");

var _prefabsEnergyBarJs2 = _interopRequireDefault(_prefabsEnergyBarJs);

var _prefabsRatGruntJs = require("../prefabs/RatGrunt.js");

var _prefabsRatGruntJs2 = _interopRequireDefault(_prefabsRatGruntJs);

var _prefabsRatSoldierJs = require("../prefabs/RatSoldier.js");

var _prefabsRatSoldierJs2 = _interopRequireDefault(_prefabsRatSoldierJs);

var _prefabsRatNinjaJs = require("../prefabs/RatNinja.js");

var _prefabsRatNinjaJs2 = _interopRequireDefault(_prefabsRatNinjaJs);

var _prefabsCatJs = require("../prefabs/Cat.js");

var _prefabsCatJs2 = _interopRequireDefault(_prefabsCatJs);

var _prefabsStalacitesJs = require("../prefabs/Stalacites.js");

var _prefabsStalacitesJs2 = _interopRequireDefault(_prefabsStalacitesJs);

var _prefabsEnemyStopsJs = require("../prefabs/EnemyStops.js");

var _prefabsEnemyStopsJs2 = _interopRequireDefault(_prefabsEnemyStopsJs);

var _prefabsPopupJs = require("../prefabs/Popup.js");

var _prefabsPopupJs2 = _interopRequireDefault(_prefabsPopupJs);

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var _prefabsCheeseScoreJs = require("../prefabs/CheeseScore.js");

var _prefabsCheeseScoreJs2 = _interopRequireDefault(_prefabsCheeseScoreJs);

var _prefabsShurikenHUDJs = require("../prefabs/ShurikenHUD.js");

var _prefabsShurikenHUDJs2 = _interopRequireDefault(_prefabsShurikenHUDJs);

var _prefabsTitleTextJs = require("../prefabs/TitleText.js");

var _prefabsTitleTextJs2 = _interopRequireDefault(_prefabsTitleTextJs);

var Ep5 = (function (_Phaser$State) {
  _inherits(Ep5, _Phaser$State);

  function Ep5() {
    _classCallCheck(this, Ep5);

    //object level properties
    _get(Object.getPrototypeOf(Ep5.prototype), "constructor", this).call(this);
  }

  _createClass(Ep5, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 800;
      //this sets the default contact material to all P2 body in this world
      this.physics.p2.world.defaultContactMaterial.friction = 0.42; //perfect not to be AIRBORNE
      this.physics.p2.world.setGlobalStiffness(1e5);

      //map start
      this.map = this.add.tilemap('ep5');
      //add tileset image
      this.map.addTilesetImage('tile');
      //parallax background
      this.bg = this.map.createLayer('background');
      this.bg.scrollFactorX = .7;
      this.bg.scrollFactorY = .7;

      //walkable tiles
      this.layer = this.map.createLayer('tiles');

      //collision
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 120, true, this.layer);
      var tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

      //general world properties above--------------------------------//
      //add water waves if any
      this.map.createFromObjects('movingwaves', 184, 'objects1', 'watertile', true, false, this.world, _prefabsWavesObjectsJs2["default"]);
      //add the damage zone associated with the water area
      this.damageZone = new Phaser.Rectangle(0, 3340, 390, 120);
      //----------------------------
      //add platforms
      this.platformsGroup = this.add.group();
      var slipperyMaterials = new Array();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'platforms').forEach(function (element) {
        //looks like doesnt support object unique id for now
        _this.map.createFromObjects('platforms', element.gid, 'objects1', element.name, true, false, _this.platformsGroup, _prefabsPlatformsJs2["default"]);
      });
      this.platformsGroup.forEach(function (child) {
        //this is NOT in order of the Tiled since the above add all gids 183 THEN 182
        slipperyMaterials.push(_this.physics.p2.createMaterial('slipperyMaterial', child.body));
      }, this);

      //add blocking objects
      this.blockingGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'blockingobjects').forEach(function (element) {
        _this.map.createFromObjects('blockingobjects', element.gid, 'objects1', element.name, true, false, _this.blockingGroup, _prefabsBlockingObjectsJs2["default"]);
      });

      //add collectables
      this.collectablesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'collectables').forEach(function (element) {
        _this.map.createFromObjects('collectables', element.gid, 'objects1', element.name, true, false, _this.collectablesGroup, _prefabsCollectablesJs2["default"]);
      });

      //add weapons
      this.map.createFromObjects('weapons', 196, 'objects4', 'shurikens', true, false, this.collectablesGroup, _prefabsCollectablesJs2["default"]);

      //add the stalacites
      this.stalacitesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'stalacites').forEach(function (element) {
        _this.map.createFromObjects('stalacites', element.gid, 'objects2', element.name, true, false, _this.stalacitesGroup, _prefabsStalacitesJs2["default"]);
      });
      //-----------------------------
      //add entrance door
      this.map.createFromObjects('door', 176, 'objects1', 'entrancedoor', true, false, this.world, _prefabsEntranceDoorJs2["default"]);
      this.entrancedoor = this.world.getTop();

      this.player = new _prefabsPlayerJs2["default"](this.game, 1780, 1950); //start pos
      //this.player = new Player(this.game,1500,3200);
      //this.player = new Player(this.game,2820,3590);
      //player materials
      var playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);
      //contact material with slippery platforms..
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[0], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[1], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[2], { friction: 0.35, surfaceVelocity: -1000 });

      this.add.existing(this.player);

      this.camera.follow(this.player);

      //stop all previous playing sound first
      this.sound.stopAll();
      this.sfx = this.add.audioSprite('sfx');
      this.theme = this.add.audioSprite('theme');
      if (_componentsToolsJs2["default"].getData('mutesound')) _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
      if (_componentsToolsJs2["default"].getData('mutetheme')) _componentsToolsJs2["default"].muteOrPlay(this.theme, true);

      this.player.sfx = this.sfx;

      //add enemy rat grunt
      this.ratGroup = this.add.group();
      this.map.createFromObjects('ratgrunts', 187, 'ratgrunt', 'frame0', true, false, this.ratGroup, _prefabsRatGruntJs2["default"]);
      this.ratGroup.forEach(function (ratGrunt) {
        ratGrunt.player = _this.player;
        ratGrunt.sfx = _this.sfx;
      }, this);

      //add enemy rat soldiers
      this.map.createFromObjects('ratsoldiers', 191, 'ratsoldier', 'hitframe0', true, false, this.ratGroup, _prefabsRatSoldierJs2["default"]);
      this.ratGroup.forEach(function (ratSoldier) {
        ratSoldier.player = _this.player;
        ratSoldier.sfx = _this.sfx;
      }, this);

      //add enemy rat ratninjas
      this.map.createFromObjects('ratninjas', 195, 'ratninja', 'throwframe1', true, false, this.ratGroup, _prefabsRatNinjaJs2["default"]);
      this.ratGroup.forEach(function (ratNinja) {
        ratNinja.player = _this.player;
      }, this);

      this.catGroup = this.add.group();
      this.map.createFromObjects('cats', 194, 'cat', 'frame0', true, false, this.catGroup, _prefabsCatJs2["default"]);

      //add enemy stops
      this.stopsGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'enemystops').forEach(function (element) {
        _this.map.createFromObjects('enemystops', element.gid, 'objects1', element.name, true, false, _this.stopsGroup, _prefabsEnemyStopsJs2["default"]);
      });

      //the most front layer which to be displayed in front of player
      this.map.createLayer('decorative2');

      //UI setup
      this.healthBar = new _prefabsHealthBarJs2["default"](this.game, 20, 20);
      this.energyBar = new _prefabsEnergyBarJs2["default"](this.game, 31, 80);
      this.player.energyBar = this.energyBar;
      this.player.healthBar = this.healthBar;

      this.cheeseScore = new _prefabsCheeseScoreJs2["default"](this.game, 460, 20, 19);
      this.shurikenHUD = new _prefabsShurikenHUDJs2["default"](this.game, 870, 25, 18);
      this.player.shurikenHUD = this.shurikenHUD;

      //add collision groups
      //  Turn on impact events for the world, without this we get no collision callbacks
      this.physics.p2.setImpactEvents(true);

      var tilesCG = this.physics.p2.createCollisionGroup();
      var platformsCG = this.physics.p2.createCollisionGroup();
      var stalacitesCG = this.physics.p2.createCollisionGroup();
      var playerCG = this.physics.p2.createCollisionGroup();
      var hitboxCG = this.physics.p2.createCollisionGroup();
      var shurikenboxCG = this.physics.p2.createCollisionGroup();
      var ratHitboxCG = this.physics.p2.createCollisionGroup();
      var ninjaShurikenCG = this.physics.p2.createCollisionGroup();
      var catBallsCG = this.physics.p2.createCollisionGroup();
      var blockingObjectsCG = this.physics.p2.createCollisionGroup();
      var collectablesCG = this.physics.p2.createCollisionGroup();
      var ratCG = this.physics.p2.createCollisionGroup();
      var catCG = this.physics.p2.createCollisionGroup();
      var stopsCG = this.physics.p2.createCollisionGroup();
      var entrancedoorCG = this.physics.p2.createCollisionGroup();

      //update world bounds collision group  to collide with all the custom collision groups
      this.physics.p2.updateBoundsCollisionGroup();
      //set the collisions
      //tile materials
      var tileMaterial = this.physics.p2.createMaterial('tileMaterial');
      tilesBodies.forEach(function (tile) {
        tile.setMaterial(tileMaterial);
        tile.setCollisionGroup(tilesCG);
        tile.collides([playerCG, collectablesCG, blockingObjectsCG, ratCG, catCG, catBallsCG]);
      });
      this.platformsGroup.forEach(function (child) {
        child.body.setCollisionGroup(platformsCG);
        child.body.collides([playerCG, collectablesCG, ratCG, catCG, catBallsCG]);
      }, this);
      this.stalacitesGroup.forEach(function (child) {
        child.body.setCollisionGroup(stalacitesCG);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
      }, this);
      this.player.body.setCollisionGroup(playerCG);
      this.player.body.collides([tilesCG, stalacitesCG, blockingObjectsCG, platformsCG, collectablesCG, ratCG, catCG, ratHitboxCG, ninjaShurikenCG, catBallsCG, entrancedoorCG], this.platformHitListener, this);
      this.player.hitbox1.body.setCollisionGroup(hitboxCG);
      this.player.hitbox1.body.collides([ratCG, catCG, catBallsCG, ninjaShurikenCG], this.playerHitListener, this);
      this.player.shurikens.forEach(function (shuriken) {
        shuriken.body.setCollisionGroup(shurikenboxCG);
        shuriken.body.collides([ratCG, catCG, catBallsCG, ninjaShurikenCG], _this.playerHitListener, _this);
      }, this);
      this.blockingGroup.forEach(function (child) {
        child.body.setCollisionGroup(blockingObjectsCG);
        child.body.collides([playerCG, collectablesCG, ratCG, tilesCG, catCG, catBallsCG]);
      }, this);
      this.collectablesGroup.forEach(function (child) {
        child.body.setCollisionGroup(collectablesCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG]);
        child.body.collides(playerCG, _this.collectablesListener, _this);
      }, this);
      this.ratGroup.forEach(function (child) {
        child.body.setCollisionGroup(ratCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, stopsCG, hitboxCG, shurikenboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
        if (child.key == 'ratsoldier') {
          //for rat soldiers only
          child.hitbox1.body.setCollisionGroup(ratHitboxCG);
          child.hitbox1.body.collides(playerCG, _this.enemyHitListener, _this);
        }
        if (child.key == 'ratninja') {
          child.shurikens.forEach(function (shuriken) {
            shuriken.body.setCollisionGroup(ninjaShurikenCG);
            shuriken.body.collides([hitboxCG, shurikenboxCG]);
            shuriken.body.collides(playerCG, _this.enemyHitListener, _this);
          }, _this);
        }
      }, this);
      var ballMaterial = this.physics.p2.createMaterial('ballMaterial');
      this.catGroup.forEach(function (child) {
        child.body.setCollisionGroup(catCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, stopsCG, hitboxCG, shurikenboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
        child.balls.forEach(function (ball) {
          ball.body.setMaterial(ballMaterial);
          ball.body.setCollisionGroup(catBallsCG);
          ball.body.collides([tilesCG, platformsCG, blockingObjectsCG, hitboxCG, shurikenboxCG]);
          ball.body.collides(playerCG, _this.enemyHitListener, _this);
        }, child);
      }, this);
      this.stopsGroup.forEach(function (child) {
        child.body.setCollisionGroup(stopsCG);
        child.body.collides([ratCG, catCG]);
      }, this);
      this.entrancedoor.body.setCollisionGroup(entrancedoorCG);
      this.entrancedoor.body.collides(playerCG, this.nextEpisode, this);

      this.physics.p2.createContactMaterial(tileMaterial, ballMaterial, { friction: 0.2, restitution: 0.8 });

      //lock arrows key input from the browser
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE, Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
      //initialize pop up panels,main pop up, instruction, tip1...N
      //add esc key to bring up pop up panel
      this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc': Phaser.KeyCode.ESC });
      this.naviKeys.esc.onDown.add(function () {
        if (!_this.game.paused) {
          _this.game.paused = true;
          _this.popup = new _prefabsPopupJs2["default"](_this.game, _this.camera.x, _this.camera.y, 2);
          _this.world.addChild(_this.popup);
        } else {
          _this.resumeGame();
        }
      }, this);
      this.naviKeys.up.onDown.add(function (target) {
        //should this be added inside the Popup clas?
        //console.log("up");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.down.onDown.add(function (target) {
        //console.log("down");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.enter.onDown.add(function () {
        if (_this.game.paused) _this.processSelection();
      }, this);

      this.game.onPause.add(function () {
        this.sound.unsetMute();
      }, this); //<==enable the sound to continue play ';)'
      this.theme.sounds['Obliteration'].play('Obliteration', null, 0.3, true);

      this.titletext = new _prefabsTitleTextJs2["default"](this.game, 'Ep 5. The Ninja Reality');
      this.add.existing(this.titletext);

      //To get the FPS
      this.time.advancedTiming = true;
    }
  }, {
    key: "update",
    value: function update() {
      if (this.damageZone.intersectsRaw(this.player.left, this.player.right, this.player.top, this.player.bottom)) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['Footstep_Water_04', 'Footstep_Water_05', 'Footstep_Water_06']);
        this.player.damagePlayer(4);
      }
    }
  }, {
    key: "nextEpisode",
    value: function nextEpisode(thisBody, thatBody) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        this.cheeseScore.addToTotalScore(5);
        this.state.start('preload', true, false, 'ep6');
      }
    }

    ////---> In Game Menu
  }, {
    key: "resumeGame",
    value: function resumeGame() {
      var somepopup = this.world.getTop();
      if (somepopup.key === 'popup') {
        this.world.removeChild(somepopup);
        somepopup.destroy();
      }
      this.game.paused = false;
    }

    //processing for pop up menu items
  }, {
    key: "processSelection",
    value: function processSelection() {
      //let popupText = this.popup.optionEntered();
      var popupText = this.world.getTop().optionEntered();
      if (!popupText) return;

      console.log("enter " + popupText);
      //this guy has to do the lifting for the options
      switch (popupText) {
        case 'Resume Game':
          this.resumeGame();
          break;
        case 'Restart Episode':
          this.resumeGame(); //need to unpause the game before change state
          this.state.start('ep5');
          break;
        case 'Instructions':
          this.popupInstruction = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
          var instruction = this.cache.getJSON('config').popup.instructions;
          this.popupInstruction.setTitle(instruction['title']);
          this.popupInstruction.setDescription(instruction['description'], 0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupInstruction);
          this.enableCursorKeys(false);
          break;
        case 'Got it!':
          this.enableCursorKeys(true);
          this.resumeGame();
          break;
        case 'Quit to Main Menu':
          this.resumeGame();
          this.state.start('menu');
          break;
        case 'Mute Music':
          console.log("muting music ");
          _componentsToolsJs2["default"].storeData('mutetheme', true);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, true);
          break;
        case 'Mute Sound':
          console.log("muting sound");
          _componentsToolsJs2["default"].storeData('mutesound', true);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
          break;
        case 'Play Music':
          console.log("playing music");
          _componentsToolsJs2["default"].storeData('mutetheme', false);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, false);
          break;
        case 'Play Sound':
          console.log("playing sound");
          _componentsToolsJs2["default"].storeData('mutesound', false);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, false);
          break;
      }
    }
  }, {
    key: "enableCursorKeys",
    value: function enableCursorKeys(bool) {
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
    }
  }, {
    key: "platformHitListener",
    value: function platformHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && (thatBody.sprite.frameName == 'slippery1' || thatBody.sprite.frameName == 'slippery2')) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['slime7', 'slime8', 'slime9']);
        this.player.onslippyplatform = true;
      } else {
        if (this.player.onslippyplatform) this.player.onslippyplatform = false;
      }
    }
  }, {
    key: "collectablesListener",
    value: function collectablesListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === "player") {
        console.log("player contacted by " + thisBody.sprite.frameName);
        switch (thisBody.sprite.frameName) {
          case 'cheese1':
            //increase player energy..
            this.player.replenishEnergy(10);
            this.cheeseScore.increaseScore(2);
            this.sfx.play('Rise04');

            break;
          case 'cheese2':
          case 'cheese3':
            //increase player energy..
            this.player.replenishEnergy(5);
            this.cheeseScore.increaseScore(1);
            this.sfx.play('Rise04');

            break;
          case 'wineglass':
          case 'martiniglass':
            this.player.replenishLife(10);
            this.sfx.play('Rise04');

            break;
          case 'winebottle':
            this.player.replenishLife(20);
            this.sfx.play('Rise04');

            break;
          case 'shurikens':
            if (!this.player.throwEnabled) this.player.throwBody(); //player might start new game, n then continue this ep

            //increase player shurikens count
            this.player.increaseShuriken(5);
            this.sfx.play('Rise04');

            break;
        }
        //flashy
        this.player.flash('green');
        //destroy the said sprite
        thisBody.sprite.destroy();
      }
    }
  }, {
    key: "enemyHitListener",
    value: function enemyHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        //Does the things that hit player all have sprite shape? and defined key?
        if (thisBody.sprite) {
          console.log('player hit by: ' + thisBody.sprite.key + ' ' + thisBody.sprite.name);
          switch (thisBody.sprite.key) {
            case 'ratgrunt':
              //rat grunt
              if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(5);
              break;
            case 'ratsoldier': //rat soldier
            case 'ratninja':
              if (/^s\d{1}/.test(thisBody.sprite.frameName)) {
                this.player.damagePlayer(5, 200);
                thisBody.sprite.kill();
              } else if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(8);
              break;
            case 'cat':
              this.player.damagePlayer(8);
              break;
            case 'objects3':
              //objects 3 are all balls
              this.player.damagePlayer(4);
              break;
            case 'objects2':
              var str = thisBody.sprite.frameName;
              //below match its a stalacites - upper{/d} and below {/d}
              if (/^upper\d{1}/.test(str) || /^below\d{1}/.test(str)) this.player.damagePlayer(4);
              break;
            case 'objects1':
              //clubbed by soldier
              if (thisBody.sprite.frameName == 'stop') this.player.damagePlayer(5, 200);
              break;
          }
        }
      }
    }
  }, {
    key: "playerHitListener",
    value: function playerHitListener(thisBody, thatBody, thisShape, thatShape) {
      //hitbox only target is enemy so pretty much no need to check
      if (thatBody.sprite) {
        if (thisBody.sprite && /^s\d{1}/.test(thisBody.sprite.frameName)) {
          console.log("shuriken hit");
          //kill the shuriken body
          switch (thatBody.sprite.key) {
            case 'ratgrunt':
            case 'ratsoldier':
            case 'ratninja':
              thatBody.sprite.damageRat(6, 400);
              break;
            case 'cat':
              thatBody.sprite.damageCat(6, 400);
              break;
          }
          thisBody.sprite.kill();
        } else {
          switch (thatBody.sprite.key) {
            case 'ratgrunt':
            case 'ratsoldier':
            case 'ratninja':
              thatBody.sprite.damageRat(8, 400);
              break;
            case 'cat':
              thatBody.sprite.damageCat(8, 400);
              break;
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
    }
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }]);

  return Ep5;
})(Phaser.State);

exports["default"] = Ep5;
module.exports = exports["default"];

},{"../components/Tools.js":2,"../prefabs/BlockingObjects.js":3,"../prefabs/Cat.js":4,"../prefabs/CheeseScore.js":6,"../prefabs/Collectables.js":7,"../prefabs/EnemyStops.js":8,"../prefabs/EnergyBar.js":9,"../prefabs/EntranceDoor.js":10,"../prefabs/HealthBar.js":11,"../prefabs/Platforms.js":12,"../prefabs/Player.js":13,"../prefabs/Popup.js":14,"../prefabs/RatGrunt.js":16,"../prefabs/RatNinja.js":17,"../prefabs/RatSoldier.js":18,"../prefabs/ShurikenHUD.js":19,"../prefabs/Stalacites.js":20,"../prefabs/TitleText.js":21,"../prefabs/WavesObjects.js":22}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsEntranceDoorJs = require("../prefabs/EntranceDoor.js");

var _prefabsEntranceDoorJs2 = _interopRequireDefault(_prefabsEntranceDoorJs);

var _prefabsBlockingObjectsJs = require("../prefabs/BlockingObjects.js");

var _prefabsBlockingObjectsJs2 = _interopRequireDefault(_prefabsBlockingObjectsJs);

var _prefabsCollectablesJs = require("../prefabs/Collectables.js");

var _prefabsCollectablesJs2 = _interopRequireDefault(_prefabsCollectablesJs);

var _prefabsWavesObjectsJs = require("../prefabs/WavesObjects.js");

var _prefabsWavesObjectsJs2 = _interopRequireDefault(_prefabsWavesObjectsJs);

var _prefabsPlatformsJs = require("../prefabs/Platforms.js");

var _prefabsPlatformsJs2 = _interopRequireDefault(_prefabsPlatformsJs);

var _prefabsHealthBarJs = require("../prefabs/HealthBar.js");

var _prefabsHealthBarJs2 = _interopRequireDefault(_prefabsHealthBarJs);

var _prefabsEnergyBarJs = require("../prefabs/EnergyBar.js");

var _prefabsEnergyBarJs2 = _interopRequireDefault(_prefabsEnergyBarJs);

var _prefabsRatSoldierJs = require("../prefabs/RatSoldier.js");

var _prefabsRatSoldierJs2 = _interopRequireDefault(_prefabsRatSoldierJs);

var _prefabsRatNinjaJs = require("../prefabs/RatNinja.js");

var _prefabsRatNinjaJs2 = _interopRequireDefault(_prefabsRatNinjaJs);

var _prefabsRatBossJs = require("../prefabs/RatBoss.js");

var _prefabsRatBossJs2 = _interopRequireDefault(_prefabsRatBossJs);

var _prefabsCatFinaleJs = require("../prefabs/CatFinale.js");

var _prefabsCatFinaleJs2 = _interopRequireDefault(_prefabsCatFinaleJs);

var _prefabsStalacitesJs = require("../prefabs/Stalacites.js");

var _prefabsStalacitesJs2 = _interopRequireDefault(_prefabsStalacitesJs);

var _prefabsEnemyStopsJs = require("../prefabs/EnemyStops.js");

var _prefabsEnemyStopsJs2 = _interopRequireDefault(_prefabsEnemyStopsJs);

var _prefabsPopupJs = require("../prefabs/Popup.js");

var _prefabsPopupJs2 = _interopRequireDefault(_prefabsPopupJs);

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var _prefabsCheeseScoreJs = require("../prefabs/CheeseScore.js");

var _prefabsCheeseScoreJs2 = _interopRequireDefault(_prefabsCheeseScoreJs);

var _prefabsShurikenHUDJs = require("../prefabs/ShurikenHUD.js");

var _prefabsShurikenHUDJs2 = _interopRequireDefault(_prefabsShurikenHUDJs);

var _prefabsTitleTextJs = require("../prefabs/TitleText.js");

var _prefabsTitleTextJs2 = _interopRequireDefault(_prefabsTitleTextJs);

var Ep6 = (function (_Phaser$State) {
  _inherits(Ep6, _Phaser$State);

  function Ep6() {
    _classCallCheck(this, Ep6);

    //object level properties
    _get(Object.getPrototypeOf(Ep6.prototype), "constructor", this).call(this);
  }

  _createClass(Ep6, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 800;
      //this sets the default contact material to all P2 body in this world
      this.physics.p2.world.defaultContactMaterial.friction = 0.42; //perfect not to be AIRBORNE
      this.physics.p2.world.setGlobalStiffness(1e5);

      //map start
      this.map = this.add.tilemap('ep6');
      //add tileset image
      this.map.addTilesetImage('tile');
      //parallax background
      this.bg = this.map.createLayer('background');
      this.bg.scrollFactorX = .7;
      this.bg.scrollFactorY = .7;

      //walkable tiles
      this.layer = this.map.createLayer('tiles');

      //collision
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 122, true, this.layer);
      var tilesBodies = this.physics.p2.convertTilemap(this.map, this.layer);

      //----------------------------
      //add platforms
      this.platformsGroup = this.add.group();
      var slipperyMaterials = new Array();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'platforms').forEach(function (element) {
        //looks like doesnt support object unique id for now
        _this.map.createFromObjects('platforms', element.gid, 'objects1', element.name, true, false, _this.platformsGroup, _prefabsPlatformsJs2["default"]);
      });
      this.platformsGroup.forEach(function (child) {
        //this is NOT in order of the Tiled since the above add all gids 183 THEN 182
        slipperyMaterials.push(_this.physics.p2.createMaterial('slipperyMaterial', child.body));
      }, this);

      //add blocking objects
      this.blockingGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'blockingobjects').forEach(function (element) {
        _this.map.createFromObjects('blockingobjects', element.gid, 'objects1', element.name, true, false, _this.blockingGroup, _prefabsBlockingObjectsJs2["default"]);
      });

      //add large rock
      this.map.createFromObjects('largerock', 27, 'objects5', 'largerock', true, false, this.blockingGroup, _prefabsBlockingObjectsJs2["default"]);
      this.largerock = this.blockingGroup.getTop();
      console.log("this largerock? " + this.largerock.frameName);

      //add entrance door -- behind of collectables
      this.map.createFromObjects('door', 5, 'objects1', 'entrancedoor', true, false, this.world, _prefabsEntranceDoorJs2["default"]);
      this.entrancedoor = this.world.getTop();
      this.entrancedoor.kill();

      //add collectables
      this.collectablesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'collectables').forEach(function (element) {
        _this.map.createFromObjects('collectables', element.gid, 'objects1', element.name, true, false, _this.collectablesGroup, _prefabsCollectablesJs2["default"]);
      });

      this.map.createFromObjects('cheesepule', 26, 'objects5', 'cheesepule', true, false, this.collectablesGroup, _prefabsCollectablesJs2["default"]);

      //add weapons
      this.map.createFromObjects('weapons', 29, 'objects4', 'shurikens', true, false, this.collectablesGroup, _prefabsCollectablesJs2["default"]);

      //add the stalacites
      this.stalacitesGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'stalacites').forEach(function (element) {
        _this.map.createFromObjects('stalacites', element.gid, 'objects2', element.name, true, false, _this.stalacitesGroup, _prefabsStalacitesJs2["default"]);
      });
      //-----------------------------
      this.player = new _prefabsPlayerJs2["default"](this.game, 60, 1575); //start pos

      var playerMaterial = this.physics.p2.createMaterial('playerMaterial', this.player.body);

      this.add.existing(this.player);

      this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

      //stop all previous playing sound first
      this.sound.stopAll();
      this.sfx = this.add.audioSprite('sfx');
      this.theme = this.add.audioSprite('boss');
      if (_componentsToolsJs2["default"].getData('mutesound')) _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
      if (_componentsToolsJs2["default"].getData('mutetheme')) _componentsToolsJs2["default"].muteOrPlay(this.theme, true);

      this.player.sfx = this.sfx;

      //------- enemies rats only initialized after rat boss speech
      //add enemy rat soldiers
      this.ratGroup = this.add.group(this.world, 'rats');
      this.map.createFromObjects('ratsoldiers', 20, 'ratsoldier', 'hitframe0', true, false, this.ratGroup, _prefabsRatSoldierJs2["default"]);
      /*
      this.ratGroup.forEach((ratSoldier)=>{
        ratSoldier.paused=true;
      },this);*/
      this.ratGroup.setAll('paused', true); //-- set all paused to true at first

      //add enemy rat ratninjas
      this.map.createFromObjects('ratninjas', 28, 'ratninja', 'throwframe1', true, false, this.ratGroup, _prefabsRatNinjaJs2["default"]);

      this.map.createFromObjects('ratboss', 24, 'ratboss', 'bodyf1', true, false, this.ratGroup, _prefabsRatBossJs2["default"]);

      this.ratGroup.forEach(function (rat) {
        rat.player = _this.player;
        rat.sfx = _this.sfx;
      }, this);

      var ratboss = this.ratGroup.getTop();
      console.log('ratboss? ' + ratboss.key);
      //ratboss.sfx = this.sfx;
      var rightarm = ratboss.rightarm;
      var ratbossmaterial = this.physics.p2.createMaterial('ratbossmaterial', ratboss.body);
      var armmaterial = this.physics.p2.createMaterial('armmaterial', rightarm.body);

      this.physics.p2.createContactMaterial(playerMaterial, armmaterial, { friction: 0.35, restitution: 0.8 });
      this.physics.p2.createContactMaterial(playerMaterial, ratbossmaterial, { friction: 0.35, restitution: 0.8 });

      //contact material with slippery platforms..
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[0], { friction: 0.35, surfaceVelocity: -1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[1], { friction: 0.35, surfaceVelocity: 1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[2], { friction: 0.35, surfaceVelocity: 1000 });
      this.physics.p2.createContactMaterial(playerMaterial, slipperyMaterials[3], { friction: 0.35, surfaceVelocity: 1000 });

      //bring the rats group to front, the arm to back
      this.world.bringToTop(this.ratGroup);

      //add enemy stops
      this.stopsGroup = this.add.group();
      _componentsToolsJs2["default"].findUniqueGIDInLayer(this.map, 'enemystops').forEach(function (element) {
        _this.map.createFromObjects('enemystops', element.gid, 'objects1', element.name, true, false, _this.stopsGroup, _prefabsEnemyStopsJs2["default"]);
      });

      //UI setup
      this.healthBar = new _prefabsHealthBarJs2["default"](this.game, 20, 20);
      this.energyBar = new _prefabsEnergyBarJs2["default"](this.game, 31, 80);
      this.player.energyBar = this.energyBar;
      this.player.healthBar = this.healthBar;

      this.cheeseScore = new _prefabsCheeseScoreJs2["default"](this.game, 460, 20, 109);
      this.shurikenHUD = new _prefabsShurikenHUDJs2["default"](this.game, 870, 25, 18);
      this.player.shurikenHUD = this.shurikenHUD;

      //add collision groups
      //  Turn on impact events for the world, without this we get no collision callbacks
      this.physics.p2.setImpactEvents(true);

      var tilesCG = this.physics.p2.createCollisionGroup();
      var platformsCG = this.physics.p2.createCollisionGroup();
      var stalacitesCG = this.physics.p2.createCollisionGroup();
      var playerCG = this.physics.p2.createCollisionGroup();
      var hitboxCG = this.physics.p2.createCollisionGroup();
      var shurikenboxCG = this.physics.p2.createCollisionGroup();
      var ratHitboxCG = this.physics.p2.createCollisionGroup();
      var ninjaShurikenCG = this.physics.p2.createCollisionGroup();
      var blockingObjectsCG = this.physics.p2.createCollisionGroup();
      var collectablesCG = this.physics.p2.createCollisionGroup();
      var ratCG = this.physics.p2.createCollisionGroup();
      var stopsCG = this.physics.p2.createCollisionGroup();
      this.catCG = this.physics.p2.createCollisionGroup();
      this.entrancedoorCG = this.physics.p2.createCollisionGroup();

      var armCG = this.physics.p2.createCollisionGroup();

      //update world bounds collision group  to collide with all the custom collision groups
      this.physics.p2.updateBoundsCollisionGroup();
      //set the collisions
      tilesBodies.forEach(function (tile) {
        tile.setCollisionGroup(tilesCG);
        tile.collides([playerCG, collectablesCG, blockingObjectsCG, ratCG]);
      });
      this.platformsGroup.forEach(function (child) {
        child.body.setCollisionGroup(platformsCG);
        child.body.collides([playerCG, collectablesCG, ratCG]);
      }, this);
      this.stalacitesGroup.forEach(function (child) {
        child.body.setCollisionGroup(stalacitesCG);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
      }, this);
      this.player.body.setCollisionGroup(playerCG);
      this.player.body.collides([tilesCG, stalacitesCG, blockingObjectsCG, platformsCG, collectablesCG, ratCG, ratHitboxCG, armCG, ninjaShurikenCG], this.platformHitListener, this);
      this.player.hitbox1.body.setCollisionGroup(hitboxCG);
      this.player.hitbox1.body.collides([ratCG, ninjaShurikenCG], this.playerHitListener, this);
      this.player.shurikens.forEach(function (shuriken) {
        shuriken.body.setCollisionGroup(shurikenboxCG);
        shuriken.body.collides([ninjaShurikenCG, armCG]);
        shuriken.body.collides(ratCG, _this.playerHitListener, _this);
      }, this);
      this.blockingGroup.forEach(function (child) {
        child.body.setCollisionGroup(blockingObjectsCG);
        child.body.collides([playerCG, collectablesCG, ratCG, tilesCG]);
      }, this);
      this.collectablesGroup.forEach(function (child) {
        child.body.setCollisionGroup(collectablesCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG]);
        child.body.collides(playerCG, _this.collectablesListener, _this);
      }, this);
      this.ratGroup.forEach(function (child) {
        child.body.setCollisionGroup(ratCG);
        child.body.collides([tilesCG, platformsCG, blockingObjectsCG, stopsCG, hitboxCG, shurikenboxCG]);
        child.body.collides(playerCG, _this.enemyHitListener, _this);
        if (child.key == 'ratsoldier') {
          //for rat soldiers only
          child.hitbox1.body.setCollisionGroup(ratHitboxCG);
          child.hitbox1.body.collides(playerCG, _this.enemyHitListener, _this);
        }
        if (child.key == 'ratninja') {
          child.shurikens.forEach(function (shuriken) {
            shuriken.body.setCollisionGroup(ninjaShurikenCG);
            shuriken.body.collides([hitboxCG, shurikenboxCG]);
            shuriken.body.collides(playerCG, _this.enemyHitListener, _this);
          }, _this);
        }
      }, this);
      rightarm.body.setCollisionGroup(armCG);
      rightarm.body.collides([playerCG, shurikenboxCG]);
      rightarm.body.onBeginContact.add(this.playerArmed, this);
      this.stopsGroup.forEach(function (child) {
        child.body.setCollisionGroup(stopsCG);
        child.body.collides([ratCG]);
      }, this);
      this.entrancedoor.body.setCollisionGroup(this.entrancedoorCG);
      this.entrancedoor.body.collides(this.catCG, this.finalEpisode, this);

      //lock arrows key input from the browser
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE, Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
      //initialize pop up panels,main pop up, instruction, tip1...N
      //add esc key to bring up pop up panel
      this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc': Phaser.KeyCode.ESC });
      this.naviKeys.esc.onDown.add(function () {
        if (!_this.game.paused) {
          _this.game.paused = true;
          _this.popup = new _prefabsPopupJs2["default"](_this.game, _this.camera.x, _this.camera.y, 2);
          _this.world.addChild(_this.popup);
        } else {
          _this.resumeGame();
        }
      }, this);
      this.naviKeys.up.onDown.add(function (target) {
        //should this be added inside the Popup clas?
        //console.log("up");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.down.onDown.add(function (target) {
        //console.log("down");
        if (_this.game.paused) {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.enter.onDown.add(function () {
        if (_this.game.paused) _this.processSelection();
      }, this);

      this.game.onPause.add(function () {
        this.sound.unsetMute();
      }, this); //<==enable the sound to continue play ';)'
      this.theme.sounds['Improv for Evil'].play('Improv for Evil', null, 0.4, true);

      this.titletext = new _prefabsTitleTextJs2["default"](this.game, "Ep 6. The O'Mighty Claw");
      this.add.existing(this.titletext);

      //To get the FPS
      this.time.advancedTiming = true;

      this.scenesmarker = [false, false, false, false];
      //first scene - scan room , boss speech
      //second scene -
      this.cameratimer = 0;
      this.scenecounter = 0;
    }
  }, {
    key: "addCat",
    value: function addCat() {
      //add the special cat
      if (this.catfinale) return;
      this.catGroup = this.add.group(this.world, 'cats');
      this.map.createFromObjects('cats', 23, 'catfinale', 'catf1', true, false, this.catGroup, _prefabsCatFinaleJs2["default"]);
      this.catfinale = this.catGroup.getTop(); //cat is the top no 28
      this.catfinale.body.setCollisionGroup(this.catCG);
      this.catfinale.body.collides(this.entrancedoorCG);
    }
  }, {
    key: "update",
    value: function update() {

      if (this.player.x >= 250 && !this.scenesmarker[0]) {
        //first scene - freeze player and refocus to rat boss
        this.player.paused = true;
        //scan rat 3 - 6 - 5 - boss
        if (this.game.time.now > this.cameratimer) {
          switch (this.scenecounter++) {
            case 0:
              this.camera.follow(this.ratGroup.getChildAt(3), null, 0.02, 0.02);
              break;
            case 1:
              this.camera.follow(this.ratGroup.getChildAt(6), null, 0.03, 0.03);
              break;
            case 2:
              this.camera.follow(this.ratGroup.getChildAt(5), null, 0.03, 0.03);
              break;
            case 3:
              var boss = this.ratGroup.getTop();
              this.camera.follow(boss, null, 0.01, 0.01);
              boss.startscene = true;
              this.scenesmarker[0] = true;
              break;
          }
          this.cameratimer = this.game.time.now + 4000;
        }
      }
      var ratboss = this.ratGroup.getTop();
      //first scene finished
      if (this.player.paused && this.scenesmarker[0] && ratboss.alive && !ratboss.startscene) {
        console.log("set once only!");
        this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.ratGroup.setAll('paused', false); //reactivate rat soldiers
        this.player.paused = false; //reactivate dossier
        this.ratGroup.getTop().attack = true;
      }

      //after boss died
      if (!ratboss.alive && !this.scenesmarker[1]) {
        this.largerock.destroy();
        this.scenecounter = 0;
        this.scenesmarker[1] = true;
      }

      if (this.scenesmarker[1] && this.scenesmarker[2] && !this.scenesmarker[3]) {
        if (this.game.time.now > this.cameratimer) {
          switch (this.scenecounter++) {
            case 0:
              this.player.say("Yes! We've got the lost cheese! Let's go home!");
              break;
            case 1:
              this.player.paused = true;
              this.ratGroup.setAll('paused', true); //-- set all paused to true at first
              this.entrancedoor.revive();
              this.addCat();
              this.camera.follow(this.catfinale, null, 0.02, 0.02);
              break;
            case 2:
              console.log("marina text here");
              this.catfinale.say("Dossier! Save me! Don't let him take me away!!");
              break;
            case 3:
              console.log("camera pans to the door");
              this.camera.follow(this.entrancedoor, null, 0.02, 0.02);
              break;
            case 4:
              console.log("camera moves back to player, enables player, enables cat flying");
              this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
              this.player.paused = false;
              this.ratGroup.setAll('paused', false);
              this.catfinale.paused = false;
              this.scenecounter = 0;
              this.scenesmarker[3] = true;
              break;
          }
          this.cameratimer = this.game.time.now + 4000;
        }
      }

      if (this.scenesmarker[3]) {
        var interval = 6500;
        if (this.game.time.now > this.cameratimer) {
          switch (this.scenecounter++) {
            case 1:
              console.log("camera focus on cat, player paused, cat and marina fades away");
              this.player.paused = true;
              this.ratGroup.setAll('paused', true); //-- set all paused to true at first
              this.camera.follow(this.catfinale, null, 0.02, 0.02);
              break;
            case 2:
              console.log("camera moves to player, player text");
              this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
              this.player.paused = false;
              interval = 900;
              break;
            case 3:
              //need time for camera to shift in place
              this.player.say("Marina! Noooooo~!!");
              interval = 3000;
              break;
            case 4:
              console.log("screen fades away start won page");
              this.camera.fade(0x000000, 3500);
              interval = 4500;
              break;
            case 5:
              this.state.start('preload', true, false, 'won');
              break;
          }
          this.cameratimer = this.game.time.now + interval;
        }
      }

      //marina text

      //marina text finished, camera moves slowly to door, moves quickly back to player, enables player

      //camera touches door, camera focus on cat, player paused. Cat and marina fades away

      //camera moves quickly back to player. player text.

      //player text finished, screen fades away
    }
  }, {
    key: "finalEpisode",
    value: function finalEpisode(thisBody, thatBody) {
      if (thatBody.sprite && thatBody.sprite.key === 'catfinale') {
        console.log("cat touched door. end.");
        this.cheeseScore.addToTotalScore(6);
        this.catfinale.fadeout();
      }
    }

    ////---> In Game Menu
  }, {
    key: "resumeGame",
    value: function resumeGame() {
      var somepopup = this.world.getTop();
      if (somepopup.key === 'popup') {
        this.world.removeChild(somepopup);
        somepopup.destroy();
      }
      this.game.paused = false;
    }

    //processing for pop up menu items
  }, {
    key: "processSelection",
    value: function processSelection() {
      //let popupText = this.popup.optionEntered();
      var popupText = this.world.getTop().optionEntered();
      if (!popupText) return;

      console.log("enter " + popupText);
      //this guy has to do the lifting for the options
      switch (popupText) {
        case 'Resume Game':
          this.resumeGame();
          break;
        case 'Restart Episode':
          this.resumeGame(); //need to unpause the game before change state
          this.state.start('ep6');
          break;
        case 'Instructions':
          this.popupInstruction = new _prefabsPopupJs2["default"](this.game, this.camera.x, this.camera.y, 3);
          var instruction = this.cache.getJSON('config').popup.instructions;
          this.popupInstruction.setTitle(instruction['title']);
          this.popupInstruction.setDescription(instruction['description'], 0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupInstruction);
          this.enableCursorKeys(false);
          break;
        case 'Got it!':
          this.enableCursorKeys(true);
          this.resumeGame();
          break;
        case 'Quit to Main Menu':
          this.resumeGame();
          this.state.start('menu');
          break;
        case 'Mute Music':
          console.log("muting music ");
          _componentsToolsJs2["default"].storeData('mutetheme', true);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, true);
          break;
        case 'Mute Sound':
          console.log("muting sound");
          _componentsToolsJs2["default"].storeData('mutesound', true);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, true);
          break;
        case 'Play Music':
          console.log("playing music");
          _componentsToolsJs2["default"].storeData('mutetheme', false);
          _componentsToolsJs2["default"].muteOrPlay(this.theme, false);
          break;
        case 'Play Sound':
          console.log("playing sound");
          _componentsToolsJs2["default"].storeData('mutesound', false);
          _componentsToolsJs2["default"].muteOrPlay(this.sfx, false);
          break;
      }
    }
  }, {
    key: "enableCursorKeys",
    value: function enableCursorKeys(bool) {
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
    }
  }, {
    key: "platformHitListener",
    value: function platformHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && (thatBody.sprite.frameName == 'slippery1' || thatBody.sprite.frameName == 'slippery2')) {
        _componentsToolsJs2["default"].playSound(this.sfx, ['slime7', 'slime8', 'slime9']);
        this.player.onslippyplatform = true;
      } else {
        if (this.player.onslippyplatform) this.player.onslippyplatform = false;
      }
    }
  }, {
    key: "collectablesListener",
    value: function collectablesListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === "player") {
        console.log("player contacted by " + thisBody.sprite.frameName);
        switch (thisBody.sprite.frameName) {
          case 'cheese1':
            //increase player energy..
            this.player.replenishEnergy(10);
            this.cheeseScore.increaseScore(2);
            this.sfx.play('Rise04');

            break;
          case 'cheese2':
          case 'cheese3':
            //increase player energy..
            this.player.replenishEnergy(5);
            this.cheeseScore.increaseScore(1);
            this.sfx.play('Rise04');

            break;
          case 'wineglass':
          case 'martiniglass':
            this.player.replenishLife(10);
            this.sfx.play('Rise04');

            break;
          case 'winebottle':
            this.player.replenishLife(20);
            this.sfx.play('Rise04');

            break;
          case 'shurikens':
            if (!this.player.throwEnabled) this.player.throwBody();

            //increase player shurikens count
            this.player.increaseShuriken(5);
            this.sfx.play('Rise04');
            break;
          case 'cheesepule':
            console.log("yay cheese pule!");
            this.player.replenishEnergy(100);
            this.player.replenishLife(100);
            this.cheeseScore.increaseScore(100);
            this.sfx.play('collectsword');
            this.scenesmarker[2] = true;
            break;
        }
        //flashy
        this.player.flash('green');
        //destroy the said sprite
        thisBody.sprite.destroy();
      }
    }
  }, {
    key: "enemyHitListener",
    value: function enemyHitListener(thisBody, thatBody, thisShape, thatShape) {
      if (thatBody.sprite && thatBody.sprite.key === 'player') {
        //Does the things that hit player all have sprite shape? and defined key?
        if (thisBody.sprite) {
          //console.log('player hit by: '+thisBody.sprite.key+ ' '+thisBody.sprite.name);
          switch (thisBody.sprite.key) {
            case 'ratgrunt':
              //rat grunt
              if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(5);
              break;
            case 'ratsoldier': //rat soldier
            case 'ratninja':
              if (/^s\d{1}/.test(thisBody.sprite.frameName)) {
                this.player.damagePlayer(5, 200);
                thisBody.sprite.kill();
              } else if (thisShape === thisBody.data.shapes[0]) this.player.damagePlayer(8);
              break;
            case 'ratboss':
              this.player.damagePlayer(12);
              break;
            case 'cat':
              this.player.damagePlayer(8);
              break;
            case 'objects3':
              //objects 3 are all balls
              this.player.damagePlayer(4);
              break;
            case 'objects2':
              var str = thisBody.sprite.frameName;
              //below match its a stalacites - upper{/d} and below {/d}
              if (/^upper\d{1}/.test(str) || /^below\d{1}/.test(str)) this.player.damagePlayer(4);
              break;
            case 'objects1':
              //clubbed by soldier
              if (thisBody.sprite.frameName == 'stop') this.player.damagePlayer(5, 200);
              break;
          }
        }
      }
    }
  }, {
    key: "playerHitListener",
    value: function playerHitListener(thisBody, thatBody, thisShape, thatShape) {
      //hitbox only target is enemy so pretty much no need to check
      if (thatBody.sprite) {
        //console.log("player hit that body "+thatBody.sprite.key);
        if (thisBody.sprite && /^s\d{1}/.test(thisBody.sprite.frameName)) {
          //kill the shuriken body
          switch (thatBody.sprite.key) {
            case 'ratgrunt':
            case 'ratsoldier':
            case 'ratninja':
            case 'ratboss':
              thatBody.sprite.damageRat(6, 400);
              break;
            case 'cat':
              thatBody.sprite.damageCat(6, 400);
              break;
          }
          thisBody.sprite.kill();
        } else {
          switch (thatBody.sprite.key) {
            case 'ratgrunt':
            case 'ratsoldier':
            case 'ratninja':
            case 'ratboss':
              thatBody.sprite.damageRat(8, 400);
              break;
            case 'cat':
              thatBody.sprite.damageCat(8, 400);
              break;
          }
        }
      }
    }
  }, {
    key: "playerArmed",
    value: function playerArmed(bodyA, bodyB) {

      if (bodyA && bodyA.sprite && bodyA.sprite.key == 'player') {
        this.player.damagePlayer(10);
      }
    }
  }, {
    key: "render",
    value: function render() {
      //this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
    }
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }]);

  return Ep6;
})(Phaser.State);

exports["default"] = Ep6;
module.exports = exports["default"];

},{"../components/Tools.js":2,"../prefabs/BlockingObjects.js":3,"../prefabs/CatFinale.js":5,"../prefabs/CheeseScore.js":6,"../prefabs/Collectables.js":7,"../prefabs/EnemyStops.js":8,"../prefabs/EnergyBar.js":9,"../prefabs/EntranceDoor.js":10,"../prefabs/HealthBar.js":11,"../prefabs/Platforms.js":12,"../prefabs/Player.js":13,"../prefabs/Popup.js":14,"../prefabs/RatBoss.js":15,"../prefabs/RatNinja.js":17,"../prefabs/RatSoldier.js":18,"../prefabs/ShurikenHUD.js":19,"../prefabs/Stalacites.js":20,"../prefabs/TitleText.js":21,"../prefabs/WavesObjects.js":22}],30:[function(require,module,exports){
//require other components
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Game = (function (_Phaser$State) {
  _inherits(Game, _Phaser$State);

  _createClass(Game, [{
    key: "init",
    value: function init(whichEp) {
      this.episode = whichEp;
    }
  }]);

  function Game() {
    _classCallCheck(this, Game);

    //object level properties
    _get(Object.getPrototypeOf(Game.prototype), "constructor", this).call(this);
  }

  _createClass(Game, [{
    key: "create",
    value: function create() {
      this.state.start(this.episode);
      if (/^ep\d{1}/.test(this.episode)) _componentsToolsJs2["default"].storeEp(this.episode);
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Game;
})(Phaser.State);

exports["default"] = Game;
module.exports = exports["default"];

},{"../components/Tools.js":2}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var GameNarrative = (function (_Phaser$State) {
  _inherits(GameNarrative, _Phaser$State);

  function GameNarrative() {
    _classCallCheck(this, GameNarrative);

    //object level properties
    _get(Object.getPrototypeOf(GameNarrative.prototype), 'constructor', this).call(this);

    this.highlightStyle = {
      font: 'bold 28px Century', fill: '#cde16d'
    };
  }

  _createClass(GameNarrative, [{
    key: 'create',
    value: function create() {
      var _this = this;

      var narrativeimg = this.add.image(0, 0, 'narrative');
      var hightext = this.add.text(50, 700, "Press 'A' to continue...", this.highlightStyle);
      var movewhich = 0;

      //stop all previous playing sound first
      this.sound.stopAll();
      this.theme = this.add.audioSprite('intro');
      if (_componentsToolsJs2['default'].getData('mutetheme')) _componentsToolsJs2['default'].muteOrPlay(this.theme, true);

      this.add.tween(hightext).to({ alpha: 0.2 }, 600, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
      var move = new Array();
      move[0] = this.add.tween(narrativeimg).to({ x: '-506' }, 600, Phaser.Easing.Quadratic.InOut);
      move[1] = this.add.tween(narrativeimg).to({ x: '-1024' }, 600, Phaser.Easing.Quadratic.InOut);
      move[2] = this.add.tween(narrativeimg).to({ x: '-506' }, 600, Phaser.Easing.Quadratic.InOut);
      move[3] = this.add.tween(narrativeimg).to({ x: '-1024' }, 600, Phaser.Easing.Quadratic.InOut);
      move[4] = this.add.tween(narrativeimg).to({ x: '-506' }, 600, Phaser.Easing.Quadratic.InOut);
      move[5] = this.add.tween(narrativeimg).to({ x: '-1024' }, 600, Phaser.Easing.Quadratic.InOut);

      this.keyA = this.input.keyboard.addKey(Phaser.Keyboard.A);
      this.keyA.onDown.add(function () {
        var movenow = move[movewhich++];
        movenow.start();
        //console.log("position "+narrativeimg.x + "movewhich "+movewhich);
        if (movewhich == 6) {
          //have come to the end
          _this.state.start('preload', true, false, 'ep1');
        }
      }, this);

      this.game.onPause.add(function () {
        this.sound.unsetMute();
      }, this); //<==enable the sound to continue play ';)'
      this.theme.sounds['Finding Movement'].play('Finding Movement', null, 0.4, true);
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'movenarrative',
    value: function movenarrative() {}
  }]);

  return GameNarrative;
})(Phaser.State);

exports['default'] = GameNarrative;
module.exports = exports['default'];

},{"../components/Tools.js":2}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var GameOver = (function (_Phaser$State) {
  _inherits(GameOver, _Phaser$State);

  function GameOver() {
    _classCallCheck(this, GameOver);

    _get(Object.getPrototypeOf(GameOver.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(GameOver, [{
    key: 'create',
    value: function create() {
      var _this = this;

      this.add.image(0, 0, 'gameover');
      this.restart = this.add.image(0, 0, 'restartepisode');
      this['return'] = this.add.image(0, 0, 'return');
      this.add.image(0, 0, 'go_wordings');

      this.selectionArray = new Array(this.restart, this['return']);

      this.select('restartepisode');

      var sfx = this.game.add.audioSprite('sfx');

      this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER });
      this.naviKeys.enter.onDown.add(this.processSelection, this);
      this.naviKeys.up.onDown.add(function (target) {
        console.log("up");
        _this.selectionArray.unshift(_this.selectionArray.pop());
        _this.select(_this.selectionArray[0].key);
        sfx.play('menuselect');
      }, this);
      this.naviKeys.down.onDown.add(function (target) {
        console.log("down");
        _this.selectionArray.push(_this.selectionArray.shift());
        _this.select(_this.selectionArray[0].key);
        sfx.play('menuselect');
      }, this);

      //stop all previous playing sound first
      this.sound.stopAll();
      this.theme = this.add.audioSprite('gameover');
      if (_componentsToolsJs2['default'].getData('mutetheme')) _componentsToolsJs2['default'].muteOrPlay(this.theme, true);

      this.theme.play('Death of Kings', 0.6);
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'select',
    value: function select(which) {
      this.restart.alpha = 0.0; //restart
      this['return'].alpha = 0.0; //return

      switch (which) {
        case 'restartepisode':
          this.restart.alpha = 1.0;
          break;
        case 'return':
          this['return'].alpha = 1.0;
          break;
      }
    }
  }, {
    key: 'processSelection',
    value: function processSelection() {
      console.log("enter");
      switch (this.selectionArray[0].key) {
        case 'restartepisode':
          this.state.start('game', true, false, _componentsToolsJs2['default'].getEp());
          break;
        case 'return':
          this.state.start('menu');
          break;
      }
    }
  }]);

  return GameOver;
})(Phaser.State);

exports['default'] = GameOver;
module.exports = exports['default'];

},{"../components/Tools.js":2}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _prefabsPopupJs = require("../prefabs/Popup.js");

var _prefabsPopupJs2 = _interopRequireDefault(_prefabsPopupJs);

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Menu = (function () {
  function Menu() {
    _classCallCheck(this, Menu);
  }

  _createClass(Menu, [{
    key: "create",
    value: function create() {
      var _this = this;

      //let images = this.cache.getKeys(Phaser.Cache.IMAGE);
      this.add.image(0, 0, 'splashscreen');
      this.animeffect = this.add.image(0, 0, 'animeffect');
      this.start = this.add.image(0, 0, 'start');
      this["continue"] = this.add.image(0, 0, 'continue');
      this.options = this.add.image(0, 0, 'options');
      this.add.image(0, 0, 'wordings');

      //let all sounds still play even when game paused
      //is this a one time setting??
      //this.sound.muteOnPause = false;//<== only effective for DOM
      this.selectionArray = new Array(this.start, this["continue"], this.options);

      //enable start by default
      this.select('start');
      this.add.tween(this.animeffect).to({ alpha: 0.2 }, 800, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);

      var sfx = this.game.add.audioSprite('sfx');

      this.nextLvlpopup = false;
      //paused state responds to signals
      this.naviKeys = this.input.keyboard.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'enter': Phaser.KeyCode.ENTER, 'esc': Phaser.KeyCode.ESC });
      this.naviKeys.enter.onDown.add(this.processSelection, this);
      this.naviKeys.up.onDown.add(function (target) {
        //pop then unshift
        console.log("up");
        if (!_this.game.paused) {
          _this.selectionArray.unshift(_this.selectionArray.pop());
          _this.select(_this.selectionArray[0].key);
          sfx.play('menuselect');
        } else {
          //popup box time
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.down.onDown.add(function (target) {
        console.log("down");
        //shift then push
        if (!_this.game.paused) {
          _this.selectionArray.push(_this.selectionArray.shift());
          _this.select(_this.selectionArray[0].key);
          sfx.play('menuselect');
        } else {
          _this.popup.cursorMoved(target.keyCode);
        }
      }, this);
      this.naviKeys.esc.onDown.add(function () {
        if (_this.game.paused) {
          //remove the menu panel from world
          //unpaused game
          _this.resumeState();
        }
      }, this);

      this.game.onPause.add(function () {
        this.sound.unsetMute();
      }, this); //<==enable the sound to continue play ';)'
    }
  }, {
    key: "select",
    value: function select(which) {
      this.start.alpha = 0.0; //start
      this["continue"].alpha = 0.0; //continue
      this.options.alpha = 0.0; //options
      switch (which) {
        case 'start':
          this.start.alpha = 1.0;
          break;
        case 'continue':
          this["continue"].alpha = 1.0;
          break;
        case 'options':
          this.options.alpha = 1.0;
          break;
      }
    }
  }, {
    key: "processSelection",
    value: function processSelection() {
      console.log("enter");
      switch (this.selectionArray[0].key) {
        case 'start':
          //this.state.start('preload',true,false,'ep1');
          //if player previously played, set attackEnabled to false
          if (_componentsToolsJs2["default"].getData('attackEnabled')) _componentsToolsJs2["default"].storeData('attackEnabled', false);
          if (_componentsToolsJs2["default"].getData('throwEnabled')) _componentsToolsJs2["default"].storeData('throwEnabled', false);

          this.state.start('preload', true, false, 'gamenarrative');
          break;
        case 'continue':
          console.log("continue");

          if (!this.game.paused) {
            this.game.paused = true;
            this.popup = new _prefabsPopupJs2["default"](this.game, 0, 0, 4);
            this.world.addChild(this.popup);
          } else {
            //game when paused should stuck here when enter is pressed
            this.popupHandler();
          }
          break;
        case 'options':
          console.log("options");
          //pause the game, bring up the popuppanel
          if (!this.game.paused) {
            this.game.paused = true;
            //initialize popup objects
            this.popup = new _prefabsPopupJs2["default"](this.game, 0, 0, 1);
            this.world.addChild(this.popup);
          } else {
            //game when paused should stuck here when enter is pressed
            this.popupHandler();
          }
          break;
      }
    }
  }, {
    key: "popupHandler",
    value: function popupHandler() {
      var popupText = this.world.getTop().optionEntered();
      if (!popupText) return;
      console.log("enter " + popupText);

      //this guy has to do the lifting for the options
      switch (popupText) {
        case 'Instructions':
          console.log('instructions');
          this.popupInstruction = new _prefabsPopupJs2["default"](this.game, 0, 0, 3);
          var instruction = this.cache.getJSON('config').popup.instructions;
          this.popupInstruction.setTitle(instruction['title']);
          this.popupInstruction.setDescription(instruction['description'], 0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupInstruction);
          this.enableCursorKeys(false);
          break;
        case 'Got it!':
          this.enableCursorKeys(true);
          this.resumeState();
          break;
        case 'Credits':
          console.log('credits');
          this.popupCredits = new _prefabsPopupJs2["default"](this.game, 0, 0, 3);
          var credits = this.cache.getJSON('config').popup.credits;
          this.popupCredits.setTitle(credits['title']);
          this.popupCredits.setDescription(credits['description'], 0);

          this.world.removeChild(this.popup);
          this.world.addChild(this.popupCredits);
          this.enableCursorKeys(false);
          break;
        case 'Back':
          console.log('back');
          this.resumeState();
          break;
        case 'Mute Music':
          console.log("muting music ");
          _componentsToolsJs2["default"].storeData('mutetheme', true);
          break;
        case 'Mute Sound':
          console.log("muting sound");
          _componentsToolsJs2["default"].storeData('mutesound', true);
          break;
        case 'Play Music':
          console.log("playing music");
          _componentsToolsJs2["default"].storeData('mutetheme', false);
          break;
        case 'Play Sound':
          console.log("playing sound");
          _componentsToolsJs2["default"].storeData('mutesound', false);
          break;
        case 'ep1. The Apprenticeship':
          this.resumeState();
          this.state.start('preload', true, false, 'ep1');
          break;
        case 'ep2. The Rat Infestation':
          this.resumeState();
          this.state.start('preload', true, false, 'ep2');
          break;
        case 'ep3. The Flying Menace':
          this.resumeState();
          this.state.start('preload', true, false, 'ep3');
          break;
        case 'ep4. The Shooting Stars':
          this.resumeState();
          this.state.start('preload', true, false, 'ep4');
          break;
        case 'ep5. The Ninja Reality':
          this.resumeState();
          this.state.start('preload', true, false, 'ep5');
          break;
        case "ep6. The O'Mighty Claw":
          this.resumeState();
          this.state.start('preload', true, false, 'ep6');
          break;
      }
    }
  }, {
    key: "enableCursorKeys",
    value: function enableCursorKeys(bool) {
      this.naviKeys.up.enabled = bool;
      this.naviKeys.down.enabled = bool;
    }
  }, {
    key: "resumeState",
    value: function resumeState() {
      var somepopup = this.world.getTop();
      if (somepopup.key === 'popup') {
        this.world.removeChild(somepopup);
        somepopup.destroy();
      }
      this.game.paused = false;
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Menu;
})();

exports["default"] = Menu;
module.exports = exports["default"];

},{"../components/Tools.js":2,"../prefabs/Popup.js":14}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Preload = (function () {
  _createClass(Preload, [{
    key: 'init',
    value: function init(whichEp) {
      console.log("init " + whichEp);
      //check the args for which episodes and get the settings from config
      this.whichEp = whichEp;
    }
  }]);

  function Preload() {
    _classCallCheck(this, Preload);
  }

  _createClass(Preload, [{
    key: 'preload',
    value: function preload() {
      //all preloads are in boot state

      //background for game
      //this.add.sprite(0,0, "loadingbg");
      var loadingLabel = this.add.text(this.game.width / 2, this.game.height * 0.45, 'loading...', { font: '40px Arial', fill: '#ffffff' });
      loadingLabel.anchor.setTo(0.5, 0.5);

      var preloadBar = this.add.sprite(this.game.width / 2, this.game.height * 0.55, 'preloader');
      preloadBar.anchor.setTo(0.5, 0.5);

      this.load.setPreloadSprite(preloadBar);

      //do all your loading here
      this.load.pack(this.whichEp, 'assets/config/AssetPack.json');
    }
  }, {
    key: 'create',
    value: function create() {
      this.state.start('game', true, false, this.whichEp); //this.state =stateManager. used to control different states, start stop pause
    }
  }, {
    key: 'update',
    value: function update() {}
  }]);

  return Preload;
})();

exports['default'] = Preload;
module.exports = exports['default'];

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsToolsJs = require("../components/Tools.js");

var _componentsToolsJs2 = _interopRequireDefault(_componentsToolsJs);

var Won = (function (_Phaser$State) {
  _inherits(Won, _Phaser$State);

  function Won() {
    _classCallCheck(this, Won);

    _get(Object.getPrototypeOf(Won.prototype), 'constructor', this).call(this);

    this.highlightStyle = {
      font: 'bold 28px Century', fill: '#cde16d'
    };
  }

  _createClass(Won, [{
    key: 'create',
    value: function create() {
      var _this = this;

      this.wonimg = this.add.image(0, 160, 'won');
      this.starttimer = this.game.time.now + 2500;
      this.movetimer = 0;

      var hightext = this.add.text(50, 700, "Press 'A' to return to main menu...", this.highlightStyle);

      this.add.tween(hightext).to({ alpha: 0.2 }, 600, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);

      var backdrop = this.add.graphics(0, 0);
      backdrop.beginFill(0x22226a);
      backdrop.drawRect(0, 0, this.game.width, 160);
      backdrop.endFill();

      console.log("total score " + _componentsToolsJs2['default'].getTotalScore() + " game " + this.game.width);

      var totalScore = _componentsToolsJs2['default'].getTotalScore();
      var highScore = _componentsToolsJs2['default'].getData('high_score');
      var title = this.add.text(this.game.width / 2, 50, "You've collected " + totalScore + " out of 172 cheese! Well Done!", this.highlightStyle);
      title.anchor.setTo(0.5, 0.5);
      var title1 = this.add.text(this.game.width / 2, 100, "Your highest score is " + highScore, this.highlightStyle);
      title1.anchor.setTo(0.5, 0.5);

      this.keyA = this.input.keyboard.addKey(Phaser.Keyboard.A);
      this.keyA.onDown.add(function () {
        _this.state.start('menu');
      }, this);

      //stop all previous playing sound first
      this.sound.stopAll();
      this.theme = this.add.audioSprite('gameover');
      if (_componentsToolsJs2['default'].getData('mutetheme')) _componentsToolsJs2['default'].muteOrPlay(this.theme, true);

      this.theme.play('Death of Kings', 0.6);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.game.time.now > this.starttimer && this.wonimg.position.y > -1280) this.wonimg.position.y -= 0.3;
    }
  }]);

  return Won;
})(Phaser.State);

exports['default'] = Won;
module.exports = exports['default'];

},{"../components/Tools.js":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL2FwcC5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvY29tcG9uZW50cy9Ub29scy5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvcHJlZmFicy9CbG9ja2luZ09iamVjdHMuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3ByZWZhYnMvQ2F0LmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9wcmVmYWJzL0NhdEZpbmFsZS5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvcHJlZmFicy9DaGVlc2VTY29yZS5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvcHJlZmFicy9Db2xsZWN0YWJsZXMuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3ByZWZhYnMvRW5lbXlTdG9wcy5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvcHJlZmFicy9FbmVyZ3lCYXIuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3ByZWZhYnMvRW50cmFuY2VEb29yLmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9wcmVmYWJzL0hlYWx0aEJhci5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvcHJlZmFicy9QbGF0Zm9ybXMuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3ByZWZhYnMvUGxheWVyLmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9wcmVmYWJzL1BvcHVwLmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9wcmVmYWJzL1JhdEJvc3MuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3ByZWZhYnMvUmF0R3J1bnQuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3ByZWZhYnMvUmF0TmluamEuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3ByZWZhYnMvUmF0U29sZGllci5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvcHJlZmFicy9TaHVyaWtlbkhVRC5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvcHJlZmFicy9TdGFsYWNpdGVzLmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9wcmVmYWJzL1RpdGxlVGV4dC5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvcHJlZmFicy9XYXZlc09iamVjdHMuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3N0YXRlcy9Cb290LmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9zdGF0ZXMvRXAxLmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9zdGF0ZXMvRXAyLmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9zdGF0ZXMvRXAzLmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9zdGF0ZXMvRXA0LmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9zdGF0ZXMvRXA1LmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9zdGF0ZXMvRXA2LmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9zdGF0ZXMvR2FtZS5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvc3RhdGVzL0dhbWVOYXJyYXRpdmUuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3N0YXRlcy9HYW1lT3Zlci5qcyIsIi9ob21lL2Fsdmludm9vL0RvY3VtZW50cy9waGFzZXItYm9vay0td29ya2Zsb3cvdGVzdC1kZXYvZG9zc2llci9zcmMvc3RhdGVzL01lbnUuanMiLCIvaG9tZS9hbHZpbnZvby9Eb2N1bWVudHMvcGhhc2VyLWJvb2stLXdvcmtmbG93L3Rlc3QtZGV2L2Rvc3NpZXIvc3JjL3N0YXRlcy9QcmVsb2FkLmpzIiwiL2hvbWUvYWx2aW52b28vRG9jdW1lbnRzL3BoYXNlci1ib29rLS13b3JrZmxvdy90ZXN0LWRldi9kb3NzaWVyL3NyYy9zdGF0ZXMvV29uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs0QkNFaUIsa0JBQWtCOzs7OzRCQUNsQixrQkFBa0I7Ozs7cUNBQ1QsMkJBQTJCOzs7OytCQUNqQyxxQkFBcUI7Ozs7NEJBQ3hCLGtCQUFrQjs7OzsyQkFDbkIsaUJBQWlCOzs7OzJCQUNqQixpQkFBaUI7Ozs7MkJBQ2pCLGlCQUFpQjs7OzsyQkFDakIsaUJBQWlCOzs7OzJCQUNqQixpQkFBaUI7Ozs7MkJBQ2pCLGlCQUFpQjs7OztnQ0FDWixzQkFBc0I7Ozs7MkJBQzNCLGlCQUFpQjs7OztBQWRqQyxJQUFJLElBQUksQ0FBQzs7QUFnQlQsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZO0FBQzFCLE1BQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pELE1BQUksQ0FBQyxLQUFLLENBQUMsR0FB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Q3RDLFFBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBR3ZCLFFBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXRDLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7QUFFNUIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRyxRQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25HLFFBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBRTNHOztlQTFEa0IsR0FBRzs7V0E0RG5CLGFBQUMsTUFBTSxFQUFDOztBQUVQLFVBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLFVBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFD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QUksR0FBRyxDQUFDO0tBRXhHOzs7U0FuRGtCLEdBQUc7R0FBUyxNQUFNLENBQUMsS0FBSzs7cUJBQXhCLEdBQUciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGdhbWU7XG5cbmltcG9ydCBCb290IGZyb20gXCIuL3N0YXRlcy9Cb290LmpzXCI7XG5pbXBvcnQgTWVudSBmcm9tIFwiLi9zdGF0ZXMvTWVudS5qc1wiO1xuaW1wb3J0IEdhbWVOYXJyYXRpdmUgZnJvbSBcIi4vc3RhdGVzL0dhbWVOYXJyYXRpdmUuanNcIjtcbmltcG9ydCBQcmVsb2FkIGZyb20gXCIuL3N0YXRlcy9QcmVsb2FkLmpzXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9zdGF0ZXMvR2FtZS5qc1wiO1xuaW1wb3J0IEVwMSBmcm9tIFwiLi9zdGF0ZXMvRXAxLmpzXCI7XG5pbXBvcnQgRXAyIGZyb20gXCIuL3N0YXRlcy9FcDIuanNcIjtcbmltcG9ydCBFcDMgZnJvbSBcIi4vc3RhdGVzL0VwMy5qc1wiO1xuaW1wb3J0IEVwNCBmcm9tIFwiLi9zdGF0ZXMvRXA0LmpzXCI7XG5pbXBvcnQgRXA1IGZyb20gXCIuL3N0YXRlcy9FcDUuanNcIjtcbmltcG9ydCBFcDYgZnJvbSBcIi4vc3RhdGVzL0VwNi5qc1wiO1xuaW1wb3J0IEdhbWVPdmVyIGZyb20gXCIuL3N0YXRlcy9HYW1lT3Zlci5qc1wiO1xuaW1wb3J0IFdvbiBmcm9tIFwiLi9zdGF0ZXMvV29uLmpzXCJcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMDI0LCA3NjgsIFBoYXNlci5DQU5WQVMsICdnYW1lJyk7XG4gIGdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XG4gIGdhbWUuc3RhdGUuYWRkKCdtZW51JywgTWVudSk7XG4gIGdhbWUuc3RhdGUuYWRkKCdnYW1lbmFycmF0aXZlJywgR2FtZU5hcnJhdGl2ZSk7XG4gIGdhbWUuc3RhdGUuYWRkKCdwcmVsb2FkJywgUHJlbG9hZCk7XG4gIGdhbWUuc3RhdGUuYWRkKCdnYW1lJywgR2FtZSk7XG4gIGdhbWUuc3RhdGUuYWRkKCdlcDEnLCBFcDEpO1xuICBnYW1lLnN0YXRlLmFkZCgnZXAyJywgRXAyKTtcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2VwMycsIEVwMyk7XG4gIGdhbWUuc3RhdGUuYWRkKCdlcDQnLCBFcDQpO1xuICBnYW1lLnN0YXRlLmFkZCgnZXA1JywgRXA1KTtcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2VwNicsIEVwNik7XG4gIGdhbWUuc3RhdGUuYWRkKCdnYW1lb3ZlcicsR2FtZU92ZXIpO1xuICBnYW1lLnN0YXRlLmFkZCgnd29uJyxXb24pO1xuICBnYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9vbHN7XG5cbiAgc3RhdGljIG11dGVPclBsYXkoYXVkaW9zcHJpdGUsIGJvb2wpe1xuICAgICAgaWYoIWF1ZGlvc3ByaXRlKSByZXR1cm47XG4gICAgICBmb3IgKGxldCBrZXkgaW4gYXVkaW9zcHJpdGUuc291bmRzKXtcbiAgICAgICAgYXVkaW9zcHJpdGUuc291bmRzW2tleV0ubXV0ZSA9IGJvb2w7XG4gICAgICB9XG4gIH1cblxuICBzdGF0aWMgcGxheVNvdW5kKHNmeCxzb3VuZGFycmF5KXtcbiAgICAvL3dpdGggYmxvY2tpbmcgZnVuY3Rpb25cbiAgICBpZihzZng9PXVuZGVmaW5lZHx8c291bmRhcnJheT09dW5kZWZpbmVkfHxzb3VuZGFycmF5Lmxlbmd0aDwwKXJldHVybjtcbiAgICBsZXQgY2FuUGxheSA9IHRydWU7XG4gICAgc291bmRhcnJheS5mb3JFYWNoKChzb3VuZCk9PntcbiAgICAgIGlmKHNmeC5zb3VuZHNbc291bmRdLmlzUGxheWluZyl7XG4gICAgICAgIGNhblBsYXkgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKGNhblBsYXkpIHNmeC5wbGF5KHNmeC5nYW1lLnJuZC5waWNrKHNvdW5kYXJyYXkpKTtcbiAgfVxuXG4gIHN0YXRpYyBzdG9yZUVwKHdoaWNoRXApe1xuICAgIGlmKHR5cGVvZihTdG9yYWdlKSE9PVwidW5kZWZpbmVkXCIpe1xuICAgICAgbGV0IGVwQXJyYXkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInBsYXllZF9lcFwiKTtcbiAgICAgIGlmKGVwQXJyYXkpe1xuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZXBBcnJheSk7XG4gICAgICAgIGRhdGEucHVzaCh3aGljaEVwKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwbGF5ZWRfZXBcIixKU09OLnN0cmluZ2lmeShBcnJheS5mcm9tKG5ldyBTZXQoZGF0YSkpKSk7Ly9TZXQgaXMgb25seSB1bmlxdWUgaXRlbXNcbiAgICAgIH1lbHNle1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInBsYXllZF9lcFwiLEpTT04uc3RyaW5naWZ5KFt3aGljaEVwXSkpO1xuICAgICAgfVxuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRfZXBcIix3aGljaEVwKTtcblxuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coXCJXYXJuaW5nOiBubyBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRFcCgpe1xuICAgIGlmKHR5cGVvZihTdG9yYWdlKSE9PVwidW5kZWZpbmVkXCIpe1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudF9lcFwiKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUubG9nKFwiV2FybmluZzogbm8gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc3RvcmVUb3RhbFNjb3JlKGVwLCBzY29yZSl7XG4gICAgaWYodHlwZW9mKFN0b3JhZ2UpIT09XCJ1bmRlZmluZWRcIil7XG4gICAgICBsZXQgc2NBcnJheSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG90YWxfc2NvcmVcIik7XG4gICAgICBpZihzY0FycmF5KXtcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHNjQXJyYXkpO1xuICAgICAgICBkYXRhW2VwLTFdID0gc2NvcmU7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG90YWxfc2NvcmVcIixKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgbGV0IG5ld0RhdGEgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgbmV3RGF0YVtlcC0xXSA9IHNjb3JlO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRvdGFsX3Njb3JlXCIsSlNPTi5zdHJpbmdpZnkobmV3RGF0YSkpO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coXCJXYXJuaW5nOiBubyBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRUb3RhbFNjb3JlKCl7XG4gICAgaWYodHlwZW9mKFN0b3JhZ2UpIT09XCJ1bmRlZmluZWRcIil7XG4gICAgICBsZXQgc2NBcnJheSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG90YWxfc2NvcmVcIik7XG4gICAgICBsZXQgaGlnaFNjb3JlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoaWdoX3Njb3JlXCIpO1xuICAgICAgaWYoc2NBcnJheSl7XG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShzY0FycmF5KTtcbiAgICAgICAgbGV0IHRvdGFsU2NvcmUgPSAwO1xuICAgICAgICBkYXRhLmZvckVhY2goKHMpPT57dG90YWxTY29yZSs9czt9KTtcbiAgICAgICAgaWYoaGlnaFNjb3JlKXtcbiAgICAgICAgICBpZihoaWdoU2NvcmU8dG90YWxTY29yZSlsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhpZ2hfc2NvcmVcIix0b3RhbFNjb3JlKTtcbiAgICAgICAgfWVsc2UgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoaWdoX3Njb3JlXCIsdG90YWxTY29yZSk7XG4gICAgICAgIHJldHVybiB0b3RhbFNjb3JlO1xuICAgICAgfWVsc2UgY29uc29sZS5sb2coXCJObyBpZGVhOiBubyBkYXRhXCIpO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coXCJXYXJuaW5nOiBubyBsb2NhbCBzdG9yYWdlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzdG9yZURhdGEodGFyZ2V0LGRhdGEpe1xuICAgIGlmKHR5cGVvZihTdG9yYWdlKSE9PVwidW5kZWZpbmVkXCIpe1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGFyZ2V0LEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUubG9nKFwiV2FybmluZzogbm8gbG9jYWwgc3RvcmFnZVwiKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0RGF0YSh0YXJnZXQpe1xuICAgIGlmKHR5cGVvZihTdG9yYWdlKSE9PVwidW5kZWZpbmVkXCIpe1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odGFyZ2V0KSk7XG4gICAgfWVsc2V7XG4gICAgICBjb25zb2xlLmxvZyhcIldhcm5pbmc6IG5vIGxvY2FsIHN0b3JhZ2VcIik7XG4gICAgfVxuICB9XG5cblxuICBzdGF0aWMgY29udmVydFRpbGVDb29yVG9QMih4LHksd2lkdGgsaGVpZ2h0LFAyQm9keSl7XG4gICAgbGV0IHJldHVybkNvb3IgPSBuZXcgUGhhc2VyLlBvaW50KHgrd2lkdGgvMix5LWhlaWdodC8yKTtcbiAgICBQMkJvZHkueCA9IHJldHVybkNvb3IueDtQMkJvZHkueT1yZXR1cm5Db29yLnk7XG5cbiAgICByZXR1cm4gcmV0dXJuQ29vcjtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kT2JqZWN0SW5MYXllcihtYXAsbGF5ZXIpe1xuICAgIC8vbW9kaWZpZWQgaXQgdG8gc2VhcmNoIG9ubHkgZm9yIHVuaXF1ZSBHSURcbiAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5KCk7XG4gICAgbWFwLm9iamVjdHNbbGF5ZXJdLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAvL2VsZW1lbnQueSAtPSBlbGVtZW50LmhlaWdodDtcbiAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgZmluZFVuaXF1ZUdJREluTGF5ZXIobWFwLGxheWVyKXtcbiAgICAvL21vZGlmaWVkIGl0IHRvIHNlYXJjaCBvbmx5IGZvciB1bmlxdWUgR0lEXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xuICAgIGxldCBnaWQgPSBuZXcgQXJyYXkoKTtcbiAgICBtYXAub2JqZWN0c1tsYXllcl0uZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgIC8vZWxlbWVudC55IC09IGVsZW1lbnQuaGVpZ2h0O1xuICAgICAgaWYoZ2lkLmxlbmd0aD4wJiZnaWQuaW5kZXhPZihlbGVtZW50LmdpZCkhPS0xKXJldHVybjtcbiAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnQpO1xuICAgICAgZ2lkLnB1c2goZWxlbWVudC5naWQpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tJZk9uRmxvb3IoZ2FtZSxwbGF5ZXIpIHtcblxuICAgIHZhciB5QXhpcyA9IHAyLnZlYzIuZnJvbVZhbHVlcygwLCAxKTtcbiAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpPTA7IGkgPCBnYW1lLnBoeXNpY3MucDIud29ybGQubmFycm93cGhhc2UuY29udGFjdEVxdWF0aW9ucy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICAgIHZhciBjID0gZ2FtZS5waHlzaWNzLnAyLndvcmxkLm5hcnJvd3BoYXNlLmNvbnRhY3RFcXVhdGlvbnNbaV07XG5cbiAgICAgICAgaWYgKGMuYm9keUEgPT09IHBsYXllci5ib2R5LmRhdGEgfHwgYy5ib2R5QiA9PT0gcGxheWVyLmJvZHkuZGF0YSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGQgPSBwMi52ZWMyLmRvdChjLm5vcm1hbEEsIHlBeGlzKTtcblxuICAgICAgICAgICAgaWYgKGMuYm9keUEgPT09IHBsYXllci5ib2R5LmRhdGEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZCAqPSAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGQgPiAwLjUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG5cbiAgfVxufVxuIiwiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9jb21wb25lbnRzL1Rvb2xzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2NraW5nT2JqZWN0cyBleHRlbmRzIFBoYXNlci5TcHJpdGV7XG4gIGNvbnN0cnVjdG9yKGdhbWUseCx5LGtleSxmcmFtZSl7XG4gICAgc3VwZXIoZ2FtZSx4LHksa2V5LGZyYW1lKTtcbiAgICBjb25zb2xlLmxvZyhcImJsb2NraW5nIGZyYW1lIG5hbWUgY3JlYXRlZDogXCIrZnJhbWUpO1xuICAgIC8vY29uc29sZS5sb2coXCJiZWZvcmUgeCB5IHdpZHRoIGhlaWdodCBcIit4K1wiIFwiK3krXCIgXCIrdGhpcy5vZmZzZXRYK1wiIFwiK3RoaXMub2Zmc2V0WStcIiBcIit0aGlzLnJpZ2h0K1wiIFwiK3RoaXMuYm90dG9tKTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5wMi5lbmFibGUodGhpcyxmYWxzZSk7Ly9kZWJ1ZyBpcyB0cnVlXG4gICAgdGhpcy5ib2R5LnN0YXRpYyA9IHRydWU7Ly90aGlzIGNlbnRlciB0aGUgYW5jaG9yIHRvIDAuNSwwLjVcblxuICAgIHN3aXRjaChmcmFtZSl7XG4gICAgICBjYXNlICd3YXRlcm91dGxldCc6XG4gICAgICAgIHRoaXMuYm9keS5jbGVhclNoYXBlcygpO1xuICAgICAgICB0aGlzLmJvZHkuc2V0Q2lyY2xlKHRoaXMud2lkdGgvMiwwLC10aGlzLndpZHRoLzQpO1xuICAgICAgICBUb29scy5jb252ZXJ0VGlsZUNvb3JUb1AyKHgseSx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LHRoaXMuYm9keSk7XG5cbiAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5ib2R5LmNsZWFyU2hhcGVzKCk7XG4gICAgICAgIHRoaXMuYm9keS5zZXRSZWN0YW5nbGUodGhpcy53aWR0aCxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0KjAuOSksMCk7XG4gICAgICAgIFRvb2xzLmNvbnZlcnRUaWxlQ29vclRvUDIoeCx5LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQsdGhpcy5ib2R5KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9XG59XG4iLCJpbXBvcnQgVG9vbHMgZnJvbSBcIi4uL2NvbXBvbmVudHMvVG9vbHMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcbiAgY29uc3RydWN0b3IoZ2FtZSx4LHksa2V5LGZyYW1lKXtcbiAgICBzdXBlcihnYW1lLHgseSxrZXksZnJhbWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2ZseScsUGhhc2VyLkFuaW1hdGlvbi5nZW5lcmF0ZUZyYW1lTmFtZXMoJ2ZyYW1lJywgMCwgMywgJycsIDApLDYsZmFsc2UsZmFsc2UpO1xuICAgIHRoaXMuc3BlZWQgPSAyMDA7Ly9uZWVkIHRvIGZsaXAgdGhlIGltYWdlc1xuXG4gICAgZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzLGZhbHNlKTsvL2RlYnVnIGlzIHRydWVcbiAgICB0aGlzLmJvZHkuZGF0YS5ncmF2aXR5U2NhbGUgPSAtMC4xOy8vbm8gZ3Jhdml0eSB0byB0aGlzIGd1eVxuICAgIHRoaXMuYm9keS5jbGVhclNoYXBlcygpO1xuXG4gICAgdGhpcy5ib2R5LnNldFJlY3RhbmdsZSh0aGlzLndpZHRoKjAuNSxNYXRoLnJvdW5kKHRoaXMuaGVpZ2h0KjAuOSksMCwwKTsvL3NldFJlY3RhbmdlIHdpbGwgYXBwbHkgdGhlIHNoYXBlIHdpdGggYW5jaG9yIHRvIG1pZGRsZVxuICAgIC8vcmVzZXQgdGhlIGJvZHkgbG9jYXRpb24gYWZ0ZXIgc2V0U2hhcGVzIG1ldGhvZC4uIC8vaWYgSSBkb250IHdhbnQgdGhlIGhhc3NsZSBvZiBzZXR0aW5nIG9mZnNldHNcbiAgICBUb29scy5jb252ZXJ0VGlsZUNvb3JUb1AyKHgseSx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LHRoaXMuYm9keSk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC43LDAuNTUpOy8vaXQgaXMgYmV0dGVyIHRvIGFkanVzdCBieSBhbmNob3IgcmF0aGVyIHRoYW4gdXNpbmcgb2Zmc2V0IGFib3ZlIGNveiB0aGUgYm9keSB3aWxsIHNpbmtcbiAgICB0aGlzLmJvZHkuZml4ZWRSb3RhdGlvbiA9IHRydWU7XG4gICAgdGhpcy5ib2R5LmRhbXBpbmcgPSAwLjI7XG5cbiAgICAvL2FkZCBhIHRpbWVyIHRvIGNoZWNrIHdoZXRoZXIgaXRzIGJsb2NrZWQgdXBvbiBhbiBvYnN0YWNsZVxuICAgIHRoaXMubGFzdFBvc2l0aW9uWCA9IHRoaXMueDtcbiAgICB0aGlzLmhlYXJ0QmVhdEludGVydmFsID0gMTIwMDtcbiAgICB0aGlzLmhlYXJ0QmVhdENoZWNrZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoZmFsc2UpO1xuICAgIHRoaXMuaGVhcnRCZWF0Q2hlY2tlci5sb29wKHRoaXMuaGVhcnRCZWF0SW50ZXJ2YWwsIHRoaXMuaGVhcnRCZWF0Q2hlY2ssdGhpcyk7XG4gICAgdGhpcy5oZWFydEJlYXRDaGVja2VyLnN0YXJ0KCk7XG4gICAgdGhpcy5yZXZlcnNlTm93ID0gZmFsc2U7XG5cbiAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgnZmx5JyxudWxsLHRydWUpO1xuXG4gICAgLy9zZXQgaGVhbHRoLWludGVybmFsIGJ1aWx0IGluIHBhcmFtc1xuICAgIHRoaXMuZGFtYWdlVGltZXIgPSAwO1xuICAgIHRoaXMuc2V0SGVhbHRoKDU2KTsvL2RlZmF1bHQgbWF4SGVhbHRoIGlzIDEwMFxuXG4gICAgLy9jcmVhdGUgOCBiYWxscyAtIDIgb2YgZWFjaCBjb2xvclxuXG4gICAgdGhpcy5iYWxscyA9IGdhbWUuYWRkLmdyb3VwKGdhbWUud29ybGQsJ2JhbGxzJyxmYWxzZSx0cnVlLDEpO1xuICAgIHRoaXMuYmFsbHMuY3JlYXRlTXVsdGlwbGUoMiwnb2JqZWN0czMnLFsnYmFsbF9ncmVlbicsJ2JhbGxfcmVkJywnYmFsbF95ZWxsb3cnLCdiYWxsX2JsdWUnXSk7XG5cbiAgICB0aGlzLmJhbGxzLmZvckVhY2goKGJhbGwpPT57XG4gICAgICBiYWxsLmJvZHkuY2xlYXJTaGFwZXMoKTtcbiAgICAgIGJhbGwuYm9keS5zZXRDaXJjbGUoYmFsbC53aWR0aC8yKTtcbiAgICAgIC8vYmFsbC5ib2R5LmRlYnVnPXRydWU7XG4gICAgfSxnYW1lLndvcmxkKTtcblxuICAgIHRoaXMuYmFsbHRpY2tlciA9IDA7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiYXJlIHRoZWlyIGNoaWxkcmVuIFwiK3RoaXMuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAvL2RhbWFnZSBhbmltYXRpb25cbiAgICB0aGlzLmZsYXNoUmVkRWZmZWN0ID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKSAvL2JsaW5rIGJsaW5rIHdoZW4gaGl0XG4gICAgICAgIC50byh7dGludDoweEZGMDAwMH0sNTAsUGhhc2VyLkVhc2luZy5Cb3VuY2Uub3V0KVxuICAgICAgICAudG8oe3RpbnQ6MHhGQjg5ODl9LDUwLFBoYXNlci5FYXNpbmcuQm91bmNlLm91dClcbiAgICAgICAgLnRvKHt0aW50OjB4RkZGRkZGfSwxNTAsUGhhc2VyLkVhc2luZy5DaXJjdWxhci5vdXQpO1xuICB9XG5cbiAgaGVhcnRCZWF0Q2hlY2soKXtcbiAgICAvL2NoZWNrIGZvciBwb3NpdGlvblxuICAgIGlmKE1hdGguYWJzKHRoaXMueC10aGlzLmxhc3RQb3NpdGlvblgpPjIwKXtcbiAgICAgIHRoaXMubGFzdFBvc2l0aW9uWCA9IHRoaXMueDtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMucmV2ZXJzZU5vdyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy80IHRpY2tzIHRoZW4gZmlyZSBvbmUgYmFsbFxuICAgIGlmKHRoaXMuYmFsbHRpY2tlcj4yKXtcbiAgICAgIGxldCBiYWxsID0gdGhpcy5iYWxscy5nZXRSYW5kb20oKTtcbiAgICAgIGlmKGJhbGwmJiFiYWxsLmFsaXZlKXtcbiAgICAgICAgYmFsbC5saWZlc3BhbiA9IDUyMDA7XG4gICAgICAgIC8vYmFsbC5ib2R5LmRlYnVnPXRydWU7XG4gICAgICAgIGJhbGwucmVzZXQodGhpcy54LHRoaXMueS01MCk7XG4gICAgICAgIGlmKHRoaXMuc2NhbGUueDwwKWJhbGwuYm9keS5hcHBseUZvcmNlKFs4MDAsIDEwMDBdLCB0aGlzLmJvZHkueCs1LCB0aGlzLmJvZHkueSs1KTsvL2Zyb20gcmlnaHQgLT4gc2hvb3QgbGVmdFxuICAgICAgICBlbHNlIGJhbGwuYm9keS5hcHBseUZvcmNlKFstODAwLCAxMDAwXSwgdGhpcy5ib2R5LngtNSwgdGhpcy5ib2R5LnkrNSk7Ly8tPiBzaG9vdCByaWdodFxuICAgICAgfVxuICAgICAgdGhpcy5iYWxsdGlja2VyID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLmJhbGx0aWNrZXIrKztcbiAgfVxuXG4gIGRhbWFnZUNhdChhbXQsaW50ZXJ2YWwpe1xuICAgICAgaWYodGhpcy5oZWFsdGg8PTAuNSlyZXR1cm47XG5cbiAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdz50aGlzLmRhbWFnZVRpbWVyKXsvL3BsYXllciBjYW5ub3Qga2VlcCB0YWtpbmcgZGFtYWdlIGV2ZXJ5IHRpY2shXG4gICAgICAgIHRoaXMuZGFtYWdlKGFtdCk7Ly91c2UgaW50ZXJhbCBmdW5jdGlvbiwgd2hpY2ggd2lsbCBhY3RpdmF0ZSB0aGUga2lsbCBpZiBoZWFsdGggPSAwO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNhdCBoZWFsdGggXCIrdGhpcy5oZWFsdGgpO1xuXG4gICAgICAgIGlmKCF0aGlzLmZsYXNoUmVkRWZmZWN0LmlzUnVubmluZyl0aGlzLmZsYXNoUmVkRWZmZWN0LnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5kYW1hZ2VUaW1lciA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIGludGVydmFsO1xuICAgICAgfVxuICB9XG5cbiAgdXBkYXRlKCl7XG4gICAgdGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnNwZWVkO1xuXG4gICAgLy9pZiBzdHVtYmxlZCB1cG9uIGFuIG9ic3RhY2xlXG4gICAgaWYodGhpcy5yZXZlcnNlTm93KXtcbiAgICAgIHRoaXMuc3BlZWQgKj0gLTE7XG4gICAgICB0aGlzLnNjYWxlLnggPSAodGhpcy5zcGVlZD4wKT8xOi0xO1xuICAgICAgdGhpcy5yZXZlcnNlTm93ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5zY2FsZS54ID0gKHRoaXMuc3BlZWQ+MCk/MTotMTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgVG9vbHMgZnJvbSBcIi4uL2NvbXBvbmVudHMvVG9vbHMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcbiAgY29uc3RydWN0b3IoZ2FtZSx4LHksa2V5LGZyYW1lKXtcbiAgICBzdXBlcihnYW1lLHgseSxrZXksZnJhbWUpO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2ZseScsUGhhc2VyLkFuaW1hdGlvbi5nZW5lcmF0ZUZyYW1lTmFtZXMoJ2NhdGYnLCAxLCA0LCAnJywgMCksNixmYWxzZSxmYWxzZSk7XG4gICAgdGhpcy5zcGVlZCA9IDE1MDtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG5cbiAgICBsZXQgcm9wZSA9IGdhbWUuYWRkLmdyYXBoaWNzKHRoaXMueCx0aGlzLnkpOy8vYmVsb25ncyB0byB3b3JsZFxuICAgIHJvcGUuY2xlYXIoKTtcbiAgICByb3BlLmJlZ2luRmlsbCgweDUyNDUzOSk7XG4gICAgcm9wZS5kcmF3UmVjdCgwLC0yMDAsMiw0MDApO1xuICAgIHJvcGUuZW5kRmlsbCgpO1xuICAgIHJvcGUubmFtZSA9ICdyb3BlJztcblxuICAgIHRoaXMubWFyaW5hID0gZ2FtZS5hZGQuc3ByaXRlKHRoaXMueCx0aGlzLnksJ29iamVjdHM1JywnbWFyaW5hX2NhcHR1cmVkJyk7XG4gICAgdGhpcy5tYXJpbmEubmFtZSA9ICdtYXJpbmEnO1xuXG4gICAgZ2FtZS5waHlzaWNzLnAyLmVuYWJsZShbdGhpcyxyb3BlLHRoaXMubWFyaW5hXSxmYWxzZSk7XG5cbiAgICB0aGlzLmJvZHkuZGF0YS5ncmF2aXR5U2NhbGUgPSAtMC42Oy8vbm8gZ3Jhdml0eSB0byB0aGlzIGd1eVxuXG4gICAgLypcbiAgICB0aGlzLmJvZHkuY2xlYXJTaGFwZXMoKTtcbiAgICB0aGlzLmJvZHkuc2V0UmVjdGFuZ2xlKHRoaXMud2lkdGgqMC41LHRoaXMuaGVpZ2h0LDAsMCk7Ly9zZXRSZWN0YW5nZSB3aWxsIGFwcGx5IHRoZSBzaGFwZSB3aXRoIGFuY2hvciB0byBtaWRkbGVcbiAgICAvL3Jlc2V0IHRoZSBib2R5IGxvY2F0aW9uIGFmdGVyIHNldFNoYXBlcyBtZXRob2QuLiAvL2lmIEkgZG9udCB3YW50IHRoZSBoYXNzbGUgb2Ygc2V0dGluZyBvZmZzZXRzXG4gICAgVG9vbHMuY29udmVydFRpbGVDb29yVG9QMih4LHksdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLmJvZHkpO1xuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSwwLjUpOy8vaXQgaXMgYmV0dGVyIHRvIGFkanVzdCBieSBhbmNob3IgcmF0aGVyIHRoYW4gdXNpbmcgb2Zmc2V0IGFib3ZlIGNveiB0aGUgYm9keSB3aWxsIHNpbmtcbiAgICAqL1xuXG4gICAgdGhpcy5ib2R5LmZpeGVkUm90YXRpb24gPSB0cnVlO1xuICAgIHRoaXMuYm9keS5kYW1waW5nID0gMC4yO1xuXG5cbiAgICByb3BlLmJvZHkuZGF0YS5ncmF2aXR5U2NhbGUgPSAwLjQ7XG4gICAgLy9yb3BlLmJvZHkuZml4ZWRSb3RhdGlvbiA9IHRydWU7XG5cbiAgICB0aGlzLm1hcmluYS5ib2R5LmRhdGEuZ3Jhdml0eVNjYWxlID0gMC42O1xuICAgIHRoaXMubWFyaW5hLmFuY2hvci5zZXRUbygxLDAuNSk7XG4gICAgLy90aGlzLm1hcmluYS5ib2R5LmZpeGVkUm90YXRpb24gPSB0cnVlO1xuXG4gICAgZ2FtZS5waHlzaWNzLnAyLmNyZWF0ZVJldm9sdXRlQ29uc3RyYWludCh0aGlzLCBbIDgwLCAtNjIgXSwgcm9wZSwgWzEsIC0yMDBdLDEwMDApO1xuICAgIGdhbWUucGh5c2ljcy5wMi5jcmVhdGVSZXZvbHV0ZUNvbnN0cmFpbnQocm9wZSxbMSwyMDBdLHRoaXMubWFyaW5hLFswLDBdLDEwMDApO1xuXG4gICAgdGhpcy5tYXJpbmF0ZXh0ID0gZ2FtZS5hZGQudGV4dCh0aGlzLngsdGhpcy55LFwiIFwiLHtcbiAgICAgIGZvbnQ6JzE1cHggQ2VudHVyeScsZmlsbDonI2ZmZmZmZidcbiAgICB9KTtcbiAgICB0aGlzLm1hcmluYXRleHQuYW5jaG9yLnNldFRvKDAuNSwwLjUpO1xuICAgIHRoaXMubWFyaW5hdGV4dC5raWxsKCk7XG5cblxuICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdmbHknLG51bGwsdHJ1ZSk7XG5cbiAgICB0aGlzLmZhZGVzb3V0ID0gbmV3IEFycmF5KCk7XG5cbiAgICB0aGlzLmZhZGVzb3V0WzBdID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7IGFscGhhOiAwLjAgfSwgNDAwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0KTtcbiAgICB0aGlzLmZhZGVzb3V0WzFdID0gdGhpcy5nYW1lLmFkZC50d2Vlbihyb3BlKS50byh7IGFscGhhOiAwLjAgfSwgNDAwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0KTtcbiAgICB0aGlzLmZhZGVzb3V0WzJdID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLm1hcmluYSkudG8oeyBhbHBoYTogMC4wIH0sIDQwMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLk91dCk7XG5cbiAgfVxuXG4gIHNheShzcGVlY2gpe1xuXG4gICAgICB0aGlzLm1hcmluYXRleHQuc2V0VGV4dChzcGVlY2gpO1xuICAgICAgdGhpcy5tYXJpbmF0ZXh0LnJlc2V0KHRoaXMubWFyaW5hLngtdGhpcy5tYXJpbmEud2lkdGgvMix0aGlzLm1hcmluYS55LTE0MCk7XG4gICAgICB0aGlzLm1hcmluYXRleHQubGlmZXNwYW4gPSAzMDAwO1xuICAgICAgLy9jb25zb2xlLmxvZygndGV4dCBsb2NhdGlvbiAnICsgdGhpcy5ib3NzdGV4dC54ICsgJyAnKyB0aGlzLmJvc3N0ZXh0LnkgKyAnICcrIHRoaXMueCArICcgJyArIHRoaXMueSk7XG4gIH1cblxuICBmYWRlb3V0KCl7XG4gICAgdGhpcy5mYWRlc291dFswXS5zdGFydCgpO1xuICAgIHRoaXMuZmFkZXNvdXRbMV0uc3RhcnQoKTtcbiAgICB0aGlzLmZhZGVzb3V0WzJdLnN0YXJ0KCk7XG4gIH1cblxuICB1cGRhdGUoKXtcbiAgICB0aGlzLmJvZHkudmVsb2NpdHkueSA9IC10aGlzLnNwZWVkO1xuXG4gICAgaWYoIXRoaXMucGF1c2VkKXtcbiAgICAgIHRoaXMuYm9keS52ZWxvY2l0eS54ID0gdGhpcy5zcGVlZDtcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgVG9vbHMgZnJvbSBcIi4uL2NvbXBvbmVudHMvVG9vbHMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlZXNlU2NvcmUgZXh0ZW5kcyBQaGFzZXIuR3JvdXB7XG4gIGNvbnN0cnVjdG9yKGdhbWUseHBvcyx5cG9zLHRvdGFsY2hlZXNlKXtcbiAgICBzdXBlcihnYW1lKTtcblxuICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICBmb250Oidib2xkIDI0cHggQ2VudHVyeScsZmlsbDonI2NkZTE2ZCdcbiAgICB9XG5cbiAgICB0aGlzLnRvdGFsY2hlZXNlID0gdG90YWxjaGVlc2U7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5ob2xkZXIgPSB0aGlzLmNyZWF0ZSh4cG9zLHlwb3MsJ29iamVjdHMxJywnY2hlZXNlMScpO1xuICAgIHRoaXMuc2NvcmV0ZXh0ID0gdGhpcy5hZGQobmV3IFBoYXNlci5UZXh0KGdhbWUseHBvcys3MCx5cG9zKzEyLCd4ICcrdGhpcy5zY29yZSsnIC8gJyt0aGlzLnRvdGFsY2hlZXNlLHRoaXMuc3R5bGUpKTtcblxuICAgIHRoaXMuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG5cbiAgfVxuXG4gIGluY3JlYXNlU2NvcmUodmFsKXtcbiAgICB0aGlzLnNjb3JlICs9IHZhbDtcbiAgICB0aGlzLnNjb3JldGV4dC5zZXRUZXh0KCd4ICcrdGhpcy5zY29yZSsnIC8gJyt0aGlzLnRvdGFsY2hlZXNlKTtcbiAgfVxuXG4gIGFkZFRvVG90YWxTY29yZShlcCl7XG4gICAgVG9vbHMuc3RvcmVUb3RhbFNjb3JlKGVwLHRoaXMuc2NvcmUpO1xuICB9XG5cbn1cbiIsImltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0YWJsZXMgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xuICBjb25zdHJ1Y3RvcihnYW1lLHgseSxrZXksZnJhbWUpe1xuICAgIHN1cGVyKGdhbWUseCx5LGtleSxmcmFtZSk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MucDIuZW5hYmxlKHRoaXMsZmFsc2UpOy8vZGVidWcgaXMgdHJ1ZVxuICAgIFRvb2xzLmNvbnZlcnRUaWxlQ29vclRvUDIoeCx5LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQsdGhpcy5ib2R5KTtcbiAgICBpZihmcmFtZT09J3N3b3JkMSd8fGZyYW1lPT0nc2h1cmlrZW5zJyl7XG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMuc2NhbGUpLnRvKHt4Oi0xfSwxNTAwLFBoYXNlci5FYXNpbmcuQ2lyY3VsYXIuSW5PdXQsIHRydWUsIDAsIEluZmluaXR5LCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHsgYWxwaGE6IDAuNiB9LCA4MDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCB0cnVlLCAwLCBJbmZpbml0eSwgdHJ1ZSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9jb21wb25lbnRzL1Rvb2xzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15U3RvcHMgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xuICBjb25zdHJ1Y3RvcihnYW1lLHgseSxrZXksZnJhbWUpe1xuICAgIHN1cGVyKGdhbWUseCx5LGtleSxmcmFtZSk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MucDIuZW5hYmxlKHRoaXMsZmFsc2UpOy8vZGVidWcgaXMgdHJ1ZVxuICAgIHRoaXMuYm9keS5zdGF0aWMgPSB0cnVlOy8vdGhpcyBjZW50ZXIgdGhlIGFuY2hvciB0byAwLjUsMC41XG4gICAgdGhpcy5hbHBoYSA9IDA7XG4gICAgVG9vbHMuY29udmVydFRpbGVDb29yVG9QMih4LHksdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLmJvZHkpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVyZ3lCYXIgZXh0ZW5kcyBQaGFzZXIuR3JvdXB7XG4gIGNvbnN0cnVjdG9yKGdhbWUseHBvcyx5cG9zKXtcbiAgICBzdXBlcihnYW1lKTtcblxuICAgIHRoaXMud2FybmluZ2hvbGRlciA9IHRoaXMuY3JlYXRlKHhwb3MtMTAseXBvcywnb2JqZWN0czEnLCd3YXJuaW5nJyk7XG4gICAgdGhpcy53YXJuaW5naG9sZGVyLmFscGhhID0gMDtcbiAgICB0aGlzLmJhciA9IHRoaXMuY3JlYXRlKHhwb3MrMjEseXBvcysxMywnb2JqZWN0czEnLCdlbmVyZ3knKTtcbiAgICB0aGlzLmhvbGRlciA9IHRoaXMuY3JlYXRlKHhwb3MseXBvcywnb2JqZWN0czEnLCdlbmVyZ3lfaG9sZGVyJyk7XG4gICAgdGhpcy5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgICB0aGlzLndhcm5pbmdhbmltZSA9IGdhbWUuYWRkLnR3ZWVuKHRoaXMud2FybmluZ2hvbGRlcikudG8oe2FscGhhOiAxfSw2MDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCBmYWxzZSwgMCwgMCwgdHJ1ZSk7XG5cbiAgfVxuXG4gIHNldFZhbHVlKHZhbCl7XG4gICAgaWYodmFsPD0wKXJldHVybjtcbiAgICBpZih0aGlzLnR3ZWVuKXRoaXMudHdlZW4uc3RvcCgpOy8vc3RvcCB0aGUgdHdlZW4gaWYgcnVubmluZyBhbmQgZmxhZyBpdCBmb3IgZGVsZXRpb24uIFRoYXQncyBubyBtb3JlIGFmdGVyIHRoaXMuXG4gICAgdGhpcy50d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcy5iYXIuc2NhbGUpO1xuICAgIHRoaXMudHdlZW4udG8oe3g6dmFsfSwzNTApO1xuICAgIHRoaXMudHdlZW4uc3RhcnQoKTtcbiAgfVxuXG4gIHN0YXJ0V2FybmluZygpe1xuICAgIGlmKCF0aGlzLndhcm5pbmdhbmltZS5pc1BsYXlpbmcpe1xuICAgICAgdGhpcy53YXJuaW5nYW5pbWUuc3RhcnQoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCbG9ja2luZ09iamVjdHMgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xuICBjb25zdHJ1Y3RvcihnYW1lLHgseSxrZXksZnJhbWUpe1xuICAgIHN1cGVyKGdhbWUseCx5LGtleSxmcmFtZSk7XG4gICAgY29uc29sZS5sb2coXCJkb29yIGZyYW1lIG5hbWUgY3JlYXRlZDogXCIrZnJhbWUpO1xuICAgIC8vY29uc29sZS5sb2coXCJiZWZvcmUgeCB5IHdpZHRoIGhlaWdodCBcIit4K1wiIFwiK3krXCIgXCIrdGhpcy5vZmZzZXRYK1wiIFwiK3RoaXMub2Zmc2V0WStcIiBcIit0aGlzLnJpZ2h0K1wiIFwiK3RoaXMuYm90dG9tKTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5wMi5lbmFibGUodGhpcyxmYWxzZSk7Ly9kZWJ1ZyBpcyB0cnVlXG4gICAgdGhpcy5ib2R5LnN0YXRpYyA9IHRydWU7Ly90aGlzIGNlbnRlciB0aGUgYW5jaG9yIHRvIDAuNSwwLjVcbiAgICBUb29scy5jb252ZXJ0VGlsZUNvb3JUb1AyKHgseSx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LHRoaXMuYm9keSk7XG5cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhbHRoQmFyIGV4dGVuZHMgUGhhc2VyLkdyb3Vwe1xuICBjb25zdHJ1Y3RvcihnYW1lLHhwb3MseXBvcyl7XG4gICAgc3VwZXIoZ2FtZSk7XG5cbiAgICB0aGlzLndhcm5pbmdob2xkZXIgPSB0aGlzLmNyZWF0ZSh4cG9zLHlwb3MsJ29iamVjdHMxJywnd2FybmluZycpO1xuICAgIHRoaXMud2FybmluZ2hvbGRlci5hbHBoYSA9IDA7XG4gICAgdGhpcy5iYXIgPSB0aGlzLmNyZWF0ZSh4cG9zKzMyLHlwb3MrMTMsJ29iamVjdHMxJywnaGVhbHRoJyk7XG4gICAgdGhpcy5ob2xkZXIgPSB0aGlzLmNyZWF0ZSh4cG9zLHlwb3MsJ29iamVjdHMxJywnaGVhcnRfaG9sZGVyJyk7XG4gICAgdGhpcy5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcbiAgICB0aGlzLndhcm5pbmdhbmltZSA9IGdhbWUuYWRkLnR3ZWVuKHRoaXMud2FybmluZ2hvbGRlcikudG8oe2FscGhhOiAxfSw2MDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCBmYWxzZSwgMCwgMCwgdHJ1ZSk7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWwpe1xuICAgIGlmKHZhbDw9MClyZXR1cm47XG4gICAgaWYodGhpcy50d2Vlbil0aGlzLnR3ZWVuLnN0b3AoKTsvL3N0b3AgdGhlIHR3ZWVuIGlmIHJ1bm5pbmcgYW5kIGZsYWcgaXQgZm9yIGRlbGV0aW9uLiBUaGF0J3Mgbm8gbW9yZSBhZnRlciB0aGlzLlxuICAgIHRoaXMudHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMuYmFyLnNjYWxlKTtcbiAgICB0aGlzLnR3ZWVuLnRvKHt4OnZhbH0sMzUwKTtcbiAgICB0aGlzLnR3ZWVuLnN0YXJ0KCk7XG4gIH1cblxuICBzdGFydFdhcm5pbmcoKXtcbiAgICBpZighdGhpcy53YXJuaW5nYW5pbWUuaXNQbGF5aW5nKXtcbiAgICAgIHRoaXMud2FybmluZ2FuaW1lLnN0YXJ0KCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVG9vbHMgZnJvbSBcIi4uL2NvbXBvbmVudHMvVG9vbHMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhdGZvcm1zIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcbiAgY29uc3RydWN0b3IoZ2FtZSx4LHksa2V5LGZyYW1lKXtcbiAgICBzdXBlcihnYW1lLHgseSxrZXksZnJhbWUpO1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzLGZhbHNlKTsvL2RlYnVnIGlzIHRydWVcbiAgICB0aGlzLmJvZHkuc3RhdGljID0gdHJ1ZTsvL3RoaXMgY2VudGVyIHRoZSBhbmNob3IgdG8gMC41LDAuNVxuICAgIFRvb2xzLmNvbnZlcnRUaWxlQ29vclRvUDIoeCx5LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQsdGhpcy5ib2R5KTtcbiAgfVxuXG4gIHVwZGF0ZSgpe1xuICAgIC8vY2FuIGJlIG1vdmluZyBoZXJlLi5cblxuICB9XG59XG4iLCJpbXBvcnQgVG9vbHMgZnJvbSBcIi4uL2NvbXBvbmVudHMvVG9vbHMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLlNwcml0ZXtcbiAgY29uc3RydWN0b3IoZ2FtZSx4LHkpe1xuICAgIHN1cGVyKGdhbWUseCx5LCdwbGF5ZXInLCdydW5mcmFtZTAnKTtcbiAgICAvL3BsYXllciBwcm9wZXJ0aWVzXG4gICAgdGhpcy5zcGVlZCA9IDQ1MDtcbiAgICB0aGlzLmFpclNwZWVkID0zMDA7XG4gICAgdGhpcy5qdW1wUG93ZXIgPSA2ODA7XG4gICAgdGhpcy5qdW1wVGltZXIgPSAwO1xuICAgIHRoaXMuaGl0R3JvdW5kVGltZXIgPSAwO1xuICAgIHRoaXMuanVtcEludGVydmFsID0gNzUwO1xuICAgIHRoaXMuZGFtYWdlVGltZXIgPSAwO1xuICAgIHRoaXMuZGFtYWdlSW50ZXJ2YWwgPSAxMjAwO1xuICAgIHRoaXMuaGVhcnRCZWF0SW50ZXJ2YWwgPSA4MDA7Ly9uZWVkIGEgdGltZXIgZXZlbnQgdG8ga2VlcCBjaGVjayBldmVyeSBpbnRlcnZhbCAtIHNpbmNlIGVuZXJneSBpcyBnb2luZyB0byBiZSBzcGVudCBvZnRlbiFcbiAgICB0aGlzLmp1bXAgPSBmYWxzZTtcbiAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc0p1bXBpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzLGZhbHNlKTsvL2RlYnVnIGlzIHRydWVcbiAgICB0aGlzLmJvZHkuY2xlYXJTaGFwZXMoKTsvL2FkZGluZyBhbnkgc2hhcGVzIHdpbGwgc2hpZnQgdGhlIGFuY2hvciB0byAwLjUsIDAuNVxuICAgIHRoaXMuYm9keS5hZGRDYXBzdWxlKDMwLDM1LDAsMCk7Ly9jYW5ub3QgYWRkIG9mZnNldCEhISwgZWxzZSB3aWxsIGhhdmUgY29sbGlzaW9uIHRyb3VibGUgd2l0aCB0aGUgc2lkZSB0aWxlc1xuICAgIHRoaXMuYW5jaG9yLnNldFRvKC41LC42KTtcblxuICAgIHRoaXMuYm9keS5maXhlZFJvdGF0aW9uID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuZGFtcGluZyA9IDAuMjtcblxuICAgIHRoaXMuYXR0YWNrRW5hYmxlZCA9IFRvb2xzLmdldERhdGEoJ2F0dGFja0VuYWJsZWQnKTtcbiAgICB0aGlzLnRocm93RW5hYmxlZCA9IFRvb2xzLmdldERhdGEoJ3Rocm93RW5hYmxlZCcpO1xuXG4gICAgaWYoIXRoaXMuYXR0YWNrRW5hYmxlZCl7XG4gICAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCdydW4nLFBoYXNlci5BbmltYXRpb24uZ2VuZXJhdGVGcmFtZU5hbWVzKCdydW5mcmFtZScsIDEsIDgsICcnLCAwKSwxOCxmYWxzZSxmYWxzZSk7XG4gICAgICB0aGlzLnN0aWxsRnJhbWUgPSAncnVuZnJhbWUwJztcbiAgICAgIHRoaXMuanVtcFVwRnJhbWUgPSAnanVtcGZyYW1lMSc7XG4gICAgICB0aGlzLmp1bXBEb3duRnJhbWUgPSAnanVtcGZyYW1lMic7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmNoYW5nZUJvZHkoKTtcbiAgICB9XG5cbiAgICAvL2F0dGFjayBib3hcbiAgICB0aGlzLmhpdGJveDEgPSB0aGlzLmFkZENoaWxkKGdhbWUubWFrZS5zcHJpdGUodGhpcy54LHRoaXMueSwnb2JqZWN0czEnLCdzdG9wJykpO1xuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzLmhpdGJveDEsZmFsc2UpOy8vZGVidWcgaXMgZmFsc2VcbiAgICB0aGlzLmhpdGJveDEuYm9keS5raW5lbWF0aWMgPSB0cnVlO1xuICAgIHRoaXMuaGl0Ym94MS5hbHBoYSA9IDA7XG4gICAgdGhpcy5oaXRib3gxLmtpbGwoKTtcblxuICAgIGlmKHRoaXMudGhyb3dFbmFibGVkKSB0aGlzLnRocm93Qm9keSgpO1xuICAgIC8vY3JlYXRlIDUgc2h1cmlrZW5zIHdpdGggZmlyc3QgZnJhbWVcbiAgICB0aGlzLnNodXJpa2VucyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAodGhpcy5nYW1lLndvcmxkLCdzaHVyaWtlbnMnLGZhbHNlLHRydWUsMSk7XG4gICAgdGhpcy5zaHVyaWtlbnMuY3JlYXRlTXVsdGlwbGUoMjAsJ3BsYXllcicsJ3MxJyk7XG5cbiAgICB0aGlzLnNodXJpa2Vucy5mb3JFYWNoKChzaHVyaWtlbik9PntcbiAgICAgIHNodXJpa2VuLmJvZHkuY2xlYXJTaGFwZXMoKTtcbiAgICAgIHNodXJpa2VuLmJvZHkuc2V0Q2lyY2xlKHNodXJpa2VuLndpZHRoLzIpO1xuICAgICAgc2h1cmlrZW4uYW5pbWF0aW9ucy5hZGQoJ2ZseScsUGhhc2VyLkFuaW1hdGlvbi5nZW5lcmF0ZUZyYW1lTmFtZXMoJ3MnLCAxLCAzLCAnJywgMCksMjUsdHJ1ZSxmYWxzZSk7XG4gICAgICBzaHVyaWtlbi5ib2R5LmtpbmVtYXRpYyA9IHRydWU7XG4gICAgICBzaHVyaWtlbi5ib2R5LmRhbXBpbmcgPSAwLjI7XG4gICAgICAvL3NodXJpa2VuLmJvZHkuZGVidWc9dHJ1ZTtcbiAgICB9LHRoaXMuZ2FtZS53b3JsZCk7XG5cbiAgICB0aGlzLnBsYXllcnRleHQgPSB0aGlzLmdhbWUuYWRkLnRleHQodGhpcy54LHRoaXMueSxcIiBcIix7XG4gICAgICBmb250OicxNXB4IENlbnR1cnknLGZpbGw6JyNmZmZmZmYnXG4gICAgfSk7XG4gICAgdGhpcy5wbGF5ZXJ0ZXh0LmFuY2hvci5zZXRUbygwLjUsMC41KTtcbiAgICB0aGlzLnBsYXllcnRleHQua2lsbCgpO1xuICAgIHRoaXMudGV4dHRpbWVyID0gMDtcblxuICAgIC8vZGFtYWdlIGFuaW1hdGlvblxuICAgIHRoaXMuZmxhc2hSZWRFZmZlY3QgPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpIC8vYmxpbmsgYmxpbmsgd2hlbiBoaXRcbiAgICAgICAgLnRvKHt0aW50OjB4RkYwMDAwfSw1MCxQaGFzZXIuRWFzaW5nLkJvdW5jZS5vdXQpXG4gICAgICAgIC50byh7dGludDoweEZCODk4OX0sNTAsUGhhc2VyLkVhc2luZy5Cb3VuY2Uub3V0KVxuICAgICAgICAudG8oe3RpbnQ6MHhGRkZGRkZ9LDE1MCxQaGFzZXIuRWFzaW5nLkNpcmN1bGFyLm91dCk7XG5cbiAgICAvL3Bvd2VyIHVwIGFuaW1hdGlvblxuICAgIHRoaXMuZmxhc2hHcmVlbkVmZmVjdCA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcykgLy9ibGluayBibGluayB3aGVuIGhpdFxuICAgICAgICAudG8oe3RpbnQ6MHgwMEZGMDB9LDUwLFBoYXNlci5FYXNpbmcuQm91bmNlLm91dClcbiAgICAgICAgLnRvKHt0aW50OjB4ODNmZjgzfSw1MCxQaGFzZXIuRWFzaW5nLkJvdW5jZS5vdXQpXG4gICAgICAgIC50byh7dGludDoweEZGRkZGRn0sMTUwLFBoYXNlci5FYXNpbmcuQ2lyY3VsYXIub3V0KTtcblxuICAgIC8vc2V0IGhlYWx0aC1pbnRlcm5hbCBidWlsdCBpbiBwYXJhbXNcbiAgICB0aGlzLnNldEhlYWx0aCh0aGlzLm1heEhlYWx0aCk7Ly9kZWZhdWx0IG1heEhlYWx0aCBpcyAxMDBcbiAgICAvL2N1c3RvbSBlbmVyZ3kgcGFyYW1zXG4gICAgdGhpcy5tYXhFbmVyZ3kgPSAxMDA7XG4gICAgdGhpcy5lbmVyZ3kgPSB0aGlzLm1heEVuZXJneTtcbiAgICB0aGlzLmhlYXJ0QmVhdCA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZShmYWxzZSk7XG4gICAgdGhpcy5oZWFydEJlYXQubG9vcCh0aGlzLmhlYXJ0QmVhdEludGVydmFsLCB0aGlzLmhlYXJ0QmVhdENoZWNrLHRoaXMpO1xuICAgIHRoaXMuaGVhcnRCZWF0LnN0YXJ0KCk7XG4gICAgLy9jaGVjayBmb3IgZGVhdGhcbiAgICB0aGlzLmV2ZW50cy5vbktpbGxlZC5hZGQoKCk9Pnt0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnLHRydWUsZmFsc2UsJ2dhbWVvdmVyJyl9LHRoaXMpO1xuXG4gICAgdGhpcy5yZXN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5vbnNsaXBweXBsYXRmb3JtID0gZmFsc2U7XG5cbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuXG4gICAgLy9rZXlzXG4gICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcbiAgICB0aGlzLnNwYWNlQmFyID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xuICAgIHRoaXMua2V5cyA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXlzKHsnQSc6IFBoYXNlci5LZXlib2FyZC5BLCdTJzogUGhhc2VyLktleWJvYXJkLlN9KTtcbiAgICB0aGlzLmtleXMuQS5vbkRvd24uYWRkKCgpPT57aWYodGhpcy5wYXVzZWQpcmV0dXJuOyBpZih0aGlzLmF0dGFja0VuYWJsZWQpdGhpcy5hdHRhY2tpbmc9dHJ1ZTt9LHRoaXMpO1xuICAgIHRoaXMua2V5cy5TLm9uRG93bi5hZGQoKCk9PntcbiAgICAgIGlmKHRoaXMucGF1c2VkKXJldHVybjtcbiAgICAgIGlmKHRoaXMudGhyb3dFbmFibGVkJiZ0aGlzLnNodXJpa2VuSFVEKXtcbiAgICAgICAgICBpZih0aGlzLnNodXJpa2VuSFVELmNvdW50PDEpe1xuICAgICAgICAgICAgbGV0IG91dCA9IHRoaXMuZ2FtZS5jYWNoZS5nZXRKU09OKCdjb25maWcnKS5wb3B1cC5vdXRvZmFtbW87XG4gICAgICAgICAgICB0aGlzLnNheSh0aGlzLmdhbWUucm5kLnBpY2soT2JqZWN0LnZhbHVlcyhvdXQpKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aHJvd2luZz10cnVlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vY29uc29sZS5sb2coXCJkb3NzaWVyIHBvc2l0aW9uOiBcIit0aGlzLngrXCIgXCIrdGhpcy55KVxuICAgIH1cbiAgICAsdGhpcyk7XG5cbiAgfVxuXG4gIGF0dGFjaygpe1xuICAgIGlmKHRoaXMuYXR0YWNrRW5hYmxlZCl7XG4gICAgICAvL2VuYWJsZSBoaXQgYm94XG4gICAgICBpZighdGhpcy5oaXRib3gxLmV4aXN0cyl7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdhdHRhY2snKTtcbiAgICAgICAgdGhpcy5zZngucGxheSh0aGlzLmdhbWUucm5kLnBpY2soWydwdWxsJywncHVsbDEnLCdzd2lwZTEnXSkpO1xuICAgICAgICBsZXQgZmFjZURpciA9IHRoaXMuc2NhbGUueDtcbiAgICAgICAgdGhpcy5oaXRib3gxLnJlc2V0KHRoaXMueCtmYWNlRGlyKjcwLHRoaXMueS02MCk7XG4gICAgICAgIHRoaXMuaGl0Ym94MS5ib2R5LnZlbG9jaXR5LnggPSBmYWNlRGlyICogMTUwO1xuICAgICAgICB0aGlzLmRyYWluRW5lcmd5KDYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRocm93c3RhcnMoKXtcbiAgICAvL2NvbnNvbGUubG9nKFwidGhyb3dzdGFycyBcIisgdGhpcy50aHJvd0VuYWJsZWQgKyBcIiBcIiArIHRoaXMuc2h1cmlrZW5zY291bnQpO1xuICAgIGlmKHRoaXMudGhyb3dFbmFibGVkKXtcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCd0aHJvdycpO1xuICAgICAgdGhpcy5zZngucGxheSgnc3dpc2gnKTtcbiAgICAgIGxldCBmYWNlRGlyID0gdGhpcy5zY2FsZS54O1xuICAgICAgbGV0IHNodXJpa2VuID0gdGhpcy5zaHVyaWtlbnMuZ2V0Rmlyc3REZWFkKGZhbHNlLHRoaXMueCx0aGlzLnktNzApO1xuICAgICAgaWYoc2h1cmlrZW4pe1xuICAgICAgICBzaHVyaWtlbi5saWZlc3BhbiA9IDI1MDA7XG4gICAgICAgIHNodXJpa2VuLmJvZHkudmVsb2NpdHkueCA9IGZhY2VEaXIgKiA0MDA7XG4gICAgICAgIHNodXJpa2VuLmFuaW1hdGlvbnMucGxheSgnZmx5Jyk7XG5cbiAgICAgICAgdGhpcy5kZWNyZWFzZVNodXJpa2VuKDEpO1xuICAgICAgICB0aGlzLmRyYWluRW5lcmd5KDQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhlYXJ0QmVhdENoZWNrKCl7XG4gICAgaWYodGhpcy5wYXVzZWQpIHJldHVybjtcbiAgICAvL2NoZWNrIGZvciBlbmVyZ3kgZHJhaW5hZ2VcbiAgICBpZih0aGlzLmlzTW92aW5nKXRoaXMuZHJhaW5FbmVyZ3koMik7XG4gICAgZWxzZSBpZih0aGlzLmlzSnVtcGluZyl0aGlzLmRyYWluRW5lcmd5KDQpO1xuICAgIGVsc2UgdGhpcy5yZXBsZW5pc2hFbmVyZ3koMik7XG5cbiAgICAvL2lmIHRoaXMgcGxheWVyIGVuZXJneS9saWZlIGxvd2VyIHRoYW4gMjAsIGZsYXNoIHdhcm5pbmdcbiAgICAvL2hlYWx0aCBwcmlvcml0eSBpcyBmaXJzdCB3aGVuIGRpc3BsYXlpbmcgZGlhbG9ndWVcbiAgICBpZih0aGlzLmhlYWx0aDwzMCl7XG4gICAgICB0aGlzLmhlYWx0aEJhci5zdGFydFdhcm5pbmcoKTtcbiAgICAgIGlmKCF0aGlzLnBsYXllcnRleHQuYWxpdmUmJnRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMudGV4dHRpbWVyKXtcbiAgICAgICAgbGV0IGR5aW5nb2JqID0gdGhpcy5nYW1lLmNhY2hlLmdldEpTT04oJ2NvbmZpZycpLnBvcHVwLmR5aW5nO1xuICAgICAgICBsZXQgdGV4dHRvc2F5ID0gdGhpcy5nYW1lLnJuZC5waWNrKE9iamVjdC52YWx1ZXMoZHlpbmdvYmopKTtcbiAgICAgICAgdGhpcy5zYXkodGV4dHRvc2F5KTtcbiAgICAgICAgdGhpcy50ZXh0dGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKzYwMDA7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZih0aGlzLmVuZXJneTwzMCl7XG4gICAgICB0aGlzLmVuZXJneUJhci5zdGFydFdhcm5pbmcoKTtcbiAgICAgIGlmKCF0aGlzLnBsYXllcnRleHQuYWxpdmUmJnRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMudGV4dHRpbWVyKXtcbiAgICAgICAgbGV0IHRpcmluZ29iaiA9IHRoaXMuZ2FtZS5jYWNoZS5nZXRKU09OKCdjb25maWcnKS5wb3B1cC50aXJpbmc7XG4gICAgICAgIGxldCB0ZXh0dG9zYXkgPSB0aGlzLmdhbWUucm5kLnBpY2soT2JqZWN0LnZhbHVlcyh0aXJpbmdvYmopKTtcbiAgICAgICAgdGhpcy5zYXkodGV4dHRvc2F5KTtcbiAgICAgICAgdGhpcy50ZXh0dGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKzYwMDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2F5KHNwZWVjaCl7XG4gICAgaWYoIXRoaXMucGxheWVydGV4dC5hbGl2ZSl7XG4gICAgICB0aGlzLnBsYXllcnRleHQuZml4ZWRUb0NhbWVyYSA9IGZhbHNlO1xuICAgICAgdGhpcy5wbGF5ZXJ0ZXh0LnNldFRleHQoc3BlZWNoKTtcbiAgICAgIHRoaXMucGxheWVydGV4dC5yZXNldCgodGhpcy54LXRoaXMuZ2FtZS5jYW1lcmEucG9zaXRpb24ueCksKHRoaXMueS10aGlzLmdhbWUuY2FtZXJhLnBvc2l0aW9uLnkpLTEyMCk7XG4gICAgICB0aGlzLnBsYXllcnRleHQubGlmZXNwYW4gPSAyNTAwO1xuXG4gICAgICB0aGlzLnBsYXllcnRleHQuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZ2FtZS5jYW1lcmEucG9zaXRpb24ueCtcIiBcIit0aGlzLmdhbWUuY2FtZXJhLnBvc2l0aW9uLnkgK1wiIFwiKyB0aGlzLnBsYXllcnRleHQuY2FtZXJhT2Zmc2V0LngrXCIgXCIgKyB0aGlzLnBsYXllcnRleHQuY2FtZXJhT2Zmc2V0LnkrIFwiIFwiICsgdGhpcy54ICsgXCIgXCIgKyB0aGlzLnkpO1xuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGlvblN0YXRlKCl7XG5cbiAgICBpZih0aGlzLmF0dGFja2luZyYmIXRoaXMuaW5BaXImJnRoaXMuZnJhbWVOYW1lPT10aGlzLnN0aWxsRnJhbWUpe1xuICAgICAgLy9jb25zb2xlLmxvZyhcImhpdGJveCBib2R5IGxvY2F0aW9uIFwiK3RoaXMuaGl0Ym94MS5ib2R5LngrXCIgXCIrdGhpcy5oaXRib3gxLmJvZHkueSk7XG4gICAgICBpZighdGhpcy5yZXN0aW5nKXRoaXMuYXR0YWNrKCk7XG4gICAgfVxuXG4gICAgaWYodGhpcy50aHJvd2luZyYmIXRoaXMuaW5BaXImJnRoaXMuZnJhbWVOYW1lPT10aGlzLnN0aWxsRnJhbWUpe1xuICAgICAgaWYoIXRoaXMucmVzdGluZyl0aGlzLnRocm93c3RhcnMoKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLmluQWlyKXtcbiAgICAgIGlmKHRoaXMuYm9keS52ZWxvY2l0eS55PC01MDApdGhpcy5mcmFtZU5hbWUgPSB0aGlzLmp1bXBVcEZyYW1lO1xuICAgICAgZWxzZSBpZih0aGlzLmJvZHkudmVsb2NpdHkueT4xMDApdGhpcy5mcmFtZU5hbWUgPSB0aGlzLmp1bXBEb3duRnJhbWU7XG5cbiAgICB9ZWxzZSBpZighdGhpcy5pbkFpcil7XG4gICAgICBpZihNYXRoLmFicyh0aGlzLmJvZHkudmVsb2NpdHkueCk+MTUwKXtcbiAgICAgICAgLy9ydW5uaW5nXG4gICAgICAgIC8vZHJhaW4gZW5lcmd5IGV2ZXJ5IGZpeGVkIGludGVydmFsXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdydW4nKTtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICAvL2lkbGluZ1xuICAgICAgICAvL2FkZCBlbmVyZ3kgc2xvd2x5XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0p1bXBpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZih0aGlzLmF0dGFja0VuYWJsZWQmJnRoaXMuYXR0YWNrQW5pbWF0aW9uLmlzUGxheWluZyl7fVxuICAgICAgICBlbHNlIGlmKHRoaXMudGhyb3dFbmFibGVkJiZ0aGlzLnRocm93QW5pbWF0aW9uLmlzUGxheWluZyl7fS8vaWYgYW55IG9mIHRoZXNlIGFuaW1hdGlvbiBpcyBwbGF5aW5nLCBkbyBub3RoaW5nXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mcmFtZU5hbWUgPSB0aGlzLnN0aWxsRnJhbWU7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgbW92ZVBsYXllcigpe1xuICAgIC8vbW92ZSBmdW5jdGlvbnNcbiAgICAvL2lmIG5vIGVuZXJneSBqdXN0IHNraXBcbiAgICBpZih0aGlzLmVuZXJneTw9MC41fHx0aGlzLnJlc3RpbmcmJnRoaXMuZW5lcmd5PDUpIHsvL2lmIGZ0cnVlaXJzdCB0aW1lIGV4aGF1c3QsIHJlc3Q7IHNlY29uZCB0aW1lIGlzIGNoZWNrIHdoZXRoZXIgaXMgcmVzdGluZywgdW50aWwgZW5lcmd5ID41XG4gICAgICAgIHRoaXMucmVzdGluZyA9IHRydWU7XG4gICAgfWVsc2UgaWYodGhpcy5yZXN0aW5nJiZ0aGlzLmVuZXJneT41KXRoaXMucmVzdGluZz1mYWxzZTtcblxuICAgIGxldCBzcGVlZFRvVXNlID0gdGhpcy5pbkFpcj90aGlzLmFpclNwZWVkOnRoaXMuc3BlZWQ7XG5cbiAgICBpZih0aGlzLmN1cnNvcnMubGVmdC5pc0Rvd24pe1xuICAgICAgdGhpcy5zY2FsZS54ID0gLTE7Ly90aGlzIHdpbGwgbWFrZSB0aGUgc3ByaXRlIGZhbGxzIHRocm91Z2ggdGlsZW1hcCFcbiAgICAgIGlmKCF0aGlzLnJlc3RpbmcpdGhpcy5ib2R5Lm1vdmVMZWZ0KHNwZWVkVG9Vc2UpO1xuICAgIH1lbHNlIGlmKHRoaXMuY3Vyc29ycy5yaWdodC5pc0Rvd24pe1xuICAgICAgdGhpcy5zY2FsZS54ID0gMTtcbiAgICAgIGlmKCF0aGlzLnJlc3RpbmcpdGhpcy5ib2R5Lm1vdmVSaWdodChzcGVlZFRvVXNlKTtcbiAgICB9ZWxzZXtcbiAgICAgIC8vdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAwOy8vaWYgaSBzZXQgdGhpcyB0byAwLCB0aGUgc2xpcHBlcnkgcGxhdGZvcm0gd29udCB3b3JrIVxuXG4gICAgICBpZighdGhpcy5pbkFpciYmIXRoaXMub25zbGlwcHlwbGF0Zm9ybSl0aGlzLmJvZHkudmVsb2NpdHkueCA9IDA7XG4gICAgfVxuXG4gICAgaWYoIXRoaXMucmVzdGluZyl7XG4gICAgICBpZih0aGlzLmN1cnNvcnMudXAuaXNEb3dufHx0aGlzLnNwYWNlQmFyLmlzRG93bil7XG4gICAgICAgIHRoaXMuanVtcD10cnVlO1xuXG4gICAgICB9XG4gICAgICBlbHNlIGlmKHRoaXMuY3Vyc29ycy51cC5pc1VwfHx0aGlzLnNwYWNlQmFyLmlzVXApdGhpcy5qdW1wPWZhbHNlO1xuXG4gICAgICB0aGlzLmNoZWNrSnVtcCgpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrSnVtcCgpe1xuICAgIGlmKHRoaXMuanVtcCYmdGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5qdW1wVGltZXImJiF0aGlzLmluQWlyKXtcbiAgICAgIHRoaXMuYm9keS5tb3ZlVXAodGhpcy5qdW1wUG93ZXIpO1xuICAgICAgdGhpcy5zZngucGxheSgnanVtcCcpO1xuICAgICAgdGhpcy5qdW1wVGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKyB0aGlzLmp1bXBJbnRlcnZhbDtcbiAgICAgIHRoaXMuaXNKdW1waW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmbGFzaCh0aW50KXtcbiAgICBsZXQgZmxhc2hFZmZlY3QgPSB1bmRlZmluZWQ7XG4gICAgc3dpdGNoICh0aW50KXtcbiAgICAgIGNhc2UgJ3JlZCc6XG4gICAgICAgIGZsYXNoRWZmZWN0ID0gdGhpcy5mbGFzaFJlZEVmZmVjdDtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZ3JlZW4nOlxuICAgICAgICBmbGFzaEVmZmVjdCA9IHRoaXMuZmxhc2hHcmVlbkVmZmVjdDtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmKCFmbGFzaEVmZmVjdC5pc1J1bm5pbmcpZmxhc2hFZmZlY3Quc3RhcnQoKTtcbiAgfVxuXG4gIGRyYWluRW5lcmd5KGFtdCl7XG4gICAgaWYodGhpcy5lbmVyZ3k8PTAuNSlyZXR1cm47XG4gICAgdGhpcy5lbmVyZ3kgLT0gYW10O1xuICAgIHRoaXMuZW5lcmd5QmFyLnNldFZhbHVlKHRoaXMuZW5lcmd5L3RoaXMubWF4RW5lcmd5KTtcbiAgfVxuXG4gIHJlcGxlbmlzaEVuZXJneShhbXQpe1xuICAgIGlmKHRoaXMuZW5lcmd5Pj10aGlzLm1heEVuZXJneSlyZXR1cm47XG4gICAgaWYodGhpcy5lbmVyZ3krYW10PnRoaXMubWF4RW5lcmd5KXRoaXMuZW5lcmd5PXRoaXMubWF4RW5lcmd5O1xuICAgIGVsc2UgdGhpcy5lbmVyZ3kgKz0gYW10O1xuICAgIHRoaXMuZW5lcmd5QmFyLnNldFZhbHVlKHRoaXMuZW5lcmd5L3RoaXMubWF4RW5lcmd5KTtcbiAgfVxuXG4gIGRyYWluTGlmZShhbXQpe1xuICAgIGlmKHRoaXMuaGVhbHRoPD0wLjUpcmV0dXJuO1xuICAgIHRoaXMuZGFtYWdlKGFtdCk7Ly91c2UgaW50ZXJhbCBmdW5jdGlvbiwgd2hpY2ggd2lsbCBhY3RpdmF0ZSB0aGUga2lsbCBpZiBoZWFsdGggPSAwO1xuICAgIHRoaXMuaGVhbHRoQmFyLnNldFZhbHVlKHRoaXMuaGVhbHRoL3RoaXMubWF4SGVhbHRoKTtcbiAgfVxuXG4gIHJlcGxlbmlzaExpZmUoYW10KXtcbiAgICB0aGlzLmhlYWwoYW10KTsvL3RoaXMgdGFrZXMgY2FyZSBvZiB0aGUgY2hlY2tpbmcgb2YgbWF4SGVhbHRoIC4uLlxuICAgIHRoaXMuaGVhbHRoQmFyLnNldFZhbHVlKHRoaXMuaGVhbHRoL3RoaXMubWF4SGVhbHRoKTtcbiAgfVxuXG4gIGluY3JlYXNlU2h1cmlrZW4oYW10KXtcbiAgICB0aGlzLnNodXJpa2VuSFVELmluY3JlYXNlQ291bnQoYW10KTtcbiAgfVxuXG4gIGRlY3JlYXNlU2h1cmlrZW4oYW10KXtcbiAgICB0aGlzLnNodXJpa2VuSFVELmRlY3JlYXNlQ291bnQoYW10KTtcbiAgfVxuXG4gIGRhbWFnZVBsYXllcihhbXQsZG1nSW50ZXJ2YWwpe1xuICAgIGxldCBpbnRlcnZhbCA9IGRtZ0ludGVydmFsP2RtZ0ludGVydmFsOnRoaXMuZGFtYWdlSW50ZXJ2YWw7XG5cbiAgICBpZih0aGlzLmdhbWUudGltZS5ub3c+dGhpcy5kYW1hZ2VUaW1lcil7Ly9wbGF5ZXIgY2Fubm90IGtlZXAgdGFraW5nIGRhbWFnZSBldmVyeSB0aWNrIVxuICAgICAgdGhpcy5kcmFpbkxpZmUoYW10KTtcbiAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGhlYWx0aCBcIit0aGlzLmhlYWx0aCk7XG4gICAgICB0aGlzLmZsYXNoKCdyZWQnKTtcbiAgICAgIHRoaXMuc2Z4LnBsYXkoJ2RhbWFnZWQnKTtcbiAgICAgIHRoaXMuZGFtYWdlVGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKyBpbnRlcnZhbDtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VCb2R5KCl7XG4gICAgLy9yZXNldCBleGlzdGluZyBhbGwgYW5pbWF0aW9uIGZyYW1lc1xuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3J1bicsUGhhc2VyLkFuaW1hdGlvbi5nZW5lcmF0ZUZyYW1lTmFtZXMoJ3N3b3JkZnJhbWUnLCAxLCA4LCAnJywgMCksMTgsZmFsc2UsZmFsc2UpO1xuICAgIHRoaXMuc3RpbGxGcmFtZSA9ICdoaXRmcmFtZTAnO1xuICAgIHRoaXMuanVtcFVwRnJhbWUgPSAnc3dvcmRqdW1wZnJhbWUxJztcbiAgICB0aGlzLmp1bXBEb3duRnJhbWUgPSAnc3dvcmRqdW1wZnJhbWUyJztcblxuICAgIC8vbmV3IGF0dGFjayBhbmltYXRpb25cbiAgICB0aGlzLmF0dGFja0FuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2F0dGFjaycsUGhhc2VyLkFuaW1hdGlvbi5nZW5lcmF0ZUZyYW1lTmFtZXMoJ2hpdGZyYW1lJywgMSwgMywgJycsIDApLDEyLGZhbHNlLGZhbHNlKTtcblxuICAgIFRvb2xzLnN0b3JlRGF0YSgnYXR0YWNrRW5hYmxlZCcsdHJ1ZSk7XG4gICAgdGhpcy5hdHRhY2tFbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHRocm93Qm9keSgpe1xuICAgIC8vYWRkIHRocm93IGFuaW1hdGlvblxuICAgIHRoaXMudGhyb3dBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWRkKCd0aHJvdycsUGhhc2VyLkFuaW1hdGlvbi5nZW5lcmF0ZUZyYW1lTmFtZXMoJ3Rocm93ZnJhbWUnLCAxLCA0LCAnJywgMCksMTIsZmFsc2UsZmFsc2UpO1xuXG4gICAgVG9vbHMuc3RvcmVEYXRhKCd0aHJvd0VuYWJsZWQnLHRydWUpO1xuICAgIHRoaXMudGhyb3dFbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZSgpey8vb3ZlcnJpZGUgc3ByaXRlJ3MgdXBkYXRlIGZ1bmN0aW9uXG5cbiAgICBpZih0aGlzLnBhdXNlZCkgcmV0dXJuO1xuXG4gICAgbGV0IHdhc0FpciA9IHRoaXMuaW5BaXI7Ly9wcmV2aW91c2x5IGluIHRoZSBhaXI/XG4gICAgdGhpcy5pbkFpciA9ICFUb29scy5jaGVja0lmT25GbG9vcih0aGlzLmdhbWUsdGhpcyk7XG4gICAgaWYoIXRoaXMuaW5BaXImJndhc0Fpcil7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiaGl0IGdyb3VuZFwiKTtcbiAgICAgIFRvb2xzLnBsYXlTb3VuZCh0aGlzLnNmeCxbJ2xhbmQnXSk7XG5cbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZSgpO1xuXG4gICAgdGhpcy5tb3ZlUGxheWVyKCk7XG5cbiAgICBpZih0aGlzLmF0dGFja0VuYWJsZWQmJiF0aGlzLmF0dGFja0FuaW1hdGlvbi5pc1BsYXlpbmcpe1xuICAgICAgaWYodGhpcy5oaXRib3gxLmV4aXN0cyl0aGlzLmhpdGJveDEua2lsbCgpO1xuICAgICAgdGhpcy5hdHRhY2tpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZih0aGlzLnRocm93RW5hYmxlZCYmIXRoaXMudGhyb3dBbmltYXRpb24uaXNQbGF5aW5nKXtcbiAgICAgIHRoaXMudGhyb3dpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgfVxufVxuIiwiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9jb21wb25lbnRzL1Rvb2xzLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAgZXh0ZW5kcyBQaGFzZXIuSW1hZ2V7XG4gIGNvbnN0cnVjdG9yKGdhbWUseCx5LHBhbmVsdHlwZSl7Ly9mdWxsIGNvbnRlbnQgaGVpZ2h0ID0gNDYwXG4gICAgc3VwZXIoZ2FtZSx4LHksJ3BvcHVwJyk7XG5cbiAgICB0aGlzLm5hbWUgPSAncG9wdXAnO1xuXG4gICAgdGhpcy50aXRsZVN0eWxlID0ge1xuICAgICAgZm9udDonYm9sZCA0MHB4IENlbnR1cnknLGZpbGw6JyNkOWQyMWEnXG4gICAgfVxuXG4gICAgdGhpcy5kZWZhdWx0U3R5bGUgPSB7XG4gICAgICBmb250Oidib2xkIDI2cHggQ2VudHVyeScsZmlsbDonIzEzMWE1NSdcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvblN0eWxlID0ge1xuICAgICAgZm9udDonYm9sZCAyMnB4IENlbnR1cnknLGZpbGw6JyMxMzFhNTUnXG4gICAgfVxuXG4gICAgdGhpcy5kZXNjcmlwdGlvblN0eWxlID0ge1xuICAgICAgZm9udDonYm9sZCAxNXB4IENlbnR1cnknLGZpbGw6JyMxMzFhNTUnXG4gICAgfVxuXG4gICAgdGhpcy5oaWdobGlnaHRTdHlsZSA9IHtcbiAgICAgIGZvbnQ6J2JvbGQgMjZweCBDZW50dXJ5JyxmaWxsOicjY2RlMTZkJ1xuICAgIH1cbiAgICB0aGlzLnBhbmVsdHlwZSA9IHBhbmVsdHlwZTtcbiAgICAvL3BhbmVsdHlwZTogMSAtIG1lbnVzY3JlZW4sIDIgLSBpbmdhbWUgcGF1c2UsIDMgLSBkZXNjcmlwdGlvblxuICAgIHRoaXMuc2Z4ID0gdGhpcy5nYW1lLmFkZC5hdWRpb1Nwcml0ZSgnc2Z4Jyk7XG4gICAgc3dpdGNoKHBhbmVsdHlwZSl7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXcgUGhhc2VyLlRleHQoZ2FtZSw1MTIsMTg4LCdPcHRpb25zJyx0aGlzLnRpdGxlU3R5bGUpO1xuICAgICAgICB0aGlzLnRpdGxlLmFuY2hvci5zZXRUbygwLjUsMC41KTtcbiAgICAgICAgdGhpcy50aXRsZS5zZXRTaGFkb3coMiwyKTtcblxuICAgICAgICBpZihUb29scy5nZXREYXRhKCdtdXRldGhlbWUnKSkgdGhpcy5tdXNpYyA9IG5ldyBQaGFzZXIuVGV4dChnYW1lLDM0MCwyNDUsJ1BsYXkgTXVzaWMnLHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgZWxzZSB0aGlzLm11c2ljID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsMzQwLDI0NSwnTXV0ZSBNdXNpYycsdGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICBpZihUb29scy5nZXREYXRhKCdtdXRlc291bmQnKSkgdGhpcy5zb3VuZCA9IG5ldyBQaGFzZXIuVGV4dChnYW1lLDM0MCwzMDUsJ1BsYXkgU291bmQnLHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgZWxzZSB0aGlzLnNvdW5kID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsMzQwLDMwNSwnTXV0ZSBTb3VuZCcsdGhpcy5kZWZhdWx0U3R5bGUpO1xuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsMzQwLDM2NSwnSW5zdHJ1Y3Rpb25zJyx0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgIHRoaXMuY3JlZGl0cyA9IG5ldyBQaGFzZXIuVGV4dChnYW1lLDM0MCw0MjUsJ0NyZWRpdHMnLHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgdGhpcy5iYWNrID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsMzQwLDQ4NSwnQmFjaycsdGhpcy5kZWZhdWx0U3R5bGUpO1xuXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tdXNpYyk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zb3VuZCk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5pbnN0cnVjdGlvbnMpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuY3JlZGl0cyk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iYWNrKTtcblxuICAgICAgICB0aGlzLmhpZ2hsaWdodCh0aGlzLm11c2ljKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLnRpdGxlID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsNTEyLDE4OCwnUGF1c2VkJyx0aGlzLnRpdGxlU3R5bGUpO1xuICAgICAgICB0aGlzLnRpdGxlLmFuY2hvci5zZXRUbygwLjUsMC41KTtcbiAgICAgICAgdGhpcy50aXRsZS5zZXRTaGFkb3coMiwyKTtcbiAgICAgICAgdGhpcy5yZXN1bWUgPSBuZXcgUGhhc2VyLlRleHQoZ2FtZSwzNDAsMjQ1LCdSZXN1bWUgR2FtZScsdGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICB0aGlzLnJlc3RhcnQgPSBuZXcgUGhhc2VyLlRleHQoZ2FtZSwzNDAsMzA1LCdSZXN0YXJ0IEVwaXNvZGUnLHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXRoZW1lJykpIHRoaXMubXVzaWMgPSBuZXcgUGhhc2VyLlRleHQoZ2FtZSwzNDAsMzY1LCdQbGF5IE11c2ljJyx0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgIGVsc2UgdGhpcy5tdXNpYyA9IG5ldyBQaGFzZXIuVGV4dChnYW1lLDM0MCwzNjUsJ011dGUgTXVzaWMnLHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXNvdW5kJykpIHRoaXMuc291bmQgPSBuZXcgUGhhc2VyLlRleHQoZ2FtZSwzNDAsNDI1LCdQbGF5IFNvdW5kJyx0aGlzLmRlZmF1bHRTdHlsZSk7XG4gICAgICAgIGVsc2UgdGhpcy5zb3VuZCA9IG5ldyBQaGFzZXIuVGV4dChnYW1lLDM0MCw0MjUsJ011dGUgU291bmQnLHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBuZXcgUGhhc2VyLlRleHQoZ2FtZSwzNDAsNDg1LCdJbnN0cnVjdGlvbnMnLHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgdGhpcy5xdWl0ID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsMzQwLDU0NSwnUXVpdCB0byBNYWluIE1lbnUnLHRoaXMuZGVmYXVsdFN0eWxlKTtcblxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMudGl0bGUpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMucmVzdW1lKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnJlc3RhcnQpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMubXVzaWMpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuc291bmQpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuaW5zdHJ1Y3Rpb25zKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnF1aXQpO1xuXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMucmVzdW1lKTtcblxuICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6Ly91c2VkIGluIGluc3RydWN0aW9ucywgY3JlZGl0cyAmIGluLWdhbWUgdGlwc1xuICAgICAgICB0aGlzLnRpdGxlID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsNTEyLDE4OCwnVGl0bGUnLHRoaXMudGl0bGVTdHlsZSk7XG4gICAgICAgIHRoaXMudGl0bGUuYW5jaG9yLnNldFRvKDAuNSwwLjUpO1xuICAgICAgICB0aGlzLnRpdGxlLnNldFNoYWRvdygyLDIpO1xuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXcgUGhhc2VyLlRleHQoZ2FtZSwzMzIsMjQ1LCdEZXNjcmlwdGlvbicsdGhpcy5kZXNjcmlwdGlvblN0eWxlKTtcbiAgICAgICAgdGhpcy5iYWNrID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsMzQwLDU2MCwnR290IGl0IScsdGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMudGl0bGUpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmFjayk7XG5cbiAgICAgICAgdGhpcy5oaWdobGlnaHQodGhpcy5iYWNrKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0Oi8vdXNlZCBpbiBDb250aW51ZSBtZW51IG9wdGlvblxuICAgICAgICB0aGlzLnRpdGxlID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsNTEyLDE4OCwnQ2hvb3NlIEVwaXNvZGUnLHRoaXMudGl0bGVTdHlsZSk7XG4gICAgICAgIHRoaXMudGl0bGUuYW5jaG9yLnNldFRvKDAuNSwwLjUpO1xuICAgICAgICB0aGlzLnRpdGxlLnNldFNoYWRvdygyLDIpO1xuXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy50aXRsZSk7XG5cbiAgICAgICAgbGV0IGVwQXJyYXkgPSBUb29scy5nZXREYXRhKCdwbGF5ZWRfZXAnKTtcbiAgICAgICAgaWYoZXBBcnJheSl7XG4gICAgICAgICAgZm9yKGxldCBrPTAseXBvcz0yNDA7IGs8ZXBBcnJheS5sZW5ndGg7IGsrKyx5cG9zKz01Mil7XG4gICAgICAgICAgICBsZXQgZXBkZXNjID0gdGhpcy5nYW1lLmNhY2hlLmdldEpTT04oJ2NvbmZpZycpLnBvcHVwLmVwaXNvZGVzW2VwQXJyYXlba11dO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5YSBcIitlcGRlc2MpO1xuICAgICAgICAgICAgbGV0IGRhdGF0eHQgPSBuZXcgUGhhc2VyLlRleHQoZ2FtZSwzNDAseXBvcyxlcEFycmF5W2tdKycuICcrZXBkZXNjLHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoZGF0YXR4dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNley8vc3RpbGwgc2hvdyBlcDFcbiAgICAgICAgICAvL3Nob3cgbm90aGluZ1xuICAgICAgICAgIC8vbGV0IGVwZGVzYyA9IHRoaXMuZ2FtZS5jYWNoZS5nZXRKU09OKCdjb25maWcnKS5wb3B1cC5lcGlzb2Rlcy5lcDE7XG4gICAgICAgICAgLy9sZXQgZGF0YXR4dCA9IG5ldyBQaGFzZXIuVGV4dChnYW1lLDM0MCwyNDUsJ2VwMS4gJytlcGRlc2MsdGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIC8vdGhpcy5hZGRDaGlsZChkYXRhdHh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiYWNrID0gbmV3IFBoYXNlci5UZXh0KGdhbWUsMzQwLDU2MCwnQmFjaycsdGhpcy5kZWZhdWx0U3R5bGUpO1xuXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoYmFjayk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbkFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgZm9yKGxldCBpPTE7IGk8dGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykgdGhpcy5zZWxlY3Rpb25BcnJheS5wdXNoKHRoaXMuY2hpbGRyZW5baV0pO1xuXG4gICAgaWYodGhpcy5wYW5lbHR5cGU9PSc0Jyl7Ly9xdWljayBoYWNrIHRvIG1ha2UgdGhlIHNlbGVjdGlvbiBjb3JyZWN0IGZvciAnY29udGludWUnXG4gICAgICB0aGlzLmN1cnNvck1vdmVkKFBoYXNlci5LZXlDb2RlLlVQKTtcbiAgICAgIHRoaXMuY3Vyc29yTW92ZWQoUGhhc2VyLktleUNvZGUuVVApO1xuICAgIH1cblxuICAgIC8vdGhpcy5zZWxlY3Rpb25BcnJheSA9IG5ldyBBcnJheSh0aGlzLm11c2ljLHRoaXMuc291bmQsdGhpcy5rZXlib2FyZCx0aGlzLmNyZWRpdHMsdGhpcy5iYWNrKTtcbiAgICAvL3NlbGVjdCBmaXJzdCBlbGVtZW50XG5cbiAgICAvL21lbnUgc291bmQgZWZmZWN0XG4gICAgdGhpcy5zZnggPSB0aGlzLmdhbWUuYWRkLmF1ZGlvU3ByaXRlKCdzZngnKTtcblxuICB9XG5cbiAgc2V0VGl0bGUodGl0bGUpe1xuICAgIHRoaXMudGl0bGUuc2V0VGV4dCh0aXRsZSk7XG4gIH1cblxuICBzZXREZXNjcmlwdGlvbih0ZXh0LHlfb2Zmc2V0KXtcbiAgICB0aGlzLmRlc2NyaXB0aW9uLnNldFRleHQodGV4dCk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbi55ICs9IHlfb2Zmc2V0O1xuICB9XG5cbiAgYWRkSW1hZ2UoaW1hZ2Upe1xuICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2UpO1xuICB9XG5cbiAgY3Vyc29yTW92ZWQoa2V5KXtcbiAgICBpZihrZXk9PT1QaGFzZXIuS2V5Q29kZS5VUCl7XG4gICAgICAvL3BvcCB0aGVuIHVuc2hpZnRcbiAgICAgIHRoaXMuc2VsZWN0aW9uQXJyYXkudW5zaGlmdCh0aGlzLnNlbGVjdGlvbkFycmF5LnBvcCgpKTtcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuc2VsZWN0aW9uQXJyYXlbMF0pO1xuXG4gICAgfWVsc2UgaWYoa2V5PT09UGhhc2VyLktleUNvZGUuRE9XTil7XG4gICAgICAvL3NoaWZ0IHRoZW4gcHVzaFxuICAgICAgdGhpcy5zZWxlY3Rpb25BcnJheS5wdXNoKHRoaXMuc2VsZWN0aW9uQXJyYXkuc2hpZnQoKSk7XG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLnNlbGVjdGlvbkFycmF5WzBdKTtcbiAgICB9XG4gICAgdGhpcy5zZngucGxheSgnbWVudXNlbGVjdCcpO1xuXG4gIH1cblxuICBvcHRpb25FbnRlcmVkKCl7XG4gICAgbGV0IHNlbGVjdGVkdGV4dCA9IHRoaXMuc2VsZWN0aW9uQXJyYXlbMF0udGV4dFxuICAgIHN3aXRjaChzZWxlY3RlZHRleHQpe1xuICAgICAgY2FzZSAnTXV0ZSBNdXNpYyc6XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQXJyYXlbMF0uc2V0VGV4dCgnUGxheSBNdXNpYycpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdXRlIFNvdW5kJzpcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25BcnJheVswXS5zZXRUZXh0KCdQbGF5IFNvdW5kJyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BsYXkgTXVzaWMnOlxuICAgICAgICB0aGlzLnNlbGVjdGlvbkFycmF5WzBdLnNldFRleHQoJ011dGUgTXVzaWMnKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGxheSBTb3VuZCc6XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQXJyYXlbMF0uc2V0VGV4dCgnTXV0ZSBTb3VuZCcpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhbmVsdHlwZT09MykgcmV0dXJuICdHb3QgaXQhJztcbiAgICBlbHNlIHJldHVybiBzZWxlY3RlZHRleHQ7XG4gIH1cblxuICBzZWxlY3QodGV4dE9iail7XG4gICAgLy9yZXNldCBldmVyeXRoaW5nXG4gICAgdGhpcy5zZWxlY3Rpb25BcnJheS5mb3JFYWNoKCh0ZXh0T2JqKT0+e1xuICAgICAgdGhpcy5yZXNldCh0ZXh0T2JqKTtcbiAgICB9KTtcbiAgICB0aGlzLmhpZ2hsaWdodCh0ZXh0T2JqKTtcbiAgfVxuXG4gIGhpZ2hsaWdodCh0ZXh0T2JqKXtcbiAgICB0ZXh0T2JqLnNldFN0eWxlKHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuICAgIHRleHRPYmouc2V0U2hhZG93KDIsMiwnIzlhNzUzYScsMC41KTtcbiAgfVxuXG4gIHJlc2V0KHRleHRPYmope1xuICAgIHRleHRPYmouc2V0U3R5bGUodGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgIHRleHRPYmouc2V0U2hhZG93KCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9jb21wb25lbnRzL1Rvb2xzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdEJvc3MgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xuICBjb25zdHJ1Y3RvcihnYW1lLHgseSxrZXksZnJhbWUpe1xuICAgIHN1cGVyKGdhbWUseCx5LGtleSxmcmFtZSk7XG4gICAgdGhpcy5hY3Rpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWRkKCdhY3Rpb24nLFsnYm9keWYxJywnYm9keWYyJ10sNCxmYWxzZSxmYWxzZSk7XG4gICAgZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzLGZhbHNlKTsvL2RlYnVnIGlzIHRydWVcbiAgICB0aGlzLmJvZHkuY2xlYXJTaGFwZXMoKTtcbiAgICB0aGlzLmJvZHkubG9hZFBvbHlnb24oJ2Jvc3Nib2R5JywnYm9zc2JvZHknKTtcbiAgICBUb29scy5jb252ZXJ0VGlsZUNvb3JUb1AyKHgseSx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LHRoaXMuYm9keSk7XG4gICAgLy90aGlzLmFuY2hvci5zZXRUbygwLjUsMC41KTsvL2l0IGlzIGJldHRlciB0byBhZGp1c3QgYnkgYW5jaG9yIHJhdGhlciB0aGFuIHVzaW5nIG9mZnNldCBhYm92ZSBjb3ogdGhlIGJvZHkgd2lsbCBzaW5rXG4gICAgdGhpcy5ib2R5LmZpeGVkUm90YXRpb24gPSB0cnVlO1xuICAgIC8vdGhpcy5ib2R5LmtpbmVtYXRpYyA9IHRydWU7XG4gICAgdGhpcy5ib2R5Lm1hc3MgPSAxMDA7Ly9hbmNob3IgdGhpcyBkeW5hbWljIGJvZHkgdG8gZ3JvdW5kXG5cbiAgICB0aGlzLmRldGVjdGlvbnJhbmdlID0gMjIwO1xuICAgIHRoaXMuZGFtYWdlVGltZXIgPSAwO1xuICAgIHRoaXMuaGVhbHRoID0ge1xuICAgICAgbWF4OiA4MCxcbiAgICAgIG5vdzogODBcbiAgICB9O1xuXG4gICAgdGhpcy5hdHRhY2sgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXJ0c2NlbmUgPSBmYWxzZTtcbiAgICB0aGlzLmF0dGFja1RpbWVyID0gMDtcblxuICAgIHRoaXMuYm9zc3RleHQgPSBnYW1lLmFkZC50ZXh0KHRoaXMueCx0aGlzLnksXCIgXCIse1xuICAgICAgZm9udDonMTdweCBDZW50dXJ5JyxmaWxsOicjZmZmZmZmJ1xuICAgIH0pO1xuICAgIHRoaXMuYm9zc3RleHQuYW5jaG9yLnNldFRvKDAuNSwwLjUpO1xuICAgIHRoaXMuYm9zc3RleHQua2lsbCgpO1xuXG4gICAgLy9hZGQgYXJtXG5cbiAgICB0aGlzLnJpZ2h0YXJtID0gZ2FtZS5hZGQuc3ByaXRlKHRoaXMueCx0aGlzLnksa2V5LCdyaWdodGFybScpO1xuICAgIHRoaXMucmlnaHRhcm0ubmFtZSA9ICdyaWdodGFybSc7XG4gICAgZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzLnJpZ2h0YXJtLGZhbHNlKTtcbiAgICB0aGlzLnJpZ2h0YXJtLmJvZHkuY2xlYXJTaGFwZXMoKTtcbiAgICB0aGlzLnJpZ2h0YXJtLmJvZHkubG9hZFBvbHlnb24oJ3JpZ2h0YXJtJywncmlnaHRhcm0nKTtcbiAgICB0aGlzLnJpZ2h0YXJtLmJvZHkuZGF0YS5ncmF2aXR5U2NhbGUgPSAwLjg7XG4gICAgdGhpcy5ib3NzY29uc3RyYWludCA9IGdhbWUucGh5c2ljcy5wMi5jcmVhdGVSZXZvbHV0ZUNvbnN0cmFpbnQodGhpcywgWyAwICwgLTUwIF0sIHRoaXMucmlnaHRhcm0sIFsgNjAwLCAtMTY1IF0sMzAwMCk7XG5cbiAgICB0aGlzLnJpZ2h0YXJtLmJvZHkub25CZWdpbkNvbnRhY3QuYWRkKHRoaXMuc2hha2UsdGhpcyk7XG5cbiAgICAvL2RhbWFnZSBhbmltYXRpb25cbiAgICB0aGlzLmZsYXNoUmVkRWZmZWN0ID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKSAvL2JsaW5rIGJsaW5rIHdoZW4gaGl0XG4gICAgICAgIC50byh7dGludDoweEZGMDAwMH0sNTAsUGhhc2VyLkVhc2luZy5Cb3VuY2Uub3V0KVxuICAgICAgICAudG8oe3RpbnQ6MHhGQjg5ODl9LDUwLFBoYXNlci5FYXNpbmcuQm91bmNlLm91dClcbiAgICAgICAgLnRvKHt0aW50OjB4RkZGRkZGfSwxNTAsUGhhc2VyLkVhc2luZy5DaXJjdWxhci5vdXQpO1xuXG5cbiAgICB0aGlzLmhlYXJ0QmVhdCA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZShmYWxzZSk7XG4gICAgdGhpcy5oZWFydEJlYXQubG9vcCg0MjAwLCB0aGlzLmhlYXJ0QmVhdENoZWNrLHRoaXMpO1xuICAgIHRoaXMuaGVhcnRCZWF0LnN0YXJ0KCk7XG5cbiAgICB0aGlzLmV2ZW50cy5vbktpbGxlZC5hZGQoKCk9PntcbiAgICAgIC8vcmVtb3ZlIHJvY2tcblxuICAgIH0sdGhpcyk7XG5cbiAgfVxuXG4gIHNoYWtlKGJvZHlBLGJvZHlCLHNoYXBlQSxzaGFwZUIsY29udGFjdEVxLHNmeCl7XG4gICAgaWYoYm9keUIpIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJib2R5QiBcIisgYm9keUIuaWQpO1xuICAgICAgaWYoYm9keUIuaWQgPT0gdGhpcy5wbGF5ZXIuYm9keS5pZCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9keSBwbGF5ZXJcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vdG91Y2hlZCBmbG9vci4gc2hha2UgaXQhXG4gICAgICB0aGlzLmdhbWUuY2FtZXJhLnNoYWtlKDAuMDMsNjAwLHRydWUsUGhhc2VyLkNhbWVyYS5TSEFLRV9WRVJUSUNBTCx0cnVlKTtcbiAgICAgIHRoaXMuc2Z4LnBsYXkoJ2Jvc3NoaXQnKTtcbiAgICB9XG4gIH1cblxuICBkYW1hZ2VSYXQoYW10LGludGVydmFsKXtcbiAgICAgIGlmKHRoaXMuaGVhbHRoLm5vdzw9MC41KXtcbiAgICAgICAgLy9zYXkgc29tZXRoaW5nP1xuXG4gICAgICAgIHRoaXMuc2F5KCdOb29vb09PT09vb09PT29PT09vb29vby4uLi4nKVxuXG4gICAgICAgIC8va2lsbCB0aGUgZ3V5XG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnAyLnJlbW92ZUNvbnN0cmFpbnQodGhpcy5ib3NzY29uc3RyYWludCk7XG4gICAgICAgIHRoaXMucmlnaHRhcm0ua2lsbCgpO1xuICAgICAgICB0aGlzLmtpbGwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZih0aGlzLmdhbWUudGltZS5ub3c+dGhpcy5kYW1hZ2VUaW1lcil7Ly9wbGF5ZXIgY2Fubm90IGtlZXAgdGFraW5nIGRhbWFnZSBldmVyeSB0aWNrIVxuICAgICAgICB0aGlzLmhlYWx0aC5ub3ctPWFtdDsvL3VzZSBpbnRlcmFsIGZ1bmN0aW9uLCB3aGljaCB3aWxsIGFjdGl2YXRlIHRoZSBraWxsIGlmIGhlYWx0aCA9IDA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmF0IGJvc3MgaGVhbHRoIFwiK3RoaXMuaGVhbHRoLm5vdyk7XG5cbiAgICAgICAgaWYoIXRoaXMuZmxhc2hSZWRFZmZlY3QuaXNSdW5uaW5nKXRoaXMuZmxhc2hSZWRFZmZlY3Quc3RhcnQoKTtcblxuICAgICAgICB0aGlzLmRhbWFnZVRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgaW50ZXJ2YWw7XG4gICAgICB9XG4gIH1cblxuXG4gIGhlYXJ0QmVhdENoZWNrKCl7XG4gICAgaWYodGhpcy5zdGFydHNjZW5lKXtcbiAgICAgaWYodGhpcy50ZXh0YXJyYXkpe1xuICAgICAgIGlmKHRoaXMudGV4dGNvdW50ZXI9PTQpe1xuICAgICAgICAgdGhpcy5zdGFydHNjZW5lID0gZmFsc2U7XG4gICAgICAgICByZXR1cm47XG4gICAgICAgfVxuICAgICAgIHRoaXMuc2F5KHRoaXMudGV4dGFycmF5W3RoaXMudGV4dGNvdW50ZXIrK10pO1xuICAgICB9ZWxzZXtcbiAgICAgICB0aGlzLnRleHRhcnJheSA9IE9iamVjdC52YWx1ZXModGhpcy5nYW1lLmNhY2hlLmdldEpTT04oJ2NvbmZpZycpLnBvcHVwLmVwNi5ib3NzdGV4dCk7XG4gICAgICAgdGhpcy50ZXh0Y291bnRlciA9IDA7XG4gICAgIH1cbiAgICB9XG5cbiAgICBpZih0aGlzLmF0dGFjayYmdGhpcy5hbGl2ZSl7XG4gICAgICAvL2xlZnQgc2lkZSBhdHRhY2tcbiAgICAgICAgLy90aGlzLnJpZ2h0YXJtLmJvZHkuYXBwbHlGb3JjZShbLTgwMCwxMDAwXSx0aGlzLnJpZ2h0YXJtLmJvZHkueC01MCx0aGlzLnJpZ2h0YXJtLmJvZHkueSk7XG4gICAgICAgIHRoaXMucmlnaHRhcm0uYm9keS5hcHBseUZvcmNlKFs0MDAwLDUwMDBdLHRoaXMucmlnaHRhcm0uYm9keS54KzUwLHRoaXMucmlnaHRhcm0uYm9keS55KTtcbiAgICB9XG4gIH1cblxuICBzYXkoc3BlZWNoKXtcblxuICAgICAgdGhpcy5ib3NzdGV4dC5zZXRUZXh0KHNwZWVjaCk7XG4gICAgICB0aGlzLmJvc3N0ZXh0LnJlc2V0KHRoaXMueC0yMCx0aGlzLnktMTcyKTtcbiAgICAgIHRoaXMuYm9zc3RleHQubGlmZXNwYW4gPSAzMDAwO1xuXG4gICAgICAvL2NvbnNvbGUubG9nKCd0ZXh0IGxvY2F0aW9uICcgKyB0aGlzLmJvc3N0ZXh0LnggKyAnICcrIHRoaXMuYm9zc3RleHQueSArICcgJysgdGhpcy54ICsgJyAnICsgdGhpcy55KTtcbiAgfVxuXG4gIHVwZGF0ZSgpe1xuXG5cbiAgICAvKlxuICAgIGlmKHRoaXMucGxheWVyLnggPCB0aGlzLngpe1xuICAgICAgdGhpcy5zY2FsZS54ID0gMTsvL2ZhY2UgdGhlIHBsYXllclxuICAgIH1cbiAgICBlbHNle1xuICAgICAgdGhpcy5zY2FsZS54ID0gLTE7XG4gICAgfSovXG5cbiAgICBsZXQgZGlzdEZyb21QbGF5ZXIgPSBQaGFzZXIuTWF0aC5kaXN0YW5jZSh0aGlzLngsdGhpcy55LHRoaXMucGxheWVyLngsdGhpcy5wbGF5ZXIueSk7Ly93aGVyZSBkb2VzIHRoZSB4IHkgc3RhcnRzLCBpcyBpdCBiYXNlZCBvbiB0aGUgYW5jaG9yP1xuICAgIGlmKHRoaXMuYWxpdmUmJk1hdGgucm91bmQoZGlzdEZyb21QbGF5ZXIpPHRoaXMuZGV0ZWN0aW9ucmFuZ2Upe1xuICAgICAgaWYodGhpcy5wbGF5ZXIueCA8IHRoaXMueCl7XG4gICAgICAgIC8vdG8gbGVmdFxuICAgICAgICB0aGlzLmJvZHkubW92ZUxlZnQoMjAwKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHRoaXMuYm9keS5tb3ZlUmlnaHQoMjAwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih0aGlzLmF0dGFjayYmIXRoaXMuYWN0aW9uLmlzUGxheWluZyYmdGhpcy5hbGl2ZSkgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdhY3Rpb24nLG51bGwsdHJ1ZSk7XG5cblxuICB9XG5cbn1cbiIsImltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRHcnVudCBleHRlbmRzIFBoYXNlci5TcHJpdGV7XG4gIGNvbnN0cnVjdG9yKGdhbWUseCx5LGtleSxmcmFtZSl7XG4gICAgc3VwZXIoZ2FtZSx4LHksa2V5LGZyYW1lKTtcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKCd3YWxrJyxQaGFzZXIuQW5pbWF0aW9uLmdlbmVyYXRlRnJhbWVOYW1lcygnZnJhbWUnLCAxLCA0LCAnJywgMCksNixmYWxzZSxmYWxzZSk7XG4gICAgdGhpcy5hdHRhY2tpbmcgPSB0aGlzLmFuaW1hdGlvbnMuYWRkKCdhdHRhY2snLFsnZnJhbWUwJywncmF0YXR0YWNrJ10sNCxmYWxzZSxmYWxzZSk7XG4gICAgdGhpcy5zcGVlZCA9IDIwMCArIGdhbWUucm5kLnBpY2soWy0yMCwrMjBdKTsvL25lZWQgdG8gZmxpcCB0aGUgaW1hZ2VzXG4gICAgdGhpcy5kZXRlY3Rpb25yYW5nZSA9IDE1MDtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5wMi5lbmFibGUodGhpcyxmYWxzZSk7Ly9kZWJ1ZyBpcyB0cnVlXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuYm9keS5jbGVhclNoYXBlcygpO1xuICAgIHRoaXMuYm9keS5zZXRSZWN0YW5nbGUodGhpcy53aWR0aCowLjQsTWF0aC5yb3VuZCh0aGlzLmhlaWdodCowLjkpLDAsMCk7Ly9zZXRSZWN0YW5nZSB3aWxsIGFwcGx5IHRoZSBzaGFwZSB3aXRoIGFuY2hvciB0byBtaWRkbGVcbiAgICAvL3Jlc2V0IHRoZSBib2R5IGxvY2F0aW9uIGFmdGVyIHNldFNoYXBlcyBtZXRob2QuLiAvL2lmIEkgZG9udCB3YW50IHRoZSBoYXNzbGUgb2Ygc2V0dGluZyBvZmZzZXRzXG4gICAgVG9vbHMuY29udmVydFRpbGVDb29yVG9QMih4LHksdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLmJvZHkpO1xuICAgIC8vYWRkIGEgbm9uIGNvbGxpZGluZyBzaGFwZSBvbiBpdHMgaGVhZCBhcyBiYXNlIHRvIGp1bXAgLSB3aXRoIG5vIGRhbWFnZSB0byBwbGF5ZXJcbiAgICB0aGlzLmJvZHkuYWRkUmVjdGFuZ2xlKDgwLDUsMCwtMTEwKTtcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjYsMC40NSk7Ly9pdCBpcyBiZXR0ZXIgdG8gYWRqdXN0IGJ5IGFuY2hvciByYXRoZXIgdGhhbiB1c2luZyBvZmZzZXQgYWJvdmUgY296IHRoZSBib2R5IHdpbGwgc2lua1xuICAgIHRoaXMuYm9keS5maXhlZFJvdGF0aW9uID0gdHJ1ZTtcbiAgICB0aGlzLmJvZHkuZGFtcGluZyA9IDAuNDtcblxuICAgIC8vYWRkIGEgdGltZXIgdG8gY2hlY2sgd2hldGhlciBpdHMgYmxvY2tlZCB1cG9uIGFuIG9ic3RhY2xlXG4gICAgdGhpcy5sYXN0UG9zaXRpb25YID0gdGhpcy54O1xuICAgIHRoaXMuc3R1bWJsZWRJbnRlcnZhbCA9IDEyMDA7XG4gICAgdGhpcy5zdHVtYmxlZENoZWNrZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoZmFsc2UpO1xuICAgIHRoaXMuc3R1bWJsZWRDaGVja2VyLmxvb3AodGhpcy5zdHVtYmxlZEludGVydmFsLCB0aGlzLnN0dW1ibGVkQ2hlY2ssdGhpcyk7XG4gICAgdGhpcy5zdHVtYmxlZENoZWNrZXIuc3RhcnQoKTtcbiAgICB0aGlzLnJldmVyc2VOb3cgPSBmYWxzZTtcblxuICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCd3YWxrJyxudWxsLHRydWUpO1xuXG4gICAgLy9zZXQgaGVhbHRoLWludGVybmFsIGJ1aWx0IGluIHBhcmFtc1xuICAgIHRoaXMuZGFtYWdlVGltZXIgPSAwO1xuICAgIHRoaXMuc2V0SGVhbHRoKDI0KTsvL2RlZmF1bHQgbWF4SGVhbHRoIGlzIDEwMFxuXG5cbiAgICAvL2RhbWFnZSBhbmltYXRpb25cbiAgICB0aGlzLmZsYXNoUmVkRWZmZWN0ID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKSAvL2JsaW5rIGJsaW5rIHdoZW4gaGl0XG4gICAgICAgIC50byh7dGludDoweEZGMDAwMH0sNTAsUGhhc2VyLkVhc2luZy5Cb3VuY2Uub3V0KVxuICAgICAgICAudG8oe3RpbnQ6MHhGQjg5ODl9LDUwLFBoYXNlci5FYXNpbmcuQm91bmNlLm91dClcbiAgICAgICAgLnRvKHt0aW50OjB4RkZGRkZGfSwxNTAsUGhhc2VyLkVhc2luZy5DaXJjdWxhci5vdXQpO1xuXG4gICAgICAgIC8vcG93ZXIgdXAgYW5pbWF0aW9uXG4gICAgdGhpcy5mbGFzaEdyZWVuRWZmZWN0ID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKSAvL2JsaW5rIGJsaW5rIHdoZW4gaGl0XG4gICAgICAgIC50byh7dGludDoweDAwRkYwMH0sNTAsUGhhc2VyLkVhc2luZy5Cb3VuY2Uub3V0KVxuICAgICAgICAudG8oe3RpbnQ6MHg4M2ZmODN9LDUwLFBoYXNlci5FYXNpbmcuQm91bmNlLm91dClcbiAgICAgICAgLnRvKHt0aW50OjB4RkZGRkZGfSwxNTAsUGhhc2VyLkVhc2luZy5DaXJjdWxhci5vdXQpO1xuXG4gICAgdGhpcy5ldmVudHMub25LaWxsZWQuYWRkKCgpPT57dGhpcy5hZnRlcktpbGxlZCgpO30sdGhpcyk7XG4gICAgdGhpcy5ldmVudHMub25SZXZpdmVkLmFkZCgoKT0+e3RoaXMuZmxhc2goJ2dyZWVuJyk7fSx0aGlzKTtcblxuICB9XG5cbiAgYWZ0ZXJLaWxsZWQoKXtcbiAgICB0aGlzLmdhbWUudGltZS5ldmVudHMuYWRkKDc4MDAsKCk9PntcbiAgICAgIHRoaXMucmV2aXZlKDI0KTtcbiAgICB9LHRoaXMuZ2FtZSk7XG4gIH1cblxuICBmbGFzaCh0aW50KXtcbiAgICBsZXQgZmxhc2hFZmZlY3QgPSB1bmRlZmluZWQ7XG4gICAgc3dpdGNoICh0aW50KXtcbiAgICAgIGNhc2UgJ3JlZCc6XG4gICAgICAgIGZsYXNoRWZmZWN0ID0gdGhpcy5mbGFzaFJlZEVmZmVjdDtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZ3JlZW4nOlxuICAgICAgICBmbGFzaEVmZmVjdCA9IHRoaXMuZmxhc2hHcmVlbkVmZmVjdDtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmKCFmbGFzaEVmZmVjdC5pc1J1bm5pbmcpZmxhc2hFZmZlY3Quc3RhcnQoKTtcbiAgfVxuXG4gIHN0dW1ibGVkQ2hlY2soKXtcbiAgICBpZighdGhpcy5hdHRhY2tpbmcuaXNQbGF5aW5nKXtcbiAgICAgIGlmKE1hdGguYWJzKHRoaXMueC10aGlzLmxhc3RQb3NpdGlvblgpPjIwKXtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb25YID0gdGhpcy54O1xuICAgICAgfWVsc2V7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJoZWxwIHJhdCBpcyBzdHVja2VkXCIpO1xuICAgICAgICB0aGlzLnJldmVyc2VOb3cgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRhbWFnZVJhdChhbXQsaW50ZXJ2YWwpe1xuICAgICAgaWYodGhpcy5oZWFsdGg8PTAuNSlyZXR1cm47XG5cbiAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdz50aGlzLmRhbWFnZVRpbWVyKXsvL3BsYXllciBjYW5ub3Qga2VlcCB0YWtpbmcgZGFtYWdlIGV2ZXJ5IHRpY2shXG4gICAgICAgIHRoaXMuZGFtYWdlKGFtdCk7Ly91c2UgaW50ZXJhbCBmdW5jdGlvbiwgd2hpY2ggd2lsbCBhY3RpdmF0ZSB0aGUga2lsbCBpZiBoZWFsdGggPSAwO1xuICAgICAgICBjb25zb2xlLmxvZyhcInJhdCBoZWFsdGggXCIrdGhpcy5oZWFsdGgpO1xuXG4gICAgICAgIHRoaXMuZmxhc2goJ3JlZCcpO1xuXG4gICAgICAgIHRoaXMuZGFtYWdlVGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKyBpbnRlcnZhbDtcbiAgICAgIH1cbiAgfVxuXG4gIGF0dGFjayhkaXN0RnJvbVBsYXllcil7XG4gICAgaWYoIXRoaXMuYXR0YWNraW5nLmlzUGxheWluZyYmdGhpcy5hbGl2ZSl0aGlzLnNmeC5wbGF5KHRoaXMuZ2FtZS5ybmQucGljayhbJ21uc3RyNycsJ21uc3RyOCcsJ21uc3RyOSddKSk7XG4gICAgaWYodGhpcy5wbGF5ZXIueCA8IHRoaXMueCkgdGhpcy5zY2FsZS54ID0gLTE7Ly9mYWNlIHRoZSBwbGF5ZXJcbiAgICBlbHNlIHRoaXMuc2NhbGUueCA9IDE7XG4gICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2F0dGFjaycpO1xuICB9XG5cbiAgdXBkYXRlKCl7XG4gICAgaWYodGhpcy5wYXVzZWQpIHJldHVybjtcbiAgICBsZXQgZGlzdEZyb21QbGF5ZXIgPSBQaGFzZXIuTWF0aC5kaXN0YW5jZSh0aGlzLngsdGhpcy55LHRoaXMucGxheWVyLngsdGhpcy5wbGF5ZXIueSk7Ly93aGVyZSBkb2VzIHRoZSB4IHkgc3RhcnRzLCBpcyBpdCBiYXNlZCBvbiB0aGUgYW5jaG9yP1xuICAgIGlmKE1hdGgucm91bmQoZGlzdEZyb21QbGF5ZXIpPHRoaXMuZGV0ZWN0aW9ucmFuZ2Upe1xuICAgICAgdGhpcy5hdHRhY2soZGlzdEZyb21QbGF5ZXIpO1xuICAgIH1cblxuICAgIGlmKCF0aGlzLmF0dGFja2luZy5pc1BsYXlpbmcpe1xuICAgICAgICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KCd3YWxrJyxudWxsLHRydWUpO1xuXG4gICAgICAgIC8vaWYgc3R1bWJsZWQgdXBvbiBhbiBvYnN0YWNsZVxuICAgICAgICBpZih0aGlzLnJldmVyc2VOb3cpe1xuICAgICAgICAgIHRoaXMuc3BlZWQgKj0gLTE7XG4gICAgICAgICAgdGhpcy5zY2FsZS54ID0gKHRoaXMuc3BlZWQ+MCk/MTotMTtcbiAgICAgICAgICB0aGlzLnJldmVyc2VOb3cgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NhbGUueCA9ICh0aGlzLnNwZWVkPjApPzE6LTE7XG4gICAgfVxuXG4gIH1cblxuXG59XG4iLCJpbXBvcnQgVG9vbHMgZnJvbSBcIi4uL2NvbXBvbmVudHMvVG9vbHMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF0TmluamEgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xuICBjb25zdHJ1Y3RvcihnYW1lLHgseSxrZXksZnJhbWUpe1xuICAgIHN1cGVyKGdhbWUseCx5LGtleSxmcmFtZSk7XG4gICAgdGhpcy50aHJvd2luZyA9IHRoaXMuYW5pbWF0aW9ucy5hZGQoJ3Rocm93JyxbJ3Rocm93ZnJhbWUxJywndGhyb3dmcmFtZTInLCd0aHJvd2ZyYW1lMyddLDEyLGZhbHNlLGZhbHNlKTtcblxuICAgIHRoaXMuZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzLGZhbHNlKTsvL2RlYnVnIGlzIHRydWVcblxuICAgIHRoaXMuYm9keS5jbGVhclNoYXBlcygpO1xuICAgIHRoaXMuYm9keS5zZXRSZWN0YW5nbGUodGhpcy53aWR0aCowLjQsTWF0aC5yb3VuZCh0aGlzLmhlaWdodCowLjgpLDAsMCk7Ly9zZXRSZWN0YW5nZSB3aWxsIGFwcGx5IHRoZSBzaGFwZSB3aXRoIGFuY2hvciB0byBtaWRkbGVcbiAgICAvL3Jlc2V0IHRoZSBib2R5IGxvY2F0aW9uIGFmdGVyIHNldFNoYXBlcyBtZXRob2QuLiAvL2lmIEkgZG9udCB3YW50IHRoZSBoYXNzbGUgb2Ygc2V0dGluZyBvZmZzZXRzXG4gICAgVG9vbHMuY29udmVydFRpbGVDb29yVG9QMih4LHksdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLmJvZHkpO1xuICAgIC8vYWRkIGEgbm9uIGNvbGxpZGluZyBzaGFwZSBvbiBpdHMgaGVhZCBhcyBiYXNlIHRvIGp1bXAgLSB3aXRoIG5vIGRhbWFnZSB0byBwbGF5ZXJcbiAgICB0aGlzLmJvZHkuYWRkUmVjdGFuZ2xlKDgwLDUsMCwtMTAwKTtcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjYsMC40NSk7Ly9pdCBpcyBiZXR0ZXIgdG8gYWRqdXN0IGJ5IGFuY2hvciByYXRoZXIgdGhhbiB1c2luZyBvZmZzZXQgYWJvdmUgY296IHRoZSBib2R5IHdpbGwgc2lua1xuICAgIHRoaXMuYm9keS5maXhlZFJvdGF0aW9uID0gdHJ1ZTtcblxuICAgIHRoaXMuZGV0ZWN0aW9ucmFuZ2UgPSA1MDA7XG4gICAgLy9zZXQgaGVhbHRoLWludGVybmFsIGJ1aWx0IGluIHBhcmFtc1xuICAgIHRoaXMuZGFtYWdlVGltZXIgPSAwO1xuICAgIHRoaXMudGhyb3dUaW1lciA9IDA7XG4gICAgdGhpcy50aHJvd0ludGVydmFsID0gMjQwMDtcbiAgICB0aGlzLnNldEhlYWx0aCg0MCk7Ly9kZWZhdWx0IG1heEhlYWx0aCBpcyAxMDBcblxuICAgIC8vYWRkIHNodXJpa2Vuc1xuICAgIHRoaXMuc2h1cmlrZW5zID0gdGhpcy5nYW1lLmFkZC5ncm91cCh0aGlzLmdhbWUud29ybGQsJ25pbmphc2h1cmlrZW5zJyxmYWxzZSx0cnVlLDEpO1xuICAgIHRoaXMuc2h1cmlrZW5zLmNyZWF0ZU11bHRpcGxlKDEwLGtleSwnczEnKTtcblxuICAgIHRoaXMuc2h1cmlrZW5zLmZvckVhY2goKHNodXJpa2VuKT0+e1xuICAgICAgc2h1cmlrZW4uYm9keS5jbGVhclNoYXBlcygpO1xuICAgICAgc2h1cmlrZW4uYm9keS5zZXRDaXJjbGUoc2h1cmlrZW4ud2lkdGgvMik7XG4gICAgICBzaHVyaWtlbi5hbmltYXRpb25zLmFkZCgnZmx5JyxQaGFzZXIuQW5pbWF0aW9uLmdlbmVyYXRlRnJhbWVOYW1lcygncycsIDEsIDMsICcnLCAwKSwyNSx0cnVlLGZhbHNlKTtcbiAgICAgIHNodXJpa2VuLmJvZHkua2luZW1hdGljID0gdHJ1ZTtcbiAgICAgIHNodXJpa2VuLmJvZHkuZGFtcGluZyA9IDAuMjtcbiAgICAgIC8vc2h1cmlrZW4uYm9keS5kZWJ1Zz10cnVlO1xuICAgIH0sdGhpcy5nYW1lLndvcmxkKTtcblxuICAgIC8vZGFtYWdlIGFuaW1hdGlvblxuICAgIHRoaXMuZmxhc2hSZWRFZmZlY3QgPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpIC8vYmxpbmsgYmxpbmsgd2hlbiBoaXRcbiAgICAgICAgLnRvKHt0aW50OjB4RkYwMDAwfSw1MCxQaGFzZXIuRWFzaW5nLkJvdW5jZS5vdXQpXG4gICAgICAgIC50byh7dGludDoweEZCODk4OX0sNTAsUGhhc2VyLkVhc2luZy5Cb3VuY2Uub3V0KVxuICAgICAgICAudG8oe3RpbnQ6MHhGRkZGRkZ9LDE1MCxQaGFzZXIuRWFzaW5nLkNpcmN1bGFyLm91dCk7XG5cbiAgICAgICAgLy9wb3dlciB1cCBhbmltYXRpb25cbiAgICB0aGlzLmZsYXNoR3JlZW5FZmZlY3QgPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpIC8vYmxpbmsgYmxpbmsgd2hlbiBoaXRcbiAgICAgICAgLnRvKHt0aW50OjB4MDBGRjAwfSw1MCxQaGFzZXIuRWFzaW5nLkJvdW5jZS5vdXQpXG4gICAgICAgIC50byh7dGludDoweDgzZmY4M30sNTAsUGhhc2VyLkVhc2luZy5Cb3VuY2Uub3V0KVxuICAgICAgICAudG8oe3RpbnQ6MHhGRkZGRkZ9LDE1MCxQaGFzZXIuRWFzaW5nLkNpcmN1bGFyLm91dCk7XG5cbiAgICB0aGlzLmV2ZW50cy5vbktpbGxlZC5hZGQoKCk9Pnt0aGlzLmFmdGVyS2lsbGVkKCk7fSx0aGlzKTtcbiAgICB0aGlzLmV2ZW50cy5vblJldml2ZWQuYWRkKCgpPT57dGhpcy5mbGFzaCgnZ3JlZW4nKTt9LHRoaXMpO1xuXG4gIH1cblxuICBhZnRlcktpbGxlZCgpe1xuICAgIHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5hZGQoNzgwMCwoKT0+e1xuICAgICAgdGhpcy5yZXZpdmUoNDApO1xuICAgIH0sdGhpcy5nYW1lKTtcbiAgfVxuXG4gIGZsYXNoKHRpbnQpe1xuICAgIGxldCBmbGFzaEVmZmVjdCA9IHVuZGVmaW5lZDtcbiAgICBzd2l0Y2ggKHRpbnQpe1xuICAgICAgY2FzZSAncmVkJzpcbiAgICAgICAgZmxhc2hFZmZlY3QgPSB0aGlzLmZsYXNoUmVkRWZmZWN0O1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdncmVlbic6XG4gICAgICAgIGZsYXNoRWZmZWN0ID0gdGhpcy5mbGFzaEdyZWVuRWZmZWN0O1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYoIWZsYXNoRWZmZWN0LmlzUnVubmluZylmbGFzaEVmZmVjdC5zdGFydCgpO1xuICB9XG5cbiAgZGFtYWdlUmF0KGFtdCxpbnRlcnZhbCl7XG4gICAgICBpZih0aGlzLmhlYWx0aDw9MC41KXJldHVybjtcblxuICAgICAgaWYodGhpcy5nYW1lLnRpbWUubm93PnRoaXMuZGFtYWdlVGltZXIpey8vcGxheWVyIGNhbm5vdCBrZWVwIHRha2luZyBkYW1hZ2UgZXZlcnkgdGljayFcbiAgICAgICAgdGhpcy5kYW1hZ2UoYW10KTsvL3VzZSBpbnRlcmFsIGZ1bmN0aW9uLCB3aGljaCB3aWxsIGFjdGl2YXRlIHRoZSBraWxsIGlmIGhlYWx0aCA9IDA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmF0IG5pbmphIGhlYWx0aCBcIit0aGlzLmhlYWx0aCk7XG4gICAgICAgIHRoaXMuZmxhc2goJ3JlZCcpO1xuXG4gICAgICAgIHRoaXMuZGFtYWdlVGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKyBpbnRlcnZhbDtcbiAgICAgIH1cbiAgfVxuXG4gIHRocm93U3RhcnMoKXtcbiAgICB0aGlzLmFuaW1hdGlvbnMucGxheSgndGhyb3cnKTtcbiAgICBsZXQgZmFjZURpciA9IHRoaXMuc2NhbGUueDtcbiAgICBsZXQgc2h1cmlrZW4gPSB0aGlzLnNodXJpa2Vucy5nZXRGaXJzdERlYWQoZmFsc2UsdGhpcy54K2ZhY2VEaXIqNTAsdGhpcy55KzE1KTtcbiAgICBpZihzaHVyaWtlbil7XG4gICAgICBzaHVyaWtlbi5saWZlc3BhbiA9IDI1MDA7XG4gICAgICBzaHVyaWtlbi5ib2R5LnZlbG9jaXR5LnggPSBmYWNlRGlyICogMzIwO1xuICAgICAgc2h1cmlrZW4uYW5pbWF0aW9ucy5wbGF5KCdmbHknKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKXtcbiAgICBpZih0aGlzLnBhdXNlZCkgcmV0dXJuO1xuICAgIGxldCBkaXN0RnJvbVBsYXllciA9IFBoYXNlci5NYXRoLmRpc3RhbmNlKHRoaXMueCx0aGlzLnksdGhpcy5wbGF5ZXIueCx0aGlzLnBsYXllci55KTtcbiAgICBpZihNYXRoLnJvdW5kKGRpc3RGcm9tUGxheWVyKTx0aGlzLmRldGVjdGlvbnJhbmdlKXtcbiAgICAgIGlmKHRoaXMucGxheWVyLnggPCB0aGlzLngpIHRoaXMuc2NhbGUueCA9IC0xOy8vZmFjZSB0aGUgcGxheWVyXG4gICAgICBlbHNlIHRoaXMuc2NhbGUueCA9IDE7XG5cbiAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdz50aGlzLnRocm93VGltZXImJnRoaXMuYWxpdmUpe1xuICAgICAgICB0aGlzLnRocm93U3RhcnMoKTtcbiAgICAgICAgdGhpcy50aHJvd1RpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgdGhpcy50aHJvd0ludGVydmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCF0aGlzLnRocm93aW5nLmlzUGxheWluZyl7XG4gICAgICB0aGlzLmZyYW1lTmFtZSA9ICd0aHJvd2ZyYW1lMSc7XG5cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBSYXRHcnVudCBmcm9tIFwiLi9SYXRHcnVudC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRTb2xkaWVyIGV4dGVuZHMgUmF0R3J1bnR7XG4gIGNvbnN0cnVjdG9yKGdhbWUseCx5LGtleSxmcmFtZSl7XG4gICAgc3VwZXIoZ2FtZSx4LHksa2V5LGZyYW1lKTtcbiAgICB0aGlzLmF0dGFja2luZyA9IHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2F0dGFjaycsWydoaXRmcmFtZTAnLCdoaXRmcmFtZTEnLCdoaXRmcmFtZTInLCdoaXRmcmFtZTMnXSwyLjUsZmFsc2UsZmFsc2UpO1xuICAgIHRoaXMuZGV0ZWN0aW9ucmFuZ2UgPSAyNjA7XG4gICAgdGhpcy5oaXRyYW5nZSA9IDE1MDtcbiAgICB0aGlzLmhpdHNwZWVkID0gMTQwOy8vc2xvd2VyIGhpdCBhcHByb2NoIHZlbG9jaXR5XG4gICAgdGhpcy5oaXRpbnRlcnZhbCA9IDEyMDA7XG4gICAgdGhpcy5oaXR0aW1lciA9IDA7XG4gICAgLy9zZXQgaGVhbHRoLWludGVybmFsIGJ1aWx0IGluIHBhcmFtc1xuICAgIHRoaXMuc2V0SGVhbHRoKDQwKTsvL2RlZmF1bHQgbWF4SGVhbHRoIGlzIDEwMFxuXG4gICAgdGhpcy5oaXRib3gxID0gdGhpcy5hZGRDaGlsZChnYW1lLm1ha2Uuc3ByaXRlKHRoaXMueCx0aGlzLnksJ29iamVjdHMxJywnc3RvcCcpKTtcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5wMi5lbmFibGUodGhpcy5oaXRib3gxLGZhbHNlKTsvL2RlYnVnIGlzIGZhbHNlXG4gICAgdGhpcy5oaXRib3gxLmJvZHkua2luZW1hdGljID0gdHJ1ZTtcbiAgICB0aGlzLmhpdGJveDEubmFtZSA9ICdzb2xkaWVyY2x1Yic7XG4gICAgdGhpcy5oaXRib3gxLmFscGhhID0gMDtcbiAgICB0aGlzLmhpdGJveDEua2lsbCgpO1xuXG4gIH1cblxuICBhZnRlcktpbGxlZCgpe1xuICAgIC8vd2hlbiBhIHJhdCBpdHMgZGVhZCwgaXRzIGdvbmUgLSBhbnkgaGl0Ym94IHNob3VsZCBiZSBraWxsZWQgdG9vXG4gICAgdGhpcy5oaXRib3gxLmtpbGwoKVxuICAgIHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5hZGQoNzIwMCwoKT0+e1xuICAgICAgdGhpcy5yZXZpdmUoNDApO1xuICAgICAgdGhpcy5oaXRib3gxLnJldml2ZSgpO1xuICAgIH0sdGhpcy5nYW1lKTtcbiAgfVxuXG4gIGF0dGFjayhkaXN0RnJvbVBsYXllcil7XG4gICAgaWYodGhpcy5wbGF5ZXIueCA8IHRoaXMueCl7XG4gICAgICB0aGlzLnNjYWxlLnggPSAtMTsvL2ZhY2UgdGhlIHBsYXllclxuICAgIH1cbiAgICBlbHNle1xuICAgICAgdGhpcy5zY2FsZS54ID0gMTtcbiAgICB9XG4gICAgbGV0IGZhY2VEaXIgPSB0aGlzLnNjYWxlLng7XG4gICAgaWYoTWF0aC5yb3VuZChkaXN0RnJvbVBsYXllcik+MTYwKSB0aGlzLmJvZHkudmVsb2NpdHkueCA9IGZhY2VEaXIqdGhpcy5oaXRzcGVlZDsvL2tlZXAgcHVzaGluZyBuIGhpdHRpbmcgdGhlIHBsYXllclxuICAgIGlmKCF0aGlzLmhpdGJveDEuZXhpc3RzKXsvL3RoZXJlIHNob3VsZCBiZSBhIERFTEFZIGJldHdlZW4gaGl0dGluZyBwbGF5ZXIuLlxuICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoJ2F0dGFjaycpOy8vbmVlZCB0byBzeW5jIHRoZSBhbmltYXRpb24gYWN0aW9uIGFuZCB0aGUgaGl0IHRpbWVyXG4gICAgICBpZih0aGlzLmdhbWUudGltZS5ub3c+dGhpcy5oaXR0aW1lciYmdGhpcy5hbGl2ZSl7XG4gICAgICAgIHRoaXMuaGl0Ym94MS5yZXNldCh0aGlzLngrZmFjZURpcioxMCx0aGlzLnkrMzApO1xuICAgICAgICB0aGlzLmhpdGJveDEuYm9keS52ZWxvY2l0eS54ID0gZmFjZURpciAqIDE1MDtcbiAgICAgICAgdGhpcy5oaXRib3gxLmxpZmVzcGFuID0gNjAwO1xuICAgICAgICB0aGlzLmhpdHRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgdGhpcy5oaXRpbnRlcnZhbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZSgpe1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgaWYoIXRoaXMuYXR0YWNraW5nLmlzUGxheWluZyYmdGhpcy5oaXRib3gxLmV4aXN0cyl7XG4gICAgICB0aGlzLmhpdGJveDEua2lsbCgpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2h1cmlrZW5IVUQgZXh0ZW5kcyBQaGFzZXIuR3JvdXB7XG4gIGNvbnN0cnVjdG9yKGdhbWUseHBvcyx5cG9zKXtcbiAgICBzdXBlcihnYW1lKTtcblxuICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICBmb250Oidib2xkIDIwcHggQ2VudHVyeScsZmlsbDonI2Y2ZjZkZSdcbiAgICB9XG5cbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLmhvbGRlciA9IHRoaXMuY3JlYXRlKHhwb3MseXBvcywnb2JqZWN0czQnLCdzaHVyaWtlbnMnKTtcbiAgICB0aGlzLmNvdW50dGV4dCA9IHRoaXMuYWRkKG5ldyBQaGFzZXIuVGV4dChnYW1lLHhwb3MrNzAseXBvcysxMiwneCAnK3RoaXMuY291bnQsdGhpcy5zdHlsZSkpO1xuXG4gICAgdGhpcy5ob2xkZXIuYWxwaGEgPSAwO1xuICAgIHRoaXMuY291bnR0ZXh0LmFscGhhID0gMDtcblxuICAgIHRoaXMuZml4ZWRUb0NhbWVyYSA9IHRydWU7XG5cbiAgfVxuXG4gIGluY3JlYXNlQ291bnQodmFsKXtcbiAgICBpZih0aGlzLmhvbGRlci5hbHBoYT09MCl0aGlzLmhvbGRlci5hbHBoYSA9IDE7XG4gICAgaWYodGhpcy5jb3VudHRleHQuYWxwaGE9PTApdGhpcy5jb3VudHRleHQuYWxwaGEgPSAxO1xuICAgIHRoaXMuY291bnQgKz0gdmFsO1xuICAgIHRoaXMuY291bnR0ZXh0LnNldFRleHQoJ3ggJyt0aGlzLmNvdW50KTtcbiAgfVxuXG4gIGRlY3JlYXNlQ291bnQodmFsKXtcbiAgICB0aGlzLmNvdW50IC09IHZhbDtcbiAgICB0aGlzLmNvdW50dGV4dC5zZXRUZXh0KCd4ICcrdGhpcy5jb3VudCk7XG4gICAgaWYodGhpcy5jb3VudDwxKXtcbiAgICAgIHRoaXMuaG9sZGVyLmFscGhhID0gMDtcbiAgICAgIHRoaXMuY291bnR0ZXh0LmFscGhhID0gMDtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9jb21wb25lbnRzL1Rvb2xzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWxhY2l0ZXMgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xuICBjb25zdHJ1Y3RvcihnYW1lLHgseSxrZXksZnJhbWUpe1xuICAgIHN1cGVyKGdhbWUseCx5LGtleSxmcmFtZSk7XG4gICAgdGhpcy5nYW1lLnBoeXNpY3MucDIuZW5hYmxlKHRoaXMsZmFsc2UpOy8vZGVidWcgaXMgdHJ1ZVxuICAgIHRoaXMuYm9keS5zdGF0aWMgPSB0cnVlOy8vdGhpcyBjZW50ZXIgdGhlIGFuY2hvciB0byAwLjUsMC41XG4gICAgVG9vbHMuY29udmVydFRpbGVDb29yVG9QMih4LHksdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLmJvZHkpO1xuXG4gICAgdGhpcy5ib2R5LmNsZWFyU2hhcGVzKCk7XG4gICAgdGhpcy5ib2R5LmxvYWRQb2x5Z29uKCdzdGFsYWNpdGVzJywgZnJhbWUpO1xuICB9XG5cbiAgdXBkYXRlKCl7XG5cblxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUaXRsZVRleHQgZXh0ZW5kcyBQaGFzZXIuVGV4dHtcbiAgY29uc3RydWN0b3IoZ2FtZSx0ZXh0KXtcbiAgICBzdXBlcihnYW1lLDUxMiwzODQsdGV4dCk7XG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41LDAuNSk7XG4gICAgdGhpcy5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcblxuICAgIGxldCBzdHlsZSA9IHtcbiAgICAgIGZvbnQ6J2JvbGQgMzZweCBDZW50dXJ5JyxmaWxsOicjZmZmZmZmJ1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3R5bGUoc3R5bGUpO1xuXG4gICAgZ2FtZS5hZGQudHdlZW4odGhpcykudG8oe2FscGhhOiAwfSw0NjAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5PdXQsIHRydWUpO1xuICB9XG5cbiAgdXBkYXRlKCl7XG4gICAgaWYodGhpcy5hbHBoYT09MCl0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBXYXZlc09iamVjdHMgZXh0ZW5kcyBQaGFzZXIuU3ByaXRle1xuICBjb25zdHJ1Y3RvcihnYW1lLHgseSxrZXksZnJhbWUpe1xuICAgIHN1cGVyKGdhbWUseCx5LGtleSxmcmFtZSk7XG4gICAgLy8xMDAgKiAoKHggKyB5KSAlIDEwKVxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAsMSk7Ly95b3UgbmVlZCBhbiBhbmNob3IgdG8gdHdlZW4hXG4gICAgLy9jb25zb2xlLmxvZyhcImkgYW0gYXQgXCIreCArIFwiIFwiK01hdGguc2luKHggKiAoTWF0aC5QSS8xODApKSk7XG4gICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7IHk6IHktTWF0aC5zaW4oeCAqIChNYXRoLlBJLzE4MCkpKjh9LDgwMCwgUGhhc2VyLkVhc2luZy5CYWNrLkluLCB0cnVlLCAwLCBJbmZpbml0eSwgdHJ1ZSk7XG5cbiAgfVxuXG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3Qge1xuXG4gIHByZWxvYWQoKSB7XG5cbiAgICAvL3ByZWxvYWQgZm9yIG1lbnUgc2NyZWVuXG4gICAgdGhpcy5sb2FkLmltYWdlKCdzcGxhc2hzY3JlZW4nLCdhc3NldHMvbWVudS9zcGxhc2hzY3JlZW5iYXJlLnBuZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgnYW5pbWVmZmVjdCcsJ2Fzc2V0cy9tZW51L2FuaW1lZmZlY3QucG5nJyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdzdGFydCcsJ2Fzc2V0cy9tZW51L3N0YXJ0c2VsZWN0LnBuZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgnY29udGludWUnLCdhc3NldHMvbWVudS9jb250aW51ZXNlbGVjdC5wbmcnKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ29wdGlvbnMnLCdhc3NldHMvbWVudS9vcHRpb25zc2VsZWN0LnBuZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgnd29yZGluZ3MnLCdhc3NldHMvbWVudS93b3JkaW5ncy5wbmcnKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3BvcHVwJywnYXNzZXRzL21lbnUvcG9wdXBwYW5lbC5wbmcnKVxuXG4gICAgLy9sb2FkIFNGWCBmaXJzdCBpbiBib290XG4gICAgdGhpcy5sb2FkLmF1ZGlvU3ByaXRlKCdzZngnLFsnYXNzZXRzL2F1ZGlvL3NmeC9zZngub2dnJywnYXNzZXRzL2F1ZGlvL3NmeC9zZngubXAzJywnYXNzZXRzL2F1ZGlvL3NmeC9zZngubTRhJywnYXNzZXRzL2F1ZGlvL3NmeC9zZngubWMzJ10sJ2Fzc2V0cy9hdWRpby9zZngvc2Z4Lmpzb24nKTtcbiAgICAvL3N0YW5kYXJkIGNvbmZpZ3VyYXRpb24gc2V0dGluZ3MuLiBwb3B1cHMsIHRpcHMsIGRpYWxvdWdlcyBldGNcbiAgICB0aGlzLmxvYWQuanNvbignY29uZmlnJywnYXNzZXRzL2NvbmZpZy9Db25maWcuanNvbicpO1xuXG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMyMjIyNmFcIjtcbiAgICAvL25lZWQgYSBsb2FkaW5nIGJhclxuICAgIHRoaXMubG9hZC5pbWFnZSgncHJlbG9hZGVyJywgJ2Fzc2V0cy9tZW51L2xvYWRpbmdiYXIucG5nJyk7XG5cbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLmlucHV0Lm1heFBvaW50ZXJzID0gMTtcbiAgICB0aGlzLmlucHV0Lm1zcG9pbnRlci5jYXB0dXJlID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnbWVudScpO1xuICB9XG5cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL3ByZWZhYnMvUGxheWVyLmpzXCI7XG5pbXBvcnQgRW50cmFuY2VEb29yIGZyb20gXCIuLi9wcmVmYWJzL0VudHJhbmNlRG9vci5qc1wiO1xuaW1wb3J0IEJsb2NraW5nT2JqZWN0cyBmcm9tIFwiLi4vcHJlZmFicy9CbG9ja2luZ09iamVjdHMuanNcIlxuaW1wb3J0IENvbGxlY3RhYmxlcyBmcm9tIFwiLi4vcHJlZmFicy9Db2xsZWN0YWJsZXMuanNcIlxuaW1wb3J0IFdhdmVzT2JqZWN0cyBmcm9tIFwiLi4vcHJlZmFicy9XYXZlc09iamVjdHMuanNcIlxuaW1wb3J0IFBsYXRmb3JtcyBmcm9tIFwiLi4vcHJlZmFicy9QbGF0Zm9ybXMuanNcIlxuaW1wb3J0IEhlYWx0aEJhciBmcm9tIFwiLi4vcHJlZmFicy9IZWFsdGhCYXIuanNcIlxuaW1wb3J0IEVuZXJneUJhciBmcm9tIFwiLi4vcHJlZmFicy9FbmVyZ3lCYXIuanNcIlxuaW1wb3J0IFJhdEdydW50IGZyb20gXCIuLi9wcmVmYWJzL1JhdEdydW50LmpzXCJcbmltcG9ydCBSYXRTb2xkaWVyIGZyb20gXCIuLi9wcmVmYWJzL1JhdFNvbGRpZXIuanNcIlxuaW1wb3J0IEVuZW15U3RvcHMgZnJvbSBcIi4uL3ByZWZhYnMvRW5lbXlTdG9wcy5qc1wiXG5pbXBvcnQgUG9wdXAgZnJvbSBcIi4uL3ByZWZhYnMvUG9wdXAuanNcIlxuaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9jb21wb25lbnRzL1Rvb2xzLmpzXCJcbmltcG9ydCBDaGVlc2VTY29yZSBmcm9tIFwiLi4vcHJlZmFicy9DaGVlc2VTY29yZS5qc1wiXG5pbXBvcnQgVGl0bGVUZXh0IGZyb20gXCIuLi9wcmVmYWJzL1RpdGxlVGV4dC5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVwMSBleHRlbmRzIFBoYXNlci5TdGF0ZXtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvL29iamVjdCBsZXZlbCBwcm9wZXJ0aWVzXG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZSgpe1xuICAgIHRoaXMucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5QMkpTKTtcbiAgICB0aGlzLnBoeXNpY3MucDIuZ3Jhdml0eS55ID0gODAwO1xuICAgIC8vdGhpcyBzZXRzIHRoZSBkZWZhdWx0IGNvbnRhY3QgbWF0ZXJpYWwgdG8gYWxsIFAyIGJvZHkgaW4gdGhpcyB3b3JsZFxuICAgIHRoaXMucGh5c2ljcy5wMi53b3JsZC5kZWZhdWx0Q29udGFjdE1hdGVyaWFsLmZyaWN0aW9uID0gMC40MjsvL3BlcmZlY3Qgbm90IHRvIGJlIEFJUkJPUk5FXG4gICAgdGhpcy5waHlzaWNzLnAyLndvcmxkLnNldEdsb2JhbFN0aWZmbmVzcygxZTUpO1xuXG4gICAgLy9tYXAgc3RhcnRcbiAgICB0aGlzLm1hcCA9IHRoaXMuYWRkLnRpbGVtYXAoJ2VwMScpO1xuICAgIC8vYWRkIHRpbGVzZXQgaW1hZ2VcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGUnKTtcbiAgICAvL3BhcmFsbGF4IGJhY2tncm91bmRcbiAgICB0aGlzLmJnID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoJ2JhY2tncm91bmQnKTtcbiAgICB0aGlzLmJnLnNjcm9sbEZhY3RvclggPSAuNztcbiAgICB0aGlzLmJnLnNjcm9sbEZhY3RvclkgPSAuNztcblxuICAgIC8vd2Fsa2FibGUgdGlsZXNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoJ3RpbGVzJyk7XG5cbiAgICAvL2NvbGxpc2lvblxuICAgIHRoaXMubGF5ZXIucmVzaXplV29ybGQoKTtcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDEsMTA2LHRydWUsdGhpcy5sYXllcik7XG5cbiAgICBsZXQgdGlsZXNCb2RpZXMgPSB0aGlzLnBoeXNpY3MucDIuY29udmVydFRpbGVtYXAodGhpcy5tYXAsIHRoaXMubGF5ZXIpO1xuXG4gICAgLy9hZGQgYXJjaCBsYXllclxuICAgIHRoaXMubWFwLmNyZWF0ZUxheWVyKCdkZWNvcmF0aXZlJyk7XG5cbiAgICAvL2FkZCBtb3Zpbmcgd2F2ZXMgb2JqZWN0c1xuICAgIC8vdGhpcyBndXkgaGFzIHNhbWUgZ2lkIDE4NCBmb3IgYWxsIHRoZSB0aWxlcy4uLiBkZXBlbmRpbmcgb24gaG93IHRoaXMgZnVuY3Rpb24gaXMgd3JpdHRlbiwgaXQgbWlnaHQganVzdCBncmFiYmVkIGFsbCB0aGVcbiAgICAvL29iamVjdHMgZm9yIHRoaXMgZ2lkXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ21vdmluZ3dhdmVzJywxODQsJ29iamVjdHMxJywnd2F0ZXJ0aWxlJyx0cnVlLGZhbHNlLHRoaXMud29ybGQsV2F2ZXNPYmplY3RzKTtcbiAgICAvL2FkZCB0aGUgZGFtYWdlIHpvbmUgYXNzb2NpYXRlZCB3aXRoIHRoZSB3YXRlciBhcmVhXG4gICAgdGhpcy5kYW1hZ2Vab25lID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoMTIwMCwyMTAwLDQwMCwxMDApO1xuXG4gICAgLy9hZGQgY3VzdG9tIHBsYXRmb3Jtc1xuICAgIHRoaXMucGxhdGZvcm1zR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLDE4Mywnb2JqZWN0czEnLCdzbGlwcGVyeTInLHRydWUsZmFsc2UsdGhpcy5wbGF0Zm9ybXNHcm91cCxQbGF0Zm9ybXMpO1xuICAgIC8vY3VzdG9tIHByb3BlcnRpZXMgdG8gdGhpc1xuICAgIHRoaXMuc2xpcHBlcnkgPSB0aGlzLnBsYXRmb3Jtc0dyb3VwLmdldFRvcCgpO1xuICAgIGxldCBzbGlwcGVyeU1hdGVyaWFsID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZU1hdGVyaWFsKCdzbGlwcGVyeU1hdGVyaWFsJyx0aGlzLnNsaXBwZXJ5LmJvZHkpO1xuXG4gICAgLy9hZGQgYmxvY2tpbmcgb2JqZWN0c1xuICAgIHRoaXMuYmxvY2tpbmdHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgVG9vbHMuZmluZE9iamVjdEluTGF5ZXIodGhpcy5tYXAsICdibG9ja2luZ29iamVjdHMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdibG9ja2luZ29iamVjdHMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMScsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5ibG9ja2luZ0dyb3VwLEJsb2NraW5nT2JqZWN0cyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBjb2xsZWN0YWJsZXNcbiAgICB0aGlzLmNvbGxlY3RhYmxlc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kT2JqZWN0SW5MYXllcih0aGlzLm1hcCwgJ2NvbGxlY3RhYmxlcycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnY29sbGVjdGFibGVzJyxlbGVtZW50LmdpZCwnb2JqZWN0czEnLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMuY29sbGVjdGFibGVzR3JvdXAsQ29sbGVjdGFibGVzKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGVudHJhbmNlIGRvb3JcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZG9vcicsMTc2LCdvYmplY3RzMScsJ2VudHJhbmNlZG9vcicsdHJ1ZSxmYWxzZSx0aGlzLndvcmxkLEVudHJhbmNlRG9vcik7XG4gICAgdGhpcy5lbnRyYW5jZWRvb3IgPSB0aGlzLndvcmxkLmdldFRvcCgpO1xuICAgIC8vYWRkIHBsYXllclxuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmdhbWUsMjYwLHRoaXMud29ybGQuX2hlaWdodC0yMDApO1xuICAgIC8vdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuZ2FtZSw3MTIsNzc2KTtcbiAgICAvL3RoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmdhbWUsNTUwLDIwMCk7XG5cbiAgICAvL1xuICAgIHRoaXMuc291bmQuc3RvcEFsbCgpO1xuICAgIHRoaXMuc2Z4ID0gdGhpcy5hZGQuYXVkaW9TcHJpdGUoJ3NmeCcpO1xuICAgIHRoaXMudGhlbWUgPSB0aGlzLmFkZC5hdWRpb1Nwcml0ZSgndGhlbWUnKTtcblxuICAgIGlmKFRvb2xzLmdldERhdGEoJ211dGVzb3VuZCcpKVRvb2xzLm11dGVPclBsYXkodGhpcy5zZngsdHJ1ZSk7XG4gICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXRoZW1lJykpVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuXG4gICAgdGhpcy5wbGF5ZXIuc2Z4ID0gdGhpcy5zZng7XG5cbiAgICBsZXQgcGxheWVyTWF0ZXJpYWwgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlTWF0ZXJpYWwoJ3BsYXllck1hdGVyaWFsJywgdGhpcy5wbGF5ZXIuYm9keSk7XG4gICAgLy9jb250YWN0IG1hdGVyaWFsIHdpdGggc2xpcHBlcnlcbiAgICBsZXQgY29udGFjdE1hdGVyaWFsID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbCx7ZnJpY3Rpb246MC4zNSxzdXJmYWNlVmVsb2NpdHk6LTEwMDB9KTtcblxuICAgIC8vdGhpcy53b3JsZC5hZGRDaGlsZCh0aGlzLnBsYXllcik7Ly9uZWVkIHRvIGFkZCB0aGlzIGRpc3BsYXkgb2JqZWN0IHRvIHRoZSB3b3JsZCBncm91cFxuICAgIHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIC8vYWRkIGVuZW15IHJhdCBncnVudFxuICAgIHRoaXMucmF0R3J1bnRHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ2VuZW1pZXMnLDE4NywncmF0Z3J1bnQnLCdmcmFtZTAnLHRydWUsZmFsc2UsdGhpcy5yYXRHcnVudEdyb3VwLFJhdEdydW50KTtcbiAgICB0aGlzLnJhdEdydW50R3JvdXAuZm9yRWFjaCgocmF0R3J1bnQpPT57XG4gICAgICByYXRHcnVudC5wbGF5ZXI9dGhpcy5wbGF5ZXI7XG4gICAgICByYXRHcnVudC5zZnggPSB0aGlzLnNmeDtcbiAgICB9LHRoaXMpO1xuXG4gICAgLy9hZGQgc3RvcHMgZm9yIGVuZW15XG4gICAgdGhpcy5zdG9wc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kT2JqZWN0SW5MYXllcih0aGlzLm1hcCwgJ2VuZW15c3RvcHMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZW5lbXlzdG9wcycsZWxlbWVudC5naWQsJ29iamVjdHMxJyxlbGVtZW50Lm5hbWUsdHJ1ZSxmYWxzZSx0aGlzLnN0b3BzR3JvdXAsRW5lbXlTdG9wcyk7XG4gICAgfSk7XG5cbiAgICAvL3RoZSBtb3N0IGZyb250IGxheWVyIHdoaWNoIHRvIGJlIGRpc3BsYXllZCBpbiBmcm9udCBvZiBwbGF5ZXJcbiAgICB0aGlzLm1hcC5jcmVhdGVMYXllcignZGVjb3JhdGl2ZTInKTtcblxuICAgIC8vVUkgc2V0dXBcbiAgICB0aGlzLmhlYWx0aEJhciA9IG5ldyBIZWFsdGhCYXIodGhpcy5nYW1lLDIwLDIwKTtcbiAgICB0aGlzLmVuZXJneUJhciA9IG5ldyBFbmVyZ3lCYXIodGhpcy5nYW1lLDMxLDgwKTtcbiAgICB0aGlzLnBsYXllci5lbmVyZ3lCYXIgPSB0aGlzLmVuZXJneUJhcjtcbiAgICB0aGlzLnBsYXllci5oZWFsdGhCYXIgPSB0aGlzLmhlYWx0aEJhcjtcbiAgICB0aGlzLnBsYXllci5yYXRHcm91cCA9IHRoaXMucmF0R3J1bnRHcm91cDtcblxuICAgIHRoaXMuY2hlZXNlU2NvcmUgPSBuZXcgQ2hlZXNlU2NvcmUodGhpcy5nYW1lLDQ2MCwyMCwyKTtcblxuICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG4gICAgLy9zZWVtcyBsaWtlIG5vIG5lZWRcbiAgICAvL3RoaXMucGh5c2ljcy5wMi5zZXRCb3VuZHNUb1dvcmxkKHRydWUsIHRydWUsIHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICAvL1BIWVNJQ1MgY29sbGlzaW9ucy0tLT5cbiAgICB0aGlzLnBoeXNpY3MucDIuc2V0SW1wYWN0RXZlbnRzKHRydWUpO1xuXG4gICAgbGV0IHRpbGVzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgcGxhdGZvcm1zQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgcGxheWVyQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgYmxvY2tpbmdPYmplY3RzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgY29sbGVjdGFibGVzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgcmF0R3J1bnRDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBzdG9wc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGhpdGJveENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGVudHJhbmNlZG9vckNHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgLy91cGRhdGUgd29ybGQgYm91bmRzIGNvbGxpc2lvbiBncm91cCAgdG8gY29sbGlkZSB3aXRoIGFsbCB0aGUgY3VzdG9tIGNvbGxpc2lvbiBncm91cHNcbiAgICB0aGlzLnBoeXNpY3MucDIudXBkYXRlQm91bmRzQ29sbGlzaW9uR3JvdXAoKTtcbiAgICAvL3NldCB0aGUgY29sbGlzaW9uc1xuICAgIHRpbGVzQm9kaWVzLmZvckVhY2goKHRpbGUpPT57XG4gICAgICB0aWxlLnNldENvbGxpc2lvbkdyb3VwKHRpbGVzQ0cpO1xuICAgICAgdGlsZS5jb2xsaWRlcyhbcGxheWVyQ0csY29sbGVjdGFibGVzQ0csYmxvY2tpbmdPYmplY3RzQ0cscmF0R3J1bnRDR10pO1xuICAgIH0pO1xuICAgIHRoaXMucGxhdGZvcm1zR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHBsYXRmb3Jtc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3BsYXllckNHLGNvbGxlY3RhYmxlc0NHLHJhdEdydW50Q0ddKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMucGxheWVyLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocGxheWVyQ0cpO1xuICAgIHRoaXMucGxheWVyLmJvZHkuY29sbGlkZXMoW3RpbGVzQ0csYmxvY2tpbmdPYmplY3RzQ0cscGxhdGZvcm1zQ0csY29sbGVjdGFibGVzQ0cscmF0R3J1bnRDRyxlbnRyYW5jZWRvb3JDRyxdLHRoaXMucGxhdGZvcm1IaXRMaXN0ZW5lcix0aGlzKTtcbiAgICB0aGlzLnBsYXllci5oaXRib3gxLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoaGl0Ym94Q0cpO1xuICAgIHRoaXMucGxheWVyLmhpdGJveDEuYm9keS5jb2xsaWRlcyhyYXRHcnVudENHLHRoaXMucGxheWVySGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgdGhpcy5ibG9ja2luZ0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChibG9ja2luZ09iamVjdHNDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFtwbGF5ZXJDRyxjb2xsZWN0YWJsZXNDRyxyYXRHcnVudENHLHRpbGVzQ0ddKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMuY29sbGVjdGFibGVzR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGNvbGxlY3RhYmxlc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3RpbGVzQ0cscGxhdGZvcm1zQ0csYmxvY2tpbmdPYmplY3RzQ0ddKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5jb2xsZWN0YWJsZXNMaXN0ZW5lcix0aGlzKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMucmF0R3J1bnRHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocmF0R3J1bnRDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFt0aWxlc0NHLHBsYXRmb3Jtc0NHLGJsb2NraW5nT2JqZWN0c0NHLHN0b3BzQ0csaGl0Ym94Q0ddKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpXG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnN0b3BzR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHN0b3BzQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhyYXRHcnVudENHKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoZW50cmFuY2Vkb29yQ0cpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5uZXh0RXBpc29kZSx0aGlzKTtcblxuICAgIC8vR0FNRSBJTlBVVC0tLT5cbiAgICAvL2xvY2sgYXJyb3dzIGtleSBpbnB1dCBmcm9tIHRoZSBicm93c2VyXG4gICAgdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXlDYXB0dXJlKFtQaGFzZXIuS2V5Ym9hcmQuU1BBQ0UsUGhhc2VyLktleWJvYXJkLlVQLFBoYXNlci5LZXlib2FyZC5MRUZULFBoYXNlci5LZXlib2FyZC5SSUdIVF0pO1xuXG4gICAgLy9pbml0aWFsaXplIHBvcCB1cCBwYW5lbHMsbWFpbiBwb3AgdXAsIGluc3RydWN0aW9uLCB0aXAxLi4uTlxuICAgIC8vYWRkIGVzYyBrZXkgdG8gYnJpbmcgdXAgcG9wIHVwIHBhbmVsXG4gICAgdGhpcy5uYXZpS2V5cyA9IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5cyh7ICd1cCc6IFBoYXNlci5LZXlDb2RlLlVQLCAnZG93bic6IFBoYXNlci5LZXlDb2RlLkRPV04sICdlbnRlcic6IFBoYXNlci5LZXlDb2RlLkVOVEVSLCAnZXNjJzpQaGFzZXIuS2V5Q29kZS5FU0MgfSApO1xuICAgIHRoaXMubmF2aUtleXMuZXNjLm9uRG93bi5hZGQoKCk9PntcbiAgICAgIGlmKCF0aGlzLmdhbWUucGF1c2VkKXtcbiAgICAgICAgdGhpcy5nYW1lLnBhdXNlZD10cnVlO1xuICAgICAgICB0aGlzLnBvcHVwID0gbmV3IFBvcHVwKHRoaXMuZ2FtZSx0aGlzLmNhbWVyYS54LHRoaXMuY2FtZXJhLnksMik7XG4gICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGQodGhpcy5wb3B1cCk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgIH1cblxuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5uYXZpS2V5cy51cC5vbkRvd24uYWRkKCh0YXJnZXQpPT57Ly9zaG91bGQgdGhpcyBiZSBhZGRlZCBpbnNpZGUgdGhlIFBvcHVwIGNsYXM/XG4gICAgICAvL2NvbnNvbGUubG9nKFwidXBcIik7XG4gICAgICBpZih0aGlzLmdhbWUucGF1c2VkKXRoaXMucG9wdXAuY3Vyc29yTW92ZWQodGFyZ2V0LmtleUNvZGUpO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5uYXZpS2V5cy5kb3duLm9uRG93bi5hZGQoKHRhcmdldCk9PntcbiAgICAgIC8vY29uc29sZS5sb2coXCJkb3duXCIpO1xuICAgICAgaWYodGhpcy5nYW1lLnBhdXNlZCl0aGlzLnBvcHVwLmN1cnNvck1vdmVkKHRhcmdldC5rZXlDb2RlKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMuZW50ZXIub25Eb3duLmFkZCgoKT0+e1xuICAgICAgaWYodGhpcy5nYW1lLnBhdXNlZCl0aGlzLnByb2Nlc3NTZWxlY3Rpb24oKTtcbiAgICB9LHRoaXMpO1xuXG5cbiAgICB0aGlzLmdhbWUub25QYXVzZS5hZGQoZnVuY3Rpb24oKXt0aGlzLnNvdW5kLnVuc2V0TXV0ZSgpO30sdGhpcyk7Ly88PT1lbmFibGUgdGhlIHNvdW5kIHRvIGNvbnRpbnVlIHBsYXkgJzspJ1xuICAgIHRoaXMudGhlbWUuc291bmRzWydPYmxpdGVyYXRpb24nXS5wbGF5KCdPYmxpdGVyYXRpb24nLG51bGwsMC4zLHRydWUpO1xuXG4gICAgLy9UbyBnZXQgdGhlIEZQU1xuICAgIHRoaXMudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XG4gICAgLy9leHBlcmltZW50XG5cbiAgICB0aGlzLnRpdGxldGV4dCA9IG5ldyBUaXRsZVRleHQodGhpcy5nYW1lLCdFcCAxLiBUaGUgQXBwcmVudGljZXNoaXAnKTtcbiAgICB0aGlzLmFkZC5leGlzdGluZyh0aGlzLnRpdGxldGV4dCk7XG5cbiAgICB0aGlzLnRpcHNtYXJrZXIgPSBbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdO1xuICB9XG5cbiAgdXBkYXRlKCl7XG4gICAgLy93YXRlciBhcmVhIGh1cnRzIHBsYXllclxuICAgIGlmKHRoaXMuZGFtYWdlWm9uZS5pbnRlcnNlY3RzUmF3KHRoaXMucGxheWVyLmxlZnQsdGhpcy5wbGF5ZXIucmlnaHQsdGhpcy5wbGF5ZXIudG9wLHRoaXMucGxheWVyLmJvdHRvbSkpe1xuICAgICAgLy9pZighdGhpcy5zZnguc291bmRzWydGb290c3RlcF9XYXRlcl8wMCcsJ0Zvb3RzdGVwX1dhdGVyXzAxJywnRm9vdHN0ZXBfV2F0ZXJfMDMnXS5pc1BsYXlpbmcpdGhpcy5zZngucGxheSh0aGlzLmdhbWUucm5kLnBpY2soWydGb290c3RlcF9XYXRlcl8wMCcsJ0Zvb3RzdGVwX1dhdGVyXzAxJywnRm9vdHN0ZXBfV2F0ZXJfMDMnXSkpO1xuICAgICAgdGhpcy50aXBzcG9wcGVyKDEpO1xuICAgICAgVG9vbHMucGxheVNvdW5kKHRoaXMuc2Z4LFsnRm9vdHN0ZXBfV2F0ZXJfMDEnLCdGb290c3RlcF9XYXRlcl8wMicsJ0Zvb3RzdGVwX1dhdGVyXzAzJ10pO1xuICAgICAgdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDQpO1xuICAgIH1cblxuICAgIC8vZmlyZSBwb3AgdXBzIGhlcmU/XG4gICAgLy9hbGwgbWFudWFsXG4gICAgaWYodGhpcy5wbGF5ZXIueT4yMTQwKXtcbiAgICAgIHRoaXMudGlwc3BvcHBlcigwKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLnBsYXllci54Pjc5MCYmdGhpcy5wbGF5ZXIueTw5Mjcpe1xuICAgICAgdGhpcy50aXBzcG9wcGVyKDUpO1xuICAgIH1cbiAgfVxuXG4gIHRpcHNwb3BwZXIoaW5kZXgpe1xuICAgIGlmKHRoaXMudGlwc21hcmtlcltpbmRleF0pcmV0dXJuO1xuICAgIHRoaXMuZ2FtZS5wYXVzZWQ9dHJ1ZTtcbiAgICBsZXQgdGlwcG9wdXAgPSBuZXcgUG9wdXAodGhpcy5nYW1lLHRoaXMuY2FtZXJhLngsdGhpcy5jYW1lcmEueSwzKTtcbiAgICBsZXQgdGlwID0gdGhpcy5jYWNoZS5nZXRKU09OKCdjb25maWcnKS5wb3B1cC5lcDEudGlwc1tpbmRleF07XG4gICAgdGlwcG9wdXAuc2V0VGl0bGUodGlwWyd0aXRsZSddKTtcbiAgICBpZih0aXBbJ2Rlc2NyaXB0aW9uJ10pdGlwcG9wdXAuc2V0RGVzY3JpcHRpb24odGlwWydkZXNjcmlwdGlvbiddLDApO1xuXG4gICAgdGhpcy50aXBzbWFya2VyW2luZGV4XSA9IHRydWU7XG5cbiAgICB0aGlzLndvcmxkLmFkZENoaWxkKHRpcHBvcHVwKTtcbiAgICB0aGlzLmVuYWJsZUN1cnNvcktleXMoZmFsc2UpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy50aW1lLmZwcyB8fCAnLS0nLCAyLCAxNCwgXCIjYTdhZWJlXCIpO1xuICB9XG5cbiAgc2h1dGRvd24oKXtcblxuICB9XG5cbiAgbmV4dEVwaXNvZGUodGhpc0JvZHksdGhhdEJvZHkpe1xuICAgIGlmKHRoYXRCb2R5LnNwcml0ZSYmdGhhdEJvZHkuc3ByaXRlLmtleT09PSdwbGF5ZXInKXtcbiAgICAgIHRoaXMuY2hlZXNlU2NvcmUuYWRkVG9Ub3RhbFNjb3JlKDEpO1xuICAgICAgdGhpcy5zdGF0ZS5zdGFydCgncHJlbG9hZCcsdHJ1ZSxmYWxzZSwnZXAyJyk7XG4gICAgfVxuICB9XG5cbiAgLy8vLy0tLT4gSW4gR2FtZSBNZW51XG4gIHJlc3VtZUdhbWUoKXtcbiAgICBsZXQgc29tZXBvcHVwID0gdGhpcy53b3JsZC5nZXRUb3AoKTtcbiAgICBpZihzb21lcG9wdXAua2V5PT09J3BvcHVwJyl7XG4gICAgICB0aGlzLndvcmxkLnJlbW92ZUNoaWxkKHNvbWVwb3B1cCk7XG4gICAgICBzb21lcG9wdXAuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLmdhbWUucGF1c2VkPWZhbHNlO1xuICB9XG5cbiAgLy9wcm9jZXNzaW5nIGZvciBwb3AgdXAgbWVudSBpdGVtc1xuICBwcm9jZXNzU2VsZWN0aW9uKCl7XG4gICAgbGV0IHBvcHVwVGV4dCA9IHRoaXMud29ybGQuZ2V0VG9wKCkub3B0aW9uRW50ZXJlZCgpO1xuICAgIGlmKCFwb3B1cFRleHQpIHJldHVybjtcblxuICAgIGNvbnNvbGUubG9nKFwiZW50ZXIgXCIrcG9wdXBUZXh0KTtcbiAgICAvL3RoaXMgZ3V5IGhhcyB0byBkbyB0aGUgbGlmdGluZyBmb3IgdGhlIG9wdGlvbnNcbiAgICBzd2l0Y2gocG9wdXBUZXh0KXtcbiAgICAgIGNhc2UgJ1Jlc3VtZSBHYW1lJzpcbiAgICAgICAgdGhpcy5yZXN1bWVHYW1lKCk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1Jlc3RhcnQgRXBpc29kZSc6XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpOy8vbmVlZCB0byB1bnBhdXNlIHRoZSBnYW1lIGJlZm9yZSBjaGFuZ2Ugc3RhdGVcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnZXAxJyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0luc3RydWN0aW9ucyc6XG4gICAgICAgIHRoaXMucG9wdXBJbnN0cnVjdGlvbiA9IG5ldyBQb3B1cCh0aGlzLmdhbWUsdGhpcy5jYW1lcmEueCx0aGlzLmNhbWVyYS55LDMpO1xuICAgICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSB0aGlzLmNhY2hlLmdldEpTT04oJ2NvbmZpZycpLnBvcHVwLmluc3RydWN0aW9ucztcbiAgICAgICAgdGhpcy5wb3B1cEluc3RydWN0aW9uLnNldFRpdGxlKGluc3RydWN0aW9uWyd0aXRsZSddKTtcbiAgICAgICAgdGhpcy5wb3B1cEluc3RydWN0aW9uLnNldERlc2NyaXB0aW9uKGluc3RydWN0aW9uWydkZXNjcmlwdGlvbiddLDApO1xuXG4gICAgICAgIHRoaXMud29ybGQucmVtb3ZlQ2hpbGQodGhpcy5wb3B1cCk7XG4gICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGQodGhpcy5wb3B1cEluc3RydWN0aW9uKTtcbiAgICAgICAgdGhpcy5lbmFibGVDdXJzb3JLZXlzKGZhbHNlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnR290IGl0ISc6XG4gICAgICAgIHRoaXMuZW5hYmxlQ3Vyc29yS2V5cyh0cnVlKTtcbiAgICAgICAgdGhpcy5yZXN1bWVHYW1lKCk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1F1aXQgdG8gTWFpbiBNZW51JzpcbiAgICAgICAgdGhpcy5yZXN1bWVHYW1lKCk7XG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ21lbnUnKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXV0ZSBNdXNpYyc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwibXV0aW5nIG11c2ljIFwiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRldGhlbWUnLHRydWUpO1xuICAgICAgICBUb29scy5tdXRlT3JQbGF5KHRoaXMudGhlbWUsdHJ1ZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ011dGUgU291bmQnOlxuICAgICAgICBjb25zb2xlLmxvZyhcIm11dGluZyBzb3VuZFwiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRlc291bmQnLHRydWUpO1xuICAgICAgICBUb29scy5tdXRlT3JQbGF5KHRoaXMuc2Z4LHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQbGF5IE11c2ljJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5aW5nIG11c2ljXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGV0aGVtZScsZmFsc2UpO1xuICAgICAgICBUb29scy5tdXRlT3JQbGF5KHRoaXMudGhlbWUsZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQbGF5IFNvdW5kJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5aW5nIHNvdW5kXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGVzb3VuZCcsZmFsc2UpO1xuICAgICAgICBUb29scy5tdXRlT3JQbGF5KHRoaXMuc2Z4LGZhbHNlKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGVuYWJsZUN1cnNvcktleXMoYm9vbCl7XG4gICAgICB0aGlzLm5hdmlLZXlzLnVwLmVuYWJsZWQgPSBib29sO1xuICAgICAgdGhpcy5uYXZpS2V5cy5kb3duLmVuYWJsZWQgPSBib29sO1xuICB9XG5cbiAgcGxhdGZvcm1IaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICBpZih0aGF0Qm9keS5zcHJpdGUmJih0aGF0Qm9keS5zcHJpdGUuZnJhbWVOYW1lPT0nc2xpcHBlcnkxJ3x8dGhhdEJvZHkuc3ByaXRlLmZyYW1lTmFtZT09J3NsaXBwZXJ5MicpKXtcbiAgICAgIHRoaXMudGlwc3BvcHBlcigzKTtcbiAgICAgIFRvb2xzLnBsYXlTb3VuZCh0aGlzLnNmeCxbJ3NsaW1lNycsJ3NsaW1lOCcsJ3NsaW1lOSddKTtcbiAgICAgIHRoaXMucGxheWVyLm9uc2xpcHB5cGxhdGZvcm09dHJ1ZTtcbiAgICB9ZWxzZXtcbiAgICAgIGlmKHRoaXMucGxheWVyLm9uc2xpcHB5cGxhdGZvcm0pdGhpcy5wbGF5ZXIub25zbGlwcHlwbGF0Zm9ybT1mYWxzZTtcbiAgICB9XG4gIH1cblxuICAvL3BsYXllciBpbnRlcmFjdGlvbiBmdW5jdGlvbnNcbiAgZW5lbXlIaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICBpZih0aGF0Qm9keS5zcHJpdGUmJnRoYXRCb2R5LnNwcml0ZS5rZXk9PT0ncGxheWVyJyl7XG4gICAgICBjb25zb2xlLmxvZygnZW5lbXkgaGl0Jyk7XG4gICAgICBpZih0aGlzU2hhcGU9PT10aGlzQm9keS5kYXRhLnNoYXBlc1swXSl0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoNSk7XG4gICAgfVxuICB9XG5cbiAgcGxheWVySGl0TGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgICAvL2hpdGJveCBvbmx5IHRhcmdldCBpcyBlbmVteSBzbyBwcmV0dHkgbXVjaCBubyBuZWVkIHRvIGNoZWNrXG4gICAgICBpZih0aGF0Qm9keS5zcHJpdGUpe1xuICAgICAgICB0aGF0Qm9keS5zcHJpdGUuZGFtYWdlUmF0KDgsNDAwKTtcbiAgICAgIH1cblxuICB9XG5cbiAgY29sbGVjdGFibGVzTGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiZ0aGF0Qm9keS5zcHJpdGUua2V5PT09XCJwbGF5ZXJcIil7XG4gICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb250YWN0ZWQgYnlcIit0aGlzQm9keS5zcHJpdGUuZnJhbWVOYW1lKTtcbiAgICAgIHN3aXRjaCh0aGlzQm9keS5zcHJpdGUuZnJhbWVOYW1lKXtcbiAgICAgICAgY2FzZSAnY2hlZXNlMSc6XG4gICAgICAgICAgY29uc29sZS5sb2coXCJjaGVlc2UxIGFtIGdyYWJiZWQhXCIpO1xuICAgICAgICAgIHRoaXMudGlwc3BvcHBlcigyKTtcbiAgICAgICAgICAvL2luY3JlYXNlIHBsYXllciBlbmVyZ3kuLlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaEVuZXJneSgxMCk7XG4gICAgICAgICAgdGhpcy5jaGVlc2VTY29yZS5pbmNyZWFzZVNjb3JlKDIpO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2hlZXNlMic6XG4gICAgICAgIGNhc2UgJ2NoZWVzZTMnOlxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hlZXNlMiAvIDMgYW0gZ3JhYmJlZCFcIik7XG4gICAgICAgICAgLy9pbmNyZWFzZSBwbGF5ZXIgZW5lcmd5Li5cbiAgICAgICAgICB0aGlzLnBsYXllci5yZXBsZW5pc2hFbmVyZ3koNSk7XG4gICAgICAgICAgdGhpcy5jaGVlc2VTY29yZS5pbmNyZWFzZVNjb3JlKDEpO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2luZWdsYXNzJzpcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIndpbmVnbGFzcyBhbSBncmFiYmVkIVwiKTtcbiAgICAgICAgICB0aGlzLnRpcHNwb3BwZXIoNCk7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIucmVwbGVuaXNoTGlmZSgxMCk7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3aW5lYm90dGxlJzpcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIndpbmVib3R0bGUgYW0gZ3JhYmJlZCFcIik7XG4gICAgICAgICAgdGhpcy50aXBzcG9wcGVyKDYpO1xuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaExpZmUoMjApO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuICAgICAgICBicmVhaztcblxuICAgICAgfVxuICAgICAgLy9mbGFzaHlcbiAgICAgIHRoaXMucGxheWVyLmZsYXNoKCdncmVlbicpO1xuICAgICAgLy9kZXN0cm95IHRoZSBzYWlkIHNwcml0ZVxuICAgICAgdGhpc0JvZHkuc3ByaXRlLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vcHJlZmFicy9QbGF5ZXIuanNcIjtcbmltcG9ydCBFbnRyYW5jZURvb3IgZnJvbSBcIi4uL3ByZWZhYnMvRW50cmFuY2VEb29yLmpzXCI7XG5pbXBvcnQgQmxvY2tpbmdPYmplY3RzIGZyb20gXCIuLi9wcmVmYWJzL0Jsb2NraW5nT2JqZWN0cy5qc1wiXG5pbXBvcnQgQ29sbGVjdGFibGVzIGZyb20gXCIuLi9wcmVmYWJzL0NvbGxlY3RhYmxlcy5qc1wiXG5pbXBvcnQgV2F2ZXNPYmplY3RzIGZyb20gXCIuLi9wcmVmYWJzL1dhdmVzT2JqZWN0cy5qc1wiXG5pbXBvcnQgUGxhdGZvcm1zIGZyb20gXCIuLi9wcmVmYWJzL1BsYXRmb3Jtcy5qc1wiXG5pbXBvcnQgSGVhbHRoQmFyIGZyb20gXCIuLi9wcmVmYWJzL0hlYWx0aEJhci5qc1wiXG5pbXBvcnQgRW5lcmd5QmFyIGZyb20gXCIuLi9wcmVmYWJzL0VuZXJneUJhci5qc1wiXG5pbXBvcnQgUmF0R3J1bnQgZnJvbSBcIi4uL3ByZWZhYnMvUmF0R3J1bnQuanNcIlxuaW1wb3J0IFJhdFNvbGRpZXIgZnJvbSBcIi4uL3ByZWZhYnMvUmF0U29sZGllci5qc1wiXG5pbXBvcnQgU3RhbGFjaXRlcyBmcm9tIFwiLi4vcHJlZmFicy9TdGFsYWNpdGVzLmpzXCJcbmltcG9ydCBFbmVteVN0b3BzIGZyb20gXCIuLi9wcmVmYWJzL0VuZW15U3RvcHMuanNcIlxuaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9wcmVmYWJzL1BvcHVwLmpzXCJcbmltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiXG5pbXBvcnQgQ2hlZXNlU2NvcmUgZnJvbSBcIi4uL3ByZWZhYnMvQ2hlZXNlU2NvcmUuanNcIlxuaW1wb3J0IFRpdGxlVGV4dCBmcm9tIFwiLi4vcHJlZmFicy9UaXRsZVRleHQuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcDIgZXh0ZW5kcyBQaGFzZXIuU3RhdGV7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy9vYmplY3QgbGV2ZWwgcHJvcGVydGllc1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBjcmVhdGUoKXtcblxuICAgIHRoaXMucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5QMkpTKTtcbiAgICB0aGlzLnBoeXNpY3MucDIuZ3Jhdml0eS55ID0gODAwO1xuICAgIC8vdGhpcyBzZXRzIHRoZSBkZWZhdWx0IGNvbnRhY3QgbWF0ZXJpYWwgdG8gYWxsIFAyIGJvZHkgaW4gdGhpcyB3b3JsZFxuICAgIHRoaXMucGh5c2ljcy5wMi53b3JsZC5kZWZhdWx0Q29udGFjdE1hdGVyaWFsLmZyaWN0aW9uID0gMC40MjsvL3BlcmZlY3Qgbm90IHRvIGJlIEFJUkJPUk5FXG4gICAgdGhpcy5waHlzaWNzLnAyLndvcmxkLnNldEdsb2JhbFN0aWZmbmVzcygxZTUpO1xuXG4gICAgLy9tYXAgc3RhcnRcbiAgICB0aGlzLm1hcCA9IHRoaXMuYWRkLnRpbGVtYXAoJ2VwMicpO1xuICAgIC8vYWRkIHRpbGVzZXQgaW1hZ2VcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGUnKTtcbiAgICAvL3BhcmFsbGF4IGJhY2tncm91bmRcbiAgICB0aGlzLmJnID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoJ2JhY2tncm91bmQnKTtcbiAgICB0aGlzLmJnLnNjcm9sbEZhY3RvclggPSAuNztcbiAgICB0aGlzLmJnLnNjcm9sbEZhY3RvclkgPSAuNztcblxuICAgIC8vd2Fsa2FibGUgdGlsZXNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoJ3RpbGVzJyk7XG5cbiAgICAvL2NvbGxpc2lvblxuICAgIHRoaXMubGF5ZXIucmVzaXplV29ybGQoKTtcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDEsMTA2LHRydWUsdGhpcy5sYXllcik7XG4gICAgbGV0IHRpbGVzQm9kaWVzID0gdGhpcy5waHlzaWNzLnAyLmNvbnZlcnRUaWxlbWFwKHRoaXMubWFwLCB0aGlzLmxheWVyKTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUxheWVyKCdkZWNvcmF0aXZlJyk7XG5cbiAgICAvL2dlbmVyYWwgd29ybGQgcHJvcGVydGllcyBhYm92ZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICAgIC8vYWRkIHdhdGVyIHdhdmVzIGlmIGFueVxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdtb3Zpbmd3YXZlcycsMTg0LCdvYmplY3RzMScsJ3dhdGVydGlsZScsdHJ1ZSxmYWxzZSx0aGlzLndvcmxkLFdhdmVzT2JqZWN0cyk7XG4gICAgLy9hZGQgdGhlIGRhbWFnZSB6b25lIGFzc29jaWF0ZWQgd2l0aCB0aGUgd2F0ZXIgYXJlYVxuICAgIHRoaXMuZGFtYWdlWm9uZSA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKDE3MDAsMzU4MCw4MDAsMTAwKTtcblxuICAgIC8vYWRkIHBsYXRmb3Jtc1xuICAgIHRoaXMucGxhdGZvcm1zR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpXG4gICAgbGV0IHNsaXBwZXJ5TWF0ZXJpYWxzID0gbmV3IEFycmF5KCk7XG4gICAgVG9vbHMuZmluZFVuaXF1ZUdJREluTGF5ZXIodGhpcy5tYXAsICdwbGF0Zm9ybXMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgLy9sb29rcyBsaWtlIGRvZXNudCBzdXBwb3J0IG9iamVjdCB1bmlxdWUgaWQgZm9yIG5vd1xuICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsZWxlbWVudC5naWQsJ29iamVjdHMxJyxlbGVtZW50Lm5hbWUsdHJ1ZSxmYWxzZSx0aGlzLnBsYXRmb3Jtc0dyb3VwLFBsYXRmb3Jtcyk7XG4gICAgfSk7XG4gICAgdGhpcy5wbGF0Zm9ybXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PnsvL3RoaXMgaXMgTk9UIGluIG9yZGVyIG9mIHRoZSBUaWxlZCBzaW5jZSB0aGUgYWJvdmUgYWRkIGFsbCBnaWRzIDE4MyBUSEVOIDE4MlxuICAgICAgc2xpcHBlcnlNYXRlcmlhbHMucHVzaCh0aGlzLnBoeXNpY3MucDIuY3JlYXRlTWF0ZXJpYWwoJ3NsaXBwZXJ5TWF0ZXJpYWwnLGNoaWxkLmJvZHkpKTtcbiAgICB9LHRoaXMpO1xuXG4gICAgLy9hZGQgYmxvY2tpbmcgb2JqZWN0c1xuICAgIHRoaXMuYmxvY2tpbmdHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgVG9vbHMuZmluZFVuaXF1ZUdJREluTGF5ZXIodGhpcy5tYXAsICdibG9ja2luZ29iamVjdHMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdibG9ja2luZ29iamVjdHMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMScsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5ibG9ja2luZ0dyb3VwLEJsb2NraW5nT2JqZWN0cyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBjb2xsZWN0YWJsZXNcbiAgICB0aGlzLmNvbGxlY3RhYmxlc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ2NvbGxlY3RhYmxlcycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnY29sbGVjdGFibGVzJyxlbGVtZW50LmdpZCwnb2JqZWN0czEnLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMuY29sbGVjdGFibGVzR3JvdXAsQ29sbGVjdGFibGVzKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIHdlYXBvbnNcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnd2VhcG9ucycsMTkwLCdvYmplY3RzMicsJ3N3b3JkMScsdHJ1ZSxmYWxzZSx0aGlzLmNvbGxlY3RhYmxlc0dyb3VwLENvbGxlY3RhYmxlcyk7XG5cbiAgICAvL2FkZCB0aGUgc3RhbGFjaXRlc1xuICAgIHRoaXMuc3RhbGFjaXRlc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ3N0YWxhY2l0ZXMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3N0YWxhY2l0ZXMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMicsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5zdGFsYWNpdGVzR3JvdXAsU3RhbGFjaXRlcyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCB0b3JpaXNcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygndG9yaWkxJywxOTMsJ29iamVjdHMyJywndG9yaWkxJyk7XG4gICAgLy9jcmVhdGUgdHdvIGdyYXBoaWNzIHJlY3RhbmdsZSB0byB0aGUgd29ybGRcbiAgICB0aGlzLnRvcmlpR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIHRoaXMudG9yaWlSZWN0MSA9IHRoaXMuYWRkLmdyYXBoaWNzKDE0ODAsODAwLHRoaXMudG9yaWlHcm91cCk7XG4gICAgLy90aGlzLnRvcmlpUmVjdDIgPSB0aGlzLmFkZC5ncmFwaGljcygxNTYwLDkwMCx0aGlzLnRvcmlpR3JvdXApO1xuICAgIHRoaXMudG9yaWlSZWN0MS5jbGVhcigpO1xuICAgIHRoaXMudG9yaWlSZWN0MS5kcmF3UmVjdCgwLDAsNTMwLDI4KTtcbiAgICAvL3RoaXMudG9yaWlSZWN0Mi5jbGVhcigpO1xuICAgIC8vdGhpcy50b3JpaVJlY3QyLmRyYXdSZWN0KDAsMCw0ODAsMjYpO1xuICAgIHRoaXMucGh5c2ljcy5wMi5lbmFibGUodGhpcy50b3JpaVJlY3QxLGZhbHNlKTtcbiAgICAvL3RoaXMucGh5c2ljcy5wMi5lbmFibGUodGhpcy50b3JpaVJlY3QyLHRydWUpO1xuICAgIHRoaXMudG9yaWlSZWN0MS5ib2R5LnN0YXRpYyA9IHRydWU7XG4gICAgLy90aGlzLnRvcmlpUmVjdDIuYm9keS5zdGF0aWMgPSB0cnVlO1xuICAgIFRvb2xzLmNvbnZlcnRUaWxlQ29vclRvUDIoMTQ4MCw4MDAsNTMwLDI4LHRoaXMudG9yaWlSZWN0MS5ib2R5KTtcbiAgICAvL1Rvb2xzLmNvbnZlcnRUaWxlQ29vclRvUDIoMTU2MCw5MDAsNDgwLDI2LHRoaXMudG9yaWlSZWN0Mi5ib2R5KTtcblxuICAgIC8vYWRkIGVudHJhbmNlIGRvb3JcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZG9vcicsMTc2LCdvYmplY3RzMScsJ2VudHJhbmNlZG9vcicsdHJ1ZSxmYWxzZSx0aGlzLndvcmxkLEVudHJhbmNlRG9vcik7XG4gICAgdGhpcy5lbnRyYW5jZWRvb3IgPSB0aGlzLndvcmxkLmdldFRvcCgpO1xuXG4gICAgLy9hZGQgcGxheWVyICYgcGxheWVyIHByb3BlcnRpZXNcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5nYW1lLDI2MCx0aGlzLndvcmxkLl9oZWlnaHQtMjAwKTtcbiAgICAvL3RoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmdhbWUsMTE1MCwzMjApO1xuICAgIC8vdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuZ2FtZSwxNTQ1LDEyNDApO1xuICAgIC8vdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuZ2FtZSwyNTgsMjcwKTtcblxuICAgIC8vcGxheWVyIG1hdGVyaWFsc1xuICAgIGxldCBwbGF5ZXJNYXRlcmlhbCA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVNYXRlcmlhbCgncGxheWVyTWF0ZXJpYWwnLCB0aGlzLnBsYXllci5ib2R5KTtcbiAgICAvL2NvbnRhY3QgbWF0ZXJpYWwgd2l0aCBzbGlwcGVyeSBwbGF0Zm9ybXMuLlxuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwocGxheWVyTWF0ZXJpYWwsIHNsaXBwZXJ5TWF0ZXJpYWxzWzBdLHtmcmljdGlvbjowLjM1LHN1cmZhY2VWZWxvY2l0eTotMTAwMH0pO1xuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwocGxheWVyTWF0ZXJpYWwsIHNsaXBwZXJ5TWF0ZXJpYWxzWzFdLHtmcmljdGlvbjowLjM1LHN1cmZhY2VWZWxvY2l0eToxMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbMl0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5Oi0xMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbM10se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5Oi0xMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbNF0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5Oi0xMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbNV0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5OjEwMDB9KTtcbiAgICB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29udGFjdE1hdGVyaWFsKHBsYXllck1hdGVyaWFsLCBzbGlwcGVyeU1hdGVyaWFsc1s2XSx7ZnJpY3Rpb246MC4zNSxzdXJmYWNlVmVsb2NpdHk6MTAwMH0pO1xuXG4gICAgdGhpcy5hZGQuZXhpc3RpbmcodGhpcy5wbGF5ZXIpO1xuXG4gICAgdGhpcy5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgIC8vYWRkIHRvcmlpMiBzcHJpdGUgaW4gZnJvbnQgb2YgcGxheWVyXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3RvcmlpMicsMTk0LCdvYmplY3RzMicsJ3RvcmlpMicpO1xuXG4gICAgLy9zdG9wIGFsbCBwcmV2aW91cyBwbGF5aW5nIHNvdW5kIGZpcnN0XG4gICAgdGhpcy5zb3VuZC5zdG9wQWxsKCk7XG4gICAgdGhpcy5zZnggPSB0aGlzLmFkZC5hdWRpb1Nwcml0ZSgnc2Z4Jyk7XG4gICAgdGhpcy50aGVtZSA9IHRoaXMuYWRkLmF1ZGlvU3ByaXRlKCd0aGVtZScpO1xuICAgIGlmKFRvb2xzLmdldERhdGEoJ211dGVzb3VuZCcpKVRvb2xzLm11dGVPclBsYXkodGhpcy5zZngsdHJ1ZSk7XG4gICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXRoZW1lJykpVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuXG4gICAgdGhpcy5wbGF5ZXIuc2Z4ID0gdGhpcy5zZng7XG5cbiAgICAvL2FkZCBlbmVteSByYXQgZ3J1bnRcbiAgICB0aGlzLnJhdEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncmF0Z3J1bnRzJywxODcsJ3JhdGdydW50JywnZnJhbWUwJyx0cnVlLGZhbHNlLHRoaXMucmF0R3JvdXAsUmF0R3J1bnQpO1xuXG4gICAgLy9hZGQgZW5lbXkgcmF0IHNvbGRpZXJzXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3JhdHNvbGRpZXJzJywxOTUsJ3JhdHNvbGRpZXInLCdoaXRmcmFtZTAnLHRydWUsZmFsc2UsdGhpcy5yYXRHcm91cCxSYXRTb2xkaWVyKTtcbiAgICB0aGlzLnJhdEdyb3VwLmZvckVhY2goKHJhdCk9PntcbiAgICAgIHJhdC5wbGF5ZXI9dGhpcy5wbGF5ZXI7XG4gICAgICByYXQuc2Z4ID0gdGhpcy5zZng7XG4gICAgICAvKlxuICAgICAgaWYocmF0Lm5hbWU9PT0ndW5pcXVlMSd8fHJhdC5uYW1lPT09J3VuaXF1ZTInKXJhdC5ldmVudHMub25LaWxsZWQuYWRkKCgpPT57XG4gICAgICAgIHRoaXMudW5pcXVlc2RpZWQrKztcbiAgICAgICAgY29uc29sZS5sb2cocmF0Lm5hbWUrXCIgZGllZCBcIik7XG4gICAgICB9LHRoaXMpOyovXG4gICAgfSx0aGlzKTtcblxuICAgIC8vdGhpcy51bmlxdWVzZGllZCA9IDA7XG4gICAgLy9hZGQgZW5lbXkgc3RvcHNcbiAgICB0aGlzLnN0b3BzR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIFRvb2xzLmZpbmRVbmlxdWVHSURJbkxheWVyKHRoaXMubWFwLCAnZW5lbXlzdG9wcycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZW5lbXlzdG9wcycsZWxlbWVudC5naWQsJ29iamVjdHMxJyxlbGVtZW50Lm5hbWUsdHJ1ZSxmYWxzZSx0aGlzLnN0b3BzR3JvdXAsRW5lbXlTdG9wcyk7XG4gICAgfSk7XG5cbiAgICAvL3RoZSBtb3N0IGZyb250IGxheWVyIHdoaWNoIHRvIGJlIGRpc3BsYXllZCBpbiBmcm9udCBvZiBwbGF5ZXJcbiAgICB0aGlzLm1hcC5jcmVhdGVMYXllcignZGVjb3JhdGl2ZTInKTtcblxuICAgIC8vVUkgc2V0dXBcbiAgICB0aGlzLmhlYWx0aEJhciA9IG5ldyBIZWFsdGhCYXIodGhpcy5nYW1lLDIwLDIwKTtcbiAgICB0aGlzLmVuZXJneUJhciA9IG5ldyBFbmVyZ3lCYXIodGhpcy5nYW1lLDMxLDgwKTtcbiAgICB0aGlzLnBsYXllci5lbmVyZ3lCYXIgPSB0aGlzLmVuZXJneUJhcjtcbiAgICB0aGlzLnBsYXllci5oZWFsdGhCYXIgPSB0aGlzLmhlYWx0aEJhcjtcblxuICAgIHRoaXMuY2hlZXNlU2NvcmUgPSBuZXcgQ2hlZXNlU2NvcmUodGhpcy5nYW1lLDQ2MCwyMCw5KTtcblxuICAgIC8vYWRkIGNvbGxpc2lvbiBncm91cHNcbiAgICAvLyAgVHVybiBvbiBpbXBhY3QgZXZlbnRzIGZvciB0aGUgd29ybGQsIHdpdGhvdXQgdGhpcyB3ZSBnZXQgbm8gY29sbGlzaW9uIGNhbGxiYWNrc1xuICAgIHRoaXMucGh5c2ljcy5wMi5zZXRJbXBhY3RFdmVudHModHJ1ZSk7XG5cbiAgICBsZXQgdGlsZXNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBwbGF0Zm9ybXNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBzdGFsYWNpdGVzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgdG9yaWlDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBwbGF5ZXJDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBoaXRib3hDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCByYXRIaXRib3hDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBibG9ja2luZ09iamVjdHNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBjb2xsZWN0YWJsZXNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCByYXRDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBzdG9wc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGVudHJhbmNlZG9vckNHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG5cbiAgICAvL3VwZGF0ZSB3b3JsZCBib3VuZHMgY29sbGlzaW9uIGdyb3VwICB0byBjb2xsaWRlIHdpdGggYWxsIHRoZSBjdXN0b20gY29sbGlzaW9uIGdyb3Vwc1xuICAgIHRoaXMucGh5c2ljcy5wMi51cGRhdGVCb3VuZHNDb2xsaXNpb25Hcm91cCgpO1xuICAgIC8vc2V0IHRoZSBjb2xsaXNpb25zXG4gICAgdGlsZXNCb2RpZXMuZm9yRWFjaCgodGlsZSk9PntcbiAgICAgIHRpbGUuc2V0Q29sbGlzaW9uR3JvdXAodGlsZXNDRyk7XG4gICAgICB0aWxlLmNvbGxpZGVzKFtwbGF5ZXJDRyxjb2xsZWN0YWJsZXNDRyxibG9ja2luZ09iamVjdHNDRyxyYXRDR10pO1xuICAgIH0pO1xuICAgIHRoaXMucGxhdGZvcm1zR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHBsYXRmb3Jtc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3BsYXllckNHLGNvbGxlY3RhYmxlc0NHLHJhdENHXSk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnN0YWxhY2l0ZXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoc3RhbGFjaXRlc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMocmF0Q0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmVuZW15SGl0TGlzdGVuZXIsdGhpcylcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMudG9yaWlHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAodG9yaWlDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFtwbGF5ZXJDRyxjb2xsZWN0YWJsZXNDRyxyYXRDR10pO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5zZXRDb2xsaXNpb25Hcm91cChwbGF5ZXJDRyk7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxzdGFsYWNpdGVzQ0csdG9yaWlDRyxibG9ja2luZ09iamVjdHNDRyxwbGF0Zm9ybXNDRyxjb2xsZWN0YWJsZXNDRyxyYXRDRyxyYXRIaXRib3hDRyxlbnRyYW5jZWRvb3JDR10sdGhpcy5wbGF0Zm9ybUhpdExpc3RlbmVyLHRoaXMpO1xuICAgIHRoaXMucGxheWVyLmhpdGJveDEuYm9keS5zZXRDb2xsaXNpb25Hcm91cChoaXRib3hDRyk7XG4gICAgdGhpcy5wbGF5ZXIuaGl0Ym94MS5ib2R5LmNvbGxpZGVzKHJhdENHLHRoaXMucGxheWVySGl0TGlzdGVuZXIsdGhpcyk7XG5cbiAgICB0aGlzLmJsb2NraW5nR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGJsb2NraW5nT2JqZWN0c0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3BsYXllckNHLGNvbGxlY3RhYmxlc0NHLHJhdENHLHRpbGVzQ0ddKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMuY29sbGVjdGFibGVzR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGNvbGxlY3RhYmxlc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3RpbGVzQ0cscGxhdGZvcm1zQ0csYmxvY2tpbmdPYmplY3RzQ0csdG9yaWlDR10pO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmNvbGxlY3RhYmxlc0xpc3RlbmVyLHRoaXMpO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5yYXRHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocmF0Q0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxwbGF0Zm9ybXNDRyx0b3JpaUNHLHN0YWxhY2l0ZXNDRyxibG9ja2luZ09iamVjdHNDRyxzdG9wc0NHLGhpdGJveENHXSk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKHBsYXllckNHLHRoaXMuZW5lbXlIaXRMaXN0ZW5lcix0aGlzKVxuICAgICAgaWYoY2hpbGQua2V5PT0ncmF0c29sZGllcicpe1xuICAgICAgICAvL2ZvciByYXQgc29sZGllcnMgb25seVxuICAgICAgICBjaGlsZC5oaXRib3gxLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocmF0SGl0Ym94Q0cpO1xuICAgICAgICBjaGlsZC5oaXRib3gxLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpO1xuICAgICAgfVxuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5zdG9wc0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChzdG9wc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMocmF0Q0cpO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5lbnRyYW5jZWRvb3IuYm9keS5zZXRDb2xsaXNpb25Hcm91cChlbnRyYW5jZWRvb3JDRyk7XG4gICAgdGhpcy5lbnRyYW5jZWRvb3IuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLm5leHRFcGlzb2RlLHRoaXMpO1xuXG4gICAgLy9sb2NrIGFycm93cyBrZXkgaW5wdXQgZnJvbSB0aGUgYnJvd3NlclxuICAgIHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5Q2FwdHVyZShbUGhhc2VyLktleWJvYXJkLlNQQUNFLFBoYXNlci5LZXlib2FyZC5VUCxQaGFzZXIuS2V5Ym9hcmQuTEVGVCxQaGFzZXIuS2V5Ym9hcmQuUklHSFRdKTtcbiAgICAvL2luaXRpYWxpemUgcG9wIHVwIHBhbmVscyxtYWluIHBvcCB1cCwgaW5zdHJ1Y3Rpb24sIHRpcDEuLi5OXG4gICAgLy9hZGQgZXNjIGtleSB0byBicmluZyB1cCBwb3AgdXAgcGFuZWxcbiAgICB0aGlzLm5hdmlLZXlzID0gdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXlzKHsgJ3VwJzogUGhhc2VyLktleUNvZGUuVVAsICdkb3duJzogUGhhc2VyLktleUNvZGUuRE9XTiwgJ2VudGVyJzogUGhhc2VyLktleUNvZGUuRU5URVIsICdlc2MnOlBoYXNlci5LZXlDb2RlLkVTQyB9ICk7XG4gICAgdGhpcy5uYXZpS2V5cy5lc2Mub25Eb3duLmFkZCgoKT0+e1xuICAgICAgaWYoIXRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLmdhbWUucGF1c2VkPXRydWU7XG4gICAgICAgIHRoaXMucG9wdXAgPSBuZXcgUG9wdXAodGhpcy5nYW1lLHRoaXMuY2FtZXJhLngsdGhpcy5jYW1lcmEueSwyKTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRDaGlsZCh0aGlzLnBvcHVwKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgfVxuXG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLnVwLm9uRG93bi5hZGQoKHRhcmdldCk9PnsvL3Nob3VsZCB0aGlzIGJlIGFkZGVkIGluc2lkZSB0aGUgUG9wdXAgY2xhcz9cbiAgICAgIC8vY29uc29sZS5sb2coXCJ1cFwiKTtcbiAgICAgIGlmKHRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLnBvcHVwLmN1cnNvck1vdmVkKHRhcmdldC5rZXlDb2RlKTtcbiAgICAgIH1cbiAgICB9LHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMuZG93bi5vbkRvd24uYWRkKCh0YXJnZXQpPT57XG4gICAgICAvL2NvbnNvbGUubG9nKFwiZG93blwiKTtcbiAgICAgIGlmKHRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLnBvcHVwLmN1cnNvck1vdmVkKHRhcmdldC5rZXlDb2RlKTtcbiAgICAgIH1cbiAgICB9LHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMuZW50ZXIub25Eb3duLmFkZCgoKT0+e1xuICAgICAgaWYodGhpcy5nYW1lLnBhdXNlZCl0aGlzLnByb2Nlc3NTZWxlY3Rpb24oKTtcbiAgICB9LHRoaXMpO1xuXG4gICAgdGhpcy5nYW1lLm9uUGF1c2UuYWRkKCgpPT57dGhpcy5zb3VuZC51bnNldE11dGUoKTt9LHRoaXMpOy8vPD09ZW5hYmxlIHRoZSBzb3VuZCB0byBjb250aW51ZSBwbGF5ICc7KSdcbiAgICB0aGlzLnRoZW1lLnNvdW5kc1snSGlkaW5nIFlvdXIgUmVhbGl0eSddLnBsYXkoJ0hpZGluZyBZb3VyIFJlYWxpdHknLG51bGwsMC40LHRydWUpO1xuXG4gICAgdGhpcy50aXRsZXRleHQgPSAgbmV3IFRpdGxlVGV4dCh0aGlzLmdhbWUsJ0VwIDIuIFRoZSBSYXQgSW5mZXN0YXRpb24nKTtcbiAgICB0aGlzLmFkZC5leGlzdGluZyh0aGlzLnRpdGxldGV4dCk7XG5cbiAgICAvL1RvIGdldCB0aGUgRlBTXG4gICAgdGhpcy50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcblxuICAgIHRoaXMudGlwc21hcmtlciA9IFtmYWxzZSxmYWxzZV07XG4gIH1cblxuICB1cGRhdGUoKXtcbiAgICAvL3dhdGVyIGFyZWEgaHVydHMgcGxheWVyXG4gICAgaWYodGhpcy5kYW1hZ2Vab25lLmludGVyc2VjdHNSYXcodGhpcy5wbGF5ZXIubGVmdCx0aGlzLnBsYXllci5yaWdodCx0aGlzLnBsYXllci50b3AsdGhpcy5wbGF5ZXIuYm90dG9tKSl7XG4gICAgICBUb29scy5wbGF5U291bmQodGhpcy5zZngsWydGb290c3RlcF9XYXRlcl8wNCcsJ0Zvb3RzdGVwX1dhdGVyXzA1JywnRm9vdHN0ZXBfV2F0ZXJfMDYnXSk7XG4gICAgICB0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoNCk7XG4gICAgfVxuXG4gICAgLy9pZih0aGlzLnVuaXF1ZXNkaWVkPT0yKXRoaXMudGlwc3BvcHBlcigxKTtcbiAgfVxuXG4gIG5leHRFcGlzb2RlKHRoaXNCb2R5LHRoYXRCb2R5KXtcbiAgICBpZih0aGF0Qm9keS5zcHJpdGUmJnRoYXRCb2R5LnNwcml0ZS5rZXk9PT0ncGxheWVyJyl7XG4gICAgICB0aGlzLmNoZWVzZVNjb3JlLmFkZFRvVG90YWxTY29yZSgyKTtcbiAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnLHRydWUsZmFsc2UsJ2VwMycpO1xuICAgIH1cbiAgfVxuXG4gIC8vLy8tLS0+IEluIEdhbWUgTWVudVxuICByZXN1bWVHYW1lKCl7XG4gICAgbGV0IHNvbWVwb3B1cCAgPSB0aGlzLndvcmxkLmdldFRvcCgpO1xuICAgIGlmKHNvbWVwb3B1cC5rZXk9PT0ncG9wdXAnKXtcbiAgICAgIHRoaXMud29ybGQucmVtb3ZlQ2hpbGQoc29tZXBvcHVwKTtcbiAgICAgIHNvbWVwb3B1cC5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuZ2FtZS5wYXVzZWQ9ZmFsc2U7XG4gIH1cblxuICAvL3Byb2Nlc3NpbmcgZm9yIHBvcCB1cCBtZW51IGl0ZW1zXG4gIHByb2Nlc3NTZWxlY3Rpb24oKXtcbiAgICAvL2xldCBwb3B1cFRleHQgPSB0aGlzLnBvcHVwLm9wdGlvbkVudGVyZWQoKTtcbiAgICBsZXQgcG9wdXBUZXh0ID0gdGhpcy53b3JsZC5nZXRUb3AoKS5vcHRpb25FbnRlcmVkKCk7XG4gICAgaWYoIXBvcHVwVGV4dCkgcmV0dXJuO1xuXG4gICAgY29uc29sZS5sb2coXCJlbnRlciBcIitwb3B1cFRleHQpO1xuICAgIC8vdGhpcyBndXkgaGFzIHRvIGRvIHRoZSBsaWZ0aW5nIGZvciB0aGUgb3B0aW9uc1xuICAgIHN3aXRjaChwb3B1cFRleHQpe1xuICAgICAgY2FzZSAnUmVzdW1lIEdhbWUnOlxuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUmVzdGFydCBFcGlzb2RlJzpcbiAgICAgICAgdGhpcy5yZXN1bWVHYW1lKCk7Ly9uZWVkIHRvIHVucGF1c2UgdGhlIGdhbWUgYmVmb3JlIGNoYW5nZSBzdGF0ZVxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdlcDInKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnSW5zdHJ1Y3Rpb25zJzpcbiAgICAgICAgdGhpcy5wb3B1cEluc3RydWN0aW9uID0gbmV3IFBvcHVwKHRoaXMuZ2FtZSx0aGlzLmNhbWVyYS54LHRoaXMuY2FtZXJhLnksMyk7XG4gICAgICAgIGxldCBpbnN0cnVjdGlvbiA9IHRoaXMuY2FjaGUuZ2V0SlNPTignY29uZmlnJykucG9wdXAuaW5zdHJ1Y3Rpb25zO1xuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24uc2V0VGl0bGUoaW5zdHJ1Y3Rpb25bJ3RpdGxlJ10pO1xuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24uc2V0RGVzY3JpcHRpb24oaW5zdHJ1Y3Rpb25bJ2Rlc2NyaXB0aW9uJ10sMCk7XG5cbiAgICAgICAgdGhpcy53b3JsZC5yZW1vdmVDaGlsZCh0aGlzLnBvcHVwKTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRDaGlsZCh0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24pO1xuICAgICAgICB0aGlzLmVuYWJsZUN1cnNvcktleXMoZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdHb3QgaXQhJzpcbiAgICAgICAgdGhpcy5lbmFibGVDdXJzb3JLZXlzKHRydWUpO1xuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUXVpdCB0byBNYWluIE1lbnUnOlxuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnbWVudScpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdXRlIE11c2ljJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJtdXRpbmcgbXVzaWMgXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGV0aGVtZScsdHJ1ZSk7XG4gICAgICAgIFRvb2xzLm11dGVPclBsYXkodGhpcy50aGVtZSx0cnVlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXV0ZSBTb3VuZCc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwibXV0aW5nIHNvdW5kXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGVzb3VuZCcsdHJ1ZSk7XG4gICAgICAgIFRvb2xzLm11dGVPclBsYXkodGhpcy5zZngsdHJ1ZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BsYXkgTXVzaWMnOlxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXlpbmcgbXVzaWNcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXRoZW1lJyxmYWxzZSk7XG4gICAgICAgIFRvb2xzLm11dGVPclBsYXkodGhpcy50aGVtZSxmYWxzZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BsYXkgU291bmQnOlxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXlpbmcgc291bmRcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXNvdW5kJyxmYWxzZSk7XG4gICAgICAgIFRvb2xzLm11dGVPclBsYXkodGhpcy5zZngsZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlQ3Vyc29yS2V5cyhib29sKXtcbiAgICAgIHRoaXMubmF2aUtleXMudXAuZW5hYmxlZCA9IGJvb2w7XG4gICAgICB0aGlzLm5hdmlLZXlzLmRvd24uZW5hYmxlZCA9IGJvb2w7XG4gIH1cblxuICBwbGF0Zm9ybUhpdExpc3RlbmVyKHRoaXNCb2R5LHRoYXRCb2R5LHRoaXNTaGFwZSx0aGF0U2hhcGUpe1xuICAgIGlmKHRoYXRCb2R5LnNwcml0ZSYmKHRoYXRCb2R5LnNwcml0ZS5mcmFtZU5hbWU9PSdzbGlwcGVyeTEnfHx0aGF0Qm9keS5zcHJpdGUuZnJhbWVOYW1lPT0nc2xpcHBlcnkyJykpe1xuICAgICAgVG9vbHMucGxheVNvdW5kKHRoaXMuc2Z4LFsnc2xpbWU3Jywnc2xpbWU4Jywnc2xpbWU5J10pO1xuICAgICAgdGhpcy5wbGF5ZXIub25zbGlwcHlwbGF0Zm9ybT10cnVlO1xuICAgIH1lbHNle1xuICAgICAgaWYodGhpcy5wbGF5ZXIub25zbGlwcHlwbGF0Zm9ybSl0aGlzLnBsYXllci5vbnNsaXBweXBsYXRmb3JtPWZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxlY3RhYmxlc0xpc3RlbmVyKHRoaXNCb2R5LHRoYXRCb2R5LHRoaXNTaGFwZSx0aGF0U2hhcGUpe1xuICAgIGlmKHRoYXRCb2R5LnNwcml0ZSYmdGhhdEJvZHkuc3ByaXRlLmtleT09PVwicGxheWVyXCIpe1xuICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY29udGFjdGVkIGJ5IFwiK3RoaXNCb2R5LnNwcml0ZS5mcmFtZU5hbWUpO1xuICAgICAgc3dpdGNoKHRoaXNCb2R5LnNwcml0ZS5mcmFtZU5hbWUpe1xuICAgICAgICBjYXNlICdjaGVlc2UxJzpcbiAgICAgICAgICAvL2luY3JlYXNlIHBsYXllciBlbmVyZ3kuLlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaEVuZXJneSgxMCk7XG4gICAgICAgICAgdGhpcy5jaGVlc2VTY29yZS5pbmNyZWFzZVNjb3JlKDIpO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjaGVlc2UyJzpcbiAgICAgICAgY2FzZSAnY2hlZXNlMyc6XG4gICAgICAgICAgLy9pbmNyZWFzZSBwbGF5ZXIgZW5lcmd5Li5cbiAgICAgICAgICB0aGlzLnBsYXllci5yZXBsZW5pc2hFbmVyZ3koNSk7XG4gICAgICAgICAgdGhpcy5jaGVlc2VTY29yZS5pbmNyZWFzZVNjb3JlKDEpO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3aW5lZ2xhc3MnOlxuICAgICAgICBjYXNlICdtYXJ0aW5pZ2xhc3MnOlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaExpZmUoMTApO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3aW5lYm90dGxlJzpcbiAgICAgICAgICB0aGlzLnBsYXllci5yZXBsZW5pc2hMaWZlKDIwKTtcbiAgICAgICAgICB0aGlzLnNmeC5wbGF5KCdSaXNlMDQnKTtcblxuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3dvcmQxJzpcbiAgICAgICAgICAvL3BhdXNlIHRoZSBnYW1lLCBicmluZyB1cCB0aGUgdGlwIHBvcCB1cFxuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ2NvbGxlY3Rzd29yZCcpO1xuICAgICAgICAgIHRoaXMucGxheWVyLmNoYW5nZUJvZHkoKTtcbiAgICAgICAgICB0aGlzLnRpcHNwb3BwZXIoMCk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIH1cbiAgICAgIC8vZmxhc2h5XG4gICAgICB0aGlzLnBsYXllci5mbGFzaCgnZ3JlZW4nKTtcbiAgICAgIC8vZGVzdHJveSB0aGUgc2FpZCBzcHJpdGVcbiAgICAgIHRoaXNCb2R5LnNwcml0ZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgdGlwc3BvcHBlcihpbmRleCl7XG4gICAgaWYodGhpcy50aXBzbWFya2VyW2luZGV4XSlyZXR1cm47XG5cbiAgICB0aGlzLmdhbWUucGF1c2VkPXRydWU7XG4gICAgbGV0IHRpcHBvcHVwID0gbmV3IFBvcHVwKHRoaXMuZ2FtZSx0aGlzLmNhbWVyYS54LHRoaXMuY2FtZXJhLnksMyk7XG4gICAgbGV0IHRpcCA9IHRoaXMuY2FjaGUuZ2V0SlNPTignY29uZmlnJykucG9wdXAuZXAyLnRpcHNbaW5kZXhdO1xuICAgIHRpcHBvcHVwLnNldFRpdGxlKHRpcFsndGl0bGUnXSk7XG4gICAgaWYodGlwWydkZXNjcmlwdGlvbiddKXRpcHBvcHVwLnNldERlc2NyaXB0aW9uKHRpcFsnZGVzY3JpcHRpb24nXSwwKTtcblxuICAgIHRoaXMudGlwc21hcmtlcltpbmRleF0gPSB0cnVlO1xuXG4gICAgdGhpcy53b3JsZC5hZGRDaGlsZCh0aXBwb3B1cCk7XG4gICAgdGhpcy5lbmFibGVDdXJzb3JLZXlzKGZhbHNlKTtcbiAgfVxuXG4gIGVuZW15SGl0TGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiZ0aGF0Qm9keS5zcHJpdGUua2V5PT09J3BsYXllcicpe1xuICAgICAgLy9Eb2VzIHRoZSB0aGluZ3MgdGhhdCBoaXQgcGxheWVyIGFsbCBoYXZlIHNwcml0ZSBzaGFwZT8gYW5kIGRlZmluZWQga2V5P1xuICAgICAgaWYodGhpc0JvZHkuc3ByaXRlKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3BsYXllciBoaXQgYnk6ICcrdGhpc0JvZHkuc3ByaXRlLmtleSsgJyAnK3RoaXNCb2R5LnNwcml0ZS5uYW1lKTtcbiAgICAgICAgc3dpdGNoKHRoaXNCb2R5LnNwcml0ZS5rZXkpe1xuICAgICAgICAgIGNhc2UgJ3JhdGdydW50JzovL3JhdCBncnVudFxuICAgICAgICAgICAgaWYodGhpc1NoYXBlPT09dGhpc0JvZHkuZGF0YS5zaGFwZXNbMF0pdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JhdHNvbGRpZXInOi8vcmF0IHNvbGRpZXJcbiAgICAgICAgICAgIGlmKHRoaXNTaGFwZT09PXRoaXNCb2R5LmRhdGEuc2hhcGVzWzBdKXRoaXMucGxheWVyLmRhbWFnZVBsYXllcig4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdvYmplY3RzMic6XG4gICAgICAgICAgICBsZXQgc3RyID0gdGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZTtcbiAgICAgICAgICAgIC8vYmVsb3cgbWF0Y2ggaXRzIGEgc3RhbGFjaXRlcyAtIHVwcGVyey9kfSBhbmQgYmVsb3cgey9kfVxuICAgICAgICAgICAgaWYoL151cHBlclxcZHsxfS8udGVzdChzdHIpfHwvXmJlbG93XFxkezF9Ly50ZXN0KHN0cikpdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29iamVjdHMxJzovL2NsdWJiZWQgYnkgc29sZGllclxuICAgICAgICAgICAgaWYodGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZT09J3N0b3AnKXRoaXMucGxheWVyLmRhbWFnZVBsYXllcig1LDIwMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5ZXJIaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICAgIC8vaGl0Ym94IG9ubHkgdGFyZ2V0IGlzIGVuZW15IHNvIHByZXR0eSBtdWNoIG5vIG5lZWQgdG8gY2hlY2tcbiAgICAgIGlmKHRoYXRCb2R5LnNwcml0ZSl7XG4gICAgICAgIHRoYXRCb2R5LnNwcml0ZS5kYW1hZ2VSYXQoOCw0MDApO1xuICAgICAgfVxuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy90aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLnRpbWUuZnBzIHx8ICctLScsIDIsIDE0LCBcIiNhN2FlYmVcIik7XG4gIH1cblxuICBzaHV0ZG93bigpe1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vcHJlZmFicy9QbGF5ZXIuanNcIjtcbmltcG9ydCBFbnRyYW5jZURvb3IgZnJvbSBcIi4uL3ByZWZhYnMvRW50cmFuY2VEb29yLmpzXCI7XG5pbXBvcnQgQmxvY2tpbmdPYmplY3RzIGZyb20gXCIuLi9wcmVmYWJzL0Jsb2NraW5nT2JqZWN0cy5qc1wiXG5pbXBvcnQgQ29sbGVjdGFibGVzIGZyb20gXCIuLi9wcmVmYWJzL0NvbGxlY3RhYmxlcy5qc1wiXG5pbXBvcnQgV2F2ZXNPYmplY3RzIGZyb20gXCIuLi9wcmVmYWJzL1dhdmVzT2JqZWN0cy5qc1wiXG5pbXBvcnQgUGxhdGZvcm1zIGZyb20gXCIuLi9wcmVmYWJzL1BsYXRmb3Jtcy5qc1wiXG5pbXBvcnQgSGVhbHRoQmFyIGZyb20gXCIuLi9wcmVmYWJzL0hlYWx0aEJhci5qc1wiXG5pbXBvcnQgRW5lcmd5QmFyIGZyb20gXCIuLi9wcmVmYWJzL0VuZXJneUJhci5qc1wiXG5pbXBvcnQgUmF0R3J1bnQgZnJvbSBcIi4uL3ByZWZhYnMvUmF0R3J1bnQuanNcIlxuaW1wb3J0IFJhdFNvbGRpZXIgZnJvbSBcIi4uL3ByZWZhYnMvUmF0U29sZGllci5qc1wiXG5pbXBvcnQgQ2F0IGZyb20gXCIuLi9wcmVmYWJzL0NhdC5qc1wiXG5pbXBvcnQgU3RhbGFjaXRlcyBmcm9tIFwiLi4vcHJlZmFicy9TdGFsYWNpdGVzLmpzXCJcbmltcG9ydCBFbmVteVN0b3BzIGZyb20gXCIuLi9wcmVmYWJzL0VuZW15U3RvcHMuanNcIlxuaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9wcmVmYWJzL1BvcHVwLmpzXCJcbmltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiXG5pbXBvcnQgQ2hlZXNlU2NvcmUgZnJvbSBcIi4uL3ByZWZhYnMvQ2hlZXNlU2NvcmUuanNcIlxuaW1wb3J0IFRpdGxlVGV4dCBmcm9tIFwiLi4vcHJlZmFicy9UaXRsZVRleHQuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcDMgZXh0ZW5kcyBQaGFzZXIuU3RhdGV7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy9vYmplY3QgbGV2ZWwgcHJvcGVydGllc1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBjcmVhdGUoKXtcblxuICAgIHRoaXMucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5QMkpTKTtcbiAgICB0aGlzLnBoeXNpY3MucDIuZ3Jhdml0eS55ID0gODAwO1xuICAgIC8vdGhpcyBzZXRzIHRoZSBkZWZhdWx0IGNvbnRhY3QgbWF0ZXJpYWwgdG8gYWxsIFAyIGJvZHkgaW4gdGhpcyB3b3JsZFxuICAgIHRoaXMucGh5c2ljcy5wMi53b3JsZC5kZWZhdWx0Q29udGFjdE1hdGVyaWFsLmZyaWN0aW9uID0gMC40MjsvL3BlcmZlY3Qgbm90IHRvIGJlIEFJUkJPUk5FXG4gICAgdGhpcy5waHlzaWNzLnAyLndvcmxkLnNldEdsb2JhbFN0aWZmbmVzcygxZTUpO1xuXG4gICAgLy9tYXAgc3RhcnRcbiAgICB0aGlzLm1hcCA9IHRoaXMuYWRkLnRpbGVtYXAoJ2VwMycpO1xuICAgIC8vYWRkIHRpbGVzZXQgaW1hZ2VcbiAgICB0aGlzLm1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGUnKTtcbiAgICAvL3BhcmFsbGF4IGJhY2tncm91bmRcbiAgICB0aGlzLmJnID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoJ2JhY2tncm91bmQnKTtcbiAgICB0aGlzLmJnLnNjcm9sbEZhY3RvclggPSAuNztcbiAgICB0aGlzLmJnLnNjcm9sbEZhY3RvclkgPSAuNztcblxuICAgIC8vd2Fsa2FibGUgdGlsZXNcbiAgICB0aGlzLmxheWVyID0gdGhpcy5tYXAuY3JlYXRlTGF5ZXIoJ3RpbGVzJyk7XG5cbiAgICAvL2NvbGxpc2lvblxuICAgIHRoaXMubGF5ZXIucmVzaXplV29ybGQoKTtcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDEsMTA2LHRydWUsdGhpcy5sYXllcik7XG4gICAgbGV0IHRpbGVzQm9kaWVzID0gdGhpcy5waHlzaWNzLnAyLmNvbnZlcnRUaWxlbWFwKHRoaXMubWFwLCB0aGlzLmxheWVyKTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUxheWVyKCdkZWNvcmF0aXZlJyk7XG5cbiAgICAvL2dlbmVyYWwgd29ybGQgcHJvcGVydGllcyBhYm92ZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICAgIC8vYWRkIHdhdGVyIHdhdmVzIGlmIGFueVxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdtb3Zpbmd3YXZlcycsMTg0LCdvYmplY3RzMScsJ3dhdGVydGlsZScsdHJ1ZSxmYWxzZSx0aGlzLndvcmxkLFdhdmVzT2JqZWN0cyk7XG4gICAgLy9hZGQgdGhlIGRhbWFnZSB6b25lIGFzc29jaWF0ZWQgd2l0aCB0aGUgd2F0ZXIgYXJlYVxuICAgIHRoaXMuZGFtYWdlWm9uZSA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKDE1MCwzNzAwLDMwMCwxMjApO1xuICAgIHRoaXMuZGFtYWdlWm9uZTEgPSBuZXcgUGhhc2VyLlJlY3RhbmdsZSgxNTQwLDExNjAsNDAwLDEyMCk7XG5cbiAgICAvL2FkZCBwbGF0Zm9ybXNcbiAgICB0aGlzLnBsYXRmb3Jtc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKVxuICAgIGxldCBzbGlwcGVyeU1hdGVyaWFscyA9IG5ldyBBcnJheSgpO1xuICAgIFRvb2xzLmZpbmRVbmlxdWVHSURJbkxheWVyKHRoaXMubWFwLCAncGxhdGZvcm1zJykuZm9yRWFjaCgoZWxlbWVudCk9PntcbiAgICAgIC8vbG9va3MgbGlrZSBkb2VzbnQgc3VwcG9ydCBvYmplY3QgdW5pcXVlIGlkIGZvciBub3dcbiAgICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMScsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5wbGF0Zm9ybXNHcm91cCxQbGF0Zm9ybXMpO1xuICAgIH0pO1xuICAgIHRoaXMucGxhdGZvcm1zR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57Ly90aGlzIGlzIE5PVCBpbiBvcmRlciBvZiB0aGUgVGlsZWQgc2luY2UgdGhlIGFib3ZlIGFkZCBhbGwgZ2lkcyAxODMgVEhFTiAxODJcbiAgICAgIHNsaXBwZXJ5TWF0ZXJpYWxzLnB1c2godGhpcy5waHlzaWNzLnAyLmNyZWF0ZU1hdGVyaWFsKCdzbGlwcGVyeU1hdGVyaWFsJyxjaGlsZC5ib2R5KSk7XG4gICAgfSx0aGlzKTtcblxuICAgIC8vYWRkIGJsb2NraW5nIG9iamVjdHNcbiAgICB0aGlzLmJsb2NraW5nR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIFRvb2xzLmZpbmRVbmlxdWVHSURJbkxheWVyKHRoaXMubWFwLCAnYmxvY2tpbmdvYmplY3RzJykuZm9yRWFjaCgoZWxlbWVudCk9PntcbiAgICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnYmxvY2tpbmdvYmplY3RzJyxlbGVtZW50LmdpZCwnb2JqZWN0czEnLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMuYmxvY2tpbmdHcm91cCxCbG9ja2luZ09iamVjdHMpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgY29sbGVjdGFibGVzXG4gICAgdGhpcy5jb2xsZWN0YWJsZXNHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgVG9vbHMuZmluZFVuaXF1ZUdJREluTGF5ZXIodGhpcy5tYXAsICdjb2xsZWN0YWJsZXMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ2NvbGxlY3RhYmxlcycsZWxlbWVudC5naWQsJ29iamVjdHMxJyxlbGVtZW50Lm5hbWUsdHJ1ZSxmYWxzZSx0aGlzLmNvbGxlY3RhYmxlc0dyb3VwLENvbGxlY3RhYmxlcyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCB0aGUgc3RhbGFjaXRlc1xuICAgIHRoaXMuc3RhbGFjaXRlc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ3N0YWxhY2l0ZXMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3N0YWxhY2l0ZXMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMicsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5zdGFsYWNpdGVzR3JvdXAsU3RhbGFjaXRlcyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBlbnRyYW5jZSBkb29yXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ2Rvb3InLDE3Niwnb2JqZWN0czEnLCdlbnRyYW5jZWRvb3InLHRydWUsZmFsc2UsdGhpcy53b3JsZCxFbnRyYW5jZURvb3IpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yID0gdGhpcy53b3JsZC5nZXRUb3AoKTtcblxuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmdhbWUsMTUwLDI4NTApOy8vc3RhcnQgcG9zXG4gICAgLy90aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5nYW1lLDE5NzUsMTUwKTtcbiAgICAvL3RoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmdhbWUsODYwLDY1MCk7XG4gICAgLy90aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5nYW1lLDI5NywyMDApO1xuICAgIC8vcGxheWVyIG1hdGVyaWFsc1xuICAgIGxldCBwbGF5ZXJNYXRlcmlhbCA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVNYXRlcmlhbCgncGxheWVyTWF0ZXJpYWwnLCB0aGlzLnBsYXllci5ib2R5KTtcbiAgICAvL2NvbnRhY3QgbWF0ZXJpYWwgd2l0aCBzbGlwcGVyeSBwbGF0Zm9ybXMuLlxuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwocGxheWVyTWF0ZXJpYWwsIHNsaXBwZXJ5TWF0ZXJpYWxzWzBdLHtmcmljdGlvbjowLjM1LHN1cmZhY2VWZWxvY2l0eToxMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbMV0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5Oi0xMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbMl0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5OjEwMDB9KTtcbiAgICB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29udGFjdE1hdGVyaWFsKHBsYXllck1hdGVyaWFsLCBzbGlwcGVyeU1hdGVyaWFsc1szXSx7ZnJpY3Rpb246MC4zNSxzdXJmYWNlVmVsb2NpdHk6LTEwMDB9KTtcbiAgICB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29udGFjdE1hdGVyaWFsKHBsYXllck1hdGVyaWFsLCBzbGlwcGVyeU1hdGVyaWFsc1s0XSx7ZnJpY3Rpb246MC4zNSxzdXJmYWNlVmVsb2NpdHk6LTEwMDB9KTtcblxuICAgIHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcik7XG5cbiAgICAvL3N0b3AgYWxsIHByZXZpb3VzIHBsYXlpbmcgc291bmQgZmlyc3RcbiAgICB0aGlzLnNvdW5kLnN0b3BBbGwoKTtcbiAgICB0aGlzLnNmeCA9IHRoaXMuYWRkLmF1ZGlvU3ByaXRlKCdzZngnKTtcbiAgICB0aGlzLnRoZW1lID0gdGhpcy5hZGQuYXVkaW9TcHJpdGUoJ3RoZW1lJyk7XG4gICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXNvdW5kJykpVG9vbHMubXV0ZU9yUGxheSh0aGlzLnNmeCx0cnVlKTtcbiAgICBpZihUb29scy5nZXREYXRhKCdtdXRldGhlbWUnKSlUb29scy5tdXRlT3JQbGF5KHRoaXMudGhlbWUsdHJ1ZSk7XG5cbiAgICB0aGlzLnBsYXllci5zZnggPSB0aGlzLnNmeDtcblxuICAgIC8vYWRkIGVuZW15IHJhdCBncnVudFxuICAgIHRoaXMucmF0R3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdyYXRncnVudHMnLDE4NywncmF0Z3J1bnQnLCdmcmFtZTAnLHRydWUsZmFsc2UsdGhpcy5yYXRHcm91cCxSYXRHcnVudCk7XG4gICAgdGhpcy5yYXRHcm91cC5mb3JFYWNoKChyYXRHcnVudCk9PntcbiAgICAgIHJhdEdydW50LnBsYXllcj10aGlzLnBsYXllcjtcbiAgICAgIHJhdEdydW50LnNmeCA9IHRoaXMuc2Z4O1xuICAgIH0sdGhpcyk7XG5cbiAgICAvL2FkZCBlbmVteSByYXQgc29sZGllcnNcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncmF0c29sZGllcnMnLDE5MSwncmF0c29sZGllcicsJ2hpdGZyYW1lMCcsdHJ1ZSxmYWxzZSx0aGlzLnJhdEdyb3VwLFJhdFNvbGRpZXIpO1xuICAgIHRoaXMucmF0R3JvdXAuZm9yRWFjaCgocmF0U29sZGllcik9PntcbiAgICAgIHJhdFNvbGRpZXIucGxheWVyPXRoaXMucGxheWVyO1xuICAgICAgcmF0U29sZGllci5zZnggPSB0aGlzLnNmeDtcbiAgICB9LHRoaXMpO1xuXG4gICAgdGhpcy5jYXRHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ2NhdHMnLDE5NCwnY2F0JywnZnJhbWUwJyx0cnVlLGZhbHNlLHRoaXMuY2F0R3JvdXAsQ2F0KTtcblxuXG4gICAgLy9hZGQgZW5lbXkgc3RvcHNcbiAgICB0aGlzLnN0b3BzR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIFRvb2xzLmZpbmRVbmlxdWVHSURJbkxheWVyKHRoaXMubWFwLCAnZW5lbXlzdG9wcycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZW5lbXlzdG9wcycsZWxlbWVudC5naWQsJ29iamVjdHMxJyxlbGVtZW50Lm5hbWUsdHJ1ZSxmYWxzZSx0aGlzLnN0b3BzR3JvdXAsRW5lbXlTdG9wcyk7XG4gICAgfSk7XG5cbiAgICAvL3RoZSBtb3N0IGZyb250IGxheWVyIHdoaWNoIHRvIGJlIGRpc3BsYXllZCBpbiBmcm9udCBvZiBwbGF5ZXJcbiAgICB0aGlzLm1hcC5jcmVhdGVMYXllcignZGVjb3JhdGl2ZTInKTtcblxuICAgIC8vVUkgc2V0dXBcbiAgICB0aGlzLmhlYWx0aEJhciA9IG5ldyBIZWFsdGhCYXIodGhpcy5nYW1lLDIwLDIwKTtcbiAgICB0aGlzLmVuZXJneUJhciA9IG5ldyBFbmVyZ3lCYXIodGhpcy5nYW1lLDMxLDgwKTtcbiAgICB0aGlzLnBsYXllci5lbmVyZ3lCYXIgPSB0aGlzLmVuZXJneUJhcjtcbiAgICB0aGlzLnBsYXllci5oZWFsdGhCYXIgPSB0aGlzLmhlYWx0aEJhcjtcblxuICAgIHRoaXMuY2hlZXNlU2NvcmUgPSBuZXcgQ2hlZXNlU2NvcmUodGhpcy5nYW1lLDQ2MCwyMCwxNSk7XG5cbiAgICAvL2FkZCBjb2xsaXNpb24gZ3JvdXBzXG4gICAgLy8gIFR1cm4gb24gaW1wYWN0IGV2ZW50cyBmb3IgdGhlIHdvcmxkLCB3aXRob3V0IHRoaXMgd2UgZ2V0IG5vIGNvbGxpc2lvbiBjYWxsYmFja3NcbiAgICB0aGlzLnBoeXNpY3MucDIuc2V0SW1wYWN0RXZlbnRzKHRydWUpO1xuXG4gICAgbGV0IHRpbGVzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgcGxhdGZvcm1zQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgc3RhbGFjaXRlc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHBsYXllckNHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGhpdGJveENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHJhdEhpdGJveENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGNhdEJhbGxzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgYmxvY2tpbmdPYmplY3RzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgY29sbGVjdGFibGVzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgcmF0Q0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgY2F0Q0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgc3RvcHNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBlbnRyYW5jZWRvb3JDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuXG4gICAgLy91cGRhdGUgd29ybGQgYm91bmRzIGNvbGxpc2lvbiBncm91cCAgdG8gY29sbGlkZSB3aXRoIGFsbCB0aGUgY3VzdG9tIGNvbGxpc2lvbiBncm91cHNcbiAgICB0aGlzLnBoeXNpY3MucDIudXBkYXRlQm91bmRzQ29sbGlzaW9uR3JvdXAoKTtcbiAgICAvL3NldCB0aGUgY29sbGlzaW9uc1xuICAgIC8vdGlsZSBtYXRlcmlhbHNcbiAgICBsZXQgdGlsZU1hdGVyaWFsID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZU1hdGVyaWFsKCd0aWxlTWF0ZXJpYWwnKTtcbiAgICB0aWxlc0JvZGllcy5mb3JFYWNoKCh0aWxlKT0+e1xuICAgICAgdGlsZS5zZXRNYXRlcmlhbCh0aWxlTWF0ZXJpYWwpO1xuICAgICAgdGlsZS5zZXRDb2xsaXNpb25Hcm91cCh0aWxlc0NHKTtcbiAgICAgIHRpbGUuY29sbGlkZXMoW3BsYXllckNHLGNvbGxlY3RhYmxlc0NHLGJsb2NraW5nT2JqZWN0c0NHLHJhdENHLGNhdENHLGNhdEJhbGxzQ0ddKTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYXRmb3Jtc0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChwbGF0Zm9ybXNDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFtwbGF5ZXJDRyxjb2xsZWN0YWJsZXNDRyxyYXRDRyxjYXRDRyxjYXRCYWxsc0NHXSk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnN0YWxhY2l0ZXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoc3RhbGFjaXRlc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpXG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnBsYXllci5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHBsYXllckNHKTtcbiAgICB0aGlzLnBsYXllci5ib2R5LmNvbGxpZGVzKFt0aWxlc0NHLHN0YWxhY2l0ZXNDRyxibG9ja2luZ09iamVjdHNDRyxwbGF0Zm9ybXNDRyxjb2xsZWN0YWJsZXNDRyxyYXRDRyxjYXRDRyxyYXRIaXRib3hDRyxjYXRCYWxsc0NHLGVudHJhbmNlZG9vckNHXSx0aGlzLnBsYXRmb3JtSGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgdGhpcy5wbGF5ZXIuaGl0Ym94MS5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGhpdGJveENHKTtcbiAgICB0aGlzLnBsYXllci5oaXRib3gxLmJvZHkuY29sbGlkZXMoW3JhdENHLGNhdENHLGNhdEJhbGxzQ0ddLHRoaXMucGxheWVySGl0TGlzdGVuZXIsdGhpcyk7XG5cbiAgICB0aGlzLmJsb2NraW5nR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGJsb2NraW5nT2JqZWN0c0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3BsYXllckNHLGNvbGxlY3RhYmxlc0NHLHJhdENHLHRpbGVzQ0csY2F0Q0csY2F0QmFsbHNDR10pO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5jb2xsZWN0YWJsZXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoY29sbGVjdGFibGVzQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxwbGF0Zm9ybXNDRyxibG9ja2luZ09iamVjdHNDR10pO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmNvbGxlY3RhYmxlc0xpc3RlbmVyLHRoaXMpO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5yYXRHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocmF0Q0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxwbGF0Zm9ybXNDRyxibG9ja2luZ09iamVjdHNDRyxzdG9wc0NHLGhpdGJveENHXSk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKHBsYXllckNHLHRoaXMuZW5lbXlIaXRMaXN0ZW5lcix0aGlzKVxuICAgICAgaWYoY2hpbGQua2V5PT0ncmF0c29sZGllcicpe1xuICAgICAgICAvL2ZvciByYXQgc29sZGllcnMgb25seVxuICAgICAgICBjaGlsZC5oaXRib3gxLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocmF0SGl0Ym94Q0cpO1xuICAgICAgICBjaGlsZC5oaXRib3gxLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpO1xuICAgICAgfVxuICAgIH0sdGhpcyk7XG4gICAgbGV0IGJhbGxNYXRlcmlhbCA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVNYXRlcmlhbCgnYmFsbE1hdGVyaWFsJyk7XG4gICAgdGhpcy5jYXRHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoY2F0Q0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxwbGF0Zm9ybXNDRyxibG9ja2luZ09iamVjdHNDRyxzdG9wc0NHLGhpdGJveENHXSk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKHBsYXllckNHLHRoaXMuZW5lbXlIaXRMaXN0ZW5lcix0aGlzKTtcbiAgICAgIGNoaWxkLmJhbGxzLmZvckVhY2goKGJhbGwpPT57XG4gICAgICAgIGJhbGwuYm9keS5zZXRNYXRlcmlhbChiYWxsTWF0ZXJpYWwpO1xuICAgICAgICBiYWxsLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoY2F0QmFsbHNDRyk7XG4gICAgICAgIGJhbGwuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxwbGF0Zm9ybXNDRyxibG9ja2luZ09iamVjdHNDRyxoaXRib3hDR10pO1xuICAgICAgICBiYWxsLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpO1xuICAgICAgfSxjaGlsZCk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnN0b3BzR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHN0b3BzQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbcmF0Q0csY2F0Q0ddKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoZW50cmFuY2Vkb29yQ0cpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5uZXh0RXBpc29kZSx0aGlzKTtcblxuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwodGlsZU1hdGVyaWFsLCBiYWxsTWF0ZXJpYWwse2ZyaWN0aW9uOjAuMixyZXN0aXR1dGlvbjowLjh9KTtcblxuXG4gICAgLy9sb2NrIGFycm93cyBrZXkgaW5wdXQgZnJvbSB0aGUgYnJvd3NlclxuICAgIHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5Q2FwdHVyZShbUGhhc2VyLktleWJvYXJkLlNQQUNFLFBoYXNlci5LZXlib2FyZC5VUCxQaGFzZXIuS2V5Ym9hcmQuTEVGVCxQaGFzZXIuS2V5Ym9hcmQuUklHSFRdKTtcbiAgICAvL2luaXRpYWxpemUgcG9wIHVwIHBhbmVscyxtYWluIHBvcCB1cCwgaW5zdHJ1Y3Rpb24sIHRpcDEuLi5OXG4gICAgLy9hZGQgZXNjIGtleSB0byBicmluZyB1cCBwb3AgdXAgcGFuZWxcbiAgICB0aGlzLm5hdmlLZXlzID0gdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXlzKHsgJ3VwJzogUGhhc2VyLktleUNvZGUuVVAsICdkb3duJzogUGhhc2VyLktleUNvZGUuRE9XTiwgJ2VudGVyJzogUGhhc2VyLktleUNvZGUuRU5URVIsICdlc2MnOlBoYXNlci5LZXlDb2RlLkVTQyB9ICk7XG4gICAgdGhpcy5uYXZpS2V5cy5lc2Mub25Eb3duLmFkZCgoKT0+e1xuICAgICAgaWYoIXRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLmdhbWUucGF1c2VkPXRydWU7XG4gICAgICAgIHRoaXMucG9wdXAgPSBuZXcgUG9wdXAodGhpcy5nYW1lLHRoaXMuY2FtZXJhLngsdGhpcy5jYW1lcmEueSwyKTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRDaGlsZCh0aGlzLnBvcHVwKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgfVxuXG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLnVwLm9uRG93bi5hZGQoKHRhcmdldCk9PnsvL3Nob3VsZCB0aGlzIGJlIGFkZGVkIGluc2lkZSB0aGUgUG9wdXAgY2xhcz9cbiAgICAgIC8vY29uc29sZS5sb2coXCJ1cFwiKTtcbiAgICAgIGlmKHRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLnBvcHVwLmN1cnNvck1vdmVkKHRhcmdldC5rZXlDb2RlKTtcbiAgICAgIH1cbiAgICB9LHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMuZG93bi5vbkRvd24uYWRkKCh0YXJnZXQpPT57XG4gICAgICAvL2NvbnNvbGUubG9nKFwiZG93blwiKTtcbiAgICAgIGlmKHRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLnBvcHVwLmN1cnNvck1vdmVkKHRhcmdldC5rZXlDb2RlKTtcbiAgICAgIH1cbiAgICB9LHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMuZW50ZXIub25Eb3duLmFkZCgoKT0+e1xuICAgICAgaWYodGhpcy5nYW1lLnBhdXNlZCl0aGlzLnByb2Nlc3NTZWxlY3Rpb24oKTtcbiAgICB9LHRoaXMpO1xuXG4gICAgdGhpcy5nYW1lLm9uUGF1c2UuYWRkKGZ1bmN0aW9uKCl7dGhpcy5zb3VuZC51bnNldE11dGUoKTt9LHRoaXMpOy8vPD09ZW5hYmxlIHRoZSBzb3VuZCB0byBjb250aW51ZSBwbGF5ICc7KSdcbiAgICB0aGlzLnRoZW1lLnNvdW5kc1snT2JsaXRlcmF0aW9uJ10ucGxheSgnT2JsaXRlcmF0aW9uJyxudWxsLDAuMyx0cnVlKTtcblxuICAgIHRoaXMudGl0bGV0ZXh0ID0gIG5ldyBUaXRsZVRleHQodGhpcy5nYW1lLCdFcCAzLiBUaGUgRmx5aW5nIE1lbmFjZScpO1xuICAgIHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMudGl0bGV0ZXh0KTtcblxuICAgIC8vVG8gZ2V0IHRoZSBGUFNcbiAgICB0aGlzLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xuXG4gIH1cblxuICB1cGRhdGUoKXtcbiAgICAvL3dhdGVyIGFyZWEgaHVydHMgcGxheWVyXG4gICAgaWYodGhpcy5kYW1hZ2Vab25lLmludGVyc2VjdHNSYXcodGhpcy5wbGF5ZXIubGVmdCx0aGlzLnBsYXllci5yaWdodCx0aGlzLnBsYXllci50b3AsdGhpcy5wbGF5ZXIuYm90dG9tKXx8dGhpcy5kYW1hZ2Vab25lMS5pbnRlcnNlY3RzUmF3KHRoaXMucGxheWVyLmxlZnQsdGhpcy5wbGF5ZXIucmlnaHQsdGhpcy5wbGF5ZXIudG9wLHRoaXMucGxheWVyLmJvdHRvbSkpe1xuICAgICAgVG9vbHMucGxheVNvdW5kKHRoaXMuc2Z4LFsnRm9vdHN0ZXBfV2F0ZXJfMDQnLCdGb290c3RlcF9XYXRlcl8wNScsJ0Zvb3RzdGVwX1dhdGVyXzA2J10pO1xuICAgICAgdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDQpO1xuICAgIH1cbiAgfVxuXG4gIG5leHRFcGlzb2RlKHRoaXNCb2R5LHRoYXRCb2R5KXtcbiAgICBpZih0aGF0Qm9keS5zcHJpdGUmJnRoYXRCb2R5LnNwcml0ZS5rZXk9PT0ncGxheWVyJyl7XG4gICAgICB0aGlzLmNoZWVzZVNjb3JlLmFkZFRvVG90YWxTY29yZSgzKTtcbiAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnLHRydWUsZmFsc2UsJ2VwNCcpO1xuICAgIH1cbiAgfVxuXG4gIC8vLy8tLS0+IEluIEdhbWUgTWVudVxuICByZXN1bWVHYW1lKCl7XG4gICAgbGV0IHNvbWVwb3B1cCAgPSB0aGlzLndvcmxkLmdldFRvcCgpO1xuICAgIGlmKHNvbWVwb3B1cC5rZXk9PT0ncG9wdXAnKXtcbiAgICAgIHRoaXMud29ybGQucmVtb3ZlQ2hpbGQoc29tZXBvcHVwKTtcbiAgICAgIHNvbWVwb3B1cC5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuZ2FtZS5wYXVzZWQ9ZmFsc2U7XG4gIH1cblxuICAvL3Byb2Nlc3NpbmcgZm9yIHBvcCB1cCBtZW51IGl0ZW1zXG4gIHByb2Nlc3NTZWxlY3Rpb24oKXtcbiAgICAvL2xldCBwb3B1cFRleHQgPSB0aGlzLnBvcHVwLm9wdGlvbkVudGVyZWQoKTtcbiAgICBsZXQgcG9wdXBUZXh0ID0gdGhpcy53b3JsZC5nZXRUb3AoKS5vcHRpb25FbnRlcmVkKCk7XG4gICAgaWYoIXBvcHVwVGV4dCkgcmV0dXJuO1xuXG4gICAgY29uc29sZS5sb2coXCJlbnRlciBcIitwb3B1cFRleHQpO1xuICAgIC8vdGhpcyBndXkgaGFzIHRvIGRvIHRoZSBsaWZ0aW5nIGZvciB0aGUgb3B0aW9uc1xuICAgIHN3aXRjaChwb3B1cFRleHQpe1xuICAgICAgY2FzZSAnUmVzdW1lIEdhbWUnOlxuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUmVzdGFydCBFcGlzb2RlJzpcbiAgICAgICAgdGhpcy5yZXN1bWVHYW1lKCk7Ly9uZWVkIHRvIHVucGF1c2UgdGhlIGdhbWUgYmVmb3JlIGNoYW5nZSBzdGF0ZVxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdlcDMnKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnSW5zdHJ1Y3Rpb25zJzpcbiAgICAgICAgdGhpcy5wb3B1cEluc3RydWN0aW9uID0gbmV3IFBvcHVwKHRoaXMuZ2FtZSx0aGlzLmNhbWVyYS54LHRoaXMuY2FtZXJhLnksMyk7XG4gICAgICAgIGxldCBpbnN0cnVjdGlvbiA9IHRoaXMuY2FjaGUuZ2V0SlNPTignY29uZmlnJykucG9wdXAuaW5zdHJ1Y3Rpb25zO1xuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24uc2V0VGl0bGUoaW5zdHJ1Y3Rpb25bJ3RpdGxlJ10pO1xuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24uc2V0RGVzY3JpcHRpb24oaW5zdHJ1Y3Rpb25bJ2Rlc2NyaXB0aW9uJ10sMCk7XG5cbiAgICAgICAgdGhpcy53b3JsZC5yZW1vdmVDaGlsZCh0aGlzLnBvcHVwKTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRDaGlsZCh0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24pO1xuICAgICAgICB0aGlzLmVuYWJsZUN1cnNvcktleXMoZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdHb3QgaXQhJzpcbiAgICAgICAgdGhpcy5lbmFibGVDdXJzb3JLZXlzKHRydWUpO1xuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUXVpdCB0byBNYWluIE1lbnUnOlxuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnbWVudScpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdXRlIE11c2ljJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJtdXRpbmcgbXVzaWMgXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGV0aGVtZScsdHJ1ZSk7XG4gICAgICAgIFRvb2xzLm11dGVPclBsYXkodGhpcy50aGVtZSx0cnVlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTXV0ZSBTb3VuZCc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwibXV0aW5nIHNvdW5kXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGVzb3VuZCcsdHJ1ZSk7XG4gICAgICAgIFRvb2xzLm11dGVPclBsYXkodGhpcy5zZngsdHJ1ZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BsYXkgTXVzaWMnOlxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXlpbmcgbXVzaWNcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXRoZW1lJyxmYWxzZSk7XG4gICAgICAgIFRvb2xzLm11dGVPclBsYXkodGhpcy50aGVtZSxmYWxzZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BsYXkgU291bmQnOlxuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXlpbmcgc291bmRcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXNvdW5kJyxmYWxzZSk7XG4gICAgICAgIFRvb2xzLm11dGVPclBsYXkodGhpcy5zZngsZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlQ3Vyc29yS2V5cyhib29sKXtcbiAgICAgIHRoaXMubmF2aUtleXMudXAuZW5hYmxlZCA9IGJvb2w7XG4gICAgICB0aGlzLm5hdmlLZXlzLmRvd24uZW5hYmxlZCA9IGJvb2w7XG4gIH1cblxuICBwbGF0Zm9ybUhpdExpc3RlbmVyKHRoaXNCb2R5LHRoYXRCb2R5LHRoaXNTaGFwZSx0aGF0U2hhcGUpe1xuICAgIGlmKHRoYXRCb2R5LnNwcml0ZSYmKHRoYXRCb2R5LnNwcml0ZS5mcmFtZU5hbWU9PSdzbGlwcGVyeTEnfHx0aGF0Qm9keS5zcHJpdGUuZnJhbWVOYW1lPT0nc2xpcHBlcnkyJykpe1xuICAgICAgVG9vbHMucGxheVNvdW5kKHRoaXMuc2Z4LFsnc2xpbWU3Jywnc2xpbWU4Jywnc2xpbWU5J10pO1xuICAgICAgdGhpcy5wbGF5ZXIub25zbGlwcHlwbGF0Zm9ybT10cnVlO1xuICAgIH1lbHNle1xuICAgICAgaWYodGhpcy5wbGF5ZXIub25zbGlwcHlwbGF0Zm9ybSl0aGlzLnBsYXllci5vbnNsaXBweXBsYXRmb3JtPWZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxlY3RhYmxlc0xpc3RlbmVyKHRoaXNCb2R5LHRoYXRCb2R5LHRoaXNTaGFwZSx0aGF0U2hhcGUpe1xuICAgIGlmKHRoYXRCb2R5LnNwcml0ZSYmdGhhdEJvZHkuc3ByaXRlLmtleT09PVwicGxheWVyXCIpe1xuICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgY29udGFjdGVkIGJ5IFwiK3RoaXNCb2R5LnNwcml0ZS5mcmFtZU5hbWUpO1xuICAgICAgc3dpdGNoKHRoaXNCb2R5LnNwcml0ZS5mcmFtZU5hbWUpe1xuICAgICAgICBjYXNlICdjaGVlc2UxJzpcbiAgICAgICAgICAvL2luY3JlYXNlIHBsYXllciBlbmVyZ3kuLlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaEVuZXJneSgxMCk7XG4gICAgICAgICAgdGhpcy5jaGVlc2VTY29yZS5pbmNyZWFzZVNjb3JlKDIpO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjaGVlc2UyJzpcbiAgICAgICAgY2FzZSAnY2hlZXNlMyc6XG4gICAgICAgICAgLy9pbmNyZWFzZSBwbGF5ZXIgZW5lcmd5Li5cbiAgICAgICAgICB0aGlzLnBsYXllci5yZXBsZW5pc2hFbmVyZ3koNSk7XG4gICAgICAgICAgdGhpcy5jaGVlc2VTY29yZS5pbmNyZWFzZVNjb3JlKDEpO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3aW5lZ2xhc3MnOlxuICAgICAgICBjYXNlICdtYXJ0aW5pZ2xhc3MnOlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaExpZmUoMTApO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3aW5lYm90dGxlJzpcbiAgICAgICAgICB0aGlzLnBsYXllci5yZXBsZW5pc2hMaWZlKDIwKTtcbiAgICAgICAgICB0aGlzLnNmeC5wbGF5KCdSaXNlMDQnKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vZmxhc2h5XG4gICAgICB0aGlzLnBsYXllci5mbGFzaCgnZ3JlZW4nKTtcbiAgICAgIC8vZGVzdHJveSB0aGUgc2FpZCBzcHJpdGVcbiAgICAgIHRoaXNCb2R5LnNwcml0ZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgZW5lbXlIaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICBpZih0aGF0Qm9keS5zcHJpdGUmJnRoYXRCb2R5LnNwcml0ZS5rZXk9PT0ncGxheWVyJyl7XG4gICAgICAvL0RvZXMgdGhlIHRoaW5ncyB0aGF0IGhpdCBwbGF5ZXIgYWxsIGhhdmUgc3ByaXRlIHNoYXBlPyBhbmQgZGVmaW5lZCBrZXk/XG4gICAgICBpZih0aGlzQm9keS5zcHJpdGUpe1xuICAgICAgICBjb25zb2xlLmxvZygncGxheWVyIGhpdCBieTogJyt0aGlzQm9keS5zcHJpdGUua2V5KyAnICcrdGhpc0JvZHkuc3ByaXRlLm5hbWUpO1xuICAgICAgICBzd2l0Y2godGhpc0JvZHkuc3ByaXRlLmtleSl7XG4gICAgICAgICAgY2FzZSAncmF0Z3J1bnQnOi8vcmF0IGdydW50XG4gICAgICAgICAgICBpZih0aGlzU2hhcGU9PT10aGlzQm9keS5kYXRhLnNoYXBlc1swXSl0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoNSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmF0c29sZGllcic6Ly9yYXQgc29sZGllclxuICAgICAgICAgICAgaWYodGhpc1NoYXBlPT09dGhpc0JvZHkuZGF0YS5zaGFwZXNbMF0pdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NhdCc6XG4gICAgICAgICAgICB0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoOCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnb2JqZWN0czMnOi8vb2JqZWN0cyAzIGFyZSBhbGwgYmFsbHNcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmRhbWFnZVBsYXllcig0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdvYmplY3RzMic6XG4gICAgICAgICAgICBsZXQgc3RyID0gdGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZTtcbiAgICAgICAgICAgIC8vYmVsb3cgbWF0Y2ggaXRzIGEgc3RhbGFjaXRlcyAtIHVwcGVyey9kfSBhbmQgYmVsb3cgey9kfVxuICAgICAgICAgICAgaWYoL151cHBlclxcZHsxfS8udGVzdChzdHIpfHwvXmJlbG93XFxkezF9Ly50ZXN0KHN0cikpdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29iamVjdHMxJzovL2NsdWJiZWQgYnkgc29sZGllclxuICAgICAgICAgICAgaWYodGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZT09J3N0b3AnKXRoaXMucGxheWVyLmRhbWFnZVBsYXllcig1LDIwMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5ZXJIaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICAgIC8vaGl0Ym94IG9ubHkgdGFyZ2V0IGlzIGVuZW15IHNvIHByZXR0eSBtdWNoIG5vIG5lZWQgdG8gY2hlY2tcbiAgICAgIGlmKHRoYXRCb2R5LnNwcml0ZSl7XG4gICAgICAgIHN3aXRjaCh0aGF0Qm9keS5zcHJpdGUua2V5KXtcbiAgICAgICAgICBjYXNlICdyYXRncnVudCc6XG4gICAgICAgICAgY2FzZSAncmF0c29sZGllcic6XG4gICAgICAgICAgICB0aGF0Qm9keS5zcHJpdGUuZGFtYWdlUmF0KDgsNDAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjYXQnOlxuICAgICAgICAgICAgdGhhdEJvZHkuc3ByaXRlLmRhbWFnZUNhdCg4LDQwMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy90aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLnRpbWUuZnBzIHx8ICctLScsIDIsIDE0LCBcIiNhN2FlYmVcIik7XG4gIH1cblxuICBzaHV0ZG93bigpe1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vcHJlZmFicy9QbGF5ZXIuanNcIjtcbmltcG9ydCBFbnRyYW5jZURvb3IgZnJvbSBcIi4uL3ByZWZhYnMvRW50cmFuY2VEb29yLmpzXCI7XG5pbXBvcnQgQmxvY2tpbmdPYmplY3RzIGZyb20gXCIuLi9wcmVmYWJzL0Jsb2NraW5nT2JqZWN0cy5qc1wiXG5pbXBvcnQgQ29sbGVjdGFibGVzIGZyb20gXCIuLi9wcmVmYWJzL0NvbGxlY3RhYmxlcy5qc1wiXG5pbXBvcnQgV2F2ZXNPYmplY3RzIGZyb20gXCIuLi9wcmVmYWJzL1dhdmVzT2JqZWN0cy5qc1wiXG5pbXBvcnQgUGxhdGZvcm1zIGZyb20gXCIuLi9wcmVmYWJzL1BsYXRmb3Jtcy5qc1wiXG5pbXBvcnQgSGVhbHRoQmFyIGZyb20gXCIuLi9wcmVmYWJzL0hlYWx0aEJhci5qc1wiXG5pbXBvcnQgRW5lcmd5QmFyIGZyb20gXCIuLi9wcmVmYWJzL0VuZXJneUJhci5qc1wiXG5pbXBvcnQgUmF0R3J1bnQgZnJvbSBcIi4uL3ByZWZhYnMvUmF0R3J1bnQuanNcIlxuaW1wb3J0IFJhdFNvbGRpZXIgZnJvbSBcIi4uL3ByZWZhYnMvUmF0U29sZGllci5qc1wiXG5pbXBvcnQgQ2F0IGZyb20gXCIuLi9wcmVmYWJzL0NhdC5qc1wiXG5pbXBvcnQgU3RhbGFjaXRlcyBmcm9tIFwiLi4vcHJlZmFicy9TdGFsYWNpdGVzLmpzXCJcbmltcG9ydCBFbmVteVN0b3BzIGZyb20gXCIuLi9wcmVmYWJzL0VuZW15U3RvcHMuanNcIlxuaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9wcmVmYWJzL1BvcHVwLmpzXCJcbmltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiXG5pbXBvcnQgQ2hlZXNlU2NvcmUgZnJvbSBcIi4uL3ByZWZhYnMvQ2hlZXNlU2NvcmUuanNcIlxuaW1wb3J0IFNodXJpa2VuSFVEIGZyb20gXCIuLi9wcmVmYWJzL1NodXJpa2VuSFVELmpzXCJcbmltcG9ydCBUaXRsZVRleHQgZnJvbSBcIi4uL3ByZWZhYnMvVGl0bGVUZXh0LmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXA0IGV4dGVuZHMgUGhhc2VyLlN0YXRle1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vb2JqZWN0IGxldmVsIHByb3BlcnRpZXNcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY3JlYXRlKCl7XG5cbiAgICB0aGlzLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuUDJKUyk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmdyYXZpdHkueSA9IDgwMDtcbiAgICAvL3RoaXMgc2V0cyB0aGUgZGVmYXVsdCBjb250YWN0IG1hdGVyaWFsIHRvIGFsbCBQMiBib2R5IGluIHRoaXMgd29ybGRcbiAgICB0aGlzLnBoeXNpY3MucDIud29ybGQuZGVmYXVsdENvbnRhY3RNYXRlcmlhbC5mcmljdGlvbiA9IDAuNDI7Ly9wZXJmZWN0IG5vdCB0byBiZSBBSVJCT1JORVxuICAgIHRoaXMucGh5c2ljcy5wMi53b3JsZC5zZXRHbG9iYWxTdGlmZm5lc3MoMWU1KTtcblxuICAgIC8vbWFwIHN0YXJ0XG4gICAgdGhpcy5tYXAgPSB0aGlzLmFkZC50aWxlbWFwKCdlcDQnKTtcbiAgICAvL2FkZCB0aWxlc2V0IGltYWdlXG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCd0aWxlJyk7XG4gICAgLy9wYXJhbGxheCBiYWNrZ3JvdW5kXG4gICAgdGhpcy5iZyA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKCdiYWNrZ3JvdW5kJyk7XG4gICAgdGhpcy5iZy5zY3JvbGxGYWN0b3JYID0gLjc7XG4gICAgdGhpcy5iZy5zY3JvbGxGYWN0b3JZID0gLjc7XG5cbiAgICAvL3dhbGthYmxlIHRpbGVzXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKCd0aWxlcycpO1xuXG4gICAgLy9jb2xsaXNpb25cbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigxLDEyMCx0cnVlLHRoaXMubGF5ZXIpO1xuICAgIGxldCB0aWxlc0JvZGllcyA9IHRoaXMucGh5c2ljcy5wMi5jb252ZXJ0VGlsZW1hcCh0aGlzLm1hcCwgdGhpcy5sYXllcik7XG5cbiAgICAvL2dlbmVyYWwgd29ybGQgcHJvcGVydGllcyBhYm92ZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cbiAgICAvL2FkZCB3YXRlciB3YXZlcyBpZiBhbnlcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnbW92aW5nd2F2ZXMnLDEzLCdvYmplY3RzMScsJ3dhdGVydGlsZScsdHJ1ZSxmYWxzZSx0aGlzLndvcmxkLFdhdmVzT2JqZWN0cyk7XG4gICAgLy9hZGQgdGhlIGRhbWFnZSB6b25lIGFzc29jaWF0ZWQgd2l0aCB0aGUgd2F0ZXIgYXJlYVxuICAgIHRoaXMuZGFtYWdlWm9uZSA9IG5ldyBQaGFzZXIuUmVjdGFuZ2xlKC0yMCwzNzUwLDcyMCwxMjApO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy9hZGQgcGxhdGZvcm1zXG4gICAgdGhpcy5wbGF0Zm9ybXNHcm91cCA9IHRoaXMuYWRkLmdyb3VwKClcbiAgICBsZXQgc2xpcHBlcnlNYXRlcmlhbHMgPSBuZXcgQXJyYXkoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ3BsYXRmb3JtcycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICAvL2xvb2tzIGxpa2UgZG9lc250IHN1cHBvcnQgb2JqZWN0IHVuaXF1ZSBpZCBmb3Igbm93XG4gICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncGxhdGZvcm1zJyxlbGVtZW50LmdpZCwnb2JqZWN0czEnLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMucGxhdGZvcm1zR3JvdXAsUGxhdGZvcm1zKTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYXRmb3Jtc0dyb3VwLmZvckVhY2goKGNoaWxkKT0+ey8vdGhpcyBpcyBOT1QgaW4gb3JkZXIgb2YgdGhlIFRpbGVkIHNpbmNlIHRoZSBhYm92ZSBhZGQgYWxsIGdpZHMgMTgzIFRIRU4gMTgyXG4gICAgICBzbGlwcGVyeU1hdGVyaWFscy5wdXNoKHRoaXMucGh5c2ljcy5wMi5jcmVhdGVNYXRlcmlhbCgnc2xpcHBlcnlNYXRlcmlhbCcsY2hpbGQuYm9keSkpO1xuICAgIH0sdGhpcyk7XG5cbiAgICAvL2FkZCBibG9ja2luZyBvYmplY3RzXG4gICAgdGhpcy5ibG9ja2luZ0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ2Jsb2NraW5nb2JqZWN0cycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ2Jsb2NraW5nb2JqZWN0cycsZWxlbWVudC5naWQsJ29iamVjdHMxJyxlbGVtZW50Lm5hbWUsdHJ1ZSxmYWxzZSx0aGlzLmJsb2NraW5nR3JvdXAsQmxvY2tpbmdPYmplY3RzKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGNvbGxlY3RhYmxlc1xuICAgIHRoaXMuY29sbGVjdGFibGVzR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIFRvb2xzLmZpbmRVbmlxdWVHSURJbkxheWVyKHRoaXMubWFwLCAnY29sbGVjdGFibGVzJykuZm9yRWFjaCgoZWxlbWVudCk9PntcbiAgICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdjb2xsZWN0YWJsZXMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMScsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5jb2xsZWN0YWJsZXNHcm91cCxDb2xsZWN0YWJsZXMpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgd2VhcG9uc1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCd3ZWFwb25zJywyNiwnb2JqZWN0czQnLCdzaHVyaWtlbnMnLHRydWUsZmFsc2UsdGhpcy5jb2xsZWN0YWJsZXNHcm91cCxDb2xsZWN0YWJsZXMpO1xuXG4gICAgLy9hZGQgdGhlIHN0YWxhY2l0ZXNcbiAgICB0aGlzLnN0YWxhY2l0ZXNHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgVG9vbHMuZmluZFVuaXF1ZUdJREluTGF5ZXIodGhpcy5tYXAsICdzdGFsYWNpdGVzJykuZm9yRWFjaCgoZWxlbWVudCk9PntcbiAgICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdzdGFsYWNpdGVzJyxlbGVtZW50LmdpZCwnb2JqZWN0czInLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMuc3RhbGFjaXRlc0dyb3VwLFN0YWxhY2l0ZXMpO1xuICAgIH0pO1xuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vYWRkIGVudHJhbmNlIGRvb3JcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZG9vcicsNSwnb2JqZWN0czEnLCdlbnRyYW5jZWRvb3InLHRydWUsZmFsc2UsdGhpcy53b3JsZCxFbnRyYW5jZURvb3IpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yID0gdGhpcy53b3JsZC5nZXRUb3AoKTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCd0b3JpaTEnLDI0LCdvYmplY3RzMicsJ3RvcmlpMScpO1xuXG5cbiAgICAvL3RoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmdhbWUsNjAsMzgwMCk7XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuZ2FtZSwyMzQwLDI4NjApOy8vc3RhcnQgcG9zXG4gICAgLy90aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5nYW1lLDIzODAsNzAwKTtcblxuICAgIC8vcGxheWVyIG1hdGVyaWFsc1xuICAgIGxldCBwbGF5ZXJNYXRlcmlhbCA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVNYXRlcmlhbCgncGxheWVyTWF0ZXJpYWwnLCB0aGlzLnBsYXllci5ib2R5KTtcbiAgICAvL2NvbnRhY3QgbWF0ZXJpYWwgd2l0aCBzbGlwcGVyeSBwbGF0Zm9ybXMuLlxuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwocGxheWVyTWF0ZXJpYWwsIHNsaXBwZXJ5TWF0ZXJpYWxzWzBdLHtmcmljdGlvbjowLjM1LHN1cmZhY2VWZWxvY2l0eToxMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbMV0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5Oi0xMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbMl0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5OjEwMDB9KTtcbiAgICB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29udGFjdE1hdGVyaWFsKHBsYXllck1hdGVyaWFsLCBzbGlwcGVyeU1hdGVyaWFsc1szXSx7ZnJpY3Rpb246MC4zNSxzdXJmYWNlVmVsb2NpdHk6LTEwMDB9KTtcblxuICAgIHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyKTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCd0b3JpaTInLDI1LCdvYmplY3RzMicsJ3RvcmlpMicpO1xuXG5cbiAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy9zdG9wIGFsbCBwcmV2aW91cyBwbGF5aW5nIHNvdW5kIGZpcnN0XG4gICAgdGhpcy5zb3VuZC5zdG9wQWxsKCk7XG4gICAgdGhpcy5zZnggPSB0aGlzLmFkZC5hdWRpb1Nwcml0ZSgnc2Z4Jyk7XG4gICAgdGhpcy50aGVtZSA9IHRoaXMuYWRkLmF1ZGlvU3ByaXRlKCd0aGVtZScpO1xuICAgIGlmKFRvb2xzLmdldERhdGEoJ211dGVzb3VuZCcpKVRvb2xzLm11dGVPclBsYXkodGhpcy5zZngsdHJ1ZSk7XG4gICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXRoZW1lJykpVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuXG4gICAgdGhpcy5wbGF5ZXIuc2Z4ID0gdGhpcy5zZng7XG5cbiAgICAvL2FkZCBlbmVteSByYXQgZ3J1bnRcbiAgICB0aGlzLnJhdEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncmF0Z3J1bnRzJywxNiwncmF0Z3J1bnQnLCdmcmFtZTAnLHRydWUsZmFsc2UsdGhpcy5yYXRHcm91cCxSYXRHcnVudCk7XG4gICAgdGhpcy5yYXRHcm91cC5mb3JFYWNoKChyYXRHcnVudCk9PntcbiAgICAgIHJhdEdydW50LnBsYXllcj10aGlzLnBsYXllcjtcbiAgICAgIHJhdEdydW50LnNmeCA9IHRoaXMuc2Z4O1xuICAgIH0sdGhpcyk7XG5cbiAgICAvL2FkZCBlbmVteSByYXQgc29sZGllcnNcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncmF0c29sZGllcnMnLDIwLCdyYXRzb2xkaWVyJywnaGl0ZnJhbWUwJyx0cnVlLGZhbHNlLHRoaXMucmF0R3JvdXAsUmF0U29sZGllcik7XG4gICAgdGhpcy5yYXRHcm91cC5mb3JFYWNoKChyYXRTb2xkaWVyKT0+e1xuICAgICAgcmF0U29sZGllci5wbGF5ZXI9dGhpcy5wbGF5ZXI7XG4gICAgICByYXRTb2xkaWVyLnNmeCA9IHRoaXMuc2Z4O1xuICAgIH0sdGhpcyk7XG5cbiAgICB0aGlzLmNhdEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnY2F0cycsMjMsJ2NhdCcsJ2ZyYW1lMCcsdHJ1ZSxmYWxzZSx0aGlzLmNhdEdyb3VwLENhdCk7XG5cblxuICAgIC8vYWRkIGVuZW15IHN0b3BzXG4gICAgdGhpcy5zdG9wc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ2VuZW15c3RvcHMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ2VuZW15c3RvcHMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMScsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5zdG9wc0dyb3VwLEVuZW15U3RvcHMpO1xuICAgIH0pO1xuXG4gICAgLy90aGUgbW9zdCBmcm9udCBsYXllciB3aGljaCB0byBiZSBkaXNwbGF5ZWQgaW4gZnJvbnQgb2YgcGxheWVyXG4gICAgdGhpcy5tYXAuY3JlYXRlTGF5ZXIoJ2RlY29yYXRpdmUyJyk7XG5cbiAgICAvL1VJIHNldHVwXG4gICAgdGhpcy5oZWFsdGhCYXIgPSBuZXcgSGVhbHRoQmFyKHRoaXMuZ2FtZSwyMCwyMCk7XG4gICAgdGhpcy5lbmVyZ3lCYXIgPSBuZXcgRW5lcmd5QmFyKHRoaXMuZ2FtZSwzMSw4MCk7XG4gICAgdGhpcy5wbGF5ZXIuZW5lcmd5QmFyID0gdGhpcy5lbmVyZ3lCYXI7XG4gICAgdGhpcy5wbGF5ZXIuaGVhbHRoQmFyID0gdGhpcy5oZWFsdGhCYXI7XG5cbiAgICB0aGlzLmNoZWVzZVNjb3JlID0gbmV3IENoZWVzZVNjb3JlKHRoaXMuZ2FtZSw0NjAsMjAsMTgpO1xuICAgIHRoaXMuc2h1cmlrZW5IVUQgPSBuZXcgU2h1cmlrZW5IVUQodGhpcy5nYW1lLDg3MCwyNSwxOCk7XG4gICAgdGhpcy5wbGF5ZXIuc2h1cmlrZW5IVUQgPSB0aGlzLnNodXJpa2VuSFVEO1xuXG4gICAgLy9hZGQgY29sbGlzaW9uIGdyb3Vwc1xuICAgIC8vICBUdXJuIG9uIGltcGFjdCBldmVudHMgZm9yIHRoZSB3b3JsZCwgd2l0aG91dCB0aGlzIHdlIGdldCBubyBjb2xsaXNpb24gY2FsbGJhY2tzXG4gICAgdGhpcy5waHlzaWNzLnAyLnNldEltcGFjdEV2ZW50cyh0cnVlKTtcblxuICAgIGxldCB0aWxlc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHBsYXRmb3Jtc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHN0YWxhY2l0ZXNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBwbGF5ZXJDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBoaXRib3hDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBzaHVyaWtlbmJveENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHJhdEhpdGJveENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGNhdEJhbGxzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgYmxvY2tpbmdPYmplY3RzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgY29sbGVjdGFibGVzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgcmF0Q0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgY2F0Q0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgc3RvcHNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBlbnRyYW5jZWRvb3JDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuXG4gICAgLy91cGRhdGUgd29ybGQgYm91bmRzIGNvbGxpc2lvbiBncm91cCAgdG8gY29sbGlkZSB3aXRoIGFsbCB0aGUgY3VzdG9tIGNvbGxpc2lvbiBncm91cHNcbiAgICB0aGlzLnBoeXNpY3MucDIudXBkYXRlQm91bmRzQ29sbGlzaW9uR3JvdXAoKTtcbiAgICAvL3NldCB0aGUgY29sbGlzaW9uc1xuICAgIC8vdGlsZSBtYXRlcmlhbHNcbiAgICBsZXQgdGlsZU1hdGVyaWFsID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZU1hdGVyaWFsKCd0aWxlTWF0ZXJpYWwnKTtcbiAgICB0aWxlc0JvZGllcy5mb3JFYWNoKCh0aWxlKT0+e1xuICAgICAgdGlsZS5zZXRNYXRlcmlhbCh0aWxlTWF0ZXJpYWwpO1xuICAgICAgdGlsZS5zZXRDb2xsaXNpb25Hcm91cCh0aWxlc0NHKTtcbiAgICAgIHRpbGUuY29sbGlkZXMoW3BsYXllckNHLGNvbGxlY3RhYmxlc0NHLGJsb2NraW5nT2JqZWN0c0NHLHJhdENHLGNhdENHLGNhdEJhbGxzQ0ddKTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYXRmb3Jtc0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChwbGF0Zm9ybXNDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFtwbGF5ZXJDRyxjb2xsZWN0YWJsZXNDRyxyYXRDRyxjYXRDRyxjYXRCYWxsc0NHXSk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnN0YWxhY2l0ZXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoc3RhbGFjaXRlc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpXG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnBsYXllci5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHBsYXllckNHKTtcbiAgICB0aGlzLnBsYXllci5ib2R5LmNvbGxpZGVzKFt0aWxlc0NHLHN0YWxhY2l0ZXNDRyxibG9ja2luZ09iamVjdHNDRyxwbGF0Zm9ybXNDRyxjb2xsZWN0YWJsZXNDRyxyYXRDRyxjYXRDRyxyYXRIaXRib3hDRyxjYXRCYWxsc0NHLGVudHJhbmNlZG9vckNHXSx0aGlzLnBsYXRmb3JtSGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgdGhpcy5wbGF5ZXIuaGl0Ym94MS5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGhpdGJveENHKTtcbiAgICB0aGlzLnBsYXllci5oaXRib3gxLmJvZHkuY29sbGlkZXMoW3JhdENHLGNhdENHLGNhdEJhbGxzQ0ddLHRoaXMucGxheWVySGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgdGhpcy5wbGF5ZXIuc2h1cmlrZW5zLmZvckVhY2goKHNodXJpa2VuKT0+e1xuICAgICAgc2h1cmlrZW4uYm9keS5zZXRDb2xsaXNpb25Hcm91cChzaHVyaWtlbmJveENHKTtcbiAgICAgIHNodXJpa2VuLmJvZHkuY29sbGlkZXMoW3JhdENHLGNhdENHLGNhdEJhbGxzQ0ddLHRoaXMucGxheWVySGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLmJsb2NraW5nR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGJsb2NraW5nT2JqZWN0c0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3BsYXllckNHLGNvbGxlY3RhYmxlc0NHLHJhdENHLHRpbGVzQ0csY2F0Q0csY2F0QmFsbHNDR10pO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5jb2xsZWN0YWJsZXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoY29sbGVjdGFibGVzQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxwbGF0Zm9ybXNDRyxibG9ja2luZ09iamVjdHNDR10pO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmNvbGxlY3RhYmxlc0xpc3RlbmVyLHRoaXMpO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5yYXRHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocmF0Q0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxwbGF0Zm9ybXNDRyxibG9ja2luZ09iamVjdHNDRyxzdG9wc0NHLGhpdGJveENHLHNodXJpa2VuYm94Q0ddKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpXG4gICAgICBpZihjaGlsZC5rZXk9PSdyYXRzb2xkaWVyJyl7XG4gICAgICAgIC8vZm9yIHJhdCBzb2xkaWVycyBvbmx5XG4gICAgICAgIGNoaWxkLmhpdGJveDEuYm9keS5zZXRDb2xsaXNpb25Hcm91cChyYXRIaXRib3hDRyk7XG4gICAgICAgIGNoaWxkLmhpdGJveDEuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmVuZW15SGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgICB9XG4gICAgfSx0aGlzKTtcbiAgICBsZXQgYmFsbE1hdGVyaWFsID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZU1hdGVyaWFsKCdiYWxsTWF0ZXJpYWwnKTtcbiAgICB0aGlzLmNhdEdyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChjYXRDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFt0aWxlc0NHLHBsYXRmb3Jtc0NHLGJsb2NraW5nT2JqZWN0c0NHLHN0b3BzQ0csaGl0Ym94Q0csc2h1cmlrZW5ib3hDR10pO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmVuZW15SGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgICBjaGlsZC5iYWxscy5mb3JFYWNoKChiYWxsKT0+e1xuICAgICAgICBiYWxsLmJvZHkuc2V0TWF0ZXJpYWwoYmFsbE1hdGVyaWFsKTtcbiAgICAgICAgYmFsbC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGNhdEJhbGxzQ0cpO1xuICAgICAgICBiYWxsLmJvZHkuY29sbGlkZXMoW3RpbGVzQ0cscGxhdGZvcm1zQ0csYmxvY2tpbmdPYmplY3RzQ0csaGl0Ym94Q0csc2h1cmlrZW5ib3hDR10pO1xuICAgICAgICBiYWxsLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpO1xuICAgICAgfSxjaGlsZCk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnN0b3BzR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHN0b3BzQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbcmF0Q0csY2F0Q0ddKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoZW50cmFuY2Vkb29yQ0cpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5uZXh0RXBpc29kZSx0aGlzKTtcblxuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwodGlsZU1hdGVyaWFsLCBiYWxsTWF0ZXJpYWwse2ZyaWN0aW9uOjAuMixyZXN0aXR1dGlvbjowLjh9KTtcblxuXG4gICAgLy9sb2NrIGFycm93cyBrZXkgaW5wdXQgZnJvbSB0aGUgYnJvd3NlclxuICAgIHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5Q2FwdHVyZShbUGhhc2VyLktleWJvYXJkLlNQQUNFLFBoYXNlci5LZXlib2FyZC5VUCxQaGFzZXIuS2V5Ym9hcmQuTEVGVCxQaGFzZXIuS2V5Ym9hcmQuUklHSFRdKTtcbiAgICAvL2luaXRpYWxpemUgcG9wIHVwIHBhbmVscyxtYWluIHBvcCB1cCwgaW5zdHJ1Y3Rpb24sIHRpcDEuLi5OXG4gICAgLy9hZGQgZXNjIGtleSB0byBicmluZyB1cCBwb3AgdXAgcGFuZWxcbiAgICB0aGlzLm5hdmlLZXlzID0gdGhpcy5pbnB1dC5rZXlib2FyZC5hZGRLZXlzKHsgJ3VwJzogUGhhc2VyLktleUNvZGUuVVAsICdkb3duJzogUGhhc2VyLktleUNvZGUuRE9XTiwgJ2VudGVyJzogUGhhc2VyLktleUNvZGUuRU5URVIsICdlc2MnOlBoYXNlci5LZXlDb2RlLkVTQyB9ICk7XG4gICAgdGhpcy5uYXZpS2V5cy5lc2Mub25Eb3duLmFkZCgoKT0+e1xuICAgICAgaWYoIXRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLmdhbWUucGF1c2VkPXRydWU7XG4gICAgICAgIHRoaXMucG9wdXAgPSBuZXcgUG9wdXAodGhpcy5nYW1lLHRoaXMuY2FtZXJhLngsdGhpcy5jYW1lcmEueSwyKTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRDaGlsZCh0aGlzLnBvcHVwKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgfVxuXG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLnVwLm9uRG93bi5hZGQoKHRhcmdldCk9PnsvL3Nob3VsZCB0aGlzIGJlIGFkZGVkIGluc2lkZSB0aGUgUG9wdXAgY2xhcz9cbiAgICAgIC8vY29uc29sZS5sb2coXCJ1cFwiKTtcbiAgICAgIGlmKHRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLnBvcHVwLmN1cnNvck1vdmVkKHRhcmdldC5rZXlDb2RlKTtcbiAgICAgIH1cbiAgICB9LHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMuZG93bi5vbkRvd24uYWRkKCh0YXJnZXQpPT57XG4gICAgICAvL2NvbnNvbGUubG9nKFwiZG93blwiKTtcbiAgICAgIGlmKHRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLnBvcHVwLmN1cnNvck1vdmVkKHRhcmdldC5rZXlDb2RlKTtcbiAgICAgIH1cbiAgICB9LHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMuZW50ZXIub25Eb3duLmFkZCgoKT0+e1xuICAgICAgaWYodGhpcy5nYW1lLnBhdXNlZCl0aGlzLnByb2Nlc3NTZWxlY3Rpb24oKTtcbiAgICB9LHRoaXMpO1xuXG4gICAgdGhpcy5nYW1lLm9uUGF1c2UuYWRkKGZ1bmN0aW9uKCl7dGhpcy5zb3VuZC51bnNldE11dGUoKTt9LHRoaXMpOy8vPD09ZW5hYmxlIHRoZSBzb3VuZCB0byBjb250aW51ZSBwbGF5ICc7KSdcbiAgICB0aGlzLnRoZW1lLnNvdW5kc1snSGlkaW5nIFlvdXIgUmVhbGl0eSddLnBsYXkoJ0hpZGluZyBZb3VyIFJlYWxpdHknLG51bGwsMC40LHRydWUpO1xuXG4gICAgdGhpcy50aXRsZXRleHQgPSAgbmV3IFRpdGxlVGV4dCh0aGlzLmdhbWUsJ0VwIDQuIFRoZSBTaG9vdGluZyBTdGFycycpO1xuICAgIHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMudGl0bGV0ZXh0KTtcblxuICAgIC8vVG8gZ2V0IHRoZSBGUFNcbiAgICB0aGlzLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xuXG4gICAgdGhpcy50aXBzbWFya2VyID0gW2ZhbHNlXTtcblxuICB9XG5cbiAgdXBkYXRlKCl7XG4gICAgaWYodGhpcy5kYW1hZ2Vab25lLmludGVyc2VjdHNSYXcodGhpcy5wbGF5ZXIubGVmdCx0aGlzLnBsYXllci5yaWdodCx0aGlzLnBsYXllci50b3AsdGhpcy5wbGF5ZXIuYm90dG9tKSl7XG4gICAgICBUb29scy5wbGF5U291bmQodGhpcy5zZngsWydGb290c3RlcF9XYXRlcl8wNCcsJ0Zvb3RzdGVwX1dhdGVyXzA1JywnRm9vdHN0ZXBfV2F0ZXJfMDYnXSk7XG4gICAgICB0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoNCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dEVwaXNvZGUodGhpc0JvZHksdGhhdEJvZHkpe1xuICAgIGlmKHRoYXRCb2R5LnNwcml0ZSYmdGhhdEJvZHkuc3ByaXRlLmtleT09PSdwbGF5ZXInKXtcbiAgICAgIHRoaXMuY2hlZXNlU2NvcmUuYWRkVG9Ub3RhbFNjb3JlKDQpO1xuICAgICAgdGhpcy5zdGF0ZS5zdGFydCgncHJlbG9hZCcsdHJ1ZSxmYWxzZSwnZXA1Jyk7XG4gICAgfVxuICB9XG5cbiAgLy8vLy0tLT4gSW4gR2FtZSBNZW51XG4gIHJlc3VtZUdhbWUoKXtcbiAgICBsZXQgc29tZXBvcHVwICA9IHRoaXMud29ybGQuZ2V0VG9wKCk7XG4gICAgaWYoc29tZXBvcHVwLmtleT09PSdwb3B1cCcpe1xuICAgICAgdGhpcy53b3JsZC5yZW1vdmVDaGlsZChzb21lcG9wdXApO1xuICAgICAgc29tZXBvcHVwLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5nYW1lLnBhdXNlZD1mYWxzZTtcbiAgfVxuXG4gIC8vcHJvY2Vzc2luZyBmb3IgcG9wIHVwIG1lbnUgaXRlbXNcbiAgcHJvY2Vzc1NlbGVjdGlvbigpe1xuICAgIC8vbGV0IHBvcHVwVGV4dCA9IHRoaXMucG9wdXAub3B0aW9uRW50ZXJlZCgpO1xuICAgIGxldCBwb3B1cFRleHQgPSB0aGlzLndvcmxkLmdldFRvcCgpLm9wdGlvbkVudGVyZWQoKTtcbiAgICBpZighcG9wdXBUZXh0KSByZXR1cm47XG5cbiAgICBjb25zb2xlLmxvZyhcImVudGVyIFwiK3BvcHVwVGV4dCk7XG4gICAgLy90aGlzIGd1eSBoYXMgdG8gZG8gdGhlIGxpZnRpbmcgZm9yIHRoZSBvcHRpb25zXG4gICAgc3dpdGNoKHBvcHVwVGV4dCl7XG4gICAgICBjYXNlICdSZXN1bWUgR2FtZSc6XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdSZXN0YXJ0IEVwaXNvZGUnOlxuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTsvL25lZWQgdG8gdW5wYXVzZSB0aGUgZ2FtZSBiZWZvcmUgY2hhbmdlIHN0YXRlXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ2VwNCcpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdJbnN0cnVjdGlvbnMnOlxuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24gPSBuZXcgUG9wdXAodGhpcy5nYW1lLHRoaXMuY2FtZXJhLngsdGhpcy5jYW1lcmEueSwzKTtcbiAgICAgICAgbGV0IGluc3RydWN0aW9uID0gdGhpcy5jYWNoZS5nZXRKU09OKCdjb25maWcnKS5wb3B1cC5pbnN0cnVjdGlvbnM7XG4gICAgICAgIHRoaXMucG9wdXBJbnN0cnVjdGlvbi5zZXRUaXRsZShpbnN0cnVjdGlvblsndGl0bGUnXSk7XG4gICAgICAgIHRoaXMucG9wdXBJbnN0cnVjdGlvbi5zZXREZXNjcmlwdGlvbihpbnN0cnVjdGlvblsnZGVzY3JpcHRpb24nXSwwKTtcblxuICAgICAgICB0aGlzLndvcmxkLnJlbW92ZUNoaWxkKHRoaXMucG9wdXApO1xuICAgICAgICB0aGlzLndvcmxkLmFkZENoaWxkKHRoaXMucG9wdXBJbnN0cnVjdGlvbik7XG4gICAgICAgIHRoaXMuZW5hYmxlQ3Vyc29yS2V5cyhmYWxzZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0dvdCBpdCEnOlxuICAgICAgICB0aGlzLmVuYWJsZUN1cnNvcktleXModHJ1ZSk7XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdRdWl0IHRvIE1haW4gTWVudSc6XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdtZW51Jyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ011dGUgTXVzaWMnOlxuICAgICAgICBjb25zb2xlLmxvZyhcIm11dGluZyBtdXNpYyBcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXRoZW1lJyx0cnVlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdXRlIFNvdW5kJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJtdXRpbmcgc291bmRcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXNvdW5kJyx0cnVlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnNmeCx0cnVlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGxheSBNdXNpYyc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWluZyBtdXNpY1wiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRldGhlbWUnLGZhbHNlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLGZhbHNlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGxheSBTb3VuZCc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWluZyBzb3VuZFwiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRlc291bmQnLGZhbHNlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnNmeCxmYWxzZSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBlbmFibGVDdXJzb3JLZXlzKGJvb2wpe1xuICAgICAgdGhpcy5uYXZpS2V5cy51cC5lbmFibGVkID0gYm9vbDtcbiAgICAgIHRoaXMubmF2aUtleXMuZG93bi5lbmFibGVkID0gYm9vbDtcbiAgfVxuXG4gIHBsYXRmb3JtSGl0TGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiYodGhhdEJvZHkuc3ByaXRlLmZyYW1lTmFtZT09J3NsaXBwZXJ5MSd8fHRoYXRCb2R5LnNwcml0ZS5mcmFtZU5hbWU9PSdzbGlwcGVyeTInKSl7XG4gICAgICBUb29scy5wbGF5U291bmQodGhpcy5zZngsWydzbGltZTcnLCdzbGltZTgnLCdzbGltZTknXSk7XG4gICAgICB0aGlzLnBsYXllci5vbnNsaXBweXBsYXRmb3JtPXRydWU7XG4gICAgfWVsc2V7XG4gICAgICBpZih0aGlzLnBsYXllci5vbnNsaXBweXBsYXRmb3JtKXRoaXMucGxheWVyLm9uc2xpcHB5cGxhdGZvcm09ZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29sbGVjdGFibGVzTGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiZ0aGF0Qm9keS5zcHJpdGUua2V5PT09XCJwbGF5ZXJcIil7XG4gICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb250YWN0ZWQgYnkgXCIrdGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSk7XG4gICAgICBzd2l0Y2godGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSl7XG4gICAgICAgIGNhc2UgJ2NoZWVzZTEnOlxuICAgICAgICAgIC8vaW5jcmVhc2UgcGxheWVyIGVuZXJneS4uXG4gICAgICAgICAgdGhpcy5wbGF5ZXIucmVwbGVuaXNoRW5lcmd5KDEwKTtcbiAgICAgICAgICB0aGlzLmNoZWVzZVNjb3JlLmluY3JlYXNlU2NvcmUoMik7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoZWVzZTInOlxuICAgICAgICBjYXNlICdjaGVlc2UzJzpcbiAgICAgICAgICAvL2luY3JlYXNlIHBsYXllciBlbmVyZ3kuLlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaEVuZXJneSg1KTtcbiAgICAgICAgICB0aGlzLmNoZWVzZVNjb3JlLmluY3JlYXNlU2NvcmUoMSk7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dpbmVnbGFzcyc6XG4gICAgICAgIGNhc2UgJ21hcnRpbmlnbGFzcyc6XG4gICAgICAgICAgdGhpcy5wbGF5ZXIucmVwbGVuaXNoTGlmZSgxMCk7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dpbmVib3R0bGUnOlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaExpZmUoMjApO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzaHVyaWtlbnMnOlxuICAgICAgICAgIC8vZW5hYmxlIHNodXJpa2VucyBmb3IgZmlyc3QgdGltZVxuICAgICAgICAgIGlmKCF0aGlzLnRpcHNtYXJrZXJbMF0pe1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudGhyb3dCb2R5KCk7XG4gICAgICAgICAgICB0aGlzLnRpcHNwb3BwZXIoMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9pbmNyZWFzZSBwbGF5ZXIgc2h1cmlrZW5zIGNvdW50XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuaW5jcmVhc2VTaHVyaWtlbig1KTtcbiAgICAgICAgICB0aGlzLnNmeC5wbGF5KCdSaXNlMDQnKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vZmxhc2h5XG4gICAgICB0aGlzLnBsYXllci5mbGFzaCgnZ3JlZW4nKTtcbiAgICAgIC8vZGVzdHJveSB0aGUgc2FpZCBzcHJpdGVcbiAgICAgIHRoaXNCb2R5LnNwcml0ZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgdGlwc3BvcHBlcihpbmRleCl7XG4gICAgaWYodGhpcy50aXBzbWFya2VyW2luZGV4XSlyZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLnNmeC5wbGF5KCdjb2xsZWN0c3dvcmQnKTtcblxuICAgIHRoaXMuZ2FtZS5wYXVzZWQ9dHJ1ZTtcbiAgICBsZXQgdGlwcG9wdXAgPSBuZXcgUG9wdXAodGhpcy5nYW1lLHRoaXMuY2FtZXJhLngsdGhpcy5jYW1lcmEueSwzKTtcbiAgICBsZXQgdGlwID0gdGhpcy5jYWNoZS5nZXRKU09OKCdjb25maWcnKS5wb3B1cC5lcDQudGlwc1tpbmRleF07XG4gICAgdGlwcG9wdXAuc2V0VGl0bGUodGlwWyd0aXRsZSddKTtcbiAgICBpZih0aXBbJ2Rlc2NyaXB0aW9uJ10pdGlwcG9wdXAuc2V0RGVzY3JpcHRpb24odGlwWydkZXNjcmlwdGlvbiddLDApO1xuXG4gICAgdGhpcy50aXBzbWFya2VyW2luZGV4XSA9IHRydWU7XG5cbiAgICB0aGlzLndvcmxkLmFkZENoaWxkKHRpcHBvcHVwKTtcbiAgICB0aGlzLmVuYWJsZUN1cnNvcktleXMoZmFsc2UpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBlbmVteUhpdExpc3RlbmVyKHRoaXNCb2R5LHRoYXRCb2R5LHRoaXNTaGFwZSx0aGF0U2hhcGUpe1xuICAgIGlmKHRoYXRCb2R5LnNwcml0ZSYmdGhhdEJvZHkuc3ByaXRlLmtleT09PSdwbGF5ZXInKXtcbiAgICAgIC8vRG9lcyB0aGUgdGhpbmdzIHRoYXQgaGl0IHBsYXllciBhbGwgaGF2ZSBzcHJpdGUgc2hhcGU/IGFuZCBkZWZpbmVkIGtleT9cbiAgICAgIGlmKHRoaXNCb2R5LnNwcml0ZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIgaGl0IGJ5OiAnK3RoaXNCb2R5LnNwcml0ZS5rZXkrICcgJyt0aGlzQm9keS5zcHJpdGUubmFtZSk7XG4gICAgICAgIHN3aXRjaCh0aGlzQm9keS5zcHJpdGUua2V5KXtcbiAgICAgICAgICBjYXNlICdyYXRncnVudCc6Ly9yYXQgZ3J1bnRcbiAgICAgICAgICAgIGlmKHRoaXNTaGFwZT09PXRoaXNCb2R5LmRhdGEuc2hhcGVzWzBdKXRoaXMucGxheWVyLmRhbWFnZVBsYXllcig1KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyYXRzb2xkaWVyJzovL3JhdCBzb2xkaWVyXG4gICAgICAgICAgICBpZih0aGlzU2hhcGU9PT10aGlzQm9keS5kYXRhLnNoYXBlc1swXSl0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoOCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY2F0JzpcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmRhbWFnZVBsYXllcig4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdvYmplY3RzMyc6Ly9vYmplY3RzIDMgYXJlIGFsbCBiYWxsc1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29iamVjdHMyJzpcbiAgICAgICAgICAgIGxldCBzdHIgPSB0aGlzQm9keS5zcHJpdGUuZnJhbWVOYW1lO1xuICAgICAgICAgICAgLy9iZWxvdyBtYXRjaCBpdHMgYSBzdGFsYWNpdGVzIC0gdXBwZXJ7L2R9IGFuZCBiZWxvdyB7L2R9XG4gICAgICAgICAgICBpZigvXnVwcGVyXFxkezF9Ly50ZXN0KHN0cil8fC9eYmVsb3dcXGR7MX0vLnRlc3Qoc3RyKSl0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoNCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnb2JqZWN0czEnOi8vY2x1YmJlZCBieSBzb2xkaWVyXG4gICAgICAgICAgICBpZih0aGlzQm9keS5zcHJpdGUuZnJhbWVOYW1lPT0nc3RvcCcpdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDUsMjAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYXllckhpdExpc3RlbmVyKHRoaXNCb2R5LHRoYXRCb2R5LHRoaXNTaGFwZSx0aGF0U2hhcGUpe1xuICAgICAgLy9oaXRib3ggb25seSB0YXJnZXQgaXMgZW5lbXkgc28gcHJldHR5IG11Y2ggbm8gbmVlZCB0byBjaGVja1xuICAgICAgaWYodGhhdEJvZHkuc3ByaXRlKXtcbiAgICAgICAgaWYodGhpc0JvZHkuc3ByaXRlJiYvXnNcXGR7MX0vLnRlc3QodGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSkpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwic2h1cmlrZW4gaGl0XCIpO1xuICAgICAgICAgIC8va2lsbCB0aGUgc2h1cmlrZW4gYm9keVxuICAgICAgICAgIHN3aXRjaCh0aGF0Qm9keS5zcHJpdGUua2V5KXtcbiAgICAgICAgICAgIGNhc2UgJ3JhdGdydW50JzpcbiAgICAgICAgICAgIGNhc2UgJ3JhdHNvbGRpZXInOlxuICAgICAgICAgICAgICB0aGF0Qm9keS5zcHJpdGUuZGFtYWdlUmF0KDYsNDAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2F0JzpcbiAgICAgICAgICAgICAgdGhhdEJvZHkuc3ByaXRlLmRhbWFnZUNhdCg2LDQwMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpc0JvZHkuc3ByaXRlLmtpbGwoKTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBzd2l0Y2godGhhdEJvZHkuc3ByaXRlLmtleSl7XG4gICAgICAgICAgICBjYXNlICdyYXRncnVudCc6XG4gICAgICAgICAgICBjYXNlICdyYXRzb2xkaWVyJzpcbiAgICAgICAgICAgICAgdGhhdEJvZHkuc3ByaXRlLmRhbWFnZVJhdCg4LDQwMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NhdCc6XG4gICAgICAgICAgICAgIHRoYXRCb2R5LnNwcml0ZS5kYW1hZ2VDYXQoOCw0MDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy90aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLnRpbWUuZnBzIHx8ICctLScsIDIsIDE0LCBcIiNhN2FlYmVcIik7XG4gIH1cblxuICBzaHV0ZG93bigpe1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vcHJlZmFicy9QbGF5ZXIuanNcIjtcbmltcG9ydCBFbnRyYW5jZURvb3IgZnJvbSBcIi4uL3ByZWZhYnMvRW50cmFuY2VEb29yLmpzXCI7XG5pbXBvcnQgQmxvY2tpbmdPYmplY3RzIGZyb20gXCIuLi9wcmVmYWJzL0Jsb2NraW5nT2JqZWN0cy5qc1wiXG5pbXBvcnQgQ29sbGVjdGFibGVzIGZyb20gXCIuLi9wcmVmYWJzL0NvbGxlY3RhYmxlcy5qc1wiXG5pbXBvcnQgV2F2ZXNPYmplY3RzIGZyb20gXCIuLi9wcmVmYWJzL1dhdmVzT2JqZWN0cy5qc1wiXG5pbXBvcnQgUGxhdGZvcm1zIGZyb20gXCIuLi9wcmVmYWJzL1BsYXRmb3Jtcy5qc1wiXG5pbXBvcnQgSGVhbHRoQmFyIGZyb20gXCIuLi9wcmVmYWJzL0hlYWx0aEJhci5qc1wiXG5pbXBvcnQgRW5lcmd5QmFyIGZyb20gXCIuLi9wcmVmYWJzL0VuZXJneUJhci5qc1wiXG5pbXBvcnQgUmF0R3J1bnQgZnJvbSBcIi4uL3ByZWZhYnMvUmF0R3J1bnQuanNcIlxuaW1wb3J0IFJhdFNvbGRpZXIgZnJvbSBcIi4uL3ByZWZhYnMvUmF0U29sZGllci5qc1wiXG5pbXBvcnQgUmF0TmluamEgZnJvbSBcIi4uL3ByZWZhYnMvUmF0TmluamEuanNcIlxuaW1wb3J0IENhdCBmcm9tIFwiLi4vcHJlZmFicy9DYXQuanNcIlxuaW1wb3J0IFN0YWxhY2l0ZXMgZnJvbSBcIi4uL3ByZWZhYnMvU3RhbGFjaXRlcy5qc1wiXG5pbXBvcnQgRW5lbXlTdG9wcyBmcm9tIFwiLi4vcHJlZmFicy9FbmVteVN0b3BzLmpzXCJcbmltcG9ydCBQb3B1cCBmcm9tIFwiLi4vcHJlZmFicy9Qb3B1cC5qc1wiXG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uL2NvbXBvbmVudHMvVG9vbHMuanNcIlxuaW1wb3J0IENoZWVzZVNjb3JlIGZyb20gXCIuLi9wcmVmYWJzL0NoZWVzZVNjb3JlLmpzXCJcbmltcG9ydCBTaHVyaWtlbkhVRCBmcm9tIFwiLi4vcHJlZmFicy9TaHVyaWtlbkhVRC5qc1wiXG5pbXBvcnQgVGl0bGVUZXh0IGZyb20gXCIuLi9wcmVmYWJzL1RpdGxlVGV4dC5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVwNSBleHRlbmRzIFBoYXNlci5TdGF0ZXtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvL29iamVjdCBsZXZlbCBwcm9wZXJ0aWVzXG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZSgpe1xuXG4gICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLlAySlMpO1xuICAgIHRoaXMucGh5c2ljcy5wMi5ncmF2aXR5LnkgPSA4MDA7XG4gICAgLy90aGlzIHNldHMgdGhlIGRlZmF1bHQgY29udGFjdCBtYXRlcmlhbCB0byBhbGwgUDIgYm9keSBpbiB0aGlzIHdvcmxkXG4gICAgdGhpcy5waHlzaWNzLnAyLndvcmxkLmRlZmF1bHRDb250YWN0TWF0ZXJpYWwuZnJpY3Rpb24gPSAwLjQyOy8vcGVyZmVjdCBub3QgdG8gYmUgQUlSQk9STkVcbiAgICB0aGlzLnBoeXNpY3MucDIud29ybGQuc2V0R2xvYmFsU3RpZmZuZXNzKDFlNSk7XG5cbiAgICAvL21hcCBzdGFydFxuICAgIHRoaXMubWFwID0gdGhpcy5hZGQudGlsZW1hcCgnZXA1Jyk7XG4gICAgLy9hZGQgdGlsZXNldCBpbWFnZVxuICAgIHRoaXMubWFwLmFkZFRpbGVzZXRJbWFnZSgndGlsZScpO1xuICAgIC8vcGFyYWxsYXggYmFja2dyb3VuZFxuICAgIHRoaXMuYmcgPSB0aGlzLm1hcC5jcmVhdGVMYXllcignYmFja2dyb3VuZCcpO1xuICAgIHRoaXMuYmcuc2Nyb2xsRmFjdG9yWCA9IC43O1xuICAgIHRoaXMuYmcuc2Nyb2xsRmFjdG9yWSA9IC43O1xuXG4gICAgLy93YWxrYWJsZSB0aWxlc1xuICAgIHRoaXMubGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcigndGlsZXMnKTtcblxuICAgIC8vY29sbGlzaW9uXG4gICAgdGhpcy5sYXllci5yZXNpemVXb3JsZCgpO1xuICAgIHRoaXMubWFwLnNldENvbGxpc2lvbkJldHdlZW4oMSwxMjAsdHJ1ZSx0aGlzLmxheWVyKTtcbiAgICBsZXQgdGlsZXNCb2RpZXMgPSB0aGlzLnBoeXNpY3MucDIuY29udmVydFRpbGVtYXAodGhpcy5tYXAsIHRoaXMubGF5ZXIpO1xuXG4gICAgLy9nZW5lcmFsIHdvcmxkIHByb3BlcnRpZXMgYWJvdmUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG4gICAgLy9hZGQgd2F0ZXIgd2F2ZXMgaWYgYW55XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ21vdmluZ3dhdmVzJywxODQsJ29iamVjdHMxJywnd2F0ZXJ0aWxlJyx0cnVlLGZhbHNlLHRoaXMud29ybGQsV2F2ZXNPYmplY3RzKTtcbiAgICAvL2FkZCB0aGUgZGFtYWdlIHpvbmUgYXNzb2NpYXRlZCB3aXRoIHRoZSB3YXRlciBhcmVhXG4gICAgdGhpcy5kYW1hZ2Vab25lID0gbmV3IFBoYXNlci5SZWN0YW5nbGUoMCwzMzQwLDM5MCwxMjApO1xuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vYWRkIHBsYXRmb3Jtc1xuICAgIHRoaXMucGxhdGZvcm1zR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpXG4gICAgbGV0IHNsaXBwZXJ5TWF0ZXJpYWxzID0gbmV3IEFycmF5KCk7XG4gICAgVG9vbHMuZmluZFVuaXF1ZUdJREluTGF5ZXIodGhpcy5tYXAsICdwbGF0Zm9ybXMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgLy9sb29rcyBsaWtlIGRvZXNudCBzdXBwb3J0IG9iamVjdCB1bmlxdWUgaWQgZm9yIG5vd1xuICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3BsYXRmb3JtcycsZWxlbWVudC5naWQsJ29iamVjdHMxJyxlbGVtZW50Lm5hbWUsdHJ1ZSxmYWxzZSx0aGlzLnBsYXRmb3Jtc0dyb3VwLFBsYXRmb3Jtcyk7XG4gICAgfSk7XG4gICAgdGhpcy5wbGF0Zm9ybXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PnsvL3RoaXMgaXMgTk9UIGluIG9yZGVyIG9mIHRoZSBUaWxlZCBzaW5jZSB0aGUgYWJvdmUgYWRkIGFsbCBnaWRzIDE4MyBUSEVOIDE4MlxuICAgICAgc2xpcHBlcnlNYXRlcmlhbHMucHVzaCh0aGlzLnBoeXNpY3MucDIuY3JlYXRlTWF0ZXJpYWwoJ3NsaXBwZXJ5TWF0ZXJpYWwnLGNoaWxkLmJvZHkpKTtcbiAgICB9LHRoaXMpO1xuXG4gICAgLy9hZGQgYmxvY2tpbmcgb2JqZWN0c1xuICAgIHRoaXMuYmxvY2tpbmdHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgVG9vbHMuZmluZFVuaXF1ZUdJREluTGF5ZXIodGhpcy5tYXAsICdibG9ja2luZ29iamVjdHMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdibG9ja2luZ29iamVjdHMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMScsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5ibG9ja2luZ0dyb3VwLEJsb2NraW5nT2JqZWN0cyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBjb2xsZWN0YWJsZXNcbiAgICB0aGlzLmNvbGxlY3RhYmxlc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ2NvbGxlY3RhYmxlcycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnY29sbGVjdGFibGVzJyxlbGVtZW50LmdpZCwnb2JqZWN0czEnLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMuY29sbGVjdGFibGVzR3JvdXAsQ29sbGVjdGFibGVzKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIHdlYXBvbnNcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnd2VhcG9ucycsMTk2LCdvYmplY3RzNCcsJ3NodXJpa2VucycsdHJ1ZSxmYWxzZSx0aGlzLmNvbGxlY3RhYmxlc0dyb3VwLENvbGxlY3RhYmxlcyk7XG5cbiAgICAvL2FkZCB0aGUgc3RhbGFjaXRlc1xuICAgIHRoaXMuc3RhbGFjaXRlc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ3N0YWxhY2l0ZXMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3N0YWxhY2l0ZXMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMicsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5zdGFsYWNpdGVzR3JvdXAsU3RhbGFjaXRlcyk7XG4gICAgfSk7XG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vYWRkIGVudHJhbmNlIGRvb3JcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZG9vcicsMTc2LCdvYmplY3RzMScsJ2VudHJhbmNlZG9vcicsdHJ1ZSxmYWxzZSx0aGlzLndvcmxkLEVudHJhbmNlRG9vcik7XG4gICAgdGhpcy5lbnRyYW5jZWRvb3IgPSB0aGlzLndvcmxkLmdldFRvcCgpO1xuXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuZ2FtZSwxNzgwLDE5NTApOy8vc3RhcnQgcG9zXG4gICAgLy90aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5nYW1lLDE1MDAsMzIwMCk7XG4gICAgLy90aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5nYW1lLDI4MjAsMzU5MCk7XG4gICAgLy9wbGF5ZXIgbWF0ZXJpYWxzXG4gICAgbGV0IHBsYXllck1hdGVyaWFsID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZU1hdGVyaWFsKCdwbGF5ZXJNYXRlcmlhbCcsIHRoaXMucGxheWVyLmJvZHkpO1xuICAgIC8vY29udGFjdCBtYXRlcmlhbCB3aXRoIHNsaXBwZXJ5IHBsYXRmb3Jtcy4uXG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbMF0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5Oi0xMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbMV0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5Oi0xMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbMl0se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5Oi0xMDAwfSk7XG5cbiAgICB0aGlzLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xuXG4gICAgLy9zdG9wIGFsbCBwcmV2aW91cyBwbGF5aW5nIHNvdW5kIGZpcnN0XG4gICAgdGhpcy5zb3VuZC5zdG9wQWxsKCk7XG4gICAgdGhpcy5zZnggPSB0aGlzLmFkZC5hdWRpb1Nwcml0ZSgnc2Z4Jyk7XG4gICAgdGhpcy50aGVtZSA9IHRoaXMuYWRkLmF1ZGlvU3ByaXRlKCd0aGVtZScpO1xuICAgIGlmKFRvb2xzLmdldERhdGEoJ211dGVzb3VuZCcpKVRvb2xzLm11dGVPclBsYXkodGhpcy5zZngsdHJ1ZSk7XG4gICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXRoZW1lJykpVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuXG4gICAgdGhpcy5wbGF5ZXIuc2Z4ID0gdGhpcy5zZng7XG5cbiAgICAvL2FkZCBlbmVteSByYXQgZ3J1bnRcbiAgICB0aGlzLnJhdEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncmF0Z3J1bnRzJywxODcsJ3JhdGdydW50JywnZnJhbWUwJyx0cnVlLGZhbHNlLHRoaXMucmF0R3JvdXAsUmF0R3J1bnQpO1xuICAgIHRoaXMucmF0R3JvdXAuZm9yRWFjaCgocmF0R3J1bnQpPT57XG4gICAgICByYXRHcnVudC5wbGF5ZXI9dGhpcy5wbGF5ZXI7XG4gICAgICByYXRHcnVudC5zZnggPSB0aGlzLnNmeDtcbiAgICB9LHRoaXMpO1xuXG4gICAgLy9hZGQgZW5lbXkgcmF0IHNvbGRpZXJzXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3JhdHNvbGRpZXJzJywxOTEsJ3JhdHNvbGRpZXInLCdoaXRmcmFtZTAnLHRydWUsZmFsc2UsdGhpcy5yYXRHcm91cCxSYXRTb2xkaWVyKTtcbiAgICB0aGlzLnJhdEdyb3VwLmZvckVhY2goKHJhdFNvbGRpZXIpPT57XG4gICAgICByYXRTb2xkaWVyLnBsYXllcj10aGlzLnBsYXllcjtcbiAgICAgIHJhdFNvbGRpZXIuc2Z4ID0gdGhpcy5zZng7XG4gICAgfSx0aGlzKTtcblxuICAgIC8vYWRkIGVuZW15IHJhdCByYXRuaW5qYXNcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygncmF0bmluamFzJywxOTUsJ3JhdG5pbmphJywndGhyb3dmcmFtZTEnLHRydWUsZmFsc2UsdGhpcy5yYXRHcm91cCxSYXROaW5qYSk7XG4gICAgdGhpcy5yYXRHcm91cC5mb3JFYWNoKChyYXROaW5qYSk9PntcbiAgICAgIHJhdE5pbmphLnBsYXllcj10aGlzLnBsYXllcjtcbiAgICB9LHRoaXMpO1xuXG4gICAgdGhpcy5jYXRHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ2NhdHMnLDE5NCwnY2F0JywnZnJhbWUwJyx0cnVlLGZhbHNlLHRoaXMuY2F0R3JvdXAsQ2F0KTtcblxuICAgIC8vYWRkIGVuZW15IHN0b3BzXG4gICAgdGhpcy5zdG9wc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ2VuZW15c3RvcHMnKS5mb3JFYWNoKChlbGVtZW50KT0+e1xuICAgICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ2VuZW15c3RvcHMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMScsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5zdG9wc0dyb3VwLEVuZW15U3RvcHMpO1xuICAgIH0pO1xuXG4gICAgLy90aGUgbW9zdCBmcm9udCBsYXllciB3aGljaCB0byBiZSBkaXNwbGF5ZWQgaW4gZnJvbnQgb2YgcGxheWVyXG4gICAgdGhpcy5tYXAuY3JlYXRlTGF5ZXIoJ2RlY29yYXRpdmUyJyk7XG5cbiAgICAvL1VJIHNldHVwXG4gICAgdGhpcy5oZWFsdGhCYXIgPSBuZXcgSGVhbHRoQmFyKHRoaXMuZ2FtZSwyMCwyMCk7XG4gICAgdGhpcy5lbmVyZ3lCYXIgPSBuZXcgRW5lcmd5QmFyKHRoaXMuZ2FtZSwzMSw4MCk7XG4gICAgdGhpcy5wbGF5ZXIuZW5lcmd5QmFyID0gdGhpcy5lbmVyZ3lCYXI7XG4gICAgdGhpcy5wbGF5ZXIuaGVhbHRoQmFyID0gdGhpcy5oZWFsdGhCYXI7XG5cbiAgICB0aGlzLmNoZWVzZVNjb3JlID0gbmV3IENoZWVzZVNjb3JlKHRoaXMuZ2FtZSw0NjAsMjAsMTkpO1xuICAgIHRoaXMuc2h1cmlrZW5IVUQgPSBuZXcgU2h1cmlrZW5IVUQodGhpcy5nYW1lLDg3MCwyNSwxOCk7XG4gICAgdGhpcy5wbGF5ZXIuc2h1cmlrZW5IVUQgPSB0aGlzLnNodXJpa2VuSFVEO1xuXG4gICAgLy9hZGQgY29sbGlzaW9uIGdyb3Vwc1xuICAgIC8vICBUdXJuIG9uIGltcGFjdCBldmVudHMgZm9yIHRoZSB3b3JsZCwgd2l0aG91dCB0aGlzIHdlIGdldCBubyBjb2xsaXNpb24gY2FsbGJhY2tzXG4gICAgdGhpcy5waHlzaWNzLnAyLnNldEltcGFjdEV2ZW50cyh0cnVlKTtcblxuICAgIGxldCB0aWxlc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHBsYXRmb3Jtc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHN0YWxhY2l0ZXNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBwbGF5ZXJDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBoaXRib3hDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBzaHVyaWtlbmJveENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHJhdEhpdGJveENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IG5pbmphU2h1cmlrZW5DRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBjYXRCYWxsc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGJsb2NraW5nT2JqZWN0c0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGNvbGxlY3RhYmxlc0NHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHJhdENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IGNhdENHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG4gICAgbGV0IHN0b3BzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgZW50cmFuY2Vkb29yQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcblxuICAgIC8vdXBkYXRlIHdvcmxkIGJvdW5kcyBjb2xsaXNpb24gZ3JvdXAgIHRvIGNvbGxpZGUgd2l0aCBhbGwgdGhlIGN1c3RvbSBjb2xsaXNpb24gZ3JvdXBzXG4gICAgdGhpcy5waHlzaWNzLnAyLnVwZGF0ZUJvdW5kc0NvbGxpc2lvbkdyb3VwKCk7XG4gICAgLy9zZXQgdGhlIGNvbGxpc2lvbnNcbiAgICAvL3RpbGUgbWF0ZXJpYWxzXG4gICAgbGV0IHRpbGVNYXRlcmlhbCA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVNYXRlcmlhbCgndGlsZU1hdGVyaWFsJyk7XG4gICAgdGlsZXNCb2RpZXMuZm9yRWFjaCgodGlsZSk9PntcbiAgICAgIHRpbGUuc2V0TWF0ZXJpYWwodGlsZU1hdGVyaWFsKTtcbiAgICAgIHRpbGUuc2V0Q29sbGlzaW9uR3JvdXAodGlsZXNDRyk7XG4gICAgICB0aWxlLmNvbGxpZGVzKFtwbGF5ZXJDRyxjb2xsZWN0YWJsZXNDRyxibG9ja2luZ09iamVjdHNDRyxyYXRDRyxjYXRDRyxjYXRCYWxsc0NHXSk7XG4gICAgfSk7XG4gICAgdGhpcy5wbGF0Zm9ybXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocGxhdGZvcm1zQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbcGxheWVyQ0csY29sbGVjdGFibGVzQ0cscmF0Q0csY2F0Q0csY2F0QmFsbHNDR10pO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5zdGFsYWNpdGVzR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHN0YWxhY2l0ZXNDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKHBsYXllckNHLHRoaXMuZW5lbXlIaXRMaXN0ZW5lcix0aGlzKVxuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5zZXRDb2xsaXNpb25Hcm91cChwbGF5ZXJDRyk7XG4gICAgdGhpcy5wbGF5ZXIuYm9keS5jb2xsaWRlcyhbdGlsZXNDRyxzdGFsYWNpdGVzQ0csYmxvY2tpbmdPYmplY3RzQ0cscGxhdGZvcm1zQ0csY29sbGVjdGFibGVzQ0cscmF0Q0csY2F0Q0cscmF0SGl0Ym94Q0csbmluamFTaHVyaWtlbkNHLGNhdEJhbGxzQ0csZW50cmFuY2Vkb29yQ0ddLHRoaXMucGxhdGZvcm1IaXRMaXN0ZW5lcix0aGlzKTtcbiAgICB0aGlzLnBsYXllci5oaXRib3gxLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoaGl0Ym94Q0cpO1xuICAgIHRoaXMucGxheWVyLmhpdGJveDEuYm9keS5jb2xsaWRlcyhbcmF0Q0csY2F0Q0csY2F0QmFsbHNDRyxuaW5qYVNodXJpa2VuQ0ddLHRoaXMucGxheWVySGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgdGhpcy5wbGF5ZXIuc2h1cmlrZW5zLmZvckVhY2goKHNodXJpa2VuKT0+e1xuICAgICAgc2h1cmlrZW4uYm9keS5zZXRDb2xsaXNpb25Hcm91cChzaHVyaWtlbmJveENHKTtcbiAgICAgIHNodXJpa2VuLmJvZHkuY29sbGlkZXMoW3JhdENHLGNhdENHLGNhdEJhbGxzQ0csbmluamFTaHVyaWtlbkNHXSx0aGlzLnBsYXllckhpdExpc3RlbmVyLHRoaXMpO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5ibG9ja2luZ0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChibG9ja2luZ09iamVjdHNDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFtwbGF5ZXJDRyxjb2xsZWN0YWJsZXNDRyxyYXRDRyx0aWxlc0NHLGNhdENHLGNhdEJhbGxzQ0ddKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMuY29sbGVjdGFibGVzR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGNvbGxlY3RhYmxlc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3RpbGVzQ0cscGxhdGZvcm1zQ0csYmxvY2tpbmdPYmplY3RzQ0ddKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5jb2xsZWN0YWJsZXNMaXN0ZW5lcix0aGlzKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMucmF0R3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHJhdENHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3RpbGVzQ0cscGxhdGZvcm1zQ0csYmxvY2tpbmdPYmplY3RzQ0csc3RvcHNDRyxoaXRib3hDRyxzaHVyaWtlbmJveENHXSk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKHBsYXllckNHLHRoaXMuZW5lbXlIaXRMaXN0ZW5lcix0aGlzKVxuICAgICAgaWYoY2hpbGQua2V5PT0ncmF0c29sZGllcicpe1xuICAgICAgICAvL2ZvciByYXQgc29sZGllcnMgb25seVxuICAgICAgICBjaGlsZC5oaXRib3gxLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocmF0SGl0Ym94Q0cpO1xuICAgICAgICBjaGlsZC5oaXRib3gxLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpO1xuICAgICAgfVxuICAgICAgaWYoY2hpbGQua2V5PT0ncmF0bmluamEnKXtcbiAgICAgICAgY2hpbGQuc2h1cmlrZW5zLmZvckVhY2goKHNodXJpa2VuKT0+e1xuICAgICAgICAgIHNodXJpa2VuLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAobmluamFTaHVyaWtlbkNHKTtcbiAgICAgICAgICBzaHVyaWtlbi5ib2R5LmNvbGxpZGVzKFtoaXRib3hDRyxzaHVyaWtlbmJveENHXSk7XG4gICAgICAgICAgc2h1cmlrZW4uYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmVuZW15SGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgICB9XG4gICAgfSx0aGlzKTtcbiAgICBsZXQgYmFsbE1hdGVyaWFsID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZU1hdGVyaWFsKCdiYWxsTWF0ZXJpYWwnKTtcbiAgICB0aGlzLmNhdEdyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChjYXRDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFt0aWxlc0NHLHBsYXRmb3Jtc0NHLGJsb2NraW5nT2JqZWN0c0NHLHN0b3BzQ0csaGl0Ym94Q0csc2h1cmlrZW5ib3hDR10pO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmVuZW15SGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgICBjaGlsZC5iYWxscy5mb3JFYWNoKChiYWxsKT0+e1xuICAgICAgICBiYWxsLmJvZHkuc2V0TWF0ZXJpYWwoYmFsbE1hdGVyaWFsKTtcbiAgICAgICAgYmFsbC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKGNhdEJhbGxzQ0cpO1xuICAgICAgICBiYWxsLmJvZHkuY29sbGlkZXMoW3RpbGVzQ0cscGxhdGZvcm1zQ0csYmxvY2tpbmdPYmplY3RzQ0csaGl0Ym94Q0csc2h1cmlrZW5ib3hDR10pO1xuICAgICAgICBiYWxsLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpO1xuICAgICAgfSxjaGlsZCk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnN0b3BzR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57XG4gICAgICBjaGlsZC5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHN0b3BzQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbcmF0Q0csY2F0Q0ddKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoZW50cmFuY2Vkb29yQ0cpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5uZXh0RXBpc29kZSx0aGlzKTtcblxuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwodGlsZU1hdGVyaWFsLCBiYWxsTWF0ZXJpYWwse2ZyaWN0aW9uOjAuMixyZXN0aXR1dGlvbjowLjh9KTtcblxuICAgIC8vbG9jayBhcnJvd3Mga2V5IGlucHV0IGZyb20gdGhlIGJyb3dzZXJcbiAgICB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleUNhcHR1cmUoW1BoYXNlci5LZXlib2FyZC5TUEFDRSxQaGFzZXIuS2V5Ym9hcmQuVVAsUGhhc2VyLktleWJvYXJkLkxFRlQsUGhhc2VyLktleWJvYXJkLlJJR0hUXSk7XG4gICAgLy9pbml0aWFsaXplIHBvcCB1cCBwYW5lbHMsbWFpbiBwb3AgdXAsIGluc3RydWN0aW9uLCB0aXAxLi4uTlxuICAgIC8vYWRkIGVzYyBrZXkgdG8gYnJpbmcgdXAgcG9wIHVwIHBhbmVsXG4gICAgdGhpcy5uYXZpS2V5cyA9IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5cyh7ICd1cCc6IFBoYXNlci5LZXlDb2RlLlVQLCAnZG93bic6IFBoYXNlci5LZXlDb2RlLkRPV04sICdlbnRlcic6IFBoYXNlci5LZXlDb2RlLkVOVEVSLCAnZXNjJzpQaGFzZXIuS2V5Q29kZS5FU0MgfSApO1xuICAgIHRoaXMubmF2aUtleXMuZXNjLm9uRG93bi5hZGQoKCk9PntcbiAgICAgIGlmKCF0aGlzLmdhbWUucGF1c2VkKXtcbiAgICAgICAgdGhpcy5nYW1lLnBhdXNlZD10cnVlO1xuICAgICAgICB0aGlzLnBvcHVwID0gbmV3IFBvcHVwKHRoaXMuZ2FtZSx0aGlzLmNhbWVyYS54LHRoaXMuY2FtZXJhLnksMik7XG4gICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGQodGhpcy5wb3B1cCk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgIH1cblxuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5uYXZpS2V5cy51cC5vbkRvd24uYWRkKCh0YXJnZXQpPT57Ly9zaG91bGQgdGhpcyBiZSBhZGRlZCBpbnNpZGUgdGhlIFBvcHVwIGNsYXM/XG4gICAgICAvL2NvbnNvbGUubG9nKFwidXBcIik7XG4gICAgICBpZih0aGlzLmdhbWUucGF1c2VkKXtcbiAgICAgICAgdGhpcy5wb3B1cC5jdXJzb3JNb3ZlZCh0YXJnZXQua2V5Q29kZSk7XG4gICAgICB9XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLmRvd24ub25Eb3duLmFkZCgodGFyZ2V0KT0+e1xuICAgICAgLy9jb25zb2xlLmxvZyhcImRvd25cIik7XG4gICAgICBpZih0aGlzLmdhbWUucGF1c2VkKXtcbiAgICAgICAgdGhpcy5wb3B1cC5jdXJzb3JNb3ZlZCh0YXJnZXQua2V5Q29kZSk7XG4gICAgICB9XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLmVudGVyLm9uRG93bi5hZGQoKCk9PntcbiAgICAgIGlmKHRoaXMuZ2FtZS5wYXVzZWQpdGhpcy5wcm9jZXNzU2VsZWN0aW9uKCk7XG4gICAgfSx0aGlzKTtcblxuICAgIHRoaXMuZ2FtZS5vblBhdXNlLmFkZChmdW5jdGlvbigpe3RoaXMuc291bmQudW5zZXRNdXRlKCk7fSx0aGlzKTsvLzw9PWVuYWJsZSB0aGUgc291bmQgdG8gY29udGludWUgcGxheSAnOyknXG4gICAgdGhpcy50aGVtZS5zb3VuZHNbJ09ibGl0ZXJhdGlvbiddLnBsYXkoJ09ibGl0ZXJhdGlvbicsbnVsbCwwLjMsdHJ1ZSk7XG5cbiAgICB0aGlzLnRpdGxldGV4dCA9ICBuZXcgVGl0bGVUZXh0KHRoaXMuZ2FtZSwnRXAgNS4gVGhlIE5pbmphIFJlYWxpdHknKTtcbiAgICB0aGlzLmFkZC5leGlzdGluZyh0aGlzLnRpdGxldGV4dCk7XG5cbiAgICAvL1RvIGdldCB0aGUgRlBTXG4gICAgdGhpcy50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcblxuICB9XG5cbiAgdXBkYXRlKCl7XG4gICAgaWYodGhpcy5kYW1hZ2Vab25lLmludGVyc2VjdHNSYXcodGhpcy5wbGF5ZXIubGVmdCx0aGlzLnBsYXllci5yaWdodCx0aGlzLnBsYXllci50b3AsdGhpcy5wbGF5ZXIuYm90dG9tKSl7XG4gICAgICBUb29scy5wbGF5U291bmQodGhpcy5zZngsWydGb290c3RlcF9XYXRlcl8wNCcsJ0Zvb3RzdGVwX1dhdGVyXzA1JywnRm9vdHN0ZXBfV2F0ZXJfMDYnXSk7XG4gICAgICB0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoNCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dEVwaXNvZGUodGhpc0JvZHksdGhhdEJvZHkpe1xuICAgIGlmKHRoYXRCb2R5LnNwcml0ZSYmdGhhdEJvZHkuc3ByaXRlLmtleT09PSdwbGF5ZXInKXtcbiAgICAgIHRoaXMuY2hlZXNlU2NvcmUuYWRkVG9Ub3RhbFNjb3JlKDUpO1xuICAgICAgdGhpcy5zdGF0ZS5zdGFydCgncHJlbG9hZCcsdHJ1ZSxmYWxzZSwnZXA2Jyk7XG4gICAgfVxuICB9XG5cbiAgLy8vLy0tLT4gSW4gR2FtZSBNZW51XG4gIHJlc3VtZUdhbWUoKXtcbiAgICBsZXQgc29tZXBvcHVwICA9IHRoaXMud29ybGQuZ2V0VG9wKCk7XG4gICAgaWYoc29tZXBvcHVwLmtleT09PSdwb3B1cCcpe1xuICAgICAgdGhpcy53b3JsZC5yZW1vdmVDaGlsZChzb21lcG9wdXApO1xuICAgICAgc29tZXBvcHVwLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5nYW1lLnBhdXNlZD1mYWxzZTtcbiAgfVxuXG4gIC8vcHJvY2Vzc2luZyBmb3IgcG9wIHVwIG1lbnUgaXRlbXNcbiAgcHJvY2Vzc1NlbGVjdGlvbigpe1xuICAgIC8vbGV0IHBvcHVwVGV4dCA9IHRoaXMucG9wdXAub3B0aW9uRW50ZXJlZCgpO1xuICAgIGxldCBwb3B1cFRleHQgPSB0aGlzLndvcmxkLmdldFRvcCgpLm9wdGlvbkVudGVyZWQoKTtcbiAgICBpZighcG9wdXBUZXh0KSByZXR1cm47XG5cbiAgICBjb25zb2xlLmxvZyhcImVudGVyIFwiK3BvcHVwVGV4dCk7XG4gICAgLy90aGlzIGd1eSBoYXMgdG8gZG8gdGhlIGxpZnRpbmcgZm9yIHRoZSBvcHRpb25zXG4gICAgc3dpdGNoKHBvcHVwVGV4dCl7XG4gICAgICBjYXNlICdSZXN1bWUgR2FtZSc6XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdSZXN0YXJ0IEVwaXNvZGUnOlxuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTsvL25lZWQgdG8gdW5wYXVzZSB0aGUgZ2FtZSBiZWZvcmUgY2hhbmdlIHN0YXRlXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ2VwNScpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdJbnN0cnVjdGlvbnMnOlxuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24gPSBuZXcgUG9wdXAodGhpcy5nYW1lLHRoaXMuY2FtZXJhLngsdGhpcy5jYW1lcmEueSwzKTtcbiAgICAgICAgbGV0IGluc3RydWN0aW9uID0gdGhpcy5jYWNoZS5nZXRKU09OKCdjb25maWcnKS5wb3B1cC5pbnN0cnVjdGlvbnM7XG4gICAgICAgIHRoaXMucG9wdXBJbnN0cnVjdGlvbi5zZXRUaXRsZShpbnN0cnVjdGlvblsndGl0bGUnXSk7XG4gICAgICAgIHRoaXMucG9wdXBJbnN0cnVjdGlvbi5zZXREZXNjcmlwdGlvbihpbnN0cnVjdGlvblsnZGVzY3JpcHRpb24nXSwwKTtcblxuICAgICAgICB0aGlzLndvcmxkLnJlbW92ZUNoaWxkKHRoaXMucG9wdXApO1xuICAgICAgICB0aGlzLndvcmxkLmFkZENoaWxkKHRoaXMucG9wdXBJbnN0cnVjdGlvbik7XG4gICAgICAgIHRoaXMuZW5hYmxlQ3Vyc29yS2V5cyhmYWxzZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0dvdCBpdCEnOlxuICAgICAgICB0aGlzLmVuYWJsZUN1cnNvcktleXModHJ1ZSk7XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdRdWl0IHRvIE1haW4gTWVudSc6XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdtZW51Jyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ011dGUgTXVzaWMnOlxuICAgICAgICBjb25zb2xlLmxvZyhcIm11dGluZyBtdXNpYyBcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXRoZW1lJyx0cnVlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdXRlIFNvdW5kJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJtdXRpbmcgc291bmRcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXNvdW5kJyx0cnVlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnNmeCx0cnVlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGxheSBNdXNpYyc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWluZyBtdXNpY1wiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRldGhlbWUnLGZhbHNlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLGZhbHNlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGxheSBTb3VuZCc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWluZyBzb3VuZFwiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRlc291bmQnLGZhbHNlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnNmeCxmYWxzZSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBlbmFibGVDdXJzb3JLZXlzKGJvb2wpe1xuICAgICAgdGhpcy5uYXZpS2V5cy51cC5lbmFibGVkID0gYm9vbDtcbiAgICAgIHRoaXMubmF2aUtleXMuZG93bi5lbmFibGVkID0gYm9vbDtcbiAgfVxuXG4gIHBsYXRmb3JtSGl0TGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiYodGhhdEJvZHkuc3ByaXRlLmZyYW1lTmFtZT09J3NsaXBwZXJ5MSd8fHRoYXRCb2R5LnNwcml0ZS5mcmFtZU5hbWU9PSdzbGlwcGVyeTInKSl7XG4gICAgICBUb29scy5wbGF5U291bmQodGhpcy5zZngsWydzbGltZTcnLCdzbGltZTgnLCdzbGltZTknXSk7XG4gICAgICB0aGlzLnBsYXllci5vbnNsaXBweXBsYXRmb3JtPXRydWU7XG4gICAgfWVsc2V7XG4gICAgICBpZih0aGlzLnBsYXllci5vbnNsaXBweXBsYXRmb3JtKXRoaXMucGxheWVyLm9uc2xpcHB5cGxhdGZvcm09ZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29sbGVjdGFibGVzTGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiZ0aGF0Qm9keS5zcHJpdGUua2V5PT09XCJwbGF5ZXJcIil7XG4gICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb250YWN0ZWQgYnkgXCIrdGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSk7XG4gICAgICBzd2l0Y2godGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSl7XG4gICAgICAgIGNhc2UgJ2NoZWVzZTEnOlxuICAgICAgICAgIC8vaW5jcmVhc2UgcGxheWVyIGVuZXJneS4uXG4gICAgICAgICAgdGhpcy5wbGF5ZXIucmVwbGVuaXNoRW5lcmd5KDEwKTtcbiAgICAgICAgICB0aGlzLmNoZWVzZVNjb3JlLmluY3JlYXNlU2NvcmUoMik7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoZWVzZTInOlxuICAgICAgICBjYXNlICdjaGVlc2UzJzpcbiAgICAgICAgICAvL2luY3JlYXNlIHBsYXllciBlbmVyZ3kuLlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaEVuZXJneSg1KTtcbiAgICAgICAgICB0aGlzLmNoZWVzZVNjb3JlLmluY3JlYXNlU2NvcmUoMSk7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dpbmVnbGFzcyc6XG4gICAgICAgIGNhc2UgJ21hcnRpbmlnbGFzcyc6XG4gICAgICAgICAgdGhpcy5wbGF5ZXIucmVwbGVuaXNoTGlmZSgxMCk7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dpbmVib3R0bGUnOlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaExpZmUoMjApO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzaHVyaWtlbnMnOlxuICAgICAgICAgIGlmKCF0aGlzLnBsYXllci50aHJvd0VuYWJsZWQpIHRoaXMucGxheWVyLnRocm93Qm9keSgpOy8vcGxheWVyIG1pZ2h0IHN0YXJ0IG5ldyBnYW1lLCBuIHRoZW4gY29udGludWUgdGhpcyBlcFxuXG4gICAgICAgICAgLy9pbmNyZWFzZSBwbGF5ZXIgc2h1cmlrZW5zIGNvdW50XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuaW5jcmVhc2VTaHVyaWtlbig1KTtcbiAgICAgICAgICB0aGlzLnNmeC5wbGF5KCdSaXNlMDQnKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vZmxhc2h5XG4gICAgICB0aGlzLnBsYXllci5mbGFzaCgnZ3JlZW4nKTtcbiAgICAgIC8vZGVzdHJveSB0aGUgc2FpZCBzcHJpdGVcbiAgICAgIHRoaXNCb2R5LnNwcml0ZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgZW5lbXlIaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICBpZih0aGF0Qm9keS5zcHJpdGUmJnRoYXRCb2R5LnNwcml0ZS5rZXk9PT0ncGxheWVyJyl7XG4gICAgICAvL0RvZXMgdGhlIHRoaW5ncyB0aGF0IGhpdCBwbGF5ZXIgYWxsIGhhdmUgc3ByaXRlIHNoYXBlPyBhbmQgZGVmaW5lZCBrZXk/XG4gICAgICBpZih0aGlzQm9keS5zcHJpdGUpe1xuICAgICAgICBjb25zb2xlLmxvZygncGxheWVyIGhpdCBieTogJyt0aGlzQm9keS5zcHJpdGUua2V5KyAnICcrdGhpc0JvZHkuc3ByaXRlLm5hbWUpO1xuICAgICAgICBzd2l0Y2godGhpc0JvZHkuc3ByaXRlLmtleSl7XG4gICAgICAgICAgY2FzZSAncmF0Z3J1bnQnOi8vcmF0IGdydW50XG4gICAgICAgICAgICBpZih0aGlzU2hhcGU9PT10aGlzQm9keS5kYXRhLnNoYXBlc1swXSl0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoNSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmF0c29sZGllcic6Ly9yYXQgc29sZGllclxuICAgICAgICAgIGNhc2UgJ3JhdG5pbmphJzpcbiAgICAgICAgICAgIGlmICgvXnNcXGR7MX0vLnRlc3QodGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSkpe1xuICAgICAgICAgICAgICB0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoNSwyMDApO1xuICAgICAgICAgICAgICB0aGlzQm9keS5zcHJpdGUua2lsbCgpO1xuICAgICAgICAgICAgfWVsc2UgaWYodGhpc1NoYXBlPT09dGhpc0JvZHkuZGF0YS5zaGFwZXNbMF0pdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NhdCc6XG4gICAgICAgICAgICB0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoOCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnb2JqZWN0czMnOi8vb2JqZWN0cyAzIGFyZSBhbGwgYmFsbHNcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmRhbWFnZVBsYXllcig0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdvYmplY3RzMic6XG4gICAgICAgICAgICBsZXQgc3RyID0gdGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZTtcbiAgICAgICAgICAgIC8vYmVsb3cgbWF0Y2ggaXRzIGEgc3RhbGFjaXRlcyAtIHVwcGVyey9kfSBhbmQgYmVsb3cgey9kfVxuICAgICAgICAgICAgaWYoL151cHBlclxcZHsxfS8udGVzdChzdHIpfHwvXmJlbG93XFxkezF9Ly50ZXN0KHN0cikpdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29iamVjdHMxJzovL2NsdWJiZWQgYnkgc29sZGllclxuICAgICAgICAgICAgaWYodGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZT09J3N0b3AnKXRoaXMucGxheWVyLmRhbWFnZVBsYXllcig1LDIwMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5ZXJIaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICAgIC8vaGl0Ym94IG9ubHkgdGFyZ2V0IGlzIGVuZW15IHNvIHByZXR0eSBtdWNoIG5vIG5lZWQgdG8gY2hlY2tcbiAgICAgIGlmKHRoYXRCb2R5LnNwcml0ZSl7XG4gICAgICAgIGlmKHRoaXNCb2R5LnNwcml0ZSYmL15zXFxkezF9Ly50ZXN0KHRoaXNCb2R5LnNwcml0ZS5mcmFtZU5hbWUpKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNodXJpa2VuIGhpdFwiKTtcbiAgICAgICAgICAvL2tpbGwgdGhlIHNodXJpa2VuIGJvZHlcbiAgICAgICAgICBzd2l0Y2godGhhdEJvZHkuc3ByaXRlLmtleSl7XG4gICAgICAgICAgICBjYXNlICdyYXRncnVudCc6XG4gICAgICAgICAgICBjYXNlICdyYXRzb2xkaWVyJzpcbiAgICAgICAgICAgIGNhc2UgJ3JhdG5pbmphJzpcbiAgICAgICAgICAgICAgdGhhdEJvZHkuc3ByaXRlLmRhbWFnZVJhdCg2LDQwMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NhdCc6XG4gICAgICAgICAgICAgIHRoYXRCb2R5LnNwcml0ZS5kYW1hZ2VDYXQoNiw0MDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXNCb2R5LnNwcml0ZS5raWxsKCk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgc3dpdGNoKHRoYXRCb2R5LnNwcml0ZS5rZXkpe1xuICAgICAgICAgICAgY2FzZSAncmF0Z3J1bnQnOlxuICAgICAgICAgICAgY2FzZSAncmF0c29sZGllcic6XG4gICAgICAgICAgICBjYXNlICdyYXRuaW5qYSc6XG4gICAgICAgICAgICAgIHRoYXRCb2R5LnNwcml0ZS5kYW1hZ2VSYXQoOCw0MDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYXQnOlxuICAgICAgICAgICAgICB0aGF0Qm9keS5zcHJpdGUuZGFtYWdlQ2F0KDgsNDAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy50aW1lLmZwcyB8fCAnLS0nLCAyLCAxNCwgXCIjYTdhZWJlXCIpO1xuICB9XG5cbiAgc2h1dGRvd24oKXtcblxuICB9XG5cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL3ByZWZhYnMvUGxheWVyLmpzXCI7XG5pbXBvcnQgRW50cmFuY2VEb29yIGZyb20gXCIuLi9wcmVmYWJzL0VudHJhbmNlRG9vci5qc1wiO1xuaW1wb3J0IEJsb2NraW5nT2JqZWN0cyBmcm9tIFwiLi4vcHJlZmFicy9CbG9ja2luZ09iamVjdHMuanNcIlxuaW1wb3J0IENvbGxlY3RhYmxlcyBmcm9tIFwiLi4vcHJlZmFicy9Db2xsZWN0YWJsZXMuanNcIlxuaW1wb3J0IFdhdmVzT2JqZWN0cyBmcm9tIFwiLi4vcHJlZmFicy9XYXZlc09iamVjdHMuanNcIlxuaW1wb3J0IFBsYXRmb3JtcyBmcm9tIFwiLi4vcHJlZmFicy9QbGF0Zm9ybXMuanNcIlxuaW1wb3J0IEhlYWx0aEJhciBmcm9tIFwiLi4vcHJlZmFicy9IZWFsdGhCYXIuanNcIlxuaW1wb3J0IEVuZXJneUJhciBmcm9tIFwiLi4vcHJlZmFicy9FbmVyZ3lCYXIuanNcIlxuaW1wb3J0IFJhdFNvbGRpZXIgZnJvbSBcIi4uL3ByZWZhYnMvUmF0U29sZGllci5qc1wiXG5pbXBvcnQgUmF0TmluamEgZnJvbSBcIi4uL3ByZWZhYnMvUmF0TmluamEuanNcIlxuaW1wb3J0IFJhdEJvc3MgZnJvbSBcIi4uL3ByZWZhYnMvUmF0Qm9zcy5qc1wiXG5pbXBvcnQgQ2F0RmluYWxlIGZyb20gXCIuLi9wcmVmYWJzL0NhdEZpbmFsZS5qc1wiXG5pbXBvcnQgU3RhbGFjaXRlcyBmcm9tIFwiLi4vcHJlZmFicy9TdGFsYWNpdGVzLmpzXCJcbmltcG9ydCBFbmVteVN0b3BzIGZyb20gXCIuLi9wcmVmYWJzL0VuZW15U3RvcHMuanNcIlxuaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9wcmVmYWJzL1BvcHVwLmpzXCJcbmltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiXG5pbXBvcnQgQ2hlZXNlU2NvcmUgZnJvbSBcIi4uL3ByZWZhYnMvQ2hlZXNlU2NvcmUuanNcIlxuaW1wb3J0IFNodXJpa2VuSFVEIGZyb20gXCIuLi9wcmVmYWJzL1NodXJpa2VuSFVELmpzXCJcbmltcG9ydCBUaXRsZVRleHQgZnJvbSBcIi4uL3ByZWZhYnMvVGl0bGVUZXh0LmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXA2IGV4dGVuZHMgUGhhc2VyLlN0YXRle1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vb2JqZWN0IGxldmVsIHByb3BlcnRpZXNcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY3JlYXRlKCl7XG5cbiAgICB0aGlzLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuUDJKUyk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmdyYXZpdHkueSA9IDgwMDtcbiAgICAvL3RoaXMgc2V0cyB0aGUgZGVmYXVsdCBjb250YWN0IG1hdGVyaWFsIHRvIGFsbCBQMiBib2R5IGluIHRoaXMgd29ybGRcbiAgICB0aGlzLnBoeXNpY3MucDIud29ybGQuZGVmYXVsdENvbnRhY3RNYXRlcmlhbC5mcmljdGlvbiA9IDAuNDI7Ly9wZXJmZWN0IG5vdCB0byBiZSBBSVJCT1JORVxuICAgIHRoaXMucGh5c2ljcy5wMi53b3JsZC5zZXRHbG9iYWxTdGlmZm5lc3MoMWU1KTtcblxuICAgIC8vbWFwIHN0YXJ0XG4gICAgdGhpcy5tYXAgPSB0aGlzLmFkZC50aWxlbWFwKCdlcDYnKTtcbiAgICAvL2FkZCB0aWxlc2V0IGltYWdlXG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCd0aWxlJyk7XG4gICAgLy9wYXJhbGxheCBiYWNrZ3JvdW5kXG4gICAgdGhpcy5iZyA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKCdiYWNrZ3JvdW5kJyk7XG4gICAgdGhpcy5iZy5zY3JvbGxGYWN0b3JYID0gLjc7XG4gICAgdGhpcy5iZy5zY3JvbGxGYWN0b3JZID0gLjc7XG5cbiAgICAvL3dhbGthYmxlIHRpbGVzXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKCd0aWxlcycpO1xuXG4gICAgLy9jb2xsaXNpb25cbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XG4gICAgdGhpcy5tYXAuc2V0Q29sbGlzaW9uQmV0d2VlbigxLDEyMix0cnVlLHRoaXMubGF5ZXIpO1xuICAgIGxldCB0aWxlc0JvZGllcyA9IHRoaXMucGh5c2ljcy5wMi5jb252ZXJ0VGlsZW1hcCh0aGlzLm1hcCwgdGhpcy5sYXllcik7XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvL2FkZCBwbGF0Zm9ybXNcbiAgICB0aGlzLnBsYXRmb3Jtc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKVxuICAgIGxldCBzbGlwcGVyeU1hdGVyaWFscyA9IG5ldyBBcnJheSgpO1xuICAgIFRvb2xzLmZpbmRVbmlxdWVHSURJbkxheWVyKHRoaXMubWFwLCAncGxhdGZvcm1zJykuZm9yRWFjaCgoZWxlbWVudCk9PntcbiAgICAgIC8vbG9va3MgbGlrZSBkb2VzbnQgc3VwcG9ydCBvYmplY3QgdW5pcXVlIGlkIGZvciBub3dcbiAgICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdwbGF0Zm9ybXMnLGVsZW1lbnQuZ2lkLCdvYmplY3RzMScsZWxlbWVudC5uYW1lLHRydWUsZmFsc2UsdGhpcy5wbGF0Zm9ybXNHcm91cCxQbGF0Zm9ybXMpO1xuICAgIH0pO1xuICAgIHRoaXMucGxhdGZvcm1zR3JvdXAuZm9yRWFjaCgoY2hpbGQpPT57Ly90aGlzIGlzIE5PVCBpbiBvcmRlciBvZiB0aGUgVGlsZWQgc2luY2UgdGhlIGFib3ZlIGFkZCBhbGwgZ2lkcyAxODMgVEhFTiAxODJcbiAgICAgIHNsaXBwZXJ5TWF0ZXJpYWxzLnB1c2godGhpcy5waHlzaWNzLnAyLmNyZWF0ZU1hdGVyaWFsKCdzbGlwcGVyeU1hdGVyaWFsJyxjaGlsZC5ib2R5KSk7XG4gICAgfSx0aGlzKTtcblxuICAgIC8vYWRkIGJsb2NraW5nIG9iamVjdHNcbiAgICB0aGlzLmJsb2NraW5nR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIFRvb2xzLmZpbmRVbmlxdWVHSURJbkxheWVyKHRoaXMubWFwLCAnYmxvY2tpbmdvYmplY3RzJykuZm9yRWFjaCgoZWxlbWVudCk9PntcbiAgICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnYmxvY2tpbmdvYmplY3RzJyxlbGVtZW50LmdpZCwnb2JqZWN0czEnLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMuYmxvY2tpbmdHcm91cCxCbG9ja2luZ09iamVjdHMpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgbGFyZ2Ugcm9ja1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdsYXJnZXJvY2snLDI3LCdvYmplY3RzNScsJ2xhcmdlcm9jaycsdHJ1ZSxmYWxzZSx0aGlzLmJsb2NraW5nR3JvdXAsQmxvY2tpbmdPYmplY3RzKTtcbiAgICB0aGlzLmxhcmdlcm9jayAgPSB0aGlzLmJsb2NraW5nR3JvdXAuZ2V0VG9wKCk7XG4gICAgY29uc29sZS5sb2coXCJ0aGlzIGxhcmdlcm9jaz8gXCIrIHRoaXMubGFyZ2Vyb2NrLmZyYW1lTmFtZSk7XG5cbiAgICAvL2FkZCBlbnRyYW5jZSBkb29yIC0tIGJlaGluZCBvZiBjb2xsZWN0YWJsZXNcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZG9vcicsNSwnb2JqZWN0czEnLCdlbnRyYW5jZWRvb3InLHRydWUsZmFsc2UsdGhpcy53b3JsZCxFbnRyYW5jZURvb3IpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yID0gdGhpcy53b3JsZC5nZXRUb3AoKTtcbiAgICB0aGlzLmVudHJhbmNlZG9vci5raWxsKCk7XG5cbiAgICAvL2FkZCBjb2xsZWN0YWJsZXNcbiAgICB0aGlzLmNvbGxlY3RhYmxlc0dyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICBUb29scy5maW5kVW5pcXVlR0lESW5MYXllcih0aGlzLm1hcCwgJ2NvbGxlY3RhYmxlcycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnY29sbGVjdGFibGVzJyxlbGVtZW50LmdpZCwnb2JqZWN0czEnLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMuY29sbGVjdGFibGVzR3JvdXAsQ29sbGVjdGFibGVzKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdjaGVlc2VwdWxlJywyNiwnb2JqZWN0czUnLCdjaGVlc2VwdWxlJyx0cnVlLGZhbHNlLHRoaXMuY29sbGVjdGFibGVzR3JvdXAsQ29sbGVjdGFibGVzKTtcblxuXG4gICAgLy9hZGQgd2VhcG9uc1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCd3ZWFwb25zJywyOSwnb2JqZWN0czQnLCdzaHVyaWtlbnMnLHRydWUsZmFsc2UsdGhpcy5jb2xsZWN0YWJsZXNHcm91cCxDb2xsZWN0YWJsZXMpO1xuXG4gICAgLy9hZGQgdGhlIHN0YWxhY2l0ZXNcbiAgICB0aGlzLnN0YWxhY2l0ZXNHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XG4gICAgVG9vbHMuZmluZFVuaXF1ZUdJREluTGF5ZXIodGhpcy5tYXAsICdzdGFsYWNpdGVzJykuZm9yRWFjaCgoZWxlbWVudCk9PntcbiAgICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdzdGFsYWNpdGVzJyxlbGVtZW50LmdpZCwnb2JqZWN0czInLGVsZW1lbnQubmFtZSx0cnVlLGZhbHNlLHRoaXMuc3RhbGFjaXRlc0dyb3VwLFN0YWxhY2l0ZXMpO1xuICAgIH0pO1xuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIodGhpcy5nYW1lLDYwLDE1NzUpOy8vc3RhcnQgcG9zXG5cbiAgICBsZXQgcGxheWVyTWF0ZXJpYWwgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlTWF0ZXJpYWwoJ3BsYXllck1hdGVyaWFsJywgdGhpcy5wbGF5ZXIuYm9keSk7XG5cbiAgICB0aGlzLmFkZC5leGlzdGluZyh0aGlzLnBsYXllcik7XG5cbiAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIsUGhhc2VyLkNhbWVyYS5GT0xMT1dfUExBVEZPUk1FUik7XG5cbiAgICAvL3N0b3AgYWxsIHByZXZpb3VzIHBsYXlpbmcgc291bmQgZmlyc3RcbiAgICB0aGlzLnNvdW5kLnN0b3BBbGwoKTtcbiAgICB0aGlzLnNmeCA9IHRoaXMuYWRkLmF1ZGlvU3ByaXRlKCdzZngnKTtcbiAgICB0aGlzLnRoZW1lID0gdGhpcy5hZGQuYXVkaW9TcHJpdGUoJ2Jvc3MnKTtcbiAgICBpZihUb29scy5nZXREYXRhKCdtdXRlc291bmQnKSlUb29scy5tdXRlT3JQbGF5KHRoaXMuc2Z4LHRydWUpO1xuICAgIGlmKFRvb2xzLmdldERhdGEoJ211dGV0aGVtZScpKVRvb2xzLm11dGVPclBsYXkodGhpcy50aGVtZSx0cnVlKTtcblxuICAgIHRoaXMucGxheWVyLnNmeCA9IHRoaXMuc2Z4O1xuXG4gICAgLy8tLS0tLS0tIGVuZW1pZXMgcmF0cyBvbmx5IGluaXRpYWxpemVkIGFmdGVyIHJhdCBib3NzIHNwZWVjaFxuICAgIC8vYWRkIGVuZW15IHJhdCBzb2xkaWVyc1xuICAgIHRoaXMucmF0R3JvdXAgPSB0aGlzLmFkZC5ncm91cCh0aGlzLndvcmxkLCdyYXRzJyk7XG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3JhdHNvbGRpZXJzJywyMCwncmF0c29sZGllcicsJ2hpdGZyYW1lMCcsdHJ1ZSxmYWxzZSx0aGlzLnJhdEdyb3VwLFJhdFNvbGRpZXIpO1xuICAgIC8qXG4gICAgdGhpcy5yYXRHcm91cC5mb3JFYWNoKChyYXRTb2xkaWVyKT0+e1xuICAgICAgcmF0U29sZGllci5wYXVzZWQ9dHJ1ZTtcbiAgICB9LHRoaXMpOyovXG4gICAgdGhpcy5yYXRHcm91cC5zZXRBbGwoJ3BhdXNlZCcsdHJ1ZSk7IC8vLS0gc2V0IGFsbCBwYXVzZWQgdG8gdHJ1ZSBhdCBmaXJzdFxuXG4gICAgLy9hZGQgZW5lbXkgcmF0IHJhdG5pbmphc1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdyYXRuaW5qYXMnLDI4LCdyYXRuaW5qYScsJ3Rocm93ZnJhbWUxJyx0cnVlLGZhbHNlLHRoaXMucmF0R3JvdXAsUmF0TmluamEpO1xuXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoJ3JhdGJvc3MnLDI0LCdyYXRib3NzJywnYm9keWYxJyx0cnVlLGZhbHNlLHRoaXMucmF0R3JvdXAsUmF0Qm9zcyk7XG5cbiAgICB0aGlzLnJhdEdyb3VwLmZvckVhY2goKHJhdCk9PntcbiAgICAgIHJhdC5wbGF5ZXIgPSB0aGlzLnBsYXllcjtcbiAgICAgIHJhdC5zZnggPSB0aGlzLnNmeDtcbiAgICB9LHRoaXMpO1xuXG4gICAgbGV0IHJhdGJvc3MgPSB0aGlzLnJhdEdyb3VwLmdldFRvcCgpO1xuICAgIGNvbnNvbGUubG9nKCdyYXRib3NzPyAnK3JhdGJvc3Mua2V5KTtcbiAgICAvL3JhdGJvc3Muc2Z4ID0gdGhpcy5zZng7XG4gICAgbGV0IHJpZ2h0YXJtID0gcmF0Ym9zcy5yaWdodGFybTtcbiAgICBsZXQgcmF0Ym9zc21hdGVyaWFsID0gIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVNYXRlcmlhbCgncmF0Ym9zc21hdGVyaWFsJywgcmF0Ym9zcy5ib2R5KTtcbiAgICBsZXQgYXJtbWF0ZXJpYWwgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlTWF0ZXJpYWwoJ2FybW1hdGVyaWFsJywgcmlnaHRhcm0uYm9keSk7XG5cbiAgICB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29udGFjdE1hdGVyaWFsKHBsYXllck1hdGVyaWFsLGFybW1hdGVyaWFsLHtmcmljdGlvbjowLjM1LHJlc3RpdHV0aW9uOjAuOH0pO1xuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwocGxheWVyTWF0ZXJpYWwscmF0Ym9zc21hdGVyaWFsLHtmcmljdGlvbjowLjM1LHJlc3RpdHV0aW9uOjAuOH0pO1xuXG4gICAgLy9jb250YWN0IG1hdGVyaWFsIHdpdGggc2xpcHBlcnkgcGxhdGZvcm1zLi5cbiAgICB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29udGFjdE1hdGVyaWFsKHBsYXllck1hdGVyaWFsLCBzbGlwcGVyeU1hdGVyaWFsc1swXSx7ZnJpY3Rpb246MC4zNSxzdXJmYWNlVmVsb2NpdHk6LTEwMDB9KTtcbiAgICB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29udGFjdE1hdGVyaWFsKHBsYXllck1hdGVyaWFsLCBzbGlwcGVyeU1hdGVyaWFsc1sxXSx7ZnJpY3Rpb246MC4zNSxzdXJmYWNlVmVsb2NpdHk6MTAwMH0pO1xuICAgIHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb250YWN0TWF0ZXJpYWwocGxheWVyTWF0ZXJpYWwsIHNsaXBwZXJ5TWF0ZXJpYWxzWzJdLHtmcmljdGlvbjowLjM1LHN1cmZhY2VWZWxvY2l0eToxMDAwfSk7XG4gICAgdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbnRhY3RNYXRlcmlhbChwbGF5ZXJNYXRlcmlhbCwgc2xpcHBlcnlNYXRlcmlhbHNbM10se2ZyaWN0aW9uOjAuMzUsc3VyZmFjZVZlbG9jaXR5OjEwMDB9KTtcblxuXG4gICAgLy9icmluZyB0aGUgcmF0cyBncm91cCB0byBmcm9udCwgdGhlIGFybSB0byBiYWNrXG4gICAgdGhpcy53b3JsZC5icmluZ1RvVG9wKHRoaXMucmF0R3JvdXApO1xuXG4gICAgLy9hZGQgZW5lbXkgc3RvcHNcbiAgICB0aGlzLnN0b3BzR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIFRvb2xzLmZpbmRVbmlxdWVHSURJbkxheWVyKHRoaXMubWFwLCAnZW5lbXlzdG9wcycpLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cygnZW5lbXlzdG9wcycsZWxlbWVudC5naWQsJ29iamVjdHMxJyxlbGVtZW50Lm5hbWUsdHJ1ZSxmYWxzZSx0aGlzLnN0b3BzR3JvdXAsRW5lbXlTdG9wcyk7XG4gICAgfSk7XG5cbiAgICAvL1VJIHNldHVwXG4gICAgdGhpcy5oZWFsdGhCYXIgPSBuZXcgSGVhbHRoQmFyKHRoaXMuZ2FtZSwyMCwyMCk7XG4gICAgdGhpcy5lbmVyZ3lCYXIgPSBuZXcgRW5lcmd5QmFyKHRoaXMuZ2FtZSwzMSw4MCk7XG4gICAgdGhpcy5wbGF5ZXIuZW5lcmd5QmFyID0gdGhpcy5lbmVyZ3lCYXI7XG4gICAgdGhpcy5wbGF5ZXIuaGVhbHRoQmFyID0gdGhpcy5oZWFsdGhCYXI7XG5cbiAgICB0aGlzLmNoZWVzZVNjb3JlID0gbmV3IENoZWVzZVNjb3JlKHRoaXMuZ2FtZSw0NjAsMjAsMTA5KTtcbiAgICB0aGlzLnNodXJpa2VuSFVEID0gbmV3IFNodXJpa2VuSFVEKHRoaXMuZ2FtZSw4NzAsMjUsMTgpO1xuICAgIHRoaXMucGxheWVyLnNodXJpa2VuSFVEID0gdGhpcy5zaHVyaWtlbkhVRDtcblxuICAgIC8vYWRkIGNvbGxpc2lvbiBncm91cHNcbiAgICAvLyAgVHVybiBvbiBpbXBhY3QgZXZlbnRzIGZvciB0aGUgd29ybGQsIHdpdGhvdXQgdGhpcyB3ZSBnZXQgbm8gY29sbGlzaW9uIGNhbGxiYWNrc1xuICAgIHRoaXMucGh5c2ljcy5wMi5zZXRJbXBhY3RFdmVudHModHJ1ZSk7XG5cbiAgICBsZXQgdGlsZXNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBwbGF0Zm9ybXNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBzdGFsYWNpdGVzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgcGxheWVyQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgaGl0Ym94Q0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgc2h1cmlrZW5ib3hDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCByYXRIaXRib3hDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIGxldCBuaW5qYVNodXJpa2VuQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgYmxvY2tpbmdPYmplY3RzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgY29sbGVjdGFibGVzQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgcmF0Q0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICBsZXQgc3RvcHNDRyA9IHRoaXMucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xuICAgIHRoaXMuY2F0Q0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICB0aGlzLmVudHJhbmNlZG9vckNHID0gdGhpcy5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XG5cbiAgICBsZXQgYXJtQ0cgPSB0aGlzLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcblxuICAgIC8vdXBkYXRlIHdvcmxkIGJvdW5kcyBjb2xsaXNpb24gZ3JvdXAgIHRvIGNvbGxpZGUgd2l0aCBhbGwgdGhlIGN1c3RvbSBjb2xsaXNpb24gZ3JvdXBzXG4gICAgdGhpcy5waHlzaWNzLnAyLnVwZGF0ZUJvdW5kc0NvbGxpc2lvbkdyb3VwKCk7XG4gICAgLy9zZXQgdGhlIGNvbGxpc2lvbnNcbiAgICB0aWxlc0JvZGllcy5mb3JFYWNoKCh0aWxlKT0+e1xuICAgICAgdGlsZS5zZXRDb2xsaXNpb25Hcm91cCh0aWxlc0NHKTtcbiAgICAgIHRpbGUuY29sbGlkZXMoW3BsYXllckNHLGNvbGxlY3RhYmxlc0NHLGJsb2NraW5nT2JqZWN0c0NHLHJhdENHXSk7XG4gICAgfSk7XG4gICAgdGhpcy5wbGF0Zm9ybXNHcm91cC5mb3JFYWNoKChjaGlsZCk9PntcbiAgICAgIGNoaWxkLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocGxhdGZvcm1zQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhbcGxheWVyQ0csY29sbGVjdGFibGVzQ0cscmF0Q0ddKTtcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMuc3RhbGFjaXRlc0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChzdGFsYWNpdGVzQ0cpO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmVuZW15SGl0TGlzdGVuZXIsdGhpcylcbiAgICB9LHRoaXMpO1xuICAgIHRoaXMucGxheWVyLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAocGxheWVyQ0cpO1xuICAgIHRoaXMucGxheWVyLmJvZHkuY29sbGlkZXMoW3RpbGVzQ0csc3RhbGFjaXRlc0NHLGJsb2NraW5nT2JqZWN0c0NHLHBsYXRmb3Jtc0NHLGNvbGxlY3RhYmxlc0NHLHJhdENHLHJhdEhpdGJveENHLGFybUNHLG5pbmphU2h1cmlrZW5DR10sdGhpcy5wbGF0Zm9ybUhpdExpc3RlbmVyLHRoaXMpO1xuICAgIHRoaXMucGxheWVyLmhpdGJveDEuYm9keS5zZXRDb2xsaXNpb25Hcm91cChoaXRib3hDRyk7XG4gICAgdGhpcy5wbGF5ZXIuaGl0Ym94MS5ib2R5LmNvbGxpZGVzKFtyYXRDRyxuaW5qYVNodXJpa2VuQ0ddLHRoaXMucGxheWVySGl0TGlzdGVuZXIsdGhpcyk7XG4gICAgdGhpcy5wbGF5ZXIuc2h1cmlrZW5zLmZvckVhY2goKHNodXJpa2VuKT0+e1xuICAgICAgc2h1cmlrZW4uYm9keS5zZXRDb2xsaXNpb25Hcm91cChzaHVyaWtlbmJveENHKTtcbiAgICAgIHNodXJpa2VuLmJvZHkuY29sbGlkZXMoW25pbmphU2h1cmlrZW5DRyxhcm1DR10pO1xuICAgICAgc2h1cmlrZW4uYm9keS5jb2xsaWRlcyhyYXRDRyx0aGlzLnBsYXllckhpdExpc3RlbmVyLHRoaXMpO1xuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5ibG9ja2luZ0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChibG9ja2luZ09iamVjdHNDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFtwbGF5ZXJDRyxjb2xsZWN0YWJsZXNDRyxyYXRDRyx0aWxlc0NHXSk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLmNvbGxlY3RhYmxlc0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChjb2xsZWN0YWJsZXNDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFt0aWxlc0NHLHBsYXRmb3Jtc0NHLGJsb2NraW5nT2JqZWN0c0NHXSk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKHBsYXllckNHLHRoaXMuY29sbGVjdGFibGVzTGlzdGVuZXIsdGhpcyk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLnJhdEdyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChyYXRDRyk7XG4gICAgICBjaGlsZC5ib2R5LmNvbGxpZGVzKFt0aWxlc0NHLHBsYXRmb3Jtc0NHLGJsb2NraW5nT2JqZWN0c0NHLHN0b3BzQ0csaGl0Ym94Q0csc2h1cmlrZW5ib3hDR10pO1xuICAgICAgY2hpbGQuYm9keS5jb2xsaWRlcyhwbGF5ZXJDRyx0aGlzLmVuZW15SGl0TGlzdGVuZXIsdGhpcylcbiAgICAgIGlmKGNoaWxkLmtleT09J3JhdHNvbGRpZXInKXtcbiAgICAgICAgLy9mb3IgcmF0IHNvbGRpZXJzIG9ubHlcbiAgICAgICAgY2hpbGQuaGl0Ym94MS5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHJhdEhpdGJveENHKTtcbiAgICAgICAgY2hpbGQuaGl0Ym94MS5ib2R5LmNvbGxpZGVzKHBsYXllckNHLHRoaXMuZW5lbXlIaXRMaXN0ZW5lcix0aGlzKTtcbiAgICAgIH1cbiAgICAgIGlmKGNoaWxkLmtleT09J3JhdG5pbmphJyl7XG4gICAgICAgIGNoaWxkLnNodXJpa2Vucy5mb3JFYWNoKChzaHVyaWtlbik9PntcbiAgICAgICAgICBzaHVyaWtlbi5ib2R5LnNldENvbGxpc2lvbkdyb3VwKG5pbmphU2h1cmlrZW5DRyk7XG4gICAgICAgICAgc2h1cmlrZW4uYm9keS5jb2xsaWRlcyhbaGl0Ym94Q0csc2h1cmlrZW5ib3hDR10pO1xuICAgICAgICAgIHNodXJpa2VuLmJvZHkuY29sbGlkZXMocGxheWVyQ0csdGhpcy5lbmVteUhpdExpc3RlbmVyLHRoaXMpO1xuICAgICAgICB9LHRoaXMpO1xuICAgICAgfVxuICAgIH0sdGhpcyk7XG4gICAgcmlnaHRhcm0uYm9keS5zZXRDb2xsaXNpb25Hcm91cChhcm1DRyk7XG4gICAgcmlnaHRhcm0uYm9keS5jb2xsaWRlcyhbcGxheWVyQ0csc2h1cmlrZW5ib3hDR10pO1xuICAgIHJpZ2h0YXJtLmJvZHkub25CZWdpbkNvbnRhY3QuYWRkKHRoaXMucGxheWVyQXJtZWQsdGhpcyk7XG4gICAgdGhpcy5zdG9wc0dyb3VwLmZvckVhY2goKGNoaWxkKT0+e1xuICAgICAgY2hpbGQuYm9keS5zZXRDb2xsaXNpb25Hcm91cChzdG9wc0NHKTtcbiAgICAgIGNoaWxkLmJvZHkuY29sbGlkZXMoW3JhdENHXSk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLmVudHJhbmNlZG9vci5ib2R5LnNldENvbGxpc2lvbkdyb3VwKHRoaXMuZW50cmFuY2Vkb29yQ0cpO1xuICAgIHRoaXMuZW50cmFuY2Vkb29yLmJvZHkuY29sbGlkZXModGhpcy5jYXRDRyx0aGlzLmZpbmFsRXBpc29kZSx0aGlzKTtcblxuICAgIC8vbG9jayBhcnJvd3Mga2V5IGlucHV0IGZyb20gdGhlIGJyb3dzZXJcbiAgICB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleUNhcHR1cmUoW1BoYXNlci5LZXlib2FyZC5TUEFDRSxQaGFzZXIuS2V5Ym9hcmQuVVAsUGhhc2VyLktleWJvYXJkLkxFRlQsUGhhc2VyLktleWJvYXJkLlJJR0hUXSk7XG4gICAgLy9pbml0aWFsaXplIHBvcCB1cCBwYW5lbHMsbWFpbiBwb3AgdXAsIGluc3RydWN0aW9uLCB0aXAxLi4uTlxuICAgIC8vYWRkIGVzYyBrZXkgdG8gYnJpbmcgdXAgcG9wIHVwIHBhbmVsXG4gICAgdGhpcy5uYXZpS2V5cyA9IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5cyh7ICd1cCc6IFBoYXNlci5LZXlDb2RlLlVQLCAnZG93bic6IFBoYXNlci5LZXlDb2RlLkRPV04sICdlbnRlcic6IFBoYXNlci5LZXlDb2RlLkVOVEVSLCAnZXNjJzpQaGFzZXIuS2V5Q29kZS5FU0MgfSApO1xuICAgIHRoaXMubmF2aUtleXMuZXNjLm9uRG93bi5hZGQoKCk9PntcbiAgICAgIGlmKCF0aGlzLmdhbWUucGF1c2VkKXtcbiAgICAgICAgdGhpcy5nYW1lLnBhdXNlZD10cnVlO1xuICAgICAgICB0aGlzLnBvcHVwID0gbmV3IFBvcHVwKHRoaXMuZ2FtZSx0aGlzLmNhbWVyYS54LHRoaXMuY2FtZXJhLnksMik7XG4gICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGQodGhpcy5wb3B1cCk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTtcbiAgICAgIH1cblxuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5uYXZpS2V5cy51cC5vbkRvd24uYWRkKCh0YXJnZXQpPT57Ly9zaG91bGQgdGhpcyBiZSBhZGRlZCBpbnNpZGUgdGhlIFBvcHVwIGNsYXM/XG4gICAgICAvL2NvbnNvbGUubG9nKFwidXBcIik7XG4gICAgICBpZih0aGlzLmdhbWUucGF1c2VkKXtcbiAgICAgICAgdGhpcy5wb3B1cC5jdXJzb3JNb3ZlZCh0YXJnZXQua2V5Q29kZSk7XG4gICAgICB9XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLmRvd24ub25Eb3duLmFkZCgodGFyZ2V0KT0+e1xuICAgICAgLy9jb25zb2xlLmxvZyhcImRvd25cIik7XG4gICAgICBpZih0aGlzLmdhbWUucGF1c2VkKXtcbiAgICAgICAgdGhpcy5wb3B1cC5jdXJzb3JNb3ZlZCh0YXJnZXQua2V5Q29kZSk7XG4gICAgICB9XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLmVudGVyLm9uRG93bi5hZGQoKCk9PntcbiAgICAgIGlmKHRoaXMuZ2FtZS5wYXVzZWQpdGhpcy5wcm9jZXNzU2VsZWN0aW9uKCk7XG4gICAgfSx0aGlzKTtcblxuICAgIHRoaXMuZ2FtZS5vblBhdXNlLmFkZChmdW5jdGlvbigpe3RoaXMuc291bmQudW5zZXRNdXRlKCk7fSx0aGlzKTsvLzw9PWVuYWJsZSB0aGUgc291bmQgdG8gY29udGludWUgcGxheSAnOyknXG4gICAgdGhpcy50aGVtZS5zb3VuZHNbJ0ltcHJvdiBmb3IgRXZpbCddLnBsYXkoJ0ltcHJvdiBmb3IgRXZpbCcsbnVsbCwwLjQsdHJ1ZSk7XG5cbiAgICB0aGlzLnRpdGxldGV4dCA9ICBuZXcgVGl0bGVUZXh0KHRoaXMuZ2FtZSxcIkVwIDYuIFRoZSBPJ01pZ2h0eSBDbGF3XCIpO1xuICAgIHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMudGl0bGV0ZXh0KTtcblxuICAgIC8vVG8gZ2V0IHRoZSBGUFNcbiAgICB0aGlzLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5zY2VuZXNtYXJrZXIgPSBbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdO1xuICAgIC8vZmlyc3Qgc2NlbmUgLSBzY2FuIHJvb20gLCBib3NzIHNwZWVjaFxuICAgIC8vc2Vjb25kIHNjZW5lIC1cbiAgICB0aGlzLmNhbWVyYXRpbWVyID0gMDtcbiAgICB0aGlzLnNjZW5lY291bnRlciA9IDA7XG5cbiAgfVxuXG4gIGFkZENhdCgpe1xuICAgIC8vYWRkIHRoZSBzcGVjaWFsIGNhdFxuICAgIGlmKHRoaXMuY2F0ZmluYWxlKXJldHVybjtcbiAgICB0aGlzLmNhdEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAodGhpcy53b3JsZCwnY2F0cycpO1xuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKCdjYXRzJywyMywnY2F0ZmluYWxlJywnY2F0ZjEnLHRydWUsZmFsc2UsdGhpcy5jYXRHcm91cCxDYXRGaW5hbGUpO1xuICAgIHRoaXMuY2F0ZmluYWxlID0gdGhpcy5jYXRHcm91cC5nZXRUb3AoKTsvL2NhdCBpcyB0aGUgdG9wIG5vIDI4XG4gICAgdGhpcy5jYXRmaW5hbGUuYm9keS5zZXRDb2xsaXNpb25Hcm91cCh0aGlzLmNhdENHKTtcbiAgICB0aGlzLmNhdGZpbmFsZS5ib2R5LmNvbGxpZGVzKHRoaXMuZW50cmFuY2Vkb29yQ0cpO1xuICB9XG5cbiAgdXBkYXRlKCl7XG5cbiAgICBpZih0aGlzLnBsYXllci54Pj0yNTAmJiF0aGlzLnNjZW5lc21hcmtlclswXSl7XG4gICAgICAvL2ZpcnN0IHNjZW5lIC0gZnJlZXplIHBsYXllciBhbmQgcmVmb2N1cyB0byByYXQgYm9zc1xuICAgICAgdGhpcy5wbGF5ZXIucGF1c2VkID0gdHJ1ZTtcbiAgICAgIC8vc2NhbiByYXQgMyAtIDYgLSA1IC0gYm9zc1xuICAgICAgaWYodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5jYW1lcmF0aW1lcil7XG4gICAgICAgIHN3aXRjaCh0aGlzLnNjZW5lY291bnRlcisrKXtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5yYXRHcm91cC5nZXRDaGlsZEF0KDMpLG51bGwsMC4wMiwwLjAyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5yYXRHcm91cC5nZXRDaGlsZEF0KDYpLG51bGwsMC4wMywwLjAzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5yYXRHcm91cC5nZXRDaGlsZEF0KDUpLG51bGwsMC4wMywwLjAzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBsZXQgYm9zcyA9IHRoaXMucmF0R3JvdXAuZ2V0VG9wKClcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyhib3NzLG51bGwsMC4wMSwwLjAxKTtcbiAgICAgICAgICAgIGJvc3Muc3RhcnRzY2VuZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjZW5lc21hcmtlclswXSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW1lcmF0aW1lciA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDQwMDA7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCByYXRib3NzID0gdGhpcy5yYXRHcm91cC5nZXRUb3AoKTtcbiAgICAvL2ZpcnN0IHNjZW5lIGZpbmlzaGVkXG4gICAgaWYodGhpcy5wbGF5ZXIucGF1c2VkJiZ0aGlzLnNjZW5lc21hcmtlclswXSYmcmF0Ym9zcy5hbGl2ZSYmIXJhdGJvc3Muc3RhcnRzY2VuZSl7XG4gICAgICBjb25zb2xlLmxvZyhcInNldCBvbmNlIG9ubHkhXCIpXG4gICAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIsUGhhc2VyLkNhbWVyYS5GT0xMT1dfUExBVEZPUk1FUik7XG4gICAgICB0aGlzLnJhdEdyb3VwLnNldEFsbCgncGF1c2VkJyxmYWxzZSk7IC8vcmVhY3RpdmF0ZSByYXQgc29sZGllcnNcbiAgICAgIHRoaXMucGxheWVyLnBhdXNlZCA9IGZhbHNlOy8vcmVhY3RpdmF0ZSBkb3NzaWVyXG4gICAgICB0aGlzLnJhdEdyb3VwLmdldFRvcCgpLmF0dGFjayA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9hZnRlciBib3NzIGRpZWRcbiAgICBpZighcmF0Ym9zcy5hbGl2ZSYmIXRoaXMuc2NlbmVzbWFya2VyWzFdKXtcbiAgICAgIHRoaXMubGFyZ2Vyb2NrLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuc2NlbmVjb3VudGVyID0gMDtcbiAgICAgIHRoaXMuc2NlbmVzbWFya2VyWzFdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZih0aGlzLnNjZW5lc21hcmtlclsxXSYmdGhpcy5zY2VuZXNtYXJrZXJbMl0mJiF0aGlzLnNjZW5lc21hcmtlclszXSl7XG4gICAgICBpZih0aGlzLmdhbWUudGltZS5ub3cgPiB0aGlzLmNhbWVyYXRpbWVyKXtcbiAgICAgICAgc3dpdGNoKHRoaXMuc2NlbmVjb3VudGVyKyspe1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnNheShcIlllcyEgV2UndmUgZ290IHRoZSBsb3N0IGNoZWVzZSEgTGV0J3MgZ28gaG9tZSFcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmF0R3JvdXAuc2V0QWxsKCdwYXVzZWQnLHRydWUpOyAvLy0tIHNldCBhbGwgcGF1c2VkIHRvIHRydWUgYXQgZmlyc3RcbiAgICAgICAgICAgIHRoaXMuZW50cmFuY2Vkb29yLnJldml2ZSgpO1xuICAgICAgICAgICAgdGhpcy5hZGRDYXQoKTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLmNhdGZpbmFsZSxudWxsLDAuMDIsMC4wMik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXJpbmEgdGV4dCBoZXJlXCIpO1xuICAgICAgICAgICAgdGhpcy5jYXRmaW5hbGUuc2F5KFwiRG9zc2llciEgU2F2ZSBtZSEgRG9uJ3QgbGV0IGhpbSB0YWtlIG1lIGF3YXkhIVwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbWVyYSBwYW5zIHRvIHRoZSBkb29yXCIpO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuZm9sbG93KHRoaXMuZW50cmFuY2Vkb29yLG51bGwsMC4wMiwwLjAyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbWVyYSBtb3ZlcyBiYWNrIHRvIHBsYXllciwgZW5hYmxlcyBwbGF5ZXIsIGVuYWJsZXMgY2F0IGZseWluZ1wiKTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcixQaGFzZXIuQ2FtZXJhLkZPTExPV19QTEFURk9STUVSKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5yYXRHcm91cC5zZXRBbGwoJ3BhdXNlZCcsZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jYXRmaW5hbGUucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjZW5lY291bnRlciA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjZW5lc21hcmtlclszXT10cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FtZXJhdGltZXIgPSB0aGlzLmdhbWUudGltZS5ub3cgKyA0MDAwO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYodGhpcy5zY2VuZXNtYXJrZXJbM10pe1xuICAgICAgbGV0IGludGVydmFsID0gNjUwMDtcbiAgICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuY2FtZXJhdGltZXIpe1xuICAgICAgICBzd2l0Y2godGhpcy5zY2VuZWNvdW50ZXIrKyl7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW1lcmEgZm9jdXMgb24gY2F0LCBwbGF5ZXIgcGF1c2VkLCBjYXQgYW5kIG1hcmluYSBmYWRlcyBhd2F5XCIpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmF0R3JvdXAuc2V0QWxsKCdwYXVzZWQnLHRydWUpOyAvLy0tIHNldCBhbGwgcGF1c2VkIHRvIHRydWUgYXQgZmlyc3RcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLmNhdGZpbmFsZSxudWxsLDAuMDIsMC4wMik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW1lcmEgbW92ZXMgdG8gcGxheWVyLCBwbGF5ZXIgdGV4dFwiKTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllcixQaGFzZXIuQ2FtZXJhLkZPTExPV19QTEFURk9STUVSKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaW50ZXJ2YWwgPSA5MDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOi8vbmVlZCB0aW1lIGZvciBjYW1lcmEgdG8gc2hpZnQgaW4gcGxhY2VcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnNheShcIk1hcmluYSEgTm9vb29vb34hIVwiKTtcbiAgICAgICAgICAgIGludGVydmFsID0gMzAwMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNjcmVlbiBmYWRlcyBhd2F5IHN0YXJ0IHdvbiBwYWdlXCIpO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuZmFkZSgweDAwMDAwMCwzNTAwKTtcbiAgICAgICAgICAgIGludGVydmFsID0gNDUwMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyx0cnVlLGZhbHNlLCd3b24nKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbWVyYXRpbWVyID0gdGhpcy5nYW1lLnRpbWUubm93ICsgaW50ZXJ2YWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9tYXJpbmEgdGV4dFxuXG4gICAgLy9tYXJpbmEgdGV4dCBmaW5pc2hlZCwgY2FtZXJhIG1vdmVzIHNsb3dseSB0byBkb29yLCBtb3ZlcyBxdWlja2x5IGJhY2sgdG8gcGxheWVyLCBlbmFibGVzIHBsYXllclxuXG4gICAgLy9jYW1lcmEgdG91Y2hlcyBkb29yLCBjYW1lcmEgZm9jdXMgb24gY2F0LCBwbGF5ZXIgcGF1c2VkLiBDYXQgYW5kIG1hcmluYSBmYWRlcyBhd2F5XG5cbiAgICAvL2NhbWVyYSBtb3ZlcyBxdWlja2x5IGJhY2sgdG8gcGxheWVyLiBwbGF5ZXIgdGV4dC5cblxuICAgIC8vcGxheWVyIHRleHQgZmluaXNoZWQsIHNjcmVlbiBmYWRlcyBhd2F5XG5cbiAgfVxuXG4gIGZpbmFsRXBpc29kZSh0aGlzQm9keSx0aGF0Qm9keSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiZ0aGF0Qm9keS5zcHJpdGUua2V5PT09J2NhdGZpbmFsZScpe1xuICAgICAgY29uc29sZS5sb2coXCJjYXQgdG91Y2hlZCBkb29yLiBlbmQuXCIpO1xuICAgICAgdGhpcy5jaGVlc2VTY29yZS5hZGRUb1RvdGFsU2NvcmUoNik7XG4gICAgICB0aGlzLmNhdGZpbmFsZS5mYWRlb3V0KCk7XG4gICAgfVxuICB9XG5cbiAgLy8vLy0tLT4gSW4gR2FtZSBNZW51XG4gIHJlc3VtZUdhbWUoKXtcbiAgICBsZXQgc29tZXBvcHVwICA9IHRoaXMud29ybGQuZ2V0VG9wKCk7XG4gICAgaWYoc29tZXBvcHVwLmtleT09PSdwb3B1cCcpe1xuICAgICAgdGhpcy53b3JsZC5yZW1vdmVDaGlsZChzb21lcG9wdXApO1xuICAgICAgc29tZXBvcHVwLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5nYW1lLnBhdXNlZD1mYWxzZTtcbiAgfVxuXG4gIC8vcHJvY2Vzc2luZyBmb3IgcG9wIHVwIG1lbnUgaXRlbXNcbiAgcHJvY2Vzc1NlbGVjdGlvbigpe1xuICAgIC8vbGV0IHBvcHVwVGV4dCA9IHRoaXMucG9wdXAub3B0aW9uRW50ZXJlZCgpO1xuICAgIGxldCBwb3B1cFRleHQgPSB0aGlzLndvcmxkLmdldFRvcCgpLm9wdGlvbkVudGVyZWQoKTtcbiAgICBpZighcG9wdXBUZXh0KSByZXR1cm47XG5cbiAgICBjb25zb2xlLmxvZyhcImVudGVyIFwiK3BvcHVwVGV4dCk7XG4gICAgLy90aGlzIGd1eSBoYXMgdG8gZG8gdGhlIGxpZnRpbmcgZm9yIHRoZSBvcHRpb25zXG4gICAgc3dpdGNoKHBvcHVwVGV4dCl7XG4gICAgICBjYXNlICdSZXN1bWUgR2FtZSc6XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdSZXN0YXJ0IEVwaXNvZGUnOlxuICAgICAgICB0aGlzLnJlc3VtZUdhbWUoKTsvL25lZWQgdG8gdW5wYXVzZSB0aGUgZ2FtZSBiZWZvcmUgY2hhbmdlIHN0YXRlXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ2VwNicpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdJbnN0cnVjdGlvbnMnOlxuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24gPSBuZXcgUG9wdXAodGhpcy5nYW1lLHRoaXMuY2FtZXJhLngsdGhpcy5jYW1lcmEueSwzKTtcbiAgICAgICAgbGV0IGluc3RydWN0aW9uID0gdGhpcy5jYWNoZS5nZXRKU09OKCdjb25maWcnKS5wb3B1cC5pbnN0cnVjdGlvbnM7XG4gICAgICAgIHRoaXMucG9wdXBJbnN0cnVjdGlvbi5zZXRUaXRsZShpbnN0cnVjdGlvblsndGl0bGUnXSk7XG4gICAgICAgIHRoaXMucG9wdXBJbnN0cnVjdGlvbi5zZXREZXNjcmlwdGlvbihpbnN0cnVjdGlvblsnZGVzY3JpcHRpb24nXSwwKTtcblxuICAgICAgICB0aGlzLndvcmxkLnJlbW92ZUNoaWxkKHRoaXMucG9wdXApO1xuICAgICAgICB0aGlzLndvcmxkLmFkZENoaWxkKHRoaXMucG9wdXBJbnN0cnVjdGlvbik7XG4gICAgICAgIHRoaXMuZW5hYmxlQ3Vyc29yS2V5cyhmYWxzZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0dvdCBpdCEnOlxuICAgICAgICB0aGlzLmVuYWJsZUN1cnNvcktleXModHJ1ZSk7XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdRdWl0IHRvIE1haW4gTWVudSc6XG4gICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdtZW51Jyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ011dGUgTXVzaWMnOlxuICAgICAgICBjb25zb2xlLmxvZyhcIm11dGluZyBtdXNpYyBcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXRoZW1lJyx0cnVlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdXRlIFNvdW5kJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJtdXRpbmcgc291bmRcIik7XG4gICAgICAgIFRvb2xzLnN0b3JlRGF0YSgnbXV0ZXNvdW5kJyx0cnVlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnNmeCx0cnVlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGxheSBNdXNpYyc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWluZyBtdXNpY1wiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRldGhlbWUnLGZhbHNlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLGZhbHNlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUGxheSBTb3VuZCc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheWluZyBzb3VuZFwiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRlc291bmQnLGZhbHNlKTtcbiAgICAgICAgVG9vbHMubXV0ZU9yUGxheSh0aGlzLnNmeCxmYWxzZSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBlbmFibGVDdXJzb3JLZXlzKGJvb2wpe1xuICAgICAgdGhpcy5uYXZpS2V5cy51cC5lbmFibGVkID0gYm9vbDtcbiAgICAgIHRoaXMubmF2aUtleXMuZG93bi5lbmFibGVkID0gYm9vbDtcbiAgfVxuXG4gIHBsYXRmb3JtSGl0TGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiYodGhhdEJvZHkuc3ByaXRlLmZyYW1lTmFtZT09J3NsaXBwZXJ5MSd8fHRoYXRCb2R5LnNwcml0ZS5mcmFtZU5hbWU9PSdzbGlwcGVyeTInKSl7XG4gICAgICBUb29scy5wbGF5U291bmQodGhpcy5zZngsWydzbGltZTcnLCdzbGltZTgnLCdzbGltZTknXSk7XG4gICAgICB0aGlzLnBsYXllci5vbnNsaXBweXBsYXRmb3JtPXRydWU7XG4gICAgfWVsc2V7XG4gICAgICBpZih0aGlzLnBsYXllci5vbnNsaXBweXBsYXRmb3JtKXRoaXMucGxheWVyLm9uc2xpcHB5cGxhdGZvcm09ZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29sbGVjdGFibGVzTGlzdGVuZXIodGhpc0JvZHksdGhhdEJvZHksdGhpc1NoYXBlLHRoYXRTaGFwZSl7XG4gICAgaWYodGhhdEJvZHkuc3ByaXRlJiZ0aGF0Qm9keS5zcHJpdGUua2V5PT09XCJwbGF5ZXJcIil7XG4gICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb250YWN0ZWQgYnkgXCIrdGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSk7XG4gICAgICBzd2l0Y2godGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSl7XG4gICAgICAgIGNhc2UgJ2NoZWVzZTEnOlxuICAgICAgICAgIC8vaW5jcmVhc2UgcGxheWVyIGVuZXJneS4uXG4gICAgICAgICAgdGhpcy5wbGF5ZXIucmVwbGVuaXNoRW5lcmd5KDEwKTtcbiAgICAgICAgICB0aGlzLmNoZWVzZVNjb3JlLmluY3JlYXNlU2NvcmUoMik7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoZWVzZTInOlxuICAgICAgICBjYXNlICdjaGVlc2UzJzpcbiAgICAgICAgICAvL2luY3JlYXNlIHBsYXllciBlbmVyZ3kuLlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaEVuZXJneSg1KTtcbiAgICAgICAgICB0aGlzLmNoZWVzZVNjb3JlLmluY3JlYXNlU2NvcmUoMSk7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dpbmVnbGFzcyc6XG4gICAgICAgIGNhc2UgJ21hcnRpbmlnbGFzcyc6XG4gICAgICAgICAgdGhpcy5wbGF5ZXIucmVwbGVuaXNoTGlmZSgxMCk7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnUmlzZTA0Jyk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dpbmVib3R0bGUnOlxuICAgICAgICAgIHRoaXMucGxheWVyLnJlcGxlbmlzaExpZmUoMjApO1xuICAgICAgICAgIHRoaXMuc2Z4LnBsYXkoJ1Jpc2UwNCcpO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzaHVyaWtlbnMnOlxuICAgICAgICAgIGlmKCF0aGlzLnBsYXllci50aHJvd0VuYWJsZWQpIHRoaXMucGxheWVyLnRocm93Qm9keSgpO1xuXG4gICAgICAgICAgLy9pbmNyZWFzZSBwbGF5ZXIgc2h1cmlrZW5zIGNvdW50XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuaW5jcmVhc2VTaHVyaWtlbig1KTtcbiAgICAgICAgICB0aGlzLnNmeC5wbGF5KCdSaXNlMDQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoZWVzZXB1bGUnOlxuICAgICAgICAgIGNvbnNvbGUubG9nKFwieWF5IGNoZWVzZSBwdWxlIVwiKTtcbiAgICAgICAgICB0aGlzLnBsYXllci5yZXBsZW5pc2hFbmVyZ3koMTAwKTtcbiAgICAgICAgICB0aGlzLnBsYXllci5yZXBsZW5pc2hMaWZlKDEwMCk7XG4gICAgICAgICAgdGhpcy5jaGVlc2VTY29yZS5pbmNyZWFzZVNjb3JlKDEwMCk7XG4gICAgICAgICAgdGhpcy5zZngucGxheSgnY29sbGVjdHN3b3JkJyk7XG4gICAgICAgICAgdGhpcy5zY2VuZXNtYXJrZXJbMl0gPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vZmxhc2h5XG4gICAgICB0aGlzLnBsYXllci5mbGFzaCgnZ3JlZW4nKTtcbiAgICAgIC8vZGVzdHJveSB0aGUgc2FpZCBzcHJpdGVcbiAgICAgIHRoaXNCb2R5LnNwcml0ZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgZW5lbXlIaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICBpZih0aGF0Qm9keS5zcHJpdGUmJnRoYXRCb2R5LnNwcml0ZS5rZXk9PT0ncGxheWVyJyl7XG4gICAgICAvL0RvZXMgdGhlIHRoaW5ncyB0aGF0IGhpdCBwbGF5ZXIgYWxsIGhhdmUgc3ByaXRlIHNoYXBlPyBhbmQgZGVmaW5lZCBrZXk/XG4gICAgICBpZih0aGlzQm9keS5zcHJpdGUpe1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdwbGF5ZXIgaGl0IGJ5OiAnK3RoaXNCb2R5LnNwcml0ZS5rZXkrICcgJyt0aGlzQm9keS5zcHJpdGUubmFtZSk7XG4gICAgICAgIHN3aXRjaCh0aGlzQm9keS5zcHJpdGUua2V5KXtcbiAgICAgICAgICBjYXNlICdyYXRncnVudCc6Ly9yYXQgZ3J1bnRcbiAgICAgICAgICAgIGlmKHRoaXNTaGFwZT09PXRoaXNCb2R5LmRhdGEuc2hhcGVzWzBdKXRoaXMucGxheWVyLmRhbWFnZVBsYXllcig1KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyYXRzb2xkaWVyJzovL3JhdCBzb2xkaWVyXG4gICAgICAgICAgY2FzZSAncmF0bmluamEnOlxuICAgICAgICAgICAgaWYgKC9ec1xcZHsxfS8udGVzdCh0aGlzQm9keS5zcHJpdGUuZnJhbWVOYW1lKSl7XG4gICAgICAgICAgICAgIHRoaXMucGxheWVyLmRhbWFnZVBsYXllcig1LDIwMCk7XG4gICAgICAgICAgICAgIHRoaXNCb2R5LnNwcml0ZS5raWxsKCk7XG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzU2hhcGU9PT10aGlzQm9keS5kYXRhLnNoYXBlc1swXSl0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoOCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmF0Ym9zcyc6XG4gICAgICAgICAgICB0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoMTIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NhdCc6XG4gICAgICAgICAgICB0aGlzLnBsYXllci5kYW1hZ2VQbGF5ZXIoOCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnb2JqZWN0czMnOi8vb2JqZWN0cyAzIGFyZSBhbGwgYmFsbHNcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmRhbWFnZVBsYXllcig0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdvYmplY3RzMic6XG4gICAgICAgICAgICBsZXQgc3RyID0gdGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZTtcbiAgICAgICAgICAgIC8vYmVsb3cgbWF0Y2ggaXRzIGEgc3RhbGFjaXRlcyAtIHVwcGVyey9kfSBhbmQgYmVsb3cgey9kfVxuICAgICAgICAgICAgaWYoL151cHBlclxcZHsxfS8udGVzdChzdHIpfHwvXmJlbG93XFxkezF9Ly50ZXN0KHN0cikpdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29iamVjdHMxJzovL2NsdWJiZWQgYnkgc29sZGllclxuICAgICAgICAgICAgaWYodGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZT09J3N0b3AnKXRoaXMucGxheWVyLmRhbWFnZVBsYXllcig1LDIwMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5ZXJIaXRMaXN0ZW5lcih0aGlzQm9keSx0aGF0Qm9keSx0aGlzU2hhcGUsdGhhdFNoYXBlKXtcbiAgICAgIC8vaGl0Ym94IG9ubHkgdGFyZ2V0IGlzIGVuZW15IHNvIHByZXR0eSBtdWNoIG5vIG5lZWQgdG8gY2hlY2tcbiAgICAgIGlmKHRoYXRCb2R5LnNwcml0ZSl7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJwbGF5ZXIgaGl0IHRoYXQgYm9keSBcIit0aGF0Qm9keS5zcHJpdGUua2V5KTtcbiAgICAgICAgaWYodGhpc0JvZHkuc3ByaXRlJiYvXnNcXGR7MX0vLnRlc3QodGhpc0JvZHkuc3ByaXRlLmZyYW1lTmFtZSkpe1xuICAgICAgICAgIC8va2lsbCB0aGUgc2h1cmlrZW4gYm9keVxuICAgICAgICAgIHN3aXRjaCh0aGF0Qm9keS5zcHJpdGUua2V5KXtcbiAgICAgICAgICAgIGNhc2UgJ3JhdGdydW50JzpcbiAgICAgICAgICAgIGNhc2UgJ3JhdHNvbGRpZXInOlxuICAgICAgICAgICAgY2FzZSAncmF0bmluamEnOlxuICAgICAgICAgICAgY2FzZSAncmF0Ym9zcyc6XG4gICAgICAgICAgICAgIHRoYXRCb2R5LnNwcml0ZS5kYW1hZ2VSYXQoNiw0MDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYXQnOlxuICAgICAgICAgICAgICB0aGF0Qm9keS5zcHJpdGUuZGFtYWdlQ2F0KDYsNDAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzQm9keS5zcHJpdGUua2lsbCgpO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHN3aXRjaCh0aGF0Qm9keS5zcHJpdGUua2V5KXtcbiAgICAgICAgICAgIGNhc2UgJ3JhdGdydW50JzpcbiAgICAgICAgICAgIGNhc2UgJ3JhdHNvbGRpZXInOlxuICAgICAgICAgICAgY2FzZSAncmF0bmluamEnOlxuICAgICAgICAgICAgY2FzZSAncmF0Ym9zcyc6XG4gICAgICAgICAgICAgIHRoYXRCb2R5LnNwcml0ZS5kYW1hZ2VSYXQoOCw0MDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjYXQnOlxuICAgICAgICAgICAgICB0aGF0Qm9keS5zcHJpdGUuZGFtYWdlQ2F0KDgsNDAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcGxheWVyQXJtZWQoYm9keUEsYm9keUIpe1xuXG4gICAgaWYoYm9keUEmJmJvZHlBLnNwcml0ZSYmYm9keUEuc3ByaXRlLmtleT09J3BsYXllcicpe1xuICAgICAgdGhpcy5wbGF5ZXIuZGFtYWdlUGxheWVyKDEwKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy90aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLnRpbWUuZnBzIHx8ICctLScsIDIsIDE0LCBcIiNhN2FlYmVcIik7XG4gIH1cblxuICBzaHV0ZG93bigpe1xuXG4gIH1cblxufVxuIiwiLy9yZXF1aXJlIG90aGVyIGNvbXBvbmVudHNcbmltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xuXG4gIGluaXQod2hpY2hFcCl7XG4gICAgdGhpcy5lcGlzb2RlID0gd2hpY2hFcDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vb2JqZWN0IGxldmVsIHByb3BlcnRpZXNcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuc3RhdGUuc3RhcnQodGhpcy5lcGlzb2RlKTtcbiAgICBpZigvXmVwXFxkezF9Ly50ZXN0KHRoaXMuZXBpc29kZSkpVG9vbHMuc3RvcmVFcCh0aGlzLmVwaXNvZGUpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG5cbn1cbiIsImltcG9ydCBUb29scyBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub29scy5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVOYXJyYXRpdmUgZXh0ZW5kcyBQaGFzZXIuU3RhdGV7XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICAvL29iamVjdCBsZXZlbCBwcm9wZXJ0aWVzXG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaGlnaGxpZ2h0U3R5bGUgPSB7XG4gICAgICBmb250Oidib2xkIDI4cHggQ2VudHVyeScsZmlsbDonI2NkZTE2ZCdcbiAgICB9XG5cbiAgfVxuICBjcmVhdGUoKXtcbiAgICBsZXQgbmFycmF0aXZlaW1nID0gdGhpcy5hZGQuaW1hZ2UoMCwwLCduYXJyYXRpdmUnKTtcbiAgICBsZXQgaGlnaHRleHQgPSB0aGlzLmFkZC50ZXh0KDUwLDcwMCxcIlByZXNzICdBJyB0byBjb250aW51ZS4uLlwiLHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuICAgIGxldCBtb3Zld2hpY2ggPSAwO1xuXG4gICAgLy9zdG9wIGFsbCBwcmV2aW91cyBwbGF5aW5nIHNvdW5kIGZpcnN0XG4gICAgdGhpcy5zb3VuZC5zdG9wQWxsKCk7XG4gICAgdGhpcy50aGVtZSA9IHRoaXMuYWRkLmF1ZGlvU3ByaXRlKCdpbnRybycpO1xuICAgIGlmKFRvb2xzLmdldERhdGEoJ211dGV0aGVtZScpKVRvb2xzLm11dGVPclBsYXkodGhpcy50aGVtZSx0cnVlKTtcblxuICAgIHRoaXMuYWRkLnR3ZWVuKGhpZ2h0ZXh0KS50byh7IGFscGhhOiAwLjIgfSwgNjAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5Jbk91dCwgdHJ1ZSwgMCwgSW5maW5pdHksIHRydWUpO1xuICAgIGxldCBtb3ZlID0gbmV3IEFycmF5KCk7XG4gICAgbW92ZVswXSA9IHRoaXMuYWRkLnR3ZWVuKG5hcnJhdGl2ZWltZykudG8oeyB4OiAnLTUwNicgfSwgNjAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5Jbk91dCk7XG4gICAgbW92ZVsxXSA9IHRoaXMuYWRkLnR3ZWVuKG5hcnJhdGl2ZWltZykudG8oeyB4OiAnLTEwMjQnIH0sIDYwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuSW5PdXQpO1xuICAgIG1vdmVbMl0gPSB0aGlzLmFkZC50d2VlbihuYXJyYXRpdmVpbWcpLnRvKHsgeDogJy01MDYnIH0sIDYwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuSW5PdXQpO1xuICAgIG1vdmVbM10gPSB0aGlzLmFkZC50d2VlbihuYXJyYXRpdmVpbWcpLnRvKHsgeDogJy0xMDI0JyB9LCA2MDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0KTtcbiAgICBtb3ZlWzRdID0gdGhpcy5hZGQudHdlZW4obmFycmF0aXZlaW1nKS50byh7IHg6ICctNTA2JyB9LCA2MDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0KTtcbiAgICBtb3ZlWzVdID0gdGhpcy5hZGQudHdlZW4obmFycmF0aXZlaW1nKS50byh7IHg6ICctMTAyNCcgfSwgNjAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5Jbk91dCk7XG5cbiAgICB0aGlzLmtleUEgPSB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQSk7XG4gICAgdGhpcy5rZXlBLm9uRG93bi5hZGQoKCk9PntcbiAgICAgIGxldCBtb3Zlbm93ID0gbW92ZVttb3Zld2hpY2grK107XG4gICAgICBtb3Zlbm93LnN0YXJ0KCk7XG4gICAgICAvL2NvbnNvbGUubG9nKFwicG9zaXRpb24gXCIrbmFycmF0aXZlaW1nLnggKyBcIm1vdmV3aGljaCBcIittb3Zld2hpY2gpO1xuICAgICAgaWYobW92ZXdoaWNoPT02KXsvL2hhdmUgY29tZSB0byB0aGUgZW5kXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnLHRydWUsZmFsc2UsJ2VwMScpO1xuICAgICAgfVxuICAgIH0sdGhpcyk7XG5cbiAgICB0aGlzLmdhbWUub25QYXVzZS5hZGQoZnVuY3Rpb24oKXt0aGlzLnNvdW5kLnVuc2V0TXV0ZSgpO30sdGhpcyk7Ly88PT1lbmFibGUgdGhlIHNvdW5kIHRvIGNvbnRpbnVlIHBsYXkgJzspJ1xuICAgIHRoaXMudGhlbWUuc291bmRzWydGaW5kaW5nIE1vdmVtZW50J10ucGxheSgnRmluZGluZyBNb3ZlbWVudCcsbnVsbCwwLjQsdHJ1ZSk7XG5cbiAgfVxuXG4gIHVwZGF0ZSgpe1xuXG4gIH1cblxuICBtb3ZlbmFycmF0aXZlKCl7XG5cbiAgfVxufVxuIiwiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9jb21wb25lbnRzL1Rvb2xzLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU92ZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGV7XG5cbiAgY3JlYXRlKCl7XG5cbiAgICB0aGlzLmFkZC5pbWFnZSgwLDAsJ2dhbWVvdmVyJyk7XG4gICAgdGhpcy5yZXN0YXJ0ID0gdGhpcy5hZGQuaW1hZ2UoMCwwLCdyZXN0YXJ0ZXBpc29kZScpO1xuICAgIHRoaXMucmV0dXJuID0gdGhpcy5hZGQuaW1hZ2UoMCwwLCdyZXR1cm4nKTtcbiAgICB0aGlzLmFkZC5pbWFnZSgwLDAsJ2dvX3dvcmRpbmdzJyk7XG5cbiAgICB0aGlzLnNlbGVjdGlvbkFycmF5ID0gbmV3IEFycmF5KHRoaXMucmVzdGFydCx0aGlzLnJldHVybik7XG5cbiAgICB0aGlzLnNlbGVjdCgncmVzdGFydGVwaXNvZGUnKTtcblxuICAgIGxldCBzZnggPSB0aGlzLmdhbWUuYWRkLmF1ZGlvU3ByaXRlKCdzZngnKTtcblxuICAgIHRoaXMubmF2aUtleXMgPSB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleXMoIHsgJ3VwJzogUGhhc2VyLktleUNvZGUuVVAsICdkb3duJzogUGhhc2VyLktleUNvZGUuRE9XTiwgJ2VudGVyJzogUGhhc2VyLktleUNvZGUuRU5URVJ9KTtcbiAgICB0aGlzLm5hdmlLZXlzLmVudGVyLm9uRG93bi5hZGQodGhpcy5wcm9jZXNzU2VsZWN0aW9uLHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMudXAub25Eb3duLmFkZCgodGFyZ2V0KT0+e1xuICAgICAgY29uc29sZS5sb2coXCJ1cFwiKTtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQXJyYXkudW5zaGlmdCh0aGlzLnNlbGVjdGlvbkFycmF5LnBvcCgpKTtcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuc2VsZWN0aW9uQXJyYXlbMF0ua2V5KTtcbiAgICAgIHNmeC5wbGF5KCdtZW51c2VsZWN0Jyk7XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLmRvd24ub25Eb3duLmFkZCgodGFyZ2V0KT0+e1xuICAgICAgY29uc29sZS5sb2coXCJkb3duXCIpO1xuICAgICAgdGhpcy5zZWxlY3Rpb25BcnJheS5wdXNoKHRoaXMuc2VsZWN0aW9uQXJyYXkuc2hpZnQoKSk7XG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLnNlbGVjdGlvbkFycmF5WzBdLmtleSk7XG4gICAgICBzZngucGxheSgnbWVudXNlbGVjdCcpO1xuICAgIH0sdGhpcyk7XG5cbiAgICAvL3N0b3AgYWxsIHByZXZpb3VzIHBsYXlpbmcgc291bmQgZmlyc3RcbiAgICB0aGlzLnNvdW5kLnN0b3BBbGwoKTtcbiAgICB0aGlzLnRoZW1lID0gdGhpcy5hZGQuYXVkaW9TcHJpdGUoJ2dhbWVvdmVyJyk7XG4gICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXRoZW1lJykpVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuXG4gICAgdGhpcy50aGVtZS5wbGF5KCdEZWF0aCBvZiBLaW5ncycsMC42KTtcbiAgfVxuXG4gIHVwZGF0ZSgpe1xuICB9XG5cbiAgc2VsZWN0KHdoaWNoKXtcbiAgICB0aGlzLnJlc3RhcnQuYWxwaGEgPSAwLjA7Ly9yZXN0YXJ0XG4gICAgdGhpcy5yZXR1cm4uYWxwaGEgPSAwLjA7Ly9yZXR1cm5cblxuICAgIHN3aXRjaCh3aGljaCl7XG4gICAgICBjYXNlICdyZXN0YXJ0ZXBpc29kZSc6XG4gICAgICAgIHRoaXMucmVzdGFydC5hbHBoYSA9IDEuMDtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmV0dXJuJzpcbiAgICAgICAgdGhpcy5yZXR1cm4uYWxwaGEgPSAxLjA7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzU2VsZWN0aW9uKCl7XG4gICAgY29uc29sZS5sb2coXCJlbnRlclwiKTtcbiAgICBzd2l0Y2godGhpcy5zZWxlY3Rpb25BcnJheVswXS5rZXkpe1xuICAgICAgY2FzZSAncmVzdGFydGVwaXNvZGUnOlxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdnYW1lJyx0cnVlLGZhbHNlLFRvb2xzLmdldEVwKCkpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXR1cm4nOlxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdtZW51Jyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9wcmVmYWJzL1BvcHVwLmpzXCI7XG5pbXBvcnQgVG9vbHMgZnJvbSBcIi4uL2NvbXBvbmVudHMvVG9vbHMuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51IHtcblxuICBjcmVhdGUoKXtcbiAgICAvL2xldCBpbWFnZXMgPSB0aGlzLmNhY2hlLmdldEtleXMoUGhhc2VyLkNhY2hlLklNQUdFKTtcbiAgICB0aGlzLmFkZC5pbWFnZSgwLDAsJ3NwbGFzaHNjcmVlbicpO1xuICAgIHRoaXMuYW5pbWVmZmVjdCA9IHRoaXMuYWRkLmltYWdlKDAsMCwnYW5pbWVmZmVjdCcpO1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLmFkZC5pbWFnZSgwLDAsJ3N0YXJ0Jyk7XG4gICAgdGhpcy5jb250aW51ZSA9IHRoaXMuYWRkLmltYWdlKDAsMCwnY29udGludWUnKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmFkZC5pbWFnZSgwLDAsJ29wdGlvbnMnKTtcbiAgICB0aGlzLmFkZC5pbWFnZSgwLDAsJ3dvcmRpbmdzJyk7XG5cbiAgICAvL2xldCBhbGwgc291bmRzIHN0aWxsIHBsYXkgZXZlbiB3aGVuIGdhbWUgcGF1c2VkXG4gICAgLy9pcyB0aGlzIGEgb25lIHRpbWUgc2V0dGluZz8/XG4gICAgLy90aGlzLnNvdW5kLm11dGVPblBhdXNlID0gZmFsc2U7Ly88PT0gb25seSBlZmZlY3RpdmUgZm9yIERPTVxuICAgIHRoaXMuc2VsZWN0aW9uQXJyYXkgPSBuZXcgQXJyYXkodGhpcy5zdGFydCx0aGlzLmNvbnRpbnVlLHRoaXMub3B0aW9ucyk7XG5cbiAgICAvL2VuYWJsZSBzdGFydCBieSBkZWZhdWx0XG4gICAgdGhpcy5zZWxlY3QoJ3N0YXJ0Jyk7XG4gICAgdGhpcy5hZGQudHdlZW4odGhpcy5hbmltZWZmZWN0KS50byh7IGFscGhhOiAwLjIgfSwgODAwLCBQaGFzZXIuRWFzaW5nLlF1YWRyYXRpYy5Jbk91dCwgdHJ1ZSwgMCwgSW5maW5pdHksIHRydWUpO1xuXG4gICAgbGV0IHNmeCA9IHRoaXMuZ2FtZS5hZGQuYXVkaW9TcHJpdGUoJ3NmeCcpO1xuXG4gICAgdGhpcy5uZXh0THZscG9wdXAgPSBmYWxzZTtcbiAgICAvL3BhdXNlZCBzdGF0ZSByZXNwb25kcyB0byBzaWduYWxzXG4gICAgdGhpcy5uYXZpS2V5cyA9IHRoaXMuaW5wdXQua2V5Ym9hcmQuYWRkS2V5cyggeyAndXAnOiBQaGFzZXIuS2V5Q29kZS5VUCwgJ2Rvd24nOiBQaGFzZXIuS2V5Q29kZS5ET1dOLCAnZW50ZXInOiBQaGFzZXIuS2V5Q29kZS5FTlRFUiwgJ2VzYyc6UGhhc2VyLktleUNvZGUuRVNDIH0gKTtcbiAgICB0aGlzLm5hdmlLZXlzLmVudGVyLm9uRG93bi5hZGQodGhpcy5wcm9jZXNzU2VsZWN0aW9uLHRoaXMpO1xuICAgIHRoaXMubmF2aUtleXMudXAub25Eb3duLmFkZCgodGFyZ2V0KT0+e1xuICAgICAgLy9wb3AgdGhlbiB1bnNoaWZ0XG4gICAgICBjb25zb2xlLmxvZyhcInVwXCIpO1xuICAgICAgaWYoIXRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkFycmF5LnVuc2hpZnQodGhpcy5zZWxlY3Rpb25BcnJheS5wb3AoKSk7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuc2VsZWN0aW9uQXJyYXlbMF0ua2V5KTtcbiAgICAgICAgc2Z4LnBsYXkoJ21lbnVzZWxlY3QnKTtcbiAgICAgIH1lbHNley8vcG9wdXAgYm94IHRpbWVcbiAgICAgICAgdGhpcy5wb3B1cC5jdXJzb3JNb3ZlZCh0YXJnZXQua2V5Q29kZSk7XG4gICAgICB9XG4gICAgfSx0aGlzKTtcbiAgICB0aGlzLm5hdmlLZXlzLmRvd24ub25Eb3duLmFkZCgodGFyZ2V0KT0+e1xuICAgICAgY29uc29sZS5sb2coXCJkb3duXCIpO1xuICAgICAgLy9zaGlmdCB0aGVuIHB1c2hcbiAgICAgIGlmKCF0aGlzLmdhbWUucGF1c2VkKXtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25BcnJheS5wdXNoKHRoaXMuc2VsZWN0aW9uQXJyYXkuc2hpZnQoKSk7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuc2VsZWN0aW9uQXJyYXlbMF0ua2V5KTtcbiAgICAgICAgc2Z4LnBsYXkoJ21lbnVzZWxlY3QnKTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnBvcHVwLmN1cnNvck1vdmVkKHRhcmdldC5rZXlDb2RlKTtcbiAgICAgIH1cblxuICAgIH0sdGhpcyk7XG4gICAgdGhpcy5uYXZpS2V5cy5lc2Mub25Eb3duLmFkZCgoKT0+e1xuICAgICAgaWYodGhpcy5nYW1lLnBhdXNlZCl7XG4gICAgICAgIC8vcmVtb3ZlIHRoZSBtZW51IHBhbmVsIGZyb20gd29ybGRcbiAgICAgICAgLy91bnBhdXNlZCBnYW1lXG4gICAgICAgIHRoaXMucmVzdW1lU3RhdGUoKTtcbiAgICAgIH1cbiAgICB9LHRoaXMpO1xuXG4gICAgdGhpcy5nYW1lLm9uUGF1c2UuYWRkKGZ1bmN0aW9uKCl7dGhpcy5zb3VuZC51bnNldE11dGUoKTt9LHRoaXMpOy8vPD09ZW5hYmxlIHRoZSBzb3VuZCB0byBjb250aW51ZSBwbGF5ICc7KSdcbiAgfVxuXG4gIHNlbGVjdCh3aGljaCl7XG4gICAgdGhpcy5zdGFydC5hbHBoYSA9IDAuMDsvL3N0YXJ0XG4gICAgdGhpcy5jb250aW51ZS5hbHBoYSA9IDAuMDsvL2NvbnRpbnVlXG4gICAgdGhpcy5vcHRpb25zLmFscGhhID0gMC4wOy8vb3B0aW9uc1xuICAgIHN3aXRjaCh3aGljaCl7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgIHRoaXMuc3RhcnQuYWxwaGEgPSAxLjA7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbnRpbnVlJzpcbiAgICAgIHRoaXMuY29udGludWUuYWxwaGEgPSAxLjA7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29wdGlvbnMnOlxuICAgICAgdGhpcy5vcHRpb25zLmFscGhhID0gMS4wO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc1NlbGVjdGlvbigpe1xuICAgIGNvbnNvbGUubG9nKFwiZW50ZXJcIik7XG4gICAgc3dpdGNoKHRoaXMuc2VsZWN0aW9uQXJyYXlbMF0ua2V5KXtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgLy90aGlzLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyx0cnVlLGZhbHNlLCdlcDEnKTtcbiAgICAgICAgLy9pZiBwbGF5ZXIgcHJldmlvdXNseSBwbGF5ZWQsIHNldCBhdHRhY2tFbmFibGVkIHRvIGZhbHNlXG4gICAgICAgIGlmKFRvb2xzLmdldERhdGEoJ2F0dGFja0VuYWJsZWQnKSlUb29scy5zdG9yZURhdGEoJ2F0dGFja0VuYWJsZWQnLGZhbHNlKTtcbiAgICAgICAgaWYoVG9vbHMuZ2V0RGF0YSgndGhyb3dFbmFibGVkJykpVG9vbHMuc3RvcmVEYXRhKCd0aHJvd0VuYWJsZWQnLGZhbHNlKTtcblxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyx0cnVlLGZhbHNlLCdnYW1lbmFycmF0aXZlJyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbnRpbnVlJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJjb250aW51ZVwiKTtcblxuICAgICAgICBpZighdGhpcy5nYW1lLnBhdXNlZCl7XG4gICAgICAgICAgdGhpcy5nYW1lLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5wb3B1cCA9IG5ldyBQb3B1cCh0aGlzLmdhbWUsMCwwLDQpO1xuICAgICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGQodGhpcy5wb3B1cCk7XG5cbiAgICAgICAgfWVsc2V7Ly9nYW1lIHdoZW4gcGF1c2VkIHNob3VsZCBzdHVjayBoZXJlIHdoZW4gZW50ZXIgaXMgcHJlc3NlZFxuICAgICAgICAgIHRoaXMucG9wdXBIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3B0aW9ucyc6XG4gICAgICAgIGNvbnNvbGUubG9nKFwib3B0aW9uc1wiKTtcbiAgICAgICAgLy9wYXVzZSB0aGUgZ2FtZSwgYnJpbmcgdXAgdGhlIHBvcHVwcGFuZWxcbiAgICAgICAgaWYoIXRoaXMuZ2FtZS5wYXVzZWQpe1xuICAgICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgIC8vaW5pdGlhbGl6ZSBwb3B1cCBvYmplY3RzXG4gICAgICAgICAgdGhpcy5wb3B1cCA9IG5ldyBQb3B1cCh0aGlzLmdhbWUsMCwwLDEpO1xuICAgICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGQodGhpcy5wb3B1cCk7XG4gICAgICAgIH1lbHNley8vZ2FtZSB3aGVuIHBhdXNlZCBzaG91bGQgc3R1Y2sgaGVyZSB3aGVuIGVudGVyIGlzIHByZXNzZWRcbiAgICAgICAgICB0aGlzLnBvcHVwSGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwb3B1cEhhbmRsZXIoKXtcbiAgICBsZXQgcG9wdXBUZXh0ID0gdGhpcy53b3JsZC5nZXRUb3AoKS5vcHRpb25FbnRlcmVkKCk7XG4gICAgaWYoIXBvcHVwVGV4dCkgcmV0dXJuO1xuICAgIGNvbnNvbGUubG9nKFwiZW50ZXIgXCIrcG9wdXBUZXh0KTtcblxuICAgIC8vdGhpcyBndXkgaGFzIHRvIGRvIHRoZSBsaWZ0aW5nIGZvciB0aGUgb3B0aW9uc1xuICAgIHN3aXRjaChwb3B1cFRleHQpe1xuICAgICAgY2FzZSAnSW5zdHJ1Y3Rpb25zJzpcbiAgICAgICAgY29uc29sZS5sb2coJ2luc3RydWN0aW9ucycpO1xuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24gPSBuZXcgUG9wdXAodGhpcy5nYW1lLDAsMCwzKTtcbiAgICAgICAgbGV0IGluc3RydWN0aW9uICA9IHRoaXMuY2FjaGUuZ2V0SlNPTignY29uZmlnJykucG9wdXAuaW5zdHJ1Y3Rpb25zO1xuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24uc2V0VGl0bGUoaW5zdHJ1Y3Rpb25bJ3RpdGxlJ10pO1xuICAgICAgICB0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24uc2V0RGVzY3JpcHRpb24oaW5zdHJ1Y3Rpb25bJ2Rlc2NyaXB0aW9uJ10sMCk7XG5cbiAgICAgICAgdGhpcy53b3JsZC5yZW1vdmVDaGlsZCh0aGlzLnBvcHVwKTtcbiAgICAgICAgdGhpcy53b3JsZC5hZGRDaGlsZCh0aGlzLnBvcHVwSW5zdHJ1Y3Rpb24pO1xuICAgICAgICB0aGlzLmVuYWJsZUN1cnNvcktleXMoZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdHb3QgaXQhJzpcbiAgICAgICAgdGhpcy5lbmFibGVDdXJzb3JLZXlzKHRydWUpO1xuICAgICAgICB0aGlzLnJlc3VtZVN0YXRlKCk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0NyZWRpdHMnOlxuICAgICAgICBjb25zb2xlLmxvZygnY3JlZGl0cycpO1xuICAgICAgICB0aGlzLnBvcHVwQ3JlZGl0cyA9IG5ldyBQb3B1cCh0aGlzLmdhbWUsMCwwLDMpO1xuICAgICAgICBsZXQgY3JlZGl0cyAgPSB0aGlzLmNhY2hlLmdldEpTT04oJ2NvbmZpZycpLnBvcHVwLmNyZWRpdHM7XG4gICAgICAgIHRoaXMucG9wdXBDcmVkaXRzLnNldFRpdGxlKGNyZWRpdHNbJ3RpdGxlJ10pO1xuICAgICAgICB0aGlzLnBvcHVwQ3JlZGl0cy5zZXREZXNjcmlwdGlvbihjcmVkaXRzWydkZXNjcmlwdGlvbiddLDApO1xuXG4gICAgICAgIHRoaXMud29ybGQucmVtb3ZlQ2hpbGQodGhpcy5wb3B1cCk7XG4gICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGQodGhpcy5wb3B1cENyZWRpdHMpO1xuICAgICAgICB0aGlzLmVuYWJsZUN1cnNvcktleXMoZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdCYWNrJzpcbiAgICAgICAgY29uc29sZS5sb2coJ2JhY2snKTtcbiAgICAgICAgdGhpcy5yZXN1bWVTdGF0ZSgpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNdXRlIE11c2ljJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJtdXRpbmcgbXVzaWMgXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGV0aGVtZScsdHJ1ZSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ011dGUgU291bmQnOlxuICAgICAgICBjb25zb2xlLmxvZyhcIm11dGluZyBzb3VuZFwiKTtcbiAgICAgICAgVG9vbHMuc3RvcmVEYXRhKCdtdXRlc291bmQnLHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQbGF5IE11c2ljJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5aW5nIG11c2ljXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGV0aGVtZScsZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdQbGF5IFNvdW5kJzpcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5aW5nIHNvdW5kXCIpO1xuICAgICAgICBUb29scy5zdG9yZURhdGEoJ211dGVzb3VuZCcsZmFsc2UpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlcDEuIFRoZSBBcHByZW50aWNlc2hpcCc6XG4gICAgICAgIHRoaXMucmVzdW1lU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgncHJlbG9hZCcsdHJ1ZSxmYWxzZSwnZXAxJyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VwMi4gVGhlIFJhdCBJbmZlc3RhdGlvbic6XG4gICAgICAgIHRoaXMucmVzdW1lU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgncHJlbG9hZCcsdHJ1ZSxmYWxzZSwnZXAyJyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VwMy4gVGhlIEZseWluZyBNZW5hY2UnOlxuICAgICAgICB0aGlzLnJlc3VtZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnLHRydWUsZmFsc2UsJ2VwMycpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlcDQuIFRoZSBTaG9vdGluZyBTdGFycyc6XG4gICAgICAgIHRoaXMucmVzdW1lU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgncHJlbG9hZCcsdHJ1ZSxmYWxzZSwnZXA0Jyk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VwNS4gVGhlIE5pbmphIFJlYWxpdHknOlxuICAgICAgICB0aGlzLnJlc3VtZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnLHRydWUsZmFsc2UsJ2VwNScpO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZXA2LiBUaGUgTydNaWdodHkgQ2xhd1wiOlxuICAgICAgICB0aGlzLnJlc3VtZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3ByZWxvYWQnLHRydWUsZmFsc2UsJ2VwNicpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlQ3Vyc29yS2V5cyhib29sKXtcbiAgICB0aGlzLm5hdmlLZXlzLnVwLmVuYWJsZWQgPSBib29sO1xuICAgIHRoaXMubmF2aUtleXMuZG93bi5lbmFibGVkID0gYm9vbDtcbiAgfVxuXG4gIHJlc3VtZVN0YXRlKCl7XG4gICAgbGV0IHNvbWVwb3B1cCAgPSB0aGlzLndvcmxkLmdldFRvcCgpO1xuICAgIGlmKHNvbWVwb3B1cC5rZXk9PT0ncG9wdXAnKXtcbiAgICAgIHRoaXMud29ybGQucmVtb3ZlQ2hpbGQoc29tZXBvcHVwKTtcbiAgICAgIHNvbWVwb3B1cC5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHVwZGF0ZSgpe1xuXG5cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCB7XG5cbiAgaW5pdCh3aGljaEVwKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiaW5pdCBcIit3aGljaEVwKTtcbiAgICAgIC8vY2hlY2sgdGhlIGFyZ3MgZm9yIHdoaWNoIGVwaXNvZGVzIGFuZCBnZXQgdGhlIHNldHRpbmdzIGZyb20gY29uZmlnXG4gICAgICB0aGlzLndoaWNoRXAgPSB3aGljaEVwO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIHByZWxvYWQoKSB7XG4gICAgLy9hbGwgcHJlbG9hZHMgYXJlIGluIGJvb3Qgc3RhdGVcblxuICAgIC8vYmFja2dyb3VuZCBmb3IgZ2FtZVxuICAgIC8vdGhpcy5hZGQuc3ByaXRlKDAsMCwgXCJsb2FkaW5nYmdcIik7XG4gICAgbGV0IGxvYWRpbmdMYWJlbCA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndpZHRoLzIsdGhpcy5nYW1lLmhlaWdodCowLjQ1LCdsb2FkaW5nLi4uJyx7Zm9udDonNDBweCBBcmlhbCcsZmlsbDonI2ZmZmZmZid9KTtcbiAgICBsb2FkaW5nTGFiZWwuYW5jaG9yLnNldFRvKDAuNSwwLjUpO1xuXG4gICAgbGV0IHByZWxvYWRCYXIgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy5nYW1lLndpZHRoLzIsdGhpcy5nYW1lLmhlaWdodCowLjU1LCAncHJlbG9hZGVyJyk7XG4gICAgcHJlbG9hZEJhci5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xuXG4gICAgdGhpcy5sb2FkLnNldFByZWxvYWRTcHJpdGUocHJlbG9hZEJhcik7XG5cbiAgICAvL2RvIGFsbCB5b3VyIGxvYWRpbmcgaGVyZVxuICAgIHRoaXMubG9hZC5wYWNrKHRoaXMud2hpY2hFcCwnYXNzZXRzL2NvbmZpZy9Bc3NldFBhY2suanNvbicpO1xuICB9XG5cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnZ2FtZScsdHJ1ZSxmYWxzZSx0aGlzLndoaWNoRXApOy8vdGhpcy5zdGF0ZSA9c3RhdGVNYW5hZ2VyLiB1c2VkIHRvIGNvbnRyb2wgZGlmZmVyZW50IHN0YXRlcywgc3RhcnQgc3RvcCBwYXVzZVxuICB9XG5cbiAgdXBkYXRlKCkge1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IFRvb2xzIGZyb20gXCIuLi9jb21wb25lbnRzL1Rvb2xzLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29uIGV4dGVuZHMgUGhhc2VyLlN0YXRle1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaGlnaGxpZ2h0U3R5bGUgPSB7XG4gICAgICBmb250Oidib2xkIDI4cHggQ2VudHVyeScsZmlsbDonI2NkZTE2ZCdcbiAgICB9XG4gIH1cblxuICBjcmVhdGUoKXtcblxuICAgIHRoaXMud29uaW1nID0gdGhpcy5hZGQuaW1hZ2UoMCwxNjAsJ3dvbicpO1xuICAgIHRoaXMuc3RhcnR0aW1lciA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDI1MDA7XG4gICAgdGhpcy5tb3ZldGltZXIgPSAwO1xuXG4gICAgbGV0IGhpZ2h0ZXh0ID0gdGhpcy5hZGQudGV4dCg1MCw3MDAsXCJQcmVzcyAnQScgdG8gcmV0dXJuIHRvIG1haW4gbWVudS4uLlwiLHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuXG4gICAgdGhpcy5hZGQudHdlZW4oaGlnaHRleHQpLnRvKHsgYWxwaGE6IDAuMiB9LCA2MDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCB0cnVlLCAwLCBJbmZpbml0eSwgdHJ1ZSk7XG5cbiAgICBsZXQgYmFja2Ryb3AgPSB0aGlzLmFkZC5ncmFwaGljcygwLDApO1xuICAgIGJhY2tkcm9wLmJlZ2luRmlsbCgweDIyMjI2YSk7XG4gICAgYmFja2Ryb3AuZHJhd1JlY3QoMCwwLHRoaXMuZ2FtZS53aWR0aCwxNjApO1xuICAgIGJhY2tkcm9wLmVuZEZpbGwoKTtcblxuICAgIGNvbnNvbGUubG9nKFwidG90YWwgc2NvcmUgXCIrVG9vbHMuZ2V0VG90YWxTY29yZSgpKyBcIiBnYW1lIFwiICsgdGhpcy5nYW1lLndpZHRoKTtcblxuICAgIGxldCB0b3RhbFNjb3JlID0gVG9vbHMuZ2V0VG90YWxTY29yZSgpO1xuICAgIGxldCBoaWdoU2NvcmUgPSBUb29scy5nZXREYXRhKCdoaWdoX3Njb3JlJyk7XG4gICAgbGV0IHRpdGxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud2lkdGgvMiw1MCxcIllvdSd2ZSBjb2xsZWN0ZWQgXCIrdG90YWxTY29yZStcIiBvdXQgb2YgMTcyIGNoZWVzZSEgV2VsbCBEb25lIVwiLHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuICAgIHRpdGxlLmFuY2hvci5zZXRUbygwLjUsMC41KTtcbiAgICBsZXQgdGl0bGUxID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud2lkdGgvMiwxMDAsXCJZb3VyIGhpZ2hlc3Qgc2NvcmUgaXMgXCIraGlnaFNjb3JlLHRoaXMuaGlnaGxpZ2h0U3R5bGUpO1xuICAgIHRpdGxlMS5hbmNob3Iuc2V0VG8oMC41LDAuNSk7XG5cbiAgICB0aGlzLmtleUEgPSB0aGlzLmlucHV0LmtleWJvYXJkLmFkZEtleShQaGFzZXIuS2V5Ym9hcmQuQSk7XG4gICAgdGhpcy5rZXlBLm9uRG93bi5hZGQoKCk9PntcbiAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ21lbnUnKTtcbiAgICB9LHRoaXMpO1xuXG5cbiAgICAvL3N0b3AgYWxsIHByZXZpb3VzIHBsYXlpbmcgc291bmQgZmlyc3RcbiAgICB0aGlzLnNvdW5kLnN0b3BBbGwoKTtcbiAgICB0aGlzLnRoZW1lID0gdGhpcy5hZGQuYXVkaW9TcHJpdGUoJ2dhbWVvdmVyJyk7XG4gICAgaWYoVG9vbHMuZ2V0RGF0YSgnbXV0ZXRoZW1lJykpVG9vbHMubXV0ZU9yUGxheSh0aGlzLnRoZW1lLHRydWUpO1xuXG4gICAgdGhpcy50aGVtZS5wbGF5KCdEZWF0aCBvZiBLaW5ncycsMC42KTtcbiAgfVxuXG4gIHVwZGF0ZSgpe1xuICAgIGlmKHRoaXMuZ2FtZS50aW1lLm5vdyA+IHRoaXMuc3RhcnR0aW1lciYmdGhpcy53b25pbWcucG9zaXRpb24ueSA+IC0xMjgwKSB0aGlzLndvbmltZy5wb3NpdGlvbi55IC09IDAuMztcblxuICB9XG5cbn1cbiJdfQ==
