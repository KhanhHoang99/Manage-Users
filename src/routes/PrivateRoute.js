import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux'

const PrivateRoute = ({children}) => {
    const {auth} =  useSelector((state) => state.users);
    if(!auth){
        return (
            <Alert variant="danger"  className="mt-3">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    you don't have permisson to acess this route.
                </p>
          </Alert>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute;