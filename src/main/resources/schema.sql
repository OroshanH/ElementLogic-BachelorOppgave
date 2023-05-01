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
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE stock
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    quantity INTEGER NOT NULL,
    quantityOut INTEGER NOT NULL,
    produktid INTEGER NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE outbound
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    quantity INTEGER NOT NULL,
    produktid INTEGER NOT NULL,
    extpicklistid VARCHAR(255) NOT NULL,
    extorderid VARCHAR(255) NOT NULL,
    extorderlineid INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE constant
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    z INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE inboundMock
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    quantity INTEGER NOT NULL,
    produktid INTEGER NOT NULL,
    purchaseorderid INTEGER NOT NULL,
    purchaseorderlineid INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE outboundmock
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    quantity INTEGER NOT NULL,
    produktid INTEGER NOT NULL,
    purchaseorderid INTEGER NOT NULL,
    purchaseorderlineid INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);