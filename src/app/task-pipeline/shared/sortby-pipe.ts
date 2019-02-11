import {Pipe, PipeTransform} from "@angular/core";
import {Column} from "./column";


@Pipe({name: "sort"})
export class ColumnsSortPipe implements PipeTransform {
    transform(array: Array<Column>): Array<Column> {
        console.log('pipe-sorting')
        if (!Array.isArray(array)) {
            return;
        }
        array.sort((a: any, b: any) => {
            if (a.order < b.order) {
                return -1;
            } else if (a.order > b.order) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}


