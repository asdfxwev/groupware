package com.example.groupware.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Page<BoardResponseDto> getBoardList(Pageable pageable);

    BoardResponseDto updateBoard(Long id, BoardRequestDto request);

    void deleteBoard(Long id);
}
