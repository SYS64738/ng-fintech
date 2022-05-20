import {Pipe, PipeTransform} from "@angular/core";
import {Contact} from "../../../models/contact";

@Pipe({
  name: 'contactListFilter'
})
export class ContactListFilterPipe implements PipeTransform {

  transform(value: Contact[], filter: string | null): any {
    if (filter) {
      return value
        .filter(item =>
          `${item.name} ${item.surname}`.toLowerCase().includes(filter.toLowerCase()));
    }
    return value;
  }

}
