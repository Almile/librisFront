import AuthContext from '../context/AuthContext'

import { useContext } from 'react'

function Perfil() {    
    const { logout } = useContext(AuthContext)

    return (
        <div className='page'>
            <h1>Perfil</h1>     
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Perfil
