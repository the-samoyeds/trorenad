WordLogic = function(players) {
  'use strict';

  this.players = players;
  this.master = new ReactiveVar(_.sample(this.players));
  this.currentRound = new ReactiveVar(1);
  this.pool = new ReactiveVar([]);
  this.answer = new ReactiveVar([]);
};

WordLogic.prototype.startRound = function() {
  var game = this.generate(this.currentRound.get());

  var words = [];
  _.each(game, function(g) { words = words.concat(g["words"]); });
  this.pool.set(words);

  // var emptyAnswer = this.pool.get().map(function(word, idx) {
  //                     return { pos: idx };
  //                   });
  this.answer.set(Array(this.pool.get().length));
}

WordLogic.prototype.endRound = function() {
  this._nextMaster();
  this.currentRound.set(this.currentRound.get() + 1);
}

WordLogic.prototype.giveWord = function(player, word) {
  this.pool.set(_.without(this.pool.get(), word));
  player["currentWord"] = word;
}
WordLogic.prototype.returnWord = function(player) {
  this.pool.set(this.pool.get().concat([player["currentWord"]]));
  player["currentWord"] = "empty";
}
WordLogic.prototype.answerWord = function(pos, word) {
  this.pool.set(_.without(this.pool.get(), word));
  var newAnswer = this.answer.get();
  newAnswer[pos-1] = word;
  this.answer.set(newAnswer);
}
WordLogic.prototype.removeWord = function(pos) {
  var word = this.answer.get()[pos-1];
  var newAnswer = this.answer.get();
  newAnswer[pos-1] = undefined;

  this.answer.set(newAnswer);
  this.pool.set(this.pool.get().concat([word]));
}

WordLogic.prototype.roundSolved = function() {
  if (this.pool.get().length == 0) {
    return _.every(this.answer.get(), function (word, idx) {
      return word["order"] == (idx+1);
    });
  }
}



WordLogic.prototype.generate = function(round) {
  'use strict';

  var self = this;

  var message = this._getMessage(round);
  var shuffledMessage = this._shuffleArray(message);
  var maxWordsPerUser = Math.ceil(message.length / (this.players.length - 1));

  var result = this.players.map(function(player, idx) {
                  var words = [];
                  var cypher = [];

                  if (player != self.master.get()) {
                    words = shuffledMessage.splice(0,maxWordsPerUser);
                    cypher = self._generateCypher(round);

                    words.forEach(function(word) {
                      word["crypted"] = self._crypt(word["word"], cypher);
                    });
                  }

                  return {
                          player: player,
                          cypher: cypher,
                          words: words
                        };
                });

  return result;
};

WordLogic.prototype._getMessage = function(round) {
  'use strict';

  var numWordsInMessage = (this.players.length - 1) * round;

  var message = _.sample(
    Messages.find(
      { words: { $gte: numWordsInMessage, $lt: (numWordsInMessage + this.players.length) } }
    ).fetch());

  var words = message["message"].toUpperCase().split(" ");

  for ( var i = 0; i < words.length; i++ ) {
    words[i] = { word: words[i], order: i+1 };
  }

  return words;
}

WordLogic.prototype._generateCypher = function(round) {
  'use strict';

  var symbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "'"];
  var shuffledSymbols = this._shuffleArray(Object.create(symbols));

  var cypher = {};

  for ( var i = 0; i < symbols.length; i++ ) {
    cypher[symbols[i]] = shuffledSymbols[i];
  }

  return cypher;
};

WordLogic.prototype._crypt = function(word, cypher) {
  'use strict';

  var result = "";

  for ( var i = 0; i < word.length; i++ ) {
    result += cypher[word.charAt(i)];
  }

  return result;
};

WordLogic.prototype._nextMaster = function() {
  'use strict';

  if (this.players[this.players.length - 1] == this.master.get()) {
    this.master.set(this.players[0]);
  }
  else {
    for ( var i = 1; i < this.players.length; i++ ) {
      if (this.players[i-1] == this.master.get()) {
        this.master.set(this.players[i]);
        break;
      }
    }
  }

  return this.master.get();
};


WordLogic.prototype._shuffleArray = function(array) {
  'use strict';

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
