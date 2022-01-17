import * as React from 'react';

const Theme = ({data}) => {
  function hexToRGBA(hex) {
    return  '' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }) + ''
}
  const _stylesheet = `
  :root {
    --primary: ${data.settings.primary_color ? data.settings.primary_color : '#0f58fb'};
    --secondary: ${data.settings.secondary_color ? data.settings.secondary_color : '#ec008c'};
  }
  ::selection {
    background: var(--primary) !important;
    color: #fff;
}
a, p a {
  color: var(--primary);
}
a:hover ,p a:hover {
  color: var(--secondary);
}
  .edge-title-separator,
  #navbarSupportedContentFixed .nav-item .nav-link .ebs-nav-item::before {
    background: var(--primary) !important;
  }
  .ebs-main-header-v2 .navbar .nav-item > .dropdown-menu .nav-item:hover > .nav-link,
  .edgtf-tabs.edgtf-horizontal-tab .edgtf-tabs-nav li.ui-state-active a, .edgtf-tabs.edgtf-horizontal-tab .edgtf-tabs-nav li:hover a,
  .edgtf-tabs.edgtf-horizontal-tab .edgtf-tabs-nav li.ui-state-hover a,
  #navbarSupportedContentFixed .nav-item .nav-link:hover,
  #navbarSupportedContentFixed .nav-item .nav-link.active {
    color: var(--primary) !important;;
  }
  .ebs-main-header-v2 .navbar .nav-item > .dropdown-menu,
  #loader {
    border-top-color: var(--primary) !important;
  }
  #loader::before {
    border-top-color: var(--secondary) !important;
  }
  .edgtf-tabs.edgtf-horizontal-tab .edgtf-tabs-nav li.ui-state-active a,
  .edgtf-tabs.edgtf-horizontal-tab .edgtf-tabs-nav li:hover a, .edgtf-tabs.edgtf-horizontal-tab .edgtf-tabs-nav li.ui-state-hover a {
    border-bottom-color: var(--primary) !important;
  }
  .gallerMasonry figure::after {
    background: var(--secondary) !important;
  }
  .gallerMasonry figure figcaption {
    background: rgba(${hexToRGBA(data.settings.primary_color)},0.7) !important;
  }
  @media only screen and (min-width: 991px) {
    .ebs-main-header-v1.ebs-main-header-v2 .navbar .nav-item:hover > .nav-link,
    .ebs-main-header-v2 .navbar .nav-item:hover > .nav-link {
      background: var(--primary) !important;
      color: #fff !important;
    }
  }
  @media only screen and (max-width: 991px) {
    .ebs-main-header-v1.ebs-main-header-v2 #navbarSupportedContent .navbar-nav .nav-item .nav-link:hover {
      color: var(--primary) !important;
    }
  }
  `;


  return (
  <style dangerouslySetInnerHTML={{__html: _stylesheet}} />
  );
}
export default Theme;
