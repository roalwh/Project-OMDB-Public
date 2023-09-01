package org.justdrink.omdb.controller;

import java.io.File;
import java.util.List;

import org.hibernate.Hibernate;
import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.dto.board.AddBoardFileRequestDto;
import org.justdrink.omdb.model.dto.board.AddBoardRequestDto;
import org.justdrink.omdb.model.dto.board.BoardResponseDto;
import org.justdrink.omdb.model.dto.board.UpdateBoardRequestDto;
import org.justdrink.omdb.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    /** 게시글 등록 (simple)*/
  /*  @PostMapping("/add")
    public ResponseEntity<Board> addArticle(@RequestBody AddBoardRequest request) {
        Board savedBoard = boardService.saveBoard(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedBoard);
    }*/
    /** 게시글 등록 + 첨부파일 포함 (여러장 가능) */
    @PostMapping("/add")
    public ResponseEntity<Board> addBoard(
            @RequestParam(value = "files", required = false) MultipartFile files[],
            @RequestParam(value = "uid") Long uid,
            @RequestParam(value = "kind") int kind,
            @RequestParam(value = "title") String title,
            @RequestParam(value = "content") String content) {

        AddBoardRequestDto boardRequest = new AddBoardRequestDto(uid,kind,title,content,0L,"N");
        Board saveBoard = boardService.saveBoard(boardRequest); // board 테이블에 등록
        Long bid = saveBoard.getBid(); // board id 추출

        // 이미지가 있는경우
        if (files != null) {
            for (int i = 0; i < files.length; i++) {
                MultipartFile multi = files[i];
                String path = "c:\\img";
                System.out.println(path);

                try {
                    // 파일 경로 설정
                    String uploadpath = path;
                    String originFilename = multi.getOriginalFilename();
                   // long size = multi.getSize();
                    String extName = originFilename.substring(originFilename.lastIndexOf("."), originFilename.length());
                    // String saveFileName = genSaveFileName(extName);
                    String index = "_" + (i + 1); // 파일 넘버
                    String saveFileName = "board_" + bid + index + extName;

                    System.out.println("uploadpath : " + uploadpath);
                    System.out.println("originFilename : " + originFilename);
                    System.out.println("extensionName : " + extName);
                    System.out.println("index : " + index);
                    // System.out.println("size : " + size);
                    System.out.println("saveFileName : " + saveFileName);

                    // ★★★ 파일 경로 최종
                    String path2 = System.getProperty("user.dir");
                    // 윈도우
                    // String path3 = "\\src\\main\\resources\\files\\board\\board_" + bid;
                    // 리눅스
                    String path3 = "/src/main/resources/files/board/board_" + bid;
                    System.out.println("Working Directory = " + path2 + path3);
                    // 디비 파일 경로
                    String setpath = "/board/files/" + bid;
                    System.out.println("setpath =" + setpath);

                    if (!multi.isEmpty()) {
                        // 파일저장경로설정
                        File forder = new File(path2 + path3);
                        forder.mkdir();
                        System.out.println("forder" + forder);

                        // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
                        if (!forder.exists()) {
                            try {
                                forder.mkdirs(); // 폴더 생성합니다.
                                System.out.println("폴더가 생성되었습니다.");
                            } catch (Exception e) {
                                e.getStackTrace();
                            }
                        } else {
                            System.out.println("이미 폴더가 생성되어 있습니다.");
                        }
                        // 파일 저장 경로/파일이름
                        File file = new File(path2 + path3, saveFileName);
                        // 파일 저장
                        multi.transferTo(file);
                        // files 테이블에 등록
                        AddBoardFileRequestDto fileRequestDto = new AddBoardFileRequestDto(bid, originFilename, saveFileName, setpath, "N");
                        boardService.addFiles(fileRequestDto);
                    }
                } catch (Exception e) {
                    System.out.println(e);
                }
            }
            Board boards = boardService.findBoard(bid);
            return ResponseEntity.status(HttpStatus.CREATED).body(boards);
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(saveBoard);
        }
    }



    /** 게시글 수정 */
    @PutMapping("/update/{bid}")
    public ResponseEntity<Board> updateBoard(@PathVariable long bid,
                                                 @RequestBody UpdateBoardRequestDto request) {
        System.out.println(request);
        Board updatedBoard = boardService.updateBoard(bid, request);
        // 강제 초기화
        Hibernate.initialize(updatedBoard.getMembers());
        return ResponseEntity.ok()
                .body(updatedBoard);
    }

    /** 게시글 삭제 - 삭제여부 Y 로 변경 */
    @PutMapping("/inactive/{bid}")
    public ResponseEntity<String> inactivateBoard(@PathVariable Long bid) {
        boardService.inactivateBoard(bid);
        return ResponseEntity.ok("Board inactivated successfully.");
    }


    /** 게시글 전체 조회
     * orderby cdatetime(등록일) / orderby hits(조회)
     * */
    @GetMapping("/view/all")
    public ResponseEntity<List<BoardResponseDto>> findAllBoard(
            @RequestParam(required = false, defaultValue = "cdatetime", value = "orderby") String sorting) {
        List<BoardResponseDto> boardList = boardService.findAll(sorting)
                .stream()
//                .peek(board -> Hibernate.initialize(board.getMembers()))
                .map(BoardResponseDto::view)
                .toList();

        return ResponseEntity.ok()
                .body(boardList);
    }


    /** 게시글 상세 보기 + 조회수 증가 */
    @GetMapping("/view/{bid}")
    public ResponseEntity<BoardResponseDto> viewBoard(@PathVariable long bid) {
        Board board = boardService.findBoard(bid);
        return  ResponseEntity.ok()
                .body(BoardResponseDto.of(board));
    }

    /** 게시글 목록별 조회
     * * kind = 1 (공지) / 2 (자유) / 3 (맛집)
     * orderby = cdatetime (등록일) / hits (조회)
     * */
    @GetMapping("/view")
    public ResponseEntity<List<BoardResponseDto>> findBoardKind(
            @RequestParam(required = false, value = "kind" ) Integer kind,
            @RequestParam(required = false, value = "title") String title,
            @RequestParam(required = false, defaultValue = "cdatetime", value = "orderby") String sorting
    ) {
        List<BoardResponseDto> boardKindList = boardService.findByKind(kind,title,sorting)
                .stream()
                .map(BoardResponseDto::view)
                .toList();

        return ResponseEntity.ok()
                .body(boardKindList);
    }



}
