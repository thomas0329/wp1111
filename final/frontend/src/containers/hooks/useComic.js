import { useState, createContext, useContext} from "react";

const ComicContext = createContext({
	me: "",
	setMe: () => {},
	currentTemplate: "",
	setCurrentTemplate: () => {},
	figure: "",
	setFigure: ()=>{}
});

const ComicProvider = (props) => {
	
	const [me, setMe] = useState("");
	const [currentTemplate, setCurrentTemplate] = useState("");
	
	const [figure, setFigure] = useState("");
	const transformFig = ()=>{
		console.log("Hit transformation!");
	};

	return(
		<ComicContext.Provider
			value = {{
				me,
				setMe,
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
