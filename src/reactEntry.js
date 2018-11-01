import React from 'react'
import { render } from 'react-dom'

import App from './ReactApp'

function renderApp() {
	const root = document.getElementById('app')
	render(
		<App />,
		root
	)
}

renderApp()
