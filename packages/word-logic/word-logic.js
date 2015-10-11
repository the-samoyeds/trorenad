WordLogic = function(players) {
  'use strict';

  this.players = players;

};

WordLogic.prototype.generate = function(round) {
  'use strict';
  var self = this;

  var wordsInMessage = this.players.length * 3;

  var message = this._getMessage(wordsInMessage);
  var shuffledMessage = this._shuffleArray(message);



  var results = this.players.map(function(player, idx) {
    var words = shuffledMessage.splice(0,3);
    var cypher = self._generateCypher(round);



    words.forEach(function(word) {
      word["crypted"] = self._crypt(word, cypher);
    });

    return {
            p: player,
            cypher: cypher,
            words: words
          };
  });

  return results;
};

WordLogic.prototype._getMessage = function(numWords) {
  'use strict';

  return [
          { word: "THESE", order: 1 },
          { word: "PRETZELS", order: 2 },
          { word: "ARE", order: 3 },
          { word: "MAKING", order: 4 },
          { word: "ME", order: 5 },
          { word: "THIRSTY", order: 6 },
        ];
}

WordLogic.prototype._generateCypher = function(round) {
  'use strict';

  var symbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
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

  for ( var i = 0; i < word["word"].length; i++ ) {
    result += cypher[word["word"].charAt(i)];
  }

  return result;
};

WordLogic.prototype._shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
