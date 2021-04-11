package org.KwonEunbi.api.analysis.controller;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.KwonEunbi.api.exhibition.domain.ExhbnHallDTO;
import org.KwonEunbi.api.user.domain.UserVO;
import org.KwonEunbi.api.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.KwonEunbi.api.analysis.domain.Analysis;
import org.KwonEunbi.api.analysis.service.AnalysisServiceImpl;
import org.KwonEunbi.api.common.controller.AbstractController;

@RestController @RequiredArgsConstructor @CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/analyses")
public class AnalysisController extends AbstractController<Analysis>{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	final AnalysisServiceImpl service;
	final UserRepository userRepo;

	@PostMapping("")
	public ResponseEntity<Long> save(@RequestBody Analysis t) {
		return ResponseEntity.ok(service.save(t));
	}
	@DeleteMapping("")
	public ResponseEntity<Long> delete(@RequestBody Analysis t) {
		return ResponseEntity.ok(service.delete(t));
	}
	@GetMapping("/count")
	public ResponseEntity<Long> count() {
		return ResponseEntity.ok(service.count());
	}
	@GetMapping("")
	public ResponseEntity<List<Analysis>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}
	@GetMapping("/one/{id}")
	public ResponseEntity<Analysis> getOne(@PathVariable long id) {
		return ResponseEntity.ok(service.getOne(id));
	}
	@GetMapping("/find/{id}")
	public ResponseEntity<Optional<Analysis>> findById(@PathVariable long id) {
		return ResponseEntity.ok(service.findById(id));
	}
	@GetMapping("/exists/{id}")
	public ResponseEntity<Boolean> existsById(@PathVariable long id) {
		return ResponseEntity.ok(service.existsById(id));
	}

	@GetMapping("/{id}")
	public ResponseEntity<List<ExhbnHallDTO>> listByGenre(@PathVariable long id) {
		return ResponseEntity.ok(service.listByGenre(id));
	}
	@GetMapping("/gender")
		public Map<?, ?> analGender(){
			Map<String, Integer> map = new HashMap<>();
		List<UserVO> user = userRepo.findAll();
		int femaleCount = 0;
		int maleCount = 0;
		for(int i = 0; i < user.size(); i++ ) {
			if(user.get(i).getGender().equals("F")){
				femaleCount = femaleCount + 1;
			}else if(user.get(i).getGender().equals("M")){
				maleCount = maleCount + 1;
			}
		}
		map.put("female", femaleCount);
		map.put("male", maleCount);
		return map;
	}
	@GetMapping("/preferGenre")
	public Map<?, ?> analGenre(){
		Map<String, Integer> map = new HashMap<>();
		List<UserVO> user = userRepo.findAll();
		int mediaCount = 0;
		int craftCount = 0;
		int sculptureCount = 0;
		int paintingCount = 0;
		int installCount = 0;
		for(int i = 0; i < user.size(); i++ ) {
			if(user.get(i).getPreferGenre().equals("미디어")){
				mediaCount = mediaCount + 1;
			}else if(user.get(i).getPreferGenre().equals("설치")){
				installCount = installCount + 1;
			}else if(user.get(i).getPreferGenre().equals("회화")){
				paintingCount = paintingCount + 1;
			}else if(user.get(i).getPreferGenre().equals("공예")){
				craftCount = craftCount + 1;
			}else if(user.get(i).getPreferGenre().equals("조각")){
				sculptureCount = sculptureCount + 1;
			}
		}
		map.put("media", mediaCount);
		map.put("craft", craftCount);
		map.put("installation", installCount);
		map.put("painting", paintingCount);
		map.put("sculpture", sculptureCount);
		return map;
	}
}
