var subSeries =  (function() {
	
	function getSubSeries( arr, threshold ) {
		var i, o, ser = [ ], tmpSum, j, tmp = [];
		
		if ( reduce( arr ) <= threshold )
			return arr;

		arr.forEach( function( o, i, arr ) {
			j = 1;
			tmp = arr.slice( i, arr.length );
			tmpSum = reduce( tmp );
			while ( tmpSum > threshold && tmp[ 0 ] <= threshold ) {
				tmp = tmp.slice( 0, arr.length - j );
				tmpSum = reduce( tmp );
				j++;
			}
			ser[i] = tmp;
		} );
		return getLongest( ser );
	}

	function reduce( myarray ) {
		var prev, val, ix, tmp;
		return myarray.reduce( function( prev, val, ix, tmp ) {
			if( isNaN( parseInt( prev, 10 ) ) ) throw new isNaNException( prev );
			if( parseInt( prev, 10 ) < 0 ) throw new negativeNumberException( prev ); 
			return prev + val;
		} );
	}

	function getLongest( arraySet ) {
		var o, i, res=[];
		arraySet.forEach( function( o, i, arraySet ) {
			if ( o.length > res.length ) res = o;
		});
		return res;
	}
	
	function Exception( val ){
		this.value = val;
		this.message = "Base error";
		this.toString = function() {
		      return this.value + this.message;
		 };		
	}
	
	function negativeNumberException( val ){
		this.message = "Negative number encountered.";
	}
	negativeNumberException.prototype = new Exception();
	negativeNumberException.prototype.constructor = negativeNumberException;
	
	
	function isNaNException( val ){
		this.message = "Non-numeric value encountered.";
	}
	isNaNException.prototype = new Exception();
	isNaNException.prototype.constructor = isNaNException;
	
	return {
		getSubSeries:getSubSeries,
		negativeNumberException:negativeNumberException,
		isNaNException : isNaNException,
		reduce: reduce,
		getLongest : getLongest
		};
}());