import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import shortid from "shortid";
import { service } from "../../services/service"

const in_array = require("in_array");

class Sponsor extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            theme: (this.props.event !== undefined && this.props.event.theme ? this.props.event.theme : ''),
            module: false,
            components: [],
            sponsors: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        this.loadSponsors();
        
        //active theme variation
        if (this.state.theme && this.state.theme.modules) {
            let module = this.state.theme.modules.filter(function (module, i) {
                return in_array(module.alias, ["sponsor"]);
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
        import(`@/themes/${theme}/sponsor/${variation}`)
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

    loadSponsors() {
        service.get(`${process.env.REACT_APP_URL}/event/${this.props.event.url}/sponsors`).then(
            response => {
                this.setState({
                    sponsors: response.data
                });
            }
        )
    }


    render() {
        const { components } = this.state;
        if (components.length === 0) return <div>Loading...</div>;
        const componentsElements = components.map(Component => (
            <Component sponsors={this.state.sponsors} key={shortid.generate()} />
        ));
        return <div className="App">{componentsElements}</div>;
    }
}

function mapStateToProps(state) {
    const { event } = state;
    return {
        event
    };
}

export default connect(mapStateToProps)(withRouter(Sponsor));
