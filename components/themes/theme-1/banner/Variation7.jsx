import SliderCustom from "./components/SliderCustom";
import React from "react";

const data = {
  banner: [
    {
      layerHTML:
        '<div data-class="._dynamicLayer73247" class="draggable _dynamicLayer73247 ebs-text-layer tablet-is-v-centered mobile-is-v-centered" style="cursor: grab;"><span class="material-icons  fs-1 me-2">\nfavorite\n</span>Text layer</div><div data-href="" data-class="._dynamicLayer49432" class="draggable _dynamicLayer49432 ebs-layer-has-link ebs-button-layer mobile-is-h-centered tablet-is-v-centered mobile-is-v-centered active" style="cursor: grab;">REGISTER NOW <span class="material-icons">\narrow_forward\n</span></div><div data-class="._dynamicLayer87346" class="draggable _dynamicLayer87346 ebs-text-layer mobile-hidden tablet-is-h-centered tablet-is-v-centered" style="cursor: grab;">Go to the menus page, and open the “Screen <br>Options” from the top-right of the page, and <br>enable the “link target” option.</div>',
      background_image: {
        src: "url(http://localhost:8200/assets/eventsite_banners/temp/1725357662_Goldfinger_app_2540x700-2048x564.png)",
        link: "",
        size: "cover",
        color: "",
        position: "50% 50%",
      },
    },
    {
      layerHTML:
        '<div data-class="._dynamicLayer72312" class="draggable _dynamicLayer72312 ebs-text-layer tablet-is-v-centered mobile-is-v-centered" style="cursor: grab;">Text layer</div><div data-href="" data-class="._dynamicLayer10482" class="draggable _dynamicLayer10482 ebs-layer-has-link ebs-button-layer tablet-is-v-centered mobile-is-v-centered active" style="cursor: grab;">REGISTER NOW</div><div data-class="._dynamicLayer75887" class="draggable _dynamicLayer75887 ebs-text-layer tablet-is-v-centered mobile-hidden" style="cursor: grab;">Go to the menus page, and open the “Screen <br>Options” from the top-right of the page, and <br>enable the “link target” option.</div>',
      background_image: {
        src: "url(http://localhost:8200/assets/eventsite_banners/temp/1725357662_Goldfinger_app_2540x700-2048x564.png)",
        link: "",
        size: "cover",
        color: "#000000",
        position: "50% 50%",
      },
    },
  ],
  settings: {
    bannerType: "default",
    sliderWidth: "1280",
    sliderHeight: "500",
    sliderSettings: {
      dots: "true",
      speed: "500",
      arrows: "true",
    },
  },
  pageSTyles:
    "._dynamicLayer10482 { top: 55.5276%; left: 18.2837%; font-size: 14px; padding-top: 12px; border-width: 1px; padding-left: 25px; padding-right: 25px; padding-bottom: 12px; border-top-width: 1px; border-left-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-end-end-radius: 3px; border-end-start-radius: 3px; border-start-end-radius: 3px; border-start-start-radius: 3px; } ._dynamicLayer49432 { top: 55.5276%; left: 18.2837%; font-size: 14px; padding-top: 12px; border-width: 1px; padding-left: 25px; padding-right: 25px; padding-bottom: 12px; border-top-width: 1px; border-left-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-end-end-radius: 3px; border-end-start-radius: 3px; border-start-end-radius: 3px; border-start-start-radius: 3px; } ._dynamicLayer72312 { top: 24.7791%; left: 18.2837%; color: rgb(255, 255, 255); font-size: 60px; font-weight: bold; line-height: 60px; text-transform: uppercase; } ._dynamicLayer73247 { top: 24.7791%; left: 18.2837%; color: rgb(255, 255, 255); font-size: 60px; font-weight: bold; line-height: 60px; text-transform: uppercase; } ._dynamicLayer75887 { top: 40.6135%; left: 18.2837%; color: rgb(255, 255, 255); font-size: 12px; line-height: 15px; } ._dynamicLayer87346 { top: 40.6135%; left: 18.2837%; color: rgb(255, 255, 255); font-size: 12px; line-height: 15px; } @container  sidebar (max-width: 1024px) { ._dynamicLayer10482 { top: 60.52499389648438%; left: 42.63671860098839%; } ._dynamicLayer49432 { top: 64.75833129882812%; left: 41.171061247587204%; font-family: default; } ._dynamicLayer72312 { top: 20.024993896484375%; left: 33.37809145450592%; } ._dynamicLayer73247 { top: 19.754165649414062%; left: 32.03938901424408%; font-family: Arial; } ._dynamicLayer75887 { top: 40.75%; left: 33.58398377895355%; font-size: 18px; text-align: center; line-height: 18px; } ._dynamicLayer87346 { top: 40.625%; left: 30.410969257354736%; font-size: 20px; text-align: center; font-family: Arial; line-height: 25px; }  } @container  sidebar (max-width: 600px) { ._dynamicLayer10482 { top: 62.857142857142854%; left: 33.565278371175125%; font-size: 20px; background-color: #000000; } ._dynamicLayer49432 { top: 42.857142857142854%; left: 31.18333307902018%; font-family: default; font-size: 20px; } ._dynamicLayer72312 { top: 35.14285714285714%; left: 19.772221883138023%; font-size: 60px; } ._dynamicLayer73247 { top: 21.204764229910715%; left: 15.34722391764323%; font-size: 60px; line-height: 40px; } ._dynamicLayer75887 { top: 84.57142857142857%; left: 0.6972211201985701%; } ._dynamicLayer87346 { top: 68.00113745956688%; left: 0%; }  } ",
  cssProperties: {
    mobile: {
      "._dynamicLayer10482": {
        top: "62.857142857142854%",
        left: "33.565278371175125%",
        "font-size": "20px",
        "background-color": "#000000",
      },
      "._dynamicLayer49432": {
        top: "42.857142857142854%",
        left: "31.18333307902018%",
        "font-family": "default",
        "font-size": "20px",
      },
      "._dynamicLayer72312": {
        top: "35.14285714285714%",
        left: "19.772221883138023%",
        "font-size": "60px",
      },
      "._dynamicLayer73247": {
        top: "21.204764229910715%",
        left: "15.34722391764323%",
        "font-size": "60px",
        "line-height": "40px",
      },
      "._dynamicLayer75887": {
        top: "84.57142857142857%",
        left: "0.6972211201985701%",
      },
      "._dynamicLayer87346": {
        top: "68.00113745956688%",
        left: "0%",
      },
    },
    tablet: {
      "._dynamicLayer10482": {
        top: "60.52499389648438%",
        left: "42.63671860098839%",
      },
      "._dynamicLayer49432": {
        top: "64.75833129882812%",
        left: "41.171061247587204%",
        "font-family": "default",
      },
      "._dynamicLayer72312": {
        top: "20.024993896484375%",
        left: "33.37809145450592%",
      },
      "._dynamicLayer73247": {
        top: "19.754165649414062%",
        left: "32.03938901424408%",
        "font-family": "Arial",
      },
      "._dynamicLayer75887": {
        top: "40.75%",
        left: "33.58398377895355%",
        "font-size": "18px",
        "text-align": "center",
        "line-height": "18px",
      },
      "._dynamicLayer87346": {
        top: "40.625%",
        left: "30.410969257354736%",
        "font-size": "20px",
        "text-align": "center",
        "font-family": "Arial",
        "line-height": "25px",
      },
    },
    desktop: {
      "._dynamicLayer10482": {
        top: "55.5276%",
        left: "18.2837%",
        "font-size": "14px",
        "padding-top": "12px",
        "border-width": "1px",
        "padding-left": "25px",
        "padding-right": "25px",
        "padding-bottom": "12px",
        "border-top-width": "1px",
        "border-left-width": "1px",
        "border-right-width": "1px",
        "border-bottom-width": "1px",
        "border-end-end-radius": "3px",
        "border-end-start-radius": "3px",
        "border-start-end-radius": "3px",
        "border-start-start-radius": "3px",
      },
      "._dynamicLayer49432": {
        top: "55.5276%",
        left: "18.2837%",
        "font-size": "14px",
        "padding-top": "12px",
        "border-width": "1px",
        "padding-left": "25px",
        "padding-right": "25px",
        "padding-bottom": "12px",
        "border-top-width": "1px",
        "border-left-width": "1px",
        "border-right-width": "1px",
        "border-bottom-width": "1px",
        "border-end-end-radius": "3px",
        "border-end-start-radius": "3px",
        "border-start-end-radius": "3px",
        "border-start-start-radius": "3px",
      },
      "._dynamicLayer72312": {
        top: "24.7791%",
        left: "18.2837%",
        color: "rgb(255, 255, 255)",
        "font-size": "60px",
        "font-weight": "bold",
        "line-height": "60px",
        "text-transform": "uppercase",
      },
      "._dynamicLayer73247": {
        top: "24.7791%",
        left: "18.2837%",
        color: "rgb(255, 255, 255)",
        "font-size": "60px",
        "font-weight": "bold",
        "line-height": "60px",
        "text-transform": "uppercase",
      },
      "._dynamicLayer75887": {
        top: "40.6135%",
        left: "18.2837%",
        color: "rgb(255, 255, 255)",
        "font-size": "12px",
        "line-height": "15px",
      },
      "._dynamicLayer87346": {
        top: "40.6135%",
        left: "18.2837%",
        color: "rgb(255, 255, 255)",
        "font-size": "12px",
        "line-height": "15px",
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
          if (property === 'font-family' || property === 'left' || property === 'top' || property === 'color' || property === 'background-color' ||  property === 'text-align' || property === 'font-weight' || property === 'text-transform') {
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
            if (property === 'font-family' || property === 'left' || property === 'top' || property === 'color' || property === 'background-color' ||  property === 'text-align' || property === 'font-weight' || property === 'text-transform') {
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
