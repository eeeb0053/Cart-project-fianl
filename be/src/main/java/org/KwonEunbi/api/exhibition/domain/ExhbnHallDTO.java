package org.KwonEunbi.api.exhibition.domain;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.KwonEunbi.api.hall.domain.Hall;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@NoArgsConstructor
public class ExhbnHallDTO {
    private Exhbn exhbn;
    private String hallName;

    public ExhbnHallDTO(Exhbn exhbn, String hallName){
        this.exhbn = exhbn;
        this.hallName = hallName;
    }

}
