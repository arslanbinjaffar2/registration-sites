import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import shortid from "shortid";

const in_array = require("in_array");

class Sponsor extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            theme: (this.props.event !== undefined && this.props.event.theme ? this.props.event.theme : ''),
            module: false,
            components: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        //active theme variation
        if (this.state.theme && this.state.theme.theme_info && this.state.theme.modules) {
            let module = this.state.theme.modules.filter(function (module, i) {
                return in_array(module.module_info.alias, ["sponsor"]);
            });

            this.setState({
                module: (module ? module[0] : false),
            }, () => {
                if (module && module.length > 0 && module[0]['module_info'] && module[0]['module_info']['slug'] && this.state.theme.theme_info.slug) {
                    this.addComponent(this.state.theme.theme_info.slug, module[0]['module_info']['slug']);
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

    render() {
        const { components } = this.state;
        if (components.length === 0) return <div>Loading...</div>;
        const componentsElements = components.map(Component => (
            <Component key={shortid.generate()} />
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
