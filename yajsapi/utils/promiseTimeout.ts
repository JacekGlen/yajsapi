import sleep from "./sleep";

export default function promiseTimeout(asyncFn: Promise<any>, seconds: number): Promise<any|void> {
    return Promise.any([asyncFn, sleep(seconds)])
}