import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import shortid from "shortid";
import { service } from '../../services/service';

const in_array = require("in_array");

class Banner extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            theme: (this.props.event !== undefined && this.props.event.theme ? this.props.event.theme : ''),
            module: false,
            components: [],
            banners: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        this.loadBanners();

        //active theme variation
        if (this.state.theme && this.state.theme.modules) {
            let module = this.state.theme.modules.filter(function (module, i) {
                return in_array(module.alias, ["banner"]);
            });

            this.setState({
                module: (module ? module[0] : false),
            }, () => {
                if (module && module.length > 0) {
                    this.addComponent(this.state.theme.slug, module[0]['slug']);
                }
            });
        }
    }

    addComponent = async (theme, variation) => {
        import(`@/themes/${theme}/banner/${variation}`)
            .then(component =>
                this.setState({
                    components: this.state.components.concat(component.default)
                })
            )
            .catch(error => {
                console.error(`Variation of this "${theme}" not yet supported`);
            });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadBanners() {
        service.get(`${process.env.REACT_APP_URL}/event/${this.props.event.url}/banner`).then(
            response => {
                this.setState({
                    banners: response.data
                });
            }
        )
    }


    render() {
        const { components } = this.state;
        if (components.length === 0) return <div>Loading...</div>;
        const componentsElements = components.map(Component => (
            <Component event={this.props.event} banners={this.state.banners} key={shortid.generate()} />
        ));
        return <div className="App">{componentsElements}</div>;
    }
}

function mapStateToProps(state) {
    const { event } = state.event;
    return {
        event
    };
}

export default connect(mapStateToProps)(withRouter(Banner));
