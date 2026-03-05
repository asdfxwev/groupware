package com.example.groupware.comment;

import com.example.groupware.comment.entity.Comment;
import com.example.groupware.comment.entity.QComment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepository {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;
    private final QComment comment = QComment.comment;

    @Override
    public List<Comment> findByBoardId(Long boardId) {
        return queryFactory
                .selectFrom(comment)
                .where(comment.boardId.eq(boardId))
                .orderBy(comment.createdAt.asc())
                .fetch();
    }

    @Override
    public Comment save(Comment comment) {
        em.persist(comment);
        return comment;
    }

    @Override
    public void deleteById(Long id) {
        queryFactory
                .delete(comment)
                .where(comment.id.eq(id))
                .execute();
    }

    @Override
    public boolean existsById(Long id) {
        Integer result = queryFactory
                .selectOne()
                .from(comment)
                .where(comment.id.eq(id))
                .fetchFirst();
        return result != null;
    }
}
