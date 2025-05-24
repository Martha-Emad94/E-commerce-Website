import React from 'react'
import UnopDropdown from "unop-react-dropdown";
import sort from '../../images/sort.png'
const SearchCount = ({title}) => {
    const handler=()=>{

    }
    return (
        <div className="d-flex justify-content-between pt-3 px-2 mx-5">
            <div className="sub-tile ">{title}</div>
            <div className="search-count-text d-flex">
                <UnopDropdown
                    onAppear={handler}
                    onDisappearStart={handler}
                    trigger={
                        <p className="mx-1 para">
                        sort by
                            <img
                                width="20px"
                                height="20px"
                                className="ms-1"
                                src={sort}
                                alt=""
                            />
                            
                        </p>
                    }
                    delay={0}
                    align="CENTER"
                    hover>
                    <div className="card-filter">
                        <div className="border-bottom card-filter-item  d-flex justify-content-center">Best Seller</div>
                        <div className="border-bottom card-filter-item  d-flex justify-content-center">Best Rating</div>
                        <div className="border-bottom card-filter-item  d-flex justify-content-center">
                        Lowest Price 
                        </div>
                        
                        <div className=" card-filter-item  d-flex justify-content-center">Highest Price</div>
                    </div>
                </UnopDropdown>
            </div>
        </div>
    )
}

export default SearchCount
