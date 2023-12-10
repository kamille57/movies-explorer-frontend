import React from 'react'; 
 
function FilterCheckbox() { 
    return ( 
        <section className="filter"> 
            <form> 
                <label className="filter-checkbox" htmlFor="checkbox"> 
                    <input className="filter-checkbox__input" type="checkbox" id="checkbox" placeholder="" /> 
                    <span className="filter-checkbox__inner"></span> 
                    Короткометражки 
                </label> 
            </form> 
        </section> 
    ); 
} 
 
export default FilterCheckbox;