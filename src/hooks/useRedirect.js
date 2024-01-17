import axios from 'axios';
import { useEffect } from 'react'
import { useHistory } from 'react-router';

const useRedirect = (userAuthStatus) => {
    const history = useHistory()

    useEffect(() => {
        (async () => {
          try {
              await axios.post('/dj-rest-auth/token/refresh/');
              if (userAuthStatus === 'loggedIn') history.push('/')
          } catch (error) {
              if (userAuthStatus === 'loggedOut') history.push('/')
          }
        })()
    }, [history, userAuthStatus])
}

export default useRedirect