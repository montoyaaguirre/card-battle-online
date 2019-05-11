(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var BoardController = function () {
    function BoardController(model, view) {
        _classCallCheck(this, BoardController);

        this._model = model;
        this._view = view;
        // Bind handlers to view events
        view.setCardClickHandler(this.handleEvent.bind(this));
    }

    _createClass(BoardController, [{
        key: "renderBoard",
        value: function renderBoard() {
            var cards = this._model.getPlayerCards();
            var displayCards = [];
            cards.forEach(function (card) {
                displayCards.push({
                    points: card.points,
                    type: card.type
                });
            });
            this._view.renderPlayerCards(displayCards);
            cards = this._model.getOponentCards();
            displayCards = [];
            cards.forEach(function (card) {
                displayCards.push({
                    points: card.points,
                    type: card.type
                });
            });
            this._view.renderOponentCards(displayCards);
        }
    }, {
        key: "handleEvent",
        value: function handleEvent(event) {
            event.stopPropagation();
            switch (event.type) {
                case "click":
                    this.clickHandler(event.target);
                    break;
                default:
                    console.log(event.target);
            }
        }
    }, {
        key: "clickHandler",
        value: function clickHandler(element) {
            if (element.id) {
                this._model.playPlayerCard(parseInt(element.id));
                this.renderBoard();
            }
        }
    }]);

    return BoardController;
}();

exports.BoardController = BoardController;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var CardType;
(function (CardType) {
    CardType[CardType["heal"] = 0] = "heal";
    CardType[CardType["attack"] = 1] = "attack";
    CardType[CardType["shield"] = 2] = "shield";
})(CardType = exports.CardType || (exports.CardType = {}));

var Card = function () {
    function Card(points, type) {
        _classCallCheck(this, Card);

        this._points = points;
        this._type = type;
    }

    _createClass(Card, [{
        key: "randomize",
        value: function randomize() {
            this._points = this._getRandomInt(1, 4);
            this._type = this._getRandomCardType();
        }
    }, {
        key: "_getRandomInt",
        value: function _getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }, {
        key: "_getRandomCardType",
        value: function _getRandomCardType() {
            var index = this._getRandomInt(0, 3);
            switch (index) {
                case 0:
                    return CardType.attack;
                case 1:
                    return CardType.heal;
                default:
                    return CardType.shield;
            }
        }
    }, {
        key: "points",
        get: function get() {
            return this._points;
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }]);

    return Card;
}();

exports.Card = Card;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("./card");

var Player = function () {
    function Player(health, shield, cards) {
        _classCallCheck(this, Player);

        this._maxHealth = 10;
        this._maxShield = 2;
        this._health = health;
        this._shield = shield;
        this._cards = this._cloneCards(cards);
    }

    _createClass(Player, [{
        key: "_cloneCards",
        value: function _cloneCards(cards) {
            var clones = [];
            cards.forEach(function (card) {
                clones.push(new card_1.Card(card.points, card.type));
            });
            return clones;
        }
    }, {
        key: "useCard",
        value: function useCard(index) {
            var card = this._cards[index];
            console.log("Used card at index " + index + "\nType: " + card.type + " Points: " + card.points);
            card.randomize(); // Simulate discarding card and drawing a new one.
        }
    }, {
        key: "applyEffects",
        value: function applyEffects(card) {
            switch (card.type) {
                case card_1.CardType.heal:
                    {
                        this.health += card.points;
                        break;
                    }
                case card_1.CardType.shield:
                    {
                        this.shield += card.points;
                        break;
                    }
                case card_1.CardType.attack:
                    {
                        this._receiveAttack(card.points);
                        break;
                    }
                default:
                    {
                        console.log("Card type: '" + card.type + "' not found.");
                    }
            }
        }
    }, {
        key: "_receiveAttack",
        value: function _receiveAttack(points) {
            if (this.shield > 0) {
                this._shield -= points;
            } else {
                this._health -= points;
            }
        }
    }, {
        key: "health",
        get: function get() {
            return this._health;
        },
        set: function set(health) {
            this._health = health;
            this._health = Math.min(Math.max(this._health, 0), this._maxHealth);
        }
    }, {
        key: "shield",
        get: function get() {
            return this._shield;
        },
        set: function set(shield) {
            this._shield = shield;
            this._shield = Math.min(Math.max(this._shield, 0), this._maxShield);
        }
    }, {
        key: "cards",
        get: function get() {
            return this._cards;
        },
        set: function set(cards) {
            this._cards = cards;
        }
    }]);

    return Player;
}();

exports.Player = Player;

},{"./card":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var board_view_1 = require("./views/board-view");
var board_controller_1 = require("./controllers/board-controller");
var board_model_1 = require("./models/board-model");
var model = new board_model_1.Board();
var view = new board_view_1.BoardView();
var controller = new board_controller_1.BoardController(model, view);
controller.renderBoard();

},{"./controllers/board-controller":1,"./models/board-model":5,"./views/board-view":6}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("../core/player");
var card_1 = require("../core/card");

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        var cards = [new card_1.Card(3, card_1.CardType.heal), new card_1.Card(1, card_1.CardType.shield), new card_1.Card(1, card_1.CardType.attack), new card_1.Card(3, card_1.CardType.attack), new card_1.Card(2, card_1.CardType.shield)];
        this._player = new player_1.Player(10, 0, cards);
        this._oponent = new player_1.Player(10, 0, cards);
    }

    _createClass(Board, [{
        key: "playPlayerCard",
        value: function playPlayerCard(index) {
            this._player.useCard(index);
            var card = this._player.cards[index];
            if (card.type === card_1.CardType.attack) {
                this._oponent.applyEffects(card);
            } else {
                this._player.applyEffects(card);
            }
            // Emit change in cards for view update
        }
    }, {
        key: "getPlayerCards",
        value: function getPlayerCards() {
            return this._player.cards;
        }
    }, {
        key: "getOponentCards",
        value: function getOponentCards() {
            return this._oponent.cards;
        }
    }]);

    return Board;
}();

exports.Board = Board;

},{"../core/card":2,"../core/player":3}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var BoardView = function () {
    function BoardView() {
        _classCallCheck(this, BoardView);

        this._cardTypes = ["❤️", "⚔️", "🛡️"];
    }

    _createClass(BoardView, [{
        key: "setCardClickHandler",
        value: function setCardClickHandler(handler) {
            var cards = document.querySelectorAll('#player-cards .card');
            cards.forEach(function (element) {
                element.addEventListener('click', handler);
            });
        }
    }, {
        key: "renderPlayerCards",
        value: function renderPlayerCards(cards) {
            this._renderCards(cards, this._getPlayerCards());
        }
    }, {
        key: "renderOponentCards",
        value: function renderOponentCards(cards) {
            this._renderCards(cards, this._getOponentCards());
        }
    }, {
        key: "_renderCards",
        value: function _renderCards(cards, nodes) {
            for (var i = 0; i < cards.length; i++) {
                nodes[i].innerHTML = this._cardTemplate(i, cards[i].points, cards[i].type);
            }
        }
    }, {
        key: "_getPlayerCards",
        value: function _getPlayerCards() {
            return this._getCards('player-cards');
        }
    }, {
        key: "_getOponentCards",
        value: function _getOponentCards() {
            return this._getCards('oponent-cards');
        }
    }, {
        key: "_getCards",
        value: function _getCards(containerID) {
            return document.querySelectorAll("#" + containerID + " .card");
        }
    }, {
        key: "_cardTemplate",
        value: function _cardTemplate(cardindex, points, type) {
            var template = "";
            var cardLabel = points.toString();
            var cardSuit = this._cardTypes[type];
            template = "\n            <div id=\"" + cardindex + "\" class=\"card-value-top\">" + cardLabel + "</div>\n            <div id=\"" + cardindex + "\" class=\"card-suit\">" + cardSuit + "</div>\n            <div id=\"" + cardindex + "\" class=\"card-value-bottom\">" + cardLabel + "</div>\n        ";
            return template;
        }
    }]);

    return BoardView;
}();

exports.BoardView = BoardView;

},{}]},{},[4])

//# sourceMappingURL=bundle.js.map
