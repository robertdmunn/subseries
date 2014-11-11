
function NegativeNumberException( message ){
	this.name="NegativeNumberException";
	this.message = message || "Negative value encountered.";
}
NegativeNumberException.prototype = new Error();
NegativeNumberException.prototype.constructor = NegativeNumberException;


function IsNaNException( message ){
	this.name="IsNaNException";
	this.message = message || "Non-numeric value encountered.";
}
IsNaNException.prototype = new Error();
IsNaNException.prototype.constructor = IsNaNException;