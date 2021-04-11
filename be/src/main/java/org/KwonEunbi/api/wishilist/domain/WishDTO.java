package org.KwonEunbi.api.wishilist.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.KwonEunbi.api.exhibition.domain.Exhbn;
import org.KwonEunbi.api.user.domain.UserVO;

import java.util.Date;

@Data
@NoArgsConstructor
public class WishDTO {
    private long wishNum;
    private long exhbnNum;
    private long userNum;
    private Exhbn exhbn;
    private UserVO user;

    public WishDTO(long wishNum, long userNum, long exhbnNum){
        this.wishNum = wishNum;
        this.userNum = userNum;
        this.exhbnNum = exhbnNum;
    }

    public WishDTO(long wishNum, Exhbn exhbn, UserVO user){
        this.wishNum = wishNum;
        this.userNum = userNum;
        this.exhbnNum = exhbnNum;
    }
}
