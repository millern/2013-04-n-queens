(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      var counter = 0;
      _.each(this.get(rowIndex), function(item){
         if(item == 1) {
           counter++;
         }
      });
      return counter > 1;
    },

    hasAnyRowConflicts: function(){
      var result = false;
      for (var i = 0; i < this.get('n'); i++) {
        result = result || this.hasRowConflictAt(i);
      }
      return result;
    },

    hasColConflictAt: function(colIndex){
      var counter = 0;
      for(var i = 0; i< this.get('n'); i++){
        if(this.get(i)[colIndex]===1){
          counter++;
        }
      }
      return counter > 1;
    },

    hasAnyColConflicts: function(){
      var result = false;
      for (var i = 0; i < this.get('n'); i++) {
        result = result || this.hasColConflictAt(i);
      }
      return result;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var counter = 0;
        for(var i = 0; i < this.get('n'); i++) {
          if(this.get(i)[majorDiagonalColumnIndexAtFirstRow+i]===1){
            counter++;
          }
        }
      return counter > 1;
    },

    hasAnyMajorDiagonalConflicts: function(){
      //2-n
      var result = false;
      for (var i = 2-this.get('n'); i < this.get('n')-2; i++){
        result = result || this.hasMajorDiagonalConflictAt(i);
      }
      return result;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var counter = 0;
      for(var i = 0; i < this.get('n'); i++) {
        if(this.get(i)[minorDiagonalColumnIndexAtFirstRow-i]===1){
          counter++;
        }
      }
      return counter > 1;
    },

    hasAnyMinorDiagonalConflicts: function(){
      var result = false;
      for (var i = 1; i < this.get('n')*2-3; i++){
        result = result || this.hasMinorDiagonalConflictAt(i);
      }
      return result;
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
