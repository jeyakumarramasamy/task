import React from 'react';
import Search from '../../components/Search';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPlanets } from '../../actionCreators/home';
import homeSelector from '../../selectors/home';
import Planet from '../../components/Planet';

class Home extends React.Component {
    searchHandler = (data) => {
        this.props.getPlanets(data);
    }

    renderPlanets = () => {
        const { planets, population } = this.props;
        const { max } = population;
        return planets && planets.length ? planets.map((item, i) => {
            return (
                <Planet max={max} key={i.toString()} details={item} />
            )
        }) : <div className="placeholder">Find Planets</div>
    }

    render() {
        return (
            <div className="search-container">
                <Search onSearch={this.searchHandler} />
                {this.renderPlanets()}
            </div>
        );
    }
}

const mapStateToProps = state => homeSelector(state);

const mapDispatchToProps = (dispatch) => {
    return {
        getPlanets: bindActionCreators(getPlanets, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
