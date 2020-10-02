import * as React from 'react';
import Slider from '@/modules/Slider';
import Program from '@/modules/Program';
import Speaker from '@/modules/Speaker';

class Index extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Slider />
                <Program />
                <Speaker />
            </React.Fragment>
        );
    }
}

export default Index;
