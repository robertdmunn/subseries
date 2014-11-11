var exception =  (function() {
	
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

	return{
		negativeNumberException:negativeNumberException,
		isNaNException:isNaNException
	};
}());