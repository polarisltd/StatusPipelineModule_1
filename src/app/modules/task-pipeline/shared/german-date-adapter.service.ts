import {NativeDateAdapter} from '@angular/material';
import * as moment from 'moment';

export class GermanDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    const m = moment(value, ['DD.MM.YYYY', moment.ISO_8601]);
    return m.isValid() ? m.toDate() : null;
  }

  format(date: Date, displayFormat: Object): string {
    return moment(date).format('DD.MM.YYYY');
  }

  deserialize(value: any): Date | null {
    return this.parse(value);
  }
}
