import React, {useEffect} from 'react'

const Variation2 = ({ banner }) => {
  let data = banner ? banner[0] : [];
  useEffect(() => {

    window.addEventListener("scroll", function (e) {
      var scrolled = window.pageYOffset;
      const background = document.querySelector(".parallax-backgroud");
      if (background) {
        const text = document.querySelector(".parallax-text");
        background.style.backgroundPosition = `50%  ${-(scrolled * 0.2)}px`;
        text.style.top = `${scrolled * 0.3}px`;
      }
    });
    typeWriter();
  }, [])

  const typeWriter = () => {
    function write(obj, sentence, i, cb) {
      if (i !== sentence.length) {
        setTimeout(function () {
          i++;
          obj.innerHTML =
            sentence.substr(0, i + 1) + ' <em aria-hidden="true"></em>';
          write(obj, sentence, i, cb);
        }, 200);
      } else {
        cb();
      }
    }
    function erase(obj, cb, i) {
      var sentence = obj.innerText;
      if (sentence.length !== 0) {
        setTimeout(function () {
          sentence = sentence.substr(0, sentence.length - 1);
          obj.innerText = sentence;
          erase(obj, cb);
        }, 160);
      } else {
        obj.innerText = " ";
        cb();
      }
    }
    var typeline = document.querySelector("#typewriter");

    function writeerase(obj, sentence, time, cb) {
      write(obj, sentence, 0, function () {
        setTimeout(function () {
          erase(obj, cb);
        }, time);
      });
    }

    // var sentences = ["Parties", "Lectures"];
    var sentences = (data && data.info) ? data.info.message.split(" ") : [];

    var counter = 0;
    function loop() {
      var sentence = sentences[counter % sentences.length];
      writeerase(typeline, sentence, 1500, loop);
      counter++;
    }

    loop();
  };
  return (
    <React.Fragment>
        <div
        data-fixed="true"
          style={{
            backgroundImage: `url(${
              data && Number(data.video_type) === 1
                ? process.env.REACT_APP_EVENTCENTER_URL + data.image
                : require("img/h1-parallax1.jpg")
            })`,
          }}
          className="edgtf-parallax-section-holder edgtf-parallax-section-banner full-height-banners parallax-backgroud"
        >
          <div className="container">
            <div className="row d-flex">
              <div
                style={{ height: "100vh", padding: "5% 15px" }}
                className="col-12 align-items-center d-flex"
              >
                <div style={{ position: "relative", width: '100%' }} className="parallax-text">
                  <div
                    className="edgtf-custom-font-holder ebs-banner-title"
                    style={{
                      fontFamily: "Rubik",
                      fontSize: "127px",
                      lineHeight: "127px",
                      fontWeight: "500",
                      letterSpacing: "1.3px",
                      textTransform: "uppercase",
                      textAlign: "left",
                      color: "#ec008c",
                    }}
                  >
                    <span style={{ color: "#fff" }}>
                      {" "}
                      {data && data.info
                        ? data.info.title
                        : "Event Banner"}
                    </span>
                  </div>
                  <div
                    className="edgtf-custom-font-holder ebs-banner-title"
                    style={{
                      fontFamily: "Rubik",
                      fontSize: "127px",
                      lineHeight: "127px",
                      fontWeight: "500",
                      letterSpacing: "1.3px",
                      textTransform: "uppercase",
                      textAlign: "left",
                      color: "#fff",
                      minHeight: 151
                    }}
                  >
                    <div id="typewriter"></div>
                    <span style={{animation: 'blink .7s infinite'}} className="typed-cursor">_</span>
                  </div>
                  {/* <div
                    className="edgtf-custom-font-holder ebs-banner-subtitle"
                    style={{
                      marginTop: "15px",
                      fontFamily: "Open Sans",
                      fontSize: "26px",
                      lineHeight: "37px",
                      fontWeight: "400",
                      letterSpacing: "0px",
                      textAlign: "left",
                      color: "#ffffff",
                    }}
                  >
                    {data && data.info ? data.info.message : ""}
                  </div> */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
  )
}

export default Variation2
