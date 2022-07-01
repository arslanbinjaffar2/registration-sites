import React, { useEffect, useRef } from 'react'

const Variation2 = ({ banner }) => {

  let data = banner ? banner[0] : [];

  const _parallax = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      typeWriter();
    }, 5000);
    window.addEventListener("scroll", scollEffect);
    return () => {
      window.removeEventListener("scroll", scollEffect);
    }

  }, [])

  function scollEffect() {
    const scrolled = window.pageYOffset;
    const itemOffset = _parallax.current.offsetTop;
    const itemHeight = _parallax.current.getBoundingClientRect();
    if (scrolled < (itemOffset - window.innerHeight) || scrolled > (itemOffset + itemHeight.height)) return false;
    const _scroll = (scrolled - itemOffset) + itemHeight.height;
      _parallax.current.style.backgroundPosition = `50%  -${(_scroll * 0.1)}px`;
  };

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

  const WrapperLayout = (props) => {

    if (props.data && Number(props.data.video_type) === 1) {
      return (
        <div
          data-fixed="false"
          ref={_parallax}
          style={{
            backgroundImage: `url(${process.env.NEXT_APP_EVENTCENTER_URL + props.data.image
              })`,
          }}
          className="edgtf-parallax-section-holder edgtf-parallax-section-banner full-height-banners parallax-backgroud ebs-transparent-box ebs-bg-holder"
        >
        {props.data.url ? <a href={props.data.url} target="_blank">
              {props.children}
            </a >: props.children}
        </div>
      );
    } else {
      return (
          <div
            data-fixed="false"
            ref={_parallax}
            className="edgtf-parallax-section-holder edgtf-parallax-section-banner full-height-banners parallax-backgroud ebs-transparent-box ebs-bg-holder"
          >
            
            {props.data.url ? <a href={props.data.url} target="_blank">
              {props.children}
            </a >: props.children}
          </div>
      );
    }

  }

  return (
    <React.Fragment>
      <WrapperLayout
        data={data}
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
                {data.info.message && <div
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
                  <span style={{ animation: 'blink .7s infinite' }} className="typed-cursor">_</span>
                </div>}
                {/* <div
                    className="edgtf-custom-font-holder ebs-banner-subtitle"
                    style={{
                      marginTop: "15px",
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
      </WrapperLayout>
    </React.Fragment>
  )
}

export default Variation2
