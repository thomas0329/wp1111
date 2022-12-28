
const ComicContext = createContext({
    
});

const ChatProvider = (props) => {
    const [me, setMe] = useState(savedMe || '');
    
    return(
        <ChatContext.Provider
            value = {{
               
            }}
            {...props}
        />
    );
};