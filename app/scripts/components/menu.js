/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchResults: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {

        // gives cors origin error
        const searchUrl = 'http://localhost:3035/search?query=' + e.target.value;
        // Start Here
        fetch(searchUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({searchResults: data});
                console.log(data)
            })
            .catch(console.log)
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     * @returns JSX
     * @memberof App
     */
    render() {
        let results = this.state.searchResults;
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)}/>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>

                    <div
                        className="matched-result">
                        <div className="see-result">
                            <a className="" href="/esearch?search=LIPS">
                                <span className="search-count first" role="link">
                                    Displaying {results.length >= 4 ? '4 ' : results.length + ' '}
                                    of {results.length} Results
                                </span>
                                <span className="search-results last" role="link">See All Results</span>
                            </a>
                        </div>
                        <div className="search-result-container">

                            {results.slice(0, 4).map((item, index) => {

                                return <div key={index}
                                            className="search-result">
                                    <a
                                        href="/product/13854/52593/products/makeup/lips/lipstick/retro-matte-lipstick"
                                        className="search-result-image">
                                        <img className=""
                                             src={item.picture}/>
                                    </a>
                                    <div className="search-result-body">
                                        <a className="search-result-link"
                                           href="/product/13854/52593/products/makeup/lips/lipstick/retro-matte-lipstick">{item.name}</a>
                                        <div className="search-result-description">
                                            {item.tags.join(', ')}
                                        </div>
                                    </div>
                                </div>

                            })}


                        </div>
                    </div>

                </div>

            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;