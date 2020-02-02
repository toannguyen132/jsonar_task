import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import routes from './routes';
import {Container} from 'react-bootstrap';

function App() {
    return (
        <div className="App">
            <Router>
                <Suspense fallback={<Container>Loading...</Container>}>
                    <Switch>
                        {routes.map((route, i) => <Route key={i} {...route} />)}
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
