package com.example.groupware.board;


import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import static com.example.groupware.board.QBoard.board;

import com.example.groupware.board.QBoard;

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
}
