package br.com.anagropets.dto.login;

public class AuthResponse {
    private String token;
    private String refreshToken;

    public AuthResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }

    public String getToken() { return token; }
    public String getRefreshToken() { return refreshToken; }
}
