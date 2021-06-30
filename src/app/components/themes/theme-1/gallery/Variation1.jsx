import * as React from 'react';
class Variation1 extends React.Component {

    render() {
        const photos = this.props.photos;
        return (
            <div className="edgtf-image-gallery">
                <div className="edgtf-image-gallery-grid edgtf-gallery-columns-4 ">
                    {
                        photos.map((photo, i) => {

                            return (<div className="edgtf-gallery-image" key={i} >
                                <span href="" title="home-2-gallery-img-1">
                                    <img src={photo.image && photo.image !== '' ? process.env.REACT_APP_EVENTCENTER_URL + '/assets/photos/' + photo.image : "https://xpo.qodeinteractive.com/wp-content/uploads/2016/12/home-2-gallery-img-1-480x400.jpg"} alt="g" width="480" height="400" /></span>
                            </div>)
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Variation1;
