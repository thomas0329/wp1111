import { useState, useEffect, createContext, useContext} from "react";

const ComicContext = createContext({
  me: "",
	setMe: () => {}
});

const ComicProvider = (props) => {
	
  const [me, setMe] = useState("");
	
	return(
		<ComicContext.Provider
			value = {{
				me,
				setMe
			}}
			{...props}
		/>
	);
};

const useComic = () => (
	useContext(ComicContext)
)
export { useComic, ComicProvider }
