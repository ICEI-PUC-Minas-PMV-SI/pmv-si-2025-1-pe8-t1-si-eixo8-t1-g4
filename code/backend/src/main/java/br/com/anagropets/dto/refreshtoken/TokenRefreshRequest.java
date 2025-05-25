package br.com.anagropets.dto.refreshtoken;

public class TokenRefreshRequest {
    private String refreshToken;
    public String getRefreshToken() { return refreshToken; }
    
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
}
