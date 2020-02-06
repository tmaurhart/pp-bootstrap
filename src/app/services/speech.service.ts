import { Subscription, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { resultList, RxSpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';
import { Subject } from 'rxjs';
import { filter, map, tap, debounceTime, catchError } from 'rxjs/operators';
import { WhiteListedAction } from '../models/white-listed-action.enum';

@Injectable({ providedIn: 'root' })
export class SpeechService {
    private recognizedActions$: Subject<WhiteListedAction[]> = new Subject();
    private listeningSubscription: Subscription;
    private shouldBeListening = false;

    constructor(public speechRecognitionService: RxSpeechRecognitionService) {
        this.handleDisconnects();
    }
    start() {
        this.shouldBeListening = true;
        this.listeningSubscription = this.speechRecognitionService
            .listen()
            .pipe(
                resultList,
                map((list: SpeechRecognitionResultList) => list.item(list.length - 1)),
                filter((result: SpeechRecognitionResult)  => !result.isFinal),
                map((result: SpeechRecognitionResult) => result.item(0)),
                filter((result: SpeechRecognitionAlternative)  => result.confidence > 0.5),
                tap((result: SpeechRecognitionAlternative) => console.log(result)),
                map((result: SpeechRecognitionAlternative)  => result.transcript.trim()),
                tap((result: string)  => console.log(`Speech Recognizer heard: "${result}"`)),
                map((result: string) => {
                    const results = result.split(' ').map(partialResult => partialResult.toLowerCase());
                    const lastAction = results.length ? results[results.length - 1] : null;
                    const filtered = Object.values(WhiteListedAction).includes(lastAction as any) ? [lastAction] : [];
                    return filtered as unknown as WhiteListedAction[];
                })
            )
            .subscribe((results: WhiteListedAction[]) => {
                console.log('Speech actions recognized', results);
                this.recognizedActions$.next(results);
            }, error => {
                console.log('Speech recognition error', error);
            });
    }

    stop() {
        this.shouldBeListening = false;
    }

    listen() {
        return this.recognizedActions$.asObservable();
    }

    private handleDisconnects() {
        this.speechRecognitionService.started$
            .pipe(debounceTime(300))
            .subscribe(started => {
                console.log('SpeechService listening is active: ', started);
                if (!started && this.shouldBeListening) {
                    this.start();
                }
        });
    }
}
