CREATE TABLE produkt
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    produktid INTEGER NOT NULL,
    navn VARCHAR(255) NOT NULL,
    beskrivelse VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE inbound
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    quantity INTEGER NOT NULL,
    produktid INTEGER NOT NULL,
    purchaseorderid INTEGER NOT NULL,
    purchaseorderlineid INTEGER NOT NULL,
    PRIMARY KEY (id)
);