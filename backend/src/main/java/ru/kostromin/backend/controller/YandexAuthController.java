package ru.kostromin.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import ru.kostromin.backend.entity.User;
import ru.kostromin.backend.service.AuthService;
import ru.kostromin.backend.utils.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/yandex")
public class YandexAuthController {

    private final AuthService authService;
    @Value("${yandex.client.id}")
    private String clientId;

    @Value("${yandex.client.secret}")
    private String clientSecret;

    @Value("${yandex.redirect.uri}")
    private String redirectUri;

    @Autowired
    private JwtUtil jwtUtil;

    public YandexAuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/login")
    public ResponseEntity<Void> yandexLogin() {
        String authUrl = "https://oauth.yandex.ru/authorize" +
                "?response_type=code" +
                "&client_id=" + clientId +
                "&redirect_uri=" + redirectUri;

        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, authUrl)
                .build();
    }

    @GetMapping("/callback")
    public ResponseEntity<Map<String, String>> yandexCallback(@RequestParam String code) {
        try {
            String tokenUrl = "https://oauth.yandex.ru/token";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            String requestBody = "grant_type=authorization_code" +
                    "&code=" + code +
                    "&client_id=" + clientId +
                    "&client_secret=" + clientSecret;

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                String accessToken = (String) response.getBody().get("access_token");

                // Получение данных пользователя
                String userInfoUrl = "https://login.yandex.ru/info";
                HttpHeaders userInfoHeaders = new HttpHeaders();
                userInfoHeaders.set("Authorization", "OAuth " + accessToken);

                HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);
                ResponseEntity<Map> userInfoResponse = restTemplate.exchange(
                        userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);

                if (userInfoResponse.getStatusCode() == HttpStatus.OK && userInfoResponse.getBody() != null) {
                    String yandexId = userInfoResponse.getBody().get("id").toString();
                    String email = userInfoResponse.getBody().get("default_email").toString();
                    String username = userInfoResponse.getBody().get("login").toString();

                    User user = authService.saveYandexUser(yandexId, email, username);

                    // Генерация JWT
                    String jwt = jwtUtil.generateToken(user.getUsername());

                    // Возвращаем JWT и данные пользователя
                    Map<String, String> responseData = new HashMap<>();
                    responseData.put("token", jwt);
                    responseData.put("username", user.getUsername());
                    responseData.put("email", user.getEmail());

                    return ResponseEntity.ok(responseData);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
