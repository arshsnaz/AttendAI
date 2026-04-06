package com.attendai.security;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.JwtBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.util.Date;
import javax.crypto.SecretKey;

@Component
public class JwtUtils {


    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration.ms}")
    private int jwtExpirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }


    public String generateJwtToken(UserDetails userDetails) {
        JwtBuilder builder = Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.forName("HS512"));
        return builder.compact();
    }

    public String getUserNameFromJwtToken(String token) {
        JwtParser parser = Jwts.parser().verifyWith(getSigningKey()).build();
        return parser.parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            JwtParser parser = Jwts.parser().verifyWith(getSigningKey()).build();
            parser.parseSignedClaims(authToken);
            return true;
        } catch (io.jsonwebtoken.JwtException e) {
            return false;
        }
    }
}