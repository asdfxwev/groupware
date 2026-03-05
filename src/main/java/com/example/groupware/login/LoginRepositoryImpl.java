package com.example.groupware.login;

import com.example.groupware.login.entity.QUser;
import com.example.groupware.login.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class LoginRepositoryImpl implements LoginRepository {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;
    private final QUser user = QUser.user;

    @Override
    public Optional<User> findByUserId(String userId) {
        return Optional.ofNullable(
                queryFactory
                        .selectFrom(user)
                        .where(user.userId.eq(userId))
                        .fetchOne()
        );
    }

    @Override
    public boolean existsByUserId(String userId) {
        Integer result = queryFactory
                .selectOne()
                .from(user)
                .where(user.userId.eq(userId))
                .fetchFirst();
        return result != null;
    }

    @Override
    public User save(User user) {
        em.persist(user);
        return user;
    }
}
