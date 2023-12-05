import React from 'react';

function FilterCheckbox() {
    return (
        <section className="filter">
            <label className="filter-checkbox" for="checkbox">
                <input className="filter-checkbox__input" type="checkbox" id="checkbox"></input>
                <span className="filter-checkbox__inner"></span>
                <p className="filter-checkbox__text">Короткометражки</p>
            </label>
        </section>
    );
}

export default FilterCheckbox;