import React from 'react';

import RestaurantHeader from './RestaurantHeader';
import CategoryListing from './CategoryListing';

import data from '../data/data.json';

const Main = () => {
    const { Restaurent, Category, Item, ItemData } = data;

    return (
        <div>
            <RestaurantHeader data={Restaurent} />
            <CategoryListing categories={Category} items={Item} itemsData={ItemData} />
        </div>
    )
};

export default Main;

