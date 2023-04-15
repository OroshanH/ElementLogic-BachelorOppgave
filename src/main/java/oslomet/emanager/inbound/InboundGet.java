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
import java.util.Map;

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
                String extProductId = ((Element) missionElement.getParentNode().getParentNode().getParentNode()).getElementsByTagName("ExtProductId").item(0).getTextContent();
                String purchaseOrderId = ((Element) missionElement.getParentNode().getParentNode().getParentNode().getParentNode().getParentNode()).getElementsByTagName("PurchaseOrderId").item(0).getTextContent();
                int quantity = (int) Double.parseDouble(actualQuantity);
                String sql = "INSERT INTO Stock (quantity, produktid) VALUES (?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)";
                int rowsAffected = jdbcTemplate.update(sql, quantity, extProductId);

                String sql2 = "SELECT purchaseorderid, purchaseorderlineid, status FROM InboundMock WHERE purchaseorderid = ?";
                Map<String, Object> inboundMock = jdbcTemplate.queryForMap(sql2, purchaseOrderId);
                int purchaseOrderLineId = (int) inboundMock.get("purchaseorderlineid");
                String status = (String) inboundMock.get("status");

                String inboundSql = "INSERT INTO Inbound (quantity, produktid, purchaseorderid, purchaseorderlineid, status) VALUES (?, ?, ?, ?, ?)";
                rowsAffected = jdbcTemplate.update(inboundSql, quantity, extProductId, purchaseOrderId, purchaseOrderLineId, status);



                String inboundStatusSql = "UPDATE Inbound SET status = 'Finished' WHERE produktid = ? AND purchaseorderid = ?";
                rowsAffected = jdbcTemplate.update(inboundStatusSql, extProductId, purchaseOrderId);

                String deleteSql = "DELETE FROM InboundMock WHERE produktid = ? AND purchaseorderid = ?";
                jdbcTemplate.update(deleteSql,extProductId, purchaseOrderId);


            }
            return ResponseEntity.ok("OK");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

}
