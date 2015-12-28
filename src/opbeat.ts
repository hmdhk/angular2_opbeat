// import * as Opbeat from 'opbeat'

declare var _opbeat;

export class Opbeat {
    public captureException(exception, cause) {
        exception.stack = exception.originalStack;
        _opbeat('captureException', exception, cause);
        // Opbeat.captureException(exception, cause)
    }

    public enqueueTransaction(transaction) {
        _opbeat('captureTransaction', transaction);
    }
}