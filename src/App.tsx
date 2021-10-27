import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Connection from './views/Connection/Connection';
import SignIn from './views/SignIn/SignIn';
import Logged from './views/Logged/Logged';
import Feed from './views/Feed/Feed';

import AuthWatcher from './components/AuthWatcher/AuthWatcher';
import ConnectedRoute from './components/ConnectedRoute/ConnectedRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import View from './components/View/View';
import SwitchGroup from './components/SwitchGroup/SwitchGroup';

function App() {
    return (
        <div className="app">
            <AuthWatcher />

            <Router>
                <SwitchGroup>
                    <Route path="/" exact>
                        {/* <View> */}
                        <Connection />
                        {/* </View> */}
                    </Route>

                    <ConnectedRoute path="/feed">
                        <View>
                            <Feed />
                        </View>
                    </ConnectedRoute>

                    {/* <ConnectedRoute path="/sign-in">
                        <View>
                            <SignIn />
                        </View>
                    </ConnectedRoute>

                    <PrivateRoute path="/logged">
                        <View>
                            <Logged />
                        </View>
                    </PrivateRoute> */}
                </SwitchGroup>
            </Router>
        </div>
    );
}

export default App;
