package oslomet.emanager.outbound;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.io.StringReader;

@RestController
public class OutboundGet {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/CPendpoint")
    public ResponseEntity<String> handlePostRequest(@RequestBody String xmlPayload) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            InputSource is = new InputSource(new StringReader(xmlPayload));
            Document doc = builder.parse(is);

            NodeList orderlineNodes = doc.getElementsByTagName("OrderLine");

            for (int i = 0; i < orderlineNodes.getLength(); i++) {
                Element orderlineElement = (Element) orderlineNodes.item(i);
                String pickedQuantity = orderlineElement.getElementsByTagName("PickedQuantity").item(0).getTextContent();
                String extOrderId = orderlineElement.getElementsByTagName("ExtOrderId").item(0).getTextContent();
                Element productElement = (Element) orderlineElement.getElementsByTagName("Product").item(0);
                if (productElement != null) {
                    String productNo = productElement.getElementsByTagName("ProductNo").item(0).getTextContent();
                    int quantity = Integer.parseInt(pickedQuantity);
                    String outboundStatus = "Finished";

                    String sql = "UPDATE Stock SET quantity = quantity - ? WHERE produktid = ?";
                    int rowsAffected = jdbcTemplate.update(sql, quantity, productNo);

                    String quantityOut = "UPDATE Stock SET quantityOut = quantityOut - ? WHERE produktid = ?";
                    int rowsAffectedQ = jdbcTemplate.update(quantityOut, quantity, productNo);

                    String outBoundsql = "UPDATE OutboundMock SET quantity = quantity - ? WHERE produktid = ?";
                    int rowsAffectedsql = jdbcTemplate.update(outBoundsql, quantity, productNo);

                    String outboundSql = "UPDATE Outbound SET Status = ? WHERE produktid = ? AND extorderid = ?";
                    int rowsAffectedOutbound = jdbcTemplate.update(outboundSql, outboundStatus, productNo, extOrderId);

                    String deleteSql = "DELETE FROM OutboundMock WHERE quantity = 0";
                    int rowsDeleted = jdbcTemplate.update(deleteSql);

                }
            }

            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }




}




