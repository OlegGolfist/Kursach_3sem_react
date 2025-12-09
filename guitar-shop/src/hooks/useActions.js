import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import * as cartActions from '../store/cartSlice';
import * as productActions from '../store/productsSlice';

const allActions = {
    ...cartActions,
    ...productActions
};

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(allActions, dispatch);
    }, [dispatch]);
};

