import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Contact, ContactForm} from "../models/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  list(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiUrl}/contacts`);
  }

  insert(contact: ContactForm): Observable<Contact> {
    return this.http.post<Contact>(`${environment.apiUrl}/contacts`, contact);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/contacts/${id}`);
  }

  update(id: string, contact: ContactForm): Observable<Contact> {
    return this.http.put<Contact>(`${environment.apiUrl}/contacts/${id}`, contact);
  }

}
