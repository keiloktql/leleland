import React, { useState, useEffect, createRef } from 'react';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import useComponentVisible from '../hooks/useComponentVisible';

const SearchBar = ({ searchInput, setSearchInput, searchedValue, setSearchedValue, data }) => {

    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestionArr, setSuggestionArr] = useState([]);
    const [cursor, setCursor] = useState(null);

    const { ref } = useComponentVisible(showSuggestion, setShowSuggestion);
    const searchInputRef = createRef();
    const downPress = useKeyPress("ArrowDown", searchInputRef);
    const upPress = useKeyPress("ArrowUp", searchInputRef);


    useEffect(() => {
        let componentMounted = true;
        (async () => {
            try {
                if (componentMounted) {
                    if (suggestionArr.length && downPress) {
                        if (cursor === null) {
                            setCursor(() => 0);
                        } else {
                            setCursor(prevState =>
                                prevState < suggestionArr.length - 1 ? prevState + 1 : prevState
                            );
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return (() => {
            componentMounted = false;
        });

    }, [downPress]);

    useEffect(() => {
        let componentMounted = true;
        (async () => {
            try {
                if (componentMounted) {
                    if (suggestionArr.length && upPress) {
                        setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return (() => {
            componentMounted = false;
        });

    }, [upPress]);

    // Handlers
    const handleSearchInputChange = (event) => {

        const newSearchInput = event.target.value;
        if (showSuggestion === false) {
            setShowSuggestion(() => true);
        }

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

        if (cursor !== null) {
            const newSearchInput = suggestionArr[cursor].name;
            setSearchInput(() => suggestionArr[cursor].name);
            let matchSearchArr = [];
            data.forEach((project) => {
                let projectNameLowercase = project.name.toLowerCase();
                let matchSearch = projectNameLowercase.includes(newSearchInput.toLowerCase());
                if (matchSearch) {
                    matchSearchArr.push(project);
                }
            });
    
            setSuggestionArr(() => matchSearchArr);
            setCursor(() => null);
            return;
        }

        setShowSuggestion(() => false);
        setSearchedValue(() => searchInput);
        setSuggestionArr(() => []);
        setSearchInput(() => "");
    };

    const handleShowAllProjects = (event) => {
        event.preventDefault();
        setSearchInput(() => "");
        setSearchedValue(() => "");
        setShowSuggestion(() => false);
    };

    const handleSearchSuggestedItem = (suggestedValue) => {
        setSearchInput(() => "");
        setSearchedValue(() => suggestedValue);
        setShowSuggestion(() => false);
    };

    const handleSearchClick = (event) => {
        setCursor(() => null);
    };

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
                    onClick={(event) => handleSearchClick(event)}
                    ref={searchInputRef}
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
                                    arrowed={cursor === index}
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

const SearchBarItem = ({ text, searchInput, handleSearchSuggestedItem, arrowed }) => {


    let formattedText = text.toLowerCase();
    const formattedSearchInput = searchInput.toLowerCase();

    // Highlight current search term.
    var regex = new RegExp('(' + formattedSearchInput + ')', 'gi');
    formattedText = formattedText.replace(regex, "<b>$1</b>");

    return (
        <div className={`c-Search-item ${arrowed && "c-Search-item--arrowed"}`} onClick={() => handleSearchSuggestedItem(text)}>
            <p dangerouslySetInnerHTML={{ __html: formattedText }}></p>
        </div>
    );
};

export default SearchBar;

const useKeyPress = function (targetKey, ref) {
    const [keyPressed, setKeyPressed] = useState(false);


    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        ref.current?.addEventListener("keydown", downHandler);
        ref.current?.addEventListener("keyup", upHandler);

        return () => {
            ref.current?.removeEventListener("keydown", downHandler);
            ref.current?.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;
};