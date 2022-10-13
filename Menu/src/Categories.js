import React from 'react'

const Categories = ({ allCategories, filterButtons }) => {
    return (
        <div className="btn-container">
            {
                allCategories.map((category, index) => {
                    return <button className="filter-btn" key={index} type="button" onClick={() => filterButtons(category)}>{category}</button>
                })
            }
        </div>
    )
}

export default Categories
