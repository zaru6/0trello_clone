package trello.allin.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import trello.allin.backend.models.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
