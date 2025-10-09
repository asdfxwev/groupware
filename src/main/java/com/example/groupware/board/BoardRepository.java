package com.example.groupware.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepository {
    Page<Board> findAll(Pageable pageable);
}
