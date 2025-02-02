import * as React from 'react';

const Theme = ({data}) => {
  function hexToRGBA(hex) {
    return  '' + (hex = hex?.replace('#', '').replace(' ', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }) + ''
}
console.log(data.settings.background_color)
  const _stylesheet = `
  :root {
    --primaryrgb: ${data.settings.primary_color ? hexToRGBA(data.settings.primary_color) : hexToRGBA('#0f58fb')};
    --primary: ${data.settings.primary_color ? data.settings.primary_color : '#000'};
    --secondaryrgb: ${data.settings.secondary_color ? hexToRGBA(data.settings.secondary_color) : hexToRGBA('#ec008c')};
    --secondary: ${data.settings.secondary_color ? data.settings.secondary_color : '#ec008c'};
    --background: ${data.settings.background_color ? data.settings.background_color : '#fff'};
  }
  
  `;


  return (
  <style dangerouslySetInnerHTML={{__html: _stylesheet}} />
  );
}
export default Theme;
