// tslint:disable: no-console

import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from "rxjs/operators";

const input = document.getElementById("input-main");
const stopBtn = document.getElementById("btn-stop");


// const serach$ = new Observable<Event>(observer => {
//
// 	const onSearch = (event: Event) => {
// 		checkSubscription();
// 		observer.next(event);
// 	};
//
// 	const clear = () => {
// 		stopBtn.removeEventListener("click", onStop);
// 		input.removeEventListener("input", onSearch);
// 	};
//
// 	const checkSubscription = () => {
// 		if (observer.closed) {
// 			clear()
// 		}
// 	}
//
// 	const onStop = () => {
// 		checkSubscription();
// 		console.log('onStop');
// 		observer.complete();
// 		clear();
// 	};
//
// 	input.addEventListener("input", onSearch);
// 	stopBtn.addEventListener("click", onStop);
//
// });

const search$: Observable<Event> = fromEvent<Event>(document.getElementById('input-main'), 'input')
const stop$: Observable<Event> = fromEvent<Event>(document.getElementById('btn-stop'), 'click')


const searchSub = search$
	.pipe(
		debounceTime(500),
		map((event) => (event.target as HTMLInputElement).value),
		filter(value => value.length > 3),
		distinctUntilChanged(),
		takeUntil(stop$)
	)
	.subscribe((message) => console.log(message));
