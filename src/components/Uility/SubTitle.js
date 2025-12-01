
import { Link } from 'react-router-dom'

const Subtitle = ({title,bnttitle,text}) => {
    return (
        <div className="mt-4 d-flex justify-content-between">
        <div className="sub-title">{title}</div>
        <Link to={`${text}`} >
        {bnttitle ?(<button className="bnt">{bnttitle}</button>):null}
        </Link>
        </div>
    )
}

export default Subtitle
