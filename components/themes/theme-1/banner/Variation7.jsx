import SliderCustom from "./components/SliderCustom";
import React from "react";




const Variation7 =  ({ banner, event, countdown, regisrationUrl, settings, registerDateEnd }) => {
  const [newSliderHeight, setNewSliderHeight] = React.useState(720);
  const [data, setData] = React.useState(null);

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



      
  }, [])
    React.useEffect(() => {
      if (event.event_site_banner_management) {
        setData(JSON.parse(event.event_site_banner_management.data));
      }
    }, [event]);
    React.useEffect(() => {
            if (data) {
                      // Now you can add CSS rules to this stylesheet
          const extendedCssProperties = extendCssProperties(data.cssProperties);

          data.cssProperties = extendedCssProperties;
          // Step 1: Calculate the aspect ratio
          const aspectRatio = Number(data.settings.sliderWidth) / Number(data.settings.sliderHeight);

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
    }
      if (data) {
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
     const aspectRatio = Number(data.settings.sliderWidth) / Number(data.settings.sliderHeight);
     const windowWidth = window.innerWidth;
     const _tablet = 1024;
     const _mobile = 600;
     const _width_ratio = windowWidth / Number(data.settings.sliderWidth);
     const newSliderWidth = windowWidth;
     const SliderHeight = newSliderWidth / aspectRatio;
     const _height_ratio = SliderHeight / Number(data.settings.sliderHeight);
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
          } else if (property == 'width' || property == 'height') {
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
            if (property === 'border-style' || property === 'font-family' || property === 'left' || property === 'color' || property === 'background-color' ||  property === 'text-align' || property === 'font-weight' || property === 'text-transform') {
            selectorRules += `${property}: ${(cssProperties[device][selector][property])}; `;
          } else if (property === 'top') {
            if (device === 'tablet') {
              selectorRules += `${property}: ${cssProperties[device][selector][property]}; `;
            } else if (device === 'mobile') {
               selectorRules += `${property}: ${cssProperties[device][selector][property]}; `;
            }
           
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
  
function replaceDivWithATag(html) {
  // Create a temporary DOM element
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html.replace(/style="cursor: grab;"/g, "");

  // Select all divs with the class 'ebs-layer-has-link'
  const divsToReplace = tempElement.querySelectorAll('div.ebs-layer-has-link');

  divsToReplace.forEach((div) => {
    // Create a new 'a' element
    const a = document.createElement('a');

    // Copy all attributes from the div to the a element
    for (const attr of div.attributes) {
      if (attr.name === 'data-href') {
        if (attr.value === 'REGISTER_NOW') {
          a.setAttribute("href", regisrationUrl); // Replace data-href with href

        } else {
          a.setAttribute("href", attr.value); // Replace data-href with href
        }
      } else {
        a.setAttribute(attr.name, attr.value);
      }
    }
    // Copy the inner HTML content
    a.innerHTML = div.innerHTML;
    var hasLink =  a.getAttribute('href');
    // Replace the div with the a element
    if (hasLink) {
      div.parentNode.replaceChild(a, div);
    }
  });

  // Return the modified HTML
  return tempElement.innerHTML;
}
  return (
    <>
      {data && <div data-fixed="true" style={{lineHeight: 0}} className="main-slider-wrapper ebs-master-super-banner ebs-full-width-banner">
        <SliderCustom
          countdown={null} //{dateTime}
          registerDateEnd={registerDateEnd} //{dateTime}
          eventsiteSettings={event.eventsiteSettings}
          sliderSettings={data.settings.sliderSettings}
			  >
				{data && data.banner.map((slides, i) =>
					<div style={{fontSize: 16,height: newSliderHeight ? `${newSliderHeight}px`: '720px'}} key={i} className="slide-wrapper">
            <div  dangerouslySetInnerHTML={{__html: replaceDivWithATag(slides.layerHTML)}}  style={{height: newSliderHeight ? `${newSliderHeight}px`: '720px',minHeight: 270,position: 'relative', backgroundImage: `${slides.background_image.src}`, backgroundPosition: slides.background_image.position, backgroundSize: slides.background_image.size, backgroundColor: slides.background_image.color}}>
            </div>
					</div>
				)}
			</SliderCustom>
      </div>}
    </>
  );
};

export default Variation7;
