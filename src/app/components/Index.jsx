import * as React from 'react';
// import Slider from '@/modules/Slider';
import Program from '@/modules/Program';
import Speaker from '@/modules/Speaker';
import Banner from '@/modules/Banner';
import Gallery from '@/modules/Gallery';
import Sponsor from '@/modules/Sponsor';
import Timetable from '@/modules/Timetable';
import Video from '@/modules/Video';
import Exhibitor from '@/modules/Exhibitor';
import SocialShare from "@/themes/theme-1/social/SocialShare";
import CustomSection from "@/themes/theme-1/custom-sections/CustomSection";
import { connect } from 'react-redux';
import Map from './modules/Map';

class Index extends React.Component {

    render() {
        const { eventsiteSections } = this.props.event;

        return (
            <React.Fragment>
                <Banner />
                <CustomSection />
                <SocialShare />
                <Map/>
                {
                    this.props.event && eventsiteSections && eventsiteSections.map((section, i) => {
                        return (() => {
                            if (section.alias === 'social_section')
                                return (<div key={i}></div>)
                            else if (section.alias === 'event_title_info')
                                return (<div key={i}></div>)
                            else if (section.alias === 'custom_html2')
                                return (<div key={i}></div>)
                            else if (section.alias === 'custom_html1')
                                return (<div key={i}></div>)
                            else if (section.alias === 'event_info')
                                return (<div key={i}></div>)
                            else if (section.alias === 'agendas')
                                return (<Program key={i} />)
                            else if (section.alias === 'sponsors')
                                return (<Sponsor key={i} />)
                            // else if (section.alias === 'bottom_banner')
                            //   return ()
                            else if (section.alias === 'register_now')
                                return (<div key={i}></div>)
                            else if (section.alias === 'exhibitors')
                                return (<Exhibitor key={i} />)
                            else if (section.alias === 'speakers')
                                return (<Speaker key={i} />)
                            else if (section.alias === 'maps')
                                return (<div key={i}></div>)
                            else if (section.alias === 'videos')
                                return (<Video key={i} />)
                            else if (section.alias === 'photos')
                                return (<Gallery key={i} />)
                            else if (section.alias === 'streaming')
                                return (<div key={i}></div>)
                            else if (section.alias === 'waiting_list')
                                return (<div key={i}></div>)

                        })()
                    })
                }
                {/* <Banner />
                <Exhibitor />
                <Program />
                <Speaker />
                <Gallery />
                <Sponsor />
                <Timetable />
                <Video /> */}
                <Timetable />

            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { event } = state;
    return {
        event
    };
}

export default connect(mapStateToProps)(Index);
