import { useHistory } from 'react-router-dom';

// useRouteChanger navigates to a new route. Usage:
// Import:     import { useRouteChanger } from (path to '/utils/RouteChanger');
// Initialize: const changeRoute = useRouteChanger();
// Invoke:     () => changeRoute(`NEW_PATH`);

export function useRouteChanger() {
    const history = useHistory();
    const handleChange = (path) => {
        history.push(path);
    }

    return handleChange;
}