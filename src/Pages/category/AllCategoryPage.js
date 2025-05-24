import React from 'react'
import CategoryContainter from '../../components/Category/CategoryContainter'
import Pagination from '../../components/Uility/Pagination'

const AllCategoryPage = () => {
    return (
        <div style={{minHeight:"500px"}}>
            <CategoryContainter/>
            <Pagination/>
        </div>
    )
}

export default AllCategoryPage
