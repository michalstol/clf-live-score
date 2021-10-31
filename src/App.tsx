import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Connection from './views/Connection/Connection';
import SignIn from './views/SignIn/SignIn';
import Feed from './views/Feed/Feed';
import Live from './views/Live/Live';
import Commentary from './views/Commentary/Commentary';

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

                    <ConnectedRoute path="/live/:id">
                        <View>
                            <Live />
                        </View>
                    </ConnectedRoute>

                    <ConnectedRoute path="/sign-in">
                        <View>
                            <SignIn />
                        </View>
                    </ConnectedRoute>

                    <PrivateRoute path="/commentary/:id">
                        <View>
                            <Commentary />
                        </View>
                    </PrivateRoute>
                </SwitchGroup>
            </Router>
        </div>
    );
}

export default App;
