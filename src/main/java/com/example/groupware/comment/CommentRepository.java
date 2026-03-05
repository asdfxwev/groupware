package com.example.groupware.comment;

import com.example.groupware.comment.entity.Comment;

import java.util.List;

public interface CommentRepository {
    List<Comment> findByBoardId(Long boardId);
    Comment save(Comment comment);
    void deleteById(Long id);
    boolean existsById(Long id);
}
