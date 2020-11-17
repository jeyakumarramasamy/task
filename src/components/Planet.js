import React from 'react';

const Planet = (props) => {
    const {
        details,
        max,
    } = props;
    const fontSize = !isNaN(details.population) ? 50 - (details.population / max) : 'inherit';
    return (
        <div className="planet">
            <p style={{ fontSize: `${fontSize}px` }}>Name: {details.name}</p>
            <p>Population: {details.population}</p>
            <p>Terrain: {details.terrain}</p>
        </div>
    );
};

Planet.defaultProps = {
    details: {},
};

export default Planet;
