import { Observable } from "rxjs";

export interface HttpServiceInterface<B> {
    get(url: string, options?: Object) : Observable<ArrayBuffer>;
    put(url: string, body : B,  options?: Object) : Observable<ArrayBuffer>;
    post(url: string, body: B, options?: Object) : Observable<ArrayBuffer>;
    delete(url: string, options?: any) : Observable<ArrayBuffer>;
}