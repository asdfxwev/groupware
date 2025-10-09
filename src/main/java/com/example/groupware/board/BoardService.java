package com.example.groupware.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Page<BoardResponseDto> getBoardList(Pageable pageable);
}
