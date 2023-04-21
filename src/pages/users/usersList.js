import { useEffect, useState } from 'react';
import { Success } from '../../components/usersList/Success';
import { Users } from '../../components/usersList/Users';
import './users.scss';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isInvitesSended, setInvitesSended] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(json => { setUsers(json.data) })
            .catch(err => { console.error(err) })
            .finally(() => { setLoading(false) })
    }, [])

    const onChangeSearch = (event) => {
        setSearchValue(event.target.value)
    }

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setInvites(prev => [...prev, id])
        }
    }

    const onClickSendInvites = () => {
        setInvitesSended(true);
    }

    const resetInvites = () => {
        setInvites([]);
        setInvitesSended(false);
    }

    return (
        <div className="users-wrapper">
            <div className="users">
                {isInvitesSended
                    ? <Success count={invites.length} onReset={resetInvites} />
                    : <Users
                        onChangeSearch={onChangeSearch}
                        searchValue={searchValue}
                        items={users}
                        isLoading={isLoading}
                        invites={invites}
                        onClickInvite={onClickInvite}
                        onClickSendInvites={onClickSendInvites}
                        />
                }
            </div>
        </div>
    );
}

export default UsersList;
