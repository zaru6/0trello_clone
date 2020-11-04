import { BoardService } from './../board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from './../board';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit {
  cardText: string
  newText: string
  id: number
  board: Board

  displayTextBox: boolean = false
  editedText: string
  editCardId: number 

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private boardService: BoardService) { }

  ngOnInit(): void { 
    this.board = new Board(); 
    this.id = this.route.snapshot.params['id']; 
    this.boardService.getBoard(this.id) 
      .subscribe(data => {
        console.log(data)
        this.board = data;
      }, error => console.log(error));
  } 

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.cards, event.previousIndex, event.currentIndex);
    console.log(this.board.cards)
  }

  //ADD NEW CARD
  addCard(newText:string) { 
    if(newText.length > 0) {
      this.board.cards.push(newText)
    }
    this.newText = ""
  }

  //CARD EDITING
  toggleCardEditing(card:string) {
    let arr = Array.from(this.board.cards)
    this.editCardId = arr.indexOf(card)
    this.displayTextBox=!this.displayTextBox
    console.log("Card selected for editing:" + this.editCardId)
  }

  saveEditedCard(editedText:string, board:Board, cardId:number) {
    if(editedText.length > 0) {
      this.board.cards[this.editCardId] = editedText
      this.displayTextBox=!this.displayTextBox
      console.log("Card " + this.editCardId + " edited successfully.")
    }
    this.editedText = ""
  }

  cancelEditing () {
    this.displayTextBox=!this.displayTextBox
  }
  
  //DELETE
  deleteCard(card:string) {
    let arr = Array.from(this.board.cards)
    let index = arr.indexOf(card)
    arr.splice(index, 1)
    this.board.cards = arr
    console.log("Deleted \"" + card + "\" from board with id=" + this.board.id + ".")
    if(this.displayTextBox) { //jer imamo BUG ako brišemo card koji editiramo
      this.displayTextBox=!this.displayTextBox //napraviti toggle za delete
    }
  }

  //UPDATE/SAVE
  updateBoard() {
    this.boardService.updateBoard(this.id, this.board) 
      .subscribe(data => { 
        console.log("Board " + this.id + " saved.");
        this.board = new Board();
      }, error => console.log(error));
    location.reload()
  }
  


  

}
