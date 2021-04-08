package org.KwonEunbi.api.exhibition.service;

import com.querydsl.core.Tuple;
import org.KwonEunbi.api.common.service.AbstractService;
import org.KwonEunbi.api.exhibition.domain.Exhbn;
import org.KwonEunbi.api.exhibition.domain.ExhbnDTO;
import org.KwonEunbi.api.exhibition.repository.ExhbnRepository;

import lombok.RequiredArgsConstructor;

import java.util.*;
import java.util.stream.Collectors;

import org.KwonEunbi.api.hall.domain.Hall;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class ExhbnServiceImpl extends AbstractService<Exhbn> implements ExhbnService {
	private final ExhbnRepository repo;
	
	@Override public long save(Exhbn e) { return (repo.save(e) != null) ? 1 : 0;}
	@Override public long delete(Exhbn e) { repo.delete(e); return(getOne(e.getExhbnNum()) == null) ? 1 : 0;}
	@Override public long count() { return repo.count();}
	@Override public Exhbn getOne(long id) { return repo.getOne(id);}
	@Override public Optional<Exhbn> findById(long id) { return repo.findById(id);}
	@Override public boolean existsById(long id) { return repo.existsById(id);}
	@Override public List<Exhbn> findAll() {
		return repo.findAll().stream().sorted(Comparator.comparing(Exhbn::getExhbnNum)
				.reversed()).collect(Collectors.toList());}
    @Override public long update(String exhbnTitle, String startDate, String endDate, String exhbnGenre, String exhbnPrice,
    		String exhbnArtist, String exhbnContent, String exhbnImage, String hallLocation, long exhbnNum) { 
		return repo.update(exhbnTitle, startDate, endDate, exhbnGenre, exhbnPrice, 
								exhbnArtist, exhbnContent, exhbnImage, hallLocation, exhbnNum);}
    public List<Exhbn> searchTitle(String exhbnTitle){ return repo.searchTitle(exhbnTitle);}
    public List<Exhbn> sortList(){ return repo.sortList();}
	public List<ExhbnDTO> topList(){
		return repo.findAll().stream().map(i -> new ExhbnDTO(i)).limit(100).collect(Collectors.toList());
	}
	public List<Exhbn> nowInExhbn(){ return repo.nowInExhbn();}
	public List<Exhbn> finExhbn(){ return repo.finExhbn();}
	public List<Exhbn> findByHall(long id){
		return repo.findByHall(id).stream().sorted(Comparator.comparing(Exhbn::getStartDate)
				.reversed()).collect(Collectors.toList());
	}
	public List<ExhbnDTO> findByHallNum(long id){
		return repo.findByHall(id).stream().map(i -> new ExhbnDTO(i)).collect(Collectors.toList());
	}
	public List<Exhbn> findAllInfo(){ return repo.findAllInfo();}
	public List<Long> findHallNum(){ return repo.findHallNum();}
}