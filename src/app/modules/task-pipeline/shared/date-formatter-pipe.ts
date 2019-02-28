import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

export class Constants {
    static readonly DATE_FMT = 'dd.MM.yyyy';
}

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

    // dateAdaptor static injector issue, currently disabled
    constructor(/*private dateAdaptor: GermanDateAdapter */) {
        super('de-DE')
    }

    transform(value: any, args?: any): any {
         return super.transform(value, Constants.DATE_FMT);
        // return this.dateAdaptor.format(value, ''); // unused second argument
    }
}
