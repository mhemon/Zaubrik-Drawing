import { createTLUser, setUserPreferences, Tldraw, track, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { SimControls } from "./physics/ui/PhysicsControls";
import { uiOverrides } from "./physics/ui/overrides";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

function App() {
	const [isPhysicsEnabled, setIsPhysicsEnabled] = useState(false);

	useEffect(() => {
		const togglePhysics = () => setIsPhysicsEnabled(prev => !prev);

		window.addEventListener('togglePhysicsEvent', togglePhysics);

		return () => {
			window.removeEventListener('togglePhysicsEvent', togglePhysics);
		};
	}, []);

	return (
		<React.StrictMode>
			<Toggle />
			{isPhysicsEnabled ? <Canvas /> : <Default />}
		</React.StrictMode>
	);
};

function Default() {
	return (
		<>
			<Helmet>
				<link rel="stylesheet" href="src/css/default.css" />
			</Helmet>
			<header>
				Orion Reed
			</header>
			<h1>Hello! 👋</h1>
			<p>
				My research investigates the intersection of computing, human-system
				interfaces, and emancipatory politics. I am interested in the
				potential of computing as a medium for thought, as a tool for
				collective action, and as a means of emancipation.
			</p>

			<p>
				My current focus is basic research into the nature of digital
				organisation, developing theoretical toolkits to improve shared
				infrastructure, and applying this research to the design of new
				systems and protocols which support the self-organisation of knowledge
				and computational artifacts.
			</p>

			<h1>My work</h1>
			<p>
				Alongside my independent work I am a researcher at
				<a href="https://block.science/">Block Science</a> building
				<i>knowledge organisation infrastructure</i> and at
				<a href="https://economicspace.agency/">ECSA</a> working on
				<i>computational media</i>. I am also part of the nascent <a href="https://libcomp.org/">Liberatory Computing</a>
				collective and a co-organiser of the <a href="https://canvasprotocol.org/">OCWG</a>.
			</p>

			<h1>Get in touch</h1>
			<p>
				I am on Twitter as <a href="https://twitter.com/OrionReedOne">@OrionReedOne</a> and on
				Mastodon as <a href="https://hci.social/@orion">@orion@hci.social</a>. The best way to reach me is
				through Twitter or my email, <a href="mailto:me@orionreed.com">me@orionreed.com</a>
			</p>

			<span className="dinkus">***</span>

			<h1>Talks</h1>
			<ul>
				<li><a
					href="objects/causal-islands-integration-domain.pdf">Spatial
					Canvases: Towards an Integration Domain for HCI @ Causal Islands LA</a></li>
				<li><a
					href="https://www.youtube.com/watch?v=-q-kk-NMFbA">Knowledge Organisation Infrastructure Demo @ NPC
					Denver</a></li>
			</ul>
			<h1>Writing</h1>
			<ul>
				<li><a
					href="https://blog.block.science/objects-as-reference-toward-robust-first-principles-of-digital-organization/">Objects
					as Reference: Toward Robust First Principles of Digital Organization</a></li>
			</ul>
		</>
	);
}

function Canvas() {

	return (
		<div className="tldraw__editor">
			<Helmet>
				<link rel="stylesheet" href="src/css/tldraw.css" />
			</Helmet>
			<Tldraw
				overrides={uiOverrides}
			// user={createTLUser(opts={id: 'orion', isDarkMode: true})}
			>
				{/* <SimControls /> */}
				{/* {()=> {
					setUserPreferences({id: 'orion', isDarkMode: true })
				}} */}
				<Toggle />
			</Tldraw>
		</div>
	);
}

function Toggle() {
	return (
		<>
			<Helmet>
				<link rel="stylesheet" href="src/css/toggle.css" />
			</Helmet>
			<button id="toggle-physics" onClick={() => window.dispatchEvent(new CustomEvent('togglePhysicsEvent'))}>
				<img src="src/assets/gravity.svg" alt="Toggle Physics" />
			</button>
		</>
	);
}

