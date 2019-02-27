import { NativeDateAdapter } from '@angular/material';

export class DatePickerSupport extends NativeDateAdapter {
    useUtcForDisplay = true;
    parse(value: any): Date | null {
        if (typeof value === 'string') {
            return new Date(value);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);

    }

    format(date: Date, displayFormat: any): string {
            // date -> string
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const value = year + '-' + month + '-' + day;
            return value
    }


}
