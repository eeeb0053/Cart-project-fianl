package org.KwonEunbi.api.analysis.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

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
}
