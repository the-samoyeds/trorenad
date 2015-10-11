WordLogic = function(players) {
  'use strict';

  this.players = players;
};

WordLogic.prototype.generate = function(round) {
  'use strict';

  var self = this;

  var message = this._getMessage(round);
  var shuffledMessage = this._shuffleArray(message);
  var maxWordsPerUser = Math.ceil(message.length / this.players.length);

  var results = this.players.map(function(player, idx) {
    var words = shuffledMessage.splice(0,maxWordsPerUser);
    var cypher = self._generateCypher(round);

    words.forEach(function(word) {
      word["crypted"] = self._crypt(word["word"], cypher);
    });

    return {
            player: player,
            cypher: cypher,
            words: words
          };
  });

  return results;
};

WordLogic.prototype._getMessage = function(round) {
  'use strict';

  var numWordsInMessage = this.players.length * round;

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
