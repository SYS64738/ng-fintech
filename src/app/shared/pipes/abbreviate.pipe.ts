import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatePipe implements PipeTransform {
  transform(text: string, length: number, showAll: boolean = false, completeWords: boolean = true, suffix: string = '...'): string {
    if (showAll)
      return text;
    if (!length)
      length = text.length;
    if (text.length < length)
      return `${text.substring(0, length)}`;
    if (completeWords) {
      length = text.substring(0, length).lastIndexOf(' ');
    }
    return `${text.substring(0, length)}${suffix}`;
  }

}
