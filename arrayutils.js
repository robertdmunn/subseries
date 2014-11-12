// sum the elements of an array. Throw errors if elements are non-numeric
Array.prototype.sum = function(){
	var prev, val;
	return this.reduce( function( prev, val ) {
		if( isNaN( parseInt( prev, 10 ) ) ) throw new IsNaNException();
		return prev + val;
	});
};

//return the index of the first instance of a negative value in the array
Array.prototype.checkForNegative = function(){
	var i, neg;
	for( i = 0; i < this.length; i++ ){
		if( parseInt( this[i], 10 ) < 0 ){
			neg = true;
			break;
		};
	}
	if( neg === true ) return i;
	return -1;
};

// get the longest subseries of a non-negative numeric array whose sum is equal to or less than the given threshold value
Array.prototype.getSubSeries = function( threshold, allowNegatives ){
	var i, o, ser = [ ], tmpSum, tmp = [], ixNeg, self = this, tmpResult, j=1, result, maxSum=0;

	getLongest = function( array ){
		var o, i, j=1, res=[[]];
		array.forEach( function( o, i ) {
			if ( o.length > res[0].length || ( o.length === res[0].length && o.sum() > res[0].sum() ) ){
				res=[];
				res[0] = o;
				j=1;
			}				
			else if ( o.length === res[0].length && o.sum() === res[0].sum() ){
				res[j] = o;
				j++;
			}
		});
		if( res.length === 1 ) return res[0];
		else return res;
	};

	if ( this.sum() <= threshold ) return this;

	if( allowNegatives !== true ){
		ixNeg = this.checkForNegative();
		if( ixNeg >= 0 )  throw new NegativeNumberException();
	}
	this.forEach( function( o, i, self ) {
		tmp = self.slice( i, self.length );
		if( tmp[0] > threshold ) return;
		tmpSum = tmp.sum();
		while ( tmpSum > threshold ) {
			tmp = tmp.slice( 0, tmp.length - 1 );
			tmpSum = tmp.sum();
		}
		ser[i] = tmp;
	});

	return getLongest( ser );
};