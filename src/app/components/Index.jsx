import * as React from 'react';
import Slider from '@/modules/Slider';
import Program from '@/modules/Program';
import Speaker from '@/modules/Speaker';
import Banner from '@/modules/Banner';
import Gallery from '@/modules/Gallery';
import Sponsor from '@/modules/Sponsor';
import Timetable from '@/modules/Timetable';
import Video from '@/modules/Video';

class Index extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Banner />
                <Slider />
                <Program />
                <Speaker />
                <Gallery />
                <Sponsor />
                <Timetable />
                <Video />
            </React.Fragment>
        );
    }
}

export default Index;
