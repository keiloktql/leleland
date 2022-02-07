import React, { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import useComponentVisible from '../hooks/useComponentVisible';

const SearchBar = ({ searchInput, setSearchInput, data, handleSearchSubmit }) => {

    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestionArr, setSuggestionArr] = useState([]);
    const [searchedValue, setSearchedValue] = useState("");

    const { ref } = useComponentVisible(showSuggestion, setShowSuggestion);

    // Handlers
    const handleSearchInputChange = (event) => {

        const newSearchInput = event.target.value;
        setSearchInput(() => newSearchInput);

        let matchSearchArr = [];
        data.forEach((project) => {
            let projectNameLowercase = project.name.toLowerCase();
            let matchSearch = projectNameLowercase.includes(newSearchInput.toLowerCase());
            if (matchSearch) {
                matchSearchArr.push(project);
            }
        });

        setSuggestionArr(() => matchSearchArr);

    };

    const handleSearchInputFocus = (event) => {
        setShowSuggestion(() => true);
    };

    const handleInnerSearchSubmit = (event) => {
        event.preventDefault();
        setShowSuggestion(() => false);
        setSearchedValue(() => searchInput);
        setSearchInput(() => "");
        handleSearchSubmit(false, event);
    };

    const handleShowAllProjects = (event) => {
        event.preventDefault();
        setSearchInput(() => "");
        setSearchedValue(() => "");
        setShowSuggestion(() => false);
        handleSearchSubmit(true, event);
    };

    const handleSearchSuggestedItem = (suggestedValue) => {
        setSearchInput(() => "");
        setSearchedValue(() => suggestedValue);
        setShowSuggestion(() => false);
        handleSearchSubmit(false);
    }

    return (
        <form className="c-Search" onSubmit={(event) => handleInnerSearchSubmit(event)} ref={ref}>
            <div className="c-Search__Input-wrapper">
                <IconContext.Provider className="c-Search__Icon" value={{ color: "#1C1C1C", size: "21px" }}>
                    <AiIcons.AiOutlineSearch />
                </IconContext.Provider>
                <input
                    type="text"
                    placeholder="Search for project..."
                    value={searchInput}
                    onChange={(event) => handleSearchInputChange(event)}
                    onFocus={(event) => handleSearchInputFocus(event)}
                />
            </div>
            <div className="l-Search__Suggestion-wrapper">
                <div className={`c-Search__Suggestion-wrapper c-Search__Suggestion-wrapper--${showSuggestion ? "display" : "hide"}`}>
                    {
                        suggestionArr.length > 0 ?
                            suggestionArr.map((oneSuggestion, index) => (
                                <SearchBarItem
                                    text={oneSuggestion.name}
                                    searchInput={searchInput}
                                    handleSearchSuggestedItem={handleSearchSuggestedItem}
                                    key={index}
                                />
                            ))
                            :
                            <i>No results found.</i>
                    }


                </div>
            </div>
            <div className="c-Search__Text">
                {
                    searchedValue === "" ?
                        <p>Showing all results.</p> :
                        <>
                            <p>Showing results for <b>"{searchedValue}".</b></p>
                            <button type="button" onClick={(event) => handleShowAllProjects(event)}>Show all projects</button>
                        </>
                }
            </div>


        </form>
    );
};

const SearchBarItem = ({ text, searchInput, handleSearchSuggestedItem }) => {

    if (searchInput === "") {
        return null;
    }

    let formattedText = text.toLowerCase();
    const formattedSearchInput = searchInput.toLowerCase();

    // Highlight current search term.
    var regex = new RegExp('(' + formattedSearchInput + ')', 'gi');
    formattedText = formattedText.replace(regex, "<b>$1</b>");

    return (
        <div className="c-Search-item" onClick={() => handleSearchSuggestedItem(text)}>
            <p dangerouslySetInnerHTML={{ __html: formattedText }}></p>
        </div>
    );
};

export default SearchBar;