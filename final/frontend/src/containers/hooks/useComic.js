import { useState, createContext, useContext} from "react";

const ComicContext = createContext({
  me: "",
	setMe: () => {},
	currentTemplate: "",
	setCurrentTemplate: () => {}
});

const ComicProvider = (props) => {
	
  const [me, setMe] = useState("");
	const [currentTemplate, setCurrentTemplate] = useState("");

	return(
		<ComicContext.Provider
			value = {{
				me,
				setMe,
				currentTemplate,
				setCurrentTemplate
			}}
			{...props}
		/>
	);
};

const useComic = () => (
	useContext(ComicContext)
)
export { useComic, ComicProvider }
