//Array.prototype.equals
//http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
// attach the .equals method to Array's prototype to call it on any array
//only used for QUnit tests
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
	result = arr.getSubSeries( thresh );

assert.ok( result.equals([100, 50, 50, 50, 50, 50]), "Longest series in [100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100] is [100, 50, 50, 50, 50, 50]." );
assert.ok( [50,50,100,210,200].sum() === 610, "Reduce function adds arrays correctly." );

arr = [800, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100];
result = arr.getSubSeries( thresh );
assert.ok( result.equals([100, 50, 50, 50, 50, 50]), "A single element over the threshold does not bomb the function." );

arr = [10,10,10,10,10,10,10,10,10,10];
result = arr.getSubSeries( thresh );
assert.ok( result.equals([10,10,10,10,10,10,10,10,10,10]), "Shortcut answer when the full array sum is under the threshold." );

arr = [300,100,200,300,300,100,200,300,100,100];
result = arr.getSubSeries( thresh );
assert.ok( result.equals([300,100,100]), "When multiple subseries are the same length, return the one with the greatest sum under the threshold." );


arr = [100,100,200,200,100,100,200,300,100,100];
result = arr.getSubSeries( thresh );
assert.ok( result.equals([[100,200,200], [200,200,100], [300,100,100]]), "When multiple subseries are the same length and have the same sum, return them all." );

arr = [-10, 400, 100, 50, 50, 50, 50, 50, 500, 200, 100],
result = arr.getSubSeries( thresh, true );
assert.ok( result.equals([100, 50, 50, 50, 50, 50]), "Negative numbers can be allowed by optional argument." );


arr = [-100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100],

 assert.throws(
		 function() {
			 arr.getSubSeries( thresh );
		 },
		 NegativeNumberException,
 		"raised error is an instance of NegativeNumberException for the array [-100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100]."
		 );

 arr = ['b', 300, 100, 50, 50, 50, 50, 50, 500, 200, 100],

 assert.throws(
		 function() {
			 arr.getSubSeries( thresh );
		 },
		 IsNaNException,
		 "raised error is an instance of IsNaNException for the array  ['b', 300, 100, 50, 50, 50, 50, 50, 500, 200, 100]" );
 
 // test a big array 
  arr=[];
  for( var i = 0;i<100;i++ ){
	  arr.push( parseInt( Math.random() * 100, 10 ) );
  }
  result = arr.getSubSeries( thresh );
  assert.ok( result.length > 0, "Large array return a result." );
  console.log(result);
});
