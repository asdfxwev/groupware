package com.example.groupware.comment;

import com.example.groupware.comment.entity.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public List<CommentResponseDto> getComments(Long boardId) {
        return commentRepository.findByBoardId(boardId)
                .stream()
                .map(CommentResponseDto::from)
                .toList();
    }

    @Override
    @Transactional
    public CommentResponseDto createComment(Long boardId, String writer, CommentRequestDto request) {
        Comment comment = Comment.builder()
                .boardId(boardId)
                .writer(writer)
                .content(request.getContent())
                .build();
        return CommentResponseDto.from(commentRepository.save(comment));
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new IllegalArgumentException("댓글이 존재하지 않습니다. id=" + commentId);
        }
        commentRepository.deleteById(commentId);
    }
}
