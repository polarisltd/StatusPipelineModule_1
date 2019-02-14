import {Column} from "./column";
import {Card} from "./card";


export class Board {
	_id: string;
	title: string;
	columns: Column[];
  cards: Card[];
}
