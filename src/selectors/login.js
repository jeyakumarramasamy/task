const loginSelector = (state) => ({
  isLoggedIn: state.loginState.loggedIn,
});

export default loginSelector;
