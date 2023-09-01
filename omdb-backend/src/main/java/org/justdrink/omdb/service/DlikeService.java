package org.justdrink.omdb.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.justdrink.omdb.model.Dlike;
import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.drink.AddDlikeRequestDto;
import org.justdrink.omdb.repository.DlikeRepository;
import org.justdrink.omdb.repository.DrinkRepository;
import org.justdrink.omdb.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class DlikeService {
    private final DlikeRepository dlikeRepository;
    private final MemberRepository memberRepository;
    private final DrinkRepository drinkRepository;

    /** 찜 등록 */
    @Transactional
    public Dlike saveDlike(AddDlikeRequestDto requestDto) {
        Optional<Members> member = memberRepository.findById(requestDto.getUid());
        Optional<Drink> drink = drinkRepository.findById(requestDto.getDid());
        return dlikeRepository.save(requestDto.toEntityDlike(member.get(),drink.get()));
    }

    /** 상세페이지 찜 조회 */
    @Transactional
    public boolean findDlike(Long uid, Long did) {
        boolean dlike = dlikeRepository.existsByMembers_UidAndDrink_Did(uid, did);
        return dlike;
    }

    /** 마이페이지 찜 목록 조회 */
    @Transactional
    public List<Dlike> findUserDlike(Long uid) {
        List<Dlike> dlike = dlikeRepository.findByMembers_Uid(uid);
        return dlike;
    }

    /** 찜 삭제 */
    @Transactional
    public void delDlike(Long uid, Long did) {
        Dlike delLike = dlikeRepository.findByMembers_UidAndDrink_Did(uid, did).orElseThrow(()->new IllegalArgumentException("상태 변경 불가"));
        dlikeRepository.delete(delLike);
    }


}
