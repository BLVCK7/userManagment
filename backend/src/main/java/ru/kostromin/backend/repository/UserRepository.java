package ru.kostromin.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kostromin.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByYandexId(String yandexId);
}