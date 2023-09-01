package org.justdrink.omdb.controller;

import lombok.RequiredArgsConstructor;
import org.justdrink.omdb.model.Dlike;
import org.justdrink.omdb.model.dto.dlike.DlikeresponsJimDTO;
import org.justdrink.omdb.model.dto.drink.AddDlikeRequestDto;
import org.justdrink.omdb.service.DlikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/dlike")
public class DlikeController {

    private final DlikeService dlikeService;

    /** 찜 등록 **/
    @PostMapping("/add")
    public ResponseEntity<Dlike> addArticle(@RequestBody AddDlikeRequestDto requestDto) {
        Dlike saveDlike = dlikeService.saveDlike(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(saveDlike);
    }

    /** 상세페이지 찜 조회 */
    @GetMapping(path = "/likeChk", params = {"uid", "did"})
    public boolean findDid(@RequestParam(value = "uid") Long uid, @RequestParam(value = "did") Long did, Model model) {
        boolean dlike = dlikeService.findDlike(uid, did);
        return dlike;
    }

    /** 유저 찜 목록 조회 **/
    @GetMapping(path = "/userList", params = "uid")
    public ResponseEntity<List<DlikeresponsJimDTO>> findDid(@RequestParam(value = "uid") Long uid, Model model) {
        List<DlikeresponsJimDTO> dlike = dlikeService.findUserDlike(uid)
            .stream().map(DlikeresponsJimDTO::new).toList();
        return ResponseEntity.ok().body(dlike);
    }

    /** 찜 삭제  @param uid, did */
    @PutMapping("/drop/{uid}/{did}")
    public void dropDlike(@PathVariable Long uid, @PathVariable Long did) {
        dlikeService.delDlike(uid, did);
    }

}
