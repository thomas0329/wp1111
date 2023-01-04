import { useState, createContext, useContext} from "react";

const ComicContext = createContext({
	user: {},
	setMe: () => {},
	currentTemplate: "",
	setCurrentTemplate: () => {},
	figure: "",
	setFigure: ()=>{}
});

const ComicProvider = (props) => {
	
	const [user, setUser] = useState({name: '', email: ''});
	const [currentTemplate, setCurrentTemplate] = useState("");
	
	const [figure, setFigure] = useState("");
	const transformFig = ()=>{
		console.log("Hit transformation!");
	};

	return(
		<ComicContext.Provider
			value = {{
				user,
				setUser,
				currentTemplate,
				setCurrentTemplate,
				figure,
				setFigure,
				transformFig,
			}}
			{...props}
		/>
	);
};

const useComic = () => (
	useContext(ComicContext)
)
export { useComic, ComicProvider }
