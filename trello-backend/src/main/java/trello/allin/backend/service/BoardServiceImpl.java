package trello.allin.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trello.allin.backend.exception.ResourceNotFoundException;
import trello.allin.backend.models.Board;
import trello.allin.backend.repository.BoardRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    @Override
    public Board updateBoard(Board board) {
        Optional<Board> boardDb = this.boardRepository.findById(board.getId());

        if(boardDb.isPresent()) {
            Board boardUpdate = boardDb.get();
            boardUpdate.setId(board.getId());
            boardUpdate.setTitle(board.getTitle());
            boardUpdate.setCards(board.getCards());
            boardRepository.save(boardUpdate);
            return boardUpdate;
        }else {
            throw new ResourceNotFoundException("Record not found with id : " + board.getId());
        }
    }

    @Override
    public List<Board> getAllBoards() {
        return this.boardRepository.findAll();
    }

    @Override
    public Board getBoardById(long boardId) {

        Optional<Board> boardDb = this.boardRepository.findById(boardId);

        if(boardDb.isPresent()) {
            return boardDb.get();
        }else {
            throw new ResourceNotFoundException("Record not found with id : " + boardId);
        }
    }

    @Override
    public void deleteBoard(long boardId) {
        Optional<Board> boardDb = this.boardRepository.findById(boardId);

        if(boardDb.isPresent()) {
            this.boardRepository.delete(boardDb.get());
        }else {
            throw new ResourceNotFoundException("Record not found with id : " + boardId);
        }

    }

}
