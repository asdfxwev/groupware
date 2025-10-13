package com.example.groupware.board;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;

    @Override
    public Page<BoardResponseDto> getBoardList(Pageable pageable) {
        return boardRepository.findAll(pageable)
                .map(BoardResponseDto::from);
    }
}
