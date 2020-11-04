package trello.allin.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trello.allin.backend.models.Board;
import trello.allin.backend.service.BoardService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/boards")
    public ResponseEntity<List<Board>> getAllBoards(){
        return ResponseEntity.ok().body(boardService.getAllBoards());
    }

    @GetMapping("/boards/{id}")
    public ResponseEntity<Board> getBoardById(@PathVariable long id){
        return ResponseEntity.ok().body(boardService.getBoardById(id));
    }

    @PostMapping("/boards")
    public ResponseEntity<Board> createBoard(@RequestBody Board board){
        return ResponseEntity.ok().body(this.boardService.createBoard(board));
    }

    @PutMapping("/boards/{id}")
    public ResponseEntity<Board> updateProduct(@PathVariable long id, @RequestBody Board product){
        product.setId(id);
        return ResponseEntity.ok().body(this.boardService.updateBoard(product));
    }

    @DeleteMapping("/boards/{id}")
    public HttpStatus deleteBoard(@PathVariable long id){
        this.boardService.deleteBoard(id);
        return HttpStatus.OK;
    }
}
