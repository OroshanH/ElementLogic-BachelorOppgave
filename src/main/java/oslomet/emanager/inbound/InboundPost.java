package oslomet.emanager.inbound;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class InboundPost {

    @PostMapping("/inboundPost")
    public ResponseEntity<String> produktPost(@RequestBody String payload) throws IOException {
        String url = "http://193.69.50.119/api/goodsreceivals/import";
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
            String response = "Antall av produkter sendt til eManager";
            conn.disconnect();
            return ResponseEntity.ok(response);
        } else {
            String response = "Sending av antall produkter feilet. Error kode: " + statusCode;
            conn.disconnect();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
