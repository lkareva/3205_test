import React, {FunctionComponent} from 'react'
import {User} from '../models/user'

interface UsersProps {
    users: Array<User>
}
const Users = ({users}: UsersProps) => {
    return (
        <div className="result-users__box">
            {users.length !== 0
                ?<>
                    {users.map((user)=>{
                        return (
                            <div className="result-users__item">
                                <div className="result-users__email">{user.email}</div>
                                <div className="result-users__number">{user.number}</div>
                            </div>
                        )
                    })}
                </>
                :<>Ничего не найдено</>
            }
        </div>
    )
}

export default Users