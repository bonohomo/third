import React from "react";
import './Search.css';

class Search extends React.Component {
    state = {
        search: "",
        type: "all",
        page: 1
    }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.props.searchMovie(this.state.search, this.state.type, this.state.page);
        }
    }

    handlerFilter = (event) => {
        this.setState(
            { type: event.target.dataset.type, page: 1 },
            () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
        );
    }

    changePage = (page) => {
        this.setState(
            { page },
            () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
        );
    }

    prevPage = () => {
        this.setState(
            this.state.page > 1 ? { page: this.state.page - 1 } : { page: 1 },
            () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
        )
    }

    nextPage = () => {
        const totalPage = Math.ceil(this.props.totalCount / 10);

        if (this.state.page < totalPage) {
            this.changePage(this.state.page + 1);
        }
    }

    render() {
        let limit = 10;
        let totalPage = Math.ceil(this.props.totalCount / limit);

        let num = [];
        for (let i = 1; i <= totalPage; i++) {
            num.push(i);
        }
        return (
            <>
                <div className="search">
                    <input
                        type="search"
                        placeholder="search"
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyDown={this.handleKey}
                    />
                    <button
                        className="btn"
                        onClick={() => this.changePage(1)}
                    >Search</button>
                </div>
                <div className="radio">
                    <label htmlFor="all">
                        <input type="radio" name="type" id="all" data-type="all" checked={this.state.type === "all"} onChange={this.handlerFilter} /> All
                    </label>
                    <label htmlFor="movie">
                        <input type="radio" name="type" id="movie" data-type="movie" checked={this.state.type === "movie"} onChange={this.handlerFilter} /> Movies only
                    </label>
                    <label htmlFor="series">
                        <input type="radio" name="type" id="series" data-type="series" checked={this.state.type === "series"} onChange={this.handlerFilter} /> Series only
                    </label>
                    <label htmlFor="game">
                        <input type="radio" name="type" id="game" data-type="game" checked={this.state.type === "game"} onChange={this.handlerFilter} /> Games only
                    </label>
                </div>
                <div className="navigation">
                    <button className="btn" onClick={this.prevPage} disabled={this.state.page === 1}>Prev</button>
                    <div className="items">
                        {
                            num.map((el) =>
                                <button className="btn" key={el} onClick={() => this.changePage(el)} disabled={this.state.page === el}>{el}</button>
                            )
                        }
                    </div>
                    <button className="btn" onClick={this.nextPage} disabled={this.state.page === totalPage}>Next</button>
                </div>
            </>
        )
    }
}

export default Search;
