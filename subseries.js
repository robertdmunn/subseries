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
			if( isNaN( parseInt( val, 10 ) ) ) throw( "Non-numeric value encountered, exiting." );
			if( parseInt( val, 10 ) < 0 ) throw( "Negative value encountered, exiting." ); 
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
	
	return {
		getSubSeries : getSubSeries
		};
}());
