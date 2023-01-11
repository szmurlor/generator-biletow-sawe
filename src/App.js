import React from "react";
import "./styles.css";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Image,
  Font
} from "@react-pdf/renderer";

function isEmpty(str) {
  return !str || str.length === 0;
}

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
}

function MyLink(props) {
  let t = props.ticket;
  Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf"
  });
  Font.register({
    family: "Roboto-Bold",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf"
  });

  console.log(t);

  let tytul = isEmpty(t.tytul) ? " " : t.tytul;
  let tytulStolik = isEmpty(t.tytulStolik) ? " " : t.tytulStolik;
  let imie = isEmpty(t.imie) ? " " : t.imie;
  let numer = isEmpty(t.numer) ? " " : t.numer;
  let ile = isEmpty(t.ile) ? " " : t.ile;
  let stolik = isEmpty(t.stolik) ? " " : t.stolik;
  let id = isEmpty(t.id) ? " " : t.id;

  let nr = id + "_" + pad(numer, 2);
  const MyDoc = () => {
    return (
      <Document>
        <Page>
          <Image src="tlo2.png" style={{ height: "99.9%" }} />
          <Text
            style={{
              fontFamily: "Roboto",
              position: "absolute",
              left: "30px",
              top: "370px"
            }}
            render={() => {
              return `${tytul}`;
            }}
          />
          <Text
            style={{
              fontFamily: "Roboto-Bold",
              fontWeight: "600",
              position: "absolute",
              left: "30px",
              top: "400px",
              width: "300px",
              fontSize: "20px"
            }}
            render={() => {
              return `${imie} [${numer} z ${ile}]`;
            }}
          />
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              position: "absolute",
              top: "480px",
              left: "30px"
            }}
            render={() => {
              return `${tytulStolik}`;
            }}
          />
          <Text
            style={{
              fontFamily: "Roboto-Bold",
              fontWeight: "bold",
              position: "absolute",
              top: "510px",
              left: "30px"
            }}
            render={() => {
              return `${stolik}`;
            }}
          />
          <Text
            style={{
              fontFamily: "Roboto",
              color: "red",
              position: "absolute",
              top: "800px",
              left: "20px"
            }}
            render={() => {
              return `#${nr} `;
            }}
          />
        </Page>
      </Document>
    );
  };
  var filename = imie.replace(/[^a-z0-9łóżźćńęą]/gi, "_").toLowerCase();
  let fname = `${filename}_${numer}.pdf`;
  return (
    <PDFDownloadLink document={<MyDoc />} fileName={fname}>
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Pobierz: " + fname
      }
    </PDFDownloadLink>
  );
}

export default function App() {
  let [ile, setIle] = React.useState(1);
  let [tytul, setTytul] = React.useState("Imię i nazwisko");
  let [imie, setImie] = React.useState("");
  let [tytulStolik, setTytulStolik] = React.useState("Stolik");
  let [stolik, setStolik] = React.useState("");
  let [tickets, setTickets] = React.useState([]);
  let [id, setId] = React.useState("");

  let gen = () => {
    setTickets(
      Array(parseInt(ile, 10))
        .fill(0)
        .map((_, idx) => {
          return {
            imie,
            ile,
            stolik,
            tytulStolik,
            tytul,
            id,
            numer: idx + 1
          };
        })
    );
  };
  return (
    <>
      <div className="App">
        <h1>Generator biletów</h1>
        <ul className="table">
          <li>
            <span>Etykieta imienia i nazwiska:</span>

            <span>
              <input
                type="text"
                value={tytul}
                onChange={(e) => {
                  setTytul(e.target.value);
                }}
              />
            </span>
          </li>
          <li>
            <span>Imię i nazwisko:</span>

            <span>
              <input
                type="text"
                value={imie}
                onChange={(e) => {
                  setImie(e.target.value);
                }}
              />
            </span>
          </li>
          <li>
            <span>Etykieta nad stolikiem:</span>

            <span>
              <input
                type="text"
                value={tytulStolik}
                onChange={(e) => {
                  setTytulStolik(e.target.value);
                }}
              />
            </span>
          </li>
          <li>
            <span>Stolik:</span>

            <span>
              <input
                type="text"
                value={stolik}
                onChange={(e) => {
                  setStolik(e.target.value);
                }}
              />
            </span>
          </li>
          <li>
            <span>Ile:</span>
            <span>
              <input
                type="text"
                value={ile}
                onChange={(e) => {
                  setIle(e.target.value);
                }}
              />
              <br />
            </span>
          </li>
          <li>
            <span>
              ID: <span style={{ display: "inline", color: "red" }}>*</span>
            </span>
            <span>
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
              <br />
            </span>
          </li>
        </ul>
      </div>
      <div>
        <button
          onClick={() => {
            gen();
          }}
        >
          Generuj
        </button>
      </div>
      {tickets.map((t) => {
        return (
          <div style={{ marginTop: "0.5em" }}>
            <MyLink ticket={t} />
          </div>
        );
      })}
    </>
  );
}
