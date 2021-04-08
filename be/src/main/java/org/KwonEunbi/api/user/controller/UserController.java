package org.KwonEunbi.api.user.controller;

import lombok.RequiredArgsConstructor;
import org.KwonEunbi.api.user.domain.UserDTO;
import org.KwonEunbi.api.user.domain.UserResponseDTO;
import org.KwonEunbi.api.user.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import org.KwonEunbi.api.user.domain.UserVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Api(tags = "users")
public class UserController {
	private final UserService userService;
	private final ModelMapper modelMapper;

	@GetMapping("")
	public ResponseEntity<List<UserVO>> all(){
		System.out.println("all: ");
		return ResponseEntity.ok(userService.all());
	}
	@GetMapping("/{id}")
	public ResponseEntity<Optional<UserVO>> one(@PathVariable long id){
		System.out.println("Item One Id: "+id);
		return ResponseEntity.ok(userService.one(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> edit(@PathVariable long id, @RequestBody UserVO user){
		System.out.println("edit: "+user.toString());
		return ResponseEntity.ok(userService.edit(user));
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable long id){
		return ResponseEntity.ok(userService.delete(id));
	}

	@PostMapping("/signin")
	@ApiOperation(value = "${UserController.signin}")
	@ApiResponses(value = { //
			@ApiResponse(code = 400, message = "Something went wrong"),
			@ApiResponse(code = 422, message = "Invalid username/password supplied") })
	public ResponseEntity<Map<String, Object>> login(@RequestBody UserDTO user) {
		return ResponseEntity.ok(userService.signin(user.getUsername(), user.getPassword()));
	}

	@PostMapping("/signup")
	@ApiOperation(value = "${UserController.signup}")
	@ApiResponses(value = { //
			@ApiResponse(code = 400, message = "Something went wrong"),
			@ApiResponse(code = 403, message = "Access denied"),
			@ApiResponse(code = 422, message = "Username is already in use") })
	public String signup(@ApiParam("Signup User") @RequestBody UserDTO user) {
		return userService.signup(modelMapper.map(user, UserVO.class));
	}

	@DeleteMapping(value = "/{username}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@ApiOperation(value = "${UserController.delete}", authorizations = { @Authorization(value = "apiKey") })
	@ApiResponses(value = { //
			@ApiResponse(code = 400, message = "Something went wrong"),
			@ApiResponse(code = 403, message = "Access denied"), //
			@ApiResponse(code = 404, message = "The user doesn't exist"),
			@ApiResponse(code = 500, message = "Expired or invalid JWT token") })
	public String delete(@ApiParam("Username") @PathVariable String username) {
		userService.delete(username);
		return username;
	}

	@GetMapping(value = "/{username}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@ApiOperation(value = "${UserController.search}", response = UserResponseDTO.class, authorizations = {
			@Authorization(value = "apiKey") })
	@ApiResponses(value = { //
			@ApiResponse(code = 400, message = "Something went wrong"),
			@ApiResponse(code = 403, message = "Access denied"),
			@ApiResponse(code = 404, message = "The user doesn't exist"),
			@ApiResponse(code = 500, message = "Expired or invalid JWT token") })
	public UserResponseDTO search(@ApiParam("Username") @PathVariable String username) {
		return modelMapper.map(userService.search(username), UserResponseDTO.class);
	}

	@GetMapping(value = "/me")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
	@ApiOperation(value = "${UserController.me}", response = UserResponseDTO.class, authorizations = {
			@Authorization(value = "apiKey") })
	@ApiResponses(value = {
			@ApiResponse(code = 400, message = "Something went wrong"),
			@ApiResponse(code = 403, message = "Access denied"),
			@ApiResponse(code = 500, message = "Expired or invalid JWT token") })
	public UserResponseDTO whoami(HttpServletRequest req) {
		return modelMapper.map(userService.whoami(req), UserResponseDTO.class);
	}

	@GetMapping("/refresh")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	public String refresh(HttpServletRequest req) {
		return userService.refresh(req.getRemoteUser());
	}
}
