package com.iksgmbh.fileman.backend.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.User;
import com.iksgmbh.fileman.backend.dao.UserDao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserRestController
{
	@Autowired
	private UserDao userDao;

	@GetMapping("/users")
	public List<User> findAllUsers(@RequestHeader("Authorization") String authHeader) {
		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		return userDao.findAllUsers();
	}

    @GetMapping("/users/{id}")
    public User findUserById(@RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		User user = userDao.findById(id);
		if (user == null) {
			throw new ResourceNotFoundException("User '" + id +"' + not found.");
		}
		return user;
   }

	@PostMapping("/users")
	public Integer createUser(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody User user) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		return userDao.create(user).getId();
    }

	@PutMapping("/users")
	public void updateUser(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody User user) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		boolean ok = userDao.update(user);
		if (! ok) {
			throw new ResourceNotFoundException("User '" + user.getId() +"' + not found for update.");
		}
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		User user = userDao.findById(id);
		if (user == null) {
			throw new ResourceNotFoundException("User '" + id +"' + not found.");
		}
		userDao.delete(user);
		return ResponseEntity.ok().build();
	}
}