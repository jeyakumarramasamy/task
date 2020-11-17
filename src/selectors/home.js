import { createSelector } from 'reselect';

const planets = (state) => state.homeState.planets;

const getMinMaxPopulation = createSelector(
  [planets],
  (items) => {
    if (items) {
      const arr = items.filter((item) => !isNaN(item.population))
        .map((item) => item.population);
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      return { min, max };
    }
    return {};
  }
);

const homeSelector = (state) => ({
  planets: planets(state),
  population: getMinMaxPopulation(state),
});

export default homeSelector;
