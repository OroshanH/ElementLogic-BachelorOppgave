package oslomet.emanager.outbound;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
@RestController
public class OutboundPost {

    @PostMapping("/outboundPost")
    public ResponseEntity<String> produktPost(@RequestBody String payload) throws IOException {
        /*http://193.69.50.119/api/picklists/import*/
        String url = "http://193.69.50.119/api/picklists/import";
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
            String response = "Produkter hentet fra eManager";
            conn.disconnect();
            return ResponseEntity.ok(response);
        } else {
            String response = "Henting av produkter feilet. Error kode: " + statusCode;
            conn.disconnect();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/slettList")
    public ResponseEntity<String> slettList(@RequestBody String extpicklistid) throws IOException {
        String url = "http://193.69.50.119/api/picklists/" + extpicklistid;
        String username = "apiuser";
        String password = "1994";

        String encodedAuth = Base64.getEncoder().encodeToString((username + ":" + password).getBytes(StandardCharsets.UTF_8));

        URL urlObj = new URL(url);
        HttpURLConnection conn = (HttpURLConnection) urlObj.openConnection();

        conn.setRequestMethod("DELETE");
        conn.setRequestProperty("Authorization", "Basic " + encodedAuth);

        int statusCode = conn.getResponseCode();

        if (statusCode >= 200 && statusCode < 300) {
            String response = "Call succeeded";
            conn.disconnect();
            return ResponseEntity.ok(response);
        } else {
            String response = "Call failed. Error code: " + statusCode;
            conn.disconnect();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



}
