package com.example.groupware.board;

import com.example.groupware.board.entity.Board;
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

    @Override
    @Transactional
    public BoardResponseDto updateBoard(Long id, BoardRequestDto request) {
        Board board = boardRepository.findBoardById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다. id=" + id));

        board.update(request.getTitle(), request.getContent());

        return BoardResponseDto.from(board);
    }

    @Override
    @Transactional
    public BoardResponseDto createBoard(BoardRequestDto request) {
        Board board = Board.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .writer(request.getWriter())
                .build();
        return BoardResponseDto.from(boardRepository.save(board));
    }

    @Override
    @Transactional
    public BoardResponseDto getBoard(Long id) {
        Board board = boardRepository.findBoardById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다. id=" + id));
        board.increaseViewCount();
        return BoardResponseDto.from(board);
    }

    @Override
    @Transactional
    public void deleteBoard(Long id) {
        if (!boardRepository.existsBoardById(id)) {
            throw new IllegalArgumentException("게시글이 존재하지 않습니다. id=" + id);
        }
        boardRepository.deleteBoardById(id);
    }
}
