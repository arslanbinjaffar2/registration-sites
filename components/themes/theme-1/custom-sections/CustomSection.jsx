import React from "react";
import { connect } from "react-redux";
import Image from 'next/image'
import { useRouter } from "next/router";

const CustomSection = ({ data }) => {
  const iframe = React.useRef();
  const [height, setHeight] = React.useState(0);
  const [Loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])
  const handleResize = () => {
        window.resizedFinished = setTimeout(() => {
          const obj = iframe.current;
          setHeight(obj.contentWindow.document.body.scrollHeight);
        }, 100);
  }
  const router = useRouter();
  const [iframeHeight, setIframeHeight] = React.useState(window.innerHeight);
  const _iframe_embded = data?.includes('data-embed="_self"');
  const matches = data?.match(/https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
    React.useEffect(() => {
      if (_iframe_embded) {
        const listener = (event) =>{
            if(event.data.order_id !== undefined) {
                router.push(matches[0].replace('"',''));
            } 
            if(event.data.contentHeight !== undefined){
              setIframeHeight(event.data.contentHeight);
              setLoading(false)
          }
        }
        window.addEventListener("message", listener);
        return () => {
          window.removeEventListener('message', listener);
        }
      }
  }, []);
  return (
    <React.Fragment>
      {/* dangerouslySetInnerHTML={{__html:data}} */}
      {data && <div className="ebs-default-padding clearfix">
        {Loading && 
        <div className="d-flex justify-content-center"> 
          <div style={{width: '6rem', height: '6rem'}} className="spinner-border"> <span className="sr-only">Loading...</span></div>
        </div>}

        {_iframe_embded && <iframe
            ref={iframe}
            width="100%"
            height={iframeHeight}
            title="test"
            loading="lazy"
            itemProp="description"
            style={{minHeight: '450px'}}
            src={matches[0].replace('"','')}
          />}
        {!_iframe_embded && <iframe
            ref={iframe}
            onLoad={() => {
              const obj = iframe.current;
              obj.contentWindow.document.body.style.fontFamily = '"Open Sans", sans-serif';
              obj.contentWindow.document.body.style.margin = '0';
              setTimeout(() => {
                setHeight(obj.contentWindow?.document?.body.scrollHeight);
                setLoading(false)
              }, 1000);
            }}
            width="100%"
            height={height+20}
            title="test"
            loading="lazy"
            itemProp="description"
            srcDoc={`<style>*{padding: 0; margin: 0;}</style>`+data}
          />}
      </div>}
    </React.Fragment>
  )
};

function mapStateToProps(state) {
  const { event } = state;
  return {
    event,
  };
}

export default connect(mapStateToProps)(CustomSection);
