import {Http, Response, RequestOptionsArgs, ConnectionBackend, RequestOptions} from  'angular2/http'
import { Observable } from 'angular2/angular2';
import {Opbeat} from 'angular2_opbeat/opbeat'

declare var zone;

export class OpbeatHttp extends Http {

    constructor(private opbeat: Opbeat, _backend: ConnectionBackend, _defaultOptions: RequestOptions) {
        super(_backend, _defaultOptions);
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        var queueCount = 0;
        var start;
        var time = 0;
        var timer = performance ? performance.now.bind(performance) : Date.now.bind(Date);

        var zone = zone.fork({
            beforeTask: function() {
                start = timer();
            },
            afterTask: () => {
                time += timer() - start;
                if (queueCount == 0) {
                    this.opbeat.enqueueTransaction({
                        transaction: 'http.get',
                        durations: time
                    });
                }
            },
            enqueueTask: function() {
                queueCount++;
            },
            dequeueTask: function() {
                queueCount--;
            }
        });
        return zone.run(super.get, this, arguments);
        // return super.get.apply(this, arguments)
    }
}