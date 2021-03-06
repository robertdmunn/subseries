subseries
=========

***v 1.0.0***

Adam Cameron's array subseries challenge http://blog.adamcameron.me/2014/11/something-for-weekend-wee-code-quiz-in.html

See the link for updated rules and comments.

Problem
 
One has an array of numbers, eg:

[100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100]


One also has a threshold number, for example 500.

For a given array and a given threshold, return the subarray which contains the longest run of consecutive numbers which - in total - are equal-to or less than the threshold.

For example:

series = [100, 300, 100, 50, 50, 50, 50, 50, 500, 200, 100]

threshold = 500

subseries = getSubseries(series,threshold) // [100, 50, 50, 50, 50, 50]


In this example, 100,300,100 are less than or equal to 500, and has a length of three. 300,100,50,50 has a length of four, but 100,50,50,50,50,50 has a length of six, which is the longest sequence, so is the answer.

Rules:

Answer in any or as many languages as you like. 

Answer via a gist (etc) or code on GitHub.
    
The code must work for any non-negative numeric array, with any numeric threshold. Demonstrate it for the example above.
