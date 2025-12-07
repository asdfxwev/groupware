package com.example.groupware.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BoardRepository {
    Page<Board> findAll(Pageable pageable);
    Optional<Board> findBoardById(Long id);
    void deleteBoardById(Long id);
    boolean existsBoardById(Long id);
}
