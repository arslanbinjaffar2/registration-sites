import SliderCustom from "./components/SliderCustom";
import React from "react";

const data = {
  banner: [
    {
      layerHTML:
        '<div data-class="._dynamicLayer32871" class="draggable _dynamicLayer32871 ebs-text-layer tablet-is-v-centered mobile-is-v-centered" style="cursor: grab;">Alt hvad, der skal <br>\nbruges for, at forføre <br>\nog begejstre jeres <br>\ndeltagere, ét sted</div><div data-href="https://www.eventbuizz.com/create/" data-class="._dynamicLayer36843" class="draggable _dynamicLayer36843 ebs-layer-has-link ebs-button-layer" style="cursor: grab;">LÆS MERE</div><div data-href="https://www.eventbuizz.com/book-en-demo/" data-class="._dynamicLayer14117" class="draggable _dynamicLayer14117 ebs-layer-has-link ebs-button-layer" style="cursor: grab;">BOOK EN DEMO</div>',
      background_image: {
        src: "url(http://localhost:8200/assets/eventsite_banners/temp/1725374329_Goldfinger_app_2540x700-2048x564.png)",
        link: "",
        size: "cover",
        color: "",
        position: "50% 50%",
      },
    },
    {
      layerHTML:
        '<div data-class="._dynamicLayer47190" class="draggable _dynamicLayer47190 ebs-text-layer tablet-is-v-centered mobile-is-v-centered" style="cursor: grab;">Alt hvad, der skal <br>\nbruges for, at forføre <br>\nog begejstre jeres <br>\ndeltagere, ét sted</div><div data-href="https://www.eventbuizz.com/create/" data-class="._dynamicLayer67881" class="draggable _dynamicLayer67881 ebs-layer-has-link ebs-button-layer" style="cursor: grab;">LÆS MERE</div><div data-href="https://www.eventbuizz.com/book-en-demo/" data-class="._dynamicLayer89247" class="draggable _dynamicLayer89247 ebs-layer-has-link ebs-button-layer" style="cursor: grab;">BOOK EN DEMO</div>',
      background_image: {
        src: "url(http://localhost:8200/assets/eventsite_banners/temp/1725374329_Goldfinger_app_2540x700-2048x564.png)",
        link: "",
        size: "cover",
        color: "",
        position: "50% 50%",
      },
    },
  ],
  settings: {
    bannerType: "default",
    sliderWidth: "1280",
    sliderHeight: "550",
    sliderSettings: {
      dots: "true",
      speed: "500",
      arrows: "true",
    },
  },
  pageSTyles:
    "._dynamicLayer14117 { top: 59.7881%; left: 12.0782%; font-size: 12px; line-height: 12px; padding-top: 8px; border-width: 2px; padding-left: 16px; padding-right: 16px; padding-bottom: 8px; border-end-end-radius: 0px; border-end-start-radius: 0px; border-start-end-radius: 0px; border-start-start-radius: 0px; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; } ._dynamicLayer32871 { top: 26.0711%; left: 12.0782%; color: rgb(255, 255, 255); font-size: 24px; font-weight: bold; line-height: 28px; padding-top: 10px; border-style: solid; border-width: 2px; padding-left: 10px; padding-right: 10px; padding-bottom: 10px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; } ._dynamicLayer36843 { top: 52.4261%; left: 12.0782%; font-size: 12px; line-height: 12px; padding-top: 8px; border-width: 2px; padding-left: 16px; padding-right: 16px; padding-bottom: 8px; border-end-end-radius: 0px; border-end-start-radius: 0px; border-start-end-radius: 0px; border-start-start-radius: 0px; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; } ._dynamicLayer47190 { top: 26.0711%; left: 12.0782%; color: rgb(255, 255, 255); font-size: 24px; font-weight: bold; line-height: 28px; padding-top: 10px; border-style: solid; border-width: 2px; padding-left: 10px; padding-right: 10px; padding-bottom: 10px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; } ._dynamicLayer67881 { top: 52.4261%; left: 12.0782%; font-size: 12px; line-height: 12px; padding-top: 8px; border-width: 2px; padding-left: 16px; padding-right: 16px; padding-bottom: 8px; border-end-end-radius: 0px; border-end-start-radius: 0px; border-start-end-radius: 0px; border-start-start-radius: 0px; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; } ._dynamicLayer89247 { top: 59.7881%; left: 12.0782%; font-size: 12px; line-height: 12px; padding-top: 8px; border-width: 2px; padding-left: 16px; padding-right: 16px; padding-bottom: 8px; border-end-end-radius: 0px; border-end-start-radius: 0px; border-start-end-radius: 0px; border-start-start-radius: 0px; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; } @container  sidebar (max-width: 1024px) { ._dynamicLayer14117 { top: 64.24242886629972%; left: 33.334147930145264%; font-size: 18px; padding-top: 12px; padding-bottom: 12px; padding-left: 12px; padding-right: 12px; } ._dynamicLayer32871 { top: 13.000002774325283%; left: 28.297525644302368%; text-align: center; font-size: 40px; line-height: 45px; } ._dynamicLayer36843 { top: 64.24242886629972%; left: 50.35644769668579%; font-size: 18px; padding-top: 12px; padding-bottom: 12px; padding-left: 12px; padding-right: 12px; } ._dynamicLayer47190 { top: 13.000002774325283%; left: 28.297525644302368%; text-align: center; font-size: 40px; line-height: 45px; } ._dynamicLayer67881 { top: 64.24242886629972%; left: 50.35644769668579%; font-size: 18px; padding-top: 12px; padding-bottom: 12px; padding-left: 12px; padding-right: 12px; } ._dynamicLayer89247 { top: 64.24242886629972%; left: 33.334147930145264%; font-size: 18px; padding-top: 12px; padding-bottom: 12px; padding-left: 12px; padding-right: 12px; }  } @container  sidebar (max-width: 600px) { ._dynamicLayer14117 { top: 71.37142508370535%; left: 21.852783203125%; } ._dynamicLayer32871 { top: 9.157139369419642%; left: 12.961110432942707%; } ._dynamicLayer36843 { top: 71.37142508370535%; left: 51.5%; } ._dynamicLayer47190 { top: 9.157139369419642%; left: 12.961110432942707%; } ._dynamicLayer67881 { top: 71.37142508370535%; left: 51.5%; } ._dynamicLayer89247 { top: 71.37142508370535%; left: 21.852783203125%; }  } ",
  cssProperties: {
    mobile: {
      "._dynamicLayer14117": {
        top: "71.37142508370535%",
        left: "21.852783203125%",
      },
      "._dynamicLayer32871": {
        top: "9.157139369419642%",
        left: "12.961110432942707%",
      },
      "._dynamicLayer36843": {
        top: "71.37142508370535%",
        left: "51.5%",
      },
      "._dynamicLayer47190": {
        top: "9.157139369419642%",
        left: "12.961110432942707%",
      },
      "._dynamicLayer67881": {
        top: "71.37142508370535%",
        left: "51.5%",
      },
      "._dynamicLayer89247": {
        top: "71.37142508370535%",
        left: "21.852783203125%",
      },
    },
    tablet: {
      "._dynamicLayer14117": {
        top: "64.24242886629972%",
        left: "33.334147930145264%",
        "font-size": "18px",
        "padding-top": "12px",
        "padding-bottom": "12px",
        "padding-left": "12px",
        "padding-right": "12px",
      },
      "._dynamicLayer32871": {
        top: "13.000002774325283%",
        left: "28.297525644302368%",
        "text-align": "center",
        "font-size": "40px",
        "line-height": "45px",
      },
      "._dynamicLayer36843": {
        top: "64.24242886629972%",
        left: "50.35644769668579%",
        "font-size": "18px",
        "padding-top": "12px",
        "padding-bottom": "12px",
        "padding-left": "12px",
        "padding-right": "12px",
      },
      "._dynamicLayer47190": {
        top: "13.000002774325283%",
        left: "28.297525644302368%",
        "text-align": "center",
        "font-size": "40px",
        "line-height": "45px",
      },
      "._dynamicLayer67881": {
        top: "64.24242886629972%",
        left: "50.35644769668579%",
        "font-size": "18px",
        "padding-top": "12px",
        "padding-bottom": "12px",
        "padding-left": "12px",
        "padding-right": "12px",
      },
      "._dynamicLayer89247": {
        top: "64.24242886629972%",
        left: "33.334147930145264%",
        "font-size": "18px",
        "padding-top": "12px",
        "padding-bottom": "12px",
        "padding-left": "12px",
        "padding-right": "12px",
      },
    },
    desktop: {
      "._dynamicLayer14117": {
        top: "59.7881%",
        left: "12.0782%",
        "font-size": "12px",
        "line-height": "12px",
        "padding-top": "8px",
        "border-width": "2px",
        "padding-left": "16px",
        "padding-right": "16px",
        "padding-bottom": "8px",
        "border-end-end-radius": "0px",
        "border-end-start-radius": "0px",
        "border-start-end-radius": "0px",
        "border-start-start-radius": "0px",
        "border-top-width": "2px",
        "border-right-width": "2px",
        "border-bottom-width": "2px",
        "border-left-width": "2px",
      },
      "._dynamicLayer32871": {
        top: "26.0711%",
        left: "12.0782%",
        color: "rgb(255, 255, 255)",
        "font-size": "24px",
        "font-weight": "bold",
        "line-height": "28px",
        "padding-top": "10px",
        "border-style": "solid",
        "border-width": "2px",
        "padding-left": "10px",
        "padding-right": "10px",
        "padding-bottom": "10px",
        "border-top-style": "solid",
        "border-right-style": "solid",
        "border-bottom-style": "solid",
        "border-left-style": "solid",
        "border-top-width": "2px",
        "border-right-width": "2px",
        "border-bottom-width": "2px",
        "border-left-width": "2px",
      },
      "._dynamicLayer36843": {
        top: "52.4261%",
        left: "12.0782%",
        "font-size": "12px",
        "line-height": "12px",
        "padding-top": "8px",
        "border-width": "2px",
        "padding-left": "16px",
        "padding-right": "16px",
        "padding-bottom": "8px",
        "border-end-end-radius": "0px",
        "border-end-start-radius": "0px",
        "border-start-end-radius": "0px",
        "border-start-start-radius": "0px",
        "border-top-width": "2px",
        "border-right-width": "2px",
        "border-bottom-width": "2px",
        "border-left-width": "2px",
      },
      "._dynamicLayer47190": {
        top: "26.0711%",
        left: "12.0782%",
        color: "rgb(255, 255, 255)",
        "font-size": "24px",
        "font-weight": "bold",
        "line-height": "28px",
        "padding-top": "10px",
        "border-style": "solid",
        "border-width": "2px",
        "padding-left": "10px",
        "padding-right": "10px",
        "padding-bottom": "10px",
        "border-top-style": "solid",
        "border-right-style": "solid",
        "border-bottom-style": "solid",
        "border-left-style": "solid",
        "border-top-width": "2px",
        "border-right-width": "2px",
        "border-bottom-width": "2px",
        "border-left-width": "2px",
      },
      "._dynamicLayer67881": {
        top: "52.4261%",
        left: "12.0782%",
        "font-size": "12px",
        "line-height": "12px",
        "padding-top": "8px",
        "border-width": "2px",
        "padding-left": "16px",
        "padding-right": "16px",
        "padding-bottom": "8px",
        "border-end-end-radius": "0px",
        "border-end-start-radius": "0px",
        "border-start-end-radius": "0px",
        "border-start-start-radius": "0px",
        "border-top-width": "2px",
        "border-right-width": "2px",
        "border-bottom-width": "2px",
        "border-left-width": "2px",
      },
      "._dynamicLayer89247": {
        top: "59.7881%",
        left: "12.0782%",
        "font-size": "12px",
        "line-height": "12px",
        "padding-top": "8px",
        "border-width": "2px",
        "padding-left": "16px",
        "padding-right": "16px",
        "padding-bottom": "8px",
        "border-end-end-radius": "0px",
        "border-end-start-radius": "0px",
        "border-start-end-radius": "0px",
        "border-start-start-radius": "0px",
        "border-top-width": "2px",
        "border-right-width": "2px",
        "border-bottom-width": "2px",
        "border-left-width": "2px",
      },
    },
  },
};
const extendCssProperties = (cssProperties) => {
  const { desktop, tablet, mobile } = cssProperties;

  const extendedTablet = { ...tablet };
  const extendedMobile = { ...mobile };

  function extend(target, source) {
    for (const key in source) {
      if (!target[key]) {
        target[key] = { ...source[key] };
      } else {
        for (const prop in source[key]) {
          if (!target[key].hasOwnProperty(prop)) {
            target[key][prop] = source[key][prop];
          }
        }
      }
    }
  }

  // First, extend tablet with desktop properties
  extend(extendedTablet, desktop);

  // Then, extend mobile with the newly extended tablet properties
  extend(extendedMobile, extendedTablet);

  return { desktop, tablet: extendedTablet, mobile: extendedMobile };
};
const deviceWidths = {
  mobile: 600,
  tablet: 1024,
  desktop: 1280,
};
function getMediaQueryForDevice(device) {
  switch (device) {
    case "mobile":
      return `(max-width: ${deviceWidths.mobile}px)`;
    case "tablet":
      return `(max-width: ${deviceWidths.tablet}px)`;
    default:
      return "";
  }
}  
  const generateCSS = (cssProperties) => {
    // Create a style element
     const aspectRatio = data.settings.sliderWidth / data.settings.sliderHeight;
     const windowWidth = window.innerWidth;
     const _tablet = 1024;
     const _mobile = 600;
     const _width_ratio = windowWidth / data.settings.sliderWidth;
     const newSliderWidth = windowWidth;
     const SliderHeight = newSliderWidth / aspectRatio;
     const _height_ratio = SliderHeight / data.settings.sliderHeight;
     const _tablet_width_ratio = windowWidth / _tablet;
     const _mobile_width_ratio = windowWidth / _mobile;
    // Clear the current dynamic CSS from the generated-css 
    const generatedStylesheet = document.getElementById("dynamic-styles");
    generatedStylesheet.innerHTML = ""; // Clear existing styles

    let cssRules = ""; // Start fresh

    // Generate CSS for desktop without media query
    let desktopRules = "";
    Object.keys(cssProperties.desktop).forEach((selector) => {
      let selectorRules = `${selector} { `;
      Object.keys(cssProperties.desktop[selector]).forEach((property) => {
          if (property === 'border-style' || property === 'font-family' || property === 'left' || property === 'top' || property === 'color' || property === 'background-color' ||  property === 'text-align' || property === 'font-weight' || property === 'text-transform') {
            selectorRules += `${property}: ${cssProperties.desktop[selector][property]}; `;
          } else if (property === 'line-height') {
            selectorRules += `${property}: ${(cssProperties.desktop[selector][property].replace('px',''))*_width_ratio}px; `;
          } else {
            selectorRules += `${property}: ${(cssProperties.desktop[selector][property].replace('px',''))*_width_ratio}px; `;
          }
      });
      selectorRules += `} `;
      desktopRules += selectorRules;
    });
    cssRules += desktopRules;

    // Generate CSS for mobile and tablet with media queries
    Object.keys(cssProperties).forEach((device) => {
      if (device === "desktop") return; // Skip desktop as we already handled it
      const mediaQuery = getMediaQueryForDevice(device);
      let deviceRules = "";

      Object.keys(cssProperties[device]).forEach((selector) => {
        let selectorRules = `${selector} { `;
        Object.keys(cssProperties[device][selector]).forEach((property) => {
            if (property === 'border-style' || property === 'font-family' || property === 'left' || property === 'top' || property === 'color' || property === 'background-color' ||  property === 'text-align' || property === 'font-weight' || property === 'text-transform') {
            selectorRules += `${property}: ${(cssProperties[device][selector][property])}; `;
          } else {
            selectorRules += `${property}: ${(cssProperties[device][selector][property].replace('px','')*((device === 'tablet') ? _tablet_width_ratio : _mobile_width_ratio))}px; `;
          }
        });
        selectorRules += `} `;
        deviceRules += selectorRules;
      });

      cssRules += `@media ${mediaQuery} { ${deviceRules} } `;
    });

    // Append the generated CSS rules to the #generated-css stylesheet
    generatedStylesheet.innerHTML = cssRules;
   // Append the style element to the head of the document

    // Cleanup function to remove the style element on component unmount
    return () => {
      document.head.removeChild(generatedStylesheet);
    };
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


    // Now you can add CSS rules to this stylesheet
    const extendedCssProperties = extendCssProperties(data.cssProperties);

    data.cssProperties = extendedCssProperties;
    // Step 1: Calculate the aspect ratio
  const aspectRatio = data.settings.sliderWidth / data.settings.sliderHeight;

// Step 2: Calculate the new slider height based on window width
    const windowWidth = window.innerWidth;
    const newSliderWidth = windowWidth;
    const SliderHeight = newSliderWidth / aspectRatio;
  
    setNewSliderHeight(SliderHeight);

    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth;
      const newSliderWidth = windowWidth;
      const SliderHeight = newSliderWidth / aspectRatio;
      setNewSliderHeight(SliderHeight);
    });
      
  }, [])

    React.useEffect(() => {
      if (data && data.cssProperties) {
          const style = document.createElement("style");
          style.id = "dynamic-styles";
           document.head.appendChild(style);
        // Call the generateCSS function and keep track of the cleanup function
        const cleanup = generateCSS(data.cssProperties);
        window.addEventListener('resize', () => {
          const cleanup = generateCSS(data.cssProperties);
        });


        // Cleanup the generated CSS when the component unmounts or data changes
        return cleanup;
      }
    }, [data]);
  
function replaceDivWithATag(html) {
  // Create a temporary DOM element
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;

  // Select all divs with the class 'ebs-layer-has-link'
  const divsToReplace = tempElement.querySelectorAll('div.ebs-layer-has-link');

  divsToReplace.forEach((div) => {
    // Create a new 'a' element
    const a = document.createElement('a');

    // Copy all attributes from the div to the a element
    for (const attr of div.attributes) {
      if (attr.name === 'data-href') {
        a.setAttribute('href', attr.value); // Replace data-href with href
      } else {
        a.setAttribute(attr.name, attr.value);
      }
    }

    // Copy the inner HTML content
    a.innerHTML = div.innerHTML;

    // Replace the div with the a element
    div.parentNode.replaceChild(a, div);
  });

  // Return the modified HTML
  return tempElement.innerHTML;
}
  return (
    <>
      <div data-fixed="true" className="main-slider-wrapper ebs-master-super-banner ebs-full-width-banner">
        <SliderCustom
          countdown={null} //{dateTime}
          registerDateEnd={registerDateEnd} //{dateTime}
          eventsiteSettings={event.eventsiteSettings}
          sliderSettings={data.settings.sliderSettings}
			  >
				{data && data.banner.map((slides, i) =>
					<div style={{height: newSliderHeight ? `${newSliderHeight}px`: '720px'}} key={i} className="slide-wrapper">
            <div  dangerouslySetInnerHTML={{__html: replaceDivWithATag(slides.layerHTML)}}  style={{height: newSliderHeight ? `${newSliderHeight}px`: '720px',minHeight: 350,position: 'relative', backgroundImage: `${slides.background_image.src}`, backgroundPosition: slides.background_image.position, backgroundSize: slides.background_image.size, backgroundColor: slides.background_image.color}}>
            </div>
					</div>
				)}
			</SliderCustom>
      </div>
    </>
  );
};

export default Variation7;
