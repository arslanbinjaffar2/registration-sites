import * as React from 'react';
import Slider from '@/modules/Slider';
import Program from '@/modules/Program';
import Speaker from '@/modules/Speaker';
import Banner from '@/modules/Banner';
import Gallery from '@/modules/Gallery';
import Sponsor from '@/modules/Sponsor';
import Timetable from '@/modules/Timetable';
import Video from '@/modules/Video';
import Exhibitor from '@/modules/Exhibitor';
import { connect } from 'react-redux';

class Index extends React.Component {

    render() {
        const { eventsiteSections } = this.props.event;

        return (
            <React.Fragment>
                <Banner />
                {
                    this.props.event && eventsiteSections && eventsiteSections.map((section, i) => {
                        return (() => {
                            if (section.alias == 'social_section')
                                return (<div key={i}></div>)
                            else if (section.alias == 'event_title_info')
                                return (<div key={i}></div>)
                            else if (section.alias == 'custom_html2')
                                return (<div key={i}></div>)
                            else if (section.alias == 'custom_html1')
                                return (<div key={i}></div>)
                            else if (section.alias == 'event_info')
                                return (<div key={i}></div>)
                            else if (section.alias == 'agendas')
                                return (<div key={i}></div>)
                            else if (section.alias == 'sponsors')
                                return (<Sponsor />)
                            // else if (section.alias == 'bottom_banner')
                            //   return ()
                            else if (section.alias == 'register_now')
                                return (<div key={i}></div>)
                            else if (section.alias == 'exhibitors')
                                return (<Exhibitor />)
                            else if (section.alias == 'speakers')
                                return (<Speaker />)
                            else if (section.alias == 'maps')
                                return (<div key={i}></div>)
                            else if (section.alias == 'videos')
                                return (<Video />)
                            else if (section.alias == 'photos')
                                return (<Gallery />)
                            else if (section.alias == 'streaming')
                                return (<div key={i}></div>)
                            else if (section.alias == 'waiting_list')
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
