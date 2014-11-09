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

QUnit.test( "subSeries Tests", function( assert ) {
var thresh = 500, 
	arraySet = [
	            [10,10,10],
	            [20,20],
	            [30]
	            ],
	arr = [100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100],
	result = subSeries.getSubSeries( arr, thresh );

assert.ok( result.equals([100, 50, 50, 50, 50, 50]), "Passed! Longest series in [100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100] is [100, 50, 50, 50, 50, 50]." );
assert.ok( subSeries.reduce([50,50,100,210,200]) === 610, "Reduce function adds arrays correctly." );
assert.ok( subSeries.getLongest(arraySet).equals( [10,10,10]), "Longest function returns the longest array in a collection." );

arr = [800, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100];
result = subSeries.getSubSeries( arr, thresh );
assert.ok( result.equals([100, 50, 50, 50, 50, 50]), "Passed! A single element over the threshold does not bomb the function." );

arr = [10,10,10,10,10,10,10,10,10,10];
result = subSeries.getSubSeries( arr, thresh );
assert.ok( result.equals([10,10,10,10,10,10,10,10,10,10]), "Shortcut answer when the full array sum is under the threshold." );



arr = [-100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100],

 assert.throws(
		 function() {
		 subSeries.getSubSeries( arr, thresh );
		 },
		 subSeries.negativeNumberException,
 		"raised error is an instance of subSeries.negativeNumberException for the array [-100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100]."
		 );

 arr = ['b', 300, 100, 50, 50, 50, 50, 50, 500, 200, 100],

 assert.throws(
		 function() {
			 subSeries.getSubSeries( arr, thresh );
		 },
		 subSeries.isNaNException,
		 "raised error is an instance of subSeries.isNaNException for the array  ['b', 300, 100, 50, 50, 50, 50, 50, 500, 200, 100]" );
 
});
