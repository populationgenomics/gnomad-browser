import 'core-js/stable'
import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'

import App from './App'
import AppOffline from './AppOffline'

const mount = document.getElementById('root')

if (process.env.IS_OFFLINE === 'true') {
	render(<AppOffline />, mount)
}
else{
	render(<App />, mount)
}

