
import {useDispatch, useSelector} from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';




const lightSlice  = createSlice({
    name: "light",
    initialState,
    reducers: {
        toggle: (state)=>{
            state.isOn = state.isOn;; 
        }
    }
    
})

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        currentSong : ""
    } ,
    reducers:{
        playSong : (state, action)=>{
            state.currentSong = action.payload;
        }
    }
})


const Component = () => {
    const count = useSelector((state)=>state.counter.count);
}

const userName = useSelector((state) => state.user.name)

const dispatch = useDispatch();





// 1. THE SLICE
const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDark: false },
  reducers: {
    toggleTheme: (state) => {
      // ??? (1) Flip the boolean here
      state.isDark = !state.isDark
      
    }
  }
});

const { toggleTheme } = themeSlice.actions;

// 2. THE COMPONENT
const ThemeButton = () => {
  const dispatch = useDispatch();
  // ??? (2) Get the current 'isDark' value from state.theme
  
  const isDark = useSelector((state)=> state.theme.isDark) 

  return (
    <button 
      style={{ background: isDark ? 'black' : 'white' }}
      // ??? (3) Dispatch the action when clicked (Remember the arrow function!)
      onClick={()=>{dispatch(toggleTheme())}}
    >
      Toggle Mode
    </button>
  );
};


