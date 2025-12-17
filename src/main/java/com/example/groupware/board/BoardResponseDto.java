package com.example.groupware.board;

import com.example.groupware.board.entity.Board;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class BoardResponseDto {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private int viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BoardResponseDto from(Board board) {
        return BoardResponseDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .writer(board.getWriter())
                .viewCount(board.getViewCount())
                .createdAt(board.getCreatedAt())
                .updatedAt(board.getUpdatedAt())
                .build();
    }
}