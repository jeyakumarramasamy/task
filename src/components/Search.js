import React from 'react';
import TextInput from './TextInput';
import UIConstants from '../constants/UIConstants';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }

    searchHandler = ({ value }) => {
        this.setState({ searchText: value });
        this.props.onSearch(value);
    }

    render() {
        const { searchText } = this.state;
        return (
            <TextInput
                placeholder={UIConstants.SEARCH_PLACEHOLDER}
                value={searchText}
                onChange={this.searchHandler}
            />
        );
    }
}

export default Search;
