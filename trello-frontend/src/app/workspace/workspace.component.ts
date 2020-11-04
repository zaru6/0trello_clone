import { BoardService } from './../board.service';
import { Board } from './../board';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  newBoardTitle: string
  board: Board
  boards: Board[]

  constructor(private boardService: BoardService,
    private router: Router) { }

  ngOnInit() {
    this.displayBoards();
    this.board = new Board();
  }

  displayBoards() {
    this.boardService.getBoards()
    .subscribe(boards => this.boards = boards);
  }

  editBoard(board:Board) {
    this.boardService.getBoard(board.id)
    console.log("Edit board " + board.id + ".")
  }

  addBoard(newBoardTitle:string) {
    this.board = new Board();
    let list: string[] = []
    this.board.title = newBoardTitle
    this.board.cards = list
    this.boardService.createBoard(this.board)
      .subscribe(board => {
        this.boards.push(this.board);
        console.log(this.board)
      });
    location.reload() 
  }
}