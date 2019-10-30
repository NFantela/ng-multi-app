import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'matchTwoStrings'
})
export class MatchTwoStringsPipe implements PipeTransform {
    transform(val1: string, val2:string):boolean {
        if(val1 && val2) {
            return val1.toLowerCase() === val2.toLowerCase();
        }
        return false;
    }
}