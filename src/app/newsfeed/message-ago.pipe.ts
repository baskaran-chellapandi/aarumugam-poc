// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({ name: 'timeAgo' })
// export class DateAgoPipe implements PipeTransform {
//   // transform(value: any, ...args: any[]) {
//   //   throw new Error('Method not implemented.');
//   // }
//   transform(d: any):string {
    // return:string
//     let currentDate = new Date(new Date().toUTCString());
//     let date = new Date(d + "Z");

//     let year = currentDate.getFullYear() - date.getFullYear();
//     let month = currentDate.getMonth() - date.getMonth();
//     let day = currentDate.getDate() - date.getDate();
//     let hour = currentDate.getHours() - date.getHours();
//     let minute = currentDate.getMinutes() - date.getMinutes();
//     let second = currentDate.getSeconds() - date.getSeconds();

//     let createdSecond = (year * 31556926) + (month * 2629746) + (day * 86400) + (hour * 3600) + (minute * 60) + second;

//     if (createdSecond >= 31556926) {
//       let yearAgo = Math.floor(createdSecond / 31556926);
//       return yearAgo > 1 ? yearAgo + " years ago" : yearAgo + " year ago";
//     } else if (createdSecond >= 2629746) {
//       let monthAgo = Math.floor(createdSecond / 2629746);
//       return monthAgo > 1 ? monthAgo + " months ago" : monthAgo + " month ago";
//     } else if (createdSecond >= 86400) {
//       let dayAgo = Math.floor(createdSecond / 86400);
//       return dayAgo > 1 ? dayAgo + " days ago" : dayAgo + " day ago";
//     } else if (createdSecond >= 3600) {
//       let hourAgo = Math.floor(createdSecond / 3600);
//       return hourAgo > 1 ? hourAgo + " hours ago" : hourAgo + " hour ago";
//     } else if (createdSecond >= 60) {
//       let minuteAgo = Math.floor(createdSecond / 60);
//       return minuteAgo > 1 ? minuteAgo + " minutes ago" : minuteAgo + " minute ago";
//     } else if (createdSecond < 60) {
//       return createdSecond > 1 ? createdSecond + " seconds ago" : createdSecond + " second ago";
//     } else if (createdSecond < 0) {
//       return "0 second ago";
//     }
//     throw ('.');
//   }
// }

// import { Pipe, ChangeDetectorRef } from '@angular/core';
// import { parse } from 'date-fns';
// import { distanceInWordsToNow } from 'date-fns';
// import { AsyncPipe } from '@angular/common';
// import { timer, Observable } from 'rxjs';
// import { tap, map, distinctUntilChanged, startWith } from 'rxjs/operators';

// @Pipe({
//   name: 'timeAgo',
//   pure: false,
// })
// export class TimeAgoPipe extends AsyncPipe {

//   private time: Date;
//   private formatted$: Observable<string>;

//   constructor(private cd: ChangeDetectorRef) {
//     super(cd);

//     this.formatted$ = timer(0, 1000).pipe(
//       map(() => distanceInWordsToNow(this.time, { addSuffix: true, includeSeconds: true })),
//       distinctUntilChanged(),
//       tap(time => console.log('new time:', time)),
//     );
//   }

//   public transform(value: any): any {
//     this.time = parse(value);
//     return super.transform(this.formatted$);
//   }

// }
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateAgo',
    pure: true
})
export class MessageAgoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            const intervals: { [key: string]: number } = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    } else {
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
            }
        }
        return value;
    }

}