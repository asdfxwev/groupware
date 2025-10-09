package com.example.groupware.board;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    // 게시글 목록 조회
    @GetMapping
    public ResponseEntity<Page<BoardResponseDto>> getBoardList(Pageable pageable) {
        return ResponseEntity.ok(boardService.getBoardList(pageable));
    }

}
