package org.KwonEunbi.api.exhibition.service;

import org.KwonEunbi.api.exhibition.domain.Exhbn;

public interface ExhbnService {
	public long update(String exhbnTitle, String startDate, String endDate, String exhbnGenre, 
			String exhbnPrice, String exhbnArtist, String exhbnContent, String exhbnImage,
			String hallLocation, long exhbnNum);
}
