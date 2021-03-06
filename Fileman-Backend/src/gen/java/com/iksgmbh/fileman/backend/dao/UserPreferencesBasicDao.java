package com.iksgmbh.fileman.backend.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.iksgmbh.fileman.backend.*;

import javax.persistence.*;
import javax.persistence.criteria.*;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Component
/**
 * Implementation of basic dao functionalities.
 * This file is autogenerated by MOGLiCC. Do not modify manually!
 */
@Repository
@Transactional
public class UserPreferencesBasicDao
{
	@PersistenceContext
	protected EntityManager entityManager;

	public List<UserPreferences> findAllUserPreferencess() {
		CriteriaQuery<UserPreferences> criteria = entityManager.getCriteriaBuilder().createQuery(UserPreferences.class);
		criteria.select(criteria.from(UserPreferences.class));
		return entityManager.createQuery(criteria).getResultList();
	}

	public UserPreferences findByUserId(Integer userId) {
		return entityManager.find(UserPreferences.class, userId);
	}

	public boolean update(UserPreferences entity) {
		try {
			entityManager.merge(entity);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public UserPreferences create(UserPreferences entity) {
		entityManager.persist(entity);
		return entity;
	}

	public void delete(UserPreferences entity) {
		entityManager.remove(entity);
	}
}