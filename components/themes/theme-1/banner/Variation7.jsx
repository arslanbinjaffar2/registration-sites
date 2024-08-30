import SliderBanner from "./components/SliderBanner";
import React from "react";

const data = {
  settings: {
    sliderWidth: "800",
    sliderHeight: "800",
    sliderSettings: {
      speed: 500,
      dots: true,
      arrows: true,
    },
    bannerType: "default",
  },
  banner: [
    {
      background_image: {
        src: "",
        position: "",
        size: "",
        color: "#80ffff",
        link: "",
      },
      layerHTML:
        '<div data-class="._dynamicLayer94615" class="draggable _dynamicLayer94615 ebs-text-layer mobile-is-v-centered active" style="cursor: grab;">This is Slide one</div><div data-href="" data-class="._dynamicLayer16588" class="draggable _dynamicLayer16588 ebs-layer-has-link ebs-button-layer desktop-is-h-centered mobile-is-v-centered" style="cursor: grab;">Button</div>',
    },
    {
      background_image: {
        src: "",
        position: "",
        size: "",
        color: "#ff80c0",
        link: "",
      },
      layerHTML:
        '<div data-class="._dynamicLayer53115" class="draggable _dynamicLayer53115 ebs-text-layer mobile-is-v-centered" style="cursor: grab;">This is Slide one</div><div data-href="" data-class="._dynamicLayer23050" class="draggable _dynamicLayer23050 ebs-layer-has-link ebs-button-layer desktop-is-h-centered mobile-is-v-centered" style="cursor: grab;">Button</div>',
    },
    {
      background_image: {
        src: "",
        position: "",
        size: "",
        color: "#ffff00",
        link: "",
      },
      layerHTML:
        '<div data-class="._dynamicLayer56001" class="draggable _dynamicLayer56001 ebs-text-layer mobile-is-v-centered tablet-is-v-centered" style="cursor: grab;">This is Slide one</div><div data-href="" data-class="._dynamicLayer27083" class="draggable _dynamicLayer27083 ebs-layer-has-link ebs-button-layer desktop-is-h-centered mobile-is-v-centered tablet-is-v-centered" style="cursor: grab;">Button</div>',
    },
    {
      background_image: {
        src: "",
        position: "",
        size: "",
        color: "#ffff00",
        link: "",
      },
      layerHTML:
        '<div data-class="._dynamicLayer96002" class="draggable _dynamicLayer96002 ebs-text-layer mobile-is-v-centered tablet-is-v-centered" style="cursor: grab;">This is Slide one</div><div data-href="" data-class="._dynamicLayer29739" class="draggable _dynamicLayer29739 ebs-layer-has-link ebs-button-layer desktop-is-h-centered mobile-is-v-centered tablet-is-v-centered" style="cursor: grab;">Button</div>',
    },
    {
      background_image: {
        src: "",
        position: "",
        size: "",
        color: "#ffff00",
        link: "",
      },
      layerHTML:
        '<div data-class="._dynamicLayer90667" class="draggable _dynamicLayer90667 ebs-text-layer mobile-is-v-centered tablet-is-v-centered" style="cursor: grab;">This is Slide one</div><div data-href="" data-class="._dynamicLayer90303" class="draggable _dynamicLayer90303 ebs-layer-has-link ebs-button-layer desktop-is-h-centered mobile-is-v-centered tablet-is-v-centered" style="cursor: grab;">Button</div>',
    },
  ],
  pageSTyles:
    "._dynamicLayer94615 { left: 9.0625%; top: 36.942130194769966%; font-weight: bold; font-size: 60px; line-height: 50px; } ._dynamicLayer16588 { left: 9.0625%; top: 45.55555555555556%; background-color: #000000; } ._dynamicLayer53115 { left: 9.0625%; top: 36.942130194769966%; font-weight: bold; font-size: 60px; line-height: 50px; } ._dynamicLayer23050 { left: 9.0625%; top: 45.55555555555556%; background-color: #000000; } ._dynamicLayer56001 { left: 9.0625%; top: 33.88888888888889%; font-weight: bold; font-size: 60px; line-height: 50px; } ._dynamicLayer27083 { left: 9.0625%; top: 45.55555555555556%; background-color: #000000; } ._dynamicLayer96002 { left: 9.0625%; top: 33.88888888888889%; font-weight: bold; font-size: 60px; line-height: 50px; } ._dynamicLayer29739 { left: 9.0625%; top: 45.55555555555556%; background-color: #000000; } ._dynamicLayer90667 { left: 9.0625%; top: 33.88888888888889%; font-weight: bold; font-size: 60px; line-height: 50px; } ._dynamicLayer90303 { left: 9.0625%; top: 45.55555555555556%; background-color: #000000; } @container  sidebar (max-width: 900px) { ._dynamicLayer94615 { left: 9.50555419921875%; top: 33.18847053433642%; } ._dynamicLayer53115 { left: 9.50555419921875%; top: 33.18847053433642%; } ._dynamicLayer56001 { left: 25.80833265516493%; top: 31.120991271219133%; } ._dynamicLayer27083 { left: 42.425926208496094%; top: 47.13415678047839%; } ._dynamicLayer96002 { left: 25.80833265516493%; top: 31.120991271219133%; } ._dynamicLayer29739 { left: 42.425926208496094%; top: 47.13415678047839%; } ._dynamicLayer90667 { left: 25.80833265516493%; top: 31.120991271219133%; } ._dynamicLayer90303 { left: 42.425926208496094%; top: 47.13415678047839%; }  } @container  sidebar (max-width: 600px) { ._dynamicLayer16588 { left: 38.63888931274414%; top: 79.62962962962963%; } ._dynamicLayer94615 { left: 29.440277099609375%; top: 61.03703703703703%; font-size: 34px; } ._dynamicLayer53115 { left: 29.440277099609375%; top: 61.03703703703703%; font-size: 34px; } ._dynamicLayer23050 { left: 38.63888931274414%; top: 79.62962962962963%; } ._dynamicLayer56001 { left: 29.440278371175133%; top: 29.259259259259256%; font-size: 34px; } ._dynamicLayer27083 { left: 38.63888804117839%; top: 50.59259259259259%; } ._dynamicLayer96002 { left: 29.440278371175133%; top: 29.259259259259256%; font-size: 34px; } ._dynamicLayer29739 { left: 38.63888804117839%; top: 50.59259259259259%; } ._dynamicLayer90667 { left: 29.440278371175133%; top: 29.259259259259256%; font-size: 34px; } ._dynamicLayer90303 { left: 38.63888804117839%; top: 50.59259259259259%; }  } ",
};

const Variation7 = ({ banner, event, countdown, regisrationUrl, settings, registerDateEnd }) => {
  const [newSliderHeight, setNewSliderHeight] = React.useState(720);
  React.useEffect(() => {

    if (window.innerWidth >= 991) {
      const elem = document.getElementById("ebs-header-master");
      if (elem && elem.nextSibling.dataset) {
        elem.classList.remove("ebs-light-header");
        var _nextSibling = elem.nextSibling.dataset.fixed;
        if (_nextSibling === 'true') {
          elem.classList.add('ebs-fixed-header');
        } else {
          elem.classList.add('ebs-light-header');
        }
      }
    }
    let styleSheet = document.getElementById("dynamic-styles");

    // If it doesn't exist, create it
    if (!styleSheet) {
      styleSheet = document.createElement("style");
      styleSheet.id = "dynamic-styles";
      document.head.appendChild(styleSheet);
    }

    // Now you can add CSS rules to this stylesheet
    styleSheet.innerHTML = data.pageSTyles.replace(/@container  sidebar/g, "@media");
    // Step 1: Calculate the aspect ratio
const aspectRatio = data.settings.sliderWidth / data.settings.sliderHeight;

// Step 2: Calculate the new slider height based on window width
    const windowWidth = window.innerWidth;
    const newSliderWidth = windowWidth;
    const SliderHeight = newSliderWidth / aspectRatio;
    console.log(SliderHeight,'here');
    setNewSliderHeight(SliderHeight);
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth;
      const newSliderWidth = windowWidth;
      const SliderHeight = newSliderWidth / aspectRatio;
      setNewSliderHeight(SliderHeight);
    });
      
  }, [])
  

  return (
    <>
      <div data-fixed="true" className="main-slider-wrapper ebs-master-super-banner ebs-full-width-banner">
        <SliderBanner
          countdown={null} //{dateTime}
          registerDateEnd={registerDateEnd} //{dateTime}
          eventsiteSettings={event.eventsiteSettings}
			  >
				{data && data.banner.map((slides, i) =>
					<div style={{height: newSliderHeight ? `${newSliderHeight}px`: '720px',minHeight: 400}} key={i} className="slide-wrapper">
            <div  dangerouslySetInnerHTML={{__html: slides.layerHTML}}  style={{height: newSliderHeight ? `${newSliderHeight}px`: '720px',minHeight: 400,position: 'relative', backgroundImage: `url(${slides.src})`, backgroundPosition: slides.background_image.position, backgroundSize: slides.background_image.size, backgroundColor: slides.background_image.color}}>
            </div>
					</div>
				)}
			</SliderBanner>
      </div>
    </>
  );
};

export default Variation7;
