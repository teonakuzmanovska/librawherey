package com.example.librawherey1.repository;

import com.example.librawherey1.model.Schools;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolsRepository extends JpaRepository<Schools, Long> {
}
