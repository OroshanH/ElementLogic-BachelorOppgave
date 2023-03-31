package oslomet.emanager.inbound;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;


@RestController
public class InboundGet {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/PGendpoint")
    public ResponseEntity<String> handlePostRequest(@RequestBody String xmlPayload) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            InputSource is = new InputSource(new StringReader(xmlPayload));
            Document doc = builder.parse(is);
            NodeList missionNodes = doc.getElementsByTagName("Mission");

            for (int i = 0; i < missionNodes.getLength(); i++) {
                Element missionElement = (Element) missionNodes.item(i);
                String actualQuantity = missionElement.getElementsByTagName("ActualQuantity").item(0).getTextContent();
                String extProductId = ((Element) missionElement.getParentNode().getParentNode()).getElementsByTagName("ExtProductId").item(0).getTextContent();
                int quantity = (int) Double.parseDouble(actualQuantity);
                String sql = "UPDATE Stock SET quantity = ? WHERE produktid = ?";
                int rowsAffected = jdbcTemplate.update(sql, quantity, extProductId);

            }
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
