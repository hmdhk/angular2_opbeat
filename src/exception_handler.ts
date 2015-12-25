import {ExceptionHandler} from 'angular2/angular2'
import {Opbeat} from 'angular2_opbeat/opbeat'

export class OpbeatExceptionHandler extends ExceptionHandler {

    constructor(private opbeat: Opbeat, _logger: any, _rethrowException?: boolean) {
        super(_logger, _rethrowException);
    }

    call(expeption, stackTrace = null, reason = null) {
        this.opbeat.captureException(expeption, reason);
        super.call(expeption, stackTrace, reason)
    }
}