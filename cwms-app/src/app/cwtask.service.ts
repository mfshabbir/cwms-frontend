import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cwtask } from './cwtask';

@Injectable({
  providedIn: 'root'
})
export class CwtaskService {

  // service to call back end application
  private baseURL = "http://localhost:8080/api/cwtasks";
  constructor(private httpClient: HttpClient) { }
  // recieve a list of tasks
  getCWTasksList(): Observable<Cwtask[]>{
    return this.httpClient.get<Cwtask[]>(`${this.baseURL}`);
  }
  //create new task
  creatCwTask(cwTask : Cwtask) : Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,cwTask);
  }
  // recieve a task by id
  getCWTaskById(id:number):Observable<Cwtask>{
    return this.httpClient.get<Cwtask>(`${this.baseURL}/${id}`);
  }
  // update task by id
  updateCWTaskById(id:number, cwTask : Cwtask):Observable<Object>{
    return this.httpClient.put<Cwtask>(`${this.baseURL}/${id}`,cwTask);
  }
  // delete task by id
  deleteCWTaskById(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`,{ responseType: 'text' });
  }

}
