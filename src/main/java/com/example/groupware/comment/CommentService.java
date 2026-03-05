package com.example.groupware.comment;

import java.util.List;

public interface CommentService {
    List<CommentResponseDto> getComments(Long boardId);
    CommentResponseDto createComment(Long boardId, String writer, CommentRequestDto request);
    void deleteComment(Long commentId);
}
