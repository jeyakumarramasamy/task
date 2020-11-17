const loaderSelector = (state) => {
  const { loaderState } = state;
  const {
    isLoading,
  } = loaderState;
  return {
    isLoading,
  };
};

export default loaderSelector;
