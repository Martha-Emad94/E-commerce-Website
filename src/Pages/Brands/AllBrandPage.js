import React from 'react'
import BrandContainer from '../../components/Brands/BrandContainer'
import Pagination from '../../components/Uility/Pagination'

const AllBrandPage = () => {
    return (
        <div style={{minHeight:"500px"}}>
           <BrandContainer/>
           <Pagination/>
        </div>
    )
}

export default AllBrandPage
