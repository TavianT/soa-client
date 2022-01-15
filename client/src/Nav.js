import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"

const Nav = () => {
    return ( 
        <div className="nav">
        <Button color="inherit" component={Link} to="/">
            Home
        </Button>
        <Button color="inherit" component={Link} to="/create">
            New Proposal
        </Button>
        <Button color="inherit" component={Link} to="/check-intents">
            Travel Intents
        </Button>
        <Button color="inherit" component={Link} to="/check-acknowledgements">
            Acknowledgements
        </Button>
        </div>
     );
}
 
export default Nav;