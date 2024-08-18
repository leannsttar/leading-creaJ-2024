import { create } from "zustand";

export const useTheme = create((set)=>({
    theme: theme(),
    setTheme: new_theme => {
        theme(new_theme)
        set({theme: new_theme})
    }
}))