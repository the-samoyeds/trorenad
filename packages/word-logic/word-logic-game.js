WordLogic = function(game) {
  'use strict';

  this.gameId = game._id;

  var players = game.getPlayers();

  _.each(players, function(player) {
    Players.update({_id: player._id}, { $set: { master: false }});
  });
  Players.update({_id: _.sample(players)._id}, { $set: { master: true }});

  Games.update({_id: game._id}, { $set: { currentRound: 1, pool: [], answer: [] }});
};

WordLogic.prototype.game = function() {
  return Games.findOne(this.gameId);
}

WordLogic.prototype.players = function() {
  return this.game().getPlayers();
}

WordLogic.prototype.startRound = function() {
  var game = this.generate(this.game().currentRound);

  var words = [];
  _.each(game, function(g) { words = words.concat(g["words"]); });


  Games.update({_id: this.gameId}, { $set: { pool: words, answer: Array(words.length) }});
}

WordLogic.prototype.endRound = function() {
  this._nextMaster();

  Games.update({_id: game._id}, { $set: { currentRound: this.game().currentRound + 1 }});
}

WordLogic.prototype.giveWord = function(player, word) {
  Games.update({_id: game._id}, { $set: { pool: _.without(this.game().pool, word) }});
  Players.update({_id: player._id}, { $set: { currentWord: word }});
}
WordLogic.prototype.returnWord = function(player) {
  Games.update(game, { $set: { pool: this.game().pool.concat([player["currentWord"]]) }});
  Players.update( player, { $set: { currentWord: "empty" }});
}
WordLogic.prototype.answerWord = function(pos, word) {
  var newAnswer = this.game().answer;
  newAnswer[pos-1] = word;

  Games.update(game, { $set: {
          pool: _.without(this.game().pool, word),
          answer: newAnswer
   }});
}
WordLogic.prototype.removeWord = function(pos) {
  var word = this.game().answer[pos-1];
  var newAnswer = this.game().answer;
  newAnswer[pos-1] = undefined;

  Games.update({_id: this.game()._id}, { $set: {
          pool: this.game().pool.concat(([word])),
          answer: newAnswer
   }});
}

WordLogic.prototype.roundSolved = function() {
  if (this.game().pool.length == 0) {
    return _.every(this.game().answer, function (word, idx) {
      return word["order"] == (idx+1);
    });
  }
}



WordLogic.prototype.generate = function(round) {
  'use strict';

  var self = this;
  var players = this.players();

  var message = this._getMessage(round);
  var shuffledMessage = this._shuffleArray(message);

  var maxWordsPerUser = Math.ceil(message.length / (players.length - 1));

  var result = players.map(function(player, idx) {
                  var words = [];
                  var cypher = [];
                  if (! player.master) {
                    words = shuffledMessage.splice(0,maxWordsPerUser);
                    cypher = self._generateCypher(round);

                    words.forEach(function(word) {
                      word["crypted"] = self._crypt(word["word"], cypher);
                    });
                  }

                  Players.update({_id: player._id}, { $set: { cypher: cypher, words: words }});

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

  var numWordsInMessage = (this.players().length - 1) * round;

  var message = _.sample(
    Messages.find(
      { words: { $gte: numWordsInMessage, $lt: (numWordsInMessage + this.players().length) } }
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

  var players = this.players();
  var master = null;

  if (players[players.length - 1].master) {
    Players.update({_id: players[players.length - 1]._id}, { $set: { master: false }});
    Players.update({_id: players[0]._id}, { $set: { master: true }});
    master = players[0];
  }
  else {

    for ( var i = 1; i < players.length; i++ ) {
      if (players[i-1].master) {
        Players.update({_id: players[i-1]._id}, { $set: { master: false }});
        Players.update({_id: players[i]._id}, { $set: { master: true }});
        master = players[i];
        break;
      }
    }
  }

  return master;
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
