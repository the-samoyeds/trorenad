WordLogic = function(game, skip) {
  'use strict';

  this.gameId = game._id;

  if (! skip) {
    var players = game.getPlayers();

    _.each(players, function(player) {
      Players.update({_id: player._id}, { $set: { master: false, currentWord: "" }});
    });
    Players.update({_id: _.sample(players)._id}, { $set: { master: true }});

    Games.update({_id: game._id}, { $set: { currentRound: 1, pool: [], answer: [] }});
  }
};

WordLogic.prototype.game = function() {
  return Games.findOne(this.gameId);
};

WordLogic.prototype.players = function() {
  return this.game().getPlayers();
};

WordLogic.prototype.startRound = function() {
  var game = this.generate(this.game().currentRound);

  var words = [];
  _.each(game, function(g) { words = words.concat(g.words); });

  var sortedAnswers = _.sortBy(words, function(word){ return word.order; });
  var fullAnswer = _.reduce(sortedAnswers, function(memo, word){ return memo + " " + word.word; }, "").trim();

  Games.update({_id: this.gameId}, { $set: { pool: words, answer: [], fullAnswer: fullAnswer, started: true }});
};

WordLogic.prototype.endRound = function() {
  this._nextMaster();

  Games.update({_id: this.gameId}, {
    $inc: { currentRound: 1 },
    $set: { pool: [], answer: [], started: false }
  });
};

WordLogic.prototype.giveWord = function(player, code) {
  var word = _.find(this.game().pool, function(word){ return word.crypted == code; });

  Players.update({_id: player._id}, { $set: { currentWord: word }});

  Games.update({_id: this.gameId}, {
    $pull: { pool: { crypted: code } }
  });

  Session.set("selectedWord", null);
};


WordLogic.prototype.returnWord = function() {
  var player = Meteor.player();

  Games.update({_id: this.gameId}, {
    $push: { pool: { $each: [ player.currentWord ] } }
  });

  Players.update( { _id: player._id }, { $set: { currentWord: "" }});
};

WordLogic.prototype.solveWord = function() {
  var player = Meteor.player();
  var word = player.currentWord;
  word.playerURL = player.profile.pictureUrl;

  Games.update({_id: this.gameId}, {
    $push: { answer: { $each: [ word ] } }
  });

  Players.update( { _id: player._id }, { $set: { currentWord: "" }});
};

WordLogic.prototype.answerWord = function(pos, code) {
  var word = _.find(this.game().pool, function(word){ return word.crypted == code; });

  if (word) {
    Games.update({_id: this.gameId}, {
      $push: { answer: { $each: [ word ], $position: pos } },
      $pull: { pool: { crypted: code } }
    });
  }
};
WordLogic.prototype.removeWord = function(pos) {
  var word = this.game().answer[pos];

  Games.update({_id: this.gameId}, {
    $push: { pool: { $each: [ word ] } },
    $pull: { answer: { crypted: word.crypted } }
  });
};

WordLogic.prototype.getRealSentence = function() {
  return this.game().fullAnswer;
};

WordLogic.prototype.validateSentence = function(sentence) {
  if (this.game().pool.length > 0) {
    return false;
  }

  var answers = this.game().answer;

  var sortedAnswers = _.sortBy(answers, function(word){
                        return word.order;
                      });

  var toCompare = _.reduce(sortedAnswers, function(memo, word){ return memo + " " + word.crypted; }, "");

  return sentence.trim() == toCompare.trim();
};


WordLogic.prototype.roundSolved = function() {
  var answers = this.game().answer;

  for ( var i = 0; i < answers.length; i++ ) {
    if (! answers[i]) {
      console.log("empty: " + i);
      return false;
    }
    if (answers[i].order != i+1) {
      console.log("bad: " + (i+1) + " -- " + answers[i].order);
      return false;
    }
  }

  return true;
};



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
        word.crypted = self._crypt(word.word, cypher);
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
console.log(numWordsInMessage);
  var message = _.sample(
    Messages.find(
      { words: { $gte: numWordsInMessage, $lt: (numWordsInMessage + this.players().length) } }
    ).fetch());

  var words = message.message.toUpperCase().split(" ");

  for ( var i = 0; i < words.length; i++ ) {
    words[i] = { word: words[i], order: i+1 };
  }

  return words;
};

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

  // if (players[players.length - 1].master) {
  //   Players.update({_id: players[players.length - 1]._id}, { $set: { master: false }});
  //   Players.update({_id: players[0]._id}, { $set: { master: true }});
  //   master = players[0];
  // }
  // else {
  //
  //   for ( var i = 1; i < players.length; i++ ) {
  //     if (players[i-1].master) {
  //       Players.update({_id: players[i-1]._id}, { $set: { master: false }});
  //       Players.update({_id: players[i]._id}, { $set: { master: true }});
  //       master = players[i];
  //       break;
  //     }
  //   }
  // }

  _.each(players, function(player) {
    Players.update({_id: player._id}, { $set: { master: false }});
  });

  master = _.sample(players);

  Players.update({_id: master._id}, { $set: { master: true }});

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
};
