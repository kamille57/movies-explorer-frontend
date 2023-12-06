import React from 'react';

function FilterCheckbox() {
    return (
        <section className="filter">
            <label className="filter-checkbox" for="checkbox">
                <input className="filter-checkbox__input" type="checkbox" id="checkbox"></input>
                <span className="filter-checkbox__inner"></span>
                
                Короткометражки
                   
            </label>
        </section>
    );
}

export default FilterCheckbox;