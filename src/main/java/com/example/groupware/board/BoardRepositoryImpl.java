package com.example.groupware.board;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import static com.example.groupware.board.QBoard.board;

@Repository
@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepository {
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
