
import { Container } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
const Pagination = () => {
    const handlePageClick = () => {
    }
    return (
        <Container>
            <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            pageCount={100}
            previousLabel="previous"
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            containerClassName={"pagination m-5 p-4 d-flex justify-content-center"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            renderOnZeroPageCount={null}
            />
        </Container>
    )
}

export default Pagination
