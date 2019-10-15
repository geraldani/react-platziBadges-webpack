import React, {Component, Fragment, useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import './styles/BadgesList.css';
import Gravatar from './Gravatar';

class BadgesListItem extends Component {
    render() {
        return (
            <div className="BadgesListItem">
                <Gravatar
                    className="BadgesListItem__avatar"
                    email={this.props.badge.email}/>
                <div>
                    <strong>
                        {this.props.badge.firstName} {this.props.badge.lastName}
                    </strong>
                    <br/>@{this.props.badge.twitter}
                    <br/>
                    {this.props.badge.jobTitle}
                </div>
            </div>
        );
    }
}
function useSearchBadges(badges) {
    const [value, setValue] = useState('');
    const [filteredBadges, setFilteredBadges] = useState(badges);

    useMemo(() => {
        const result = badges.filter(badge => badge.firstName.concat(badge.lastName).toLowerCase().includes(value.toLowerCase()));
        setFilteredBadges(result);
    }, [badges, value]);

    return {setValue, filteredBadges, value}
}

function BadgesList(props) {
    const badges = props.badges;
    const {setValue, filteredBadges, value} = useSearchBadges(badges);
    return (
        <div className="BadgesList">
            <div className="form-group">
                <label htmlFor="search">Filer Badges</label>
                <input type="text" id="search" className="form-control"
                       value={value} onChange={e => {
                    setValue(e.target.value)
                }}/>
            </div>
            {
                filteredBadges.length === 0 &&
                <Fragment>
                    <h3>No badges were found</h3>
                    {
                        badges.length === 0 &&
                        <Link className="btn btn-primary" to="/badges/new">Create new badge</Link>
                    }
                </Fragment>
            }
            <ul className="list-unstyled">
                {filteredBadges.map(badge => {
                    return (
                        <li key={badge.id}>
                            <Link
                                className="text-reset text-decoration-none"
                                to={`/badges/${badge.id}`}>
                                <BadgesListItem badge={badge}/>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
export default BadgesList;
