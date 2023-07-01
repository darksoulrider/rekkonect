class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

export default ErrorHandler;

/**** multiline comment ********

1. when using this erroHandler -> this will set data into Error class
2. and using this -> we configured errorMiddleware to use app.
3. now middleware take "err" so, automatically it get access to Error set.
4. so , now with middleware we can centriallised error handling in one place and also, with catchAsync error as well
5. so, any error be it as moongoose or else, we can hadnle it thorugth middleware


 take the message from error class
 i will give my coustome sattuscode
 this will set in Errorhandler
 then error is set now, and middleware takes "err" as funciton
 so from that it can send the error

*/
