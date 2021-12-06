import React, { useState, useEffect } from "react";
import "./Quotescard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Quotescard() {
  const [text, setText] = useState(
    "The greatest glory in living lies not in never falling, but in rising every time we fall."
  );
  const [author, setAuthor] = useState("Nelson Mandela");
  const [index, setIndex] = useState(0);

  const getQuotes = () => {
    const url = "https://type.fit/api/quotes";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setText(data[index].text);
        setAuthor(data[index].author);
        setIndex(index + 1);
      });
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const copyText = () => {
    var copyText = document.getElementById("quote-text").innerText;
    navigator.clipboard.writeText(copyText);
    toast.success("Quote copied!", {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: false,
      draggable: false,
    });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="d-flex justify-content-center outer">
        <div className="card col-md-6" data-aos="flip-left" id="div-aos">
          <div className="d-flex justify-content-between card-header">
            <i className="fa fa-quote-left fa-2x fa-pull-left"></i>
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={copyText}
            >
              Copy
            </button>
          </div>
          <div className="card-body row">
            <blockquote className="blockquote mb-0">
              <p id="quote-text">{text}</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">{author ? author : "Unknown"}</cite>
              </footer>
            </blockquote>
          </div>
          <div>
            <div
              type="button"
              className="btn btn-lg"
              onClick={getQuotes}
              style={{
                width: "100%",
                backgroundColor: "#e62e1a",
                margin: "0px",
                color: "white",
                fontFamily: `'Abril Fatface', cursive`,
              }}
            >
              Next Quote
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Quotescard;
