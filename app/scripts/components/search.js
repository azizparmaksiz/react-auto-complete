import React from 'react';


class Search extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        };
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     * @returns JSX
     * @memberof Menu
     */

    /**
     * Calls upon search change
     * @memberof Search
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        const searchUrl = 'http://localhost:3035/search?query=' + e.target.value;
        // Start Here
        fetch(searchUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({searchResults: data});
            })
            .catch(console.log)
    }


    
    render() {
        let results = this.state.searchResults;
        return (
            <div className={(this.props.showingSearch ? "showing " : "") + "search-container"}>
                <input type="text" onChange={(e) => this.onSearch(e)} placeholder="Enter Search Term"/>
                 {/*this.props.func to hide search container*/}
                <a href="#" onClick={(e) => this.props.func(e)}>
                    <i className="material-icons close">close</i>
                </a>

                <div
                    className="search-results">
                    <div className="see-result">
                        <a className="" href="javascript:;">
                                <span className="first" role="link">
                                    Displaying {results.length >= 4 ? '4 ' : results.length + ' '}
                                    of {results.length} Results
                                </span>
                            <span className="last" role="link">See All Results</span>
                        </a>
                    </div>
                    <div className="product-results-container">

                        {results.slice(0, 4).map((item, index) => {

                            return <div key={index}
                                        className="product-result">
                                <a
                                    href="javascript:;"
                                    className="product-result-image">
                                    <img className=""
                                         src={item.picture}/>
                                </a>
                                <div className="product-result-body">
                                    <a className="product-result-link"
                                       href="javascript:;">{item.name}</a>
                                    <div className="product-result-description">
                                        {item.tags.join(', ')}
                                    </div>
                                </div>
                            </div>

                        })}


                    </div>
                </div>

            </div>
        );
    }
}

// Export out the React Component
module.exports = Search;