package oslomet.emanager.produkt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;
import java.net.HttpURLConnection;

import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class ProduktPost {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/produktPost")
    public ResponseEntity<String> produktPost(@RequestBody String payload) throws IOException {
        String url = "https://webhook.site/7a2bfb20-36d9-4deb-9f64-29c40409df7e";
        String username = "APIUSER";
        String password = "1994";

        String encodedAuth = Base64.getEncoder().encodeToString((username + ":" + password).getBytes(StandardCharsets.UTF_8));

        URL urlObj = new URL(url);
        HttpURLConnection conn = (HttpURLConnection) urlObj.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Basic " + encodedAuth);
        conn.setRequestProperty("Content-Type", "application/xml");

        conn.setDoOutput(true);
        conn.getOutputStream().write(payload.getBytes(StandardCharsets.UTF_8));

        int statusCode = conn.getResponseCode();

        String response = "";
        if (statusCode >= 200 && statusCode < 300) {
             response = "Produkt sendt til eManager";
            conn.disconnect();
            return ResponseEntity.ok(response);
        } else {
             response = "Sending av produkt feilet. Error kode: " + statusCode;
            conn.disconnect();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }


    }

}




