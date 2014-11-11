

QUnit.test( "subSeries Tests", function( assert ) {
var thresh = 500, 
	arraySet = [
	            [10,10,10],
	            [20,20],
	            [30]
	            ],
	arr = [100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100],
	result = arr.getSubSeries( thresh );

assert.ok( result.equals([100, 50, 50, 50, 50, 50]), "Passed! Longest series in [100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100] is [100, 50, 50, 50, 50, 50]." );
assert.ok( [50,50,100,210,200].sum() === 610, "Reduce function adds arrays correctly." );
assert.ok( arraySet.getLongest().equals( [10,10,10]), "Longest function returns the longest array in a collection." );

arr = [800, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100];
result = arr.getSubSeries( thresh );
assert.ok( result.equals([100, 50, 50, 50, 50, 50]), "Passed! A single element over the threshold does not bomb the function." );

arr = [10,10,10,10,10,10,10,10,10,10];
result = arr.getSubSeries( thresh );
assert.ok( result.equals([10,10,10,10,10,10,10,10,10,10]), "Shortcut answer when the full array sum is under the threshold." );



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
 
});
