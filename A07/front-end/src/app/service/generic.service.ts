import { Injectable } from '@angular/core';
import BACKEND_BASE_URL from "../env";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private backendURL = BACKEND_BASE_URL + "session.php";
  constructor(private http: HttpClient) { }
}
