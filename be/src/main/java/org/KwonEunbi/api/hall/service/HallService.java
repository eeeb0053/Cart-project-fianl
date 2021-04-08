package org.KwonEunbi.api.hall.service;

import java.util.List;

import org.KwonEunbi.api.hall.domain.Hall;
import org.KwonEunbi.api.hall.domain.HallDTO;

public interface HallService {
	public long update(String hallName, String hallLocation, String hallTime, String hallClosed,
					   String hallPnumber, String hallInfo, String Image, long hallNum);
	public List<HallDTO> findAllHall();
}
