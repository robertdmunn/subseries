
//http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
};

// sum the elements of an array. Throw errors if elements are non-numeric
Array.prototype.sum = function(){
	var prev, val;
	return this.reduce( function( prev, val ) {
		if( isNaN( parseInt( prev, 10 ) ) ) throw new IsNaNException();
		return prev + val;
	});
};

Array.prototype.getLongest = function(){
	var o, i, j=1, res=[[]];
	this.forEach( function( o, i ) {
		if ( o.length > res[0].length ){
			res=[];
			res[0] = o;
			j=1;
		}
		else if ( o.length === res[0].length ){
			res[j] = o;
			j++;
		}
	});
	return res;
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
	
	if ( this.sum() <= threshold ){
		return this;
	}
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
	tmpResult = ser.getLongest();
	if( tmpResult.length > 1 ){
		tmpResult.forEach( function( o, i, tmpResult ){
			if( o.sum() > maxSum ){
				maxSum = o.sum();
				j=1;
				result=[];
				result[0]=o;
			}
			else if( o.sum() === maxSum ){
				result[j] = o;
				j++;
			}
		});
		if( result.length === 1 ) return result[0];
		else return result;

	}else{
		return tmpResult[0];
	}
};