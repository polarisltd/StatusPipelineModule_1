import {Pipe, PipeTransform} from "@angular/core";
import {Card} from "./card";


@Pipe({name: "sortCards"})
export class CardsSortPipe implements PipeTransform {
    transform(array: Array<Card>): Array<Card> {
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


