import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Board } from './board';


@Injectable({ 
  providedIn: 'root' 
})
export class BoardService {

  private boardsUrl = 'http://localhost:8080/boards';  

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.boardsUrl)
  }

  getBoard(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.boardsUrl}/${id}`)
  }

  updateBoard(id: number, board: Board): Observable<any> {
    return this.http.put(`${this.boardsUrl}/${id}`, board)
  }

  createBoard(board: Board): Observable<Object> {
    return this.http.post(`${this.boardsUrl}`, board);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`BoardService: ${message}`);
  }
}