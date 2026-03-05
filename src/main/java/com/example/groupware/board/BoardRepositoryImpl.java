package com.example.groupware.board;


import com.example.groupware.board.entity.Board;
import com.example.groupware.board.entity.QBoard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepository {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    // QBoard 인스턴스 생성
    private final QBoard board = QBoard.board;
    @Override
    public Page<Board> findAll(Pageable pageable) {
        List<Board> content = queryFactory
                .selectFrom(board)
                .orderBy(board.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(board.count())
                .from(board)
                .fetchOne();

        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Optional<Board> findBoardById(Long id) {
        Board board = queryFactory
                .selectFrom(QBoard.board)
                .where(QBoard.board.id.eq(id))
                .fetchOne();
        return Optional.ofNullable(board);
    }

    @Override
    public void deleteBoardById(Long id) {
        queryFactory
                .delete(QBoard.board)
                .where(QBoard.board.id.eq(id))
                .execute();
    }

    @Override
    public boolean existsBoardById(Long id) {
        Integer result = queryFactory
                .selectOne()
                .from(QBoard.board)
                .where(QBoard.board.id.eq(id))
                .fetchFirst();
        return result != null;
    }

    @Override
    public Board save(Board board) {
        em.persist(board);
        return board;
    }

}
