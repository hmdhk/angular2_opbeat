 import {BaseRequestOptions, Http,Response,ResponseOptions,Request,RequestOptions} from 'angular2/http';
 import {MockBackend} from 'angular2/http';
 import {Injector, provide} from 'angular2/angular2';

import {OpbeatHttp} from 'angular2_opbeat/http'


// import {
//   AsyncTestCompleter,
//   afterEach,
//   beforeEach,
//   ddescribe,
//   describe,
//   expect,
//   iit,
//   inject,
//   it,
//   xit
// } from 'angular2/testing_internal';


describe('OpbeatHttp', () => {
    var opbeat;
    var http: OpbeatHttp;
    var injector: Injector;
    var backend:MockBackend;
    var baseResponse;

    beforeEach(()=> {
        opbeat = jasmine.createSpyObj('opbeat', ['enqueueTransaction']);
	   var injector = Injector.resolveAndCreate([
           BaseRequestOptions,
           MockBackend,
            provide(OpbeatHttp, {useFactory:
            function(backend, defaultOptions) {
                return new OpbeatHttp(opbeat,backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]})
        ]);
        http = injector.get(OpbeatHttp);
        backend = injector.get(MockBackend);
        baseResponse = new Response(new ResponseOptions({body: 'base response'}));
    });
    
    afterEach(() => backend.verifyNoPendingRequests());

    it("should call profile http get", function(done) {
        backend.connections.subscribe(c => {
            expect(c.request.url).toBe('https://google.com');
            
            c.mockRespond(new Response(new ResponseOptions({body: 'body'})));
            expect(opbeat.enqueueTransaction).toHaveBeenCalled();
            done();
        });
        http.request(new Request(new RequestOptions({url: 'https://google.com'})))
            .subscribe((res) => {});
    });
});