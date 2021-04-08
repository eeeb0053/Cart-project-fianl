package org.KwonEunbi.api.exhibition.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.querydsl.core.Tuple;
import org.KwonEunbi.api.common.controller.AbstractController;
import org.KwonEunbi.api.exhibition.domain.Exhbn;
import org.KwonEunbi.api.exhibition.domain.ExhbnDTO;
import org.KwonEunbi.api.exhibition.service.ExhbnServiceImpl;
import org.KwonEunbi.api.hall.domain.Hall;

import lombok.RequiredArgsConstructor;
import org.KwonEunbi.api.hall.domain.HallDTO;
import org.KwonEunbi.api.hall.service.HallServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController 
@RequiredArgsConstructor 
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/exhbns")
public class ExhbnController extends AbstractController<Exhbn> {
	final ExhbnServiceImpl service;
	final HallServiceImpl hallService;
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@PostMapping("")
	public ResponseEntity<Long> save(@RequestBody Exhbn t) {
		return ResponseEntity.ok(service.save(t));
	}
	
	@PutMapping("/{exhbnNum}")
	public ResponseEntity<Long> update(@RequestBody Exhbn t, @PathVariable long exhbnNum) {
		logger.info("수정 정보: "+t.toString());
		Exhbn e = service.getOne(exhbnNum);
		if(!(t.getExhbnTitle().equals(e.getExhbnTitle()) || t.getExhbnTitle().equals(""))) {
			e.setExhbnTitle(t.getExhbnTitle());
		}
		if(!(t.getStartDate().equals(e.getStartDate()) || t.getStartDate().equals(""))) {
			e.setStartDate(t.getStartDate());
		}
		if(!(t.getEndDate().equals(e.getEndDate()) || t.getEndDate().equals(""))) {
			e.setEndDate(t.getEndDate());
		}
		if(!(t.getExhbnGenre().equals(e.getExhbnGenre()) || t.getExhbnGenre().equals(""))) {
			e.setExhbnGenre(t.getExhbnGenre());
		}
		if(!(t.getExhbnPrice().equals(e.getExhbnPrice()) || t.getExhbnPrice().equals(""))) {
			e.setExhbnPrice(t.getExhbnPrice());
		}
		if(!(t.getExhbnArtist().equals(e.getExhbnArtist()) || t.getExhbnArtist().equals(""))) {
			e.setExhbnArtist(t.getExhbnArtist());
		}
		if(!(t.getExhbnContent().equals(e.getExhbnContent()) || t.getExhbnContent().equals(""))) {
			e.setExhbnContent(t.getExhbnContent());
		}
		if(!(t.getExhbnImage().equals(e.getExhbnImage()) || t.getExhbnImage().equals(""))) {
			e.setExhbnImage(t.getExhbnImage());
		}
		return ResponseEntity.ok(service.save(e));
	}

	@DeleteMapping("")
	public ResponseEntity<Long> delete(@RequestBody Exhbn t) {
		return ResponseEntity.ok(service.delete(t));
	}

	@GetMapping("/count")
	public ResponseEntity<Long> count() {
		return ResponseEntity.ok(service.count());
	}

	@GetMapping("/one/{id}")
	public ResponseEntity<Exhbn> getOne(@PathVariable long id) {
		return ResponseEntity.ok(service.getOne(id));
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<Optional<Exhbn>> findById(@PathVariable long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@GetMapping("/exists/{id}")
	public ResponseEntity<Boolean> existsById(@PathVariable long id) {
		return ResponseEntity.ok(service.existsById(id));
	}

	@GetMapping("")
	public ResponseEntity<List<Exhbn>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("/search/{exhbnTitle}")
	public ResponseEntity<List<Exhbn>> searchTitle(@PathVariable String exhbnTitle){
		return ResponseEntity.ok(service.searchTitle(exhbnTitle));
	}

	@GetMapping("/all")
	public ResponseEntity<List<Exhbn>> sortList(){
		return ResponseEntity.ok(service.sortList());
	}

	@GetMapping("/topList")
	public ResponseEntity<List<ExhbnDTO>> topList(){
		return ResponseEntity.ok(service.topList());
	}

	@GetMapping("/now")
	public ResponseEntity<List<Exhbn>> nowInExhbn(){
		return ResponseEntity.ok(service.nowInExhbn());
	}

	@GetMapping("/fin")
	public ResponseEntity<List<Exhbn>> finExhbn(){
		return ResponseEntity.ok(service.finExhbn());
	}

	@GetMapping("/hall/{id}")
	public ResponseEntity<List<Exhbn>> findByHall(@PathVariable  long id) {
		return ResponseEntity.ok(service.findByHall(id));
	}
	@GetMapping("/allInfo")
	public ResponseEntity<List<Map<?,?>>> findAllInfo() {
		Map<?, ?> map = new HashMap<>();
		List<Long> hallNumList = service.findHallNum();
		for(int i = 1; i <= hallNumList.size() ; i++){
			// map(hallService.getOne(i).getHallName());
		}
		return null;
	}
}