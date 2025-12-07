package com.example.groupware.board;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    // 게시글 목록 조회, 글 조회 추가(검색)
    @GetMapping
    public ResponseEntity<Page<BoardResponseDto>> getBoardList(Pageable pageable) {
        return ResponseEntity.ok(boardService.getBoardList(pageable));
    }

    // 글 수정
    @PutMapping("/{id}")
    public ResponseEntity<BoardResponseDto> updateBoard(
            @PathVariable Long id,
            @RequestBody BoardRequestDto request) {
        return ResponseEntity.ok(boardService.updateBoard(id, request));
    }

    // 글 삭제하기
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }


}
