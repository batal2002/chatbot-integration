import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    currentPageTitle: string;
    childrenPageTitle: string;
    sidebarIsOpen: boolean;
    isAuth: boolean;
    isAuthLoading: boolean;
}

const initialState: AppState = {
    currentPageTitle: '',
    childrenPageTitle: '',
    sidebarIsOpen: false,
    isAuth: false,
    isAuthLoading: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentPageTitle: (state, action: PayloadAction<string>) => {
            state.currentPageTitle = action.payload;
        },
        setChildrenPageTitle: (state, action: PayloadAction<string>) => {
            state.childrenPageTitle = action.payload;
        },
        setLeftSidebarIsClose: (state) => {
            state.sidebarIsOpen = false;
        },
        setLeftSidebarIsOpen: (state) => {
            state.sidebarIsOpen = true;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setIsAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.isAuthLoading = action.payload;
        },
    },
});

export const {
    setCurrentPageTitle,
    setChildrenPageTitle,
    setLeftSidebarIsClose,
    setLeftSidebarIsOpen,
    setIsAuth,
    setIsAuthLoading,
} = appSlice.actions;

export const { reducer: appReducer } = appSlice;
