package com.example.groupware.comment;

import com.example.groupware.login.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board/{boardId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final LoginRepository loginRepository;

    @GetMapping
    public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable Long boardId) {
        return ResponseEntity.ok(commentService.getComments(boardId));
    }

    @PostMapping
    public ResponseEntity<CommentResponseDto> createComment(
            @PathVariable Long boardId,
            @RequestBody CommentRequestDto request,
            @AuthenticationPrincipal UserDetails userDetails) {
        String writer = loginRepository.findByUserId(userDetails.getUsername())
                .map(u -> u.getName())
                .orElse(userDetails.getUsername());
        return ResponseEntity.ok(commentService.createComment(boardId, writer, request));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
