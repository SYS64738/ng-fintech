import {Pipe, PipeTransform} from "@angular/core";
import {Contact} from "../../../models/contact";

@Pipe({
  name: 'contactListSort'
})
export class ContactListSortPipe implements PipeTransform {

  transform(value: Contact[], ...args: any[]): any {
    return value.sort((a, b) =>
      `${a.surname.toLowerCase()} ${a.name.toLowerCase()}` < `${b.surname.toLowerCase()} ${b.name.toLowerCase()}` ? -1 : 1);
  }

}
