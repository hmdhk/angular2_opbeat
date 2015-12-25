import {Injector, provide, ExceptionHandler} from 'angular2/angular2';
import {OpbeatExceptionHandler} from 'angular2_opbeat/exception_handler'



class _ArrayLogger {
    res: any[] = [];
    log(s: any): void { this.res.push(s); }
    logError(s: any): void { this.res.push(s); }
    logGroup(s: any): void { this.res.push(s); }
    logGroupEnd() { };
}
describe('OpbeatExceptionHandler', () => {
    var opbeat;
    var exceptionHandler: OpbeatExceptionHandler;
    var injector: Injector;


    beforeEach(function() {
        opbeat = jasmine.createSpyObj('opbeat', ['captureException']);
        injector = Injector.resolveAndCreate([
            provide(OpbeatExceptionHandler, { useValue: new OpbeatExceptionHandler(opbeat, new _ArrayLogger(), false) }),
        ]);
        exceptionHandler = injector.get(OpbeatExceptionHandler);//new OpbeatExceptionHandler(opbeat, null)
    });

    it("should call captureException", function() {
        exceptionHandler.call('test exception');
        expect(opbeat.captureException).toHaveBeenCalled();
    });
});