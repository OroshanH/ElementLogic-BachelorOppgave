package oslomet.emanager.inbound;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InboundGet {
    @PostMapping("/my-endpoint")
    public ResponseEntity<String> handlePostRequest(@RequestBody String requestBody) {
        // Handle the POST request here
        return ResponseEntity.ok("Request processed successfully!");
    }


}
