package oslomet.emanager.produkt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class ProduktPost {

    @PostMapping("/produktPost")
    public ResponseEntity<String> produktPost(@RequestBody String payload) throws IOException {
        String url = "https://webhook.site/6e5425a6-f29d-495e-9fed-4d4fce5a6557";
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

        if (statusCode >= 200 && statusCode < 300) {
            String response = "Message sent successfully!";
            conn.disconnect();
            return ResponseEntity.ok(response);
        } else {
            String response = "Message delivery failed. Error code: " + statusCode;
            conn.disconnect();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}



