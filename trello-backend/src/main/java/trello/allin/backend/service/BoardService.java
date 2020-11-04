package trello.allin.backend.service;

import trello.allin.backend.models.Board;

import java.util.List;

public interface BoardService {
    Board createBoard(Board card);

    Board updateBoard(Board board);

    List<Board> getAllBoards();

    Board getBoardById(long boardId);

    void deleteBoard(long boardId);

}
